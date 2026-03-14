"use client"

import Link from "next/link"

export default function Tryout(){

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

<div style={{maxWidth:"900px",width:"100%"}}>

<h1 style={{
fontSize:"40px",
marginBottom:"10px",
textAlign:"center"
}}>
Free Trial Tryout
</h1>

<p style={{
opacity:0.7,
marginBottom:"40px",
textAlign:"center"
}}>
Pilih jenis tes yang ingin kamu kerjakan.
</p>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"20px"
}}>

{/* TWK */}

<div style={{
background:"#111827",
padding:"30px",
borderRadius:"10px",
textAlign:"center"
}}>

<h2>TWK</h2>

<p style={{opacity:0.7}}>
Tes Wawasan Kebangsaan
</p>

<Link href="/tryout/twk">

<button style={{
marginTop:"20px",
padding:"10px 20px",
background:"#2563eb",
border:"none",
borderRadius:"6px",
color:"white",
cursor:"pointer"
}}>
Mulai Tes
</button>

</Link>

</div>

{/* TIU */}

<div style={{
background:"#111827",
padding:"30px",
borderRadius:"10px",
textAlign:"center"
}}>

<h2>TIU</h2>

<p style={{opacity:0.7}}>
Tes Intelegensi Umum
</p>

<Link href="/tryout/tiu">

<button style={{
marginTop:"20px",
padding:"10px 20px",
background:"#2563eb",
border:"none",
borderRadius:"6px",
color:"white",
cursor:"pointer"
}}>
Mulai Tes
</button>

</Link>

</div>

{/* TKP */}

<div style={{
background:"#111827",
padding:"30px",
borderRadius:"10px",
textAlign:"center"
}}>

<h2>TKP</h2>

<p style={{opacity:0.7}}>
Tes Karakteristik Pribadi
</p>

<Link href="/tryout/tkp">

<button style={{
marginTop:"20px",
padding:"10px 20px",
background:"#2563eb",
border:"none",
borderRadius:"6px",
color:"white",
cursor:"pointer"
}}>
Mulai Tes
</button>

</Link>

</div>

</div>

</div>

</div>

)

}