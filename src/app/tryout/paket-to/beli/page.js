"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import DashboardLayout from "@/components/DashboardLayout"
import { supabase } from "@/lib/supabase"

function BeliContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const exam = searchParams.get("exam") || "skd"
  const mode = searchParams.get("mode")
  const isBundle = mode === "bundle"

  const [toList, setToList] = useState([])
  const [ownedNumbers, setOwnedNumbers] = useState(new Set())
  const [selected, setSelected] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace(`/login?redirect=/tryout/paket-to/beli?exam=${exam}${mode ? `&mode=${mode}` : ""}`)
        return
      }

      const { data: examPackage } = await supabase
        .from("packages")
        .select("id")
        .eq("slug", exam)
        .single()

      const { data: examTryouts } = await supabase
        .from("tryouts")
        .select("id, to_number, title")
        .eq("package_id", examPackage?.id)
        .eq("is_active", true)
        .order("to_number", { ascending: true })

      const { data: userTryouts } = await supabase
        .from("user_tryouts")
        .select("to_number")
        .eq("user_id", session.user.id)
        .eq("package_slug", exam)
        .eq("payment_status", "paid")

      setToList(examTryouts || [])
      setOwnedNumbers(new Set((userTryouts || []).map(t => t.to_number)))
      setLoading(false)
    }
    init()
  }, [exam, mode])

  function toggleSelect(toNumber) {
    if (ownedNumbers.has(toNumber)) return
    const next = new Set(selected)
    if (next.has(toNumber)) {
      next.delete(toNumber)
    } else {
      if (next.size >= 5) {
        alert("Maksimal pilih 5 TO untuk bundle")
        return
      }
      next.add(toNumber)
    }
    setSelected(next)
  }

  async function handleBuyBundle() {
    if (selected.size !== 5) {
      alert("Pilih persis 5 TO dulu")
      return
    }
    setPaying(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push(`/login?redirect=/tryout/paket-to/beli?exam=${exam}&mode=bundle`)
        return
      }

      const res = await fetch("/api/create-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          packageSlug: `${exam}-bundle-5`,
          toNumbers: Array.from(selected),
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Gagal membuat transaksi")

      window.snap.pay(data.token, {
        onSuccess: () => router.push(`/tryout/paket-to?exam=${exam}`),
        onPending: () => { alert("Pembayaran pending."); router.push(`/tryout/paket-to?exam=${exam}`) },
        onError: () => alert("Pembayaran gagal."),
        onClose: () => {},
      })
    } catch (err) {
      console.error(err)
      alert(err.message || "Terjadi kesalahan")
    } finally {
      setPaying(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ textAlign: "center", padding: 80, color: "#64748b" }}>Memuat tryout...</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      {/* Banner Bundle Mode */}
      {isBundle && (
        <div style={{ background: "#fbbf24", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, borderRadius: 14, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.25rem" }}>📦</span>
            <div>
              <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#78350f", margin: 0 }}>Mode Bundle 5 — Rp 65.000</p>
              <p style={{ fontSize: "0.78rem", color: "#92400e", margin: 0 }}>
                Terpilih: <strong>{selected.size}/5</strong> {selected.size < 5 ? `— pilih ${5 - selected.size} TO lagi` : "— siap dibayar"}
              </p>
            </div>
          </div>
          <button
            onClick={handleBuyBundle}
            disabled={selected.size !== 5 || paying}
            style={{ background: selected.size === 5 && !paying ? "#172554" : "#94a3b8", color: "#fff", padding: "10px 24px", borderRadius: 10, fontSize: "0.875rem", fontWeight: 700, border: "none", cursor: selected.size === 5 && !paying ? "pointer" : "not-allowed" }}
          >
            {paying ? "Memproses..." : "Beli Bundle 5 — Rp 65.000"}
          </button>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: 32, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <Link href={`/tryout/paket-to?exam=${exam}`} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 14px", borderRadius: 999, background: "#f1f5f9", color: "#475569", fontSize: "0.75rem", fontWeight: 500, marginBottom: 12, textDecoration: "none" }}>
            ← Kembali ke TO Saya
          </Link>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>
            {isBundle ? `Pilih 5 TO ${exam.toUpperCase()}` : `Beli TO ${exam.toUpperCase()}`}
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
            {isBundle ? "Hemat Rp 10.000 dengan bundle" : "Beli satuan per tryout — Rp 15.000/TO"}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>Sudah dimiliki</p>
          <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "#172554" }}>{ownedNumbers.size} <span style={{ fontSize: "1rem", color: "#94a3b8", fontWeight: 500 }}>/ {toList.length}</span></p>
        </div>
      </div>

      {/* Grid TO */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
          {toList.map((to) => {
            const owned = ownedNumbers.has(to.to_number)
            const isSelected = selected.has(to.to_number)

            if (isBundle && !owned) {
              return (
                <button
                  key={to.id}
                  onClick={() => toggleSelect(to.to_number)}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 12px", borderRadius: 14, background: isSelected ? "#fef3c7" : "#fff", border: isSelected ? "2px solid #fbbf24" : "1px solid #e2e8f0", cursor: "pointer", transition: "all 0.15s", position: "relative", textAlign: "center" }}
                >
                  {isSelected && (
                    <span style={{ position: "absolute", top: 6, right: 6, background: "#fbbf24", color: "#78350f", width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 800 }}>✓</span>
                  )}
                  <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#334155" }}>{to.to_number}</span>
                  <span style={{ fontSize: "0.72rem", color: isSelected ? "#92400e" : "#94a3b8", marginTop: 4, fontWeight: 500 }}>
                    {isSelected ? "Terpilih" : "Klik pilih"}
                  </span>
                </button>
              )
            }

return owned ? (
              <Link
                key={to.id}
                href={`/tryout/paket-to/${to.to_number}`}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 12px", borderRadius: 14, background: "#f0fdf4", border: "1px solid #bbf7d0", textDecoration: "none", transition: "all 0.15s", position: "relative", textAlign: "center" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#fbbf24"; e.currentTarget.style.transform = "translateY(-2px)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#bbf7d0"; e.currentTarget.style.transform = "translateY(0)" }}
              >
                <span style={{ position: "absolute", top: 8, right: 8, fontSize: "0.65rem" }}>✅</span>
                <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#172554" }}>{to.to_number}</span>
                <span style={{ fontSize: "0.72rem", color: "#16a34a", marginTop: 4, fontWeight: 600 }}>Dimiliki</span>
              </Link>
            ) : (
              <Link
                key={to.id}
                href={`/tryout/paket-to/${to.to_number}/beli`}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 12px", borderRadius: 14, background: "#fff", border: "1px solid #e2e8f0", textDecoration: "none", transition: "all 0.15s", position: "relative", textAlign: "center" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#fbbf24"; e.currentTarget.style.transform = "translateY(-2px)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)" }}
              >
                <span style={{ position: "absolute", top: 8, right: 8, fontSize: "0.65rem" }}>🔒</span>
                <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#334155" }}>{to.to_number}</span>
                <span style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: 4, fontWeight: 500 }}>Rp 15.000</span>
              </Link>
            )
          })}
        </div>

        {toList.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#94A3B8" }}>
            Data tryout belum tersedia.
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default function BeliPage() {
  return (
    <Suspense fallback={
      <DashboardLayout>
        <div style={{ textAlign: "center", padding: 80, color: "#64748b" }}>Loading...</div>
      </DashboardLayout>
    }>
      <BeliContent />
    </Suspense>
  )
}