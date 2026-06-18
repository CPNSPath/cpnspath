"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import DashboardLayout from "@/components/DashboardLayout"
import { supabase } from "@/lib/supabase"

export default function TWKIntro() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [alreadyDone, setAlreadyDone] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    async function check() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.replace("/login?redirect=/tryout/twk"); return }
      const { data } = await supabase
        .from("results")
        .select("id")
        .eq("user_id", user.id)
        .eq("to_slug", "free-trial-twk")
        .maybeSingle()
      if (data) setAlreadyDone(true)
      setChecking(false)
    }
    check()
  }, [])

  function handleStart() {
    setShowConfirm(false)
    router.push("/tryout/twk/exam")
  }

  if (checking) {
    return (
      <DashboardLayout>
        <div style={{ textAlign: "center", padding: 80, color: "#64748b" }}>Memuat...</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <Link href="/tryout/free-trial" style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 14px", borderRadius: 999, background: "#f1f5f9", color: "#475569", fontSize: "0.75rem", fontWeight: 500, marginBottom: 16, textDecoration: "none" }}>
        ← Kembali ke Free Trial
      </Link>

      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Free Trial TWK</h1>
      <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: 24 }}>Tes Wawasan Kebangsaan</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Jumlah Soal", value: "35 Soal" },
          { label: "Durasi", value: "30 Menit" },
          { label: "Passing Grade", value: "65" },
          { label: "Tipe", value: "Multiple Choice" },
        ].map(item => (
          <div key={item.label} style={{ background: "#fff", borderRadius: 12, padding: "16px", textAlign: "center", border: "1px solid #e2e8f0" }}>
            <p style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</p>
            <p style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>{item.value}</p>
          </div>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "24px", marginBottom: 24 }}>
        <div style={{ background: "#fbbf24", borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#78350f" }}>⚠ Perhatian Penting</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { icon: "✅", text: "Pastikan koneksi internet stabil" },
            { icon: "✅", text: "Siapkan alat tulis untuk coret-coretan" },
            { icon: "✅", text: "Jawaban tersimpan otomatis" },
            { icon: "❌", text: "Jangan refresh atau tutup browser — jika dilakukan, ujian otomatis selesai dan dianggap submit" },
            { icon: "❌", text: "Ujian hanya dapat dikerjakan 1 kali" },
            { icon: "⏱", text: "Waktu akan berjalan otomatis setelah mulai" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ fontSize: "1rem", flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
              <p style={{ fontSize: "0.85rem", color: "#334155", lineHeight: 1.5 }}>{item.text}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: "10px 14px", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
          <p style={{ fontSize: "0.78rem", color: "#64748b" }}>
            <strong style={{ color: "#334155" }}>Bobot Nilai:</strong> Benar +5, salah/kosong 0. Passing grade: 65.
          </p>
        </div>
      </div>

      {alreadyDone ? (
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "24px", textAlign: "center" }}>
          <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 12, padding: "20px", marginBottom: 16 }}>
            <p style={{ fontSize: "1.5rem", marginBottom: 8 }}>✅</p>
            <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#16a34a", marginBottom: 4 }}>Sudah Dikerjakan</p>
            <p style={{ fontSize: "0.8rem", color: "#64748b" }}>Kamu sudah menyelesaikan Free Trial TWK</p>
          </div>
          <button onClick={() => router.push("/tryout/twk/result")}
            style={{ width: "100%", padding: "14px", borderRadius: 12, background: "#172554", color: "#fff", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", border: "none" }}
          >Lihat Hasil →</button>
        </div>
      ) : (
        <button onClick={() => setShowConfirm(true)}
          style={{ width: "100%", padding: "16px", borderRadius: 12, background: "#fbbf24", color: "#78350f", fontSize: "1rem", fontWeight: 700, cursor: "pointer", border: "none", transition: "background 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#f59e0b"}
          onMouseLeave={e => e.currentTarget.style.background = "#fbbf24"}
        >Mulai Ujian</button>
      )}

      {showConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={() => setShowConfirm(false)}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "28px", maxWidth: 400, width: "100%", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Konfirmasi Mulai Ujian</h3>
            <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, marginBottom: 20 }}>
              Setelah memulai, waktu 30 menit akan berjalan dan tidak bisa dijeda. Ujian hanya bisa dikerjakan 1 kali. Yakin ingin mulai?
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowConfirm(false)}
                style={{ flex: 1, padding: "12px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer" }}
              >Batal</button>
              <button onClick={handleStart}
                style={{ flex: 1, padding: "12px", borderRadius: 10, border: "none", background: "#172554", color: "#fff", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}
              >Ya, Mulai Ujian</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}