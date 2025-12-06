"use client"

import { motion } from "framer-motion"

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 text-black bg-white relative">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="mb-12 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <p className="text-sm text-[#ABABAB] uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
            ABOUT
          </p>
          <h2 className="display-6 sm:display-7 md:display-8 mb-4 text-black" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
            Elevated communication for elevated real-estate professionals
          </h2>
          <p className="paragraph-default text-[#505050] mb-6" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            BossyEmail delivers polished, elevated messages that keep deals moving — with clarity, confidence, and concierge-level precision built in.
          </p>
        </motion.div>
        
        {/* Content */}
        <motion.div 
          className="max-w-4xl mx-auto text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="space-y-6">
            <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.6em' }}>
              BossyEmail is the communication advantage of top-tier real estate professionals.
            </p>
            <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.6em' }}>
              Built with precision and designed for speed, it generates elevated, concierge-level emails that match the standards of luxury buyers, sellers, and brokerages.
            </p>
            <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.6em' }}>
              In high-end real estate, the way you communicate is the way you're perceived.
            </p>
            <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.6em' }}>
              BossyEmail ensures every message you send reflects confidence, clarity, and complete control of the transaction — even on days when your calendar is stacked, your phone won't stop ringing, and the deal is moving faster than anyone expected.
            </p>
            <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.6em' }}>
              With over 300 curated templates and built-in deal logic, BossyEmail transforms complex situations into polished communication that feels intentional, effortless, and entirely on-brand.
            </p>
            <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.6em' }}>
              Whether you're guiding a discerning client, negotiating with a seasoned agent, or navigating the unpredictable rhythm of a luxury transaction, BossyEmail helps you show up as the most capable person in the room — every time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 