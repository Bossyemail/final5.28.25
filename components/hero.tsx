"use client"

import { Button } from "@/components/ui/button"
import { TrialButton } from "@/components/trial-button"
import { Star, CheckCircle, Bell, ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TryGeneratorCTA } from "./try-generator-cta"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useRef } from "react"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <section ref={sectionRef} className="relative text-black dark:text-white bg-white dark:bg-[#161616] pt-8 pb-20 lg:pb-32 overflow-x-hidden transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Headline */}
          <motion.div 
            className="mt-20 mb-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              y: textY,
              opacity: textOpacity
            }}
          >
            <h1 
              className="display-6 sm:display-7 md:display-8 mb-4 text-black dark:text-white" 
              style={{ 
                fontFamily: 'var(--font-inter-tight), sans-serif',
                fontWeight: 400,
                lineHeight: '1.25em',
                letterSpacing: '-0.02em'
              }}
            >
              Write Client-Ready Real Estate Emails<br />in 30 Seconds — Every Time
            </h1>
            <p 
              className="paragraph-default text-[#505050] dark:text-[#ABABAB] max-w-2xl mx-auto mb-6 font-normal" 
              style={{ 
                fontFamily: 'var(--font-inter-tight), sans-serif',
                fontWeight: 400,
                lineHeight: '1.5em'
              }}
            >
              Stop rewriting the same follow-ups, nudges, and deadline push-backs on every deal.
            </p>
            <p 
              className="paragraph-default text-[#505050] dark:text-[#ABABAB] max-w-2xl mx-auto mb-8 font-normal" 
              style={{ 
                fontFamily: 'var(--font-inter-tight), sans-serif',
                fontWeight: 400,
                lineHeight: '1.5em'
              }}
            >
              BossyEmail uses proven, scenario-specific templates tuned for real estate workflows — inspection issues, missing documents, unresponsive agents, and title delays — so you never start from a blank page again.
            </p>
            
            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <TryGeneratorCTA 
                label="Start 14-Day Free Trial →" 
                className="bg-[#161616] dark:bg-white hover:bg-[#292929] dark:hover:bg-[#FBFBFB] text-white dark:text-[#161616] text-sm font-medium px-8 py-4 rounded-none transition-all duration-300 uppercase tracking-wide inline-flex items-center gap-2 h-12 whitespace-nowrap group hover:scale-[1.02]"
              />
              <Link
                href="#video-demo"
                className="bg-white hover:bg-[#FBFBFB] text-black border border-[#161616] text-sm font-medium px-8 py-4 rounded-none transition-all duration-300 uppercase tracking-wide inline-flex items-center gap-2 h-12 whitespace-nowrap group hover:scale-[1.02]"
                style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
                onClick={(e) => {
                  e.preventDefault();
                  const videoElement = document.querySelector('video');
                  if (videoElement) {
                    videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => videoElement.play(), 500);
                  }
                }}
              >
                VIEW LIVE DEMO
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
              </Link>
            </motion.div>
            {/* Micro-Reassurance */}
            <motion.p 
              className="paragraph-small text-[#ABABAB] dark:text-[#ABABAB] text-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ 
                fontFamily: 'var(--font-inter-tight), sans-serif',
                fontWeight: 400,
                lineHeight: '1.5em'
              }}
            >
              No credit card required. Cancel anytime.
            </motion.p>
          </motion.div>

          {/* Trust Bar - Immediately Below Hero */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p 
              className="paragraph-small text-[#505050] font-normal mb-2"
              style={{ 
                fontFamily: 'var(--font-inter-tight), sans-serif',
                fontWeight: 400,
                lineHeight: '1.5em'
              }}
            >
              Trusted by agents, teams, and transaction coordinators across the U.S.
            </p>
            <p 
              className="paragraph-small text-[#ABABAB] font-normal"
              style={{ 
                fontFamily: 'var(--font-inter-tight), sans-serif',
                fontWeight: 400,
                lineHeight: '1.5em'
              }}
            >
              (Coldwell Banker • Compass • Keller Williams • EXP • Serhant)
            </p>
          </motion.div>

          {/* Live Demo Section */}
          <div className="max-w-6xl mx-auto mt-8 md:mt-16 relative">
            {/* Heading - Separate from parallax */}
            <motion.div 
              className="mb-8 md:mb-12 text-center relative z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 
                id="video-demo"
                className="display-6 sm:display-7 md:display-8 mb-4 text-black dark:text-white" 
                style={{ 
                  fontFamily: 'var(--font-inter-tight), sans-serif',
                  fontWeight: 400,
                  lineHeight: '1.25em',
                  letterSpacing: '-0.02em'
                }}
              >
                See It in Action
              </h2>
            </motion.div>
            
            {/* Video and Text Grid - With Parallax */}
            <motion.div 
              className="relative z-10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{
                y: videoY,
                opacity: videoOpacity
              }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative z-10">
                  {/* Main floating container */}
                  <div className="relative bg-white rounded-none border border-[#E3E3E3] shadow-lg">
                    
                    {/* Video content area */}
                    <div className="relative aspect-video rounded-none m-2 md:m-4 overflow-hidden">
                      <video 
                        className="w-full h-full object-cover rounded-none"
                        controls
                        preload="metadata"
                        poster="/og-image.png"
                      >
                        <source src="/bossyemail-vsl.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
                <div className="text-left relative z-10">
                  <p 
                    className="paragraph-default text-[#161616] dark:text-white mb-4 font-medium" 
                    style={{ 
                      fontFamily: 'var(--font-inter-tight), sans-serif',
                      fontWeight: 500,
                      lineHeight: '1.6em',
                      fontSize: '1.125rem'
                    }}
                  >
                    Pick a scenario → Generate the email → Send it.
                  </p>
                  <p 
                    className="paragraph-default text-[#505050] dark:text-[#ABABAB]" 
                    style={{ 
                      fontFamily: 'var(--font-inter-tight), sans-serif',
                      fontWeight: 400,
                      lineHeight: '1.6em',
                      fontSize: '1rem'
                    }}
                  >
                    Most users write their first email in under 30 seconds.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 