"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import DashboardLayout from "@/components/DashboardLayout"
import { supabase } from "@/lib/supabase"

export default function TODetailPage() {
  const params = useParams()
  const router = useRouter()
  const toNumber = parseInt(params.to_number, 10)

  const [hasAccess, setHasAccess] = useState(false)
  const [examStatus, setExamStatus] = useState("not_started")
  const [loading, setLoading] = useState(true)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    if (isNaN(toNumber) || toNumber < 1 || toNumber > 100) {
      router.replace("/tryout/paket-to")
      return
    }
    async function checkAccess() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace(`/login?redirect=/tryout/paket-to/${toNumber}`)
        return
      }
      const { data } = await supabase
        .from("user_tryouts")
        .select("id, exam_status")
        .eq("user_id", session.user.id)
        .eq("to_number", toNumber)
        .eq("package_slug", "skd")
        .eq("payment_status", "paid")
        .maybeSingle()
      setHasAccess(!!data)
      if (data) setExamStatus(data.exam_status || "not_started")
      setLoading(false)
    }
    checkAccess()
  }, [])

  async function startExam() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    // Set status jadi in_progress sebelum redirect
    await supabase
      .from("user_tryouts")
      .update({ exam_status: "in_progress" })
      .eq("user_id", session.user.id)
      .eq("to_number", toNumber)
      .eq("package_slug", "skd")
    router.push(`/tryout/paket-to/${toNumber}/exam`)
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ textAlign: "center", padding: 80, color: "#64748b" }}>Memeriksa akses...</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>

      {/* Back link + header */}
      <div style={{ marginBottom: 24 }}>
        <Link href="/tryout/paket-to" style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 14px", borderRadius: 999, background: "#f1f5f9", color: "#475569", fontSize: "0.75rem", fontWeight: 500, marginBottom: 12, textDecoration: "none" }}>
          ← Kembali ke daftar TO
        </Link>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>TO SKD #{toNumber}</h1>
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Simulasi SKD CPNS — 110 soal dalam 1 sesi</p>
      </div>

      {/* Layout 2 kolom: card detail + perhatian penting */}
      <div className="to-detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>

        {/* Card detail TO */}
        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ background: "#0f1d3a", padding: "24px 20px", textAlign: "center" }}>
            <span style={{ fontSize: "2.5rem", display: "block", marginBottom: 6 }}>📋</span>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", margin: 0 }}>Simulasi CAT SKD CPNS</h2>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginTop: 4 }}>TO SKD #{toNumber}</p>
          </div>
          <div style={{ padding: "20px 24px" }}>

            <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Informasi Ujian</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
              <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px" }}>
                <p style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: 2 }}>⏱ Durasi</p>
                <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a" }}>90 menit</p>
              </div>
              <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px" }}>
                <p style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: 2 }}>📝 Total Soal</p>
                <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a" }}>110 soal</p>
              </div>
              <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px", gridColumn: "span 2" }}>
                <p style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: 2 }}>🏆 Passing Grade Total</p>
                <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a" }}>285</p>
              </div>
            </div>

            <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Materi Ujian</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              {[
                { label: "Tes Wawasan Kebangsaan (TWK)", soal: "30 soal", pg: "min. 65", color: "#3b82f6" },
                { label: "Tes Intelegensi Umum (TIU)", soal: "35 soal", pg: "min. 80", color: "#8b5cf6" },
                { label: "Tes Karakteristik Pribadi (TKP)", soal: "45 soal", pg: "min. 166", color: "#22c55e" },
              ].map(s => (
                <div key={s.label} style={{ background: s.color + "0d", border: `1px solid ${s.color}30`, borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: s.color, margin: 0 }}>{s.label}</p>
                    <p style={{ fontSize: "0.7rem", color: "#64748b", margin: 0 }}>Passing grade {s.pg}</p>
                  </div>
                  <span style={{ background: s.color, color: "#fff", borderRadius: 999, padding: "3px 10px", fontSize: "0.7rem", fontWeight: 700 }}>{s.soal}</span>
                </div>
              ))}
            </div>

            {hasAccess && examStatus === "completed" ? (
              <Link href={`/tryout/paket-to/${toNumber}/result`} style={{ display: "block", width: "100%", padding: "13px 20px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 700, textAlign: "center", textDecoration: "none", background: "#172554", color: "#fff" }}>
                Lihat Hasil Ujian →
              </Link>
            ) : hasAccess ? (
              <button onClick={() => setShowConfirm(true)} style={{ display: "block", width: "100%", padding: "13px 20px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 700, textAlign: "center", border: "none", background: "#16a34a", color: "#fff", cursor: "pointer" }}>
                ▶ Mulai Ujian Sekarang
              </button>
            ) : (
              <Link href={`/tryout/paket-to/${toNumber}/beli`} style={{ display: "block", width: "100%", padding: "13px 20px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 700, textAlign: "center", textDecoration: "none", background: "#172554", color: "#fff" }}>
                Beli TO #{toNumber} — Rp 15.000
              </Link>
            )}
          </div>
        </div>

        {/* Panel Perhatian Penting */}
        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ background: "#fbbf24", padding: "16px 20px" }}>
            <p style={{ fontSize: "1rem", fontWeight: 800, color: "#78350f", margin: 0 }}>⚠ Perhatian Penting</p>
          </div>
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "✓", text: "Pastikan koneksi internet stabil", color: "#16a34a" },
              { icon: "✓", text: "Siapkan alat tulis untuk coret-coretan", color: "#16a34a" },
              { icon: "✓", text: "Jawaban tersimpan otomatis", color: "#16a34a" },
              { icon: "✕", text: "Jangan refresh atau tutup browser — jika dilakukan, ujian otomatis selesai dan dianggap submit", color: "#dc2626" },
              { icon: "✕", text: "Ujian hanya dapat dikerjakan 1 kali", color: "#dc2626" },
              { icon: "⏱", text: "Waktu akan berjalan otomatis setelah mulai", color: "#ca8a04" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ color: item.color, fontWeight: 800, fontSize: "0.9rem", flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                <p style={{ fontSize: "0.8rem", color: "#334155", margin: 0, lineHeight: 1.5 }}>{item.text}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: "12px 20px", borderTop: "1px solid #f1f5f9", background: "#f8fafc" }}>
            <p style={{ fontSize: "0.72rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
              <strong style={{ color: "#0f172a" }}>Bobot Nilai:</strong> TWK & TIU benar +5, salah/kosong 0. TKP setiap jawaban bernilai 1–5, kosong 0.
            </p>
          </div>
        </div>

      </div>

      {/* Navigation prev/next TO */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, maxWidth: 1000 }}>
        {toNumber > 1 ? (
          <Link href={`/tryout/paket-to/${toNumber - 1}`} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: "0.8rem", color: "#64748b", textDecoration: "none" }}>
            ← TO #{toNumber - 1}
          </Link>
        ) : <div />}
        {toNumber < 100 && (
          <Link href={`/tryout/paket-to/${toNumber + 1}`} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: "0.8rem", color: "#64748b", textDecoration: "none" }}>
            TO #{toNumber + 1} →
          </Link>
        )}
      </div>

      {/* Modal Konfirmasi Mulai */}
      {showConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, maxWidth: 460, width: "100%", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: "1rem", fontWeight: 800, color: "#dc2626", margin: 0 }}>⚠ Konfirmasi Mulai Ujian</p>
              <button onClick={() => setShowConfirm(false)} style={{ background: "none", border: "none", fontSize: "1.25rem", color: "#94a3b8", cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Apakah Anda yakin ingin memulai ujian?</p>
              <p style={{ fontSize: "0.85rem", color: "#475569", marginBottom: 6 }}>Setelah memulai ujian:</p>
              <ul style={{ margin: 0, paddingLeft: 20, color: "#475569", fontSize: "0.82rem", lineHeight: 1.7 }}>
                <li>Timer 90 menit berjalan otomatis</li>
                <li>Tidak dapat dijeda atau diulang</li>
                <li>Jika refresh/close browser, ujian otomatis selesai dan dianggap submit</li>
                <li>Pastikan koneksi internet stabil</li>
              </ul>
            </div>
            <div style={{ padding: "14px 24px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "flex-end", gap: 10, background: "#f8fafc" }}>
              <button onClick={() => setShowConfirm(false)} style={{ padding: "9px 18px", borderRadius: 8, border: "1px solid #e2e8f0", background: "#fff", color: "#475569", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>
                ✕ Batal
              </button>
              <button onClick={startExam} style={{ padding: "9px 18px", borderRadius: 8, border: "none", background: "#16a34a", color: "#fff", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}>
                ▶ Ya, Mulai Ujian
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .to-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </DashboardLayout>
  )
}