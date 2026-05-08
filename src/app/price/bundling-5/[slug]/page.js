"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { bundling5, satuanTO } from "@/lib/packages"
import { buyPackage } from "@/lib/purchase"
import { checkTryoutAccess } from "@/lib/checkAccess"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import Card from "@/components/ui/Card"
import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"

export default function DetailBundling5() {
  const params = useParams()

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const paket = bundling5.find((item) => item.slug === slug)

  const daftarTO = paket ? satuanTO.filter((to) => paket.tos?.includes(to.slug)) : []

  const [accessMap, setAccessMap] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAccessAll = async () => {
      let map = {}
      for (const to of daftarTO) {
        const access = await checkTryoutAccess(to.slug)
        map[to.slug] = access
      }
      setAccessMap(map)
      setLoading(false)
    }
    checkAccessAll()
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
              <Link href="/price/bundling-5">
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
            href="/price/bundling-5"
            className="text-sm text-[#93C5FD] hover:text-white transition-colors mb-3 inline-block"
          >
            ← Kembali ke Bundling 5 TO
          </Link>
          <h1 className="heading-1 text-white mb-2">{paket.title}</h1>
          <p className="body-base text-[#93C5FD]">{paket.jumlahTO} Tryout termasuk dalam paket ini</p>
        </Container>
      </section>

      <Section variant="default" className="flex-1">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Purchase card */}
            <div className="lg:col-span-1">
              <Card variant="elevated" className="p-6 lg:sticky lg:top-24">
                <Badge variant="popular" className="mb-4">{paket.jumlahTO} Tryout Bundle</Badge>
                <p className="text-3xl font-bold text-[#1E3A8A] mb-1">
                  Rp {paket.price.toLocaleString()}
                </p>
                <p className="text-xs text-[#64748B] mb-6">
                  Rp {Math.round(paket.price / paket.jumlahTO).toLocaleString()} per tryout
                </p>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => buyPackage({ slug: paket.slug, type: "bundling", price: paket.price })}
                >
                  Beli Paket
                </Button>
                <p className="text-center text-xs text-[#64748B] mt-3">🔒 Pembayaran aman via Midtrans</p>
              </Card>
            </div>

            {/* TO list */}
            <div className="lg:col-span-2">
              <h2 className="heading-3 text-[#0F172A] mb-4">Daftar Tryout dalam Paket</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {daftarTO.map((to) => (
                  <Card key={to.slug} variant="default">
                    <Card.Body>
                      <h3 className="text-sm font-semibold text-[#0F172A] mb-1">{to.title}</h3>
                      <p className="text-xs text-[#64748B] mb-3">{to.soal} soal · {to.durasi}</p>
                      {loading ? (
                        <div className="h-9 rounded-md bg-[#E2E8F0] animate-pulse" />
                      ) : accessMap[to.slug] ? (
                        <Link href={`/tryout/${to.slug}`}>
                          <Button variant="primary" size="sm" fullWidth>▶ Mulai Tryout</Button>
                        </Link>
                      ) : (
                        <Button variant="ghost" size="sm" fullWidth disabled className="pointer-events-none">
                          🔒 Terkunci
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
