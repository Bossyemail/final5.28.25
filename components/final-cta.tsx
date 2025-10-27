"use client"

import { ArrowUpRight } from "lucide-react"
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
    <section className="py-16 md:py-24 text-white relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D1B4C6]/12 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#D1B4C6]/10 rounded-full blur-3xl"></div>
      {/* Additional light source */}
      <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-white/6 rounded-full blur-3xl"></div>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-white leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Ready to Stop Typing the Same Email<br />47 Times?
        </motion.h2>
        <motion.p 
          className="text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Join hundreds of real estate professionals who've already saved hours every week with BossyEmail. Your inbox (and your sanity) will thank you.
        </motion.p>
        
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a
            href="#pricing"
            className="bg-[#D1B4C6] hover:bg-[#C4A7B9] text-black px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 hover:shadow-[0_0_20px_rgba(209,180,198,0.4)] active:scale-95"
          >
            Get Started
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl sm:text-6xl font-bold text-[#D1B4C6] mb-3">
              <AnimatedCounter end={5} duration={1.5} suffix="s" />
            </div>
            <p className="text-base text-zinc-400">Average Generation Time</p>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl sm:text-6xl font-bold text-[#D1B4C6] mb-3">
              <AnimatedCounter end={320} duration={2} suffix="+" />
            </div>
            <p className="text-base text-zinc-400">Professional Email Templates</p>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl sm:text-6xl font-bold text-[#D1B4C6] mb-3">
              <AnimatedCounter end={98} duration={1.8} suffix="%" />
            </div>
            <p className="text-base text-zinc-400">Customer Satisfaction Rate</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
