"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage(){

const router = useRouter()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)

const handleLogin = async () => {

setLoading(true)

const { error } = await supabase.auth.signInWithPassword({
email: email,
password: password
})

if(error){
alert(error.message)
setLoading(false)
return
}

router.push("/")

}

return(

<div className="auth-wrapper">

<div className="auth-card">

<h1>Login CPNSPath</h1>

<div className="auth-form">

<input
className="auth-input"
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
className="auth-input"
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="auth-button"
onClick={handleLogin}
disabled={loading}
>
{loading ? "Loading..." : "Login"}
</button>

</div>

<p className="auth-link">
Belum punya akun? <a href="/register">Register</a>
</p>

</div>

</div>

)

}