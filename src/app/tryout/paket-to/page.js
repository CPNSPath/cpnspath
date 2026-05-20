"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import DashboardLayout from "@/components/DashboardLayout"
import { supabase } from "@/lib/supabase"

function PaketToContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const exam = searchParams.get("exam") || "skd"

  const [ownedTryouts, setOwnedTryouts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace(`/login?redirect=/tryout/paket-to?exam=${exam}`)
        return
      }

      const { data: userTryouts } = await supabase
        .from("user_tryouts")
        .select("to_number, package_slug")
        .eq("user_id", session.user.id)
        .eq("package_slug", exam)
        .eq("payment_status", "paid")
        .order("to_number", { ascending: true })

      setOwnedTryouts(userTryouts || [])
      setLoading(false)
    }
    init()
  }, [exam])

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ textAlign: "center", padding: 80, color: "#64748b" }}>Memuat tryout...</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      {/* Header dengan toggle SKD/SKB */}
      <div style={{ marginBottom: 32, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 999, background: "rgba(23,37,84,0.08)", color: "#172554", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>TO {exam.toUpperCase()} Saya</span>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>Daftar TO {exam.toUpperCase()} Saya</h1>
          <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Tryout yang sudah kamu beli</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link
            href="/tryout/paket-to?exam=skd"
            style={{ padding: "8px 18px", borderRadius: 10, fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", background: exam === "skd" ? "#fbbf24" : "#f1f5f9", color: exam === "skd" ? "#78350f" : "#475569" }}
          >
            SKD
          </Link>
          <Link
            href="/tryout/paket-to?exam=skb"
            style={{ padding: "8px 18px", borderRadius: 10, fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", background: exam === "skb" ? "#fbbf24" : "#f1f5f9", color: exam === "skb" ? "#78350f" : "#475569" }}
          >
            SKB
          </Link>
        </div>
      </div>

      {/* Section: Tambah TO */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "24px", marginBottom: 24, boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>➕ Tambah TO {exam.toUpperCase()}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
          <Link
            href={`/tryout/paket-to/beli?exam=${exam}`}
            style={{ display: "block", padding: "20px", borderRadius: 12, border: "1.5px solid #e2e8f0", background: "#f8fafc", textDecoration: "none", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#fbbf24"; e.currentTarget.style.background = "#fff" }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#f8fafc" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: "1.5rem" }}>📋</span>
              <div>
                <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Beli Satuan</p>
                <p style={{ fontSize: "0.75rem", color: "#64748b", margin: 0 }}>Pilih 1 TO yang kamu mau</p>
              </div>
            </div>
            <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#172554", margin: 0 }}>Rp 15.000<span style={{ fontSize: "0.8rem", fontWeight: 500, color: "#94a3b8" }}>/TO</span></p>
          </Link>

          <Link
            href={`/tryout/paket-to/beli?exam=${exam}&mode=bundle`}
            style={{ display: "block", padding: "20px", borderRadius: 12, border: "1.5px solid #fbbf24", background: "#fef3c7", textDecoration: "none", transition: "all 0.15s", position: "relative" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)" }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)" }}
          >
            <span style={{ position: "absolute", top: 12, right: 12, fontSize: "0.65rem", fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: "#fbbf24", color: "#78350f" }}>HEMAT</span>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: "1.5rem" }}>📦</span>
              <div>
                <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#78350f", margin: 0 }}>Bundle 5</p>
                <p style={{ fontSize: "0.75rem", color: "#92400e", margin: 0 }}>Pilih 5 TO, hemat Rp 10.000</p>
              </div>
            </div>
            <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#78350f", margin: 0 }}>Rp 65.000<span style={{ fontSize: "0.8rem", fontWeight: 500, color: "#92400e" }}>/5 TO</span></p>
          </Link>
        </div>
      </div>

      {/* Section: TO Saya */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>📚 TO {exam.toUpperCase()} Saya</h2>
          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
            <strong style={{ color: "#172554" }}>{ownedTryouts.length}</strong> TO dimiliki
          </span>
        </div>

        {ownedTryouts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🛒</div>
            <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>Belum ada TO {exam.toUpperCase()} yang dibeli</p>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Beli satuan atau bundle 5 di atas untuk mulai</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
            {ownedTryouts.map((t) => (
              <Link
                key={t.to_number}
                href={`/tryout/paket-to/${t.to_number}`}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 12px", borderRadius: 14, background: "#f0fdf4", border: "1px solid #bbf7d0", textDecoration: "none", transition: "all 0.15s", position: "relative", textAlign: "center" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#fbbf24"; e.currentTarget.style.transform = "translateY(-2px)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#bbf7d0"; e.currentTarget.style.transform = "translateY(0)" }}
              >
                <span style={{ position: "absolute", top: 8, right: 8, fontSize: "0.65rem" }}>✅</span>
                <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#172554" }}>{t.to_number}</span>
                <span style={{ fontSize: "0.72rem", color: "#16a34a", marginTop: 4, fontWeight: 600 }}>Dimiliki</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default function PaketToPage() {
  return (
    <Suspense fallback={
      <DashboardLayout>
        <div style={{ textAlign: "center", padding: 80, color: "#64748b" }}>Loading...</div>
      </DashboardLayout>
    }>
      <PaketToContent />
    </Suspense>
  )
}