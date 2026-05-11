"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function TKPResult() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem("tkp_result")
    if (saved) {
      setData(JSON.parse(saved))
    }
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Navbar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "#64748b" }}>Memuat hasil...</p>
        </div>
        <Footer />
      </div>
    )
  }

  const STATS = [
    { label: "Skor", value: data.score },
    { label: "Dijawab", value: data.answered },
    { label: "Kosong", value: data.empty },
    { label: "Total", value: data.total },
  ]

  const PASSING_GRADE = 166
  const lulus = data.score >= PASSING_GRADE

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <section style={{ background: "#172554", padding: "48px 24px 40px", position: "relative", overflow: "hidden", marginTop: "72px" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 160, height: 160, borderRadius: "50%", background: "rgba(251,191,36,0.05)" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Link href="/tryout/tkp" style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 14px", borderRadius: 999, background: "rgba(255,255,255,0.1)", color: "#93C5FD", fontSize: "0.75rem", fontWeight: 500, marginBottom: 16, textDecoration: "none" }}>
            ← Kembali ke Tryout TKP
          </Link>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", marginBottom: 4, letterSpacing: "-0.02em" }}>Hasil TKP</h1>
              <p style={{ fontSize: "0.9rem", color: "#93C5FD" }}>Tes Karakteristik Pribadi</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", fontWeight: 800, color: lulus ? "#4ade80" : "#f87171", lineHeight: 1 }}>{data.score}</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Skor Akhir</div>
              <div style={{ marginTop: 8, display: "inline-block", padding: "4px 16px", borderRadius: 999, background: lulus ? "rgba(74,222,128,0.15)" : "rgba(248,113,113,0.15)", color: lulus ? "#4ade80" : "#f87171", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {lulus ? "✓ Lulus" : "✗ Tidak Lulus"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ flex: 1, padding: "32px 24px 48px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: 32 }}>
            {STATS.map((item) => (
              <div key={item.label} style={{ background: "#fff", borderRadius: 12, padding: "16px 12px", textAlign: "center", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" }}>
                <p style={{ fontSize: "0.72rem", color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>{item.label}</p>
                <p style={{ fontSize: "1.75rem", fontWeight: 800, color: item.label === "Dijawab" ? "#16a34a" : item.label === "Kosong" ? "#94a3b8" : item.label === "Skor" ? "#1e3a8a" : "#0f172a" }}>{item.value}</p>
              </div>
            ))}
            <div style={{ background: lulus ? "rgba(74,222,128,0.08)" : "rgba(248,113,113,0.08)", borderRadius: 12, padding: "16px 12px", textAlign: "center", border: `1px solid ${lulus ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)"}` }}>
              <p style={{ fontSize: "0.72rem", color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>Passing Grade</p>
              <p style={{ fontSize: "1.75rem", fontWeight: 800, color: lulus ? "#16a34a" : "#dc2626" }}>{PASSING_GRADE}</p>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", marginBottom: 32, border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155" }}>Pencapaian Skor</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: lulus ? "#16a34a" : "#dc2626" }}>{Math.round((data.score / (PASSING_GRADE * 1.5)) * 100)}%</span>
            </div>
            <div style={{ background: "#f1f5f9", borderRadius: 999, height: 10, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 999, background: lulus ? "#22c55e" : "#ef4444", width: `${Math.min(100, Math.round((data.score / (PASSING_GRADE * 1.5)) * 100))}%`, transition: "width 0.8s ease" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
              <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Passing grade: {PASSING_GRADE}</span>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>Pembahasan Soal</h2>
              <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{data.questions.length} soal</span>
            </div>

            <div style={{ padding: "8px 16px" }}>
              {data.questions.map((q, i) => {
                const userAnswer = data.answers[i]
                const isAnswered = userAnswer !== undefined
                const statusColor = isAnswered ? "#1e3a8a" : "#94a3b8"
                const statusBg = isAnswered ? "rgba(30,58,138,0.1)" : "rgba(148,163,184,0.1)"
                const statusLabel = isAnswered ? `Skor: ${q.score?.[userAnswer] ?? "-"}` : "Kosong"

                return (
                  <details key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <summary style={{ cursor: "pointer", listStyle: "none", padding: "14px 8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: statusBg, color: statusColor, fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${statusColor}30` }}>
                          {i + 1}
                        </span>
                        <p style={{ fontSize: "0.875rem", color: "#0f172a", fontWeight: 500, flex: 1, lineHeight: 1.5 }}>{q.question}</p>
                        <span style={{ flexShrink: 0, fontSize: "0.65rem", fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: statusBg, color: statusColor, textTransform: "uppercase" }}>{statusLabel}</span>
                        <span style={{ flexShrink: 0, color: "#94a3b8", fontSize: "0.75rem" }}>▼</span>
                      </div>
                    </summary>
                    <div style={{ padding: "8px 8px 16px 48px", display: "flex", flexDirection: "column", gap: 8 }}>
                      {q.options.map((opt, index) => {
                        const isUserAnswer = index === userAnswer
                        const skorOpsi = q.score?.[index] ?? "-"
                        return (
                          <div key={index} style={{ padding: "8px 14px", borderRadius: 8, background: isUserAnswer ? "rgba(30,58,138,0.08)" : "transparent", border: isUserAnswer ? "1px solid rgba(30,58,138,0.3)" : "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: isUserAnswer ? "#1e3a8a" : "#e2e8f0", color: "#fff", fontSize: "0.7rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span style={{ fontSize: "0.85rem", color: isUserAnswer ? "#1e3a8a" : "#64748b", fontWeight: isUserAnswer ? 600 : 400, flex: 1 }}>{opt}</span>
                            <span style={{ flexShrink: 0, fontSize: "0.72rem", fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: isUserAnswer ? "rgba(30,58,138,0.15)" : "#f1f5f9", color: isUserAnswer ? "#1e3a8a" : "#64748b" }}>
                              Skor: {skorOpsi}
                            </span>
                            {isUserAnswer && <span style={{ flexShrink: 0, fontSize: "0.7rem", color: "#1e3a8a", fontWeight: 700 }}>✓ Pilihan Anda</span>}
                          </div>
                        )
                      })}
                    </div>
                  </details>
                )
              })}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
