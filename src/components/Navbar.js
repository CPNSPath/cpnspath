"use client"

import Link from "next/link"
import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Navbar(){

const [user,setUser] = useState(null)
const router = useRouter()

useEffect(()=>{

async function getUser(){

const { data } = await supabase.auth.getUser()

if(data?.user){
setUser(data.user)
}

}

getUser()

},[])

const logout = async()=>{

await supabase.auth.signOut()
router.push("/")

}

return(

<header className="navbar">

<div className="navbar-inner">

<div className="nav-left">

<Link href="/">
<span className="logo">CPNS PATH</span>
</Link>

</div>

<nav className="nav-center">

<Link href="/">Beranda</Link>
<Link href="/informasi">Informasi</Link>
<Link href="/contact">Contact Person</Link>
<Link href="/tryout">Free Trial TO</Link>
<Link href="/price">Paket TO</Link>

</nav>

<div className="nav-right">

{!user && (

<Link href="/login">
<button className="login-btn">
Masuk
</button>
</Link>

)}

{user && (

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