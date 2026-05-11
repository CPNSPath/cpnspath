"use client"

import { useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

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
    <div style={{ minHeight: "100vh", display: "flex", background: "#0f172a" }}>
      {/* Sisi kiri — branding */}
      <div style={{ flex: 1, display: "none", flexDirection: "column", justifyContent: "center", padding: "60px 48px", background: "#172554", position: "relative", overflow: "hidden" }} className="lg:flex">
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(251,191,36,0.05)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Link href="/">
            <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>CPNS Path</span>
          </Link>
          <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginTop: 48, lineHeight: 1.4 }}>Mulai perjalananmu sekarang!</p>
          <p style={{ fontSize: "0.95rem", color: "#93C5FD", marginTop: 12, lineHeight: 1.7 }}>Bergabung dengan ribuan peserta CPNS yang sudah berlatih bersama kami.</p>
          <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 16 }}>
            {["Daftar gratis, tidak perlu kartu kredit", "Akses 3 subtest gratis langsung", "Hasil tryout & pembahasan lengkap"].map(f => (
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

          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a", marginBottom: 6, letterSpacing: "-0.02em" }}>Buat akun gratis</h1>
          <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: 32 }}>Sudah punya akun? <Link href="/login" style={{ color: "#172554", fontWeight: 600, textDecoration: "none" }}>Masuk</Link></p>

          <form onSubmit={handleRegister} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>Password</label>
              <input
                type="password"
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: "0.9rem", color: "#0f172a", outline: "none", transition: "border-color 0.15s", background: "#fff" }}
                onFocus={e => e.target.style.borderColor = "#172554"}
                onBlur={e => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>Konfirmasi Password</label>
              <input
                type="password"
                placeholder="Ulangi password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
                style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: "0.9rem", color: "#0f172a", outline: "none", transition: "border-color 0.15s", background: "#fff" }}
                onFocus={e => e.target.style.borderColor = "#172554"}
                onBlur={e => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>

            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                style={{ marginTop: 2, width: 16, height: 16, accentColor: "#172554", flexShrink: 0 }}
              />
              <span style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5 }}>
                Saya setuju dengan <span style={{ color: "#172554", fontWeight: 600, cursor: "pointer" }}>Syarat & Ketentuan</span> dan <span style={{ color: "#172554", fontWeight: 600, cursor: "pointer" }}>Kebijakan Privasi</span>
              </span>
            </label>

            {errorMsg && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", fontSize: "0.82rem", color: "#dc2626" }}>
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div style={{ background: "#f0fdf4", border: "1px solid #a7f3d0", borderRadius: 8, padding: "10px 14px", fontSize: "0.82rem", color: "#059669" }}>
                {successMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "13px 20px", borderRadius: 10, border: "none", background: loading ? "#94a3b8" : "#fbbf24", color: loading ? "#fff" : "#78350f", fontSize: "0.9rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", transition: "background 0.15s", marginTop: 4 }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#f59e0b" }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#fbbf24" }}
            >
              {loading ? "Mendaftarkan..." : "Buat Akun Gratis"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: "0.78rem", color: "#94a3b8", marginTop: 20 }}>
            Sudah punya akun? <Link href="/login" style={{ color: "#172554", fontWeight: 600, textDecoration: "none" }}>Masuk sekarang</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
