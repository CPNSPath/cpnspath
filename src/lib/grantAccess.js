import { supabase } from "./supabase"
import { bundling5, bundling10 } from "./packages"

export async function grantAccess(userId, paketSlug){

// 🔍 cari paket di bundling5
let paket = bundling5.find(p => p.slug === paketSlug)

// 🔍 kalau tidak ada, cek bundling10
if(!paket){
paket = bundling10.find(p => p.slug === paketSlug)
}

// ❌ kalau tidak ditemukan
if(!paket){
console.log("Paket tidak ditemukan")
return
}

// 🔥 ambil semua tryout
const tos = paket.tos

// 🔥 mapping jadi insert data
const rows = tos.map((slug)=>({
user_id: userId,
tryout_slug: slug
}))

// 🔥 insert ke database
const { error } = await supabase
.from("user_access")
.insert(rows, { ignoreDuplicates: true })

if(error){
console.log("Grant access error:", error)
return
}

console.log("Access granted:", rows)

}