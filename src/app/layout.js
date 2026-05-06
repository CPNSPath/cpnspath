import "./globals.css";

import { Poppins, Inter } from "next/font/google"
import Script from "next/script"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500","600","700"]
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400","500"]
})

export const metadata = {
  title: "CPNS Path — Master Your CPNS Preparation",
  description: "Platform tryout CPNS terlengkap. Latihan SKD (TWK, TIU, TKP) & SKB dengan ribuan soal & analisis hasil mendalam.",
  keywords: [
    "CPNS", "tryout CPNS", "latihan soal CPNS", "SKD", "SKB",
    "TWK", "TIU", "TKP", "CAT BKN", "simulasi CAT", "persiapan CPNS",
    "belajar CPNS", "soal CPNS online",
  ],
  openGraph: {
    title: "CPNS Path — Master Your CPNS Preparation",
    description: "Platform tryout CPNS terlengkap. Latihan SKD (TWK, TIU, TKP) & SKB dengan ribuan soal & analisis hasil mendalam.",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        {/* 🔥 INI YANG PALING PENTING */}
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="afterInteractive"
        />

        {children}
      </body>
    </html>
  );
}