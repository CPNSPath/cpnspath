import Link from "next/link"

export default function NotFound() {
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
        fontSize: "80px",
        fontWeight: "700",
        color: "var(--primary)",
        lineHeight: "1",
        marginBottom: "16px",
      }}>
        404
      </p>

      <h1 style={{
        fontSize: "28px",
        fontWeight: "600",
        marginBottom: "12px",
      }}>
        Page Not Found
      </h1>

      <p style={{
        color: "var(--text-muted)",
        fontSize: "16px",
        maxWidth: "400px",
        lineHeight: "1.6",
        marginBottom: "32px",
      }}>
        Halaman yang kamu cari tidak ditemukan atau sudah dipindahkan.
      </p>

      <Link href="/">
        <button className="btn-primary" style={{ fontSize: "15px", padding: "12px 28px" }}>
          Back to Home
        </button>
      </Link>

    </div>
  )
}
