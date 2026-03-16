import { supabase } from "./supabase"
import { getCurrentUser } from "./auth"

export async function buyPackage(packageId){

const user = await getCurrentUser()

if(!user){
alert("Silakan login terlebih dahulu")
return
}

const { data:existing } = await supabase
.from("purchases")
.select("*")
.eq("user_id",user.id)
.eq("package_id",packageId)

if(existing.length > 0){
alert("Paket sudah dimiliki")
return
}

const { error } = await supabase
.from("purchases")
.insert([
{
user_id:user.id,
package_id:packageId
}
])

if(error){
alert(error.message)
return
}

alert("Paket berhasil dibeli!")

}