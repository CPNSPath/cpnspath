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
        <div className="hero-wrap" style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", alignItems: "stretch" }}>

          {/* LEFT */}
          <div className="hero-left" style={{ width: "50%", padding: "32px 40px 32px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 999, padding: "4px 12px", marginBottom: 12, width: "fit-content" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#3b82f6" }} />
              <span style={{ fontSize: 10, fontWeight: 600, color: "#1d4ed8" }}>Persiapan CPNS Terpercaya</span>
            </div>

            <h1 style={{ fontSize: "clamp(2rem, 3.2vw, 3rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.12, margin: "0 0 14px", letterSpacing: "-0.04em" }}>
              Raih Karir Impianmu<br />
              sebagai <span style={{ color: "#172554", borderBottom: "3px solid #fbbf24", paddingBottom: 2 }}>ASN</span> dengan<br />
              Persiapan Terbaik
            </h1>

            <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 6px", lineHeight: 1.65, maxWidth: 320 }}>Tryout SKD & SKB terstruktur, soal terverifikasi, analisis hasil mendalam.</p>
            <p style={{ fontSize: 10, color: "#94a3b8", margin: "0 0 16px", fontStyle: "italic" }}>"Perjalanan seribu langkah dimulai dari satu latihan."</p>

            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <Link href="/tryout/free-trial" style={{ background: "#172554", color: "white", padding: "10px 18px", borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 12px rgba(23,37,84,0.2)" }}>Mulai Free Trial →</Link>
              <Link href="/tryout/paket-to" style={{ background: "white", color: "#334155", padding: "10px 18px", borderRadius: 8, fontSize: 12, fontWeight: 500, border: "1px solid #e2e8f0", textDecoration: "none" }}>Lihat Paket TO</Link>
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
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
          <div className="hero-divider" style={{ width: 1, background: "linear-gradient(to bottom, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent)", margin: "0", flexShrink: 0, position: "relative" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 28, height: 28, borderRadius: "50%", background: "white", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v12M2 8h12" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* RIGHT */}
<div className="hero-right" style={{ flex: 1, padding: "40px 32px 32px 24px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 10 }}>

  {/* Header */}
  <div style={{ textAlign: "center" }}>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "white", border: "1px solid #e0e7ff", borderRadius: 999, padding: "4px 12px", marginBottom: 6 }}>
      <span style={{ fontSize: 9, fontWeight: 600, color: "#6366f1" }}>🏛️ Instansi Tujuan Populer</span>
    </div>
    <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>Raih posisi di instansi impianmu</div>
    <div style={{ fontSize: 9, color: "#94a3b8", marginTop: 2 }}>Instansi paling banyak dituju peserta CPNS Path</div>
  </div>

  {/* Kementerian */}
  <div style={{ background: "white", border: "1px solid #dbeafe", borderRadius: 10, padding: "10px 12px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#172554" }} />
      <span style={{ fontSize: 8, fontWeight: 700, color: "#172554", textTransform: "uppercase", letterSpacing: "0.08em" }}>Kementerian Favorit</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5 }}>
      {[
        { abbr: "KEM\nKEU", name: "Keuangan", rank: 1, color: "#172554", bg: "#eff6ff" },
        { abbr: "KEM\nHUK", name: "Kumham", rank: 2, color: "#172554", bg: "#eff6ff" },
        { abbr: "KEM\nKES", name: "Kesehatan", rank: 3, color: "#172554", bg: "#eff6ff" },
        { abbr: "KEM\nDIK", name: "Dikbud", rank: 4, color: "#172554", bg: "#eff6ff" },
        { abbr: "KEM\nPU", name: "PUPR", rank: 5, color: "#172554", bg: "#eff6ff" },
        { abbr: "KEM\nDAG", name: "Dagri", rank: 6, color: "#172554", bg: "#eff6ff" },
        { abbr: "KEM\nPAN", name: "PAN RB", rank: 7, color: "#172554", bg: "#eff6ff" },
        { abbr: "KEM\nBUMN", name: "BUMN", rank: 8, color: "#172554", bg: "#eff6ff" },
      ].map(item => (
        <div key={item.name} style={{ background: item.bg, border: "1px solid #bfdbfe", borderRadius: 8, padding: "7px 4px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, position: "relative" }}>
          <div style={{ position: "absolute", top: 3, left: 5, fontSize: 7, fontWeight: 800, color: "#93c5fd" }}>#{item.rank}</div>
          <div style={{ fontSize: 10, fontWeight: 800, color: item.color, textAlign: "center", lineHeight: 1.2, whiteSpace: "pre-line", marginTop: 6 }}>{item.abbr}</div>
          <span style={{ fontSize: 6.5, color: "#64748b", textAlign: "center", lineHeight: 1.3 }}>{item.name}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Lembaga Independen */}
  <div style={{ background: "white", border: "1px solid #ede9fe", borderRadius: 10, padding: "10px 12px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1" }} />
      <span style={{ fontSize: 8, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.08em" }}>Lembaga Independen</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5 }}>
      {[
        { abbr: "BPS", name: "Statistik", rank: 1, bg: "#f5f3ff" },
        { abbr: "BKN", name: "Kepegawaian", rank: 2, bg: "#f5f3ff" },
        { abbr: "KPK", name: "Anti Korupsi", rank: 3, bg: "#f5f3ff" },
        { abbr: "OJK", name: "Jasa Keuangan", rank: 4, bg: "#f5f3ff" },
        { abbr: "BPKP", name: "Pengawasan", rank: 5, bg: "#f5f3ff" },
        { abbr: "BPK", name: "Pemeriksa Keu.", rank: 6, bg: "#f5f3ff" },
        { abbr: "ANRI", name: "Arsip Nasional", rank: 7, bg: "#f5f3ff" },
        { abbr: "LAN", name: "Adm. Negara", rank: 8, bg: "#f5f3ff" },
      ].map(item => (
        <div key={item.abbr} style={{ background: item.bg, border: "1px solid #ddd6fe", borderRadius: 8, padding: "7px 4px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, position: "relative" }}>
          <div style={{ position: "absolute", top: 3, left: 5, fontSize: 7, fontWeight: 800, color: "#c4b5fd" }}>#{item.rank}</div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#4f46e5", textAlign: "center", lineHeight: 1.2, marginTop: 6 }}>{item.abbr}</div>
          <span style={{ fontSize: 6.5, color: "#64748b", textAlign: "center", lineHeight: 1.3 }}>{item.name}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Pemda */}
  <div style={{ background: "white", border: "1px solid #bbf7d0", borderRadius: 10, padding: "10px 12px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a" }} />
      <span style={{ fontSize: 8, fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.08em" }}>Pemerintah Daerah Favorit</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5 }}>
      {[
        { abbr: "DKI", name: "Jakarta", rank: 1, bg: "#f0fdf4" },
        { abbr: "JBR", name: "Jawa Barat", rank: 2, bg: "#f0fdf4" },
        { abbr: "JTG", name: "Jawa Tengah", rank: 3, bg: "#f0fdf4" },
        { abbr: "JTM", name: "Jawa Timur", rank: 4, bg: "#f0fdf4" },
        { abbr: "SBY", name: "Kota Surabaya", rank: 5, bg: "#f0fdf4" },
        { abbr: "BDG", name: "Kota Bandung", rank: 6, bg: "#f0fdf4" },
      ].map(item => (
        <div key={item.abbr} style={{ background: item.bg, border: "1px solid #86efac", borderRadius: 8, padding: "7px 4px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, position: "relative" }}>
          <div style={{ position: "absolute", top: 3, left: 5, fontSize: 7, fontWeight: 800, color: "#86efac" }}>#{item.rank}</div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", textAlign: "center", lineHeight: 1.2, marginTop: 6 }}>{item.abbr}</div>
          <span style={{ fontSize: 6.5, color: "#64748b", textAlign: "center", lineHeight: 1.3 }}>{item.name}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Tagline */}
  <div style={{ background: "#172554", borderRadius: 8, padding: "10px 14px", textAlign: "center" }}>
    <div style={{ fontSize: 11, fontWeight: 700, color: "#fbbf24", marginBottom: 2 }}>500+ Instansi membuka formasi CPNS</div>
    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Persiapkan dirimu sekarang — sebelum terlambat</div>
  </div>

</div>
{/* END RIGHT */}

        </div>
        {/* END Hero content */}

      </div>
      {/* END HALAMAN 1 */}

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
  <div style={{ position: "absolute", top: -80, right: -60, width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.09) 0%, transparent 70%)" }} />
  <div style={{ position: "absolute", bottom: -60, left: -40, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />
  <div style={{ position: "absolute", top: "40%", right: "20%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)" }} />

  <div style={{ position: "relative", zIndex: 1, flex: 1, padding: "64px 48px 56px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>

    {/* Header */}
    <div style={{ textAlign: "center", marginBottom: 8 }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "white", border: "1px solid #e0e7ff", borderRadius: 999, padding: "5px 16px", marginBottom: 14, boxShadow: "0 2px 8px rgba(99,102,241,0.08)" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#6366f1" }}>✦ Kenapa CPNS Path?</span>
      </div>
      <h2 style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 10 }}>
        Bukan sekadar latihan soal.<br />
        <span style={{ color: "#6366f1" }}>Ini sistem persiapan yang terarah.</span>
      </h2>
      <p style={{ fontSize: 14, color: "#64748b", maxWidth: 480, margin: "0 auto", lineHeight: 1.65 }}>
        Dirancang khusus untuk kamu yang serius lolos — bukan yang sekadar mencoba.
      </p>
    </div>

    {/* Feature Cards 2x2 */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {[
        {
          icon: "📝", title: "100 Paket TO Lengkap",
          desc: "SKD & SKB terstruktur per sesi. Bukan soal acak — setiap paket dirancang mengikuti pola ujian resmi CPNS.",
          badge: "SKD + SKB",
          bg: "linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)", border: "#bfdbfe",
          iconBg: "#dbeafe", titleColor: "#1e40af", descColor: "#3b82f6", badgeBg: "#1e40af", cornerBg: "rgba(59,130,246,0.12)"
        },
        {
          icon: "⚡", title: "Hasil & Analisis Instan",
          desc: "Langsung tahu skor TWK, TIU, TKP setelah submit. Tahu di mana lemahmu — bukan hanya berapa nilaimu.",
          badge: "Real-time",
          bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)", border: "#fde68a",
          iconBg: "#fef9c3", titleColor: "#92400e", descColor: "#b45309", badgeBg: "#d97706", cornerBg: "rgba(245,158,11,0.12)"
        },
        {
          icon: "🏆", title: "Leaderboard Nasional",
          desc: "Bandingkan posisimu dengan peserta dari seluruh Indonesia. Kompetisi nyata = motivasi nyata.",
          badge: "Ranking Nasional",
          bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", border: "#bbf7d0",
          iconBg: "#d1fae5", titleColor: "#14532d", descColor: "#16a34a", badgeBg: "#16a34a", cornerBg: "rgba(34,197,94,0.12)"
        },
        {
          icon: "📚", title: "Ebook Panduan Gratis",
          desc: "Materi SKD & SKB dikurasi oleh tim yang paham pola soal. Gratis — karena ilmu seharusnya tidak jadi hambatan.",
          badge: "100% Gratis",
          bg: "linear-gradient(135deg, #fdf4ff 0%, #f3e8ff 100%)", border: "#e9d5ff",
          iconBg: "#ede9fe", titleColor: "#581c87", descColor: "#7c3aed", badgeBg: "#7c3aed", cornerBg: "rgba(139,92,246,0.12)"
        },
      ].map(item => (
        <div key={item.title} style={{ background: item.bg, border: `1.5px solid ${item.border}`, borderRadius: 14, padding: "22px 20px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: item.cornerBg }} />
          <div style={{ width: 44, height: 44, borderRadius: 12, background: item.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 14 }}>{item.icon}</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: item.titleColor, marginBottom: 6 }}>{item.title}</div>
          <div style={{ fontSize: 12, color: item.descColor, lineHeight: 1.6 }}>{item.desc}</div>
          <span style={{ display: "inline-block", marginTop: 10, fontSize: 10, fontWeight: 700, background: item.badgeBg, color: "#fff", padding: "3px 10px", borderRadius: 999 }}>{item.badge}</span>
        </div>
      ))}
    </div>

    {/* Quote */}
    <div style={{ background: "#172554", borderRadius: 16, padding: "28px 36px", display: "flex", alignItems: "center", gap: 32, position: "relative", overflow: "hidden" }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05 }} viewBox="0 0 800 120" preserveAspectRatio="xMidYMid slice">
        <defs><pattern id="qdots" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white" /></pattern></defs>
        <rect width="800" height="120" fill="url(#qdots)" />
      </svg>
      <div style={{ fontSize: 80, fontWeight: 900, color: "#fbbf24", lineHeight: 0.8, flexShrink: 0, fontFamily: "Georgia, serif", position: "relative", zIndex: 1 }}>"</div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)", fontWeight: 700, color: "#fff", lineHeight: 1.5, marginBottom: 8, letterSpacing: "-0.01em" }}>
          Orang yang <span style={{ color: "#fbbf24" }}>berlatih keras</span> setiap hari akan mengalahkan orang yang <span style={{ color: "#fbbf24" }}>berbakat</span> tapi bermalas-malasan.
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>— Prinsip yang dibuktikan oleh ribuan peserta yang lolos CPNS</div>
      </div>
    </div>

    {/* CTA */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <div style={{ background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", borderRadius: 14, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Mulai sekarang — gratis</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Free Trial SKD</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>TWK · TIU · TKP · Tidak perlu kartu kredit</div>
        </div>
        <Link href="/tryout/free-trial" style={{ background: "#fbbf24", color: "#78350f", padding: "10px 18px", borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>Coba Gratis →</Link>
      </div>
      <div style={{ background: "white", border: "1.5px solid #e0e7ff", borderRadius: 14, padding: "20px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Siap serius?</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>Lihat Semua Paket TO</div>
          <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.5 }}>100 paket SKD & SKB mulai Rp 15.000/TO. Bayar sesuai kebutuhan.</div>
        </div>
        <Link href="/price" style={{ background: "#172554", color: "#fff", padding: "9px 16px", borderRadius: 8, fontSize: 11, fontWeight: 700, textDecoration: "none", width: "fit-content", marginTop: 12 }}>Lihat Pricing →</Link>
      </div>
    </div>

  </div>
</div>
{/* END HALAMAN 2 */}

      <style>{`
        @media (max-width: 768px) {
          .hero-wrap { flex-direction: column !important; }
          .hero-left { width: 100% !important; padding: 28px 20px !important; }
          .hero-divider { display: none !important; }
          .hero-right { width: 100% !important; padding: 20px 20px 32px !important; }
        }
      `}</style>
    </div>
  )
}