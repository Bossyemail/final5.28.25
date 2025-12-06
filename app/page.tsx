"use client"

import { Hero } from "@/components/hero"
import { Why } from "@/components/why"
import { UseCaseGrid } from "@/components/use-case-grid"
import { Process } from "@/components/process"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { TeamPricing } from "@/components/team-pricing"
import { Comparison } from "@/components/comparison"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { About } from "@/components/about"
import { Footer } from "@/components/footer"
import { FinalCTA } from "@/components/final-cta"
import { ScrollProgress } from "@/components/scroll-progress"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.replace("#", ""))
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollProgress />
      <main className="flex-1 relative">
        <Hero />
        <Why />
        <UseCaseGrid />
        <Process />
        <section id="features">
          <Features />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
        <TeamPricing />
        <Comparison />
        <Testimonials />
        <FAQ />
        <About />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  )
}
