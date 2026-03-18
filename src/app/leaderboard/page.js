"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Leaderboard(){

const [data,setData] = useState([])
const [slug,setSlug] = useState("to-1")

useEffect(()=>{
load()
},[slug])

async function load(){

const { data, error } = await supabase
.from("leaderboard")
.select(`
  *,
  users(name)
`)
.eq("to_slug", slug)
.order("total",{ascending:false})
.limit(20)

if(error){
console.log(error)
return
}

setData(data || [])

}

return(

<div style={{
padding:"40px",
background:"#0f172a",
color:"white",
minHeight:"100vh"
}}>

<h1 style={{marginBottom:"20px"}}>
Leaderboard {slug}
</h1>

<select
value={slug}
onChange={(e)=>setSlug(e.target.value)}
style={{
marginBottom:"25px",
padding:"10px",
background:"#020617",
color:"white"
}}
>
{Array.from({length:100},(_,i)=>(
<option key={i} value={`to-${i+1}`}>
TO {i+1}
</option>
))}
</select>

{data.length === 0 && (
<p style={{opacity:0.7}}>Belum ada data</p>
)}

{data.map((item,index)=>{

const isTop3 = index < 3

return(

<div key={index} style={{
padding:"14px",
borderBottom:"1px solid #1f2937",
display:"flex",
justifyContent:"space-between",
background: isTop3 ? "#1e293b" : "transparent",
borderRadius:"6px",
marginBottom:"5px"
}}>

<span>
#{index+1} {item.users?.name || "User"}
</span>

<span style={{fontWeight:"bold"}}>
{item.total}
</span>

</div>

)

})}

</div>

)
}