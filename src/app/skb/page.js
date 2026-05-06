"use client"

import Link from "next/link"
import { satuanSKB } from "@/lib/packages"

export default function SKBPage(){

return(

<div className="pricing-page">

<h1>SKB Tryout</h1>

<div className="pricing-grid">

{satuanSKB.map((item)=>(

<Link
key={item.slug}
href={`/tryout/${item.slug}`} // ⬅️ MASUK SYSTEM LAMA
className="pricing-card"
>

<h3>{item.title}</h3>
<p>{item.soal} soal</p>
<p>{item.durasi}</p>

</Link>

))}

</div>

</div>

)

}