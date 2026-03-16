import { supabase } from "./supabase"
import { getCurrentUser } from "./auth"

export async function checkTryoutAccess(packageId){

const user = await getCurrentUser()

if(!user){
return false
}

const { data, error } = await supabase
.from("purchases")
.select("id")
.eq("user_id",user.id)
.eq("package_id",packageId)

if(error){
console.log(error)
return false
}

return data.length > 0

}