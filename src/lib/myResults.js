import { supabase } from "./supabase"
import { getCurrentUser } from "./auth"

export async function getMyResults(){

const user = await getCurrentUser()

if(!user) return []

const { data,error } = await supabase
.from("results")
.select("*")
.eq("user_id",user.id)
.order("created_at",{ascending:false})
.limit(20)

if(error){
console.log(error)
return []
}

return data

}