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

const VALID_SLUGS = ["skd", "skb"]

export async function POST(request) {
  // 1. Parse body
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { packageSlug } = body
  if (!packageSlug || !VALID_SLUGS.includes(packageSlug)) {
    return NextResponse.json({ error: "Invalid packageSlug" }, { status: 400 })
  }

  // 2. Validasi sesi user
  const authHeader = request.headers.get("authorization")
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = authHeader.replace("Bearer ", "")
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // 3. Cek apakah sudah punya paket aktif (paid)
  const { data: existingPurchase } = await supabaseAdmin
    .from("user_packages")
    .select("id")
    .eq("user_id", user.id)
    .eq("package_slug", packageSlug)
    .eq("payment_status", "paid")
    .maybeSingle()

  if (existingPurchase) {
    return NextResponse.json({ error: "Paket sudah dibeli" }, { status: 409 })
  }

  // 4. Ambil detail paket dari DB (server-side — jangan trust client)
  const { data: pkg, error: pkgError } = await supabaseAdmin
    .from("packages")
    .select("id, slug, name, price, description")
    .eq("slug", packageSlug)
    .eq("is_active", true)
    .single()

  if (pkgError || !pkg) {
    return NextResponse.json({ error: "Paket tidak ditemukan" }, { status: 404 })
  }

  // 5. Generate order_id
  const timestamp = Date.now()
  const userSlice = user.id.replace(/-/g, "").slice(0, 8)
  const orderId = `CPNS-${packageSlug.toUpperCase()}-${userSlice}-${timestamp}`

  // 6. Buat Snap transaction
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
      item_details: [
        {
          id: pkg.slug,
          price: pkg.price,
          quantity: 1,
          name: pkg.name,
        },
      ],
    })
  } catch (err) {
    console.error("Midtrans error:", err)
    return NextResponse.json({ error: "Gagal membuat transaksi pembayaran" }, { status: 500 })
  }

  // 7. Simpan ke user_packages dengan status pending
  const { error: insertError } = await supabaseAdmin
    .from("user_packages")
    .insert({
      user_id: user.id,
      package_slug: packageSlug,
      order_id: orderId,
      payment_status: "pending",
    })

  if (insertError) {
    console.error("Insert user_packages error:", insertError)
    return NextResponse.json({ error: "Gagal menyimpan data transaksi" }, { status: 500 })
  }

  return NextResponse.json({
    token: snapData.token,
    redirect_url: snapData.redirect_url,
    order_id: orderId,
  })
}
