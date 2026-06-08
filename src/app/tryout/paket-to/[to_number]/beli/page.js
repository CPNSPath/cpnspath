"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import DashboardLayout from "@/components/DashboardLayout"
import { supabase } from "@/lib/supabase"

const FITUR_LIST = [
  "Akses penuh TWK, TIU, TKP",
  "Pembahasan lengkap tiap soal",
  "Akses selamanya tanpa kedaluwarsa",
  "Analisis skor & passing grade",
  "Ranking nasional real-time",
]

export default function BeliTOPage({ params }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const toNumber = resolvedParams.to_number

  const [loading, setLoading] = useState(false)
  const [snapToken, setSnapToken] = useState(null)
  const [paymentState, setPaymentState] = useState("idle")
  const [alreadyPaid, setAlreadyPaid] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)

  // Cek apakah user sudah paid untuk TO ini
  useEffect(() => {
    async function check() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setCheckingStatus(false)
        return
      }

      const { data } = await supabase
        .from("user_tryouts")
        .select("payment_status, exam_status")
        .eq("user_id", user.id)
        .eq("to_number", toNumber)
        .eq("package_slug", "skd")
        .maybeSingle()

      if (data?.payment_status === "paid" && data?.exam_status !== "completed") {
        setAlreadyPaid(true)
      }
      setCheckingStatus(false)
    }
    check()
  }, [])

  async function handleBeli() {
    setLoading(true)
    setPaymentState("loading")
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push(`/login?redirect=/tryout/paket-to/${toNumber}/beli`)
        return
      }
      const { data: { session } } = await supabase.auth.getSession()

      const res = await fetch("/api/create-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ packageSlug: "skd", toNumber: parseInt(toNumber, 10) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Gagal membuat transaksi")

      setSnapToken(data.token)
      openSnap(data.token)
    } catch (err) {
      console.error(err)
      alert(err.message || "Terjadi kesalahan.")
      setPaymentState("idle")
    } finally {
      setLoading(false)
    }
  }

  function openSnap(token) {
    if (!window.snap) {
      alert("Midtrans Snap belum siap, coba refresh halaman.")
      setPaymentState("idle")
      return
    }
    window.snap.pay(token, {
      onSuccess: () => router.push(`/tryout/paket-to/${toNumber}`),
      onPending: () => setPaymentState("pending"),
      onError: (err) => {
        console.error("Snap error:", err)
        alert("Pembayaran gagal. Silakan coba lagi.")
        setPaymentState("idle")
      },
      onClose: () => {
        if (paymentState !== "pending") setPaymentState("idle")
      },
    })
  }

  function handleResume() {
    if (!snapToken) return
    openSnap(snapToken)
  }

  return (
    <DashboardLayout>
      {/* Header section */}
      <div style={{ marginBottom: 28 }}>
        <Link
          href="/tryout/paket-to"
          style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            padding: "4px 14px", borderRadius: 999, background: "#f1f5f9",
            color: "#475569", fontSize: "0.75rem", fontWeight: 500,
            marginBottom: 16, textDecoration: "none",
          }}
        >
          ← Kembali ke Paket TO
        </Link>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>
          Checkout TO SKD #{toNumber}
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
          Selesaikan pembayaran untuk mengakses tryout
        </p>
      </div>

      {/* Layout dua kolom */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: 24,
          alignItems: "start",
        }}
        className="beli-grid"
      >
        {/* Kolom kiri — Fitur & Info */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #e2e8f0",
            padding: "28px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          {/* Strip header navy */}
          <div
            style={{
              margin: "-28px -28px 24px -28px",
              padding: "20px 28px",
              background: "linear-gradient(135deg, #172554 0%, #0f1d3a 100%)",
              borderRadius: "16px 16px 0 0",
            }}
          >
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", margin: 0 }}>
              TO SKD #{toNumber}
            </h2>
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", margin: "4px 0 0" }}>
              TWK · TIU · TKP — 110 soal, 90 menit
            </p>
          </div>

          {/* Daftar fitur */}
          <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#334155", marginBottom: 12 }}>
            Apa yang kamu dapatkan
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10 }}>
            {FITUR_LIST.map((f) => (
              <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.875rem", color: "#475569" }}>
                <span style={{ color: "#16a34a", fontWeight: 700, fontSize: "0.75rem", flexShrink: 0 }}>✓</span>
                {f}
              </li>
            ))}
          </ul>

          {/* Garis pemisah */}
          <div style={{ borderTop: "1px solid #e2e8f0", marginBottom: 16 }} />

          {/* Peringatan */}
          <div style={{ display: "flex", gap: 10, padding: "12px", borderRadius: 10, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>💡</span>
            <div>
              <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#334155", margin: "0 0 2px" }}>Pembayaran aman</p>
              <p style={{ fontSize: "0.72rem", color: "#94a3b8", margin: 0 }}>
                Transaksi diproses oleh Midtrans. Data pembayaranmu terenkripsi.
              </p>
            </div>
          </div>
        </div>

        {/* Kolom kanan — Card Pembayaran */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #e2e8f0",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            position: "sticky",
            top: 88,
          }}
        >
          <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#334155", margin: "0 0 16px" }}>
            Ringkasan Pembayaran
          </h3>

          {/* Harga */}
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              marginBottom: 16,
              borderRadius: 12,
              background: "linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)",
              border: "1px solid #dbeafe",
            }}
          >
            <div style={{ fontSize: "2.6rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>
              Rp 15.000
            </div>
            <p style={{ fontSize: "0.78rem", color: "#64748b", margin: "6px 0 0" }}>
              Sekali bayar · Akses selamanya
            </p>
          </div>

          {/* Tombol aksi */}
          {checkingStatus ? (
            <div style={{ textAlign: "center", padding: 20, color: "#94a3b8", fontSize: "0.85rem" }}>
              Memeriksa status...
            </div>
          ) : alreadyPaid ? (
            <button
              onClick={() => router.push(`/tryout/paket-to/${toNumber}`)}
              style={{
                width: "100%", padding: "14px", borderRadius: 12, border: "none",
                background: "#16a34a", color: "#fff",
                fontSize: "1rem", fontWeight: 700, cursor: "pointer",
                boxShadow: "0 4px 14px rgba(22,163,74,0.3)",
                transition: "all 0.2s",
              }}
            >
              ✅ Sudah Dibeli — Lanjut ke Ujian
            </button>
          ) : paymentState === "pending" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  padding: "12px", borderRadius: 10,
                  background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.4)",
                  fontSize: "0.82rem", color: "#b45309", textAlign: "center",
                }}
              >
                ⏳ Menunggu pembayaran
              </div>
              <button
                onClick={handleResume}
                style={{
                  width: "100%", padding: "13px", borderRadius: 12, border: "none",
                  background: "#fbbf24", color: "#78350f",
                  fontSize: "0.9rem", fontWeight: 700, cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(251,191,36,0.3)",
                }}
              >
                Lanjutkan Pembayaran
              </button>
              <button
                onClick={() => { setSnapToken(null); setPaymentState("idle") }}
                style={{
                  width: "100%", padding: "10px", borderRadius: 12,
                  border: "1px solid #e2e8f0", background: "#fff",
                  color: "#64748b", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
                }}
              >
                Batalkan
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={handleBeli}
                disabled={loading}
                style={{
                  width: "100%", padding: "14px", borderRadius: 12, border: "none",
                  background: loading ? "#cbd5e1" : "#fbbf24",
                  color: loading ? "#fff" : "#78350f",
                  fontSize: "1rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: loading ? "none" : "0 4px 14px rgba(251,191,36,0.35)",
                  transition: "all 0.2s",
                }}
              >
                {loading ? "Memproses..." : "Beli Sekarang"}
              </button>
              <div
                style={{
                  marginTop: 12,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "10px 14px", borderRadius: 10,
                  background: "#f8fafc", border: "1px solid #e2e8f0",
                }}
              >
                <span
                  style={{
                    fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.08em", color: "#172554",
                    background: "rgba(23,37,84,0.08)", padding: "3px 8px", borderRadius: 6,
                  }}
                >
                  QRIS
                </span>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                  GoPay · DANA · OVO · ShopeePay · m-Banking
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .beli-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </DashboardLayout>
  )
}