"use client"

import Link from "next/link"

export default function Home(){

return(

<div style={{
minHeight:"100vh",
background:"#070d1a",
color:"white",
fontFamily:"Arial",
display:"flex",
alignItems:"center",
justifyContent:"center"
}}>

<div style={{
maxWidth:"800px",
textAlign:"center"
}}>

<h1 style={{
fontSize:"56px",
marginBottom:"20px"
}}>
CPNSPath
</h1>

<p style={{
fontSize:"18px",
opacity:0.7,
marginBottom:"40px"
}}>
Platform latihan CPNS untuk membantu pejuang ASN
membiasakan diri dengan sistem ujian TWK, TIU, dan TKP.
</p>

<div style={{
display:"flex",
gap:"20px",
justifyContent:"center"
}}>

<Link href="/tryout">

<button style={{
padding:"14px 28px",
background:"#2563eb",
border:"none",
borderRadius:"8px",
color:"white",
fontSize:"16px",
cursor:"pointer"
}}>
Free Trial
</button>

</Link>

<Link href="/price">

<button style={{
padding:"14px 28px",
background:"transparent",
border:"1px solid #374151",
borderRadius:"8px",
color:"white",
fontSize:"16px",
cursor:"pointer"
}}>
Lihat Paket Tryout
</button>

</Link>

</div>

</div>

</div>

)

}