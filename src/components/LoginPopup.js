"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function LoginPopup({ isOpen, onClose, redirectTo, message }) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  if (!isOpen) return null

  async function handleLogin(e) {
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

    // Refresh ke halaman saat ini supaya UI re-render dengan state login
    if (redirectTo) {
      router.push(redirectTo)
    } else {
      router.refresh()
    }
    onClose()
  }

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ background: "#fff", borderRadius: 24, width: "100%", maxWidth: 420, overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.2)" }}>
        {/* Header */}
        <div style={{ background: "#0f1d3a", padding: "28px 28px 24px", textAlign: "center", position: "relative" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🔐</div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: 6 }}>Login Diperlukan</h2>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
            {message || "Silakan login atau buat akun untuk melanjutkan"}
          </p>
        </div>

        {/* Form */}
        <div style={{ padding: "24px 28px 20px" }}>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: "0.875rem", color: "#0f172a", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: "0.875rem", color: "#0f172a", outline: "none" }}
              />
            </div>

            {errorMsg && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 12px", fontSize: "0.8rem", color: "#dc2626" }}>
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "12px 20px", borderRadius: 10, border: "none", background: loading ? "#94a3b8" : "#172554", color: "#fff", fontSize: "0.9rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", marginTop: 4 }}
            >
              {loading ? "Masuk..." : "Masuk"}
            </button>
          </form>

          <div style={{ margin: "16px 0 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>atau</span>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
          </div>

          <Link href={`/register${redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}>
            <button style={{ width: "100%", padding: "11px 20px", borderRadius: 10, border: "2px solid #fbbf24", background: "#fbbf24", color: "#78350f", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer" }}>
              Daftar Akun Gratis
            </button>
          </Link>

          <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#94a3b8", marginTop: 12 }}>
            Belum punya akun? Daftar gratis dalam 30 detik
          </p>
        </div>
      </div>
    </div>
  )
}