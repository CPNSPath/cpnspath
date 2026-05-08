"use client"

import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import Card from "@/components/ui/Card"
import Badge from "@/components/ui/Badge"

const CATEGORIES = [
  { id: "twk", title: "TWK", subtitle: "Tes Wawasan Kebangsaan", soal: "35 soal", durasi: "30 menit", pg: 65 },
  { id: "tiu", title: "TIU", subtitle: "Tes Intelegensi Umum", soal: "30 soal", durasi: "30 menit", pg: 80 },
  { id: "tkp", title: "TKP", subtitle: "Tes Karakteristik Pribadi", soal: "35 soal", durasi: "30 menit", pg: 166 },
]

export default function TryoutHub() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <section className="bg-[#172554] py-12 sm:py-16">
        <Container>
          <Badge variant="accent" className="mb-4">Free Trial</Badge>
          <h1 className="heading-1 text-white mb-2">Free Trial Tryout</h1>
          <p className="body-base text-[#93C5FD]">Pilih jenis ujian yang ingin kamu kerjakan</p>
        </Container>
      </section>

      <Section variant="default" className="flex-1">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => router.push(`/tryout/${cat.id}`)}
                className="text-left w-full"
              >
                <Card variant="feature" className="p-6 h-full">
                  <p className="text-2xl font-bold text-[#1E3A8A] mb-1">{cat.title}</p>
                  <p className="text-sm text-[#64748B] mb-4">{cat.subtitle}</p>
                  <p className="text-xs text-[#94A3B8]">{cat.soal} · {cat.durasi}</p>
                  <p className="text-xs text-[#94A3B8] mt-1">Passing grade: {cat.pg}</p>
                </Card>
              </button>
            ))}
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
