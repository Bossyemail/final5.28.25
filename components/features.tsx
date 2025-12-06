"use client"

import { motion } from "framer-motion"
import { Sparkles, FileText, Settings, Brain, FileCheck, User } from "lucide-react"
import { TryGeneratorCTA } from "./try-generator-cta"

const features = [
  {
    icon: Sparkles,
    title: "AI Email Generator (Real-Estate Fluent)",
    description: "Generates complete, deal-specific emails — not generic AI fluff."
  },
  {
    icon: FileText,
    title: "300+ Real Estate Templates",
    description: "Offers, inspection issues, appraisal problems, HOA delays, lender chases, client updates — you name it."
  },
  {
    icon: Brain,
    title: "Deal-Context Logic",
    description: "BossyEmail writes differently depending on where you are in the transaction."
  },
  {
    icon: Settings,
    title: "Tone Control",
    description: "Professional, firm, friendly, neutral, or \"TC magic.\""
  },
  {
    icon: FileCheck,
    title: "Offer Package Builder",
    description: "Creates polished, agent-friendly offer emails automatically."
  },
  {
    icon: User,
    title: "Saved Styles & Signatures",
    description: "Your tone. Your brand. One click."
  }
]

export function Features() {
  return (
    <section className="w-full py-16 md:py-24 text-black bg-white relative">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <p className="text-sm text-[#ABABAB] uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
              FEATURES
            </p>
            <h2 className="display-6 sm:display-7 md:display-8 mb-4 text-black" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
              Everything you need to communicate like a pro
            </h2>
            <p className="paragraph-default text-[#505050] max-w-2xl" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
              Powerful tools designed specifically for real estate professionals who want to communicate with confidence.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#E3E3E3] mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="border-b border-r border-[#E3E3E3] p-6 md:p-8 flex flex-col relative min-h-[240px] hover:bg-[#FBFBFB] transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -2 }}
            >
              {/* Icon in top right */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8">
                <div className="w-12 h-12 border border-[#161616] rounded-none flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-[#161616]" />
                </div>
              </div>
              
              {/* Content */}
              <div className="pr-16 flex-1 flex flex-col">
                <h3 className="display-4 text-[#161616] mb-4 font-medium" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
                  {feature.title}
                </h3>
                <p className="paragraph-default text-[#505050] flex-grow" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <TryGeneratorCTA 
            label="Generate My First Email — Free" 
          />
        </motion.div>
      </div>
    </section>
  )
}
