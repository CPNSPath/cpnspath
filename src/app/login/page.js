"use client"

import { useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
const ADMIN_EMAILS = ["3082240019_tito@pknstan.ac.id"]

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

    // Admin → langsung ke panel admin, user biasa → homepage seperti biasa
    if (ADMIN_EMAILS.includes(email.trim().toLowerCase())) {
      router.push("/admin")
    } else {
      router.push("/")
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#0f172a" }}>
      {/* Sisi kiri — branding */}
      <div style={{ flex: 1, display: "none", flexDirection: "column", justifyContent: "center", padding: "60px 48px", background: "#172554", position: "relative", overflow: "hidden" }} className="lg:flex">
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(251,191,36,0.05)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Link href="/">
            <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>CPNS Path</span>
          </Link>
          <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginTop: 48, lineHeight: 1.4 }}>Selamat datang kembali!</p>
          <p style={{ fontSize: "0.95rem", color: "#93C5FD", marginTop: 12, lineHeight: 1.7 }}>Lanjutkan perjalanan persiapan CPNS kamu. Ribuan soal menunggumu.</p>
          <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 16 }}>
            {["100 Tryout SKD & SKB lengkap", "Pembahasan detail setiap soal", "Analisis hasil & ranking nasional"].map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(251,191,36,0.2)", color: "#fbbf24", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: "0.9rem", color: "#cbd5e1" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sisi kanan — form */}
      <div style={{ width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 32px", background: "#fff" }} className="lg:max-w-[480px]">
        <div style={{ maxWidth: 380, margin: "0 auto", width: "100%" }}>
          <Link href="/" style={{ display: "block", marginBottom: 32 }}>
            <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#172554", letterSpacing: "-0.02em" }}>CPNS Path</span>
          </Link>

          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a", marginBottom: 6, letterSpacing: "-0.02em" }}>Masuk ke akun</h1>
          <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: 32 }}>Belum punya akun? <Link href="/register" style={{ color: "#172554", fontWeight: 600, textDecoration: "none" }}>Daftar gratis</Link></p>

          <form onSubmit={handleLogin} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: "0.9rem", color: "#0f172a", outline: "none", transition: "border-color 0.15s", background: "#fff" }}
                onFocus={e => e.target.style.borderColor = "#172554"}
                onBlur={e => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155" }}>Password</label>
                <span style={{ fontSize: "0.78rem", color: "#172554", fontWeight: 500, cursor: "pointer" }}>Lupa password?</span>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: "0.9rem", color: "#0f172a", outline: "none", transition: "border-color 0.15s", background: "#fff" }}
                onFocus={e => e.target.style.borderColor = "#172554"}
                onBlur={e => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>

            {errorMsg && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", fontSize: "0.82rem", color: "#dc2626" }}>
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "13px 20px", borderRadius: 10, border: "none", background: loading ? "#94a3b8" : "#172554", color: "#fff", fontSize: "0.9rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", transition: "background 0.15s", marginTop: 4 }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#1e3a5f" }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#172554" }}
            >
              {loading ? "Masuk..." : "Masuk"}
            </button>
          </form>

          <div style={{ margin: "24px 0", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>atau</span>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
          </div>

          <Link href="/register">
            <button style={{ width: "100%", padding: "12px 20px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#fff", color: "#334155", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#172554"; e.currentTarget.style.color = "#172554" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#334155" }}
            >
              Buat Akun Baru
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
