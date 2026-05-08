import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import midtransClient from "midtrans-client"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const coreApi = new midtransClient.CoreApi({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY,
})

export async function POST(request) {
  let notification
  try {
    notification = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 })
  }

  // Verify notification authenticity via Midtrans library
  let statusResponse
  try {
    statusResponse = await coreApi.transaction.notification(notification)
  } catch (err) {
    console.error("Midtrans notification verify error:", err)
    return NextResponse.json({ error: "Verification failed" }, { status: 400 })
  }

  const { order_id, transaction_status, fraud_status } = statusResponse

  // Map Midtrans status ke payment_status internal
  let newStatus = "pending"
  let paidAt = null

  if (transaction_status === "settlement" || transaction_status === "capture") {
    if (fraud_status === "accept" || !fraud_status) {
      newStatus = "paid"
      paidAt = new Date().toISOString()
    } else {
      newStatus = "failed"
    }
  } else if (["expire", "cancel", "deny", "failure"].includes(transaction_status)) {
    newStatus = "failed"
  }

  // Update user_packages — match by order_id
  const updateData = { payment_status: newStatus }
  if (paidAt) updateData.paid_at = paidAt

  const { error } = await supabaseAdmin
    .from("user_packages")
    .update(updateData)
    .eq("order_id", order_id)

  if (error) {
    console.error("Webhook DB update error:", error)
    // Tetap return 200 agar Midtrans tidak retry terus
    return NextResponse.json({ ok: false, error: error.message }, { status: 200 })
  }

  return NextResponse.json({ ok: true })
}
