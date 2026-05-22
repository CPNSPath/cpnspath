"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/AuthContext"

function getInitial(user) {
  if (user?.user_metadata?.name) return user.user_metadata.name[0].toUpperCase()
  if (user?.email) return user.email[0].toUpperCase()
  return "U"
}

const NAV_LINKS = [
  { icon: "▦", label: "Overview", href: "/dashboard" },
  { icon: "📦", label: "Paket TO", href: "/tryout/paket-to" },
  { icon: "📚", label: "Ebook", href: "/ebook" },
  { icon: "🏆", label: "Leaderboard", href: "/leaderboard/global" },
]

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settingOpen, setSettingOpen] = useState(false)
  const settingRef = useRef(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    function handleClickOutside(e) {
      if (settingRef.current && !settingRef.current.contains(e.target)) {
        setSettingOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  function isActive(href) {
    if (href === "/dashboard") return pathname === "/dashboard"
    return pathname.startsWith(href)
  }


  const Sidebar = ({ onLinkClick }) => (
    <>
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

      <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: user ? "#fbbf24" : "#e2e8f0", color: "#78350f", fontWeight: 800, fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {user ? getInitial(user) : ""}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          {user ? (
            <>
              <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0f172a", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.user_metadata?.name || user.email?.split("@")[0]}</p>
              <p style={{ fontSize: "0.72rem", color: "#94a3b8", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</p>
            </>
          ) : (
            <>
              <div style={{ height: 12, background: "#e2e8f0", borderRadius: 4, marginBottom: 6, width: "60%" }} />
              <div style={{ height: 10, background: "#f1f5f9", borderRadius: 4, width: "85%" }} />
            </>
          )}
        </div>
      </div>

      <nav style={{ flex: 1, padding: "12px 12px", overflowY: "auto" }}>
        {NAV_LINKS.map((link) => {
          const active = isActive(link.href)
          return (
            <Link key={link.label} href={link.href} onClick={onLinkClick}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, marginBottom: 2, textDecoration: "none", background: active ? "#eff6ff" : "transparent", borderLeft: active ? "3px solid #172554" : "3px solid transparent", transition: "all 0.15s" }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "#f8fafc" }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent" }}
            >
              <span style={{ fontSize: "0.85rem" }}>{link.icon}</span>
              <span style={{ fontSize: "0.875rem", fontWeight: active ? 600 : 400, color: active ? "#172554" : "#475569" }}>{link.label}</span>
            </Link>
          )
        })}
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
    </>
  )

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", display: "flex" }}>

      {/* Sidebar desktop */}
      <aside style={{ width: 240, flexShrink: 0, background: "#fff", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 40 }} className="hidden lg:flex dashboard-sidebar">
        <Sidebar />
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

        {/* Mobile sidebar drawer */}
        {sidebarOpen && (
          <>
            <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 45 }} />
            <aside style={{ position: "fixed", top: 0, left: 0, height: "100vh", width: 260, background: "#fff", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", zIndex: 50, overflowY: "auto" }}>
              <Sidebar onLinkClick={() => setSidebarOpen(false)} />
            </aside>
          </>
        )}

        {/* Content */}
        <main className="dashboard-content" style={{ padding: "32px 32px" }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .dashboard-sidebar { display: none !important; }
          .dashboard-main { margin-left: 0 !important; }
          .dashboard-content { padding: 16px !important; }
        }
      `}</style>
    </div>
  )
}