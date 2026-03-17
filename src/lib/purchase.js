import { getCurrentUser } from "./auth"

export async function buyPackage(paket){

const user = await getCurrentUser()

if(!user){
alert("Silakan login terlebih dahulu")
return
}

try{

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
alert("Pembayaran berhasil! (menunggu verifikasi)")
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