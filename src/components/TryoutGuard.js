"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkTryoutAccess } from "@/lib/checkAccess"

export default function TryoutGuard({ packageId, children }) {

const router = useRouter()
const [loading,setLoading] = useState(true)
const [allowed,setAllowed] = useState(false)

useEffect(()=>{

const verify = async ()=>{

try{

// =========================
// DEV MODE (DEVELOPER BYPASS)
// =========================

if(process.env.NODE_ENV === "development"){

console.log("Developer mode active → bypass purchase check")

setAllowed(true)
setLoading(false)
return

}

// =========================
// NORMAL CHECK
// =========================

const access = await checkTryoutAccess(packageId)

if(!access){

router.push(`/price?locked=${packageId}`)
return

}

setAllowed(true)
setLoading(false)

}catch(err){

console.error("Access check error:",err)

alert("Terjadi kesalahan sistem")
router.push("/")

}

}

verify()

},[packageId,router])

if(loading){

return(

<div className="container" style={{textAlign:"center", marginTop:"100px"}}>

<h2>🔒 Memverifikasi akses...</h2>
<p style={{opacity:0.7}}>Sedang mengecek paket Anda...</p>

</div>

)

}

if(!allowed){

return null

}

return children

}