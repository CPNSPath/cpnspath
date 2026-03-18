import { supabase } from "./supabase"
import { getCurrentUser } from "./auth"

export async function saveTryoutResult({
toSlug,
score,
correct,
wrong,
twk,
tiu,
tkp,
lulus_twk,
lulus_tiu,
lulus_tkp
}){

const user = await getCurrentUser()

if(!user) return

console.log({
toSlug,
score,
twk,
tiu,
tkp,
lulus_twk
})

const { error } = await supabase
.from("results")
.insert([
{
user_id: user.id,
to_slug: toSlug,

// lama (optional)
score: score,
correct: correct,
wrong: wrong,

// 🔥 NEW CORE DATA
twk: twk,
tiu: tiu,
tkp: tkp,
total: score,

lulus_twk: lulus_twk,
lulus_tiu: lulus_tiu,
lulus_tkp: lulus_tkp
}
])

if(error){
console.log("SAVE RESULT ERROR:", error)
}

// ==========================
// SAVE KE LEADERBOARD
// ==========================

const { error: lbError } = await supabase
.from("leaderboard")
.upsert([
{
user_id: user.id,
to_slug: toSlug,
twk,
tiu,
tkp,
total: score,
lulus_twk,
lulus_tiu,
lulus_tkp
}
], {
onConflict: "user_id,to_slug"
})

if(lbError){
console.log("LEADERBOARD ERROR:", lbError)
}

}