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

// auth listener agar navbar update realtime
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

<Link href="/" prefetch={true}>
<span
className="logo"
style={{cursor:"pointer"}}
>
CPNS PATH
</span>
</Link>

</div>

<nav className="nav-center">

<Link href="/" prefetch={true}>Beranda</Link>

<Link href="/informasi" prefetch={true}>
Informasi
</Link>

<Link href="/contact" prefetch={true}>
Contact Person
</Link>

<Link href="/tryout" prefetch={true}>
Free Trial TO
</Link>

<Link href="/price" prefetch={true}>
Paket TO
</Link>

</nav>

<div className="nav-right">

{/* loading state agar tidak flicker */}
{loading && (

<button className="login-btn">
Loading...
</button>

)}

{/* jika belum login */}

{!loading && !user && (

<Link href="/login" prefetch={true}>
<button
className="login-btn"
style={{cursor:"pointer"}}
>
Masuk
</button>
</Link>

)}

{/* jika sudah login */}

{!loading && user && (

<div style={{display:"flex",gap:"10px"}}>

<Link href="/dashboard" prefetch={true}>
<button
className="login-btn"
style={{cursor:"pointer"}}
>
Dashboard
</button>
</Link>

<button
className="login-btn"
style={{cursor:"pointer"}}
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