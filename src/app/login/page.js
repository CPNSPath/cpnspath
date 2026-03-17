"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage(){

const router = useRouter()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)
const [errorMsg,setErrorMsg] = useState("")

const handleLogin = async (e) => {
e.preventDefault()

// reset error
setErrorMsg("")

// validasi sederhana
if(!email || !password){
setErrorMsg("Email dan password wajib diisi")
return
}

setLoading(true)

const { error } = await supabase.auth.signInWithPassword({
email,
password
})

if(error){
setErrorMsg(error.message)
setLoading(false)
return
}

// sukses
router.push("/")
}

return(

<div className="auth-wrapper">
<div className="auth-card">

<h1>Login CPNSPath</h1>

<form className="auth-form" onSubmit={handleLogin}>

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

{errorMsg && <p className="auth-error">{errorMsg}</p>}

<button
className="auth-button"
disabled={loading}
>
{loading ? "Loading..." : "Login"}
</button>

</form>

<p className="auth-link">
Belum punya akun? <a href="/register">Register</a>
</p>

</div>
</div>

)
}