"use client"

import { motion } from "framer-motion"
import { TryGeneratorCTA } from "./try-generator-cta"

export function RiskReversal() {
  return (
    <section className="w-full py-16 md:py-24 text-black dark:text-white bg-white dark:bg-[#161616] relative transition-colors">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-[#ABABAB] dark:text-[#ABABAB] uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
            RISK REVERSAL
          </p>
          <h2 className="display-6 sm:display-7 md:display-8 mb-4 text-black dark:text-white" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
            Try It on Real Deals — Risk Free
          </h2>
          <p className="paragraph-default text-[#505050] dark:text-[#ABABAB] max-w-2xl mx-auto mb-6" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            Start your 14-day free trial.
          </p>
          <p className="paragraph-default text-[#505050] dark:text-[#ABABAB] max-w-2xl mx-auto mb-6" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            Use BossyEmail on live transactions.
          </p>
          <p className="paragraph-default text-[#505050] dark:text-[#ABABAB] max-w-2xl mx-auto mb-8" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            If it doesn't save you time, cancel — no questions asked.
          </p>
          <p className="paragraph-default text-[#505050] dark:text-[#ABABAB] max-w-2xl mx-auto mb-8 font-medium" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            Risk is on us.
          </p>
          
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <TryGeneratorCTA 
              label="Start 14-Day Free Trial →" 
              className="bg-[#161616] dark:bg-white hover:bg-[#292929] dark:hover:bg-[#FBFBFB] text-white dark:text-[#161616] text-sm font-medium px-8 py-4 rounded-none transition-all duration-300 uppercase tracking-wide inline-flex items-center gap-2 h-12 whitespace-nowrap group hover:scale-[1.02]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
