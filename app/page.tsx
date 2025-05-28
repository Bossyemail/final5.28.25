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

export function CredibilitySection() {
  return (
    <section className="w-full pt-0 pb-8 px-0 mt-8 md:mt-16">
      <div className="w-full flex flex-col items-center">
        {/* 5 Stars */}
        <div className="flex gap-0.5 mb-2 animate-fade-in">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-7 h-7 text-black"
              fill="currentColor"
            />
          ))}
        </div>
        {/* Main Statement */}
        <h3 className="text-xl md:text-2xl font-bold text-center text-black mb-1 animate-fade-in">
          Built by a Real Estate Pro, Not a Tech Bro
        </h3>
        {/* Divider */}
        <div className="w-16 h-0.5 bg-gradient-to-r from-black to-zinc-400 opacity-70 my-2 animate-divider-grow" />
        
        {/* Feature Bullets - News Ticker */}
        <div className="relative w-full overflow-x-hidden py-2 mt-0.5">
          <div className="animate-ticker whitespace-nowrap flex items-center gap-24 text-black font-medium text-base md:text-lg">
            {[...Array(2)].map((_, repeatIdx) => (
              <>
                <span className="inline-flex items-center gap-0" key={`template-${repeatIdx}`}>
                  <span className="mx-2"><CheckCircle className="w-5 h-5 text-[#734b6d]" /></span>
                  100+ pre-written templates
                </span>
                <span className="inline-flex items-center gap-0" key={`agents-${repeatIdx}`}>
                  <span className="mx-2"><CheckCircle className="w-5 h-5 text-[#734b6d]" /></span>
                  Works for agents and TCs
                </span>
                <span className="inline-flex items-center gap-0" key={`prompts-${repeatIdx}`}>
                  <span className="mx-2"><CheckCircle className="w-5 h-5 text-[#734b6d]" /></span>
                  Real estate-specific prompts
                </span>
                <span className="inline-flex items-center gap-0" key={`writeslikeyou-${repeatIdx}`}>
                  <span className="mx-2"><CheckCircle className="w-5 h-5 text-[#734b6d]" /></span>
                  Writes like you — if you weren't tired
                </span>
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="w-full py-16 md:py-24 bg-gray-50 dark:bg-zinc-900 flex items-center justify-center font-sans">
      <div className="max-w-2xl w-full flex flex-col items-center text-center px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4">Ready to stop rewriting the same email 12 times?</h2>
        <p className="text-lg md:text-xl text-black/80 mb-8">Start your free trial and let BossyEmail do the talking.</p>
        <a
          href="#"
          className="inline-block rounded-full bg-gradient-to-r from-[#42275a] to-[#734b6d] text-white font-bold px-10 py-4 text-lg shadow-lg hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Just Try It.
        </a>
      </div>
    </section>
  );
}
