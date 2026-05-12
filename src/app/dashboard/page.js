"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { getMyPackages } from "@/lib/myPackages"
import { getMyResults } from "@/lib/resultHelper"

function getInitial(user) {
  if (user?.user_metadata?.name) return user.user_metadata.name[0].toUpperCase()
  if (user?.email) return user.email[0].toUpperCase()
  return "U"
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [packages, setPackages] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [userTryouts, setUserTryouts] = useState([])
  const [settingOpen, setSettingOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const settingRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (settingRef.current && !settingRef.current.contains(e.target)) {
        setSettingOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error || !data.user) { router.push("/login"); return }
        setUser(data.user)
        const myPackages = await getMyPackages()
        const myResults = await getMyResults()
        setPackages(myPackages)
        setResults(myResults)
        const { data: myTryouts } = await supabase
          .from("user_tryouts")
          .select("to_number, package_slug, payment_status")
          .eq("user_id", data.user.id)
          .eq("payment_status", "paid")
          .order("to_number", { ascending: true })
        setUserTryouts(myTryouts || [])
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

  const avgScore = results.length > 0
    ? Math.round(results.reduce((sum, r) => sum + (r.score || 0), 0) / results.length)
    : 0

  const twkResult = results.find(r => r.tryout_slug === "free-trial-twk")
  const tiuResult = results.find(r => r.tryout_slug === "free-trial-tiu")
  const tkpResult = results.find(r => r.tryout_slug === "free-trial-tkp")

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC", flexDirection: "column", gap: 16 }}>
        <div style={{ width: 40, height: 40, border: "4px solid #e2e8f0", borderTop: "4px solid #172554", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Memuat dashboard...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", display: "flex" }}>

      {/* Sidebar */}
      <aside style={{ width: 240, flexShrink: 0, background: "#fff", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 40 }} className="hidden lg:flex dashboard-sidebar">
        <div style={{ padding: "0 20px", height: 64, display: "flex", alignItems: "center", borderBottom: "1px solid #e2e8f0" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <svg width="120" height="32" viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="8" fill="#172554"/>
              <rect x="8" y="9" width="9" height="18" rx="2" fill="#fbbf24"/>
              <rect x="19" y="9" width="9" height="18" rx="2" fill="white" opacity="0.9"/>
              <line x1="18" y1="9" x2="18" y2="27" stroke="#172554" strokeWidth="1.5"/>
              <polyline points="21,17 23,20 28,14" fill="none" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="44" y="16" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#172554" letterSpacing="1.5">CPNS</text>
              <text x="44" y="29" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="400" fill="#fbbf24" letterSpacing="4">PATH</text>
            </svg>
          </Link>
        </div>

        {user && (
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#fbbf24", color: "#78350f", fontWeight: 800, fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {getInitial(user)}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0f172a", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.user_metadata?.name || user.email?.split("@")[0]}</p>
              <p style={{ fontSize: "0.72rem", color: "#94a3b8", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</p>
            </div>
          </div>
        )}

        <nav style={{ flex: 1, padding: "12px 12px", overflowY: "auto" }}>
          {[
            { icon: "▦", label: "Overview", href: "/dashboard", active: true },
            { icon: "📝", label: "Free Trial", href: "/tryout/free-trial", active: false },
            { icon: "📦", label: "Paket TO", href: "/price", active: false },
            { icon: "📚", label: "Ebook", href: "/ebook", active: false },
            { icon: "🏆", label: "Leaderboard", href: "/leaderboard/global", active: false },
          ].map((link) => (
            <Link key={link.label} href={link.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, marginBottom: 2, textDecoration: "none", background: link.active ? "#eff6ff" : "transparent", borderLeft: link.active ? "3px solid #172554" : "3px solid transparent", transition: "all 0.15s" }}
              onMouseEnter={e => { if (!link.active) e.currentTarget.style.background = "#f8fafc" }}
              onMouseLeave={e => { if (!link.active) e.currentTarget.style.background = "transparent" }}
            >
              <span style={{ fontSize: "0.85rem" }}>{link.icon}</span>
              <span style={{ fontSize: "0.875rem", fontWeight: link.active ? 600 : 400, color: link.active ? "#172554" : "#475569" }}>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div style={{ padding: "12px", borderTop: "1px solid #e2e8f0" }}>
          <button onClick={logout} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", background: "none", cursor: "pointer", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
            onMouseLeave={e => e.currentTarget.style.background = "none"}
          >
            <span style={{ fontSize: "0.85rem" }}>🚪</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#dc2626" }}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0, marginLeft: 240 }} className="lg:ml-[240px] dashboard-main">

        {/* Mobile header */}
        <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", position: "sticky", top: 0, zIndex: 30 }} className="lg:hidden">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setSidebarOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 6H21M3 12H21M3 18H21" stroke="#172554" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            <span style={{ fontSize: "1rem", fontWeight: 800, color: "#172554" }}>CPNS Path</span>
          </div>
          <div style={{ position: "relative" }} ref={settingRef}>
            <button
              onClick={() => setSettingOpen(v => !v)}
              style={{ width: 36, height: 36, borderRadius: "50%", background: "#fbbf24", color: "#78350f", fontWeight: 800, fontSize: "0.9rem", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {getInitial(user)}
            </button>
            {settingOpen && (
              <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", width: 240, background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.4)", zIndex: 50 }}>
                <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fbbf24", color: "#78350f", fontWeight: 800, fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {getInitial(user)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f1f5f9", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.user_metadata?.name || user?.email?.split("@")[0]}</p>
                    <p style={{ fontSize: "0.72rem", color: "#64748b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.email}</p>
                  </div>
                </div>
                <div style={{ padding: "6px 0" }}>
                  <Link href="/dashboard/settings" onClick={() => setSettingOpen(false)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", textDecoration: "none", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <span style={{ fontSize: "0.85rem", color: "#64748b" }}>⚙</span>
                    <span style={{ fontSize: "0.875rem", color: "#cbd5e1" }}>Edit Profil</span>
                  </Link>
                  <Link href="/dashboard/settings?tab=password" onClick={() => setSettingOpen(false)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", textDecoration: "none", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <span style={{ fontSize: "0.85rem", color: "#64748b" }}>🔑</span>
                    <span style={{ fontSize: "0.875rem", color: "#cbd5e1" }}>Ganti Password</span>
                  </Link>
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "6px 0" }}>
                  <button onClick={logout} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "none", border: "none", cursor: "pointer", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(220,38,38,0.1)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <span style={{ fontSize: "0.85rem", color: "#ef4444" }}>🚪</span>
                    <span style={{ fontSize: "0.875rem", color: "#ef4444", fontWeight: 500 }}>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {sidebarOpen && (
          <>
            <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 45 }} />
            <aside style={{ position: "fixed", top: 0, left: 0, height: "100vh", width: 260, background: "#fff", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", zIndex: 50, overflowY: "auto" }}>
              <div style={{ padding: "0 20px", height: 64, display: "flex", alignItems: "center", borderBottom: "1px solid #e2e8f0" }}>
                <Link href="/" style={{ textDecoration: "none" }}>
                  <svg width="120" height="32" viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="36" height="36" rx="8" fill="#172554"/>
                    <rect x="8" y="9" width="9" height="18" rx="2" fill="#fbbf24"/>
                    <rect x="19" y="9" width="9" height="18" rx="2" fill="white" opacity="0.9"/>
                    <line x1="18" y1="9" x2="18" y2="27" stroke="#172554" strokeWidth="1.5"/>
                    <polyline points="21,17 23,20 28,14" fill="none" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <text x="44" y="16" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#172554" letterSpacing="1.5">CPNS</text>
                    <text x="44" y="29" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="400" fill="#fbbf24" letterSpacing="4">PATH</text>
                  </svg>
                </Link>
              </div>
              {user && (
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#fbbf24", color: "#78350f", fontWeight: 800, fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {getInitial(user)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0f172a", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.user_metadata?.name || user.email?.split("@")[0]}</p>
                    <p style={{ fontSize: "0.72rem", color: "#94a3b8", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</p>
                  </div>
                </div>
              )}
              <nav style={{ flex: 1, padding: "12px 12px", overflowY: "auto" }}>
                {[
                  { icon: "▦", label: "Overview", href: "/dashboard", active: true },
                  { icon: "📝", label: "Free Trial", href: "/tryout/free-trial", active: false },
                  { icon: "📦", label: "Paket TO", href: "/price", active: false },
                  { icon: "📚", label: "Ebook", href: "/ebook", active: false },
                  { icon: "🏆", label: "Leaderboard", href: "/leaderboard/global", active: false },
                ].map((link) => (
                  <Link key={link.label} href={link.href} onClick={() => setSidebarOpen(false)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, marginBottom: 2, textDecoration: "none", background: link.active ? "#eff6ff" : "transparent", borderLeft: link.active ? "3px solid #172554" : "3px solid transparent", transition: "all 0.15s" }}
                    onMouseEnter={e => { if (!link.active) e.currentTarget.style.background = "#f8fafc" }}
                    onMouseLeave={e => { if (!link.active) e.currentTarget.style.background = "transparent" }}
                  >
                    <span style={{ fontSize: "0.85rem" }}>{link.icon}</span>
                    <span style={{ fontSize: "0.875rem", fontWeight: link.active ? 600 : 400, color: link.active ? "#172554" : "#475569" }}>{link.label}</span>
                  </Link>
                ))}
              </nav>
              <div style={{ padding: "12px", borderTop: "1px solid #e2e8f0" }}>
                <button onClick={logout} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", background: "none", cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >
                  <span style={{ fontSize: "0.85rem" }}>🚪</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#dc2626" }}>Logout</span>
                </button>
              </div>
            </aside>
          </>
        )}

        <main className="dashboard-content" style={{ padding: "32px 32px" }}>

          {/* Greeting */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>
              Halo, {user?.user_metadata?.name || user?.email?.split("@")[0]} 👋
            </h1>
            <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
              {new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          {/* Stats */}
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
            {[
              { label: "Tryout Selesai", value: results.length, color: "#172554", bg: "rgba(23,37,84,0.06)" },
              { label: "Rata-rata Skor", value: results.length > 0 ? avgScore : "—", color: "#16a34a", bg: "rgba(22,163,74,0.06)" },
              { label: "Paket Aktif", value: packages.length, color: "#d97706", bg: "rgba(217,119,6,0.06)" },
              { label: "Ranking Nasional", value: "—", color: "#7c3aed", bg: "rgba(124,58,237,0.06)" },
            ].map((stat) => (
              <div key={stat.label} style={{ background: "#fff", borderRadius: 14, padding: "20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: stat.color, marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Progress Free Trial SKD */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "24px", marginBottom: 24, boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>📊 Progress Free Trial SKD</h2>
              <Link href="/tryout/free-trial/skd" style={{ fontSize: "0.8rem", color: "#172554", fontWeight: 600, textDecoration: "none" }}>Lihat semua →</Link>
            </div>
            <div className="progress-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {[
                { code: "TWK", name: "Tes Wawasan Kebangsaan", result: twkResult, passing: 65, href: "/tryout/twk" },
                { code: "TIU", name: "Tes Intelegensi Umum", result: tiuResult, passing: 80, href: "/tryout/tiu" },
                { code: "TKP", name: "Tes Karakteristik Pribadi", result: tkpResult, passing: 166, href: "/tryout/tkp" },
              ].map((item) => (
                <div key={item.code} style={{ background: "#f8fafc", borderRadius: 12, padding: "16px", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155" }}>{item.code}</span>
                    {item.result ? (
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: item.result.score >= item.passing ? "rgba(22,163,74,0.12)" : "rgba(220,38,38,0.1)", color: item.result.score >= item.passing ? "#16a34a" : "#dc2626" }}>
                        {item.result.score >= item.passing ? "LULUS" : "TIDAK LULUS"}
                      </span>
                    ) : (
                      <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "rgba(148,163,184,0.12)", color: "#94a3b8" }}>BELUM</span>
                    )}
                  </div>
                  <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", marginBottom: 2 }}>
                    {item.result ? item.result.score : "—"}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginBottom: 10 }}>Passing grade: {item.passing}</div>
                  {item.result && (
                    <div style={{ background: "#e2e8f0", borderRadius: 999, height: 6, overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 999, background: item.result.score >= item.passing ? "#16a34a" : "#ef4444", width: `${Math.min(100, Math.round((item.result.score / (item.passing * 1.5)) * 100))}%`, transition: "width 0.8s ease" }} />
                    </div>
                  )}
                  {!item.result && (
                    <Link href={item.href} style={{ display: "block", textAlign: "center", padding: "8px", borderRadius: 8, background: "#fbbf24", color: "#78350f", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}>
                      Mulai Sekarang
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Riwayat Tryout */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "24px", marginBottom: 24, boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>📋 Riwayat Tryout</h2>
            {results.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📭</div>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>Belum ada riwayat tryout</p>
                <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: 16 }}>Selesaikan tryout pertamamu</p>
                <Link href="/tryout/free-trial" style={{ display: "inline-block", padding: "10px 20px", borderRadius: 10, background: "#172554", color: "#fff", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
                  Mulai Free Trial
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {results.map((r, i) => {
                  const slugLabel = r.tryout_slug?.replace("free-trial-", "").toUpperCase() || r.tryout_slug
                  const passing = r.tryout_slug?.includes("twk") ? 65 : r.tryout_slug?.includes("tiu") ? 80 : 166
                  const lulus = r.score >= passing
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 10, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: lulus ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>
                          {lulus ? "✅" : "❌"}
                        </div>
                        <div>
                          <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0f172a", margin: 0 }}>{slugLabel}</p>
                          <p style={{ fontSize: "0.72rem", color: "#94a3b8", margin: 0 }}>
                            {new Date(r.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "1.25rem", fontWeight: 800, color: lulus ? "#16a34a" : "#dc2626" }}>{r.score}</div>
                        <div style={{ fontSize: "0.65rem", color: "#94a3b8" }}>Passing: {passing}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Paket TO Saya */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>📦 Paket TO Saya</h2>
            {userTryouts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🛒</div>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>Belum ada TO yang dibeli</p>
                <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: 16 }}>Beli tryout SKD atau SKB sesuai kebutuhan</p>
                <Link href="/tryout/paket-to" style={{ display: "inline-block", padding: "10px 20px", borderRadius: 10, background: "#fbbf24", color: "#78350f", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
                  Lihat Paket TO
                </Link>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    <span style={{ fontWeight: 700, color: "#172554", fontSize: "1.1rem" }}>{userTryouts.length}</span> TO dimiliki
                  </p>
                  <Link href="/tryout/paket-to" style={{ fontSize: "0.8rem", color: "#172554", fontWeight: 600, textDecoration: "none" }}>
                    Lihat semua →
                  </Link>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))", gap: 8 }}>
                  {userTryouts.slice(0, 20).map((t) => (
                    <Link key={t.to_number} href={`/tryout/paket-to/${t.to_number}`}
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "12px 8px", borderRadius: 10, background: "#f0fdf4", border: "1px solid #bbf7d0", textDecoration: "none", transition: "all 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#dcfce7"; e.currentTarget.style.transform = "translateY(-1px)" }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#f0fdf4"; e.currentTarget.style.transform = "translateY(0)" }}
                    >
                      <span style={{ fontSize: "1rem", fontWeight: 800, color: "#172554" }}>{t.to_number}</span>
                      <span style={{ fontSize: "0.6rem", color: "#16a34a", fontWeight: 600 }}>SKD</span>
                    </Link>
                  ))}
                  {userTryouts.length > 20 && (
                    <Link href="/tryout/paket-to" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 8px", borderRadius: 10, background: "#f8fafc", border: "1px solid #e2e8f0", textDecoration: "none" }}>
                      <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>+{userTryouts.length - 20} lagi</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

        </main>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .dashboard-sidebar { display: none !important; }
          .dashboard-main { margin-left: 0 !important; }
          .dashboard-content { padding: 16px !important; }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .progress-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
