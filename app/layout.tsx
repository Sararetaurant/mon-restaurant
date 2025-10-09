import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Le Jardin - Restaurant Gastronomique Paris | Menu & Réservation",
  description: "Restaurant étoilé au cœur de Paris. Cuisine française raffinée par notre chef étoilé. Découvrez notre menu et réservez votre table en ligne.",
  keywords: "restaurant Paris, gastronomique, chef étoilé, cuisine française, réservation restaurant Paris",
  openGraph: {
    title: "Le Jardin - Restaurant Gastronomique Paris",
    description: "Restaurant étoilé au cœur de Paris. Cuisine française raffinée dans un cadre élégant.",
    images: ["/elegant-restaurant-interior-with-warm-lighting-and.jpg"],
    url: "https://mon-restaurant-lac.vercel.app/",
    type: "website",
  },
  robots: "index, follow",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <head>
             <meta name="google-site-verification" content="O0dK_6mhNGrdZ2Y1tdImrVJReV5QM5jgx99wXfPBtFg" />
      </head>
      <body className="font-sans">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}