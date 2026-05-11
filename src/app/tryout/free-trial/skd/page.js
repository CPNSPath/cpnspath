"use client"

import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const SUBTESTS = [
  {
    href: "/tryout/twk",
    code: "TWK",
    name: "Tes Wawasan Kebangsaan",
    soal: 35,
    durasi: "30 menit",
    passingGrade: "65",
    desc: "Pancasila, UUD 1945, NKRI, Bhineka Tunggal Ika",
  },
  {
    href: "/tryout/tiu",
    code: "TIU",
    name: "Tes Intelegensi Umum",
    soal: 30,
    durasi: "30 menit",
    passingGrade: "80",
    desc: "Verbal, numerik, figural & penalaran logis",
  },
  {
    href: "/tryout/tkp",
    code: "TKP",
    name: "Tes Karakteristik Pribadi",
    soal: 35,
    durasi: "30 menit",
    passingGrade: "166",
    desc: "Orientasi pelayanan, integritas & kerjasama tim",
  },
]

export default function FreeTrialSKD() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <section style={{ background: "#172554", padding: "56px 24px", position: "relative", overflow: "hidden", marginTop: "72px" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 160, height: 160, borderRadius: "50%", background: "rgba(251,191,36,0.05)" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Link href="/tryout/free-trial">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 14px", borderRadius: 999, background: "rgba(255,255,255,0.1)", color: "#93C5FD", fontSize: "0.75rem", fontWeight: 500, marginBottom: 12, cursor: "pointer" }}>
              ← Kembali ke Free Trial
            </span>
          </Link>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>Free Trial SKD</h1>
          <p style={{ fontSize: "0.95rem", color: "#93C5FD", lineHeight: 1.6 }}>Pilih subtest yang ingin kamu coba — TWK, TIU, atau TKP</p>
        </div>
      </section>

      <section style={{ flex: 1, padding: "48px 24px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28, justifyItems: "center", marginBottom: 48 }}>
            {SUBTESTS.map((s) => (
              <div
                key={s.code}
                style={{ background: "#fff", borderRadius: 20, overflow: "hidden", width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#fbbf24"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)" }}
              >
                <div style={{ background: "#0f1d3a", padding: "24px 20px 20px", textAlign: "center" }}>
                  <span style={{ fontSize: "2.25rem", display: "block", marginBottom: 6 }}>
                    {s.code === "TWK" ? (
                      <span style={{ fontSize: "1.75rem", fontWeight: 900, color: "#fff", letterSpacing: "-1px", display: "block", marginBottom: 6 }}>🏛️</span>
                    ) : s.code === "TIU" ? "🧠" : "🤝"}
                  </span>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>{s.code}</h2>
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{s.name}</p>
                </div>
                <div style={{ flex: 1, padding: "20px 24px 10px" }}>
                  <p style={{ fontSize: "0.85rem", color: "#475569", marginBottom: 16, lineHeight: 1.5 }}>{s.desc}</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { label: "Jumlah soal", value: `${s.soal} soal` },
                      { label: "Durasi", value: s.durasi },
                      { label: "Passing grade", value: s.passingGrade, isPassing: true },
                    ].map((item) => (
                      <li key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", padding: "6px 0", borderBottom: "1px dashed #e2e8f0" }}>
                        <span style={{ color: "#64748b", fontWeight: 500 }}>{item.label}</span>
                        {item.isPassing ? (
                          <span style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a", fontWeight: 700, padding: "2px 10px", borderRadius: 999 }}>{item.value}</span>
                        ) : (
                          <span style={{ color: "#1e293b", fontWeight: 600 }}>{item.value}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ padding: "8px 24px 24px" }}>
                  <Link href={s.href}>
                    <button
                      style={{ display: "block", width: "100%", padding: "13px 20px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 600, textAlign: "center", cursor: "pointer", border: "none", background: "#172554", color: "#fff", transition: "background 0.2s, transform 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#1e3a5f"; e.currentTarget.style.transform = "translateY(-1px)" }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#172554"; e.currentTarget.style.transform = "translateY(0)" }}
                    >
                      Mulai {s.code}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
