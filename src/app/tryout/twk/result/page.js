"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import DashboardLayout from "@/components/DashboardLayout"

const PASSING_GRADE = 166
const SUBTEST_COLOR = "#22c55e"

export default function TKPResult() {
  const router = useRouter()
  const [data, setData] = useState(null)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const saved = localStorage.getItem("tkp_result")
    if (saved) setData(JSON.parse(saved))
  }, [])

  if (!data) {
    return (<DashboardLayout><div style={{ textAlign: "center", padding: 80, color: "#64748b" }}>Memuat hasil...</div></DashboardLayout>)
  }

  const lulus = data.score >= PASSING_GRADE
  const maxScore = data.total * 5
  const persen = Math.min(100, Math.round((data.score / maxScore) * 100))

  const filtered = data.questions.map((q, i) => ({ q, i })).filter(({ q, i }) => {
    const ans = data.answers[i]
    if (filter === "empty") return ans === undefined
    if (filter === "low") return ans !== undefined && q.score[ans] <= 2
    return true
  })
  const filterCounts = {
    all: data.questions.length,
    low: data.questions.filter((q, i) => data.answers[i] !== undefined && q.score[data.answers[i]] <= 2).length,
    empty: data.questions.filter((q, i) => data.answers[i] === undefined).length,
  }

  return (
    <DashboardLayout>
      <Link href="/tryout/free-trial" style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 14px", borderRadius: 999, background: "#f1f5f9", color: "#475569", fontSize: "0.75rem", fontWeight: 500, marginBottom: 16, textDecoration: "none" }}>← Kembali ke Free Trial</Link>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden", marginBottom: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ background: "#172554", padding: "28px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>Hasil Free Trial TKP</h1>
            <p style={{ fontSize: "0.85rem", color: "#93c5fd" }}>Tes Karakteristik Pribadi</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 800, color: lulus ? "#4ade80" : "#f87171", lineHeight: 1 }}>{data.score}</div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Skor Akhir</div>
            <div style={{ marginTop: 8, display: "inline-block", padding: "4px 14px", borderRadius: 999, background: lulus ? "rgba(74,222,128,0.15)" : "rgba(248,113,113,0.15)", color: lulus ? "#4ade80" : "#f87171", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{lulus ? "✓ LULUS" : "✗ TIDAK LULUS"}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Skor", value: data.score, color: SUBTEST_COLOR },
          { label: "Dijawab", value: data.answered, color: "#16a34a" },
          { label: "Kosong", value: data.empty, color: "#94a3b8" },
          { label: "Total Soal", value: data.total, color: "#0f172a" },
          { label: "Skor Maks", value: maxScore, color: "#64748b" },
          { label: "Passing Grade", value: PASSING_GRADE, color: lulus ? "#16a34a" : "#dc2626" },
        ].map(item => (
          <div key={item.label} style={{ background: "#fff", borderRadius: 12, padding: "14px 12px", textAlign: "center", border: "1px solid #e2e8f0" }}>
            <p style={{ fontSize: "0.65rem", color: "#64748b", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>{item.label}</p>
            <p style={{ fontSize: "1.5rem", fontWeight: 800, color: item.color }}>{item.value}</p>
          </div>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", marginBottom: 24, border: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#334155" }}>Pencapaian Skor</span><span style={{ fontSize: "0.8rem", fontWeight: 700, color: lulus ? "#16a34a" : "#dc2626" }}>{persen}%</span></div>
        <div style={{ background: "#f1f5f9", borderRadius: 999, height: 10, overflow: "hidden" }}><div style={{ height: "100%", borderRadius: 999, background: lulus ? "#22c55e" : "#ef4444", width: `${persen}%`, transition: "width 0.8s ease" }} /></div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}><span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Passing grade: {PASSING_GRADE}</span></div>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", marginBottom: 24, border: "1px solid #e2e8f0" }}>
        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Syarat Kelulusan</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 24, height: 24, borderRadius: "50%", background: lulus ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.1)", color: lulus ? "#16a34a" : "#dc2626", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{lulus ? "✓" : "✗"}</span>
          <div style={{ flex: 1 }}><p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155" }}>TKP — Minimal {PASSING_GRADE}</p><p style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Skor kamu: {data.score}</p></div>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: lulus ? "#16a34a" : "#dc2626" }}>{data.score}/{maxScore}</span>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>Review Jawaban</h2>
          <div style={{ display: "flex", gap: 6 }}>
            {[{ key: "all", label: "Semua" },{ key: "low", label: "Skor Rendah" },{ key: "empty", label: "Kosong" }].map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)} style={{ padding: "4px 12px", borderRadius: 999, fontSize: "0.7rem", fontWeight: 600, cursor: "pointer", border: filter === f.key ? `1.5px solid ${SUBTEST_COLOR}` : "1.5px solid #e2e8f0", background: filter === f.key ? SUBTEST_COLOR + "15" : "#fff", color: filter === f.key ? SUBTEST_COLOR : "#64748b" }}>{f.label} ({filterCounts[f.key]})</button>
            ))}
          </div>
        </div>
        <div style={{ padding: "8px 16px" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 16px", color: "#94a3b8", fontSize: "0.85rem" }}>Tidak ada soal untuk filter ini.</div>
          ) : filtered.map(({ q, i }) => {
            const userAnswer = data.answers[i]
            const isEmpty = userAnswer === undefined
            const userScore = isEmpty ? 0 : q.score[userAnswer]
            const idealIdx = q.score.indexOf(Math.max(...q.score))
            const statusColor = isEmpty ? "#94a3b8" : userScore >= 4 ? "#16a34a" : userScore >= 3 ? "#ca8a04" : "#dc2626"
            const statusBg = isEmpty ? "rgba(148,163,184,0.1)" : userScore >= 4 ? "rgba(22,163,74,0.1)" : userScore >= 3 ? "rgba(234,179,8,0.1)" : "rgba(220,38,38,0.1)"
            const statusLabel = isEmpty ? "Kosong" : `Poin: ${userScore}/5`

            return (
              <details key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <summary style={{ cursor: "pointer", listStyle: "none", padding: "14px 8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: statusBg, color: statusColor, fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${statusColor}30` }}>{i + 1}</span>
                    <p style={{ fontSize: "0.85rem", color: "#0f172a", fontWeight: 500, flex: 1, lineHeight: 1.5 }}>{q.question}</p>
                    <span style={{ flexShrink: 0, fontSize: "0.65rem", fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: statusBg, color: statusColor, textTransform: "uppercase" }}>{statusLabel}</span>
                    <span style={{ flexShrink: 0, color: "#94a3b8", fontSize: "0.75rem" }}>▼</span>
                  </div>
                </summary>
                <div style={{ padding: "8px 8px 16px 48px", display: "flex", flexDirection: "column", gap: 6 }}>
                  {q.options.map((opt, idx) => {
                    const isUser = idx === userAnswer
                    const isIdeal = idx === idealIdx
                    const optScore = q.score[idx]
                    let bg = "transparent", border = "1px solid #e2e8f0", color = "#64748b", fw = 400
                    if (isIdeal) { bg = "rgba(22,163,74,0.08)"; border = "1px solid rgba(22,163,74,0.3)"; color = "#16a34a"; fw = 600 }
                    if (isUser && !isIdeal) { bg = optScore >= 4 ? "rgba(22,163,74,0.06)" : optScore >= 3 ? "rgba(234,179,8,0.08)" : "rgba(220,38,38,0.08)"; border = `1px solid ${optScore >= 4 ? "rgba(22,163,74,0.3)" : optScore >= 3 ? "rgba(234,179,8,0.3)" : "rgba(220,38,38,0.3)"}` ; color = optScore >= 4 ? "#16a34a" : optScore >= 3 ? "#ca8a04" : "#dc2626"; fw = 600 }

                    return (
                      <div key={idx} style={{ padding: "8px 14px", borderRadius: 8, background: bg, border, display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: isIdeal ? "#16a34a" : isUser ? (optScore >= 3 ? "#ca8a04" : "#dc2626") : "#e2e8f0", color: isIdeal || isUser ? "#fff" : "#64748b", fontSize: "0.7rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{String.fromCharCode(65 + idx)}</span>
                        <span style={{ fontSize: "0.85rem", color, fontWeight: fw, flex: 1 }}>{opt}</span>
                        <span style={{ flexShrink: 0, fontSize: "0.7rem", fontWeight: 700, color: optScore === 5 ? "#16a34a" : optScore >= 3 ? "#ca8a04" : "#94a3b8", background: optScore === 5 ? "rgba(22,163,74,0.1)" : optScore >= 3 ? "rgba(234,179,8,0.1)" : "rgba(148,163,184,0.1)", padding: "2px 8px", borderRadius: 999 }}>{optScore} poin</span>
                        {isIdeal && <span style={{ flexShrink: 0, fontSize: "0.6rem", color: "#16a34a", fontWeight: 700 }}>★ Ideal</span>}
                        {isUser && !isIdeal && <span style={{ flexShrink: 0, fontSize: "0.6rem", color: "#64748b", fontWeight: 600 }}>← Anda</span>}
                      </div>
                    )
                  })}
                </div>
              </details>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}