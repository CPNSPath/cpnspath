"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Result(){

const [results,setResults] = useState([])
const [top,setTop] = useState([])

useEffect(()=>{

loadResults()

},[])

async function loadResults(){

const {data,error} = await supabase
.from("results")
.select("*")
.order("score",{ascending:false})

if(data){

setResults(data)
setTop(data.slice(0,10))

}

}

return(

<div style={{
minHeight:"100vh",
background:"#070d1a",
color:"white",
fontFamily:"Arial",
padding:"60px"
}}>

<div style={{
maxWidth:"900px",
margin:"auto"
}}>

<h1 style={{marginBottom:"30px"}}>
Hasil Tryout
</h1>

<div style={{
background:"#111827",
padding:"30px",
borderRadius:"10px",
marginBottom:"30px"
}}>

<h2 style={{marginBottom:"20px"}}>
Leaderboard
</h2>

{top.length === 0 && (
<p style={{opacity:0.7}}>
Belum ada data.
</p>
)}

{top.map((item,index)=>(

<div
key={index}
style={{
display:"flex",
justifyContent:"space-between",
padding:"10px 0",
borderBottom:"1px solid #1f2937"
}}
>

<span>
{index+1}. {item.name}
</span>

<span>
Score: {item.score}
</span>

</div>

))}

</div>

</div>

</div>

)

}