"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function GlobalLeaderboard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState(null)
  const [selectedTO, setSelectedTO] = useState(1)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      if (session) setCurrentUserId(session.user.id)

      const toSlug = `skd-to-${selectedTO}`

      const { data: results, error } = await supabase
        .from("results")
        .select("user_id, score, tryout_slug, twk, tiu, tkp")
        .eq("tryout_slug", toSlug)
        .order("score", { ascending: false })

      if (error) { console.error(error); setLoading(false); return }

      const { data: users } = await supabase
        .from("users")
        .select("id, email, name")

      const userMap = {}
      users?.forEach(u => { userMap[u.id] = u })

      const list = (results || []).map(r => ({
        user_id: r.user_id,
        name: userMap[r.user_id]?.name || userMap[r.user_id]?.email?.split("@")[0] || "User",
        totalScore: r.score || 0,
        twk: r.twk || 0,
        tiu: r.tiu || 0,
        tkp: r.tkp || 0,
        lulusTwk: (r.twk || 0) >= 65,
        lulusTiu: (r.tiu || 0) >= 80,
        lulusTkp: (r.tkp || 0) >= 166,
      })).sort((a, b) => b.totalScore - a.totalScore)

      setData(list)
      setLoading(false)
    }
    load()
  }, [selectedTO])

  const filtered = filter === "all" ? data : data.filter(d => d.lulusTwk && d.lulusTiu && d.lulusTkp)
  const myRank = filtered.findIndex(d => d.user_id === currentUserId) + 1

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
      <Navbar />

      <section style={{ background: "#172554", padding: "56px 24px 40px", position: "relative", overflow: "hidden", marginTop: "72px" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 160, height: 160, borderRadius: "50%", background: "rgba(251,191,36,0.05)" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 6, letterSpacing: "-0.02em" }}>🏆 Leaderboard Nasional</h1>
          <p style={{ fontSize: "0.9rem", color: "#93C5FD", marginBottom: 20 }}>Ranking per Paket TO SKD</p>
          {currentUserId && myRank > 0 && (
            <div style={{ background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: 12, padding: "12px 20px", display: "inline-flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: "1.25rem" }}>🎯</span>
              <div>
                <p style={{ fontSize: "0.8rem", color: "#fbbf24", fontWeight: 500, margin: 0 }}>Posisi kamu di TO #{selectedTO}</p>
                <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", margin: 0 }}>#{myRank} dari {filtered.length} peserta</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section style={{ flex: 1, padding: "32px 24px 48px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>

          {/* Filter TO */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <label style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 500 }}>Pilih TO:</label>
              <select
                value={selectedTO}
                onChange={e => setSelectedTO(parseInt(e.target.value))}
                style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: "0.85rem", color: "#0f172a", background: "white", cursor: "pointer", outline: "none" }}
              >
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>TO #{i + 1}</option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ key: "all", label: "Semua" }, { key: "lulus", label: "Lulus SKD" }].map(f => (
                <button key={f.key} onClick={() => setFilter(f.key)}
                  style={{ padding: "7px 18px", borderRadius: 999, border: filter === f.key ? "none" : "1px solid #e2e8f0", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600, background: filter === f.key ? "#172554" : "#fff", color: filter === f.key ? "#fff" : "#64748b" }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 80px 80px 80px 80px", padding: "12px 20px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              {["#", "Peserta", "TWK", "TIU", "TKP", "Total"].map(h => (
                <span key={h} style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: h === "Peserta" ? "left" : "center" }}>{h}</span>
              ))}
            </div>

            {loading ? (
              <div style={{ padding: "48px", textAlign: "center" }}>
                <div style={{ width: 36, height: 36, border: "4px solid #e2e8f0", borderTop: "4px solid #172554", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: "48px", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📭</div>
                <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Belum ada peserta untuk TO #{selectedTO}</p>
              </div>
            ) : (
              filtered.map((item, index) => {
                const isMe = item.user_id === currentUserId
                const medals = ["🥇", "🥈", "🥉"]
                return (
                  <div key={index} style={{ display: "grid", gridTemplateColumns: "60px 1fr 80px 80px 80px 80px", padding: "14px 20px", borderBottom: "1px solid #f1f5f9", background: isMe ? "rgba(251,191,36,0.06)" : index % 2 === 0 ? "#fff" : "#fafafa" }}
                    onMouseEnter={e => { if (!isMe) e.currentTarget.style.background = "#f8fafc" }}
                    onMouseLeave={e => { e.currentTarget.style.background = isMe ? "rgba(251,191,36,0.06)" : index % 2 === 0 ? "#fff" : "#fafafa" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: index < 3 ? "1.25rem" : "0.9rem", fontWeight: 700, color: index < 3 ? "inherit" : "#94a3b8" }}>
                        {medals[index] || `#${index + 1}`}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: isMe ? "#fbbf24" : "#e2e8f0", color: isMe ? "#78350f" : "#64748b", fontWeight: 700, fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {item.name[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p style={{ fontSize: "0.875rem", fontWeight: isMe ? 700 : 500, color: "#0f172a", margin: 0 }}>
                          {item.name} {isMe && <span style={{ fontSize: "0.7rem", background: "#fbbf24", color: "#78350f", padding: "1px 6px", borderRadius: 999, fontWeight: 700 }}>Kamu</span>}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: item.twk >= 65 ? "#16a34a" : item.twk > 0 ? "#dc2626" : "#94a3b8" }}>{item.twk || "—"}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: item.tiu >= 80 ? "#16a34a" : item.tiu > 0 ? "#dc2626" : "#94a3b8" }}>{item.tiu || "—"}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: item.tkp >= 166 ? "#16a34a" : item.tkp > 0 ? "#dc2626" : "#94a3b8" }}>{item.tkp || "—"}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#172554" }}>{item.totalScore}</span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
          <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#94a3b8", marginTop: 16 }}>
            Data diperbarui setiap kali tryout selesai dikerjakan
          </p>
        </div>
      </section>
      <Footer />
    </div>
  )
}
