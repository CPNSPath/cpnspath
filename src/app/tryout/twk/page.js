"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { supabase } from "@/lib/supabase"

const INFO = [
  { label: "Jumlah Soal", value: "35 Soal" },
  { label: "Durasi", value: "30 Menit" },
  { label: "Passing Grade", value: "65" },
  { label: "Tipe", value: "Multiple Choice" },
]

function TWKIntroContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const toId = searchParams.get("to_id")

  const [accessChecked, setAccessChecked] = useState(!toId)
  const [checking, setChecking] = useState(!!toId)

  useEffect(() => {
    if (!toId) return
    async function checkAccess() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.replace(`/login?redirect=/tryout/twk?to_id=${toId}`)
        return
      }
      const { data: access } = await supabase
        .from("user_packages")
        .select("id")
        .eq("user_id", user.id)
        .eq("package_slug", "skd")
        .eq("payment_status", "paid")
        .maybeSingle()
      if (!access) {
        router.replace("/price")
        return
      }
      setAccessChecked(true)
      setChecking(false)
    }
    checkAccess()
  }, [toId, router])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <p className="text-[#64748B]">Memverifikasi akses...</p>
      </div>
    )
  }

  const backHref = toId ? `/tryout/paket-to/${toId}` : "/tryout/free-trial"
  const backLabel = toId ? `← Kembali ke TO SKD #${toId}` : "← Kembali ke Free Trial"
  const examHref = toId ? `/tryout/twk/exam?to_id=${toId}` : "/tryout/twk/exam"

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <section style={{ background: "#172554", padding: "56px 24px", position: "relative", overflow: "hidden", marginTop: "72px" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 160, height: 160, borderRadius: "50%", background: "rgba(251,191,36,0.05)" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Link href={backHref} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 14px", borderRadius: 999, background: "rgba(255,255,255,0.1)", color: "#93C5FD", fontSize: "0.75rem", fontWeight: 500, marginBottom: 12, cursor: "pointer", textDecoration: "none" }}>
            {backLabel}
          </Link>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>
            {toId ? `TO SKD #${toId} — TWK` : "Free Trial TWK"}
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#93C5FD", lineHeight: 1.6 }}>Tes Wawasan Kebangsaan</p>
        </div>
      </section>

      <section style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
            <div style={{ background: "#0f1d3a", padding: "24px 20px 20px", textAlign: "center" }}>
              <span style={{ fontSize: "2.5rem", display: "block", marginBottom: 6 }}>🇮🇩</span>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>TWK</h2>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Tes Wawasan Kebangsaan</p>
            </div>

            <div style={{ padding: "20px 24px 10px" }}>
              <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 999, background: toId ? "rgba(251,191,36,0.15)" : "rgba(34,197,94,0.12)", color: toId ? "#d97706" : "#16a34a", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
                {toId ? `Paket SKD — TO #${toId}` : "Free Trial"}
              </span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 8 }}>
                {INFO.map((item) => (
                  <div key={item.label} style={{ background: "#F8FAFC", borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
                    <p style={{ fontSize: "0.72rem", color: "#64748b", marginBottom: 4 }}>{item.label}</p>
                    <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: "8px 24px 24px" }}>
              <button
                onClick={() => router.push(examHref)}
                style={{ display: "block", width: "100%", padding: "13px 20px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 600, textAlign: "center", cursor: "pointer", border: "none", background: "#fbbf24", color: "#78350f", transition: "background 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#f59e0b"; e.currentTarget.style.transform = "translateY(-1px)" }}
                onMouseLeave={e => { e.currentTarget.style.background = "#fbbf24"; e.currentTarget.style.transform = "translateY(0)" }}
              >
                Mulai Tryout
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function TWKIntro() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC]" />}>
      <TWKIntroContent />
    </Suspense>
  )
}
