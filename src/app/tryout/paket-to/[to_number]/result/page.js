"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"

export default function PaketTOResult() {
  const router = useRouter()
  const params = useParams()
  const toNumber = params.to_number

  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState("ringkasan")
  const [reviewFilter, setReviewFilter] = useState("semua")

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`to_${toNumber}_result`)
      if (!saved) { router.replace(`/tryout/paket-to/${toNumber}`); return }
      setResult(JSON.parse(saved))
    } catch (e) {
      router.replace(`/tryout/paket-to/${toNumber}`)
    }
  }, [])

  if (!result) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC", flexDirection: "column", gap: 16 }}>
        <div style={{ width: 40, height: 40, border: "4px solid #e2e8f0", borderTop: "4px solid #172554", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  const {
    twkScore, twkCorrect, twkWrong, twkEmpty,
    tiuScore, tiuCorrect, tiuWrong, tiuEmpty,
    tkpScore, tkpAnswered, tkpEmpty,
    totalScore, lulusTwk, lulusTiu, lulusTkp, lulusSkd,
    answers, questions
  } = result

  const subtestData = [
    {
      key: "twk", label: "TWK", color: "#3b82f6", bgColor: "rgba(59,130,246,0.08)",
      score: twkScore, min: 65, lulus: lulusTwk,
      correct: twkCorrect, wrong: twkWrong, empty: twkEmpty, total: 35,
      maxScore: 35 * 5,
    },
    {
      key: "tiu", label: "TIU", color: "#8b5cf6", bgColor: "rgba(139,92,246,0.08)",
      score: tiuScore, min: 80, lulus: lulusTiu,
      correct: tiuCorrect, wrong: tiuWrong, empty: tiuEmpty, total: 30,
      maxScore: 30 * 5,
    },
    {
      key: "tkp", label: "TKP", color: "#22c55e", bgColor: "rgba(34,197,94,0.08)",
      score: tkpScore, min: 166, lulus: lulusTkp,
      correct: tkpAnswered, wrong: null, empty: tkpEmpty, total: 35,
      maxScore: 35 * 5,
    },
  ]

  const reviewQuestions = questions?.map((q, i) => {
    const userAns = answers?.[i]
    if (q.type === "tkp") {
      return { ...q, index: i, userAns, isCorrect: null, userScore: userAns != null ? q.score[userAns] : 0 }
    }
    return { ...q, index: i, userAns, isCorrect: userAns === q.answer }
  }) || []

  const subtestColor = { twk: "#3b82f6", tiu: "#8b5cf6", tkp: "#22c55e" }
  const subtestLabel = { twk: "TWK", tiu: "TIU", tkp: "TKP" }

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC" }}>

      {/* Hero */}
      <div style={{ background: lulusSkd ? "linear-gradient(135deg, #064e3b, #065f46)" : "#172554", padding: "48px 24px 36px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "3.5rem", marginBottom: 8 }}>{lulusSkd ? "🎉" : "📋"}</div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#fff", marginBottom: 6, letterSpacing: "-0.02em" }}>
            {lulusSkd ? "Selamat! Kamu Lulus SKD" : "Hasil TO SKD #" + toNumber}
          </h1>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", marginBottom: 24 }}>
            {lulusSkd
              ? "Semua nilai subtest memenuhi passing grade SKD"
              : "Terus berlatih untuk mencapai nilai passing grade"}
          </p>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "10px 24px" }}>
            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>Total Skor</span>
            <span style={{ fontSize: "2rem", fontWeight: 900, color: lulusSkd ? "#4ade80" : "#fbbf24" }}>{totalScore}</span>
          </div>

          {/* Status badges */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
            {[
              { label: "TWK", score: twkScore, min: 65, lulus: lulusTwk },
              { label: "TIU", score: tiuScore, min: 80, lulus: lulusTiu },
              { label: "TKP", score: tkpScore, min: 166, lulus: lulusTkp },
            ].map(s => (
              <div key={s.label} style={{ background: s.lulus ? "rgba(74,222,128,0.2)" : "rgba(248,113,113,0.2)", border: `1px solid ${s.lulus ? "rgba(74,222,128,0.4)" : "rgba(248,113,113,0.4)"}`, borderRadius: 999, padding: "5px 14px", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>{s.label}</span>
                <span style={{ fontSize: "0.75rem", color: s.lulus ? "#4ade80" : "#f87171", fontWeight: 600 }}>{s.score}</span>
                <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)" }}>/ min {s.min}</span>
                <span style={{ fontSize: "0.7rem" }}>{s.lulus ? "✓" : "✗"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 4, marginTop: 24, marginBottom: 20, background: "#f1f5f9", borderRadius: 10, padding: 4 }}>
          {[
            { key: "ringkasan", label: "Ringkasan" },
            { key: "pembahasan", label: "Pembahasan" },
          ].map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              style={{ flex: 1, padding: "9px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: "0.875rem", fontWeight: activeTab === t.key ? 700 : 400, background: activeTab === t.key ? "#fff" : "transparent", color: activeTab === t.key ? "#172554" : "#64748b", boxShadow: activeTab === t.key ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.15s" }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "ringkasan" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 48 }}>

            {/* Subtest cards */}
            {subtestData.map(s => (
              <div key={s.key} style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
                <div style={{ background: s.bgColor, borderBottom: `3px solid ${s.color}`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontWeight: 800, fontSize: "1.1rem", color: s.color }}>{s.label}</span>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>min. {s.min}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: "1.75rem", fontWeight: 900, color: s.lulus ? "#16a34a" : "#dc2626" }}>{s.score}</span>
                    <span style={{ background: s.lulus ? "#dcfce7" : "#fee2e2", color: s.lulus ? "#16a34a" : "#dc2626", borderRadius: 999, padding: "3px 10px", fontSize: "0.72rem", fontWeight: 700 }}>
                      {s.lulus ? "LULUS" : "TIDAK LULUS"}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ padding: "4px 20px 0" }}>
                  <div style={{ background: "#f1f5f9", borderRadius: 999, height: 6, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 999, width: `${Math.min(100, (s.score / s.maxScore) * 100)}%`, background: s.lulus ? s.color : "#f87171", transition: "width 0.6s ease" }} />
                  </div>
                  {/* Passing grade marker */}
                  <div style={{ position: "relative", height: 0 }}>
                    <div style={{ position: "absolute", left: `${Math.min(100, (s.min / s.maxScore) * 100)}%`, top: -14, transform: "translateX(-50%)", fontSize: "0.55rem", color: "#94a3b8", whiteSpace: "nowrap" }}>▲ min {s.min}</div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: s.key === "tkp" ? "1fr 1fr" : "1fr 1fr 1fr", gap: 0, borderTop: "1px solid #f1f5f9", marginTop: 12 }}>
                  {s.key === "tkp" ? (
                    <>
                      <div style={{ padding: "12px 20px", textAlign: "center", borderRight: "1px solid #f1f5f9" }}>
                        <p style={{ fontSize: "0.65rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Dijawab</p>
                        <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>{s.correct}/{s.total}</p>
                      </div>
                      <div style={{ padding: "12px 20px", textAlign: "center" }}>
                        <p style={{ fontSize: "0.65rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Kosong</p>
                        <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#94a3b8" }}>{s.empty}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ padding: "12px 20px", textAlign: "center", borderRight: "1px solid #f1f5f9" }}>
                        <p style={{ fontSize: "0.65rem", color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Benar</p>
                        <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#16a34a" }}>{s.correct}</p>
                      </div>
                      <div style={{ padding: "12px 20px", textAlign: "center", borderRight: "1px solid #f1f5f9" }}>
                        <p style={{ fontSize: "0.65rem", color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Salah</p>
                        <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#dc2626" }}>{s.wrong}</p>
                      </div>
                      <div style={{ padding: "12px 20px", textAlign: "center" }}>
                        <p style={{ fontSize: "0.65rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Kosong</p>
                        <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#94a3b8" }}>{s.empty}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* Total skor card */}
            <div style={{ background: lulusSkd ? "#064e3b" : "#172554", borderRadius: 16, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <div>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>Total Skor SKD</p>
                <p style={{ fontSize: "2.5rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em" }}>{totalScore}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "2rem", marginBottom: 4 }}>{lulusSkd ? "🏆" : "💪"}</div>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: lulusSkd ? "#4ade80" : "#fbbf24" }}>
                  {lulusSkd ? "LULUS SKD" : "BELUM LULUS"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href={`/tryout/paket-to/${toNumber}`}
                style={{ flex: 1, display: "block", padding: "13px 20px", borderRadius: 12, border: "1.5px solid #e2e8f0", background: "#fff", color: "#334155", fontSize: "0.875rem", fontWeight: 600, textAlign: "center", textDecoration: "none", minWidth: 140 }}
              >
                ← Kembali ke TO #{toNumber}
              </Link>
              <Link href="/leaderboard/global"
                style={{ flex: 1, display: "block", padding: "13px 20px", borderRadius: 12, background: "#fbbf24", color: "#78350f", fontSize: "0.875rem", fontWeight: 700, textAlign: "center", textDecoration: "none", minWidth: 140 }}
              >
                Lihat Leaderboard
              </Link>
            </div>

            <Link href="/dashboard"
              style={{ display: "block", padding: "11px 20px", borderRadius: 12, border: "1.5px solid #172554", background: "transparent", color: "#172554", fontSize: "0.875rem", fontWeight: 600, textAlign: "center", textDecoration: "none" }}
            >
              Ke Dashboard
            </Link>
          </div>
        )}

        {activeTab === "pembahasan" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingBottom: 48 }}>
            {/* Filter by subtest */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[
                { key: "semua", label: "Semua", color: "#172554" },
                { key: "twk", label: "TWK", color: "#3b82f6" },
                { key: "tiu", label: "TIU", color: "#8b5cf6" },
                { key: "tkp", label: "TKP", color: "#22c55e" },
              ].map(f => (
                <button key={f.key} onClick={() => setReviewFilter(f.key)}
                  style={{ padding: "6px 16px", borderRadius: 999, border: reviewFilter === f.key ? "none" : "1px solid #e2e8f0", background: reviewFilter === f.key ? f.color : "#fff", color: reviewFilter === f.key ? "#fff" : "#64748b", fontSize: "0.8rem", fontWeight: reviewFilter === f.key ? 700 : 500, cursor: "pointer", transition: "all 0.15s" }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {(reviewFilter === "semua" ? reviewQuestions : reviewQuestions.filter(q => q.type === reviewFilter)).map((q, i) => {
              const color = subtestColor[q.type]
              const isCorrect = q.isCorrect
              const isTkp = q.type === "tkp"

              let statusBg, statusColor, statusText
              if (isTkp) {
                statusBg = q.userAns != null ? "rgba(59,130,246,0.08)" : "rgba(148,163,184,0.08)"
                statusColor = q.userAns != null ? "#3b82f6" : "#94a3b8"
                statusText = q.userAns != null ? `+${q.userScore} poin` : "Tidak dijawab"
              } else {
                if (isCorrect === null) { statusBg = "rgba(148,163,184,0.08)"; statusColor = "#94a3b8"; statusText = "Tidak dijawab" }
                else if (isCorrect) { statusBg = "rgba(22,163,74,0.08)"; statusColor = "#16a34a"; statusText = "Benar" }
                else { statusBg = "rgba(220,38,38,0.08)"; statusColor = "#dc2626"; statusText = "Salah" }
              }

              return (
                <div key={i} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div style={{ background: color + "10", borderBottom: `2px solid ${color}30`, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 26, height: 26, borderRadius: "50%", background: color, color: "#fff", fontSize: "0.7rem", fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: color, textTransform: "uppercase", letterSpacing: "0.06em" }}>{subtestLabel[q.type]}</span>
                    </div>
                    <span style={{ background: statusBg, color: statusColor, borderRadius: 999, padding: "3px 10px", fontSize: "0.72rem", fontWeight: 700 }}>{statusText}</span>
                  </div>

                  <div style={{ padding: "14px 16px" }}>
                    <p style={{ fontSize: "0.875rem", color: "#0f172a", lineHeight: 1.65, fontWeight: 500, marginBottom: 12 }}>{q.question}</p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {q.options.map((opt, oi) => {
                        const isUserAnswer = q.userAns === oi
                        const isCorrectAnswer = !isTkp && q.answer === oi
                        const isTopTkp = isTkp && q.score[oi] === Math.max(...q.score)

                        let bg = "#f8fafc", border = "1px solid #e2e8f0", textColor = "#475569"
                        if (isCorrectAnswer && isUserAnswer) { bg = "rgba(22,163,74,0.1)"; border = "1px solid rgba(22,163,74,0.4)"; textColor = "#15803d" }
                        else if (isCorrectAnswer) { bg = "rgba(22,163,74,0.07)"; border = "1px solid rgba(22,163,74,0.3)"; textColor = "#16a34a" }
                        else if (isUserAnswer && !isCorrectAnswer && !isTkp) { bg = "rgba(220,38,38,0.07)"; border = "1px solid rgba(220,38,38,0.3)"; textColor = "#dc2626" }
                        else if (isUserAnswer && isTkp) { bg = "rgba(59,130,246,0.07)"; border = "1px solid rgba(59,130,246,0.3)"; textColor = "#2563eb" }

                        return (
                          <div key={oi} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, background: bg, border }}>
                            <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: textColor + "20", color: textColor, fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              {String.fromCharCode(65 + oi)}
                            </span>
                            <span style={{ fontSize: "0.82rem", color: textColor, flex: 1 }}>{opt}</span>
                            <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                              {isTkp && (
                                <span style={{ fontSize: "0.65rem", color: isTopTkp ? "#16a34a" : "#94a3b8", fontWeight: 700 }}>+{q.score[oi]}</span>
                              )}
                              {isUserAnswer && <span style={{ fontSize: "0.7rem" }}>{isTkp ? "↩" : isCorrectAnswer ? "✓" : "✗"}</span>}
                              {isCorrectAnswer && !isUserAnswer && <span style={{ fontSize: "0.65rem", color: "#16a34a", fontWeight: 600 }}>Kunci</span>}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
