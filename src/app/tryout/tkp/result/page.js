"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"

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
        <Section variant="default" className="flex-1 flex items-center justify-center">
          <p className="text-[#64748B]">Memuat hasil...</p>
        </Section>
        <Footer />
      </div>
    )
  }

  const STATS = [
    { label: "Skor", value: data.score, cls: "text-[#1E3A8A]" },
    { label: "Dijawab", value: data.answered, cls: "text-[#16A34A]" },
    { label: "Kosong", value: data.empty, cls: "text-[#64748B]" },
    { label: "Total", value: data.total, cls: "text-[#0F172A]" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <section className="bg-[#172554] py-12 sm:py-16">
        <Container>
          <h1 className="heading-1 text-white mb-2">Hasil TKP</h1>
          <p className="body-base text-[#93C5FD]">Tes Karakteristik Pribadi</p>
        </Container>
      </section>

      <Section variant="default" className="flex-1">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">

            <Card variant="elevated" className="p-6">
              <h2 className="heading-3 text-[#0F172A] mb-4">Statistik</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STATS.map((item) => (
                  <div key={item.label} className="bg-[#F8FAFC] rounded-lg p-3 text-center">
                    <p className="text-xs text-[#64748B] mb-1">{item.label}</p>
                    <p className={`text-2xl font-bold ${item.cls}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Link href="/tryout/tkp">
              <Button variant="ghost" size="sm">← Kembali ke Tryout TKP</Button>
            </Link>

            <div>
              <h2 className="heading-3 text-[#0F172A] mb-4">Pembahasan Soal</h2>
              <div className="space-y-3">
                {data.questions.map((q, i) => {
                  const userAnswer = data.answers[i]
                  const isAnswered = userAnswer !== undefined

                  return (
                    <details key={i} className="group">
                      <summary className="cursor-pointer list-none">
                        <Card variant="default" className="p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-3">
                            <span className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white ${
                              isAnswered ? "bg-[#16A34A]" : "bg-[#94A3B8]"
                            }`}>
                              {i + 1}
                            </span>
                            <p className="text-sm text-[#0F172A] font-medium flex-1 pt-0.5">{q.question}</p>
                            <span className="text-[#94A3B8] text-xs shrink-0 group-open:rotate-180 transition-transform mt-1">▼</span>
                          </div>
                        </Card>
                      </summary>

                      <div className="mt-1 ml-4 pl-6 space-y-1.5 pb-2">
                        {q.options.map((opt, index) => {
                          const cls = index === userAnswer ? "text-[#1E3A8A] font-semibold" : "text-[#64748B]"
                          const suffix = index === userAnswer ? ` (Skor: ${q.score?.[index] ?? "-"})` : ""

                          return (
                            <p key={index} className={`text-sm ${cls}`}>
                              {String.fromCharCode(65 + index)}. {opt}{suffix}
                            </p>
                          )
                        })}
                      </div>
                    </details>
                  )
                })}
              </div>
            </div>

          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
