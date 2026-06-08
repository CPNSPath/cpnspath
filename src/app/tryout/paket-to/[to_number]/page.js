"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import DashboardLayout from "@/components/DashboardLayout"

const BRIEFING_DATA = {
  title: "TO SKD",
  duration: "90 menit",
  totalSoal: 110,
  subtest: [
    { name: "TWK (Wawasan Kebangsaan)", soal: 30, passing: 65 },
    { name: "TIU (Intelegensia Umum)", soal: 35, passing: 80 },
    { name: "TKP (Karakteristik Pribadi)", soal: 45, passing: 166 },
  ],
  totalPassing: 285,
  peringatan: [
    "Gunakan koneksi internet stabil selama ujian berlangsung.",
    "Jangan menutup atau me-refresh halaman — ujian akan dianggap selesai.",
    "Waktu akan terus berjalan meskipun Anda menutup layar.",
    "Kerjakan dengan jujur untuk hasil evaluasi terbaik.",
  ],
}

export default function ToBriefingPage({ params }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const toNumber = resolvedParams.to_number

  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(null) // null | 'unpaid' | 'paid' | 'completed'

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push(`/login?redirect=/tryout/paket-to/${toNumber}`); return }

      // Cek status user untuk TO ini
      const { data: tryoutData } = await supabase
        .from("user_tryouts")
        .select("payment_status, exam_status")
        .eq("user_id", user.id)
        .eq("to_number", toNumber)
        .eq("package_slug", "skd")
        .maybeSingle()

      if (!tryoutData || tryoutData.payment_status !== "paid") {
        // Belum bayar → lempar ke halaman beli
        router.replace(`/tryout/paket-to/${toNumber}/beli`)
        return
      }

      if (tryoutData.exam_status === "completed") {
        // Udah selesai → lempar ke result
        router.replace(`/tryout/paket-to/${toNumber}/result`)
        return
      }

      // Sudah paid & belum selesai → tampilkan briefing
      setStatus("paid")
      setLoading(false)
    }
    init()
  }, [])

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ textAlign: "center", padding: 80, color: "#64748b" }}>Memeriksa akses...</div>
      </DashboardLayout>
    )
  }

  if (status !== "paid") return null // redirect sedang berlangsung

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>
            📋 {BRIEFING_DATA.title} #{toNumber}
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
            Silakan baca petunjuk dengan saksama sebelum memulai ujian.
          </p>
        </div>

        {/* Card Briefing */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "24px", marginBottom: 20, boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: "0 0 16px" }}>📌 Informasi Ujian</h2>

          {/* Info ringkas */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Durasi", value: BRIEFING_DATA.duration },
              { label: "Total Soal", value: BRIEFING_DATA.totalSoal },
              { label: "Total Passing", value: BRIEFING_DATA.totalPassing },
            ].map((info) => (
              <div key={info.label} style={{ background: "#f8fafc", borderRadius: 10, padding: "12px", border: "1px solid #e2e8f0" }}>
                <p style={{ fontSize: "0.7rem", color: "#94a3b8", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{info.label}</p>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#172554", margin: 0 }}>{info.value}</p>
              </div>
            ))}
          </div>

          {/* Rincian Subtest */}
          <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#334155", margin: "0 0 10px" }}>Rincian Subtest & Passing Grade</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            {BRIEFING_DATA.subtest.map((sub) => (
              <div key={sub.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 8, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.85rem", color: "#334155" }}>{sub.name}</span>
                <div style={{ display: "flex", gap: 12, fontSize: "0.8rem", color: "#64748b" }}>
                  <span>{sub.soal} soal</span>
                  <span style={{ fontWeight: 700, color: "#172554" }}>PG {sub.passing}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Peringatan */}
          <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#dc2626", margin: "0 0 10px" }}>⚠️ Peringatan Penting</h3>
          <ul style={{ margin: "0 0 24px", paddingLeft: 20, fontSize: "0.8rem", color: "#475569", lineHeight: 1.7 }}>
            {BRIEFING_DATA.peringatan.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>

          {/* Tombol Mulai */}
          <button
            onClick={() => router.push(`/tryout/paket-to/${toNumber}/exam`)}
            style={{
              width: "100%",
              padding: "14px 24px",
              borderRadius: 12,
              border: "none",
              background: "#fbbf24",
              color: "#78350f",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#f59e0b"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#fbbf24"}
          >
            Saya Paham, Mulai Ujian
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}