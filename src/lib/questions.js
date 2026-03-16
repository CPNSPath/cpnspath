import { supabase } from "./supabase"

export async function getQuestions(slug){

if(!slug) return []

const { data, error } = await supabase
.from("questions")
.select(`
id,
question,
option_a,
option_b,
option_c,
option_d,
option_e,
correct_answer
`)
.eq("tryout_slug",slug)
.order("created_at",{ascending:true})

if(error){
console.error("Error loading questions:",error.message)
return []
}

return data || []

}