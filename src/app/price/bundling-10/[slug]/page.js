"use client"

import { useParams } from "next/navigation"
import { bundling10, satuanTO } from "@/lib/packages"
import { buyPackage } from "@/lib/purchase"
import Link from "next/link"
import { useEffect, useState } from "react"
import { checkTryoutAccess } from "@/lib/checkAccess"

export default function DetailBundling10(){

const params = useParams()

const slug = Array.isArray(params.slug)
  ? params.slug[0]
  : params.slug

const paket = bundling10.find((item)=>item.slug===slug)

if(!paket){
return <div>Paket tidak ditemukan</div>
}

// ambil daftar TO
const daftarTO = satuanTO.filter((to)=>
paket.tos?.includes(to.slug)
)

// 🔥 MAP ACCESS
const [accessMap, setAccessMap] = useState({})
const [loading, setLoading] = useState(true)

useEffect(()=>{

const checkAccessAll = async()=>{

let map = {}

for(const to of daftarTO){
const access = await checkTryoutAccess(to.slug)
map[to.slug] = access
}

setAccessMap(map)
setLoading(false)

}

checkAccessAll()

},[slug])

return(

<div className="container">

<h1>{paket.title}</h1>

<div className="card">

<p>Total Tryout : {paket.jumlahTO}</p>

<h2>Rp {paket.price.toLocaleString()}</h2>

<button
className="buy-button"
onClick={()=>buyPackage({
slug: paket.slug,
type: "bundling",
price: paket.price
})}
>
Beli Paket
</button>

</div>

<h2>Daftar Tryout</h2>

<div className="to-list">

{daftarTO.map((to)=>(

<div key={to.slug} className="card">

<h3>{to.title}</h3>
<p>{to.soal} soal</p>
<p>{to.durasi}</p>

{loading ? (

<p>Loading...</p>

) : accessMap[to.slug] ? (

<Link href={`/tryout/${to.slug}`}>
<button className="btn-success">
▶ Mulai Tryout
</button>
</Link>

) : (

<button className="btn-locked">
🔒 Terkunci
</button>

)}

</div>

))}

</div>

</div>

)

}