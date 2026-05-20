"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import DashboardLayout from "@/components/DashboardLayout"

export default function EbookPage() {
  const router = useRouter()
  const [ebooks, setEbooks] = useState([])
  const [user, setUser] = useState(null)
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)
  const [downloadLoading, setDownloadLoading] = useState(null)

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setUser(session.user)
        const { data: myPurchases } = await supabase
          .from("ebook_purchases")
          .select("ebook_id")
          .eq("user_id", session.user.id)
          .eq("payment_status", "paid")
        setPurchases((myPurchases || []).map(p => p.ebook_id))
      }
      const { data: ebookList } = await supabase
        .from("ebooks")
        .select("*")
        .eq("is_active", true)
        .order("is_free", { ascending: false })
      setEbooks(ebookList || [])
      setLoading(false)
    }
    init()
  }, [])

  async function handleDownload(ebook) {
    if (!user) { router.push("/login?redirect=/ebook"); return }
    setDownloadLoading(ebook.id)
    try {
      const { data } = supabase.storage.from("Ebooks").getPublicUrl(ebook.file_path)
      window.open(data.publicUrl, "_blank")
    } catch (err) {
      alert("Gagal mengunduh ebook")
    } finally {
      setDownloadLoading(null)
    }
  }

  async function handleBeli(ebook) {
    if (!user) { router.push("/login?redirect=/ebook"); return }
    alert("Fitur pembelian segera hadir!")
  }

  const skdEbooks = ebooks.filter(e => e.category === "skd")
  const skbEbooks = ebooks.filter(e => e.category === "skb")

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ textAlign: "center", padding: 80, color: "#64748b" }}>Memuat ebook...</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 999, background: "rgba(23,37,84,0.08)", color: "#172554", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Perpustakaan Digital</span>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>📚 Ebook CPNS</h1>
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Panduan lengkap SKD & SKB — gratis dan premium</p>
      </div>

      {/* Ebook SKD */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 4, height: 24, background: "#172554", borderRadius: 2 }} />
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Ebook SKD</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {skdEbooks.map(ebook => (
            <EbookCard key={ebook.id} ebook={ebook} owned={ebook.is_free || purchases.includes(ebook.id)} onDownload={() => handleDownload(ebook)} onBeli={() => handleBeli(ebook)} downloading={downloadLoading === ebook.id} />
          ))}
        </div>
      </div>

      {/* Ebook SKB */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 4, height: 24, background: "#7c3aed", borderRadius: 2 }} />
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Ebook SKB</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {skbEbooks.map(ebook => (
            <EbookCard key={ebook.id} ebook={ebook} owned={ebook.is_free || purchases.includes(ebook.id)} onDownload={() => handleDownload(ebook)} onBeli={() => handleBeli(ebook)} downloading={downloadLoading === ebook.id} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

function EbookCard({ ebook, owned, onDownload, onBeli, downloading }) {
  const categoryColor = ebook.category === "skd" ? "#172554" : "#7c3aed"
  return (
    <div style={{ background: "#fff", borderRadius: 16, border: `1px solid ${ebook.is_free ? "rgba(34,197,94,0.2)" : "#e2e8f0"}`, overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
      <div style={{ background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}cc)`, padding: "32px 24px", textAlign: "center", position: "relative" }}>
        {ebook.is_free && (
          <div style={{ position: "absolute", top: 12, right: 12, background: "#22c55e", color: "#fff", fontSize: "0.65rem", fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>GRATIS</div>
        )}
        <div style={{ fontSize: "3rem", marginBottom: 8 }}>📖</div>
        <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{ebook.category.toUpperCase()}</p>
      </div>
      <div style={{ padding: "16px 20px 20px" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", marginBottom: 8, lineHeight: 1.4 }}>{ebook.title}</h3>
        <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.5, marginBottom: 16 }}>{ebook.description}</p>
        {ebook.is_free ? (
          <button onClick={onDownload} disabled={downloading} style={{ width: "100%", padding: "10px 16px", borderRadius: 10, border: "none", background: downloading ? "#94a3b8" : "#22c55e", color: "#fff", fontSize: "0.85rem", fontWeight: 700, cursor: downloading ? "not-allowed" : "pointer" }}>
            {downloading ? "Mengunduh..." : "⬇ Download Gratis"}
          </button>
        ) : owned ? (
          <button onClick={onDownload} disabled={downloading} style={{ width: "100%", padding: "10px 16px", borderRadius: 10, border: "none", background: "#172554", color: "#fff", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}>
            {downloading ? "Mengunduh..." : "⬇ Download Ebook"}
          </button>
        ) : (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>Rp {ebook.price.toLocaleString("id-ID")}</span>
            </div>
            <button onClick={onBeli} style={{ width: "100%", padding: "10px 16px", borderRadius: 10, border: "none", background: "#fbbf24", color: "#78350f", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}>
              Beli Sekarang
            </button>
          </div>
        )}
      </div>
    </div>
  )
}