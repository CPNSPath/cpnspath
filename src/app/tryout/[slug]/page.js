"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import TryoutGuard from "@/components/TryoutGuard"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import Card from "@/components/ui/Card"
import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"

export default function TryoutPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug

  const [tryout, setTryout] = useState(null)

  useEffect(() => {
    const getTryout = async () => {
      const { data } = await supabase
        .from("tryouts")
        .select("*")
        .eq("slug", slug)
        .single()

      setTryout(data)
    }

    getTryout()
  }, [slug])

  if (!tryout) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Navbar />
        <Section variant="default" className="flex-1 flex items-center justify-center">
          <Container>
            <div className="max-w-lg mx-auto">
              <Card variant="elevated" className="p-8">
                <div className="space-y-4">
                  <div className="h-6 bg-[#E2E8F0] rounded animate-pulse w-1/2" />
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-16 bg-[#E2E8F0] rounded animate-pulse" />
                    ))}
                  </div>
                  <div className="h-11 bg-[#E2E8F0] rounded animate-pulse" />
                </div>
              </Card>
            </div>
          </Container>
        </Section>
        <Footer />
      </div>
    )
  }

  const INFO = [
    { label: "Jumlah Soal", value: tryout.total_questions },
    { label: "Durasi", value: tryout.duration },
  ]

  return (
    <TryoutGuard packageId={slug}>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Navbar />

        <section className="bg-[#172554] py-12 sm:py-16">
          <Container>
            <Link
              href="/price"
              className="text-sm text-[#93C5FD] hover:text-white transition-colors mb-3 inline-block"
            >
              ← Kembali ke Paket
            </Link>
            <h1 className="heading-1 text-white mb-2">{tryout.title}</h1>
            <p className="body-base text-[#93C5FD]">Tryout Lengkap SKB/SKD CPNS</p>
          </Container>
        </section>

        <Section variant="default" className="flex-1 flex items-center">
          <Container>
            <div className="max-w-lg mx-auto">
              <Card variant="elevated" className="p-8">
                <Badge variant="accent" className="mb-6">Paket Premium</Badge>

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
                  onClick={() => router.push(`/tryout/${slug}/exam`)}
                >
                  Mulai Tryout
                </Button>
              </Card>
            </div>
          </Container>
        </Section>

        <Footer />
      </div>
    </TryoutGuard>
  )
}
