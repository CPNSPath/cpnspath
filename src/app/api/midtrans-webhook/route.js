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

  // Verify with Midtrans
  let statusResponse
  try {
    statusResponse = await coreApi.transaction.notification(notification)
  } catch (err) {
    console.error("Midtrans notification verify error:", err)
    return NextResponse.json({ error: "Verification failed" }, { status: 400 })
  }

  const { order_id, transaction_status, fraud_status } = statusResponse

  // Determine new status
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

  // Update user_packages (audit trail)
  const pkgUpdateData = { payment_status: newStatus }
  if (paidAt) pkgUpdateData.paid_at = paidAt

  const { error: pkgError } = await supabaseAdmin
    .from("user_packages")
    .update(pkgUpdateData)
    .eq("order_id", order_id)

  if (pkgError) {
    console.error("user_packages update error:", pkgError)
  }

  // Update user_tryouts (THIS IS THE KEY FIX — buat unlock akses)
  const { error: tryoutError } = await supabaseAdmin
    .from("user_tryouts")
    .update({ payment_status: newStatus })
    .eq("order_id", order_id)

  if (tryoutError) {
    console.error("user_tryouts update error:", tryoutError)
    return NextResponse.json({ ok: false, error: tryoutError.message }, { status: 200 })
  }

  console.log(`Webhook OK: ${order_id} → ${newStatus}`)
  return NextResponse.json({ ok: true })
}