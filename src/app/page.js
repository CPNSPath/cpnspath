import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Brain,
  BookOpen,
  Users,
  Briefcase,
  Award,
  FileText,
  PlayCircle,
  ShoppingCart,
  ChevronRight,
} from 'lucide-react'

const CATEGORIES = [
  {
    icon: Brain,
    name: 'TWK',
    desc: 'Tes Wawasan Kebangsaan — Pancasila, UUD 1945, NKRI',
    link: '/tryout/twk',
  },
  {
    icon: BookOpen,
    name: 'TIU',
    desc: 'Tes Intelegensi Umum — Verbal, numerik, figural',
    link: '/tryout/tiu',
  },
  {
    icon: Users,
    name: 'TKP',
    desc: 'Tes Karakteristik Pribadi — Profesionalisme, integritas',
    link: '/tryout/tkp',
  },
  {
    icon: Briefcase,
    name: 'SKB',
    desc: 'Seleksi Kompetensi Bidang sesuai formasi jabatan',
    link: '/skb',
  },
  {
    icon: PlayCircle,
    name: 'Paket SKD',
    desc: '100 Tryout SKD lengkap — TWK, TIU, TKP — Rp 15.000',
    link: '/price',
  },
  {
    icon: ShoppingCart,
    name: 'Paket SKB',
    desc: '100 Tryout SKB sesuai formasi jabatan — Rp 15.000',
    link: '/price',
  },
  {
    icon: FileText,
    name: 'Free Trial',
    desc: 'Coba 3 subtest SKD gratis — tanpa daftar akun',
    link: '/tryout/free-trial',
  },
  {
    icon: Award,
    name: 'Leaderboard',
    desc: 'Lihat ranking nasional & posisimu',
    link: '/leaderboard/global',
  },
]

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navbar selalu di atas, transparan saat di hero, putih setelah scroll */}
      <Navbar transparent={true} />

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
          ══════════════════════════════════════════ */}
            <section className="relative h-screen min-h-[680px] max-h-[900px] w-full overflow-hidden pt-16 lg:pt-20">

        <img
          src="https://i.ibb.co.com/C3CMBX5V/Gemini-Generated-Image-7li55e7li55e7li5-1.png&auto=format&fit=crop"
          alt="Student preparing for CPNS exam"
          className="absolute inset-0 w-full h-full object-cover object-[70%_center]"
        />

        {/* Horizontal overlay: kiri gelap → kanan terang */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />

        {/* Vertical overlay: readability top & bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

        {/* Hero content */}
        <div className="relative z-20 h-full flex items-center">
          <div className="w-full max-w-7xl mx-auto px-8 sm:px-12 lg:pl-32 lg:pr-8">
            <div className="max-w-2xl" style={{ marginLeft: "24px" }}>

              <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.15] tracking-tight mb-8">
                We Make Tough CPNS Tests<br />
                Easy to Master
              </h1>

              <p className="text-white/95 text-lg sm:text-lg lg:text-xl font-light leading-[1.5] tracking-normal mb-12">
                Latihan SKD &amp; SKB lengkap<br />
                dengan ribuan soal terverifikasi
              </p>

              <button className="inline-flex items-center justify-center bg-[#ffc107] hover:bg-[#e0a800] text-[#212529] text-base tracking-wide min-w-[200px] h-11 py-5 rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl">
                Explore Our Tryouts
              </button>

            </div>
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — CATEGORIES GRID
          ══════════════════════════════════════════ */}
      <section className="bg-white py-24 md:py-32 lg:py-40">
        <div className="max-w-auto mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 lg:gap-x-16 xl:gap-x-20 gap-y-20 md:gap-y-24">

            {CATEGORIES.map(({ icon: Icon, name, desc, link }) => (
              <Link key={name} href={link} className="text-center group cursor-pointer flex flex-col items-center justify-center min-h-[280px]">

                <div className="flex justify-center mb-7">
                  <Icon
                    size={64}
                    strokeWidth={1.5}
                    className="text-[#007bff] transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <h3 className="text-xl font-medium text-[#343a40] mb-3">
                  {name}
                </h3>

                <p className="text-sm text-[#6c757d] font-light leading-relaxed mb-5 max-w-[240px] mx-auto">
                  {desc}
                </p>

                <span className="mt-2 inline-flex items-center text-[#007bff] text-sm font-medium hover:underline">
  Get Started <ChevronRight size={14} className="ml-1" />
</span>

              </Link>
            ))}

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
