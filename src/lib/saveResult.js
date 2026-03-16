import { supabase } from "./supabase"
import { getCurrentUser } from "./auth"

export async function saveTryoutResult({
toSlug,
score,
correct,
wrong
}){

const user = await getCurrentUser()

if(!user) return

await supabase
.from("results")
.insert([
{
user_id:user.id,
to_slug:toSlug,
score:score,
correct:correct,
wrong:wrong
}
])

}