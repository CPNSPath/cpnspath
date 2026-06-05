"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { getMyPackages } from "@/lib/myPackages"
import { getMyResults } from "@/lib/resultHelper"
import DashboardLayout from "@/components/DashboardLayout"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [packages, setPackages] = useState([])
  const [results, setResults] = useState([])
  const [userTryouts, setUserTryouts] = useState([])
  const [rank, setRank] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error || !data.user) {
          router.push("/login")
          return
        }
        setUser(data.user)
        const myPackages = await getMyPackages()
        const myResults = await getMyResults()
        setPackages(myPackages)
        setResults(myResults)
        const { data: myTryouts } = await supabase
          .from("user_tryouts")
          .select("to_number, package_slug, payment_status, exam_status")
          .eq("user_id", data.user.id)
          .eq("payment_status", "paid")
          .order("to_number", { ascending: true })
        setUserTryouts(myTryouts || [])
        // Rata-rata ranking dari semua Paket TO (skd-to-* dan skb-to-*)
        const { data: myLb } = await supabase
          .from("leaderboard")
          .select("to_slug, total")
          .eq("user_id", data.user.id)
          .like("to_slug", "%-to-%")

        if (myLb && myLb.length > 0) {
          const ranks = []
          for (const lb of myLb) {
            const { count: higherCount } = await supabase
              .from("leaderboard")
              .select("*", { count: "exact", head: true })
              .eq("to_slug", lb.to_slug)
              .gt("total", lb.total)
            ranks.push((higherCount ?? 0) + 1)
          }
          const avg = Math.round(ranks.reduce((a, b) => a + b, 0) / ranks.length)
          setRank(avg)
        }
      } catch (err) {
        console.error("Dashboard error:", err)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  const avgScore = results.length > 0
    ? Math.round(results.reduce((sum, r) => sum + (r.score || 0), 0) / results.length)
    : 0

  const twkResult = results.find((r) => r.tryout_slug === "free-trial-twk")
  const tiuResult = results.find((r) => r.tryout_slug === "free-trial-tiu")
  const tkpResult = results.find((r) => r.tryout_slug === "free-trial-tkp")

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ textAlign: "center", padding: 80, color: "#64748b" }}>
          Memuat data...
        </div>
      </DashboardLayout>
    )
  }

  const skdTryouts = userTryouts.filter((t) => t.package_slug === "skd")
  const skbTryouts = userTryouts.filter((t) => t.package_slug === "skb")

  const renderColumn = (label, list, examSlug) => (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>TO {label}</h3>
        <Link
          href={`/tryout/paket-to?exam=${examSlug}`}
          style={{ fontSize: "0.75rem", color: "#172554", fontWeight: 600, textDecoration: "none" }}
        >
          Lihat semua →
        </Link>
      </div>
      {list.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px 12px", background: "#f8fafc", borderRadius: 10, border: "1px dashed #e2e8f0" }}>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: 10 }}>Belum ada TO {label}</p>
          <Link
            href="/price"
            style={{ display: "inline-block", padding: "6px 14px", borderRadius: 8, background: "#fbbf24", color: "#78350f", fontSize: "0.75rem", fontWeight: 600, textDecoration: "none" }}
          >
            Beli TO {label}
          </Link>
        </div>
      ) : (
        <>
          <p style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: 10 }}>
            <span style={{ fontWeight: 700, color: "#172554" }}>{list.length}</span> TO dimiliki
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))", gap: 6 }}>
            {list.slice(0, 12).map((t) => {
              const done = t.exam_status === "completed"
              const href = done ? `/tryout/paket-to/${t.to_number}/result` : `/tryout/paket-to/${t.to_number}?exam=${examSlug}`
              return (
                <Link
                  key={t.to_number}
                  href={href}
                  title={done ? "Sudah dikerjakan — Klik untuk preview hasil" : "Klik untuk mulai mengerjakan"}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 6px", borderRadius: 8, background: done ? "#eff6ff" : "#f0fdf4", border: done ? "1px solid #bfdbfe" : "1px solid #bbf7d0", textDecoration: "none", transition: "all 0.15s", position: "relative" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = done ? "#dbeafe" : "#dcfce7" }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = done ? "#eff6ff" : "#f0fdf4" }}
                >
                  {done && (
                    <span style={{ position: "absolute", top: 3, right: 3, fontSize: "0.6rem" }}>✓</span>
                  )}
                  <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#172554" }}>{t.to_number}</span>
                  <span style={{ fontSize: "0.55rem", color: done ? "#172554" : "#16a34a", fontWeight: 600 }}>{done ? "Selesai" : label}</span>
                </Link>
              )
            })}
            {list.length > 12 && (
              <Link
                href={`/tryout/paket-to?exam=${examSlug}`}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 6px", borderRadius: 8, background: "#f8fafc", border: "1px solid #e2e8f0", textDecoration: "none" }}
              >
                <span style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 600 }}>+{list.length - 12}</span>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  )

  return (
    <DashboardLayout>
      {/* Greeting */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>
          Halo, {user?.user_metadata?.name || user?.email?.split("@")[0]} 👋
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
          {new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
        {[
          { label: "Tryout Selesai", value: results.length, color: "#172554" },
          { label: "Rata-rata Skor", value: results.length > 0 ? avgScore : "—", color: "#16a34a" },
          { label: "TO Dimiliki", value: userTryouts.length, color: "#d97706" },
          { label: "Ranking Nasional", value: rank ? `#${rank}` : "—", color: "#7c3aed" },
        ].map((stat) => (
          <div key={stat.label} style={{ background: "#fff", borderRadius: 14, padding: "20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: stat.color, marginBottom: 4 }}>{stat.value}</div>
            <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Progress Free Trial SKD */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "24px", marginBottom: 24, boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>📊 Progress Free Trial SKD</h2>
        </div>
        <div className="progress-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { code: "TWK", result: twkResult, passing: 65, href: "/tryout/twk" },
            { code: "TIU", result: tiuResult, passing: 80, href: "/tryout/tiu" },
            { code: "TKP", result: tkpResult, passing: 166, href: "/tryout/tkp" },
          ].map((item) => (
            <div key={item.code} style={{ background: "#f8fafc", borderRadius: 12, padding: "16px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155" }}>{item.code}</span>
                {item.result ? (
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: item.result.score >= item.passing ? "rgba(22,163,74,0.12)" : "rgba(220,38,38,0.1)", color: item.result.score >= item.passing ? "#16a34a" : "#dc2626" }}>
                    {item.result.score >= item.passing ? "LULUS" : "TIDAK LULUS"}
                  </span>
                ) : (
                  <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "rgba(148,163,184,0.12)", color: "#94a3b8" }}>BELUM</span>
                )}
              </div>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", marginBottom: 2 }}>
                {item.result ? item.result.score : "—"}
              </div>
              <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginBottom: 10 }}>Passing grade: {item.passing}</div>
              {item.result && (
                <div style={{ background: "#e2e8f0", borderRadius: 999, height: 6, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 999, background: item.result.score >= item.passing ? "#16a34a" : "#ef4444", width: `${Math.min(100, Math.round((item.result.score / (item.passing * 1.5)) * 100))}%`, transition: "width 0.8s ease" }} />
                </div>
              )}
              {!item.result ? (
                <Link href={item.href} style={{ display: "block", textAlign: "center", padding: "8px", borderRadius: 8, background: "#fbbf24", color: "#78350f", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", marginTop: 10 }}>
                  Mulai Sekarang
                </Link>
              ) : (
                <Link href={`${item.href}/result`} style={{ display: "block", textAlign: "center", padding: "8px", borderRadius: 8, background: "#172554", color: "#fff", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none", marginTop: 10 }}>
                  Preview Hasil
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Free Trial SKB */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "24px", marginBottom: 24, boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>📊 Progress Free Trial SKB</h2>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: "rgba(148,163,184,0.15)", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>Segera Hadir</span>
        </div>
        <div style={{ textAlign: "center", padding: "40px 20px", background: "#f8fafc", borderRadius: 12, border: "1px dashed #e2e8f0" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🚧</div>
          <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>Sedang dalam pengembangan</p>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Free Trial SKB akan segera tersedia. Pantau terus update kami!</p>
        </div>
      </div>

      {/* Riwayat Tryout — Paket TO doang */}
      {(() => {
        const paketResults = results.filter(r => !r.tryout_slug?.startsWith("free-trial-"))
        return (
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "24px", marginBottom: 24, boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>📋 Riwayat Tryout</h2>
        {paketResults.length === 0 ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📭</div>
            <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#334155", marginBottom: 6 }}>Belum ada riwayat tryout</p>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: 16 }}>Selesaikan tryout pertamamu</p>
            <Link href="/tryout/free-trial" style={{ display: "inline-block", padding: "10px 20px", borderRadius: 10, background: "#172554", color: "#fff", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
              Mulai Free Trial
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {paketResults.map((r, i) => {
              const slugLabel = r.tryout_slug?.replace("free-trial-", "").toUpperCase() || r.tryout_slug
              const passing = r.tryout_slug?.includes("twk") ? 65 : r.tryout_slug?.includes("tiu") ? 80 : 166
              const lulus = r.score >= passing
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 10, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: lulus ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>
                      {lulus ? "✅" : "❌"}
                    </div>
                    <div>
                      <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0f172a", margin: 0 }}>{slugLabel}</p>
                      <p style={{ fontSize: "0.72rem", color: "#94a3b8", margin: 0 }}>
                        {new Date(r.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "1.25rem", fontWeight: 800, color: lulus ? "#16a34a" : "#dc2626" }}>{r.score}</div>
                    <div style={{ fontSize: "0.65rem", color: "#94a3b8" }}>Passing: {passing}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
        )
      })()}

      {/* Paket TO Saya */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>📦 Paket TO Saya</h2>
        <div className="paket-to-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {renderColumn("SKD", skdTryouts, "skd")}
          {renderColumn("SKB", skbTryouts, "skb")}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .progress-grid { grid-template-columns: 1fr !important; }
          .paket-to-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </DashboardLayout>
  )
}