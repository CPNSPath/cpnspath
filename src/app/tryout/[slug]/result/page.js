"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import Card from "@/components/ui/Card"
import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"

export default function ResultPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug

  const [data, setData] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem(slug + "_result")

    if (!saved) {
      router.replace("/dashboard")
      return
    }

    setData(JSON.parse(saved))
  }, [slug])

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

  const allPassed = data.lulus_twk && data.lulus_tiu && data.lulus_tkp

  const SECTIONS = [
    { label: "TWK", value: data.twk, lulus: data.lulus_twk },
    { label: "TIU", value: data.tiu, lulus: data.lulus_tiu },
    { label: "TKP", value: data.tkp, lulus: data.lulus_tkp },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <section className={`py-12 sm:py-16 ${allPassed ? "bg-[#052E16]" : "bg-[#172554]"}`}>
        <Container>
          <p className="text-sm text-[#93C5FD] mb-2">Hasil Tryout</p>
          <p className="text-5xl font-bold text-white mb-2">{data.total}</p>
          <p className={`text-lg font-bold ${allPassed ? "text-[#4ADE80]" : "text-[#F87171]"}`}>
            {allPassed ? "ANDA LULUS 🎉" : "ANDA BELUM LULUS"}
          </p>
        </Container>
      </section>

      <Section variant="default" className="flex-1">
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">

            {/* TWK / TIU / TKP breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SECTIONS.map((sec) => (
                <Card key={sec.label} variant="elevated" className="p-6 text-center">
                  <p className="text-xs text-[#64748B] mb-2">{sec.label}</p>
                  <p className="text-4xl font-bold text-[#0F172A] mb-3">{sec.value}</p>
                  <Badge variant={sec.lulus ? "accent" : "warning"} size="sm">
                    {sec.lulus ? "LULUS" : "TIDAK LULUS"}
                  </Badge>
                </Card>
              ))}
            </div>

            {/* Stats */}
            <Card variant="default" className="p-6">
              <h2 className="heading-3 text-[#0F172A] mb-4">Detail Jawaban</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#16A34A]">{data.correct}</p>
                  <p className="text-xs text-[#64748B] mt-1">Benar</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#DC2626]">{data.wrong}</p>
                  <p className="text-xs text-[#64748B] mt-1">Salah</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#94A3B8]">{data.empty}</p>
                  <p className="text-xs text-[#64748B] mt-1">Kosong</p>
                </div>
              </div>
            </Card>

            <Button
              variant="primary"
              onClick={() => router.push("/dashboard")}
            >
              Kembali ke Dashboard
            </Button>

          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
