"use client"

import Link from "next/link"
import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Navbar(){

const [user,setUser] = useState(null)
const [loading,setLoading] = useState(true)

const router = useRouter()

useEffect(()=>{

async function getUser(){

try{

const { data } = await supabase.auth.getUser()

if(data?.user){
setUser(data.user)
}else{
setUser(null)
}

}catch(err){

console.log("Navbar auth error:",err)

}finally{

setLoading(false)

}

}

getUser()

// listener supaya navbar update realtime
const { data:listener } = supabase.auth.onAuthStateChange(
(event,session)=>{
setUser(session?.user ?? null)
}
)

return ()=>{

listener?.subscription?.unsubscribe()

}

},[])

const logout = async()=>{

try{

await supabase.auth.signOut()

setUser(null)

router.push("/")

}catch(err){

console.log("Logout error:",err)

}

}

return(

<header
className="navbar"
style={{
position:"sticky",
top:0,
zIndex:9999,
background:"#0f172a"
}}
>

<div className="navbar-inner">

<div className="nav-left">

<Link href="/">
<span
className="logo"
style={{cursor:"pointer"}}
>
CPNS PATH
</span>
</Link>

</div>

<nav className="nav-center">

<Link href="/">Beranda</Link>

<Link href="/tryout">
Free Trial TO
</Link>

<Link href="/price">
Paket TO
</Link>

</nav>

<div className="nav-right">

{loading && (

<button className="login-btn">
Loading...
</button>

)}

{!loading && !user && (

<Link href="/login">
<button className="login-btn">
Masuk
</button>
</Link>

)}

{!loading && user && (

<div style={{display:"flex",gap:"10px"}}>

<Link href="/dashboard">
<button className="login-btn">
Dashboard
</button>
</Link>

<button
className="login-btn"
onClick={logout}
>
Logout
</button>

</div>

)}

</div>

</div>

</header>

)

}