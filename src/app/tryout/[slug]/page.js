"use client"

import { useParams,useRouter } from "next/navigation"
import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import TryoutGuard from "@/components/TryoutGuard"

export default function TryoutPage(){

const params = useParams()
const router = useRouter()
const slug = params.slug

const [tryout,setTryout] = useState(null)

useEffect(()=>{
  const getTryout = async ()=>{
    const { data } = await supabase
      .from("tryouts")
      .select("*")
      .eq("slug",slug)
      .single()

    setTryout(data)
  }

  getTryout()
},[slug])

if(!tryout){
  return <div className="container">Loading...</div>
}

return(

<TryoutGuard packageId={slug}>

<div className="container">

<h1>{tryout.title}</h1>

<div className="card">

<p>Jumlah soal : {tryout.total_questions}</p>
<p>Durasi : {tryout.duration}</p>

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