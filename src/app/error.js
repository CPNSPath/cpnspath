"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({ error, reset }) {

  useEffect(() => {
    console.error("Unhandled app error:", error)
  }, [error])

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--dark)",
      color: "var(--text-light)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "40px",
    }}>

      <p style={{
        fontSize: "60px",
        marginBottom: "16px",
      }}>
        ⚠️
      </p>

      <h1 style={{
        fontSize: "28px",
        fontWeight: "600",
        marginBottom: "12px",
      }}>
        Something Went Wrong
      </h1>

      <p style={{
        color: "var(--text-muted)",
        fontSize: "16px",
        maxWidth: "420px",
        lineHeight: "1.6",
        marginBottom: "32px",
      }}>
        Terjadi kesalahan yang tidak terduga. Coba muat ulang halaman atau kembali ke beranda.
      </p>

      <div style={{ display: "flex", gap: "12px" }}>

        <button
          className="btn-primary"
          style={{ fontSize: "15px", padding: "12px 24px" }}
          onClick={() => reset()}
        >
          Try Again
        </button>

        <Link href="/">
          <button
            className="btn-primary"
            style={{ fontSize: "15px", padding: "12px 24px", background: "var(--card)" }}
          >
            Back to Home
          </button>
        </Link>

      </div>

    </div>
  )
}
