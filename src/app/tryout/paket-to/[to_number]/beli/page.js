"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import DashboardLayout from "@/components/DashboardLayout"
import { supabase } from "@/lib/supabase"

export default function BeliTOPage({ params }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const toNumber = resolvedParams.to_number

  const [loading, setLoading] = useState(false)
  const [snapToken, setSnapToken] = useState(null)     // simpan token buat resume
  const [paymentState, setPaymentState] = useState("idle") // idle | loading | pending | error

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

      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat transaksi")
      }

      // Simpan token buat resume nanti
      setSnapToken(data.token)

      // Buka Snap dengan token
      openSnap(data.token)
    } catch (err) {
      console.error(err)
      alert(err.message || "Terjadi kesalahan.")
      setPaymentState("idle")
    } finally {
      setLoading(false)
    }
  }

  // Fungsi terpisah biar bisa dipanggil ulang buat resume
  function openSnap(token) {
    if (!window.snap) {
      alert("Midtrans Snap belum siap, coba refresh halaman.")
      setPaymentState("idle")
      return
    }

    window.snap.pay(token, {
      onSuccess: () => {
        // Bayar lunas -> langsung ke halaman intro TO (atau exam nanti)
        router.push(`/tryout/paket-to/${toNumber}`)
      },
      onPending: () => {
        // User belum selesai bayar, tetap di halaman ini & tampilkan tombol resume
        setPaymentState("pending")
      },
      onError: (err) => {
        console.error("Snap error:", err)
        alert("Pembayaran gagal. Silakan coba lagi.")
        setPaymentState("idle")
      },
      onClose: () => {
        // Popup ditutup (X), tetap di halaman ini. Kalau status terakhir pending, tetap pending.
        if (paymentState !== "pending") {
          setPaymentState("idle")
        }
      },
    })
  }

  // Tombol "Lanjutkan Bayar" -> panggil ulang Snap dengan token yang sama
  function handleResume() {
    if (!snapToken) return
    openSnap(snapToken)
  }

  return (
    <DashboardLayout>
      {/* Back link + header */}
      <div style={{ marginBottom: 24 }}>
        <Link
          href={`/tryout/paket-to/${toNumber}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 14px",
            borderRadius: 999,
            background: "#f1f5f9",
            color: "#475569",
            fontSize: "0.75rem",
            fontWeight: 500,
            marginBottom: 12,
            textDecoration: "none",
          }}
        >
          ← Kembali ke TO #{toNumber}
        </Link>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>
          Beli TO SKD #{toNumber}
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
          Akses penuh TWK + TIU + TKP untuk tryout ini
        </p>
      </div>

      {/* Card beli */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            overflow: "hidden",
            width: "100%",
            maxWidth: 400,
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ background: "#0f1d3a", padding: "24px 20px", textAlign: "center" }}>
            <span style={{ fontSize: "2.5rem", display: "block", marginBottom: 8 }}>📋</span>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", margin: 0 }}>
              TO SKD #{toNumber}
            </h2>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
              TWK + TIU + TKP
            </p>
          </div>
          <div style={{ padding: "24px" }}>
            {/* Harga */}
            <div
              style={{
                textAlign: "center",
                marginBottom: 20,
                padding: "16px",
                background: "#f8fafc",
                borderRadius: 12,
              }}
            >
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#0f172a" }}>Rp 15.000</div>
              <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: 4 }}>satu kali bayar</p>
            </div>

            {/* Fitur */}
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                marginBottom: 20,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {["Akses TWK, TIU, TKP", "Pembahasan lengkap", "Akses selamanya", "Analisis hasil"].map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: "0.875rem",
                    color: "#334155",
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "rgba(34,197,94,0.12)",
                      color: "#16a34a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Tombol aksi */}
            {paymentState === "pending" ? (
              // Tampilan jika pembayaran pending (belum selesai)
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: 10,
                    background: "rgba(251,191,36,0.1)",
                    border: "1px solid rgba(251,191,36,0.4)",
                    fontSize: "0.85rem",
                    color: "#b45309",
                    textAlign: "center",
                  }}
                >
                  ⏳ Pembayaran belum selesai. Silakan lanjutkan atau batalkan.
                </div>
                <button
                  onClick={handleResume}
                  style={{
                    width: "100%",
                    padding: "13px 20px",
                    borderRadius: 12,
                    border: "none",
                    background: "#fbbf24",
                    color: "#78350f",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Lanjutkan Pembayaran
                </button>
                <button
                  onClick={() => {
                    // Reset state & token, biarkan user mulai transaksi baru jika mau
                    setSnapToken(null)
                    setPaymentState("idle")
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 20px",
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    background: "#fff",
                    color: "#64748b",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Batalkan & Buat Pesanan Baru
                </button>
              </div>
            ) : (
              // Tampilan awal: tombol beli
              <button
                onClick={handleBeli}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "13px 20px",
                  borderRadius: 12,
                  border: "none",
                  background: loading ? "#94a3b8" : "#fbbf24",
                  color: loading ? "#fff" : "#78350f",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background 0.2s",
                }}
              >
                {loading ? "Memproses..." : `Beli TO #${toNumber} Sekarang`}
              </button>
            )}

            {/* Info QRIS */}
            <div
              style={{
                marginTop: 12,
                padding: "12px 14px",
                background: "#F8FAFC",
                border: "1px solid #e2e8f0",
                borderRadius: 10,
              }}
            >
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#172554", margin: "0 0 2px" }}>
                Pembayaran via QRIS
              </p>
              <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>
                Scan dengan GoPay, DANA, OVO, ShopeePay, atau m-banking apa saja.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}