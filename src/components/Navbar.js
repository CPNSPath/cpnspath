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
  { label: "Leaderboard", href: "/leaderboard/global" },
  { label: "Pricing",     href: "/price" },
  { label: "About",       href: "#" },
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
        style={{ position: "fixed", inset: 0, zIndex: 40, backgroundColor: "rgba(0,0,0,0.4)" }}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <div
        className="bg-white shadow-xl flex flex-col drawer-slide-in"
        style={{ position: "fixed", top: 0, right: 0, height: "100vh", width: "min(280px, 80vw)", zIndex: 50 }}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#E2E8F0] flex-shrink-0">
          <span
            className="text-lg font-bold text-[#1E3A8A]"
            style={{ fontFamily: "var(--font-plus-jakarta, var(--font-poppins))" }}
          >
            CPNS Path
          </span>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation menu"
            className="w-9 h-9 flex items-center justify-center rounded-md text-[#64748B] hover:bg-[#F1F5F9] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {user && (
          <div className="flex items-center gap-3 px-5 py-3 bg-[#EFF6FF] border-b border-[#DBEAFE] flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#DBEAFE] text-[#1E3A8A] font-bold text-sm flex items-center justify-center flex-shrink-0">
              {getInitial(user.email)}
            </div>
            <p className="text-sm text-[#334155] truncate">{user.email}</p>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto py-3">
          <div className="px-3 mb-1">
            <p className="px-2 py-1 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Menu</p>

            {/* Tryout expandable section */}
            <button
              onClick={() => setTryoutMobileOpen((v) => !v)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium text-[#334155] hover:bg-[#F1F5F9] hover:text-[#1E3A8A] transition-colors mb-0.5"
            >
              <span>Tryout</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${tryoutMobileOpen ? "rotate-180" : ""}`}
              />
            </button>
            {tryoutMobileOpen && (
              <div className="ml-3 mb-1 border-l-2 border-[#E2E8F0] pl-3">
                {TRYOUT_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className="flex flex-col px-3 py-2 rounded-md text-sm transition-colors hover:bg-[#F1F5F9] mb-0.5"
                  >
                    <span className="font-medium text-[#1E3A8A]">{item.label}</span>
                    <span className="text-xs text-[#64748B]">{item.desc}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Other links */}
            {OTHER_NAV_LINKS.map((link) => {
              const isActive = link.href !== "#" && pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  className={[
                    "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors mb-0.5",
                    isActive
                      ? "bg-[#EFF6FF] text-[#1E3A8A]"
                      : "text-[#334155] hover:bg-[#F1F5F9] hover:text-[#1E3A8A]",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {user && (
            <div className="px-3 pt-3 mt-1 border-t border-[#E2E8F0]">
              <p className="px-2 py-1 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Account</p>
              {USER_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-[#334155] hover:bg-[#F1F5F9] hover:text-[#1E3A8A] transition-colors mb-0.5"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </nav>

        <div className="px-5 py-4 border-t border-[#E2E8F0] flex-shrink-0">
          {loading && <div className="h-10 w-full rounded-md bg-[#E2E8F0] animate-pulse" />}
          {!loading && !user && (
            <div className="flex flex-col gap-2">
              <Link href="/login" onClick={() => setDrawerOpen(false)}>
                <Button variant="outline" size="sm" fullWidth>Sign In</Button>
              </Link>
              <Link href="/register" onClick={() => setDrawerOpen(false)}>
                <Button variant="primary" size="sm" fullWidth>Get Started</Button>
              </Link>
            </div>
          )}
          {!loading && user && (
            <Button variant="danger" size="sm" fullWidth onClick={logout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </>
  )

  const isTransparent = transparent && !isScrolled

  const linkClass = `text-sm uppercase tracking-widest font-medium transition-colors duration-150 ${
    isTransparent ? "text-white hover:text-yellow-400" : "text-gray-300 hover:text-yellow-400"
  }`

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isTransparent ? "bg-transparent" : "bg-gray-900 border-b border-gray-800"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" style={{ marginLeft: "24px" }}>
            <span
              className="text-2xl lg:text-3xl font-bold tracking-tight text-white"
              style={{ fontFamily: "var(--font-plus-jakarta, var(--font-poppins))" }}
            >
              CPNS Path
            </span>
          </Link>

          {/* Menu desktop */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-14 2xl:gap-20">

            {/* Tryout dropdown trigger */}
<div className="relative" ref={tryoutRef}>
  <button
    onClick={() => setTryoutOpen((v) => !v)}
    aria-expanded={tryoutOpen}
    className={`${linkClass} flex items-center gap-1`}
  >
    Tryout
    <ChevronDown
      size={14}
      className={`transition-transform duration-200 ${tryoutOpen ? "rotate-180" : ""}`}
    />
  </button>
  {tryoutOpen && <TryoutDropdown />}
</div>

            {/* Other nav links */}
            {OTHER_NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Icons desktop */}
          <div className="hidden lg:flex items-center gap-5 flex-shrink-0" style={{ marginRight: "24px" }}>
            <button
              aria-label="Help"
              className={`transition-colors duration-150 ${
                isTransparent ? "text-white hover:text-yellow-400" : "text-gray-300 hover:text-yellow-400"
              }`}
            >
              <HelpCircle size={24} strokeWidth={1.5} />
            </button>

            {!loading && !user && (
              <Link
                href="/login"
                aria-label="Account"
                className={`transition-colors duration-150 ${
                  isTransparent ? "text-white hover:text-yellow-400" : "text-gray-300 hover:text-yellow-400"
                }`}
              >
                <User size={24} strokeWidth={1.5} />
              </Link>
            )}

            {!loading && user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  aria-expanded={dropdownOpen}
                  aria-label="User menu"
                  className={`w-9 h-9 rounded-full font-bold text-sm flex items-center justify-center transition-colors ${
                    isTransparent
                      ? "bg-white/20 text-white hover:bg-white/30"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  {getInitial(user.email)}
                </button>
                {dropdownOpen && <UserDropdown />}
              </div>
            )}

            <Link
              href="/cart"
              aria-label="Cart"
              className={`transition-colors duration-150 ${
                isTransparent ? "text-white hover:text-yellow-400" : "text-gray-300 hover:text-yellow-400"
              }`}
            >
              <ShoppingBag size={24} strokeWidth={1.5} />
            </Link>
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
