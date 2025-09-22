"use client"

import { ArrowUpRight } from "lucide-react"

export function Why() {
  return (
    <section id="why" className="w-full py-16 md:py-24 text-white relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D1B4C6]/10 rounded-full blur-3xl"></div>
      {/* Additional light source */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/6 rounded-full blur-2xl"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            <div className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              <div>WHY BossyEmail</div>
              <div>EXISTS</div>
            </div>
          </h2>
          <p className="text-base text-zinc-300 max-w-2xl leading-relaxed mb-8">
            Every deal lives or dies on communication. The agents who win aren't just the hardest workers—they're the clearest communicators. BossyEmail helps you show up sharp, fast, and professional in every inbox, so your clients trust you, your colleagues respect you, and your pipeline never clogs.
          </p>
          <a
            href="#pricing"
            className="bg-[#D1B4C6] hover:bg-[#C4A7B9] text-black px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 hover:shadow-[0_0_20px_rgba(209,180,198,0.4)] active:scale-95"
          >
            Get Started
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
} 