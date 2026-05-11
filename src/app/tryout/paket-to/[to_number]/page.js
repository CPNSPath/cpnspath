"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { supabase } from "@/lib/supabase"

export default function TODetailPage() {
  const params = useParams()
  const router = useRouter()
  const toNumber = parseInt(params.to_number, 10)

  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isNaN(toNumber) || toNumber < 1 || toNumber > 100) {
      router.replace("/tryout/paket-to")
      return
    }
    async function checkAccess() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace(`/login?redirect=/tryout/paket-to/${toNumber}`)
        return
      }
      const { data } = await supabase
        .from("user_tryouts")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("to_number", toNumber)
        .eq("package_slug", "skd")
        .eq("payment_status", "paid")
        .maybeSingle()
      setHasAccess(!!data)
      setLoading(false)
    }
    checkAccess()
  }, [])

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC", flexDirection: "column", gap: 16 }}>
        <div style={{ width: 40, height: 40, border: "4px solid #e2e8f0", borderTop: "4px solid #172554", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Memeriksa akses...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      {!hasAccess && (
        <div style={{ background: "#fbbf24", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginTop: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.25rem" }}>🔒</span>
            <div>
              <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#78350f", margin: 0 }}>TO SKD #{toNumber} belum dibeli</p>
              <p style={{ fontSize: "0.78rem", color: "#92400e", margin: 0 }}>Beli tryout ini untuk mulai mengerjakan</p>
            </div>
          </div>
          <Link href={`/tryout/paket-to/${toNumber}/beli`} style={{ background: "#172554", color: "#fff", padding: "10px 24px", borderRadius: 10, fontSize: "0.875rem", fontWeight: 700, textDecoration: "none" }}>
            Beli TO #{toNumber} — Rp 15.000
          </Link>
        </div>
      )}

      <section style={{ background: "#172554", padding: "56px 24px", position: "relative", overflow: "hidden", marginTop: hasAccess ? "72px" : "0" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 160, height: 160, borderRadius: "50%", background: "rgba(251,191,36,0.05)" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Link href="/tryout/paket-to" style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 14px", borderRadius: 999, background: "rgba(255,255,255,0.1)", color: "#93C5FD", fontSize: "0.75rem", fontWeight: 500, marginBottom: 12, textDecoration: "none" }}>
            ← Kembali ke daftar TO
          </Link>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>TO SKD #{toNumber}</h1>
          <p style={{ fontSize: "0.9rem", color: "#93C5FD" }}>TWK + TIU + TKP — 100 soal dalam 1 sesi</p>
        </div>
      </section>

      <section style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ width: "100%", maxWidth: 480 }}>
          <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
            <div style={{ background: "#0f1d3a", padding: "24px 20px", textAlign: "center" }}>
              <span style={{ fontSize: "2.5rem", display: "block", marginBottom: 6 }}>📋</span>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", margin: 0 }}>TO SKD #{toNumber}</h2>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Tryout Seleksi Kompetensi Dasar</p>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                {[
                  { label: "Total Soal", value: "100 soal" },
                  { label: "Durasi", value: "90 menit" },
                  { label: "TWK", value: "35 soal (min. 65)" },
                  { label: "TIU", value: "30 soal (min. 80)" },
                  { label: "TKP", value: "35 soal (min. 166)" },
                  { label: "Tipe", value: "Multiple Choice" },
                ].map(item => (
                  <div key={item.label} style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
                    <p style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: 4 }}>{item.label}</p>
                    <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a" }}>{item.value}</p>
                  </div>
                ))}
              </div>

              <div style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
                <p style={{ fontSize: "0.8rem", color: "#92400e", fontWeight: 500, margin: 0 }}>
                  ⚠ Pastikan koneksi internet stabil. Ujian tidak dapat dijeda setelah dimulai.
                </p>
              </div>

              {hasAccess ? (
                <Link href={`/tryout/paket-to/${toNumber}/exam`} style={{ display: "block", width: "100%", padding: "13px 20px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 700, textAlign: "center", textDecoration: "none", background: "#fbbf24", color: "#78350f" }}>
                  Mulai Ujian TO #{toNumber} →
                </Link>
              ) : (
                <Link href={`/tryout/paket-to/${toNumber}/beli`} style={{ display: "block", width: "100%", padding: "13px 20px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 700, textAlign: "center", textDecoration: "none", background: "#172554", color: "#fff" }}>
                  Beli TO #{toNumber} — Rp 15.000
                </Link>
              )}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
            {toNumber > 1 ? (
              <Link href={`/tryout/paket-to/${toNumber - 1}`} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: "0.8rem", color: "#64748b", textDecoration: "none" }}>
                ← TO #{toNumber - 1}
              </Link>
            ) : <div />}
            {toNumber < 100 && (
              <Link href={`/tryout/paket-to/${toNumber + 1}`} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: "0.8rem", color: "#64748b", textDecoration: "none" }}>
                TO #{toNumber + 1} →
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
