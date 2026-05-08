import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import Card from "@/components/ui/Card"
import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"

const CATEGORIES = [
  {
    href: "/price/satuan",
    icon: "📝",
    title: "Paket Satuan",
    desc: "Latihan tryout satuan sesuai kebutuhan, tanpa komitmen jangka panjang.",
    badge: null,
  },
  {
    href: "/price/bundling-5",
    icon: "🎯",
    title: "Bundling 5 TO",
    desc: "Latihan 5 tryout dengan harga hemat 20% dibanding beli satuan.",
    badge: { label: "MOST POPULAR", variant: "popular" },
  },
  {
    href: "/price/bundling-10",
    icon: "🏆",
    title: "Bundling 10 TO",
    desc: "Latihan maksimal 10 tryout, hemat hingga 33% — terbaik untuk persiapan serius.",
    badge: { label: "BEST VALUE", variant: "accent" },
  },
]

export default function PricePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <section className="bg-[#172554] py-12 sm:py-16">
        <Container>
          <div className="text-center">
            <h1 className="heading-1 text-white mb-3">Choose Your Package</h1>
            <p className="body-base text-[#93C5FD]">
              Pilih paket tryout yang sesuai kebutuhan &amp; budgetmu
            </p>
          </div>
        </Container>
      </section>

      <Section variant="default" className="flex-1">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {CATEGORIES.map(({ href, icon, title, desc, badge }) => (
              <div key={href} className="relative pt-4">
                {badge && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                  </div>
                )}
                <Link href={href} className="block h-full">
                  <Card
                    variant={badge?.variant === "popular" ? "feature" : "default"}
                    className="p-6 h-full flex flex-col items-center text-center"
                  >
                    <div className="text-4xl mb-4" aria-hidden="true">{icon}</div>
                    <h2 className="heading-3 text-[#0F172A] mb-2">{title}</h2>
                    <p className="body-small text-[#64748B] mb-6">{desc}</p>
                    <div className="mt-auto">
                      <Button
                        variant={badge?.variant === "popular" ? "primary" : "outline"}
                        size="sm"
                        as="span"
                      >
                        Lihat Paket →
                      </Button>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
