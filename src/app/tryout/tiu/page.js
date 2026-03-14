"use client"

import { useRouter } from "next/navigation"

export default function Page() {

  const router = useRouter()

  return (
    <div style={{
      minHeight: "100vh",
      background: "#070d1a",
      color: "white",
      fontFamily: "Arial",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>

      <div style={{
        background: "#111827",
        padding: "40px",
        borderRadius: "12px",
        textAlign: "center"
      }}>

        <h1>TIU Tryout</h1>

        <p style={{ opacity: 0.7 }}>
          Tes Intelegensi Umum
        </p>

        <button
          onClick={() => router.push("/tryout/tiu/exam")}
          style={{
            marginTop: "20px",
            padding: "12px 30px",
            background: "#2563eb",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer"
          }}
        >
          Mulai Ujian
        </button>

      </div>

    </div>
  )
}