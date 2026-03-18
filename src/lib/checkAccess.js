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
// 🔒 CHECK ACCESS
// ======================
export async function checkTryoutAccess(slug){

const { data: { user } } = await supabase.auth.getUser()

if(!user){
return false
}

const { data, error } = await supabase
.from("user_access")
.select("*")
.eq("user_id", user.id)
.eq("tryout_slug", slug)
.single()

if(error || !data){
return false
}

// 🚨 CEK LIMIT
if(data.used_attempt >= data.max_attempt){
return false
}

return true

}

// ======================
// 🎯 USE ATTEMPT
// ======================
export async function useAttempt(slug){

const { data: { user } } = await supabase.auth.getUser()

if(!user){
return false
}

const { data } = await supabase
.from("user_access")
.select("*")
.eq("user_id", user.id)
.eq("tryout_slug", slug)
.single()

if(!data){
return false
}

// 🚨 CEK LIMIT
if(data.used_attempt >= data.max_attempt){
return false
}

// 🚀 UPDATE
await supabase
.from("user_access")
.update({
used_attempt: data.used_attempt + 1
})
.eq("id", data.id)

return true

}