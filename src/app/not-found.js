import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Section from "@/components/ui/Section"
import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <Section variant="default" className="flex-1 flex items-center justify-center">
        <Container>
          <div className="text-center max-w-md mx-auto">
            <p className="text-8xl font-bold text-[#1E3A8A] leading-none mb-4">404</p>
            <h1 className="heading-2 text-[#0F172A] mb-3">Page Not Found</h1>
            <p className="body-base text-[#64748B] mb-8">
              Halaman yang kamu cari tidak ditemukan atau sudah dipindahkan.
            </p>
            <Link href="/">
              <Button variant="primary">Back to Home</Button>
            </Link>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  )
}
