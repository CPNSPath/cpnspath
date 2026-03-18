"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function GlobalLeaderboard(){

const [data,setData] = useState([])

useEffect(()=>{
load()
},[])

async function load(){

const { data, error } = await supabase
.from("results")
.select(`
  user_id,
  total,
  users!inner(name)
`)
.order("total",{ascending:false})

if(error){
console.log(error)
return
}

// 🔥 GROUP BY USER
const map = {}

data.forEach(item=>{

if(!map[item.user_id]){
map[item.user_id] = {
name: item.users?.name || "User",
total: 0,
count: 0
}
}

map[item.user_id].total += item.total
map[item.user_id].count += 1

})

const final = Object.values(map)
.sort((a,b)=>b.total - a.total)

setData(final)

}

return(

<div style={{
padding:"40px",
background:"#0f172a",
color:"white",
minHeight:"100vh"
}}>

<h1 style={{marginBottom:"20px"}}>
Global Leaderboard
</h1>

{data.map((item,index)=>(

<div key={index} style={{
padding:"14px",
borderBottom:"1px solid #1f2937",
display:"flex",
justifyContent:"space-between"
}}>

<span>
#{index+1} {item.name}
</span>

<span>
{item.total} ( {item.count} TO )
</span>

</div>

))}

</div>

)
}