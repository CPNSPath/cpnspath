"use client"

import { useRouter } from "next/navigation"

export default function TIU(){

const router = useRouter()

return(

<div style={{
minHeight:"100vh",
background:"#070d1a",
color:"white",
fontFamily:"Arial",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}>

<div style={{
background:"#111827",
padding:"40px",
borderRadius:"12px",
textAlign:"center"
}}>

<h1 style={{marginBottom:"10px"}}>
TIU Tryout
</h1>

<p style={{marginBottom:"30px",opacity:0.7}}>
Tes Intelegensi Umum
</p>

<button
onClick={()=>router.push("/tryout/tiu/exam")}
style={{
padding:"12px 30px",
background:"#2563eb",
border:"none",
borderRadius:"8px",
color:"white",
fontSize:"16px",
cursor:"pointer"
}}
>
Mulai Ujian
</button>

</div>

</div>

)

}