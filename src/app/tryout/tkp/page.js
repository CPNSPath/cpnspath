"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import Card from "@/components/ui/Card"
import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"

const INFO = [
  { label: "Jumlah Soal", value: "35 Soal" },
  { label: "Durasi", value: "30 Menit" },
  { label: "Passing Grade", value: "166" },
  { label: "Tipe", value: "Multiple Choice" },
]

export default function TKPIntro() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <section className="bg-[#172554] py-12 sm:py-16">
        <Container>
          <Link
            href="/tryout"
            className="text-sm text-[#93C5FD] hover:text-white transition-colors mb-3 inline-block"
          >
            ← Kembali ke Free Trial
          </Link>
          <h1 className="heading-1 text-white mb-2">Tryout TKP</h1>
          <p className="body-base text-[#93C5FD]">Tes Karakteristik Pribadi</p>
        </Container>
      </section>

      <Section variant="default" className="flex-1 flex items-center">
        <Container>
          <div className="max-w-lg mx-auto">
            <Card variant="elevated" className="p-8">
              <Badge variant="primary" className="mb-6">Free Trial</Badge>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {INFO.map((item) => (
                  <div key={item.label} className="bg-[#F8FAFC] rounded-lg p-4 text-center">
                    <p className="text-xs text-[#64748B] mb-1">{item.label}</p>
                    <p className="text-base font-bold text-[#0F172A]">{item.value}</p>
                  </div>
                ))}
              </div>

              <Button
                variant="primary"
                fullWidth
                onClick={() => router.push("/tryout/tkp/exam")}
              >
                Mulai Tryout
              </Button>
            </Card>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
