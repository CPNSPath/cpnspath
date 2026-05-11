"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const PACKAGES = [
  {
    slug: "skd",
    name: "Paket SKD",
    price: 15000,
    priceLabel: "Rp 15.000",
    icon: "📋",
    badge: null,
    features: ["100 Tryout SKD","TWK + TIU + TKP","Pembahasan lengkap","Akses selamanya","Analisis hasil"],
  },
  {
    slug: "skb",
    name: "Paket SKB",
    price: 15000,
    priceLabel: "Rp 15.000",
    icon: "🏆",
    badge: "Terlaris",
    features: ["100 Tryout SKB","Sesuai bidang formasi","Pembahasan lengkap","Akses selamanya","Analisis hasil"],
  },
]

export default function PricePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(null)
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const [targetPackage, setTargetPackage] = useState(null)

  async function handleBuy(packageSlug) {
    setLoading(packageSlug)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setShowLoginPopup(true)
        setTargetPackage(packageSlug)
        setLoading(null)
        return
      }
      router.push("/tryout/paket-to")
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      {showLoginPopup && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowLoginPopup(false) }}
        >
          <div style={{ background: "#fff", borderRadius: 24, width: "100%", maxWidth: 420, overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ background: "#0f1d3a", padding: "28px 28px 24px", textAlign: "center", position: "relative" }}>
              <button
                onClick={() => setShowLoginPopup(false)}
                style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}
              >✕</button>
              <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📦</div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: 6 }}>Login Diperlukan</h2>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
                Silakan login atau buat akun untuk membeli {targetPackage === "skd" ? "Paket SKD" : "Paket SKB"}
              </p>
            </div>
            <div style={{ padding: "24px 28px 28px" }}>
              <div style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 12, padding: "12px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: "1.1rem" }}>✨</span>
                <p style={{ fontSize: "0.8rem", color: "#78350f", fontWeight: 500 }}>Daftar gratis — proses pembelian selesai dalam 2 menit!</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link href={`/login?redirect=/price`}>
                  <button
                    style={{ width: "100%", padding: "13px 20px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 700, border: "none", background: "#172554", color: "#fff", cursor: "pointer", transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#1e3a5f"}
                    onMouseLeave={e => e.currentTarget.style.background = "#172554"}
                  >
                    Login ke Akun Saya
                  </button>
                </Link>
                <Link href={`/register?redirect=/price`}>
                  <button
                    style={{ width: "100%", padding: "13px 20px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 700, border: "2px solid #fbbf24", background: "#fbbf24", color: "#78350f", cursor: "pointer", transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f59e0b"}
                    onMouseLeave={e => e.currentTarget.style.background = "#fbbf24"}
                  >
                    Daftar Akun Gratis
                  </button>
                </Link>
              </div>
              <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#94a3b8", marginTop: 16 }}>
                Dengan mendaftar, kamu menyetujui syarat & ketentuan CPNS Path
              </p>
            </div>
          </div>
        </div>
      )}

      <section style={{ background: "#172554", padding: "56px 24px", position: "relative", overflow: "hidden", marginTop: "72px" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 160, height: 160, borderRadius: "50%", background: "rgba(251,191,36,0.05)" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>Pilih Paket Tryout</h1>
          <p style={{ fontSize: "0.95rem", color: "#93C5FD" }}>Satu harga, akses 100 tryout — persiapan CPNS lebih matang</p>
        </div>
      </section>

      <main style={{ flex: 1, padding: "48px 24px 64px", maxWidth: 900, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, justifyItems: "center", marginBottom: 40 }}>
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.slug}
              style={{
                background: "#fff",
                borderRadius: 20,
                overflow: "hidden",
                width: "100%",
                maxWidth: 390,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                border: pkg.badge ? "2px solid #fbbf24" : "1px solid #e2e8f0",
                boxShadow: pkg.badge ? "0 0 0 4px rgba(251,191,36,0.08)" : "0 4px 6px rgba(0,0,0,0.05)",
                transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#fbbf24"; e.currentTarget.style.transform = "translateY(-2px)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = pkg.badge ? "#fbbf24" : "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)" }}
            >
              {pkg.badge && (
                <span style={{ position: "absolute", top: 14, right: 14, fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", padding: "5px 14px", borderRadius: 999, background: "#fbbf24", color: "#78350f", zIndex: 2, boxShadow: "0 2px 8px rgba(251,191,36,0.3)" }}>
                  {pkg.badge}
                </span>
              )}
              <div style={{ background: "#0f1d3a", padding: "24px 20px 20px", textAlign: "center" }}>
                <span style={{ fontSize: "2.5rem", display: "block", marginBottom: 6 }}>{pkg.icon}</span>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>{pkg.name}</h2>
              </div>
              <div style={{ textAlign: "center", padding: "20px 20px 16px", borderBottom: "1px solid #f1f5f9" }}>
                <div style={{ fontSize: "2.75rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1 }}>{pkg.priceLabel}</div>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: 4 }}>satu kali bayar</p>
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
                  onClick={() => handleBuy(pkg.slug)}
                  disabled={loading === pkg.slug}
                  style={{ display: "block", width: "100%", padding: "13px 20px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 600, textAlign: "center", cursor: loading === pkg.slug ? "not-allowed" : "pointer", border: "none", background: "#fbbf24", color: "#78350f", transition: "background 0.2s, transform 0.2s", opacity: loading === pkg.slug ? 0.55 : 1 }}
                  onMouseEnter={e => { if (loading !== pkg.slug) e.currentTarget.style.background = "#f59e0b" }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fbbf24" }}
                >
                  {loading === pkg.slug ? "Memproses..." : "Beli Sekarang"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap", marginTop: 8 }}>
          {[{ icon: "🔒", text: "Pembayaran Aman" }, { icon: "♾️", text: "Akses Selamanya" }, { icon: "⚡", text: "Langsung Aktif" }].map(b => (
            <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "#64748b", fontWeight: 500 }}>
              <span>{b.icon}</span>{b.text}
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "0.8rem", marginTop: 14 }}>
          Pembayaran aman melalui Midtrans — transfer bank, e-wallet, kartu kredit tersedia
        </p>
      </main>

      <Footer />
    </div>
  )
}