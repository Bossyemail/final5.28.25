"use client"

import { ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

// Animated counter component
function AnimatedCounter({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        
        setCount(Math.floor(progress * end))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export function FinalCTA() {
  return (
    <section className="py-16 md:py-24 pb-32 md:pb-40 text-black bg-white relative">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <p className="text-sm text-[#ABABAB] uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
            GET STARTED
          </p>
          <h2 
            className="display-6 sm:display-7 md:display-8 mb-4 text-black"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}
          >
            Generate your first 3 emails free
          </h2>
          <p 
            className="paragraph-default text-[#505050] max-w-2xl mx-auto mb-8"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}
          >
            No credit card. No learning curve. Just clear, professional communication — instantly.
          </p>
        </motion.div>
        
        <motion.div 
          className="mb-16 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.a
            href="#pricing"
            className="bg-[#161616] hover:bg-[#292929] text-white text-sm font-medium px-8 py-4 rounded-none transition-all duration-300 uppercase tracking-wide inline-flex items-center gap-2 group h-12"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            GENERATE MY FIRST EMAIL
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
          </motion.a>
          <motion.a
            href="#video-demo"
            className="bg-white hover:bg-[#FBFBFB] text-black border border-[#161616] text-sm font-medium px-8 py-4 rounded-none transition-all duration-300 uppercase tracking-wide inline-flex items-center gap-2 group h-12"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            SEE LIVE DEMO
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
          </motion.a>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div 
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="display-10 mb-3" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.15em', color: 'var(--accent-1)' }}>
              <AnimatedCounter end={5} duration={1.5} suffix="s" />
            </div>
            <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>Average Generation Time</p>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
          >
        <div className="display-10 mb-3" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.15em', color: 'var(--accent-1)' }}>
          <AnimatedCounter end={300} duration={2} suffix="+" />
        </div>
        <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>Professional Email Templates</p>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <div className="display-10 mb-3" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.15em', color: 'var(--accent-1)' }}>
              <AnimatedCounter end={98} duration={1.8} suffix="%" />
            </div>
            <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>Customer Satisfaction Rate</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
