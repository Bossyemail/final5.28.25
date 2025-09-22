"use client"

import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { Footer } from "@/components/footer"
import { FAQ } from "@/components/faq"
import { CredibilityBanner } from "@/components/credibility-banner"
import { Why } from "@/components/why"
import { About } from "@/components/about"
import { Star, CheckCircle } from "lucide-react"
import { useEffect } from "react"
import { FinalCTA } from "@/components/final-cta"
import { Contact } from "@/components/contact"
import { CustomCursor } from "@/components/custom-cursor"
import { motion } from "framer-motion"

export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.replace("#", ""))
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900">
      <CustomCursor />
      <main className="flex-1 relative">
        {/* Global light splashes */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D1B4C6]/8 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-[#D1B4C6]/6 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-white/4 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#D1B4C6]/5 rounded-full blur-3xl opacity-45"></div>
        </div>
        <Hero />
        <section id="features">
          <Features />
        </section>
        <Why />
        <section id="pricing">
          <Pricing />
        </section>
        <FAQ />
        <About />
        <section id="contact">
          <Contact />
        </section>
        <FinalCTA />
        <Footer />
      </main>
    </div>
  )
}
