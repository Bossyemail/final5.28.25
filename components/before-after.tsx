"use client"

import { motion } from "framer-motion"

export function BeforeAfter() {
  return (
    <section className="w-full py-16 md:py-24 text-black dark:text-white bg-white dark:bg-[#161616] relative transition-colors">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-[#ABABAB] dark:text-[#ABABAB] uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
            PROOF BY CONTRAST
          </p>
          <h2 className="display-6 sm:display-7 md:display-8 mb-4 text-black dark:text-white" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
            Here's What You're Replacing
          </h2>
        </motion.div>

        {/* Before/After Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Before */}
          <motion.div
            className="border border-[#E3E3E3] dark:border-[#292929] p-6 md:p-8 bg-[#FBFBFB] dark:bg-[#1a1a1a]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="display-5 text-[#161616] dark:text-white mb-4 font-medium" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
              Before BossyEmail
            </h3>
            <div className="bg-white dark:bg-[#161616] border border-[#E3E3E3] dark:border-[#292929] p-6 mb-4">
              <p className="paragraph-default text-[#505050] dark:text-[#ABABAB] italic" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                "Hi, just checking if you got the documents? Let me know."
              </p>
            </div>
            <p className="paragraph-small text-[#ABABAB] dark:text-[#ABABAB]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
              (10 minutes rewriting. Uncertain tone.)
            </p>
          </motion.div>

          {/* After */}
          <motion.div
            className="border border-[#161616] dark:border-white p-6 md:p-8 bg-white dark:bg-[#161616] relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="display-5 text-[#161616] dark:text-white mb-4 font-medium" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
              After BossyEmail
            </h3>
            <div className="bg-[#FBFBFB] dark:bg-[#1a1a1a] border border-[#E3E3E3] dark:border-[#292929] p-6 mb-4">
              <p className="paragraph-default text-[#505050] dark:text-[#ABABAB]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                "Hi [Name],
                <br /><br />
                Following up on [issue] as we need an answer before the end of the day. Please confirm receipt on your end so we can proceed.
                <br /><br />
                Thank you."
              </p>
            </div>
            <p className="paragraph-small text-[#ABABAB] dark:text-[#ABABAB]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
              (Generated in 10 seconds. Professional. Clean.)
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
