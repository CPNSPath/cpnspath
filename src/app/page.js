"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import Navbar from "@/components/Navbar"

export default function Home() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.replace("/dashboard")
      } else {
        setChecking(false)
      }
    }
    checkUser()
  }, [])

  if (checking) {
    return <div style={{ minHeight: "100vh", background: "#fff" }} />
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ===== HALAMAN 1 ===== */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>

        {/* Background putih + dot pattern */}
        <div style={{ position: "absolute", inset: 0, background: "#ffffff" }} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#172554" opacity="0.08" />
            </pattern>
          </defs>
          <rect width="800" height="450" fill="url(#dots)" />
          <circle cx="680" cy="80" r="120" stroke="#172554" strokeWidth="0.6" fill="none" opacity="0.05" />
          <circle cx="680" cy="80" r="200" stroke="#172554" strokeWidth="0.6" fill="none" opacity="0.04" />
          <circle cx="680" cy="80" r="280" stroke="#fbbf24" strokeWidth="0.6" fill="none" opacity="0.06" />
          <circle cx="80" cy="400" r="100" stroke="#6366f1" strokeWidth="0.6" fill="none" opacity="0.05" />
          <circle cx="80" cy="400" r="160" stroke="#6366f1" strokeWidth="0.6" fill="none" opacity="0.04" />
        </svg>

        {/* Soft color blobs */}
        <div style={{ position: "absolute", top: -80, right: -40, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -60, left: "35%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: 80, left: -40, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)" }} />

        <Navbar />

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", alignItems: "stretch" }}>

          {/* LEFT */}
          <div style={{ width: "50%", padding: "40px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 999, padding: "4px 12px", marginBottom: 16, width: "fit-content" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#3b82f6" }} />
              <span style={{ fontSize: 10, fontWeight: 600, color: "#1d4ed8" }}>Persiapan CPNS Terpercaya</span>
            </div>

            <h1 style={{ fontSize: "clamp(2.4rem, 3.8vw, 3.4rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.15, margin: "0 0 16px", letterSpacing: "-0.04em" }}>
              Raih Karir<br />
              Impianmu<br />
              sebagai <span style={{ color: "#172554", borderBottom: "3px solid #fbbf24", paddingBottom: 2 }}>ASN</span><br />
              dengan<br />
              Persiapan<br />
              Terbaik
            </h1>

            <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 8px", lineHeight: 1.7, maxWidth: 300 }}>Tryout SKD & SKB terstruktur, soal terverifikasi, analisis hasil mendalam.</p>
            <p style={{ fontSize: 10, color: "#94a3b8", margin: "0 0 20px", fontStyle: "italic" }}>"Perjalanan seribu langkah dimulai dari satu latihan."</p>

            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <Link href="/tryout/free-trial" style={{ background: "#172554", color: "white", padding: "10px 18px", borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 12px rgba(23,37,84,0.2)" }}>Mulai Free Trial →</Link>
              <Link href="/tryout/paket-to" style={{ background: "white", color: "#334155", padding: "10px 18px", borderRadius: 8, fontSize: 12, fontWeight: 500, border: "1px solid #e2e8f0", textDecoration: "none" }}>Lihat Paket TO</Link>
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              {["Soal terverifikasi", "Free trial gratis", "Analisis lengkap"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#22c55e" strokeWidth="1.2"/><polyline points="4,7 6,9 10,5" stroke="#22c55e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontSize: 10, color: "#94a3b8" }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 0, border: "1px solid #e2e8f0", borderRadius: 10, overflow: "hidden", background: "white", width: "fit-content" }}>
              {[{ val: "100", label: "Paket TO", color: "#172554" }, { val: "SKD+SKB", label: "Tersedia", color: "#6366f1" }, { val: "Free", label: "Trial", color: "#22c55e" }].map((s, i) => (
                <div key={s.label} style={{ padding: "8px 16px", textAlign: "center", borderRight: i < 2 ? "1px solid #e2e8f0" : "none" }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 8, color: "#94a3b8", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* DIVIDER */}
          <div style={{ width: 1, background: "linear-gradient(to bottom, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent)", margin: "0", flexShrink: 0, position: "relative" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 28, height: 28, borderRadius: "50%", background: "white", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v12M2 8h12" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ flex: 1, padding: "40px 48px 40px 32px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>

            {/* Feature pills */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 8 }}>
              {[
                { icon: "🏆", label: "Leaderboard Nasional", desc: "Lihat posisi rankingmu secara real-time", bg: "#eff6ff", border: "#bfdbfe", color: "#1d4ed8" },
                { icon: "📊", label: "Analisis Hasil Detail", desc: "Rincian skor TWK, TIU, TKP tiap tryout", bg: "#f0fdf4", border: "#bbf7d0", color: "#16a34a" },
                { icon: "⚡", label: "Hasil Instan", desc: "Langsung tahu skor setelah submit ujian", bg: "#fdf4ff", border: "#e9d5ff", color: "#7c3aed" },
              ].map(p => (
                <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 12, background: p.bg, border: `1px solid ${p.border}`, borderRadius: 12, padding: "10px 14px" }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{p.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: p.color }}>{p.label}</div>
                    <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 1 }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* SKD + SKB */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ background: "white", border: "1.5px solid #e0e7ff", borderRadius: 12, padding: 14, boxShadow: "0 2px 8px rgba(99,102,241,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
                  <span style={{ fontSize: 13 }}>📋</span>
                  <span style={{ fontSize: 8, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.1em" }}>Passing Grade SKD</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[{ label: "TWK", val: "≥ 65", color: "#3b82f6" }, { label: "TIU", val: "≥ 80", color: "#8b5cf6" }, { label: "TKP", val: "≥ 166", color: "#22c55e" }].map((item, i) => (
                    <div key={item.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.color }} />
                          <span style={{ fontSize: 11, color: "#64748b" }}>{item.label}</span>
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 800, color: "#172554" }}>{item.val}</span>
                      </div>
                      {i < 2 && <div style={{ height: 0.5, background: "#f1f5f9", marginTop: 6 }} />}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "white", border: "1.5px solid #ede9fe", borderRadius: 12, padding: 14, boxShadow: "0 2px 8px rgba(124,58,237,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                  <span style={{ fontSize: 13 }}>🎯</span>
                  <span style={{ fontSize: 8, fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.1em" }}>Paket SKB</span>
                </div>
                <p style={{ fontSize: 10, color: "#64748b", margin: "0 0 8px", lineHeight: 1.5 }}>Sesuai formasi & bidang jabatan</p>
                <div style={{ background: "#f5f3ff", borderRadius: 6, padding: "5px 8px", textAlign: "center", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#7c3aed" }}>100 Tryout</span>
                </div>
                <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 6, padding: "5px 8px", textAlign: "center" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#b45309" }}>Rp 15.000 / TO</span>
                </div>
              </div>
            </div>

            {/* Free Trial */}
            <div style={{ background: "#172554", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05 }} viewBox="0 0 400 50" preserveAspectRatio="xMidYMid slice">
                <defs><pattern id="dotsft" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white" /></pattern></defs>
                <rect width="400" height="50" fill="url(#dotsft)" />
              </svg>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Free Trial SKD — Gratis</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#fbbf24" }}>TWK · TIU · TKP</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Tidak perlu kartu kredit</div>
              </div>
              <Link href="/tryout/free-trial" style={{ position: "relative", zIndex: 1, background: "#fbbf24", color: "#78350f", padding: "8px 14px", borderRadius: 7, fontSize: 11, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>Coba →</Link>
            </div>

            {/* Ebook */}
            <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>📚</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#166534" }}>Ebook Panduan SKD & SKB</div>
                  <div style={{ fontSize: 9, color: "#16a34a" }}>Download gratis sekarang</div>
                </div>
              </div>
              <Link href="/ebook" style={{ background: "#22c55e", color: "white", padding: "6px 12px", borderRadius: 6, fontSize: 10, fontWeight: 700, textDecoration: "none", flexShrink: 0 }}>↓ Download</Link>
            </div>

          </div>
        </div>
      </div>

      <div style={{ background: "white", padding: "16px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, position: "relative", zIndex: 10 }}>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #e2e8f0)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#e2e8f0" }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#cbd5e1" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#172554", opacity: 0.2 }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#cbd5e1" }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#e2e8f0" }} />
        </div>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #e2e8f0)" }} />
      </div>

      {/* ===== HALAMAN 2 ===== */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>

        <div style={{ position: "absolute", inset: 0, background: "#fafbff" }} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="dots2" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#6366f1" opacity="0.07" />
            </pattern>
          </defs>
          <rect width="800" height="450" fill="url(#dots2)" />
        </svg>
        <div style={{ position: "absolute", top: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)" }} />

        {/* Content halaman 2 */}
        <div style={{ position: "relative", zIndex: 1, flex: 1, padding: "80px 48px 0", display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>

          <div style={{ textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "white", border: "1px solid #e0e7ff", borderRadius: 999, padding: "4px 14px", marginBottom: 10, boxShadow: "0 2px 6px rgba(99,102,241,0.08)" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#6366f1" }}>Kenapa CPNS Path?</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>
              Platform Terlengkap untuk Lolos CPNS
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { icon: "📝", title: "100 Paket TO", desc: "SKD & SKB lengkap per tryout", border: "#e0e7ff", bg: "#eff6ff", shadow: "rgba(99,102,241,0.06)" },
              { icon: "⚡", title: "Analisis Instan", desc: "Hasil langsung setelah ujian", border: "#fde68a", bg: "#fffbeb", shadow: "rgba(251,191,36,0.06)" },
              { icon: "🏆", title: "Leaderboard", desc: "Ranking nasional real-time", border: "#bbf7d0", bg: "#f0fdf4", shadow: "rgba(34,197,94,0.06)" },
              { icon: "📚", title: "Ebook Gratis", desc: "Panduan SKD & SKB lengkap", border: "#e9d5ff", bg: "#faf5ff", shadow: "rgba(124,58,237,0.06)" },
            ].map(item => (
              <div key={item.title} style={{ background: "white", border: `1px solid ${item.border}`, borderRadius: 14, padding: "20px 18px", textAlign: "center", boxShadow: `0 2px 10px ${item.shadow}` }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: item.bg, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{item.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#172554", borderRadius: 16, padding: "22px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }} viewBox="0 0 600 80" preserveAspectRatio="xMidYMid slice">
              <defs><pattern id="dotsb" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white" /></pattern></defs>
              <rect width="600" height="80" fill="url(#dotsb)" />
            </svg>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 4 }}>Siap mulai perjalananmu?</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Daftar gratis dan coba free trial sekarang — tidak perlu kartu kredit</div>
            </div>
            <div style={{ display: "flex", gap: 12, position: "relative", zIndex: 1 }}>
              <Link href="/register" style={{ background: "#fbbf24", color: "#78350f", padding: "12px 24px", borderRadius: 9, fontSize: 13, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>Mulai Free Trial →</Link>
              <Link href="/price" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", padding: "12px 24px", borderRadius: 9, fontSize: 13, fontWeight: 500, border: "1px solid rgba(255,255,255,0.12)", textDecoration: "none", whiteSpace: "nowrap" }}>Lihat Pricing</Link>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
