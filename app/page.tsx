"use client"

import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { Process } from "@/components/process"
import { Footer } from "@/components/footer"
import { FAQ } from "@/components/faq"
import { CredibilityBanner } from "@/components/credibility-banner"
import { Why } from "@/components/why"
import { About } from "@/components/about"
import { Star, CheckCircle } from "lucide-react"
import { useEffect } from "react"
import { CredibilitySection, FinalCTA } from "@/components/credibility-section"

export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.replace("#", ""))
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Hero />
        <CredibilitySection />
        <Features />
        <Pricing />
        <FAQ />
        <Process />
        <Why />
        <About />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  )
}
