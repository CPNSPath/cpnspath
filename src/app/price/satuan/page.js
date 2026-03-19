"use client"

import Link from "next/link"
import { satuanTO } from "@/lib/packages"

export default function SatuanPage(){

return(

<div className="pricing-page">

<h1>Paket Try Out Satuan</h1>

<div className="pricing-grid">

{satuanTO.map((item)=>{

const num = parseInt(item.slug.replace("to-",""))
const available = num <= 20

if(!available){
  return(
    <div
      key={item.slug}
      className="pricing-card"
      onClick={()=>alert("Tryout belum tersedia 🚧")}
      style={{cursor:"not-allowed",opacity:0.6}}
    >
      <h3>{item.title}</h3>
      <p>{item.soal} soal</p>
      <p>{item.durasi}</p>
      <strong>Rp {item.price.toLocaleString()}</strong>
    </div>
  )
}

return(

<Link
key={item.slug}
href={`/price/satuan/${item.slug}`}
className="pricing-card"
>

<h3>{item.title}</h3>

<p>{item.soal} soal</p>

<p>{item.durasi}</p>

<strong>
Rp {item.price.toLocaleString()}
</strong>

</Link>

)

})}

</div>

</div>

)

}