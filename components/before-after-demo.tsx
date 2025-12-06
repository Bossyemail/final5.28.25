"use client"

import { motion } from "framer-motion"
import { TryGeneratorCTA } from "./try-generator-cta"
import { ArrowRight } from "lucide-react"

export function BeforeAfterDemo() {
  return (
    <section className="w-full py-16 md:py-24 text-black bg-white relative">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="display-6 sm:display-7 md:display-8 mb-6 text-black" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
            See the difference<br />(Before → After)
          </h2>
        </motion.div>

        {/* Before/After Comparison */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* BEFORE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#FBFBFB] border border-[#E3E3E3] rounded-none p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-none"></div>
                <h3 className="paragraph-default text-red-600" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, letterSpacing: '-0.02em' }}>BEFORE</h3>
              </div>
              <div className="bg-white rounded-none p-6 border border-[#E3E3E3]">
                <p className="paragraph-default text-[#505050] italic" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                  "Hi, I don't know if you got my last email but we really need that addendum asap. Please advise. Thanks."
                </p>
              </div>
            </div>
          </motion.div>

          {/* AFTER */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#FBFBFB] border border-[#86C5A8] rounded-none p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-[#86C5A8] rounded-none"></div>
                <h3 className="paragraph-default text-[#86C5A8]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, letterSpacing: '-0.02em' }}>AFTER (BossyEmail)</h3>
              </div>
              <div className="bg-white rounded-none p-6 border border-[#86C5A8]/30">
                <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                  "Hi Sarah, following up on the credit addendum. Once we receive it, we'll be able to finalize the inspection timeline and keep the closing on track.
                  <br /><br />
                  Please advise when we can expect it, so we can avoid delays. Thank you!"
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <TryGeneratorCTA 
            label="Try It With Your Own Email — Free" 
          />
        </motion.div>
      </div>
    </section>
  )
}

