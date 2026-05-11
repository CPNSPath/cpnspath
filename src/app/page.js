"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function Home() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.replace("/dashboard")
      } else {
        setChecking(false)
      }
    }
    checkUser()
  }, [])

  if (checking) {
    return <div style={{ minHeight: "100vh", background: "#0f172a" }} />
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
      <Navbar transparent />

      {/* Hero Section */}
      <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #172554 100%)", padding: "120px 80px 80px", position: "relative", overflow: "hidden", minHeight: "100vh", display: "flex", alignItems: "center" }}>

        {/* Decorative */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(251,191,36,0.08)" }} />
        <div style={{ position: "absolute", top: 20, right: 60, width: 180, height: 180, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: -80, right: 120, width: 240, height: 240, borderRadius: "50%", background: "rgba(251,191,36,0.03)" }} />
        <div style={{ position: "absolute", top: 0, left: "55%", width: 1, height: "100%", background: "linear-gradient(to bottom, transparent, rgba(251,191,36,0.08), transparent)" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, position: "relative", zIndex: 1 }}>

          {/* Left */}
          <div style={{ maxWidth: 520 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 999, padding: "4px 14px", marginBottom: 22 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fbbf24" }} />
              <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#fbbf24", letterSpacing: "0.06em" }}>Persiapan CPNS Terpercaya</span>
            </div>

            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 800, color: "white", lineHeight: 1.2, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
              Raih Karir Impianmu<br />
              sebagai <span style={{ color: "#fbbf24" }}>ASN</span> dengan<br />
              Persiapan Terbaik
            </h1>

            <p style={{ fontSize: "0.9rem", color: "#93c5fd", margin: "0 0 10px", lineHeight: 1.7 }}>
              Tryout SKD & SKB terstruktur, soal terverifikasi, dan analisis hasil yang membantu kamu fokus pada yang penting.
            </p>

            <p style={{ fontSize: "0.8rem", color: "#475569", margin: "0 0 28px", lineHeight: 1.6, fontStyle: "italic" }}>
              "Perjalanan seribu langkah dimulai dari satu latihan."
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
              <Link href="/tryout/free-trial" style={{ background: "#fbbf24", color: "#78350f", padding: "12px 24px", borderRadius: 10, fontSize: "0.9rem", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
                Mulai Free Trial →
              </Link>
              <Link href="/tryout/paket-to" style={{ background: "rgba(255,255,255,0.06)", color: "#cbd5e1", padding: "12px 24px", borderRadius: 10, fontSize: "0.9rem", fontWeight: 500, border: "1px solid rgba(255,255,255,0.12)", textDecoration: "none", display: "inline-block" }}>
                Lihat Paket TO
              </Link>
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {["Soal terverifikasi", "Free trial tersedia", "Analisis hasil lengkap"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }} className="hidden lg:flex">

            <div style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "16px 20px", width: 210 }}>
              <p style={{ fontSize: "0.65rem", color: "#64748b", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>📊 Passing Grade SKD</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[{ label: "TWK", val: "min. 65" }, { label: "TIU", val: "min. 80" }, { label: "TKP", val: "min. 166" }].map(item => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.78rem", color: "#93c5fd" }}>{item.label}</span>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "white" }}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 12, padding: "16px 20px", width: 210 }}>
              <p style={{ fontSize: "0.65rem", color: "#92400e", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>🎯 Free Trial</p>
              <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#fbbf24", margin: "0 0 2px" }}>TWK · TIU · TKP</p>
              <p style={{ fontSize: "0.72rem", color: "#92400e", margin: 0 }}>Coba gratis sekarang</p>
            </div>

            <div style={{ background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px 20px", width: 210 }}>
              <p style={{ fontSize: "0.65rem", color: "#64748b", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>📚 Ebook Gratis</p>
              <p style={{ fontSize: "0.875rem", color: "white", fontWeight: 500, margin: "0 0 2px" }}>Panduan SKD & SKB</p>
              <p style={{ fontSize: "0.72rem", color: "#4ade80", margin: 0 }}>Download langsung ↓</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
