"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import LoginPopup from "@/components/LoginPopup"
import { supabase } from "@/lib/supabase"

const PACKAGES = [
  {
    slug: "skd",
    name: "Free Trial SKD",
    icon: "📋",
    badge: null,
    desc: "Coba 3 subtest SKD gratis — TWK, TIU, TKP",
    features: ["3 Subtest gratis", "TWK + TIU + TKP", "Perlu login akun", "Pembahasan lengkap", "Langsung mulai"],
  },
  {
    slug: "skb",
    name: "Free Trial SKB",
    icon: "🏆",
    badge: "Baru",
    desc: "Coba tryout SKB gratis sesuai bidang formasi",
    features: ["Subtest SKB gratis", "Sesuai bidang formasi", "Perlu login akun", "Pembahasan lengkap", "Langsung mulai"],
  },
]

export default function FreeTrial() {
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false)
  const [targetSlug, setTargetSlug] = useState(null)
  const [checking, setChecking] = useState(false)

  async function handleClick(slug) {
    setChecking(true)
    const { data: { user } } = await supabase.auth.getUser()
    setChecking(false)
    if (user) {
      router.push(`/tryout/free-trial/${slug}`)
    } else {
      setTargetSlug(slug)
      setShowPopup(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <LoginPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        redirectTo={targetSlug ? `/tryout/free-trial/${targetSlug}` : "/tryout/free-trial"}
        message={`Silakan login atau buat akun untuk mulai Free Trial ${targetSlug?.toUpperCase() || ""}`}
      />

      {/* Hero */}
      <section style={{ background: "#172554", padding: "56px 24px", position: "relative", overflow: "hidden", marginTop: "72px" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 160, height: 160, borderRadius: "50%", background: "rgba(251,191,36,0.05)" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 999, background: "rgba(251,191,36,0.15)", color: "#fbbf24", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Gratis</span>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>Free Trial — Coba Tryout Gratis</h1>
          <p style={{ fontSize: "0.95rem", color: "#93C5FD", lineHeight: 1.6 }}>Pilih jenis tryout yang ingin kamu coba — gratis, cukup login dulu</p>
        </div>
      </section>

      {/* Cards */}
      <section style={{ flex: 1, padding: "48px 24px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, justifyItems: "center", marginBottom: 48 }}>
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.slug}
                style={{ background: "#fff", borderRadius: 20, overflow: "hidden", width: "100%", maxWidth: 390, display: "flex", flexDirection: "column", position: "relative", border: pkg.badge ? "2px solid #fbbf24" : "1px solid #e2e8f0", boxShadow: pkg.badge ? "0 0 0 4px rgba(251,191,36,0.08)" : "0 4px 6px rgba(0,0,0,0.05)", transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#fbbf24"; e.currentTarget.style.transform = "translateY(-2px)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = pkg.badge ? "#fbbf24" : "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)" }}
              >
                {pkg.badge && (
                  <span style={{ position: "absolute", top: 14, right: 14, fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", padding: "5px 14px", borderRadius: 999, background: "#fbbf24", color: "#78350f", zIndex: 2 }}>
                    {pkg.badge}
                  </span>
                )}
                <div style={{ background: "#0f1d3a", padding: "24px 20px 20px", textAlign: "center" }}>
                  <span style={{ fontSize: "2.5rem", display: "block", marginBottom: 6 }}>{pkg.icon}</span>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>{pkg.name}</h2>
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{pkg.desc}</p>
                </div>
                <ul style={{ flex: 1, padding: "18px 24px 10px", listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {pkg.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "0.875rem", color: "#334155" }}>
                      <span style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(34,197,94,0.12)", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.7rem", fontWeight: 700 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div style={{ padding: "8px 24px 24px" }}>
                  <button
                    onClick={() => handleClick(pkg.slug)}
                    disabled={checking}
                    style={{ display: "block", width: "100%", padding: "13px 20px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 600, textAlign: "center", cursor: checking ? "wait" : "pointer", border: "none", background: "#fbbf24", color: "#78350f", transition: "background 0.2s, transform 0.2s", opacity: checking ? 0.7 : 1 }}
                    onMouseEnter={e => { if (!checking) e.currentTarget.style.background = "#f59e0b" }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#fbbf24" }}
                  >
                    {checking ? "Mengecek..." : `Mulai ${pkg.name}`}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: "28px 24px", textAlign: "center", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", maxWidth: 720, margin: "0 auto" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>Mau akses 100 TO lengkap?</p>
            <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: 16 }}>Dapatkan 100 Tryout SKD + SKB hanya Rp 15.000 per paket — akses selamanya</p>
            <Link href="/price">
              <button
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 600, fontSize: "0.9rem", color: "#d97706", background: "none", border: "none", cursor: "pointer", borderBottom: "2px solid transparent", paddingBottom: 2, transition: "border-color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#fbbf24" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent" }}
              >
                Lihat Paket TO →
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}