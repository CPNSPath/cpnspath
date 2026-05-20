import { supabase } from "./supabase"
import { getCurrentUser } from "./auth"

export async function getMyPackages() {
  const user = await getCurrentUser()
  if (!user) return []

  const { data, error } = await supabase
    .from("user_tryouts")
    .select("to_number, package_slug, payment_status, order_id, created_at")
    .eq("user_id", user.id)
    .eq("payment_status", "paid")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("getMyPackages error:", error.message)
    return []
  }

  return data || []
}