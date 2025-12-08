"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { TryGeneratorCTA } from "./try-generator-cta"

const comparisonData = [
  {
    feature: "Real-estate logic built in",
    bossyemail: true,
    chatgpt: false
  },
  {
    feature: "Knows deal stages",
    bossyemail: true,
    chatgpt: false
  },
  {
    feature: "300+ templates",
    bossyemail: true,
    chatgpt: false
  },
  {
    feature: "Tone formatted for agents/clients",
    bossyemail: true,
    chatgpt: false
  },
  {
    feature: "No prompts needed",
    bossyemail: true,
    chatgpt: false
  },
  {
    feature: "Output is immediately \"send ready\"",
    bossyemail: true,
    chatgpt: false
  }
]

export function Comparison() {
  return (
    <section className="w-full py-16 md:py-24 text-black dark:text-white bg-white dark:bg-[#161616] relative transition-colors">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-[#ABABAB] dark:text-[#ABABAB] uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
            COMPARE
          </p>
          <h2 className="display-6 sm:display-7 md:display-8 mb-4 text-black dark:text-white" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
            Why agents choose BossyEmail over generic AI tools
          </h2>
          <p className="paragraph-default text-[#505050] dark:text-[#ABABAB] max-w-2xl mx-auto mb-6" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            Purpose-built for real-estate communication — not general-purpose AI guesswork.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          className="overflow-x-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="bg-white dark:bg-[#1a1a1a] border border-[#E3E3E3] dark:border-[#292929] rounded-none overflow-hidden">
            <div className="grid grid-cols-3 gap-0">
              {/* Header Row */}
              <div className="bg-[#F3F3F3] dark:bg-[#292929] p-5 text-[#161616] dark:text-white border-b border-r border-[#E3E3E3] dark:border-[#292929] uppercase text-left" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500, letterSpacing: '-0.02em' }}>
                Feature
              </div>
              <div className="p-5 text-[#161616] dark:text-white border-b border-r border-[#E3E3E3] dark:border-[#292929] text-center uppercase" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500, letterSpacing: '-0.02em', backgroundColor: 'var(--accent-1-20)' }}>
                BossyEmail
              </div>
              <div className="bg-[#F3F3F3] dark:bg-[#292929] p-5 text-[#161616] dark:text-white border-b border-[#E3E3E3] dark:border-[#292929] text-center uppercase" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500, letterSpacing: '-0.02em' }}>
                ChatGPT
              </div>

              {/* Data Rows */}
              {comparisonData.map((row, index) => (
                <motion.div 
                  key={index} 
                  className="contents"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white dark:bg-[#1a1a1a] p-5 text-[#161616] dark:text-white border-b border-r border-[#E3E3E3] dark:border-[#292929] text-left" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400 }}>
                    {row.feature}
                  </div>
                  <div className="p-5 border-b border-r border-[#E3E3E3] dark:border-[#292929] flex items-center justify-center" style={{ backgroundColor: 'var(--accent-1-10)' }}>
                    {row.bossyemail === true ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                      >
                        <Check className="w-6 h-6" strokeWidth={2.5} style={{ color: 'var(--accent-1)' }} />
                      </motion.div>
                    ) : null}
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] p-5 border-b border-[#E3E3E3] dark:border-[#292929] flex items-center justify-center last:border-b-0">
                    {row.chatgpt === false ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                      >
                        <X className="w-6 h-6 text-red-600" strokeWidth={2.5} />
                      </motion.div>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <TryGeneratorCTA 
            label="GENERATE MY FIRST EMAIL — FREE" 
          />
        </motion.div>
      </div>
    </section>
  )
}

