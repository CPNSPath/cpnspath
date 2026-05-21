"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import DashboardLayout from "@/components/DashboardLayout"
import LoginPopup from "@/components/LoginPopup"

export default function EbookPage() {
  const [ebooks, setEbooks] = useState([])
  const [user, setUser] = useState(null)
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)
  const [downloadLoading, setDownloadLoading] = useState(null)
  const [showLoginPopup, setShowLoginPopup] = useState(false)

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
    if (!user) { setShowLoginPopup(true); return }
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
    if (!user) { setShowLoginPopup(true); return }
    alert("Fitur pembelian segera hadir!")
  }

  const skdEbooks = ebooks.filter(e => e.category === "skd")
  const skbEbooks = ebooks.filter(e => e.category === "skb")

  const EbookList = (
    <>
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
    </>
  )

  const popupComponent = (
    <LoginPopup
      isOpen={showLoginPopup}
      onClose={() => setShowLoginPopup(false)}
      redirectTo="/ebook"
      message="Silakan login atau buat akun untuk mengakses ebook"
    />
  )

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC" }}>
        <div style={{ width: 40, height: 40, border: "4px solid #e2e8f0", borderTop: "4px solid #172554", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  if (user) {
    return (
      <DashboardLayout>
        <div style={{ marginBottom: 32 }}>
          <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 999, background: "rgba(23,37,84,0.08)", color: "#172554", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Perpustakaan Digital</span>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#0f172a", marginBottom: 4, letterSpacing: "-0.02em" }}>📚 Ebook CPNS</h1>
          <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Panduan lengkap SKD & SKB — gratis dan premium</p>
        </div>
        {EbookList}
        {popupComponent}
      </DashboardLayout>
    )
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
      <Navbar />

      <section style={{ background: "#172554", padding: "56px 24px 40px", position: "relative", overflow: "hidden", marginTop: "72px" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 999, background: "rgba(251,191,36,0.15)", color: "#fbbf24", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Perpustakaan Digital</span>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>📚 Ebook CPNS</h1>
          <p style={{ fontSize: "0.9rem", color: "#93C5FD" }}>Panduan lengkap SKD & SKB — gratis dan premium</p>
        </div>
      </section>

      <section style={{ flex: 1, padding: "32px 24px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {EbookList}
        </div>
      </section>

      <Footer />
      {popupComponent}
    </div>
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