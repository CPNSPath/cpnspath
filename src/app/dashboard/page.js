"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { getMyPackages } from "@/lib/myPackages"
import { getMyResults } from "@/lib/myResults_temp"

export default function Dashboard(){

const router = useRouter()

const [user,setUser] = useState(null)
const [packages,setPackages] = useState([])
const [results,setResults] = useState([])
const [loading,setLoading] = useState(true)

useEffect(()=>{

const initializeDashboard = async()=>{

try{

// cek user login
const { data, error } = await supabase.auth.getUser()

if(error || !data.user){
router.push("/login")
return
}

setUser(data.user)

// ambil paket user
const myPackages = await getMyPackages()
const myResults = await getMyResults()

setPackages(myPackages)
setResults(myResults)

}catch(err){

console.error("Dashboard error:",err)

}finally{

setLoading(false)

}

}

initializeDashboard()

},[])

const logout = async()=>{

await supabase.auth.signOut()

router.push("/")

}

if(loading){
return(
<div className="container">
<h2>Memuat dashboard...</h2>
</div>
)
}

return(

<div className="container">

<h1>Dashboard Saya</h1>

{user && (

<div className="card">

<h3>{user.email}</h3>

<p>ID User : {user.id}</p>

<button className="btn-warning" onClick={logout}>
Logout
</button>

</div>

)}

<h2>Paket Tryout Saya</h2>
<h2 style={{marginTop:"40px"}}>Riwayat Tryout</h2>

<div className="pricing-grid">

{results.length === 0 && (

<div className="card">
<p>Belum ada hasil tryout</p>
</div>

)}

{results.map((r,i)=>(

<div key={i} className="card">

<h3>{r.to_slug}</h3>

<p>Score : {r.score}</p>

<p>Benar : {r.correct}</p>

<p>Salah : {r.wrong}</p>

</div>

))}

</div>

<div className="pricing-grid">

{packages.length === 0 && (

<div className="card">
<p>Anda belum membeli paket tryout</p>
</div>

)}

{packages.map((item,index)=>{

const paket = item.packages

return(

<div key={index} className="pricing-card">

<h3>{paket?.title}</h3>

<p>{paket?.jumlah_to} Tryout</p>

<a href="/tryout">
<button className="btn-primary">
Mulai Tryout
</button>
</a>

</div>

)

})}

</div>

</div>

)

}