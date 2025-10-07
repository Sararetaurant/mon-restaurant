import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

<head>
<meta name="google-site-verification" content="VZZpgzpJmjznTn-Ts_H7dVyKYthkNT55QR3McbZcKLg" />
</head>



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Le Jardin - Restaurant Gastronomique Paris",
  description:
    "Restaurant gastronomique étoilé au cœur de Paris. Découvrez une cuisine française raffinée dans un cadre élégant et chaleureux.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="font-sans">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
