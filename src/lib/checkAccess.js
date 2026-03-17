import { supabase } from "./supabase"
import { bundling5, bundling10 } from "./packages"

export async function grantAccess(userId, slug){

let tryouts = []

// ======================
// CEK JENIS PAKET
// ======================

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

// ======================
// INSERT KE DB
// ======================

for(const to of tryouts){

await supabase.from("user_access").insert({
user_id: userId,
tryout_slug: to
})

}

}