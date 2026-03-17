import { supabase } from "./supabase"
import { bundling5, bundling10 } from "./packages"

// ======================
// 🔓 GRANT ACCESS
// ======================
export async function grantAccess(userId, slug){

let tryouts = []

// satuan
if(slug.startsWith("to-")){
tryouts = [slug]
}

// bundling 5
const b5 = bundling5.find(p=>p.slug === slug)
if(b5){
tryouts = b5.tos
}

// bundling 10
const b10 = bundling10.find(p=>p.slug === slug)
if(b10){
tryouts = b10.tos
}

// insert DB
for(const to of tryouts){

await supabase.from("user_access").insert({
user_id: userId,
tryout_slug: to
})

}

}

// ======================
// 🔒 CHECK ACCESS (INI YANG KURANG)
// ======================
export async function checkTryoutAccess(slug){

const { data: { user } } = await supabase.auth.getUser()

if(!user){
return false
}

const { data, error } = await supabase
.from("user_access")
.select("id")
.eq("user_id", user.id)
.eq("tryout_slug", slug)

if(error){
console.log("Access error:", error)
return false
}

return data && data.length > 0

}