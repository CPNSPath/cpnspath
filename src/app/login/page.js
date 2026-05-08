"use client"

import { useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMsg("")

    if (!email || !password) {
      setErrorMsg("Email dan password wajib diisi")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
      return
    }

    router.push("/")
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <span
              className="text-2xl font-bold text-[#1E3A8A]"
              style={{ fontFamily: "var(--font-plus-jakarta, var(--font-poppins))" }}
            >
              CPNS Path
            </span>
          </Link>
        </div>

        <Card variant="elevated" className="p-8">
          <div className="text-center mb-8">
            <h1 className="heading-2 text-[#0F172A]">Welcome Back</h1>
            <p className="body-small text-[#64748B] mt-2">Sign in to continue your CPNS journey</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <div className="text-right mt-1.5">
                <span className="text-xs text-[#2563EB] cursor-pointer hover:text-[#1D4ED8] transition-colors">
                  Forgot password?
                </span>
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-[#DC2626] bg-[#FEE2E2] border border-[#FECACA] rounded-md px-4 py-2.5" role="alert">
                {errorMsg}
              </p>
            )}

            <Button type="submit" variant="primary" fullWidth loading={loading} className="mt-2">
              Sign In
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E2E8F0]" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-xs text-[#94A3B8]">or</span>
            </div>
          </div>

          <p className="text-center text-sm text-[#64748B]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors">
              Sign up
            </Link>
          </p>
        </Card>

      </div>
    </div>
  )
}
