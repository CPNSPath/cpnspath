"use client"

import { useParams } from "next/navigation"
import { satuanTO } from "@/lib/packages"
import { buyPackage } from "@/lib/purchase"

export default function DetailSatuan(){

const params = useParams()

const slug = Array.isArray(params.slug)
  ? params.slug[0]
  : params.slug

console.log("params:", params)
console.log("slug:", slug)

const paket = satuanTO.find(
(item)=>item.slug===slug
)

if(!paket){
return <div>Paket tidak ditemukan</div>
}

return(

<div className="container">

<h1>{paket.title}</h1>

<div className="card">

<p>Jumlah soal : {paket.soal}</p>
<p>Durasi : {paket.durasi}</p>

<h2>Rp {paket.price.toLocaleString()}</h2>

<button
className="buy-button"
onClick={()=>buyPackage({
slug: paket.slug,
type: "satuan",
price: paket.price
})}
>
Beli Paket
</button>

</div>

</div>

)

}