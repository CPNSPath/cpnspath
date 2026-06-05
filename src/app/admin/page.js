// src/app/admin/page.js
"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

const ADMIN_EMAILS = ["3082240019_tito@pknstan.ac.id"]

export default function AdminPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    async function check() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.replace("/login?redirect=/admin"); return }
      if (!ADMIN_EMAILS.includes(session.user.email)) { router.replace("/dashboard"); return }
      setChecking(false)
    }
    check()
  }, [])

  async function handleUpload() {
    if (!file) return
    setLoading(true); setResult(null)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setResult({ ok: false, data: { error: "Sesi habis, silakan login ulang." } })
        setLoading(false)
        return
      }
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/admin/import-questions", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: fd,
      })
      const data = await res.json()
      setResult({ ok: res.ok, data })
    } catch (e) {
      setResult({ ok: false, data: { error: e.message } })
    }
    setLoading(false)
  }

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC" }}>
        <p style={{ color: "#64748b" }}>Memeriksa akses...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", padding: "40px 20px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ background: "#172554", color: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: "0.78rem", fontWeight: 700 }}>ADMIN</span>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Import Soal</h1>
        </div>
        <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: 24 }}>Upload file Excel (.xlsx) berisi soal. Import ulang dengan slug + nomor yang sama akan menimpa, bukan menggandakan.</p>

        {/* Panduan kolom */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#172554", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Kolom Excel (baris 1 = header)</p>
          <code style={{ display: "block", fontSize: "0.72rem", color: "#475569", lineHeight: 1.6, wordBreak: "break-word" }}>
            tryout_slug, question_number, subtest, question, option_a, option_b, option_c, option_d, option_e, correct_answer, point_a, point_b, point_c, point_d, point_e, explanation
          </code>
          <ul style={{ fontSize: "0.78rem", color: "#64748b", marginTop: 12, paddingLeft: 18, lineHeight: 1.7 }}>
            <li><b>TWK/TIU</b>: isi <b>correct_answer</b> (A–E), kolom point_* kosongkan.</li>
            <li><b>TKP</b>: isi <b>point_a–point_e</b> (1–5), correct_answer kosongkan.</li>
            <li><b>tryout_slug</b> contoh: <code>skd-to-1</code>, <code>skb-to-1</code>.</li>
          </ul>
        </div>

        {/* Upload box */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                padding: "11px 20px", borderRadius: 10, border: "1.5px solid #172554",
                background: "#fff", color: "#172554", fontWeight: 600, cursor: "pointer",
              }}
            >
              Pilih File Excel
            </button>
            {file
              ? <span style={{ color: "#172554", fontWeight: 600, fontSize: "0.85rem" }}>{file.name}</span>
              : <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Belum ada file dipilih</span>
            }
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={e => { setFile(e.target.files?.[0] || null); setResult(null) }}
            style={{ display: "none" }}
          />
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            style={{
              padding: "11px 24px", borderRadius: 10, border: "none",
              background: !file || loading ? "#cbd5e1" : "#fbbf24",
              color: !file || loading ? "#fff" : "#78350f",
              fontSize: "0.9rem", fontWeight: 700, cursor: !file || loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Mengunggah..." : "Import Soal"}
          </button>
        </div>

        {/* Hasil */}
        {result && (
          <div style={{
            marginTop: 20, padding: "16px 20px", borderRadius: 12,
            background: result.ok ? "rgba(22,163,74,0.08)" : "rgba(220,38,38,0.06)",
            border: `1px solid ${result.ok ? "rgba(22,163,74,0.3)" : "rgba(220,38,38,0.3)"}`,
          }}>
            {result.ok ? (
              <p style={{ color: "#16a34a", fontWeight: 700, margin: 0 }}>✓ Berhasil! {result.data.imported} soal tersimpan.</p>
            ) : (
              <>
                <p style={{ color: "#dc2626", fontWeight: 700, margin: "0 0 8px" }}>✗ {result.data.error}</p>
                {result.data.details && (
                  <ul style={{ fontSize: "0.78rem", color: "#b91c1c", margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
                    {result.data.details.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}