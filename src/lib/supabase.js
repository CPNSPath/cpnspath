import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://omftdetijkflnoropzwk.supabase.co"

const supabaseKey = "sb_publishable_DF1qwaO9k0Ta4jp_8glqmw_4XwfETta"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)