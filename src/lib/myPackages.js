import { supabase } from "./supabase"
import { getCurrentUser } from "./auth"

export async function getMyPackages(){

const user = await getCurrentUser()

if(!user) return []

const { data, error } = await supabase
.from("purchases")
.select(`
package_id,
packages(
id,
title,
price,
jumlah_to
)
`)
.eq("user_id",user.id)

if(error){
console.log(error)
return []
}

return data

}