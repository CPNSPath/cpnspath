"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { satuanTO } from "@/lib/packages"
import { buyPackage } from "@/lib/purchase"
import { checkTryoutAccess } from "@/lib/checkAccess"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import Card from "@/components/ui/Card"
import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"

export default function DetailSatuan() {
  const params = useParams()

  const [allowed, setAllowed] = useState(false)
  const [loading, setLoading] = useState(true)

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const paket = satuanTO.find((item) => item.slug === slug)

  useEffect(() => {
    const check = async () => {
      const access = await checkTryoutAccess(slug)
      setAllowed(access)
      setLoading(false)
    }
    check()
  }, [slug])

  if (!paket) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Navbar />
        <Section variant="default" className="flex-1 flex items-center justify-center">
          <Container>
            <div className="text-center">
              <p className="text-4xl mb-3">🔍</p>
              <h2 className="heading-2 text-[#0F172A] mb-2">Paket tidak ditemukan</h2>
              <Link href="/price/satuan">
                <Button variant="primary" size="sm">Kembali ke Daftar Paket</Button>
              </Link>
            </div>
          </Container>
        </Section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <section className="bg-[#172554] py-12 sm:py-16">
        <Container>
          <Link
            href="/price/satuan"
            className="text-sm text-[#93C5FD] hover:text-white transition-colors mb-3 inline-block"
          >
            ← Kembali ke Paket Satuan
          </Link>
          <h1 className="heading-1 text-white mb-2">{paket.title}</h1>
          <p className="body-base text-[#93C5FD]">
            {paket.soal} soal · {paket.durasi}
          </p>
        </Container>
      </section>

      <Section variant="default" className="flex-1">
        <Container>
          <div className="max-w-lg mx-auto">
            <Card variant="elevated" className="p-8">

              {/* Price */}
              <div className="mb-6">
                <p className="text-sm text-[#64748B] mb-1">Harga</p>
                <p className="text-4xl font-bold text-[#1E3A8A]">
                  Rp {paket.price.toLocaleString()}
                </p>
              </div>

              {/* Info */}
              <div className="flex gap-4 mb-8 pb-6 border-b border-[#E2E8F0]">
                <div className="flex-1 text-center bg-[#F8FAFC] rounded-lg p-3">
                  <p className="text-lg font-bold text-[#0F172A]">{paket.soal}</p>
                  <p className="text-xs text-[#64748B]">Soal</p>
                </div>
                <div className="flex-1 text-center bg-[#F8FAFC] rounded-lg p-3">
                  <p className="text-lg font-bold text-[#0F172A]">{paket.durasi}</p>
                  <p className="text-xs text-[#64748B]">Durasi</p>
                </div>
              </div>

              {/* Action */}
              {loading ? (
                <div className="h-11 rounded-md bg-[#E2E8F0] animate-pulse" />
              ) : allowed ? (
                <div className="space-y-3">
                  <Button variant="ghost" fullWidth disabled className="pointer-events-none">
                    ✅ Sudah Dimiliki
                  </Button>
                  <Link href={`/tryout/${paket.slug}`}>
                    <Button variant="primary" fullWidth>Mulai Tryout</Button>
                  </Link>
                </div>
              ) : (
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => buyPackage({ slug: paket.slug, type: "satuan", price: paket.price })}
                >
                  Beli Paket
                </Button>
              )}

              <p className="text-center text-xs text-[#64748B] mt-4">
                🔒 Pembayaran aman via Midtrans
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
