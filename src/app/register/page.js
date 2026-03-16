"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function RegisterPage(){

const router = useRouter()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)

const handleRegister = async () => {

setLoading(true)

const { error } = await supabase.auth.signUp({
email: email,
password: password
})

if(error){
alert(error.message)
setLoading(false)
return
}

alert("Registrasi berhasil! Silakan login.")

router.push("/login")

}

return(

<div className="auth-wrapper">

<div className="auth-card">

<h1>Register CPNSPath</h1>

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
onClick={handleRegister}
disabled={loading}
>
{loading ? "Processing..." : "Register"}
</button>

</div>

<p className="auth-link">
Sudah punya akun? <a href="/login">Login</a>
</p>

</div>

</div>

)

}