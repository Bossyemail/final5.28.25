"use client"

import { Hero, SocialProofAndTestimonials } from "@/components/hero"
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
import { FinalCTA } from "@/components/credibility-section"
import { motion } from "framer-motion"

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
        <SocialProofAndTestimonials />
        <section className="w-full pt-16 md:pt-24 border-b border-zinc-100">
          <div className="max-w-4xl mx-auto px-4 md:px-6 flex flex-col items-center text-center">
            <h2 className="text-2xl sm:text-3xl font-normal mb-4 sm:mb-6 text-black" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              Built by a Real Estate Pro,<br />
              <span className="block">Not a Tech Bro.</span>
            </h2>
            <p className="text-center mb-10 sm:mb-14 text-sm sm:text-base" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, color: '#000' }}>
              Made for the Whole Deal-Making Crew. If your job involves contracts, clients, or chaos,<br />
              <span>This tool was built with you in mind. BossyEmail is ideal for:</span>
            </p>
          </div>
          {/* Bleeding pastel shapes row */}
          <motion.div
            className="flex w-full z-10"
            style={{ height: '240px', pointerEvents: 'none' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
              visible: { transition: { staggerChildren: 0.13 } },
              hidden: {}
            }}
          >
            {[
              { color: '#EFE1E1', label: "Agents" },
              { color: '#F0D2DA', label: "TC's" },
              { color: '#E0C1C6', label: "Brokerages" },
              { color: '#D1B4C6', label: "Lenders" },
              { color: '#CBC4D6', label: "Closers" },
            ].map(({ color, label }, i) => (
              <motion.div
                key={i}
                className="flex-1 flex flex-col items-center justify-end relative"
                style={{ height: '100%', minWidth: 0 }}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } }
                }}
                whileHover={{
                  y: -10,
                  scale: 1.04,
                  boxShadow: '0 8px 32px 0 rgba(80, 60, 80, 0.16)'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div
                  className="w-full h-[240px] flex items-end justify-center"
                  style={{ background: color, borderRadius: 0, borderLeft: '1px solid #232326', borderRight: '1px solid #232326', borderTop: '2px solid #232326', borderBottom: '2px solid #232326', boxShadow: '0 2px 12px 0 rgba(80, 60, 80, 0.08)' }}
                >
                  <span className="mb-6 text-zinc-700 text-sm sm:text-lg font-medium" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>{label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
        <section id="features">
        <Features />
        </section>
        <Why />
        <section id="pricing">
        <Pricing />
        </section>
        <FAQ />
        <Process />
        <About />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  )
}
