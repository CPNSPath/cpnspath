import { redirect } from "next/navigation"
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

export default async function PaketToPage() {
  const supabase = await getSupabaseServer()

  // 1. Cek auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login?redirect=/tryout/paket-to")
  }

  // 2. Cek kepemilikan paket SKD (paid)
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

  // 3. Ambil tryouts SKD dari DB
  const { data: tryouts } = await supabase
    .from("tryouts")
    .select("id, to_number, title")
    .eq("is_active", true)
    .order("to_number", { ascending: true })
    .limit(100)
    // filter by package slug via join
    // Simplified: fetch all active, lalu filter client-side (atau pakai join)

  // Fetch package id for skd first
  const { data: skdPackage } = await supabase
    .from("packages")
    .select("id")
    .eq("slug", "skd")
    .single()

  const { data: skdTryouts } = await supabase
    .from("tryouts")
    .select("id, to_number, title")
    .eq("package_id", skdPackage?.id)
    .eq("is_active", true)
    .order("to_number", { ascending: true })

  const toList = skdTryouts || []

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      {/* Header */}
      <section className="bg-[#172554] pt-24 pb-10 sm:pt-28 sm:pb-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#ffc107]/20 text-[#ffc107] text-xs font-semibold uppercase tracking-wider mb-3">
                Paket SKD
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">100 Tryout SKD</h1>
              <p className="text-[#93C5FD] mt-1 text-sm">TWK · TIU · TKP — akses penuh selamanya</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[#93C5FD] text-sm">Total TO</p>
              <p className="text-white font-bold text-2xl">{toList.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="flex-1 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {toList.map((to) => (
              <Link
                key={to.id}
                href={`/tryout/paket-to/${to.to_number}`}
                className="group bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-[#ffc107] hover:shadow-md transition-all"
              >
                <span className="text-2xl font-extrabold text-[#172554] group-hover:text-[#ffc107] transition-colors">
                  {to.to_number}
                </span>
                <span className="text-xs text-[#64748B] mt-1">TO SKD</span>
              </Link>
            ))}
          </div>

          {toList.length === 0 && (
            <div className="text-center py-20 text-[#94A3B8]">
              Data tryout belum tersedia. Pastikan sudah menjalankan SQL seed di Supabase.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
