"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import DashboardLayout from "@/components/DashboardLayout"

export default function TKPResult() {
  const router = useRouter()
  const [result, setResult] = useState(null)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const saved = localStorage.getItem("free-trial-tkp_result")
    if (!saved) {
      router.replace("/tryout/tkp")
      return
    }
    setResult(JSON.parse(saved))
  }, [])

  if (!result) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">Memuat hasil...</div>
      </DashboardLayout>
    )
  }

  const { score, answered, empty, total, answers, questions } = result
  const passingGrade = 166
  const lulus = score >= passingGrade

  // Hitung ideal poin per soal (max score)
  const idealTotal = questions.reduce((sum, q) => sum + Math.max(...q.scores), 0)

  const reviewItems = questions.map((q, i) => {
    const userAns = answers[i]
    const isEmpty = userAns === undefined
    const point = isEmpty ? 0 : q.scores[userAns]
    const bestScore = Math.max(...q.scores)
    const bestIdx = q.scores.indexOf(bestScore)
    return { i, q, userAns, isEmpty, point, bestScore, bestIdx, status: isEmpty ? "empty" : "answered" }
  })

  const emptyCount = reviewItems.filter(r => r.status === "empty").length
  const filtered = reviewItems.filter(r => {
    if (filter === "empty") return r.status === "empty"
    return true
  })

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-6">
          <Link href="/tryout/tkp" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm mb-4">← Kembali</Link>
          <h1 className="text-2xl font-bold text-navy">Hasil Free Trial TKP</h1>
          <p className="text-gray-500">{lulus ? "Selamat! Anda lulus passing grade." : "Belum mencapai passing grade, coba lagi."}</p>
        </div>

        {/* Status card */}
        <div className="bg-white rounded-xl border p-6 text-center mb-6">
          <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-4 ${lulus ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {lulus ? "✓ LULUS" : "✗ TIDAK LULUS"}
          </div>
          <p className="text-sm text-gray-500">Skor TKP</p>
          <p className="text-5xl font-bold text-navy">{score}</p>
          <p className="text-sm text-gray-400 mt-2">Passing grade: {passingGrade}</p>
          <p className="text-xs text-gray-400 mt-1">Skor ideal maksimal: {idealTotal}</p>
        </div>

        {/* Ringkasan */}
        <div className="bg-white rounded-xl border p-6 mb-6">
          <h2 className="font-bold mb-4">Ringkasan</h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-green-50 p-3 rounded"><p className="text-2xl font-bold text-green-600">{answered}</p><p className="text-xs">Dijawab</p></div>
            <div className="bg-gray-100 p-3 rounded"><p className="text-2xl font-bold text-gray-600">{empty}</p><p className="text-xs">Kosong</p></div>
          </div>
        </div>

        {/* Review */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h2 className="font-bold">Review Jawaban</h2>
            <div className="flex gap-2">
              <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded-full text-xs ${filter === "all" ? "bg-navy text-white" : "bg-gray-100"}`}>Semua ({total})</button>
              <button onClick={() => setFilter("empty")} className={`px-3 py-1 rounded-full text-xs ${filter === "empty" ? "bg-navy text-white" : "bg-gray-100"}`}>Kosong ({emptyCount})</button>
            </div>
          </div>
          <div className="space-y-4">
            {filtered.map(r => (
              <div key={r.i} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-6 h-6 bg-navy text-white rounded-full flex items-center justify-center text-xs font-bold">{r.i + 1}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${r.status === "answered" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                    {r.status === "answered" ? `+${r.point} poin` : "○ Kosong"}
                  </span>
                </div>
                <p className="text-gray-800 mb-3">{r.q.question}</p>
                <div className="space-y-1 text-sm">
                  {r.q.options.map((opt, idx) => {
                    const isBest = idx === r.bestIdx
                    const isUser = r.userAns === idx
                    let className = "p-2 rounded border"
                    if (isUser) className += " bg-blue-50 border-blue-300 text-blue-800"
                    else if (isBest) className += " bg-green-50 border-green-300 text-green-800"
                    else className += " bg-white border-gray-200"
                    return (
                      <div key={idx} className={className}>
                        <span className="font-mono mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                        <span className="float-right text-xs text-gray-500">+{r.q.scores[idx]} poin</span>
                        {isUser && <span className="ml-2 text-blue-600 text-xs">← jawaban Anda</span>}
                        {isBest && !isUser && <span className="ml-2 text-green-600 text-xs">✓ pilihan ideal</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Link href="/tryout/tkp" className="flex-1 text-center py-3 border rounded-xl">← Ulang Tryout</Link>
          <Link href="/dashboard" className="flex-1 text-center py-3 bg-navy text-white rounded-xl">Dashboard</Link>
        </div>
      </div>
    </DashboardLayout>
  )
}