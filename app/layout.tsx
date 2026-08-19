import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sajjad Ali Shah — AI Engineer & Data Scientist",
  description:
    "AI Engineer and Data Scientist with 1+ year of experience in Machine Learning, Deep Learning, NLP, Computer Vision, and LLM/RAG solutions. Building scalable, production-ready AI systems.",
  keywords: [
    "AI Engineer",
    "Data Scientist",
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "Computer Vision",
    "LLM",
    "RAG",
    "Python",
    "LangChain",
    "TensorFlow",
    "Portfolio",
  ],
  authors: [{ name: "Sajjad Ali Shah" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Sajjad Ali Shah — AI Engineer & Data Scientist",
    description:
      "Building scalable AI systems and data pipelines that turn complex data into actionable business insights.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-body`}
      >
        {children}
      </body>
    </html>
  )
}
