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

export default function GlobalLeaderboard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const { data, error } = await supabase
      .from("results")
      .select(`user_id, total, users!inner(name)`)
      .order("total", { ascending: false })

    if (error) {
      console.error("Global leaderboard error:", error)
      setLoading(false)
      return
    }

    const map = {}

    data.forEach((item) => {
      if (!map[item.user_id]) {
        map[item.user_id] = {
          name: item.users?.name || "User",
          total: 0,
          count: 0,
        }
      }
      map[item.user_id].total += item.total
      map[item.user_id].count += 1
    })

    const final = Object.values(map).sort((a, b) => b.total - a.total)

    setData(final)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <section className="bg-[#172554] py-12 sm:py-16">
        <Container>
          <Link
            href="/leaderboard"
            className="text-sm text-[#93C5FD] hover:text-white transition-colors mb-3 inline-block"
          >
            ← Kembali ke Leaderboard
          </Link>
          <h1 className="heading-1 text-white mb-2">Global Leaderboard</h1>
          <p className="body-base text-[#93C5FD]">Total skor kumulatif semua Tryout</p>
        </Container>
      </section>

      <Section variant="default" className="flex-1">
        <Container>
          <div className="max-w-2xl mx-auto">
            <Card variant="elevated" className="overflow-hidden">
              {loading ? (
                <div className="p-8 text-center text-[#64748B]">Memuat data...</div>
              ) : data.length === 0 ? (
                <div className="p-8 text-center text-[#64748B]">Belum ada data.</div>
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
                        <span className="text-sm font-medium text-[#0F172A]">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#1E3A8A]">{item.total}</p>
                        <p className="text-xs text-[#64748B]">{item.count} TO</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
