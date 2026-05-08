"use client"

import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import Card from "@/components/ui/Card"
import Badge from "@/components/ui/Badge"
import { satuanTO } from "@/lib/packages"

export default function SatuanPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <section className="bg-[#172554] py-12 sm:py-16">
        <Container>
          <Link
            href="/price"
            className="text-sm text-[#93C5FD] hover:text-white transition-colors mb-3 inline-block"
          >
            ← Kembali ke Pricing
          </Link>
          <h1 className="heading-1 text-white mb-2">Paket Try Out Satuan</h1>
          <p className="body-base text-[#93C5FD]">Beli tryout satuan sesuai kebutuhan</p>
        </Container>
      </section>

      <Section variant="default" className="flex-1">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {satuanTO.map((item) => {
              const num = parseInt(item.slug.replace("to-", ""))
              const available = num <= 20

              if (!available) {
                return (
                  <Card key={item.slug} variant="default" className="p-5 flex flex-col opacity-60 cursor-not-allowed">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-semibold text-[#0F172A]">{item.title}</h3>
                      <Badge variant="default" size="sm">Segera</Badge>
                    </div>
                    <p className="text-xs text-[#64748B]">{item.soal} soal · {item.durasi}</p>
                    <p className="text-lg font-bold text-[#94A3B8] mt-auto pt-3">
                      Rp {item.price.toLocaleString()}
                    </p>
                  </Card>
                )
              }

              return (
                <Link key={item.slug} href={`/price/satuan/${item.slug}`} className="block h-full">
                  <Card variant="feature" className="p-5 h-full flex flex-col">
                    <h3 className="text-sm font-semibold text-[#0F172A] mb-1">{item.title}</h3>
                    <p className="text-xs text-[#64748B]">{item.soal} soal · {item.durasi}</p>
                    <p className="text-xl font-bold text-[#1E3A8A] mt-auto pt-3">
                      Rp {item.price.toLocaleString()}
                    </p>
                  </Card>
                </Link>
              )
            })}
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
