"use client"

import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter, usePathname } from "next/navigation"
import Button from "@/components/ui/Button"
import { HelpCircle, User, ShoppingBag } from "lucide-react"

const NAV_LINKS = [
  { label: "Tryout",       href: "/tryout" },
  { label: "Leaderboard",  href: "#" },
  { label: "Pricing",      href: "#" },
  { label: "About",        href: "#" },
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
  const [user, setUser]               = useState(null)
  const [loading, setLoading]         = useState(true)
  const [drawerOpen, setDrawerOpen]   = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const router      = useRouter()
  const pathname    = usePathname()
  const dropdownRef = useRef(null)

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

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
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

  // ── Shared: User dropdown panel ────────────────────────────────────────────
  const UserDropdown = () => (
    <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg border border-[#E2E8F0] shadow-lg py-1 z-50">
      <div className="px-4 py-2 border-b border-[#E2E8F0]">
        <p className="text-xs text-[#64748B] truncate">{user?.email}</p>
      </div>
      {USER_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          onClick={() => setDropdownOpen(false)}
          className="block px-4 py-2 text-sm text-[#334155] hover:bg-[#F1F5F9] hover:text-[#1E3A8A] transition-colors"
        >
          {link.label}
        </Link>
      ))}
      <div className="border-t border-[#E2E8F0] mt-1">
        <button
          onClick={logout}
          className="w-full text-left px-4 py-2 text-sm text-[#DC2626] hover:bg-[#FEE2E2] transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )

  // ── Shared: Mobile drawer (identical in both modes) ────────────────────────
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
            {NAV_LINKS.map((link) => {
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
          {loading && (
            <div className="h-10 w-full rounded-md bg-[#E2E8F0] animate-pulse" />
          )}
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


  // ══════════════════════════════════════════════════════════════════════════
  // SINGLE FIXED HEADER (transparent/white sesuai prop)
  // ══════════════════════════════════════════════════════════════════════════
    // Transparan hanya jika prop transparent = true DAN belum discroll
  const isTransparent = transparent && !isScrolled

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
              className={`text-2xl lg:text-3xl font-bold tracking-tight transition-colors duration-300 ${
                isTransparent ? "text-white" : "text-white"
              }`}
              style={{ fontFamily: "var(--font-plus-jakarta, var(--font-poppins))" }}
            >
              CPNS Path
            </span>
          </Link>

          {/* Menu desktop */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-14 2xl:gap-20">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm uppercase tracking-widest font-medium transition-colors duration-150 ${
                  isTransparent
  ? "text-white hover:text-yellow-400"
  : "text-gray-300 hover:text-yellow-400"
                }`}
              >
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

