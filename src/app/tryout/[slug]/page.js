"use client"

import { useParams,useRouter } from "next/navigation"
import TryoutGuard from "@/components/TryoutGuard"
import { satuanTO } from "@/lib/packages"

export default function TryoutPage(){

const params = useParams()
const router = useRouter()
const slug = params.slug

const tryout = satuanTO.find(
(item)=>item.slug===slug
)

if(!tryout){
return <div className="container">Tryout tidak ditemukan</div>
}

return(

<TryoutGuard packageId={slug}>

<div className="container">

<h1>{tryout.title}</h1>

<div className="card">

<p>Jumlah soal : {tryout.soal}</p>
<p>Durasi : {tryout.durasi}</p>

<button
className="btn-primary"
onClick={()=>router.push(`/tryout/${slug}/exam`)}
>
Mulai Tryout
</button>

</div>

</div>

</TryoutGuard>

)

}