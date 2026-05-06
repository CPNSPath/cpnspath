// TODO: setelah online, lengkapi Midtrans Snap integration.
// Server key di .env.local sebagai MIDTRANS_SERVER_KEY (bukan NEXT_PUBLIC_).
// Docs: https://docs.midtrans.com/reference/snap-api

import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(request) {

  // ── 1. Parse body ──────────────────────────────────────────────
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { user_id, item_id, type, price } = body

  if (!user_id || !item_id || !price) {
    return NextResponse.json({ error: "Missing required fields: user_id, item_id, price" }, { status: 400 })
  }

  // ── 2. Validasi sesi user ──────────────────────────────────────
  const authHeader = request.headers.get("authorization")
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = authHeader.replace("Bearer ", "")
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)

  if (authError || !user || user.id !== user_id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // ── 3. Validasi harga dari packages.js (server-side check) ─────
  // Harga divalidasi di client saat ini via packages.js.
  // TODO: pindahkan data paket ke DB agar bisa validasi harga di sini.
  const VALID_PRICES = [10000, 40000, 80000, 15000]
  if (!VALID_PRICES.includes(price)) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 })
  }

  // ── 4. Generate order ID ───────────────────────────────────────
  const timestamp = Date.now()
  const userSlice = user_id.slice(0, 8)
  const orderId = `CPNS-${timestamp}-${userSlice}`

  // ── 5. TODO: Midtrans Snap API call ───────────────────────────
  //
  // const midtransPayload = {
  //   transaction_details: { order_id: orderId, gross_amount: price },
  //   customer_details: { email: user.email },
  //   item_details: [{ id: item_id, price, quantity: 1, name: type || item_id }],
  // }
  //
  // const auth = Buffer.from(process.env.MIDTRANS_SERVER_KEY + ":").toString("base64")
  // const snapRes = await fetch("https://app.midtrans.com/snap/v1/transactions", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
  //   body: JSON.stringify(midtransPayload),
  // })
  // const snapData = await snapRes.json()
  // if (!snapRes.ok) return NextResponse.json({ error: snapData.error_messages }, { status: 500 })
  //
  // return NextResponse.json({ token: snapData.token, orderId })

  // ── 6. Mock response (hapus setelah Midtrans aktif) ───────────
  return NextResponse.json({
    success: true,
    orderId,
    message: "TODO: integrate Midtrans — endpoint structure is ready",
  })

}
