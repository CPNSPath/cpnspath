"use client"

import { useParams } from "next/navigation"
import { satuanTO } from "@/lib/packages"
import { buyPackage } from "@/lib/purchase"

export default function DetailSatuan(){

const params = useParams()
const slug = params.slug

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
onClick={()=>buyPackage(paket.slug)}
>
Beli Paket
</button>

</div>

</div>

)

}