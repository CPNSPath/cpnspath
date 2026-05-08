"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({ error, reset }) {

  useEffect(() => {
    console.error("Unhandled app error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center text-center px-6">
      <p className="text-6xl mb-4">⚠️</p>
      <h1 className="text-2xl font-semibold text-[#0F172A] mb-3">Something Went Wrong</h1>
      <p className="text-[#64748B] max-w-md mb-8 leading-relaxed">
        Terjadi kesalahan yang tidak terduga. Coba muat ulang halaman atau kembali ke beranda.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-[#1E3A8A] text-white rounded-lg text-sm font-medium hover:bg-[#172554] transition-colors"
        >
          Try Again
        </button>
        <Link href="/">
          <button className="px-6 py-3 bg-white text-[#0F172A] border border-[#E2E8F0] rounded-lg text-sm font-medium hover:bg-[#F1F5F9] transition-colors">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  )
}
