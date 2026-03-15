"use client"

import { useRouter } from "next/navigation"

export default function Tryout(){

const router = useRouter()

return(

<div style={{
minHeight:"100vh",
background:"linear-gradient(180deg,#070d1a,#020617)",
color:"white",
display:"flex",
justifyContent:"center",
alignItems:"center",
padding:"40px"
}}>

<div style={{
maxWidth:"900px",
width:"100%"
}}>

<h1 style={{
fontSize:"40px",
fontWeight:"700",
textAlign:"center",
marginBottom:"10px"
}}>
Free Trial Tryout
</h1>

<p style={{
textAlign:"center",
opacity:"0.7",
marginBottom:"50px"
}}>
Pilih jenis ujian yang ingin kamu kerjakan
</p>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"30px"
}}>

{/* TWK */}

<div
onClick={()=>router.push("/tryout/twk")}
style={{
background:"#111827",
padding:"40px",
borderRadius:"12px",
cursor:"pointer",
transition:"0.2s",
border:"1px solid #1f2937"
}}
>

<h2 style={{marginBottom:"10px"}}>TWK</h2>

<p style={{opacity:"0.6",fontSize:"14px"}}>
Tes Wawasan Kebangsaan
</p>

<p style={{
marginTop:"20px",
fontSize:"14px",
opacity:"0.5"
}}>
35 soal • 30 menit
</p>

</div>

{/* TIU */}

<div
onClick={()=>router.push("/tryout/tiu")}
style={{
background:"#111827",
padding:"40px",
borderRadius:"12px",
cursor:"pointer",
transition:"0.2s",
border:"1px solid #1f2937"
}}
>

<h2 style={{marginBottom:"10px"}}>TIU</h2>

<p style={{opacity:"0.6",fontSize:"14px"}}>
Tes Intelegensi Umum
</p>

<p style={{
marginTop:"20px",
fontSize:"14px",
opacity:"0.5"
}}>
30 soal • 30 menit
</p>

</div>

{/* TKP */}

<div
onClick={()=>router.push("/tryout/tkp")}
style={{
background:"#111827",
padding:"40px",
borderRadius:"12px",
cursor:"pointer",
transition:"0.2s",
border:"1px solid #1f2937"
}}
>

<h2 style={{marginBottom:"10px"}}>TKP</h2>

<p style={{opacity:"0.6",fontSize:"14px"}}>
Tes Karakteristik Pribadi
</p>

<p style={{
marginTop:"20px",
fontSize:"14px",
opacity:"0.5"
}}>
35 soal • 30 menit
</p>

</div>

</div>

</div>

</div>

)

}