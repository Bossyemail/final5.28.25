"use client"

import { FileText, Settings, Sparkles } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TryGeneratorCTA } from "./try-generator-cta"
import { useRef } from "react"

const steps = [
  {
    icon: FileText,
    title: "Identifies the scenario",
    description: "BossyEmail recognizes the situation and selects the right template."
  },
  {
    icon: Settings,
    title: "Writes the email for you",
    description: "Generates complete, professional emails tailored to your specific needs."
  },
  {
    icon: Sparkles,
    title: "Keeps the tone professional",
    description: "Every email maintains the right tone — professional, clear, and effective."
  }
]

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Subtle parallax for icons
  const icon1Y = useTransform(scrollYProgress, [0, 1], [0, -20])
  const icon2Y = useTransform(scrollYProgress, [0, 1], [0, -30])
  const icon3Y = useTransform(scrollYProgress, [0, 1], [0, -20])

  return (
    <section ref={sectionRef} id="process" className="py-16 md:py-24 text-black bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm text-[#ABABAB] uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
            THE MECHANISM
          </p>
          <h2 className="display-6 sm:display-7 md:display-8 mb-4 text-black" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
            It's Not About AI. It's About Predictability.
          </h2>
          <div className="max-w-2xl">
            <p className="paragraph-default text-[#505050] mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
              You don't need faster typing.
            </p>
            <p className="paragraph-default text-[#505050] mb-6" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
              You need the right words on the first try.
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#E3E3E3] mb-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="border-b border-r border-[#E3E3E3] p-6 md:p-8 flex flex-col hover:bg-[#FBFBFB] transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -2 }}
            >
              <h3 className="display-4 text-[#161616] mb-4 font-medium" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
                {step.title}
              </h3>
              <p className="paragraph-default text-[#505050] mb-6 flex-grow" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                {step.description}
              </p>
              <motion.div 
                className="w-12 h-12 border border-[#161616] rounded-none flex items-center justify-center mt-auto"
                style={{
                  y: index === 0 ? icon1Y : index === 1 ? icon2Y : icon3Y
                }}
              >
                <step.icon className="w-6 h-6 text-[#161616]" />
              </motion.div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mb-8 space-y-2">
          <p className="paragraph-default text-[#505050] font-medium" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            No blank page.
          </p>
          <p className="paragraph-default text-[#505050] font-medium" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            No guesswork.
          </p>
          <p className="paragraph-default text-[#505050] font-medium" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            Just results.
          </p>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
