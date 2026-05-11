"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { supabase } from "@/lib/supabase"

export default function PaketToPage() {
  const router = useRouter()
  const [toList, setToList] = useState([])
  const [ownedNumbers, setOwnedNumbers] = useState(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace("/login?redirect=/tryout/paket-to")
        return
      }

      const { data: skdPackage } = await supabase
        .from("packages")
        .select("id")
        .eq("slug", "skd")
        .single()

      const { data: skdTryouts } = await supabase
        .from("tryouts")
        .select("id, to_number, title")
        .eq("package_id", skdPackage?.id)
        .eq("is_active", true)
        .order("to_number", { ascending: true })

      const { data: userTryouts } = await supabase
        .from("user_tryouts")
        .select("to_number")
        .eq("user_id", session.user.id)
        .eq("package_slug", "skd")
        .eq("payment_status", "paid")

      setToList(skdTryouts || [])
      setOwnedNumbers(new Set((userTryouts || []).map(t => t.to_number)))
      setLoading(false)
    }
    init()
  }, [])

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC", flexDirection: "column", gap: 16 }}>
        <div style={{ width: 40, height: 40, border: "4px solid #e2e8f0", borderTop: "4px solid #172554", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Memuat tryout...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <section style={{ background: "#172554", padding: "56px 24px 40px", position: "relative", overflow: "hidden", marginTop: "72px" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 160, height: 160, borderRadius: "50%", background: "rgba(251,191,36,0.05)" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 999, background: "rgba(251,191,36,0.15)", color: "#fbbf24", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Paket SKD</span>
            <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 6, letterSpacing: "-0.02em" }}>100 Tryout SKD</h1>
            <p style={{ fontSize: "0.9rem", color: "#93C5FD" }}>TWK · TIU · TKP — beli per tryout sesuai kebutuhan</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "0.8rem", color: "#93C5FD", marginBottom: 4 }}>Sudah dimiliki</p>
            <p style={{ fontSize: "2rem", fontWeight: 800, color: "#fff" }}>{ownedNumbers.size} <span style={{ fontSize: "1rem", color: "#93C5FD" }}>/ {toList.length}</span></p>
          </div>
        </div>
      </section>

      <section style={{ flex: 1, padding: "32px 24px 48px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
            {toList.map((to) => {
              const owned = ownedNumbers.has(to.to_number)
              return owned ? (
                <Link
                  key={to.id}
                  href={`/tryout/paket-to/${to.to_number}`}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 12px", borderRadius: 14, background: "#f0fdf4", border: "1px solid #bbf7d0", textDecoration: "none", transition: "all 0.15s", position: "relative", textAlign: "center" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#fbbf24"; e.currentTarget.style.transform = "translateY(-2px)" }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#bbf7d0"; e.currentTarget.style.transform = "translateY(0)" }}
                >
                  <span style={{ position: "absolute", top: 8, right: 8, fontSize: "0.65rem" }}>✅</span>
                  <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#172554" }}>{to.to_number}</span>
                  <span style={{ fontSize: "0.72rem", color: "#16a34a", marginTop: 4, fontWeight: 600 }}>Dimiliki</span>
                </Link>
              ) : (
                <Link
                  key={to.id}
                  href={`/tryout/paket-to/${to.to_number}`}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 12px", borderRadius: 14, background: "#fff", border: "1px solid #e2e8f0", textDecoration: "none", transition: "all 0.15s", position: "relative", textAlign: "center" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#fbbf24"; e.currentTarget.style.transform = "translateY(-2px)" }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)" }}
                >
                  <span style={{ position: "absolute", top: 8, right: 8, fontSize: "0.65rem" }}>🔒</span>
                  <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#334155" }}>{to.to_number}</span>
                  <span style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: 4, fontWeight: 500 }}>Rp 15.000</span>
                </Link>
              )
            })}
          </div>

          {toList.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#94A3B8" }}>
              Data tryout belum tersedia.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
