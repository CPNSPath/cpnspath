"use client"

import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter, usePathname } from "next/navigation"
import Button from "@/components/ui/Button"
import { HelpCircle, User, ShoppingBag, ChevronDown } from "lucide-react"

const TRYOUT_ITEMS = [
  { label: "Free Trial",  href: "/tryout/free-trial",  desc: "3 subtest gratis — TWK, TIU, TKP" },
  { label: "Paket TO",    href: "/price",    desc: "100 TO SKD & SKB — akses penuh" },
]

const OTHER_NAV_LINKS = [
  { label: "Ebook", href: "/ebook" },
  { label: "Pricing", href: "/price" },
]

const USER_LINKS = [
  { label: "Dashboard",   href: "/dashboard" },
  { label: "My Packages", href: "#" },
  { label: "Settings",    href: "#" },
]

function getInitial(email) {
  if (!email) return "U"
  return email[0].toUpperCase()
}

export default function Navbar({ transparent = false }) {
  const [user, setUser]                   = useState(null)
  const [loading, setLoading]             = useState(true)
  const [drawerOpen, setDrawerOpen]       = useState(false)
  const [dropdownOpen, setDropdownOpen]   = useState(false)
  const [tryoutOpen, setTryoutOpen]       = useState(false)
  const [tryoutMobileOpen, setTryoutMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled]       = useState(false)

  const router       = useRouter()
  const pathname     = usePathname()
  const dropdownRef  = useRef(null)
  const tryoutRef    = useRef(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auth listener
  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await supabase.auth.getUser()
        setUser(data?.user ?? null)
      } catch (err) {
        console.error("Navbar auth error:", err)
      } finally {
        setLoading(false)
      }
    }
    getUser()
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })
    return () => { listener?.subscription?.unsubscribe() }
  }, [])

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false)
      if (tryoutRef.current && !tryoutRef.current.contains(e.target)) setTryoutOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [drawerOpen])

  // Esc key closes drawer
  useEffect(() => {
    if (!drawerOpen) return
    function handleKeyDown(e) {
      if (e.key === "Escape") setDrawerOpen(false)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [drawerOpen])

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setDropdownOpen(false)
      setDrawerOpen(false)
      router.push("/")
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  // ── User dropdown panel ────────────────────────────────────────────────────
  const UserDropdown = () => (
    <div style={{
      position: "absolute", right: 0, top: "calc(100% + 8px)",
      width: 240, background: "#1e293b",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 14, overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0,0,0,0.4)", zIndex: 50
    }}>
      {/* Caret */}
      <div style={{ position: "absolute", top: -5, right: 14, width: 10, height: 10, background: "#1e293b", borderLeft: "1px solid rgba(255,255,255,0.1)", borderTop: "1px solid rgba(255,255,255,0.1)", transform: "rotate(45deg)" }} />

      {/* User info */}
      <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fbbf24", color: "#78350f", fontWeight: 800, fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {getInitial(user?.email)}
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#f1f5f9", margin: 0, truncate: true, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {user?.email?.split("@")[0]}
          </p>
          <p style={{ fontSize: "0.72rem", color: "#64748b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {user?.email}
          </p>
        </div>
      </div>

      {/* Links */}
      <div style={{ padding: "6px 0" }}>
        {[
          { label: "Dashboard", href: "/dashboard", icon: "▦" },
          { label: "My Packages", href: "#", icon: "◈" },
          { label: "Settings", href: "#", icon: "⚙" },
        ].map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setDropdownOpen(false)}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 16px", textDecoration: "none", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <span style={{ fontSize: "0.8rem", color: "#64748b", width: 16, textAlign: "center" }}>{link.icon}</span>
            <span style={{ fontSize: "0.875rem", color: "#cbd5e1", fontWeight: 400 }}>{link.label}</span>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "6px 0" }}>
        <button
          onClick={logout}
          style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 16px", background: "none", border: "none", cursor: "pointer", transition: "background 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(220,38,38,0.1)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <span style={{ fontSize: "0.8rem", color: "#ef4444", width: 16, textAlign: "center" }}>⏻</span>
          <span style={{ fontSize: "0.875rem", color: "#ef4444", fontWeight: 500 }}>Logout</span>
        </button>
      </div>
    </div>
  )

const TryoutDropdown = () => (
  <div
    style={{
      position: "absolute",
      top: "calc(100% + 12px)",
      left: "50%",
      transform: "translateX(-50%)",
      width: "288px",
      background: "#1e293b",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "12px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
      zIndex: 60,
      overflow: "hidden",
    }}
  >
    <div style={{ position: "absolute", top: "-5px", left: "50%", transform: "translateX(-50%) rotate(45deg)", width: "10px", height: "10px", background: "#1e293b", borderLeft: "1px solid rgba(255,255,255,0.1)", borderTop: "1px solid rgba(255,255,255,0.1)" }} />
    <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 500, color: "#475569" }}>
      Menu Tryout
    </div>
    {TRYOUT_ITEMS.map((item, i) => (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setTryoutOpen(false)}
        className="flex items-center gap-3 px-4 py-3.5 transition-colors"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", textDecoration: "none" }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {i === 0 ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#f1f5f9", margin: 0 }}>{item.label}</p>
          <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.desc}</p>
        </div>
        <span style={i === 0
          ? { fontSize: "0.65rem", fontWeight: 500, padding: "3px 10px", borderRadius: 999, background: "rgba(34,197,94,0.15)", color: "#4ade80", flexShrink: 0 }
          : { fontSize: "0.65rem", fontWeight: 500, padding: "3px 10px", borderRadius: 999, background: "rgba(251,191,36,0.15)", color: "#fbbf24", flexShrink: 0 }
        }>
          {i === 0 ? "GRATIS" : "PREMIUM"}
        </span>
      </Link>
    ))}
  </div>
)

  // ── Mobile drawer ──────────────────────────────────────────────────────────
  const MobileDrawer = () => (
    <>
      <div
        style={{ position: "fixed", inset: 0, zIndex: 40, backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
        onClick={() => setDrawerOpen(false)}
      />
      <div style={{ position: "fixed", top: 0, right: 0, height: "100vh", width: "min(300px, 85vw)", zIndex: 50, background: "#0f172a", display: "flex", flexDirection: "column", boxShadow: "-8px 0 32px rgba(0,0,0,0.4)" }}>

        {/* Header */}
        <div style={{ padding: "0 20px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fbbf24" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
          </div>
          <button onClick={() => setDrawerOpen(false)} style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* User info jika login */}
        {user && (
          <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#fbbf24", color: "#78350f", fontWeight: 800, fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {getInitial(user.email)}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f1f5f9", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email?.split("@")[0]}</p>
              <p style={{ fontSize: "0.72rem", color: "#64748b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</p>
            </div>
          </div>
        )}

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "12px 12px", overflowY: "auto" }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.12em", padding: "4px 8px 8px" }}>Menu</p>

          {/* Tryout expandable */}
          <button onClick={() => setTryoutMobileOpen(v => !v)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 8, background: "none", border: "none", cursor: "pointer", marginBottom: 2 }}>
            <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#cbd5e1" }}>Tryout</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ transform: tryoutMobileOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", color: "#64748b" }}><path d="M6 9l6 6 6-6" stroke="#64748b" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          {tryoutMobileOpen && (
            <div style={{ marginLeft: 12, marginBottom: 4, borderLeft: "2px solid rgba(255,255,255,0.08)", paddingLeft: 12 }}>
              {TRYOUT_ITEMS.map(item => (
                <Link key={item.href} href={item.href} onClick={() => setDrawerOpen(false)} style={{ display: "flex", flexDirection: "column", padding: "8px 10px", borderRadius: 8, textDecoration: "none", marginBottom: 2 }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#93c5fd" }}>{item.label}</span>
                  <span style={{ fontSize: "0.72rem", color: "#475569", marginTop: 1 }}>{item.desc}</span>
                </Link>
              ))}
            </div>
          )}

          {OTHER_NAV_LINKS.map(link => (
            <Link key={link.label} href={link.href} onClick={() => setDrawerOpen(false)} style={{ display: "flex", alignItems: "center", padding: "10px 12px", borderRadius: 8, textDecoration: "none", marginBottom: 2, color: "#cbd5e1", fontSize: "0.875rem", fontWeight: 500 }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {link.label}
            </Link>
          ))}

          {user && (
            <>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.12em", padding: "12px 8px 8px", marginTop: 8, borderTop: "1px solid rgba(255,255,255,0.06)" }}>Akun</p>
              {[{ label: "Dashboard", href: "/dashboard" }, { label: "My Packages", href: "#" }, { label: "Settings", href: "#" }].map(link => (
                <Link key={link.label} href={link.href} onClick={() => setDrawerOpen(false)} style={{ display: "flex", alignItems: "center", padding: "10px 12px", borderRadius: 8, textDecoration: "none", marginBottom: 2, color: "#cbd5e1", fontSize: "0.875rem", fontWeight: 500 }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {link.label}
                </Link>
              ))}
            </>
          )}
        </nav>

        {/* Bottom CTA */}
        <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.08)", flexShrink: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {!loading && !user && (
            <>
              <Link href="/login" onClick={() => setDrawerOpen(false)} style={{ display: "block", textAlign: "center", padding: "11px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none" }}>
                Sign In
              </Link>
              <Link href="/register" onClick={() => setDrawerOpen(false)} style={{ display: "block", textAlign: "center", padding: "11px", borderRadius: 10, background: "#fbbf24", color: "#78350f", fontSize: "0.875rem", fontWeight: 700, textDecoration: "none" }}>
                Get Started
              </Link>
            </>
          )}
          {!loading && user && (
            <button onClick={logout} style={{ width: "100%", padding: "11px", borderRadius: 10, background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.25)", color: "#ef4444", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}>
              Logout
            </button>
          )}
        </div>

      </div>
    </>
  )

  const isTransparent = transparent && !isScrolled

  const linkClass = `text-xs uppercase tracking-widest font-medium transition-colors duration-150 ${
    isTransparent ? "text-white hover:text-yellow-400" : "text-gray-300 hover:text-yellow-400"
  }`

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isTransparent ? "bg-transparent" : "bg-gray-900 border-b border-gray-800"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-14 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" style={{ marginLeft: "24px" }}>
            <svg width="140" height="36" viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="8" fill="#172554"/>
              <rect x="8" y="9" width="9" height="18" rx="2" fill="#fbbf24"/>
              <rect x="19" y="9" width="9" height="18" rx="2" fill="white" opacity="0.9"/>
              <line x1="18" y1="9" x2="18" y2="27" stroke="#172554" strokeWidth="1.5"/>
              <polyline points="21,17 23,20 28,14" fill="none" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="44" y="16" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="700" fill="white" letterSpacing="1.5">CPNS</text>
              <text x="44" y="29" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="400" fill="#fbbf24" letterSpacing="4">PATH</text>
            </svg>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6 ml-auto" style={{ marginRight: "24px" }}>
            {!loading && !user && (
              <>
                {/* Links */}
                <div ref={tryoutRef} className="relative">
                  <button
                    onClick={() => setTryoutOpen((v) => !v)}
                    aria-expanded={tryoutOpen}
                    className={`${linkClass} flex items-center gap-1`}
                  >
                    Tryout
                    <ChevronDown size={14} className={`transition-transform duration-200 ${tryoutOpen ? "rotate-180" : ""}`} />
                  </button>
                  {tryoutOpen && <TryoutDropdown />}
                </div>
                <Link href="/ebook" className={linkClass}>Ebook</Link>
                <Link href="/price" className={linkClass}>Pricing</Link>
                <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.2)" }} />
                <Link
                  href="/login"
                  style={{ border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "6px 16px", borderRadius: 7, fontSize: "0.75rem", fontWeight: 500, textDecoration: "none", background: "rgba(255,255,255,0.05)" }}
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  style={{ background: "#fbbf24", color: "#78350f", padding: "6px 16px", borderRadius: 7, fontSize: "0.75rem", fontWeight: 700, textDecoration: "none" }}
                >
                  Daftar
                </Link>
              </>
            )}

            {!loading && user && (
              <>
                <div ref={tryoutRef} className="relative">
                  <button
                    onClick={() => setTryoutOpen((v) => !v)}
                    aria-expanded={tryoutOpen}
                    className={`${linkClass} flex items-center gap-1`}
                  >
                    Tryout
                    <ChevronDown size={14} className={`transition-transform duration-200 ${tryoutOpen ? "rotate-180" : ""}`} />
                  </button>
                  {tryoutOpen && <TryoutDropdown />}
                </div>
                {OTHER_NAV_LINKS.map((link) => (
                  <Link key={link.label} href={link.href} className={linkClass}>{link.label}</Link>
                ))}
                <button aria-label="Help" className={`transition-colors duration-150 ${isTransparent ? "text-white hover:text-yellow-400" : "text-gray-300 hover:text-yellow-400"}`}>
                  <HelpCircle size={22} strokeWidth={1.5} />
                </button>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((v) => !v)}
                    aria-expanded={dropdownOpen}
                    aria-label="User menu"
                    className={`w-9 h-9 rounded-full font-bold text-sm flex items-center justify-center transition-colors ${isTransparent ? "bg-white/20 text-white hover:bg-white/30" : "bg-gray-700 text-white hover:bg-gray-600"}`}
                  >
                    {getInitial(user.email)}
                  </button>
                  {dropdownOpen && <UserDropdown />}
                </div>
                <Link href="/cart" aria-label="Cart" className={`transition-colors duration-150 ${isTransparent ? "text-white hover:text-yellow-400" : "text-gray-300 hover:text-yellow-400"}`}>
                  <ShoppingBag size={22} strokeWidth={1.5} />
                </Link>
              </>
            )}

            {loading && <div className="h-8 w-32 rounded bg-gray-700 animate-pulse" />}
          </div>

          {/* Hamburger mobile */}
          <button
            className={`lg:hidden flex items-center justify-center w-11 h-11 rounded-md transition-colors ${
              isTransparent ? "text-white" : "text-gray-300 hover:bg-gray-800"
            }`}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

        </div>
      </header>

      {drawerOpen && <MobileDrawer />}
    </>
  )
}
