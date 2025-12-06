"use client"

import { FileText, Settings, Sparkles } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TryGeneratorCTA } from "./try-generator-cta"
import { useRef } from "react"

const steps = [
  {
    icon: FileText,
    title: "Pick your scenario",
    description: "Choose from 200+ common (and insane) real estate situations."
  },
  {
    icon: Settings,
    title: "Add quick details",
    description: "Names, address, timeline, what's happening."
  },
  {
    icon: Sparkles,
    title: "Get a complete, professional real estate email — instantly",
    description: "Copy. Paste. Send. Look like the agent who has their sh*t together."
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
            PROCESS
          </p>
          <h2 className="display-6 sm:display-7 md:display-8 mb-4 text-black" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
            How BossyEmail turns chaos into clarity
          </h2>
          <p className="paragraph-default text-[#505050] max-w-2xl" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            Three simple steps to transform messy, uncertain situations into clear, professional communication.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#E3E3E3]">
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
