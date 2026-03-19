import { supabase } from "./supabase"
import { getCurrentUser } from "./auth"
import { grantAccess } from "./grantAccess"

export async function buyPackage(paket){

const user = await getCurrentUser()

if(!user){
alert("Silakan login terlebih dahulu")
window.location.href = "/login"
return
}

try{

// ==============================
// 🔥 DEV MODE (GLOBAL)
// ==============================
if(process.env.NEXT_PUBLIC_DEV_MODE === "true"){

await grantAccess(user.id, paket.slug)

alert("DEV MODE: Paket langsung terbuka 🚀")

return
}

// ==============================
// 💳 MIDTRANS
// ==============================

const res = await fetch("/api/create-transaction",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user_id: user.id,
item_id: paket.slug,
type: paket.type,
price: paket.price
})
})

const data = await res.json()

window.snap.pay(data.token,{
onSuccess: function(){
alert("Pembayaran berhasil!")
},
onPending: function(){
alert("Menunggu pembayaran")
},
onError: function(){
alert("Pembayaran gagal")
}
})

}catch(err){
console.log(err)
alert("Terjadi kesalahan")
}

}