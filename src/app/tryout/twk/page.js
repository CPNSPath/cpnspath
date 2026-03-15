"use client"

import Link from "next/link"

export default function TWKStart(){

return(

<div style={{
minHeight:"100vh",
background:"#070d1a",
color:"white",
display:"flex",
alignItems:"center",
justifyContent:"center"
}}>

<div style={{
background:"#111827",
padding:"40px",
borderRadius:"10px",
width:"500px",
textAlign:"center"
}}>

<h1>TWK Tryout</h1>

<p>Jumlah soal : 35</p>
<p>Waktu : 30 menit</p>

<Link href="/tryout/twk/exam">

<button style={{
marginTop:"20px",
padding:"12px",
width:"100%",
background:"#2563eb",
border:"none",
borderRadius:"6px",
color:"white"
}}>
Mulai
</button>

</Link>

</div>

</div>

)

}