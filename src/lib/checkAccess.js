import { supabase } from "./supabase"
import { getCurrentUser } from "./auth"

export async function checkTryoutAccess(packageId){

const user = await getCurrentUser()

if(!user){
console.log("User belum login")
return false
}

const { data, error } = await supabase
.from("purchases")
.select("id")
.eq("user_id",user.id)
.eq("package_id",packageId)

if(error){
console.log("Access error:",error)
return false
}

console.log("Access result:",data)

return data && data.length > 0

}