"use client"

import { useRouter } from "next/navigation"

export default function PortalMenu(){

const router = useRouter()

return(

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"40px",
marginTop:"50px"
}}>

{/* TWK */}

<div
onClick={()=>router.push("/tryout/twk")}
style={{
background:"var(--card)",
padding:"30px",
borderRadius:"12px",
cursor:"pointer",
textAlign:"center"
}}
>

<div style={{fontSize:"40px"}}>📜</div>

<h3>TWK</h3>

<p style={{opacity:"0.7"}}>
Tes Wawasan Kebangsaan
</p>

</div>


{/* TIU */}

<div
onClick={()=>router.push("/tryout/tiu")}
style={{
background:"var(--card)",
padding:"30px",
borderRadius:"12px",
cursor:"pointer",
textAlign:"center"
}}
>

<div style={{fontSize:"40px"}}>🧠</div>

<h3>TIU</h3>

<p style={{opacity:"0.7"}}>
Tes Intelegensi Umum
</p>

</div>


{/* TKP */}

<div
onClick={()=>router.push("/tryout/tkp")}
style={{
background:"var(--card)",
padding:"30px",
borderRadius:"12px",
cursor:"pointer",
textAlign:"center"
}}
>

<div style={{fontSize:"40px"}}>💼</div>

<h3>TKP</h3>

<p style={{opacity:"0.7"}}>
Tes Karakteristik Pribadi
</p>

</div>

</div>

)

}