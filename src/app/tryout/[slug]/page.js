"use client"

import { useParams } from "next/navigation"
import TryoutGuard from "@/components/TryoutGuard"

export default function TryoutPage(){

const params = useParams()
const slug = params.slug

return(

<TryoutGuard packageId={slug}>

<div className="container">

<h1>Tryout {slug}</h1>

<p>Soal tryout akan tampil di sini</p>

</div>

</TryoutGuard>

)

}