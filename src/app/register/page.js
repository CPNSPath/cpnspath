"use client"

import { useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"

export default function RegisterPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [terms, setTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()
    setErrorMsg("")
    setSuccessMsg("")

    if (!email || !password) {
      setErrorMsg("Semua field wajib diisi")
      return
    }

    if (password.length < 6) {
      setErrorMsg("Password minimal 6 karakter")
      return
    }

    if (password !== confirmPassword) {
      setErrorMsg("Password tidak sama")
      return
    }

    if (!terms) {
      setErrorMsg("Kamu harus menyetujui Terms & Privacy Policy")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
      return
    }

    setSuccessMsg("Registrasi berhasil! Silakan login.")
    setLoading(false)

    setTimeout(() => {
      router.push("/login")
    }, 1500)
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
            <h1 className="heading-2 text-[#0F172A]">Start Your CPNS Journey</h1>
            <p className="body-small text-[#64748B] mt-2">Create free account, no credit card required</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4" noValidate>
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Ulangi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />

            {/* Terms checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-[#CBD5E1] text-[#1E3A8A] accent-[#1E3A8A] flex-shrink-0"
              />
              <span className="text-sm text-[#64748B]">
                I agree to the{" "}
                <span className="text-[#2563EB] hover:underline cursor-pointer">Terms of Service</span>
                {" "}&amp;{" "}
                <span className="text-[#2563EB] hover:underline cursor-pointer">Privacy Policy</span>
              </span>
            </label>

            {errorMsg && (
              <p className="text-xs text-[#DC2626] bg-[#FEE2E2] border border-[#FECACA] rounded-md px-4 py-2.5" role="alert">
                {errorMsg}
              </p>
            )}

            {successMsg && (
              <p className="text-xs text-[#059669] bg-[#D1FAE5] border border-[#A7F3D0] rounded-md px-4 py-2.5" role="status">
                {successMsg}
              </p>
            )}

            <Button type="submit" variant="primary" fullWidth loading={loading} className="mt-2">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-[#64748B] mt-6">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors">
              Sign in
            </Link>
          </p>
        </Card>

      </div>
    </div>
  )
}
