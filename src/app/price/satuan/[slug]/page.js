"use client"

import { useParams } from "next/navigation"
import { satuanTO } from "@/lib/packages"
import { buyPackage } from "@/lib/purchase"
import { useEffect, useState } from "react"
import { checkTryoutAccess } from "@/lib/checkAccess"

export default function DetailSatuan(){

const params = useParams()

const [allowed, setAllowed] = useState(false)
const [loading, setLoading] = useState(true)

const slug = Array.isArray(params.slug)
  ? params.slug[0]
  : params.slug

const paket = satuanTO.find(
(item)=>item.slug===slug
)

useEffect(()=>{

const check = async()=>{

const access = await checkTryoutAccess(slug)

setAllowed(access)
setLoading(false)

}

check()

},[slug])

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

{loading ? (

<p>Loading...</p>

) : allowed ? (

<>
<button className="btn-success">
Sudah Dimiliki ✅
</button>

<a href={`/tryout/${paket.slug}`}>
<button className="btn-primary" style={{marginTop:"10px"}}>
Mulai Tryout
</button>
</a>
</>

) : (

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

)}

</div>

</div>

)

}