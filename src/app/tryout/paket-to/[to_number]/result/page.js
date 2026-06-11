"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import DashboardLayout from "@/components/DashboardLayout"

export default function TOResultPage() {
  const params = useParams()
  const router = useRouter()
  const toNumber = params.to_number
  const [result, setResult] = useState(null)
  const [filter, setFilter] = useState("all") // all | wrong | empty

  useEffect(() => {
    const saved = localStorage.getItem(`to_${toNumber}_result`)
    if (!saved) { router.replace(`/tryout/paket-to/${toNumber}`); return }
    setResult(JSON.parse(saved))
  }, [])

  if (!result) {
    return (
      <DashboardLayout>
        <div style={{ textAlign: "center", padding: 80, color: "#64748b", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 40, border: "4px solid #e2e8f0", borderTop: "4px solid #172554", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          Memuat hasil...
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </DashboardLayout>
    )
  }

  const {
    twkScore, tiuScore, tkpScore, totalScore,
    lulusTwk, lulusTiu, lulusTkp, lulusSkd,
    twkCorrect, twkWrong, twkEmpty,
    tiuCorrect, tiuWrong, tiuEmpty,
    tkpAnswered, tkpEmpty,
    answers = {}, questions = [],
  } = result

  // Kategorisasi tiap soal buat review
  // status: "correct" | "wrong" | "empty" (TWK/TIU) | "answered" | "empty" (TKP)
  const reviewItems = questions.map((q, i) => {
    const userAns = answers[i]
    const isEmpty = userAns === undefined || userAns === null
    if (q.type === "tkp") {
      const point = isEmpty ? 0 : (q.score?.[userAns] ?? 0)
      // index opsi dengan bobot tertinggi (kalau ada tie, ambil pertama)
      const bestIdx = Array.isArray(q.score)
        ? q.score.reduce((bi, v, idx, arr) => v > arr[bi] ? idx : bi, 0)
        : null
      return { i, q, userAns, isEmpty, type: "tkp", point, bestIdx, status: isEmpty ? "empty" : "answered" }
    }
    const correct = !isEmpty && userAns === q.answer
    return { i, q, userAns, isEmpty, type: q.type, correct, status: isEmpty ? "empty" : (correct ? "correct" : "wrong") }
  })

  const totalQ = reviewItems.length
  const wrongCount = reviewItems.filter(r => r.status === "wrong").length
  const emptyCount = reviewItems.filter(r => r.status === "empty").length

  const filtered = reviewItems.filter(r => {
    if (filter === "wrong") return r.status === "wrong"
    if (filter === "empty") return r.status === "empty"
    return true
  })

  const SUBTEST_META = {
    twk: { label: "TWK", color: "#3b82f6" },
    tiu: { label: "TIU", color: "#8b5cf6" },
    tkp: { label: "TKP", color: "#22c55e" },
  }

  return (
    <DashboardLayout>
      {/* Back link + header */}
      <div style={{ marginBottom: 24 }}>
        <Link href="/tryout/paket-to" style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 14px", borderRadius: 999, background: "#f1f5f9", color: "#475569", fontSize: "0.75rem", fontWeight: 500, marginBottom: 12, textDecoration: "none" }}>
          ← Kembali ke daftar TO
        </Link>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>
          Hasil TO SKD #{toNumber}
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
          {lulusSkd ? "Selamat! Kamu memenuhi semua passing grade SKD." : "Masih ada subtest yang belum memenuhi passing grade."}
        </p>
      </div>

      {/* Status & Total Skor */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "24px", marginBottom: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.03)", textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 999, background: lulusSkd ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.08)", color: lulusSkd ? "#16a34a" : "#dc2626", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
          {lulusSkd ? "✓ LULUS SKD" : "✗ TIDAK LULUS SKD"}
        </div>
        <p style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Total Skor</p>
        <p style={{ fontSize: "3rem", fontWeight: 800, color: "#172554", letterSpacing: "-0.02em", lineHeight: 1.1 }}>{totalScore}</p>
        <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Passing grade total: 285</p>
      </div>

      {/* Rincian per subtest */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 20 }}>
        {[
          { code: "TWK", score: twkScore, passing: 65, lulus: lulusTwk, correct: twkCorrect, wrong: twkWrong, empty: twkEmpty, color: "#3b82f6" },
          { code: "TIU", score: tiuScore, passing: 80, lulus: lulusTiu, correct: tiuCorrect, wrong: tiuWrong, empty: tiuEmpty, color: "#8b5cf6" },
          { code: "TKP", score: tkpScore, passing: 166, lulus: lulusTkp, correct: tkpAnswered, wrong: null, empty: tkpEmpty, color: "#22c55e" },
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
            <div style={{ background: "#e2e8f0", borderRadius: 999, height: 6, overflow: "hidden", marginBottom: 12 }}>
              <div style={{ height: "100%", borderRadius: 999, background: s.lulus ? s.color : "#ef4444", width: `${Math.min(100, Math.round((s.score / (s.passing * 1.5)) * 100))}%`, transition: "width 0.8s ease" }} />
            </div>
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

      {/* Syarat kelulusan detail */}
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
                {s.value} {s.lulus ? "✓" : `(kurang ${Math.max(0, s.passing - s.value)})`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ====== REVIEW JAWABAN ====== */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "20px 24px", marginBottom: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>📖 Review Jawaban</h3>
          <div style={{ display: "flex", gap: 6 }}>
            {[
              { key: "all", label: `Semua (${totalQ})` },
              { key: "wrong", label: `Salah (${wrongCount})` },
              { key: "empty", label: `Kosong (${emptyCount})` },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setFilter(t.key)}
                style={{
                  padding: "6px 12px", borderRadius: 999, border: "1px solid " + (filter === t.key ? "#172554" : "#e2e8f0"),
                  background: filter === t.key ? "#172554" : "#fff",
                  color: filter === t.key ? "#fff" : "#475569",
                  fontSize: "0.72rem", fontWeight: 600, cursor: "pointer",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "30px 0", color: "#94a3b8", fontSize: "0.85rem" }}>
            {filter === "wrong" ? "Tidak ada jawaban salah 🎉" : filter === "empty" ? "Tidak ada soal yang dilewati" : "Belum ada data review."}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map(r => {
              const sub = SUBTEST_META[r.type] || SUBTEST_META.twk
              const statusBadge =
                r.status === "correct" ? { text: "✓ Benar", bg: "rgba(22,163,74,0.1)", color: "#16a34a" } :
                r.status === "wrong"   ? { text: "✗ Salah", bg: "rgba(220,38,38,0.1)", color: "#dc2626" } :
                r.status === "empty"   ? { text: "○ Kosong", bg: "rgba(148,163,184,0.15)", color: "#64748b" } :
                /* answered tkp */       { text: `+${r.point} poin`, bg: "rgba(34,197,94,0.1)", color: "#16a34a" }

              return (
                <div key={r.i} style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: "14px 16px", background: "#fafbfc" }}>
                  {/* Header soal */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                    <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#172554", color: "#fff", fontSize: "0.7rem", fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{r.i + 1}</span>
                    <span style={{ background: sub.color + "15", color: sub.color, fontSize: "0.65rem", fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>{sub.label}</span>
                    <span style={{ background: statusBadge.bg, color: statusBadge.color, fontSize: "0.65rem", fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>{statusBadge.text}</span>
                  </div>

                  {/* Pertanyaan */}
                  <p style={{ fontSize: "0.88rem", color: "#0f172a", lineHeight: 1.6, marginBottom: 10, fontWeight: 500 }}>{r.q.question}</p>

                  {/* Opsi */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: r.q.explanation ? 10 : 0 }}>
                    {(r.q.options || []).map((opt, oi) => {
                      const isUser = r.userAns === oi
                      let bg = "#fff", border = "1px solid #e2e8f0", color = "#475569", note = null

                      if (r.type === "tkp") {
                        const point = r.q.score?.[oi]
                        if (isUser) {
                          bg = "rgba(23,37,84,0.06)"; border = "1.5px solid #172554"; color = "#172554"
                          note = <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#172554" }}>Pilihanmu · +{point}</span>
                        } else if (oi === r.bestIdx) {
                          bg = "rgba(22,163,74,0.06)"; border = "1.5px solid #16a34a"; color = "#16a34a"
                          note = <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#16a34a" }}>Ideal · +{point}</span>
                        } else {
                          note = <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>+{point}</span>
                        }
                      } else {
                        const isCorrect = oi === r.q.answer
                        if (isUser && isCorrect) {
                          bg = "rgba(22,163,74,0.08)"; border = "1.5px solid #16a34a"; color = "#16a34a"
                          note = <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#16a34a" }}>Pilihanmu (benar)</span>
                        } else if (isUser && !isCorrect) {
                          bg = "rgba(220,38,38,0.06)"; border = "1.5px solid #dc2626"; color = "#dc2626"
                          note = <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#dc2626" }}>Pilihanmu</span>
                        } else if (isCorrect) {
                          bg = "rgba(22,163,74,0.06)"; border = "1.5px solid #16a34a"; color = "#16a34a"
                          note = <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#16a34a" }}>Jawaban benar</span>
                        }
                      }

                      return (
                        <div key={oi} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 8, background: bg, border }}>
                          <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "#f1f5f9", color: "#475569", fontSize: "0.7rem", fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                            {String.fromCharCode(65 + oi)}
                          </span>
                          <span style={{ flex: 1, fontSize: "0.82rem", color, fontWeight: isUser || (r.type !== "tkp" && oi === r.q.answer) || (r.type === "tkp" && oi === r.bestIdx) ? 600 : 400 }}>{opt}</span>
                          {note}
                        </div>
                      )
                    })}
                  </div>

                  {/* Pembahasan — cuma muncul kalau ada */}
                  {r.q.explanation && r.q.explanation.trim() && (
                    <div style={{ marginTop: 10, padding: "10px 14px", background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: 8 }}>
                      <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#92400e", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>💡 Pembahasan</p>
                      <p style={{ fontSize: "0.82rem", color: "#334155", lineHeight: 1.6, margin: 0 }}>{r.q.explanation}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
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
    </DashboardLayout>
  )
}