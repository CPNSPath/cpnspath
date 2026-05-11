import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

async function getSupabaseServer() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    }
  )
}

export default async function TODetailPage({ params }) {
  const { to_number } = await params
  const toNum = parseInt(to_number, 10)

  if (isNaN(toNum) || toNum < 1 || toNum > 100) notFound()

  const supabase = await getSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    const { redirect } = await import("next/navigation")
    redirect(`/login?redirect=/tryout/paket-to/${toNum}`)
  }

  const { data: toAccess } = await supabase
    .from("user_tryouts")
    .select("id")
    .eq("user_id", user.id)
    .eq("to_number", toNum)
    .eq("package_slug", "skd")
    .eq("payment_status", "paid")
    .maybeSingle()

  const hasAccess = !!toAccess

  const { data: skdPackage } = await supabase
    .from("packages").select("id").eq("slug", "skd").single()

  const { data: tryout } = await supabase
    .from("tryouts")
    .select("id, to_number, title")
    .eq("package_id", skdPackage?.id)
    .eq("to_number", toNum)
    .maybeSingle()

  if (!tryout) notFound()

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      {!hasAccess && (
        <div style={{ background: "#fbbf24", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginTop: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.25rem" }}>🔒</span>
            <div>
              <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#78350f", margin: 0 }}>TO SKD #{toNum} belum dibeli</p>
              <p style={{ fontSize: "0.78rem", color: "#92400e", margin: 0 }}>Beli tryout ini untuk mulai mengerjakan</p>
            </div>
          </div>
          <Link href={`/tryout/paket-to/${toNum}/beli`} style={{ background: "#172554", color: "#fff", padding: "10px 24px", borderRadius: 10, fontSize: "0.875rem", fontWeight: 700, textDecoration: "none" }}>
            Beli TO #{toNum} — Rp 15.000
          </Link>
        </div>
      )}

      <section style={{ background: "#172554", padding: "56px 24px", position: "relative", overflow: "hidden", marginTop: hasAccess ? "72px" : "0" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 160, height: 160, borderRadius: "50%", background: "rgba(251,191,36,0.05)" }} />
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Link href="/tryout/paket-to" style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 14px", borderRadius: 999, background: "rgba(255,255,255,0.1)", color: "#93C5FD", fontSize: "0.75rem", fontWeight: 500, marginBottom: 12, textDecoration: "none" }}>
            ← Kembali ke daftar TO
          </Link>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>TO SKD #{toNum}</h1>
          <p style={{ fontSize: "0.9rem", color: "#93C5FD" }}>TWK + TIU + TKP — 100 soal dalam 1 sesi</p>
        </div>
      </section>

      <section style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ width: "100%", maxWidth: 480 }}>
          <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
            <div style={{ background: "#0f1d3a", padding: "24px 20px", textAlign: "center" }}>
              <span style={{ fontSize: "2.5rem", display: "block", marginBottom: 6 }}>📋</span>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", margin: 0 }}>TO SKD #{toNum}</h2>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Tryout Seleksi Kompetensi Dasar</p>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                {[
                  { label: "Total Soal", value: "100 soal" },
                  { label: "Durasi", value: "90 menit" },
                  { label: "TWK", value: "35 soal (min. 65)" },
                  { label: "TIU", value: "30 soal (min. 80)" },
                  { label: "TKP", value: "35 soal (min. 166)" },
                  { label: "Tipe", value: "Multiple Choice" },
                ].map(item => (
                  <div key={item.label} style={{ background: "#f8fafc", borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
                    <p style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: 4 }}>{item.label}</p>
                    <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a" }}>{item.value}</p>
                  </div>
                ))}
              </div>

              <div style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
                <p style={{ fontSize: "0.8rem", color: "#92400e", fontWeight: 500, margin: 0 }}>
                  ⚠ Pastikan koneksi internet stabil. Ujian tidak dapat dijeda setelah dimulai.
                </p>
              </div>

              {hasAccess ? (
                <Link href={`/tryout/paket-to/${toNum}/exam`} style={{ display: "block", width: "100%", padding: "13px 20px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 700, textAlign: "center", textDecoration: "none", background: "#fbbf24", color: "#78350f" }}>
                  Mulai Ujian TO #{toNum} →
                </Link>
              ) : (
                <Link href={`/tryout/paket-to/${toNum}/beli`} style={{ display: "block", width: "100%", padding: "13px 20px", borderRadius: 12, fontSize: "0.9rem", fontWeight: 700, textAlign: "center", textDecoration: "none", background: "#172554", color: "#fff" }}>
                  Beli TO #{toNum} — Rp 15.000
                </Link>
              )}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
            {toNum > 1 ? (
              <Link href={`/tryout/paket-to/${toNum - 1}`} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: "0.8rem", color: "#64748b", textDecoration: "none" }}>
                ← TO #{toNum - 1}
              </Link>
            ) : <div />}
            {toNum < 100 && (
              <Link href={`/tryout/paket-to/${toNum + 1}`} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: "0.8rem", color: "#64748b", textDecoration: "none" }}>
                TO #{toNum + 1} →
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
