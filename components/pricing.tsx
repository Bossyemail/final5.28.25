"use client"

import { Button } from "@/components/ui/button"
import { TrialButton } from "@/components/trial-button"
import { ArrowRight, X, Star, Check } from "lucide-react"
import { motion } from "framer-motion"

const liteFeatures = [
  "AI Email Generator",
  "300+ real-estate templates",
  "Tone control",
  "Generate 3 emails free to start",
  "Email history",
  "Mobile-friendly workflow"
]

const royaltyFeatures = [
  "Unlimited generated emails",
  "Deal-context logic",
  "Offer package builder",
  "Saved styles & signatures",
  "Priority support"
]

export function Pricing() {

  return (
    <section className="w-full py-16 md:py-24 text-black bg-white relative">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-[#ABABAB] uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
            PRICING
          </p>
          <h2 className="display-6 sm:display-7 md:display-8 mb-4 text-black" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
            Simple, transparent pricing
          </h2>
          <p className="paragraph-default text-[#505050] max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            Start free. Upgrade only if you love clarity, sanity, and faster closings.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          {/* Lite */}
          <motion.div 
            className="bg-[#FBFBFB] rounded-none border border-[#CBC4D6] p-6 md:p-8 flex flex-col gap-6 hover:border-[#CBC4D6] hover:shadow-[0_0_30px_rgba(203,196,214,0.15)] transition-all duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -3, scale: 1.01 }}
          >
            <div>
              <h3 className="display-5 text-[#161616] mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>Lite</h3>
              <div className="text-left mb-4">
                <span className="display-8 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, letterSpacing: '-0.02em' }}>$29</span>
                <span className="paragraph-default text-[#505050] ml-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>/month</span>
              </div>
              <p className="paragraph-default text-[#505050] mb-6" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                Perfect for solo agents & new TCs
              </p>
              <p className="paragraph-small text-[#505050] mb-6" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                Includes:
              </p>
            </div>
            <div>
              <ul className="space-y-3 mb-6 text-left">
                {liteFeatures.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent-1)' }} />
                    <span className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#pricing"
              className="w-full bg-[#161616] dark:bg-white hover:bg-[#292929] dark:hover:bg-[#FBFBFB] text-white dark:text-[#161616] text-sm font-medium px-8 py-4 rounded-none transition-all duration-200 uppercase tracking-wide inline-flex items-center justify-center gap-2 mt-auto group h-12"
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
            >
              START FREE
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45" />
            </a>
          </motion.div>

          {/* Royalty */}
          <motion.div 
            className="bg-[#FBFBFB] rounded-none border p-6 md:p-8 relative transition-all duration-300 group"
            style={{ borderColor: 'var(--accent-1)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 40px var(--accent-1-20)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -3, scale: 1.01 }}
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-black px-4 py-1 rounded-none text-sm font-medium" style={{ backgroundColor: 'var(--accent-1)' }}>
              Most Popular
            </div>
            <div>
              <h3 className="display-5 text-[#161616] mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>Royalty</h3>
              <div className="text-left mb-4">
                <span className="display-8 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, letterSpacing: '-0.02em' }}>$39</span>
                <span className="paragraph-default text-[#505050] ml-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>/month</span>
              </div>
              <p className="paragraph-default text-[#505050] mb-6" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                For agents who want to sound like a 10-year pro
              </p>
            </div>
            <div>
              <p className="paragraph-small font-medium text-[#505050] mb-4" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>Everything in Lite, plus:</p>
              <ul className="space-y-3 mb-6 text-left">
                {royaltyFeatures.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent-1)' }} />
                    <span className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#pricing"
              className="w-full bg-[#161616] dark:bg-white hover:bg-[#292929] dark:hover:bg-[#FBFBFB] text-white dark:text-[#161616] text-sm font-medium px-8 py-4 rounded-none transition-all duration-200 uppercase tracking-wide inline-flex items-center justify-center gap-2 mt-auto group h-12"
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
            >
              START FREE
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45" />
            </a>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a
            href="#pricing"
            className="bg-[#161616] dark:bg-white hover:bg-[#292929] dark:hover:bg-[#FBFBFB] text-white dark:text-[#161616] text-sm font-medium px-8 py-4 rounded-none transition-all duration-200 uppercase tracking-wide inline-flex items-center gap-2 mb-4 group h-12"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
          >
            GENERATE MY FIRST EMAIL — FREE
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45" />
          </a>
          <p className="paragraph-small text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            Cancel anytime. No contracts. No BS.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
