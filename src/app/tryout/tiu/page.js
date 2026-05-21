"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import DashboardLayout from "@/components/DashboardLayout"
import { supabase } from "@/lib/supabase"

const INFO = [
  { label: "Jumlah Soal", value: "30 Soal" },
  { label: "Durasi", value: "30 Menit" },
  { label: "Passing Grade", value: "80" },
  { label: "Tipe", value: "Multiple Choice" },
]

function TIUIntroContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const toId = searchParams.get("to_id")

  const [checking, setChecking] = useState(!!toId)
  const [alreadyDone, setAlreadyDone] = useState(false)
  const [checkingDone, setCheckingDone] = useState(true)

  useEffect(() => {
    if (!toId) return
    async function checkAccess() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.replace(`/login?redirect=/tryout/tiu?to_id=${toId}`)
        return
      }
      const { data: access } = await supabase
        .from("user_packages")
        .select("id")
        .eq("user_id", user.id)
        .eq("package_slug", "skd")
        .eq("payment_status", "paid")
        .maybeSingle()
      if (!access) {
        router.replace("/price")
        return
      }
      setChecking(false)
    }
    checkAccess()
  }, [toId, router])

  useEffect(() => {
    if (toId) { setCheckingDone(false); return }
    async function checkAlreadyDone() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setCheckingDone(false); return }
      const { data } = await supabase
        .from("results")
        .select("id")
        .eq("user_id", user.id)
        .eq("to_slug", "free-trial-tiu")
        .maybeSingle()
      if (data) setAlreadyDone(true)
      setCheckingDone(false)
    }
    checkAlreadyDone()
  }, [toId])

  if (checking || checkingDone) {
    return (
      <DashboardLayout>
        <div style={{ textAlign: "center", padding: 80, color: "#64748b" }}>Memuat tryout...</div>
      </DashboardLayout>
    )
  }

  const backHref = toId ? `/tryout/paket-to/${toId}` : "/tryout/free-trial"
  const backLabel = toId ? `← Kembali ke TO SKD #${toId}` : "← Kembali ke Free Trial"
  const examHref = toId ? `/tryout/tiu/exam?to_id=${toId}` : "/tryout/tiu/exam"

  return (
    <DashboardLayout>
      {/* Back link + header */}
      <div style={{ marginBottom: 24 }}>
        <Link href={backHref} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 14px", borderRadius: 999, background: "#f1f5f9", color: "#475569", fontSize: "0.75rem", fontWeight: 500, marginBottom: 12, textDecoration: "none" }}>
          {backLabel}
        </Link>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>
          {toId ? `TO SKD #${toId} — TIU` : "Free Trial TIU"}
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Tes Intelegensi Umum</p>
      </div>

      {/* Card */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
            <div style={{ background: "#0f1d3a", padding: "24px 20px 20px", textAlign: "center" }}>
              <span style={{ fontSize: "2.5rem", display: "block", marginBottom: 6 }}>🧠</span>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>TIU</h2>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Tes Intelegensi Umum</p>
            </div>

            <div style={{ padding: "20px 24px 10px" }}>
              <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 999, background: toId ? "rgba(251,191,36,0.15)" : "rgba(34,197,94,0.12)", color: toId ? "#d97706" : "#16a34a", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
                {toId ? `Paket SKD — TO #${toId}` : "Free Trial"}
              </span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 8 }}>
                {INFO.map((item) => (
                  <div key={item.label} style={{ background: "#F8FAFC", borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
                    <p style={{ fontSize: "0.72rem", color: "#64748b", marginBottom: 4 }}>{item.label}</p>
                    <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: "8px 24px 24px" }}>
              {alreadyDone && !toId ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 12, padding: "16px", marginBottom: 12 }}>
                    <p style={{ fontSize: "1.5rem", marginBottom: 6 }}>✅</p>
                    <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#16a34a", marginBottom: 4 }}>Sudah Dikerjakan</p>
                    <p style={{ fontSize: "0.8rem", color: "#64748b" }}>Kamu sudah menyelesaikan Free Trial TIU</p>
                  </div>
                  <Link href="/tryout/tiu/result" style={{ display: "block", width: "100%", padding: "13px 20px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 600, textAlign: "center", textDecoration: "none", background: "#172554", color: "#fff" }}>
                    Lihat Hasil →
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => router.push(examHref)}
                  style={{ display: "block", width: "100%", padding: "13px 20px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 600, textAlign: "center", cursor: "pointer", border: "none", background: "#fbbf24", color: "#78350f", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f59e0b"}
                  onMouseLeave={e => e.currentTarget.style.background = "#fbbf24"}
                >
                  Mulai Tryout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default function TIUIntro() {
  return (
    <Suspense fallback={
      <DashboardLayout>
        <div style={{ textAlign: "center", padding: 80, color: "#64748b" }}>Loading...</div>
      </DashboardLayout>
    }>
      <TIUIntroContent />
    </Suspense>
  )
}