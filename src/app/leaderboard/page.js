"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import Card from "@/components/ui/Card"

const MEDALS = ["🥇", "🥈", "🥉"]

export default function Leaderboard() {
  const [data, setData] = useState([])
  const [slug, setSlug] = useState("to-1")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [slug])

  async function load() {
    setLoading(true)
    const { data, error } = await supabase
      .from("leaderboard")
      .select(`*, users(name)`)
      .eq("to_slug", slug)
      .order("total", { ascending: false })
      .limit(20)

    if (error) {
      console.error("Leaderboard load error:", error)
    }

    setData(data || [])
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <section className="bg-[#172554] py-12 sm:py-16">
        <Container>
          <h1 className="heading-1 text-white mb-2">Leaderboard</h1>
          <p className="body-base text-[#93C5FD]">Ranking skor per Tryout</p>
        </Container>
      </section>

      <Section variant="default" className="flex-1">
        <Container>
          <div className="max-w-2xl mx-auto">

            <div className="mb-6">
              <label className="text-sm text-[#64748B] mb-2 block">Pilih Tryout</label>
              <select
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full sm:w-auto px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB]"
              >
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i} value={`to-${i + 1}`}>TO {i + 1}</option>
                ))}
              </select>
            </div>

            <Card variant="elevated" className="overflow-hidden">
              {loading ? (
                <div className="p-8 text-center text-[#64748B]">Memuat data...</div>
              ) : data.length === 0 ? (
                <div className="p-8 text-center text-[#64748B]">Belum ada data untuk tryout ini.</div>
              ) : (
                <div className="divide-y divide-[#E2E8F0]">
                  {data.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between px-5 py-4 ${
                        index < 3 ? "bg-[#EFF6FF]" : "bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg w-8 text-center shrink-0">
                          {MEDALS[index] || `#${index + 1}`}
                        </span>
                        <span className="text-sm font-medium text-[#0F172A]">
                          {item.users?.name || "User"}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-[#1E3A8A]">{item.total}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <div className="mt-6 text-center">
              <Link
                href="/leaderboard/global"
                className="text-sm text-[#2563EB] hover:text-[#1E3A8A] transition-colors"
              >
                Lihat Global Leaderboard →
              </Link>
            </div>

          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
