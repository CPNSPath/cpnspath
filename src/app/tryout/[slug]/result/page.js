"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function ResultPage(){

const params = useParams()
const router = useRouter()
const slug = params.slug

const [data,setData] = useState(null)

useEffect(()=>{

const saved = localStorage.getItem(slug+"_result")

if(!saved){
router.replace("/dashboard")
return
}

setData(JSON.parse(saved))

},[slug])

if(!data){
return <div style={{color:"white",padding:"40px"}}>Loading...</div>
}

// ==========================
// STATUS
// ==========================

const allPassed = data.lulus_twk && data.lulus_tiu && data.lulus_tkp

function box(title,value,lulus){

return(
<div style={{
flex:1,
padding:"20px",
borderRadius:"10px",
background:"#020617",
border:"1px solid #1f2937",
textAlign:"center"
}}>

<div style={{opacity:0.7,fontSize:"14px"}}>{title}</div>

<div style={{
fontSize:"28px",
fontWeight:"bold",
margin:"10px 0"
}}>
{value}
</div>

<div style={{
color:lulus ? "#22c55e" : "#ef4444",
fontWeight:"bold"
}}>
{lulus ? "LULUS" : "TIDAK"}
</div>

</div>
)

}

// ==========================
// UI
// ==========================

return(

<div style={{
minHeight:"100vh",
background:"#0f172a",
color:"white",
padding:"40px",
fontFamily:"Arial"
}}>

<h1 style={{fontSize:"28px",marginBottom:"30px"}}>
Hasil Tryout
</h1>

{/* TOTAL */}

<div style={{
padding:"30px",
borderRadius:"12px",
background: allPassed ? "#052e16" : "#3f1d1d",
border:"1px solid #1f2937",
marginBottom:"30px"
}}>

<div style={{fontSize:"16px",opacity:"0.7"}}>
Total Nilai
</div>

<div style={{fontSize:"42px",fontWeight:"bold"}}>
{data.total}
</div>

<div style={{
marginTop:"10px",
fontWeight:"bold",
color: allPassed ? "#22c55e" : "#ef4444"
}}>
{allPassed ? "ANDA LULUS 🎉" : "ANDA BELUM LULUS"}
</div>

</div>

{/* DETAIL */}

<div style={{
display:"flex",
gap:"15px",
marginBottom:"30px"
}}>

{box("TWK",data.twk,data.lulus_twk)}
{box("TIU",data.tiu,data.lulus_tiu)}
{box("TKP",data.tkp,data.lulus_tkp)}

</div>

{/* STATS */}

<div style={{
background:"#020617",
padding:"20px",
borderRadius:"10px",
border:"1px solid #1f2937"
}}>

<div>Benar : {data.correct}</div>
<div>Salah : {data.wrong}</div>
<div>Kosong : {data.empty}</div>

</div>

{/* BUTTON */}

<div style={{marginTop:"30px"}}>

<button
onClick={()=>router.push("/dashboard")}
style={{
padding:"12px 25px",
background:"#2563eb",
border:"none",
borderRadius:"8px",
color:"white",
cursor:"pointer"
}}
>
Kembali ke Dashboard
</button>

</div>

</div>

)

}