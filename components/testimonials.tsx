"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Star } from "lucide-react"
import { TryGeneratorCTA } from "./try-generator-cta"
import { useRef } from "react"

const testimonials = [
  {
    quote: "BossyEmail helps me find the words when I need them most.",
    author: "Jessica, Compass",
    rating: 5
  },
  {
    quote: "My clients think I'm super organized. It's BossyEmail.",
    author: "Aaron, KW",
    rating: 5
  },
  {
    quote: "Every TC should be using this. Non-negotiable.",
    author: "Tasha, Coldwell Banker",
    rating: 5
  }
]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Subtle scale effect for cards
  const card1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
  const card2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
  const card3Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 text-black bg-white relative">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-[#ABABAB] uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
            RESULTS
          </p>
          <h2 className="display-6 sm:display-7 md:display-8 mb-4 text-black" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
            Trusted by agents, teams, and TCs who demand clarity
          </h2>
          <p className="paragraph-default text-[#505050] max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            Real feedback from professionals who upgraded their communication and closed smoother deals.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {testimonials.map((testimonial, index) => {
              // Use Accent 2 for middle testimonial for visual balance
              const useAccent2 = index === 1
              return (
              <motion.div
                key={index}
                className="bg-[#FBFBFB] border border-[#E3E3E3] rounded-none p-6 md:p-8 transition-all duration-300"
                style={{
                  '--hover-border': useAccent2 ? 'var(--accent-2-30)' : 'var(--accent-1-30)',
                  '--hover-shadow': useAccent2 ? '0 0 25px var(--accent-2-20)' : '0 0 25px var(--accent-1-20)',
                  scale: index === 0 ? card1Scale : index === 1 ? card2Scale : card3Scale
                } as any}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = useAccent2 ? 'var(--accent-2-40)' : 'var(--accent-1-30)'
                  e.currentTarget.style.boxShadow = useAccent2 ? '0 0 25px var(--accent-2-20)' : '0 0 25px var(--accent-1-20)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E3E3E3'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -3, scale: 1.01 }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5" style={{ fill: useAccent2 ? 'var(--accent-2)' : 'var(--accent-1)', color: useAccent2 ? 'var(--accent-2)' : 'var(--accent-1)' }} />
                ))}
              </div>
              
              {/* Quote */}
              <p className="paragraph-default text-[#505050] mb-6" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <p className="paragraph-small text-[#505050] font-medium" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
                — {testimonial.author}
                </p>
              </motion.div>
            )
            })}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <TryGeneratorCTA 
            label="I Want Emails Like That — Try Free" 
          />
        </motion.div>
      </div>
    </section>
  )
}

