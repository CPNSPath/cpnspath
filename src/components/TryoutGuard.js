"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkTryoutAccess } from "@/lib/checkAccess"

export default function TryoutGuard({ packageId, children }) {

const router = useRouter()
const [loading,setLoading] = useState(true)

useEffect(()=>{

const verify = async ()=>{

const allowed = await checkTryoutAccess(packageId)

if(!allowed){
alert("Anda belum membeli paket ini")
router.push("/price")
return
}

setLoading(false)

}

verify()

},[])

if(loading){
return(
<div className="container">
<h2>Memverifikasi akses...</h2>
</div>
)
}

return children

}