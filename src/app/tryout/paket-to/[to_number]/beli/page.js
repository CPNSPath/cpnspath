"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { supabase } from "@/lib/supabase"

export default function BeliTOPage({ params }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const toNumber = params.to_number

  async function handleBeli() {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push(`/login?redirect=/tryout/paket-to/${toNumber}/beli`); return }

      const { data: { session } } = await supabase.auth.getSession()

      const res = await fetch("/api/create-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ packageSlug: "skd", toNumber: parseInt(toNumber) }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat transaksi")
      }

      window.snap.pay(data.token, {
        onSuccess: () => router.push(`/tryout/paket-to/${toNumber}`),
        onPending: () => { alert("Pembayaran pending."); router.push(`/tryout/paket-to/${toNumber}`) },
        onError: (err) => { console.error(err); alert("Pembayaran gagal.") },
        onClose: () => {},
      })
    } catch (err) {
      console.error(err)
      alert(err.message || "Terjadi kesalahan.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <section style={{ background: "#172554", padding: "56px 24px", position: "relative", overflow: "hidden", marginTop: "72px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Link href={`/tryout/paket-to/${toNumber}`} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 14px", borderRadius: 999, background: "rgba(255,255,255,0.1)", color: "#93C5FD", fontSize: "0.75rem", fontWeight: 500, marginBottom: 12, textDecoration: "none" }}>
            ← Kembali ke TO #{toNumber}
          </Link>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 8 }}>Beli TO SKD #{toNumber}</h1>
          <p style={{ fontSize: "0.95rem", color: "#93C5FD" }}>Akses penuh TWK + TIU + TKP untuk tryout ini</p>
        </div>
      </section>

      <section style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", width: "100%", maxWidth: 400, border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ background: "#0f1d3a", padding: "24px 20px", textAlign: "center" }}>
            <span style={{ fontSize: "2.5rem", display: "block", marginBottom: 8 }}>📋</span>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", margin: 0 }}>TO SKD #{toNumber}</h2>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginTop: 4 }}>TWK + TIU + TKP</p>
          </div>
          <div style={{ padding: "24px" }}>
            <div style={{ textAlign: "center", marginBottom: 20, padding: "16px", background: "#f8fafc", borderRadius: 12 }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#0f172a" }}>Rp 15.000</div>
              <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: 4 }}>satu kali bayar</p>
            </div>
            <ul style={{ listStyle: "none", padding: 0, marginBottom: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              {["Akses TWK, TIU, TKP", "Pembahasan lengkap", "Akses selamanya", "Analisis hasil"].map(f => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.875rem", color: "#334155" }}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(34,197,94,0.12)", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={handleBeli}
              disabled={loading}
              style={{ width: "100%", padding: "13px 20px", borderRadius: 12, border: "none", background: loading ? "#94a3b8" : "#fbbf24", color: loading ? "#fff" : "#78350f", fontSize: "0.9rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s" }}
            >
              {loading ? "Memproses..." : `Beli TO #${toNumber} Sekarang`}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
