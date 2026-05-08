import { redirect, notFound } from "next/navigation"
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

const SUBTESTS = [
  { code: "TWK", label: "Tes Wawasan Kebangsaan", soal: 35, durasi: "30 menit", color: "bg-blue-600", key: "twk" },
  { code: "TIU", label: "Tes Intelegensi Umum",  soal: 30, durasi: "30 menit", color: "bg-purple-600", key: "tiu" },
  { code: "TKP", label: "Tes Karakteristik Pribadi", soal: 35, durasi: "30 menit", color: "bg-green-600", key: "tkp" },
]

export default async function TODetailPage({ params }) {
  const { to_number } = await params
  const toNum = parseInt(to_number, 10)

  if (isNaN(toNum) || toNum < 1 || toNum > 100) {
    notFound()
  }

  const supabase = await getSupabaseServer()

  // Auth check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect(`/login?redirect=/tryout/paket-to/${toNum}`)
  }

  // Akses paket check
  const { data: skdAccess } = await supabase
    .from("user_packages")
    .select("id")
    .eq("user_id", user.id)
    .eq("package_slug", "skd")
    .eq("payment_status", "paid")
    .maybeSingle()

  if (!skdAccess) {
    redirect("/price")
  }

  // Ambil TO data dari DB
  const { data: skdPackage } = await supabase
    .from("packages")
    .select("id")
    .eq("slug", "skd")
    .single()

  const { data: tryout } = await supabase
    .from("tryouts")
    .select("id, to_number, title, description")
    .eq("package_id", skdPackage?.id)
    .eq("to_number", toNum)
    .maybeSingle()

  if (!tryout) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      {/* Header */}
      <section className="bg-[#172554] pt-24 pb-10 sm:pt-28 sm:pb-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            href="/tryout/paket-to"
            className="inline-flex items-center gap-2 text-[#93C5FD] hover:text-white text-sm mb-5 transition-colors"
          >
            ← Kembali ke daftar TO
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            TO SKD #{toNum}
          </h1>
          <p className="text-[#93C5FD] mt-2 text-sm">
            Pilih subtest yang ingin dikerjakan
          </p>
        </div>
      </section>

      {/* Subtest cards */}
      <section className="flex-1 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {SUBTESTS.map((s) => (
              <Link
                key={s.code}
                href={`/tryout/${s.key}?to_id=${toNum}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-[#ffc107] transition-all"
              >
                <div className={`${s.color} px-5 py-4`}>
                  <span className="text-white font-extrabold text-2xl">{s.code}</span>
                  <p className="text-white/80 text-xs mt-0.5">{s.label}</p>
                </div>
                <div className="px-5 py-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Soal</span>
                    <span className="font-medium text-[#0F172A]">{s.soal} soal</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#94A3B8]">Durasi</span>
                    <span className="font-medium text-[#0F172A]">{s.durasi}</span>
                  </div>
                  <div className="pt-3">
                    <span className="inline-block w-full text-center py-2 rounded-lg bg-[#ffc107] text-[#172554] font-semibold text-sm group-hover:bg-[#e6ac00] transition-colors">
                      Mulai {s.code}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation prev/next */}
          <div className="flex justify-between mt-8">
            {toNum > 1 ? (
              <Link
                href={`/tryout/paket-to/${toNum - 1}`}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-[#334155] hover:border-[#ffc107] hover:text-[#172554] transition-colors"
              >
                ← TO #{toNum - 1}
              </Link>
            ) : <div />}
            {toNum < 100 && (
              <Link
                href={`/tryout/paket-to/${toNum + 1}`}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-[#334155] hover:border-[#ffc107] hover:text-[#172554] transition-colors"
              >
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
