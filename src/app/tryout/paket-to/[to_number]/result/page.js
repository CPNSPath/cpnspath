"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function TOResultPage() {
  const params = useParams()
  const router = useRouter()
  const toNumber = params.to_number
  const [result, setResult] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem(`to_${toNumber}_result`)
    if (!saved) { router.replace(`/tryout/paket-to/${toNumber}`); return }
    setResult(JSON.parse(saved))
  }, [])

  if (!result) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC", flexDirection: "column", gap: 16 }}>
        <div style={{ width: 40, height: 40, border: "4px solid #e2e8f0", borderTop: "4px solid #172554", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  const { twkScore, tiuScore, tkpScore, totalScore, lulusTwk, lulusTiu, lulusTkp, lulusSkd,
    twkCorrect, twkWrong, twkEmpty, tiuCorrect, tiuWrong, tiuEmpty, tkpAnswered, tkpEmpty } = result

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: lulusSkd ? "#14532d" : "#172554", padding: "56px 24px 40px", position: "relative", overflow: "hidden", marginTop: "72px" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "3.5rem", marginBottom: 12 }}>{lulusSkd ? "🎉" : "📋"}</div>
          <div style={{ display: "inline-block", padding: "6px 20px", borderRadius: 999, background: lulusSkd ? "rgba(34,197,94,0.2)" : "rgba(220,38,38,0.2)", color: lulusSkd ? "#4ade80" : "#f87171", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
            {lulusSkd ? "✓ LULUS SKD" : "✗ TIDAK LULUS SKD"}
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 6, letterSpacing: "-0.02em" }}>
            TO SKD #{toNumber} — Selesai!
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#93C5FD" }}>
            {lulusSkd ? "Selamat! Kamu memenuhi semua passing grade SKD." : "Masih ada subtest yang belum memenuhi passing grade."}
          </p>
        </div>
      </section>

      <section style={{ flex: 1, padding: "32px 24px 48px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>

          {/* Total skor */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "24px", marginBottom: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.03)", textAlign: "center" }}>
            <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Total Skor</p>
            <p style={{ fontSize: "3rem", fontWeight: 800, color: "#172554", letterSpacing: "-0.02em" }}>{totalScore}</p>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>TWK + TIU + TKP</p>
          </div>

          {/* Rincian per subtest */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
            {[
              { code: "TWK", score: twkScore, passing: 65, lulus: lulusTwk, correct: twkCorrect, wrong: twkWrong, empty: twkEmpty, total: 35, color: "#3b82f6" },
              { code: "TIU", score: tiuScore, passing: 80, lulus: lulusTiu, correct: tiuCorrect, wrong: tiuWrong, empty: tiuEmpty, total: 30, color: "#8b5cf6" },
              { code: "TKP", score: tkpScore, passing: 166, lulus: lulusTkp, correct: tkpAnswered, wrong: null, empty: tkpEmpty, total: 35, color: "#22c55e" },
            ].map(s => (
              <div key={s.code} style={{ background: "#fff", borderRadius: 16, border: `2px solid ${s.lulus ? s.color + "40" : "rgba(220,38,38,0.2)"}`, padding: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: "0.9rem", fontWeight: 700, color: s.color }}>{s.code}</span>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: s.lulus ? s.color + "15" : "rgba(220,38,38,0.1)", color: s.lulus ? s.color : "#dc2626" }}>
                    {s.lulus ? "✓ LULUS" : "✗ TIDAK LULUS"}
                  </span>
                </div>
                <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#0f172a", marginBottom: 2 }}>{s.score}</div>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: 12 }}>Nilai mati: {s.passing}</div>

                {/* Progress bar */}
                <div style={{ background: "#e2e8f0", borderRadius: 999, height: 6, overflow: "hidden", marginBottom: 12 }}>
                  <div style={{ height: "100%", borderRadius: 999, background: s.lulus ? s.color : "#ef4444", width: `${Math.min(100, Math.round((s.score / (s.passing * 1.5)) * 100))}%`, transition: "width 0.8s ease" }} />
                </div>

                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: s.wrong !== null ? "1fr 1fr 1fr" : "1fr 1fr", gap: 6 }}>
                  <div style={{ textAlign: "center", background: "#f8fafc", borderRadius: 8, padding: "8px 4px" }}>
                    <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#16a34a", margin: 0 }}>{s.correct}</p>
                    <p style={{ fontSize: "0.65rem", color: "#64748b", margin: 0 }}>{s.code === "TKP" ? "Dijawab" : "Benar"}</p>
                  </div>
                  {s.wrong !== null && (
                    <div style={{ textAlign: "center", background: "#f8fafc", borderRadius: 8, padding: "8px 4px" }}>
                      <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#dc2626", margin: 0 }}>{s.wrong}</p>
                      <p style={{ fontSize: "0.65rem", color: "#64748b", margin: 0 }}>Salah</p>
                    </div>
                  )}
                  <div style={{ textAlign: "center", background: "#f8fafc", borderRadius: 8, padding: "8px 4px" }}>
                    <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#94a3b8", margin: 0 }}>{s.empty}</p>
                    <p style={{ fontSize: "0.65rem", color: "#64748b", margin: 0 }}>Kosong</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Status lulus detail */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "20px", marginBottom: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>Syarat Kelulusan SKD</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "TWK ≥ 65", value: twkScore, passing: 65, lulus: lulusTwk },
                { label: "TIU ≥ 80", value: tiuScore, passing: 80, lulus: lulusTiu },
                { label: "TKP ≥ 166", value: tkpScore, passing: 166, lulus: lulusTkp },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: 10, background: s.lulus ? "rgba(34,197,94,0.06)" : "rgba(220,38,38,0.06)", border: `1px solid ${s.lulus ? "rgba(34,197,94,0.2)" : "rgba(220,38,38,0.2)"}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: "1rem" }}>{s.lulus ? "✅" : "❌"}</span>
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155" }}>{s.label}</span>
                  </div>
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: s.lulus ? "#16a34a" : "#dc2626" }}>
                    {s.value} {s.lulus ? "✓" : `(kurang ${s.passing - s.value})`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/tryout/paket-to" style={{ flex: 1, display: "block", padding: "13px 20px", borderRadius: 12, border: "1.5px solid #e2e8f0", background: "#fff", color: "#334155", fontSize: "0.9rem", fontWeight: 600, textAlign: "center", textDecoration: "none" }}>
              ← Daftar TO
            </Link>
            <Link href="/dashboard" style={{ flex: 1, display: "block", padding: "13px 20px", borderRadius: 12, border: "none", background: "#172554", color: "#fff", fontSize: "0.9rem", fontWeight: 600, textAlign: "center", textDecoration: "none" }}>
              Lihat Dashboard
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
