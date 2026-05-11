"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import Navbar from "@/components/Navbar"

function getInitial(email) {
  if (!email) return "U"
  return email[0].toUpperCase()
}

export default function SettingsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") === "password" ? "password" : "profile"

  const [user, setUser] = useState(null)
  const [tab, setTab] = useState(defaultTab)
  const [name, setName] = useState("")
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [profileMsg, setProfileMsg] = useState("")
  const [profileError, setProfileError] = useState("")

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loadingPassword, setLoadingPassword] = useState(false)
  const [passwordMsg, setPasswordMsg] = useState("")
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.replace("/login"); return }
      setUser(user)
      setName(user.user_metadata?.name || user.email?.split("@")[0] || "")
    }
    init()
  }, [])

  async function handleSaveProfile(e) {
    e.preventDefault()
    setProfileError("")
    setProfileMsg("")
    if (!name.trim()) { setProfileError("Nama tidak boleh kosong"); return }
    setLoadingProfile(true)
    const { error } = await supabase.auth.updateUser({ data: { name } })
    if (error) { setProfileError(error.message); setLoadingProfile(false); return }
    setProfileMsg("Profil berhasil diperbarui!")
    setLoadingProfile(false)
  }

  async function handleChangePassword(e) {
    e.preventDefault()
    setPasswordError("")
    setPasswordMsg("")
    if (!newPassword || !confirmPassword) { setPasswordError("Semua field wajib diisi"); return }
    if (newPassword.length < 6) { setPasswordError("Password minimal 6 karakter"); return }
    if (newPassword !== confirmPassword) { setPasswordError("Password tidak sama"); return }
    setLoadingPassword(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) { setPasswordError(error.message); setLoadingPassword(false); return }
    setPasswordMsg("Password berhasil diubah!")
    setNewPassword("")
    setConfirmPassword("")
    setCurrentPassword("")
    setLoadingPassword(false)
  }

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC" }}>
        <div style={{ width: 40, height: 40, border: "4px solid #e2e8f0", borderTop: "4px solid #172554", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC" }}>
      <Navbar />

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "104px 24px 48px" }}>

        {/* Back */}
        <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.85rem", color: "#64748b", textDecoration: "none", marginBottom: 24 }}
          onMouseEnter={e => e.currentTarget.style.color = "#172554"}
          onMouseLeave={e => e.currentTarget.style.color = "#64748b"}
        >
          ← Kembali ke Dashboard
        </Link>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fbbf24", color: "#78350f", fontWeight: 800, fontSize: "1.25rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {getInitial(user.email)}
          </div>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>Pengaturan Akun</h1>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>{user.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#f1f5f9", borderRadius: 10, padding: 4 }}>
          {[
            { key: "profile", label: "Edit Profil" },
            { key: "password", label: "Ganti Password" },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{ flex: 1, padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: "0.875rem", fontWeight: tab === t.key ? 600 : 400, background: tab === t.key ? "#fff" : "transparent", color: tab === t.key ? "#172554" : "#64748b", boxShadow: tab === t.key ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.15s" }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Card */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "28px 28px", boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>

          {tab === "profile" && (
            <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: 0, marginBottom: 4 }}>Edit Profil</h2>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>Nama</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Nama kamu"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: "0.9rem", color: "#0f172a", outline: "none", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = "#172554"}
                  onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: "0.9rem", color: "#94a3b8", background: "#f8fafc", boxSizing: "border-box", cursor: "not-allowed" }}
                />
                <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: 4 }}>Email tidak dapat diubah</p>
              </div>

              {profileError && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", fontSize: "0.82rem", color: "#dc2626" }}>{profileError}</div>
              )}
              {profileMsg && (
                <div style={{ background: "#f0fdf4", border: "1px solid #a7f3d0", borderRadius: 8, padding: "10px 14px", fontSize: "0.82rem", color: "#059669" }}>{profileMsg}</div>
              )}

              <button type="submit" disabled={loadingProfile}
                style={{ padding: "12px 20px", borderRadius: 10, border: "none", background: loadingProfile ? "#94a3b8" : "#172554", color: "#fff", fontSize: "0.9rem", fontWeight: 700, cursor: loadingProfile ? "not-allowed" : "pointer" }}
              >
                {loadingProfile ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </form>
          )}

          {tab === "password" && (
            <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: 0, marginBottom: 4 }}>Ganti Password</h2>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>Password Baru</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: "0.9rem", color: "#0f172a", outline: "none", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = "#172554"}
                  onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>Konfirmasi Password Baru</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password baru"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: "0.9rem", color: "#0f172a", outline: "none", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = "#172554"}
                  onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                />
              </div>

              {passwordError && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", fontSize: "0.82rem", color: "#dc2626" }}>{passwordError}</div>
              )}
              {passwordMsg && (
                <div style={{ background: "#f0fdf4", border: "1px solid #a7f3d0", borderRadius: 8, padding: "10px 14px", fontSize: "0.82rem", color: "#059669" }}>{passwordMsg}</div>
              )}

              <button type="submit" disabled={loadingPassword}
                style={{ padding: "12px 20px", borderRadius: 10, border: "none", background: loadingPassword ? "#94a3b8" : "#fbbf24", color: loadingPassword ? "#fff" : "#78350f", fontSize: "0.9rem", fontWeight: 700, cursor: loadingPassword ? "not-allowed" : "pointer" }}
              >
                {loadingPassword ? "Menyimpan..." : "Ganti Password"}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  )
}
