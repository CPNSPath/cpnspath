"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { saveTryoutResult } from "@/lib/saveResult"

const EXAM_SLUG = "free-trial-tkp"
const TIMER_KEY = `${EXAM_SLUG}_start_time`
const ANSWERS_KEY = `${EXAM_SLUG}_answers`

export default function TKPExam() {
  const router = useRouter()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [doubts, setDoubts] = useState({})
  const [time, setTime] = useState(null)
  const [checking, setChecking] = useState(true)
  const submittedRef = useRef(false)

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return router.replace("/login?redirect=/tryout/tkp/exam")
      
      const { data: existing } = await supabase
        .from("results")
        .select("id")
        .eq("user_id", user.id)
        .eq("tryout_slug", EXAM_SLUG)
        .maybeSingle()
      if (existing) return router.replace("/tryout/tkp/result")

      const { data: soal } = await supabase
        .from("questions")
        .select("question, option_a, option_b, option_c, option_d, option_e, point_a, point_b, point_c, point_d, point_e")
        .eq("tryout_slug", "skd-to-1")
        .eq("subtest", "tkp")
        .order("question_number")

      if (!soal || soal.length === 0) {
        alert("Soal TKP tidak tersedia")
        router.replace("/tryout/tkp")
        return
      }

      const mapped = soal.map(q => ({
        question: q.question,
        options: [q.option_a, q.option_b, q.option_c, q.option_d, q.option_e],
        scores: [q.point_a, q.point_b, q.point_c, q.point_d, q.point_e].map(v => Number(v) || 0)
      }))
      setQuestions(mapped)

      let start = parseInt(localStorage.getItem(TIMER_KEY))
      if (!start || isNaN(start)) {
        start = Date.now()
        localStorage.setItem(TIMER_KEY, start.toString())
      }
      const elapsed = Math.floor((Date.now() - start) / 1000)
      const remaining = 30 * 60 - elapsed
      if (remaining <= 0) {
        setTime(0)
        setChecking(false)
        setLoading(false)
        return
      }
      setTime(remaining)
      setChecking(false)
      setLoading(false)

      const saved = localStorage.getItem(ANSWERS_KEY)
      if (saved) setAnswers(JSON.parse(saved))
    }
    init()
  }, [])

  useEffect(() => {
    if (!loading && questions.length) {
      localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers))
    }
  }, [answers, loading, questions.length])

  useEffect(() => {
    if (checking || loading || time === null) return
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          submitExam(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [checking, loading, time])

  // Anti back button
  useEffect(() => {
    if (checking) return
    window.history.pushState({}, "")
    const handlePop = () => {
      if (!submittedRef.current) {
        if (confirm("Keluar akan mensubmit ujian. Yakin?")) submitExam(true)
      }
    }
    window.addEventListener("popstate", handlePop)
    return () => window.removeEventListener("popstate", handlePop)
  }, [checking])

  // Anti refresh/close tab
  useEffect(() => {
    if (checking) return
    const handleBefore = (e) => {
      if (!submittedRef.current) {
        e.preventDefault()
        e.returnValue = ""
      }
    }
    window.addEventListener("beforeunload", handleBefore)
    return () => window.removeEventListener("beforeunload", handleBefore)
  }, [checking])

  async function submitExam(force = false) {
    if (submittedRef.current) return
    if (!force && !confirm("Submit ujian?")) return
    submittedRef.current = true

    let totalScore = 0
    let answered = 0
    let empty = 0

    questions.forEach((q, i) => {
      const ans = answers[i]
      if (ans === undefined) {
        empty++
      } else {
        totalScore += q.scores[ans]
        answered++
      }
    })

    localStorage.setItem(`${EXAM_SLUG}_result`, JSON.stringify({
      score: totalScore,
      answered,
      empty,
      total: questions.length,
      answers,
      questions: questions.map((q, idx) => ({
        question: q.question,
        options: q.options,
        scores: q.scores,
        userAnswer: answers[idx]
      }))
    }))

    await saveTryoutResult({
      toSlug: EXAM_SLUG,
      score: totalScore,
      correct: answered,
      wrong: empty,
      twk: null, tiu: null, tkp: totalScore,
      lulus_twk: null, lulus_tiu: null, lulus_tkp: totalScore >= 166
    })

    localStorage.removeItem(TIMER_KEY)
    router.push("/tryout/tkp/result")
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Memuat soal...</div>
  if (!questions.length) return <div className="min-h-screen flex items-center justify-center">Soal tidak tersedia</div>

  const answeredCount = Object.keys(answers).length
  const emptyCount = questions.length - answeredCount
  const progress = Math.round((answeredCount / questions.length) * 100)

  const formatTime = () => {
    if (time === null) return "--:--"
    const m = Math.floor(time / 60)
    const s = time % 60
    return `${m}:${s < 10 ? "0" + s : s}`
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-row h-screen overflow-hidden">
      {/* Kiri: Soal */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-xl border p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <div className="bg-navy text-white px-3 py-1 rounded-full text-xs">Free Trial</div>
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">TKP - Soal {current + 1}</div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${time <= 300 ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}>⏱ {formatTime()}</div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-xs"><span>TKP</span><span>{answeredCount}/{questions.length}</span></div>
            <div className="h-2 bg-gray-200 rounded-full mt-1"><div className="h-full bg-green-500 rounded-full" style={{ width: `${progress}%` }} /></div>
          </div>
          <div className="mb-6">
            <div className="flex gap-3 mb-4">
              <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">{current + 1}</span>
              <p className="text-gray-800">{questions[current].question}</p>
            </div>
            <div className="space-y-2">
              {questions[current].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setAnswers({ ...answers, [current]: idx })}
                  className={`w-full text-left p-3 rounded-lg border ${answers[current] === idx ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200 hover:border-green-300"}`}
                >
                  <span className="inline-block w-6 font-bold">{String.fromCharCode(65 + idx)}.</span> {opt}
                  <span className="float-right text-xs text-gray-400">(+{questions[current].scores[idx]} poin)</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setCurrent(c => Math.max(0, c - 1))} className="px-4 py-2 border rounded-lg">← Prev</button>
            <button onClick={() => setCurrent(c => Math.min(questions.length - 1, c + 1))} className="px-4 py-2 bg-navy text-white rounded-lg">Next →</button>
            <button onClick={() => setDoubts({ ...doubts, [current]: !doubts[current] })} className={`px-4 py-2 border rounded-lg ${doubts[current] ? "bg-yellow-100 border-yellow-400" : "bg-white"}`}>⚠ Ragu</button>
            <button onClick={() => submitExam(false)} className="ml-auto px-6 py-2 bg-yellow-400 text-yellow-900 font-bold rounded-lg">Submit</button>
          </div>
        </div>
      </div>

      {/* Kanan: Sidebar */}
      <div className="w-80 bg-white border-l p-4 overflow-auto">
        <div className="text-center p-3 bg-gray-50 rounded-lg mb-4">
          <p className="text-sm">Waktu Tersisa</p>
          <p className="text-3xl font-bold">{formatTime()}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="p-2 bg-green-50 rounded"><p className="font-bold text-green-600">{answeredCount}</p><p className="text-xs">Dijawab</p></div>
          <div className="p-2 bg-yellow-50 rounded"><p className="font-bold text-yellow-600">{Object.keys(doubts).length}</p><p className="text-xs">Ragu</p></div>
          <div className="p-2 bg-gray-100 rounded"><p className="font-bold text-gray-600">{emptyCount}</p><p className="text-xs">Kosong</p></div>
        </div>
        <div className="grid grid-cols-5 gap-1">
          {questions.map((_, i) => {
            let bg = "bg-gray-100", text = "text-gray-600"
            if (i === current) { bg = "bg-green-500"; text = "text-white" }
            else if (answers[i] !== undefined) { bg = "bg-green-100"; text = "text-green-700" }
            else if (doubts[i]) { bg = "bg-yellow-100"; text = "text-yellow-700" }
            return (
              <button key={i} onClick={() => setCurrent(i)} className={`w-8 h-8 rounded text-sm font-bold ${bg} ${text}`}>
                {i + 1}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}