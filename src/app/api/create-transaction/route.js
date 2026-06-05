import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import midtransClient from "midtrans-client"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY,
})

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { packageSlug, toNumber, toNumbers } = body

  // Tentukan apakah ini satuan atau bundle
  const isBundle = packageSlug?.includes("bundle")
  const examSlug = packageSlug?.replace("-bundle-5", "") // "skd-bundle-5" → "skd"
  const VALID_EXAMS = ["skd", "skb"]
  
  if (!packageSlug || !VALID_EXAMS.includes(examSlug)) {
    return NextResponse.json({ error: "Invalid packageSlug" }, { status: 400 })
  }

  // Validasi toNumbers (untuk bundle) atau toNumber (untuk satuan)
  let targetNumbers = []
  if (isBundle) {
    if (!Array.isArray(toNumbers) || toNumbers.length !== 5) {
      return NextResponse.json({ error: "Bundle harus pilih persis 5 TO" }, { status: 400 })
    }
    for (const n of toNumbers) {
      if (!Number.isInteger(n) || n < 1 || n > 100) {
        return NextResponse.json({ error: "Setiap TO harus integer 1-100" }, { status: 400 })
      }
    }
    targetNumbers = toNumbers
  } else {
    const toNum = parseInt(toNumber)
    if (!Number.isInteger(toNum) || toNum < 1 || toNum > 100) {
      return NextResponse.json({ error: "toNumber harus integer 1-100" }, { status: 400 })
    }
    targetNumbers = [toNum]
  }

  // Auth check
  const authHeader = request.headers.get("authorization")
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = authHeader.replace("Bearer ", "")
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Cek apakah ada TO yang udah dimiliki (paid)
  const { data: existing } = await supabaseAdmin
    .from("user_tryouts")
    .select("to_number")
    .eq("user_id", user.id)
    .eq("package_slug", examSlug)
    .eq("payment_status", "paid")
    .in("to_number", targetNumbers)

  if (existing && existing.length > 0) {
    const owned = existing.map(e => `#${e.to_number}`).join(", ")
    return NextResponse.json({ error: `TO ${owned} sudah dibeli` }, { status: 409 })
  }

  // Get package info (bundle atau satuan)
  const { data: pkg, error: pkgError } = await supabaseAdmin
    .from("packages")
    .select("id, slug, name, price")
    .eq("slug", packageSlug)
    .eq("is_active", true)
    .single()

  if (pkgError || !pkg) {
    return NextResponse.json({ error: "Paket tidak ditemukan" }, { status: 404 })
  }

  // Get exam package ID (yang punya tryouts)
  const { data: examPkg } = await supabaseAdmin
    .from("packages")
    .select("id")
    .eq("slug", examSlug)
    .single()

  // Get tryout UUIDs
  const { data: tryouts, error: tryoutError } = await supabaseAdmin
    .from("tryouts")
    .select("id, to_number")
    .eq("package_id", examPkg.id)
    .in("to_number", targetNumbers)
    .eq("is_active", true)

  if (tryoutError || !tryouts || tryouts.length !== targetNumbers.length) {
    return NextResponse.json({ error: "Tryout tidak ditemukan" }, { status: 404 })
  }

  // Create Midtrans order
  const timestamp = Date.now()
  const userSlice = user.id.replace(/-/g, "").slice(0, 8)
  const suffix = isBundle ? `BUNDLE5` : `TO${targetNumbers[0]}`
  const orderId = `CPNS-${examSlug.toUpperCase()}-${suffix}-${userSlice}-${timestamp}`

  let snapData
  try {
    snapData = await snap.createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: pkg.price,
      },
      customer_details: {
        email: user.email,
        first_name: user.email.split("@")[0],
      },
      item_details: [{
        id: pkg.slug,
        price: pkg.price,
        quantity: 1,
        name: isBundle
          ? `${pkg.name} - TO #${targetNumbers.join(", #")}`
          : `${pkg.name} - TO #${targetNumbers[0]}`,
      }],
      enabled_payments: ["other_qris"],
    })
  } catch (err) {
    console.error("Midtrans error:", err)
    return NextResponse.json({ error: "Gagal membuat transaksi pembayaran" }, { status: 500 })
  }

  // Insert ke user_packages (audit trail)
  await supabaseAdmin
    .from("user_packages")
    .insert({
      user_id: user.id,
      package_slug: packageSlug,
      order_id: orderId,
      payment_status: "pending",
    })

  // Insert ke user_tryouts (semua TO yg dibeli, status pending)
  const userTryoutRows = tryouts.map(t => ({
    user_id: user.id,
    tryout_id: t.id,
    to_number: t.to_number,
    package_slug: examSlug,
    payment_status: "pending",
    order_id: orderId,
  }))

  const { error: tryoutInsertError } = await supabaseAdmin
    .from("user_tryouts")
    .upsert(userTryoutRows, {
      onConflict: "user_id,to_number,package_slug"
    })

  if (tryoutInsertError) {
    console.error("user_tryouts insert error:", tryoutInsertError)
    return NextResponse.json({ error: "Gagal menyimpan data tryout" }, { status: 500 })
  }

  return NextResponse.json({
    token: snapData.token,
    redirect_url: snapData.redirect_url,
    order_id: orderId,
  })
}