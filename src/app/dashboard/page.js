"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { getMyPackages } from "@/lib/myPackages"
import { getMyResults } from "@/lib/resultHelper"
import Card from "@/components/ui/Card"
import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"

function getInitial(email) {
  if (!email) return "U"
  return email[0].toUpperCase()
}

const SIDEBAR_LINKS = [
  { icon: "🏠", label: "Overview", href: "/dashboard" },
  { icon: "📝", label: "My Tryouts", href: "#" },   // TODO: link ke halaman tryouts
  { icon: "📦", label: "My Packages", href: "#" },  // TODO: link ke halaman packages
  { icon: "📊", label: "Performance", href: "#" },  // TODO: link ke halaman performance
  { icon: "⚙️", label: "Settings", href: "#" },     // TODO: link ke halaman settings
]

export default function Dashboard() {
  const router = useRouter()
  const pathname = usePathname()

  const [user, setUser] = useState(null)
  const [packages, setPackages] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const { data, error } = await supabase.auth.getUser()

        if (error || !data.user) {
          router.push("/login")
          return
        }

        setUser(data.user)

        const myPackages = await getMyPackages()
        const myResults = await getMyResults()

        setPackages(myPackages)
        setResults(myResults)
      } catch (err) {
        console.error("Dashboard error:", err)
      } finally {
        setLoading(false)
      }
    }

    initializeDashboard()
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const avgScore =
    results.length > 0
      ? Math.round(results.reduce((sum, r) => sum + (r.score || 0), 0) / results.length)
      : 0

  const STATS = [
    { label: "Tryouts Completed", value: results.length },
    { label: "Active Packages", value: packages.length },
    { label: "Average Score", value: results.length > 0 ? `${avgScore}` : "—" },
    { label: "National Rank", value: "—" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#64748B]">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">

      {/* ── SIDEBAR (desktop) ───────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-[#E2E8F0] fixed top-0 left-0 h-screen z-40">

        {/* Logo */}
        <div className="px-5 h-16 flex items-center border-b border-[#E2E8F0] flex-shrink-0">
          <Link href="/">
            <span
              className="text-lg font-bold text-[#1E3A8A]"
              style={{ fontFamily: "var(--font-plus-jakarta, var(--font-poppins))" }}
            >
              CPNS Path
            </span>
          </Link>
        </div>

        {/* User info */}
        {user && (
          <div className="px-5 py-4 border-b border-[#E2E8F0] flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#DBEAFE] text-[#1E3A8A] font-bold text-sm flex items-center justify-center flex-shrink-0">
                {getInitial(user.email)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0F172A] truncate">
                  {user.email?.split("@")[0]}
                </p>
                <p className="text-xs text-[#64748B] truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {SIDEBAR_LINKS.map((link) => {
            const isActive = link.href !== "#" && pathname === link.href
            return (
              <Link
                key={link.label}
                href={link.href}
                className={[
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors mb-0.5 border-l-2",
                  isActive
                    ? "bg-[#EFF6FF] text-[#1E3A8A] border-[#2563EB]"
                    : "text-[#475569] border-transparent hover:bg-[#F1F5F9] hover:text-[#1E3A8A]",
                ].join(" ")}
              >
                <span aria-hidden="true">{link.icon}</span>
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-3 border-t border-[#E2E8F0] flex-shrink-0">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm font-medium text-[#DC2626] hover:bg-[#FEE2E2] transition-colors"
          >
            <span aria-hidden="true">🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN ────────────────────────────────────────────── */}
      <div className="flex-1 lg:ml-60 flex flex-col min-w-0">

        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-[#E2E8F0] h-14 flex items-center justify-between px-4 flex-shrink-0">
          <Link href="/">
            <span
              className="text-base font-bold text-[#1E3A8A]"
              style={{ fontFamily: "var(--font-plus-jakarta, var(--font-poppins))" }}
            >
              CPNS Path
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {user && (
              <div className="w-8 h-8 rounded-full bg-[#DBEAFE] text-[#1E3A8A] font-bold text-xs flex items-center justify-center">
                {getInitial(user.email)}
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>
          </div>
        </header>

        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="heading-1 text-[#0F172A]">
              Welcome back, {user?.email?.split("@")[0] ?? "User"} 👋
            </h1>
            <p className="body-small text-[#64748B] mt-1">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {STATS.map(({ label, value }) => (
              <Card key={label} variant="default" className="p-5">
                <p className="text-2xl font-bold text-[#1E3A8A]">{value}</p>
                <p className="text-xs text-[#64748B] mt-1">{label}</p>
              </Card>
            ))}
          </div>

          {/* My Packages */}
          <section className="mb-10">
            <h2 className="heading-3 text-[#0F172A] mb-4">📦 Paket Tryout Saya</h2>

            {packages.length === 0 ? (
              <Card variant="default" className="p-8 text-center">
                <p className="text-4xl mb-3" aria-hidden="true">📭</p>
                <p className="text-sm font-medium text-[#334155] mb-1">Belum ada paket tryout</p>
                <p className="text-xs text-[#64748B] mb-4">
                  Beli paket untuk mulai latihan SKD &amp; SKB
                </p>
                <Link href="/price">
                  <Button variant="primary" size="sm">Lihat Paket</Button>
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {packages.map((item, index) => {
                  const paket = item.packages
                  return (
                    <Card key={index} variant="default">
                      <Card.Body>
                        <Badge variant="primary" className="mb-3">Aktif</Badge>
                        <h3 className="text-sm font-semibold text-[#0F172A] mb-1">{paket?.title}</h3>
                        <p className="text-xs text-[#64748B] mb-4">{paket?.jumlah_to} Tryout tersedia</p>
                        <Link href="/tryout">
                          <Button variant="primary" size="sm" fullWidth>Mulai Tryout</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  )
                })}
              </div>
            )}
          </section>

          {/* Results */}
          <section>
            <h2 className="heading-3 text-[#0F172A] mb-4">📊 Riwayat Tryout</h2>

            {results.length === 0 ? (
              <Card variant="default" className="p-8 text-center">
                <p className="text-4xl mb-3" aria-hidden="true">📋</p>
                <p className="text-sm font-medium text-[#334155] mb-1">Belum ada riwayat tryout</p>
                <p className="text-xs text-[#64748B] mb-4">
                  Selesaikan tryout pertamamu untuk melihat hasilnya di sini
                </p>
                <Link href="/tryout">
                  <Button variant="outline" size="sm">Mulai Tryout</Button>
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((r, i) => (
                  <Card key={i} variant="default">
                    <Card.Body>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
                          {r.to_slug}
                        </p>
                        <Badge variant={r.score >= 70 ? "success" : "error"}>
                          {r.score >= 70 ? "PASS" : "FAIL"}
                        </Badge>
                      </div>
                      <p className="text-3xl font-bold text-[#1E3A8A]">{r.score}</p>
                      <p className="text-xs text-[#64748B]">Score</p>
                      <div className="flex gap-6 mt-3 pt-3 border-t border-[#E2E8F0]">
                        <div>
                          <p className="text-sm font-semibold text-[#059669]">{r.correct}</p>
                          <p className="text-xs text-[#64748B]">Benar</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#DC2626]">{r.wrong}</p>
                          <p className="text-xs text-[#64748B]">Salah</p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </section>

        </main>
      </div>
    </div>
  )
}
