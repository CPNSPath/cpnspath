"use client"

import { useRouter } from "next/navigation"

export default function TKPIntro(){

const router = useRouter()

return(

<div style={{
minHeight:"100vh",
background:"linear-gradient(180deg,#070d1a,#020617)",
display:"flex",
justifyContent:"center",
alignItems:"center",
padding:"40px",
color:"white"
}}>

<div style={{
width:"100%",
maxWidth:"700px",
background:"#111827",
borderRadius:"14px",
padding:"50px",
border:"1px solid #1f2937"
}}>

<h1 style={{
fontSize:"32px",
marginBottom:"10px"
}}>
Tryout TKP
</h1>

<p style={{
opacity:"0.6",
marginBottom:"40px"
}}>
Tes Karakteristik Pribadi
</p>

<div style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"20px",
marginBottom:"40px"
}}>

<div style={{
background:"#020617",
padding:"20px",
borderRadius:"8px"
}}>
<p style={{opacity:"0.6",fontSize:"14px"}}>
Jumlah Soal
</p>
<h3>35 Soal</h3>
</div>

<div style={{
background:"#020617",
padding:"20px",
borderRadius:"8px"
}}>
<p style={{opacity:"0.6",fontSize:"14px"}}>
Durasi
</p>
<h3>30 Menit</h3>
</div>

<div style={{
background:"#020617",
padding:"20px",
borderRadius:"8px"
}}>
<p style={{opacity:"0.6",fontSize:"14px"}}>
Passing Grade
</p>
<h3>166</h3>
</div>

<div style={{
background:"#020617",
padding:"20px",
borderRadius:"8px"
}}>
<p style={{opacity:"0.6",fontSize:"14px"}}>
Tipe
</p>
<h3>Multiple Choice</h3>
</div>

</div>

<button
onClick={()=>router.push("/tryout/tkp/exam")}
style={{
width:"100%",
padding:"14px",
background:"#2563eb",
border:"none",
borderRadius:"8px",
fontSize:"16px",
color:"white",
cursor:"pointer"
}}
>
Mulai Tryout
</button>

</div>

</div>

)

}