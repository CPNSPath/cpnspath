"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import Card from "@/components/ui/Card"
import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import { supabase } from "@/lib/supabase"

const INFO = [
  { label: "Jumlah Soal", value: "30 Soal" },
  { label: "Durasi", value: "30 Menit" },
  { label: "Passing Grade", value: "80" },
  { label: "Tipe", value: "Multiple Choice" },
]

function TIUIntroContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const toId = searchParams.get("to_id")

  const [accessChecked, setAccessChecked] = useState(!toId)
  const [checking, setChecking] = useState(!!toId)

  useEffect(() => {
    if (!toId) return
    async function checkAccess() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.replace(`/login?redirect=/tryout/tiu?to_id=${toId}`)
        return
      }
      const { data: access } = await supabase
        .from("user_packages")
        .select("id")
        .eq("user_id", user.id)
        .eq("package_slug", "skd")
        .eq("payment_status", "paid")
        .maybeSingle()
      if (!access) {
        router.replace("/price")
        return
      }
      setAccessChecked(true)
      setChecking(false)
    }
    checkAccess()
  }, [toId, router])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <p className="text-[#64748B]">Memverifikasi akses...</p>
      </div>
    )
  }

  const backHref = toId ? `/tryout/paket-to/${toId}` : "/tryout/free-trial"
  const backLabel = toId ? `← Kembali ke TO SKD #${toId}` : "← Kembali ke Free Trial"
  const examHref = toId ? `/tryout/tiu/exam?to_id=${toId}` : "/tryout/tiu/exam"

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <section className="bg-[#172554] py-12 sm:py-16">
        <Container>
          <Link href={backHref} className="text-sm text-[#93C5FD] hover:text-white transition-colors mb-3 inline-block">
            {backLabel}
          </Link>
          <h1 className="heading-1 text-white mb-2">
            {toId ? `TO SKD #${toId} — TIU` : "Tryout TIU"}
          </h1>
          <p className="body-base text-[#93C5FD]">Tes Intelegensi Umum</p>
        </Container>
      </section>

      <Section variant="default" className="flex-1 flex items-center">
        <Container>
          <div className="max-w-lg mx-auto">
            <Card variant="elevated" className="p-8">
              <Badge variant={toId ? "accent" : "primary"} className="mb-6">
                {toId ? `Paket SKD — TO #${toId}` : "Free Trial"}
              </Badge>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {INFO.map((item) => (
                  <div key={item.label} className="bg-[#F8FAFC] rounded-lg p-4 text-center">
                    <p className="text-xs text-[#64748B] mb-1">{item.label}</p>
                    <p className="text-base font-bold text-[#0F172A]">{item.value}</p>
                  </div>
                ))}
              </div>

              <Button variant="primary" fullWidth onClick={() => router.push(examHref)}>
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

export default function TIUIntro() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC]" />}>
      <TIUIntroContent />
    </Suspense>
  )
}
