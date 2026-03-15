import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Poppins, Inter } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500","600","700"]
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400","500"]
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CPNS Path",
  description: "Platform latihan CAT CPNS",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
