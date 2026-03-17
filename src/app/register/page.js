"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function RegisterPage(){

const router = useRouter()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [confirmPassword,setConfirmPassword] = useState("")
const [loading,setLoading] = useState(false)
const [errorMsg,setErrorMsg] = useState("")
const [successMsg,setSuccessMsg] = useState("")

const handleRegister = async (e) => {
e.preventDefault()

setErrorMsg("")
setSuccessMsg("")

// validasi
if(!email || !password){
setErrorMsg("Semua field wajib diisi")
return
}

if(password.length < 6){
setErrorMsg("Password minimal 6 karakter")
return
}

if(password !== confirmPassword){
setErrorMsg("Password tidak sama")
return
}

setLoading(true)

const { error } = await supabase.auth.signUp({
email,
password
})

if(error){
setErrorMsg(error.message)
setLoading(false)
return
}

setSuccessMsg("Registrasi berhasil! Silakan login.")
setLoading(false)

setTimeout(()=>{
router.push("/login")
},1500)
}

return(

<div className="auth-wrapper">
<div className="auth-card">

<h1>Register CPNSPath</h1>

<form className="auth-form" onSubmit={handleRegister}>

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

<input
className="auth-input"
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
/>

{errorMsg && <p className="auth-error">{errorMsg}</p>}
{successMsg && <p className="auth-success">{successMsg}</p>}

<button
className="auth-button"
disabled={loading}
>
{loading ? "Processing..." : "Register"}
</button>

</form>

<p className="auth-link">
Sudah punya akun? <a href="/login">Login</a>
</p>

</div>
</div>

)
}