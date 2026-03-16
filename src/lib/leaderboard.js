import { supabase } from "./supabase"

export async function getLeaderboard(){

const { data,error } = await supabase
.from("results")
.select(`
score,
correct,
user_id,
users(
name,
email
)
`)
.order("score",{ascending:false})
.limit(20)

if(error){
console.log(error)
return []
}

return data

}