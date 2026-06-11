"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { saveTryoutResult } from "@/lib/saveResult"

export default function PaketTOExam() {
  const router = useRouter()
  const params = useParams()
  const toNumber = params.to_number

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [doubts, setDoubts] = useState({})
  const [time, setTime] = useState(90 * 60)
  const [checking, setChecking] = useState(true)
  const [allQuestions, setAllQuestions] = useState([])
  const [questionsLoading, setQuestionsLoading] = useState(true)
  const [noQuestions, setNoQuestions] = useState(false)
  const submittedRef = useRef(false)
  const answersRef = useRef({})

  useEffect(() => { answersRef.current = answers }, [answers])

  // Cek akses + status
  useEffect(() => {
    async function checkAccess() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.replace(`/login?redirect=/tryout/paket-to/${toNumber}/exam`); return }
      const { data } = await supabase
        .from("user_tryouts")
        .select("id, exam_status")
        .eq("user_id", session.user.id)
        .eq("to_number", parseInt(toNumber))
        .eq("package_slug", "skd")
        .eq("payment_status", "paid")
        .maybeSingle()
      if (!data) { router.replace(`/tryout/paket-to/${toNumber}`); return }
      // Kalau udah completed, gak boleh masuk lagi
      if (data.exam_status === "completed") {
        router.replace(`/tryout/paket-to/${toNumber}/result`)
        return
      }
      setChecking(false)
    }
    checkAccess()
  }, [])

  // Fetch soal dari DB setelah akses lolos
  useEffect(() => {
    if (checking) return
    async function fetchQuestions() {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("tryout_slug", `skd-to-${toNumber}`)
        .eq("is_active", true)
        .order("question_number", { ascending: true })
      if (error || !data || data.length === 0) {
        setNoQuestions(true)
        setQuestionsLoading(false)
        return
      }
      const mapped = data.map(row => {
        const base = {
          type: row.subtest,
          question: row.question,
          options: [row.option_a, row.option_b, row.option_c, row.option_d, row.option_e],
        }
        if (row.subtest === "tkp") {
          return { ...base, score: [row.point_a, row.point_b, row.point_c, row.point_d, row.point_e] }
        } else {
          return { ...base, answer: ("ABCDE").indexOf(row.correct_answer) }
        }
      })
      setAllQuestions(mapped)
      setQuestionsLoading(false)
    }
    fetchQuestions()
  }, [checking])

  // Load saved answers
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`to_${toNumber}_answers`)
      if (saved) setAnswers(JSON.parse(saved))
    } catch (e) { localStorage.removeItem(`to_${toNumber}_answers`) }
  }, [])

  // Save answers
  useEffect(() => {
    localStorage.setItem(`to_${toNumber}_answers`, JSON.stringify(answers))
  }, [answers])

  // Timer — mulai hanya setelah akses OK, soal selesai dimuat, dan ada soalnya
  useEffect(() => {
    if (checking || questionsLoading || allQuestions.length === 0) return
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) { clearInterval(timer); submitExam(true); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [checking, questionsLoading, allQuestions.length])

// Anti refresh/close → confirmation + auto-submit kalau dipaksa keluar
  useEffect(() => {
    if (checking) return

    let leaving = false

    function handleBeforeUnload(e) {
      if (submittedRef.current) return
      leaving = true
      e.preventDefault()
      e.returnValue = "Jika Anda keluar, ujian akan otomatis diselesaikan dan dianggap submit. Yakin?"
      return e.returnValue
    }

    function handlePageHide() {
      if (submittedRef.current) return
      if (!leaving) return // kalau bukan dari beforeunload, abaikan
      // User beneran keluar — pake sendBeacon (non-blocking) buat tandai completed
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        const accessToken = JSON.parse(localStorage.getItem('sb-' + supabaseUrl.split('//')[1].split('.')[0] + '-auth-token') || '{}')?.access_token
        if (accessToken && supabaseUrl) {
          const url = `${supabaseUrl}/rest/v1/user_tryouts?to_number=eq.${toNumber}&package_slug=eq.skd`
          const body = JSON.stringify({ exam_status: 'completed' })
          const headers = { 'Content-Type': 'application/json', 'apikey': supabaseAnon, 'Authorization': `Bearer ${accessToken}`, 'Prefer': 'return=minimal' }
          fetch(url, { method: 'PATCH', headers, body, keepalive: true })
        }
      } catch (err) { console.error(err) }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("pagehide", handlePageHide)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("pagehide", handlePageHide)
    }
  }, [checking])

  function formatTime() {
    const m = Math.floor(time / 60)
    const s = time % 60
    return `${m}:${s < 10 ? "0" + s : s}`
  }

  function selectAnswer(i) {
    setAnswers({ ...answers, [current]: i })
  }

  function toggleDoubt() {
    setDoubts({ ...doubts, [current]: !doubts[current] })
  }

  async function submitExam(force = false) {
    if (submittedRef.current) return
    if (!force) {
      if (!confirm("Apakah Anda yakin ingin mengakhiri ujian?")) return
    }
    submittedRef.current = true

    const currentAnswers = answersRef.current

    let twkScore = 0, twkCorrect = 0, twkWrong = 0, twkEmpty = 0
    let tiuScore = 0, tiuCorrect = 0, tiuWrong = 0, tiuEmpty = 0
    let tkpScore = 0, tkpAnswered = 0, tkpEmpty = 0

    allQuestions.forEach((q, i) => {
      const ans = currentAnswers[i]
      if (q.type === "twk") {
        if (ans === undefined) twkEmpty++
        else if (ans === q.answer) { twkScore += 5; twkCorrect++ }
        else twkWrong++
      } else if (q.type === "tiu") {
        if (ans === undefined) tiuEmpty++
        else if (ans === q.answer) { tiuScore += 5; tiuCorrect++ }
        else tiuWrong++
      } else if (q.type === "tkp") {
        if (ans === undefined) tkpEmpty++
        else { tkpScore += q.score[ans]; tkpAnswered++ }
      }
    })

    const totalScore = twkScore + tiuScore + tkpScore
    const lulusTwk = twkScore >= 65
    const lulusTiu = tiuScore >= 80
    const lulusTkp = tkpScore >= 166
    const lulusSkd = lulusTwk && lulusTiu && lulusTkp

    const resultData = {
      toNumber,
      twkScore, twkCorrect, twkWrong, twkEmpty,
      tiuScore, tiuCorrect, tiuWrong, tiuEmpty,
      tkpScore, tkpAnswered, tkpEmpty,
      totalScore, lulusTwk, lulusTiu, lulusTkp, lulusSkd,
      answers: currentAnswers, questions: allQuestions
    }

    localStorage.setItem(`to_${toNumber}_result`, JSON.stringify(resultData))

    await saveTryoutResult({
      toSlug: `skd-to-${toNumber}`,
      score: totalScore,
      correct: twkCorrect + tiuCorrect,
      wrong: twkWrong + tiuWrong,
      twk: twkScore,
      tiu: tiuScore,
      tkp: tkpScore,
      lulus_twk: lulusTwk,
      lulus_tiu: lulusTiu,
      lulus_tkp: lulusTkp,
    })

    // Set status completed di user_tryouts
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await supabase
        .from("user_tryouts")
        .update({ exam_status: "completed" })
        .eq("user_id", session.user.id)
        .eq("to_number", parseInt(toNumber))
        .eq("package_slug", "skd")
    }

    localStorage.removeItem(`to_${toNumber}_answers`)
    router.push(`/tryout/paket-to/${toNumber}/result`)
  }

  const answeredCount = Object.keys(answers).length
  const doubtCount = Object.keys(doubts).length
  const emptyCount = allQuestions.length - answeredCount
  const progressPercent = allQuestions.length > 0 ? Math.round((answeredCount / allQuestions.length) * 100) : 0

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC", flexDirection: "column", gap: 16 }}>
        <div style={{ width: 40, height: 40, border: "4px solid #e2e8f0", borderTop: "4px solid #172554", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Memeriksa akses...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  if (questionsLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC", flexDirection: "column", gap: 16 }}>
        <div style={{ width: 40, height: 40, border: "4px solid #e2e8f0", borderTop: "4px solid #172554", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Memuat soal...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  if (noQuestions) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC" }}>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 32, maxWidth: 420, width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📝</div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Soal Belum Tersedia</h2>
          <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.6, marginBottom: 20 }}>Soal untuk tryout ini sedang dipersiapkan admin. Silakan kembali lagi nanti.</p>
          <button onClick={() => router.push("/dashboard")}
            style={{ padding: "12px 24px", borderRadius: 10, background: "#172554", color: "#fff", fontWeight: 600, cursor: "pointer", border: "none", fontSize: "0.9rem" }}
          >Kembali ke Dashboard</button>
        </div>
      </div>
    )
  }

  return (
    <div className="exam-wrap" style={{ minHeight: "100vh", background: "#F8FAFC", display: "flex", flexDirection: "row", height: "100vh", overflow: "hidden" }}>

      {/* Area Soal */}
      <div className="exam-question" style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F8FAFC", overflowY: "auto", minWidth: 0 }}>

        {/* Header */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: "#172554", color: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: "0.78rem", fontWeight: 700 }}>
              TO SKD #{toNumber}
            </div>
            <div style={{ background: "rgba(23,37,84,0.08)", color: "#172554", borderRadius: 8, padding: "5px 12px", fontSize: "0.78rem", fontWeight: 700 }}>
              Soal {current + 1} / {allQuestions.length}
            </div>
            {doubts[current] && (
              <span style={{ background: "rgba(234,179,8,0.15)", color: "#ca8a04", borderRadius: 999, padding: "4px 10px", fontSize: "0.7rem", fontWeight: 600 }}>⚠ Ragu</span>
            )}
          </div>
          <div style={{ background: time <= 600 ? "rgba(220,38,38,0.1)" : "rgba(23,37,84,0.08)", borderRadius: 8, padding: "6px 14px", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "0.75rem", color: time <= 600 ? "#dc2626" : "#475569" }}>⏱</span>
            <span style={{ fontSize: "1rem", fontWeight: 700, color: time <= 600 ? "#dc2626" : "#172554", fontVariantNumeric: "tabular-nums" }}>{formatTime()}</span>
          </div>
        </div>

        {/* Progress bar tunggal */}
        <div style={{ background: "#fff", padding: "10px 24px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#172554" }}>Progress</span>
            <span style={{ fontSize: "0.65rem", color: "#94a3b8" }}>{answeredCount}/{allQuestions.length}</span>
          </div>
          <div style={{ background: "#e2e8f0", borderRadius: 999, height: 5, overflow: "hidden" }}>
            <div style={{ height: "100%", background: "#172554", borderRadius: 999, width: `${progressPercent}%`, transition: "width 0.3s" }} />
          </div>
        </div>

        {/* Soal */}
        <div style={{ flex: 1, padding: "24px 32px" }}>
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "28px", marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20 }}>
              <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: "#172554", color: "#fff", fontSize: "0.8rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{current + 1}</span>
              <p style={{ fontSize: "1rem", color: "#0f172a", lineHeight: 1.7, fontWeight: 500, flex: 1, paddingTop: 4 }}>{allQuestions[current].question}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {allQuestions[current].options.map((opt, i) => (
                <button key={i} onClick={() => selectAnswer(i)}
                  style={{ width: "100%", textAlign: "left", padding: "13px 18px", borderRadius: 10, border: answers[current] === i ? `2px solid #172554` : "1.5px solid #e2e8f0", background: answers[current] === i ? "#172554" : "#fff", color: answers[current] === i ? "#fff" : "#334155", fontSize: "0.9rem", fontWeight: answers[current] === i ? 600 : 400, cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 12 }}
                  onMouseEnter={e => { if (answers[current] !== i) { e.currentTarget.style.borderColor = "#172554"; e.currentTarget.style.background = "#f8fafc" } }}
                  onMouseLeave={e => { if (answers[current] !== i) { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fff" } }}
                >
                  <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: answers[current] === i ? "rgba(255,255,255,0.2)" : "#f1f5f9", color: answers[current] === i ? "#fff" : "#64748b", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => setCurrent(c => Math.max(0, c - 1))}
              style={{ padding: "10px 20px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#fff", color: "#334155", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer" }}
            >← Previous</button>
            <button onClick={() => setCurrent(c => Math.min(allQuestions.length - 1, c + 1))}
              style={{ padding: "10px 20px", borderRadius: 10, border: "1.5px solid #172554", background: "#172554", color: "#fff", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer" }}
            >Next →</button>
            <button onClick={toggleDoubt}
              style={{ padding: "10px 20px", borderRadius: 10, border: `1.5px solid ${doubts[current] ? "#ca8a04" : "#e2e8f0"}`, background: doubts[current] ? "rgba(234,179,8,0.1)" : "#fff", color: doubts[current] ? "#ca8a04" : "#64748b", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer" }}
            >⚠ Ragu-ragu</button>
            <button onClick={() => submitExam(false)}
              style={{ padding: "10px 24px", borderRadius: 10, border: "1.5px solid #fbbf24", background: "#fbbf24", color: "#78350f", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer", marginLeft: "auto" }}
            >Submit Ujian</button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="exam-sidebar" style={{ width: "280px", flexShrink: 0, background: "#fff", borderLeft: "1px solid #e2e8f0", display: "flex", flexDirection: "column", padding: "20px", overflowY: "auto" }}>
        <div style={{ background: time <= 600 ? "rgba(220,38,38,0.06)" : "#f8fafc", border: `1px solid ${time <= 600 ? "rgba(220,38,38,0.2)" : "#e2e8f0"}`, borderRadius: 12, padding: "14px", marginBottom: 14, textAlign: "center" }}>
          <p style={{ fontSize: "0.65rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4, fontWeight: 500 }}>Waktu Tersisa</p>
          <p style={{ fontSize: "1.75rem", fontWeight: 800, color: time <= 600 ? "#dc2626" : "#172554", fontVariantNumeric: "tabular-nums" }}>{formatTime()}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 16 }}>
          <div style={{ background: "rgba(22,163,74,0.08)", borderRadius: 8, padding: "8px 4px", textAlign: "center" }}>
            <p style={{ fontSize: "0.6rem", color: "#16a34a", fontWeight: 600, textTransform: "uppercase", marginBottom: 2 }}>Dijawab</p>
            <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#16a34a" }}>{answeredCount}</p>
          </div>
          <div style={{ background: "rgba(234,179,8,0.08)", borderRadius: 8, padding: "8px 4px", textAlign: "center" }}>
            <p style={{ fontSize: "0.6rem", color: "#ca8a04", fontWeight: 600, textTransform: "uppercase", marginBottom: 2 }}>Ragu</p>
            <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ca8a04" }}>{doubtCount}</p>
          </div>
          <div style={{ background: "rgba(148,163,184,0.08)", borderRadius: 8, padding: "8px 4px", textAlign: "center" }}>
            <p style={{ fontSize: "0.6rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", marginBottom: 2 }}>Kosong</p>
            <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#94a3b8" }}>{emptyCount}</p>
          </div>
        </div>

        {/* Daftar Soal — 1-110 jadi 1 grid */}
        <div style={{ marginBottom: 14 }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#172554", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, paddingBottom: 6, borderBottom: "1px solid #e2e8f0" }}>Daftar Soal</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4 }}>
            {allQuestions.map((q, i) => {
              let bg = "#f1f5f9", color = "#64748b", border = "1px solid #e2e8f0"
              if (i === current) { bg = "#172554"; color = "#fff"; border = "1px solid #172554" }
              else if (doubts[i]) { bg = "rgba(234,179,8,0.15)"; color = "#ca8a04"; border = "1px solid rgba(234,179,8,0.3)" }
              else if (answers[i] != null) { bg = "rgba(22,163,74,0.12)"; color = "#16a34a"; border = "1px solid rgba(22,163,74,0.3)" }
              return (
                <button key={i} onClick={() => setCurrent(i)}
                  style={{ background: bg, color, border, borderRadius: 5, padding: "5px 2px", fontSize: "0.65rem", fontWeight: 700, cursor: "pointer" }}
                >{i + 1}</button>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { label: "Soal aktif", bg: "#172554", color: "#172554" },
            { label: "Sudah dijawab", bg: "rgba(22,163,74,0.12)", color: "#16a34a" },
            { label: "Ragu-ragu", bg: "rgba(234,179,8,0.15)", color: "#ca8a04" },
            { label: "Belum dijawab", bg: "#f1f5f9", color: "#94a3b8" },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: item.bg, border: `1px solid ${item.color}40`, flexShrink: 0 }} />
              <span style={{ fontSize: "0.65rem", color: "#64748b" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .exam-wrap { flex-direction: column !important; height: auto !important; overflow: visible !important; min-height: 100vh; }
          .exam-question { overflow-y: visible !important; height: auto !important; }
          .exam-sidebar { width: 100% !important; border-left: none !important; border-top: 1px solid #e2e8f0 !important; }
        }
      `}</style>
    </div>
  )
}
