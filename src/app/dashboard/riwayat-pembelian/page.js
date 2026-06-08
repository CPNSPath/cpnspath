"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import DashboardLayout from "@/components/DashboardLayout"

export default function RiwayatPembelianPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: { user: u }, error } = await supabase.auth.getUser()
      if (error || !u) { router.push("/login"); return }
      setUser(u)

      const { data: txData } = await supabase
        .from("user_packages")
        .select("order_id, package_slug, to_number, payment_status, gross_amount, created_at, paid_at")
        .eq("user_id", u.id)
        .order("created_at", { ascending: false })
        .limit(50)

      setTransactions(txData || [])
      setLoading(false)
    }
    init()
  }, [])

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ textAlign: "center", padding: 80, color: "#64748b" }}>Memuat data...</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>
          🧾 Riwayat Pembelian
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
          Semua transaksi pembelian TO
        </p>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
        {transactions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: 12 }}>🧾</div>
            <p style={{ fontSize: "1rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>Belum ada transaksi</p>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: 20 }}>Pembelian TO akan muncul di sini</p>
            <Link href="/tryout/paket-to" style={{ display: "inline-block", padding: "10px 20px", borderRadius: 10, background: "#172554", color: "#fff", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
              Lihat Paket TO
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {transactions.map((tx, i) => {
              const isPaid = tx.payment_status === "paid"
              const isPending = tx.payment_status === "pending"
              const isFailed = ["failed", "deny", "expire", "cancel"].includes(tx.payment_status)

              const badgeBg = isPaid ? "rgba(22,163,74,0.1)" : isPending ? "rgba(251,191,36,0.15)" : "rgba(220,38,38,0.08)"
              const badgeColor = isPaid ? "#16a34a" : isPending ? "#b45309" : "#dc2626"
              const badgeText = isPaid ? "Lunas" : isPending ? "Pending" : "Gagal"

              const label = tx.package_slug?.toUpperCase() === "SKD" ? `TO SKD #${tx.to_number}` : tx.package_slug?.toUpperCase() === "SKB" ? `TO SKB #${tx.to_number}` : tx.order_id

              return (
                <div
                  key={tx.order_id || i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                    padding: "16px",
                    borderRadius: 10,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: badgeBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.3rem",
                      }}
                    >
                      {isPaid ? "✅" : isPending ? "⏳" : "❌"}
                    </div>
                    <div>
                      <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#0f172a", margin: 0 }}>
                        {label}
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "#94a3b8", margin: 0 }}>
                        {new Date(tx.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </p>
                      <p style={{ fontSize: "0.7rem", color: "#cbd5e1", margin: 0 }}>
                        {tx.order_id}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" }}>
                        Rp {tx.gross_amount?.toLocaleString("id-ID") ?? "—"}
                      </div>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: 999,
                          background: badgeBg,
                          color: badgeColor,
                        }}
                      >
                        {badgeText}
                      </span>
                      {isPaid && tx.paid_at && (
                        <p style={{ fontSize: "0.65rem", color: "#94a3b8", margin: "2px 0 0" }}>
                          Lunas: {new Date(tx.paid_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      )}
                    </div>
                    {isPending && (
                      <Link
                        href={`/tryout/paket-to/${tx.to_number}/beli`}
                        style={{
                          padding: "8px 16px",
                          borderRadius: 8,
                          background: "#fbbf24",
                          color: "#78350f",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Bayar
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}