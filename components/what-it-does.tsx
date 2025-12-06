"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const benefits = [
  "The right structure",
  "The right tone",
  "The right level of firmness",
  "Real-estate-specific logic built in",
  "300+ templates",
  "Polished, professional, deal-saving messaging"
]

export function WhatItDoes() {
  return (
    <section className="w-full py-16 md:py-24 text-black bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="display-6 sm:display-7 md:display-8 mb-6 text-black" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
            BossyEmail generates the exact real estate email you need — any scenario, any time.
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="paragraph-large text-[#161616] mb-8 text-center font-medium" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500, lineHeight: '1.5em' }}>
            You get:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="border border-[#E3E3E3] rounded-none p-4 bg-white hover:border-[#ABABAB] transition-all duration-200 h-full flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="w-5 h-5 border border-[#E3E3E3] rounded-none flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#161616]" strokeWidth={2} />
                  </div>
                  <p className="paragraph-default text-[#161616] flex-1" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em', fontWeight: 400 }}>{benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="paragraph-large text-[#161616] font-medium" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500, lineHeight: '1.5em' }}>
            No guesswork. No prompting. No generic AI fluff.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

