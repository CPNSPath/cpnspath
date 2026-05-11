"use client"

import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function FreeTrialSKB() {
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
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>Free Trial SKB</h1>
          <p style={{ fontSize: "0.95rem", color: "#93C5FD", lineHeight: 1.6 }}>Konten segera hadir — kami sedang menyiapkan soal SKB gratis untuk kamu</p>
        </div>
      </section>

      <section style={{ flex: 1, padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <span style={{ fontSize: "4rem", display: "block", marginBottom: 24 }}>🚧</span>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1e293b", marginBottom: 12 }}>Segera Hadir</h2>
          <p style={{ fontSize: "0.95rem", color: "#64748b", marginBottom: 32, lineHeight: 1.7 }}>Free Trial SKB sedang dalam pengembangan. Pantau terus untuk update terbaru!</p>
          <Link href="/tryout/free-trial">
            <button
              style={{ padding: "12px 28px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 600, border: "none", background: "#172554", color: "#fff", cursor: "pointer" }}
            >
              ← Kembali ke Free Trial
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
