"use client"

import { Button } from "@/components/ui/button"
import { TrialButton } from "@/components/trial-button"
import { Star, CheckCircle, Bell, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { TryGeneratorCTA } from "./try-generator-cta"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative text-white pt-8 pb-20 lg:pb-32">
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D1B4C6]/15 rounded-full blur-3xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.1, 0.8], opacity: [0, 0.4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: 'transform, opacity' }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#D1B4C6]/12 rounded-full blur-3xl"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.2, 0.6], opacity: [0, 0.3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ willChange: 'transform, opacity' }}
      ></motion.div>
      {/* Additional light source */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.3, 0.5], opacity: [0, 0.2, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        style={{ willChange: 'transform, opacity' }}
      ></motion.div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Headline */}
          <motion.div 
            className="mt-16 mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              <div className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                <div>SMART EMAIL GENERATOR</div>
                <div>+ TEMPLATES FOR REAL ESTATE PROS</div>
              </div>
            </h1>
            <p className="text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Supercharge Your Workflow with an AI-Powered Email Assistant. Get the exact words to chase docs, put out fires and follow up like a pro - in seconds.
            </p>
            <a
              href="#pricing"
              className="bg-[#D1B4C6] hover:bg-[#C4A7B9] text-black px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 hover:shadow-[0_0_20px_rgba(209,180,198,0.4)] active:scale-95"
            >
              Get Started
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Video Placeholder - Floating in Void */}
          <motion.div 
            className="max-w-4xl mx-auto mt-8 md:mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative">
              {/* Void background layers for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40 rounded-3xl blur-2xl scale-125"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 via-transparent to-zinc-900/50 rounded-3xl blur-xl scale-110"></div>
              
              {/* Main floating container */}
              <div className="relative bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 rounded-2xl border border-zinc-700/30 backdrop-blur-sm shadow-[0_0_80px_rgba(0,0,0,0.9)] shadow-black/60">
                {/* Inner atmospheric glow */}
                <div className="absolute inset-2 bg-gradient-to-br from-[#D1B4C6]/8 via-transparent to-transparent rounded-xl"></div>
                
                {/* Video content area */}
                <div className="relative aspect-video rounded-xl m-2 md:m-4 overflow-hidden">
                  <video 
                    className="w-full h-full object-cover rounded-lg"
                    controls
                    preload="metadata"
                    poster="/og-image.png"
                  >
                    <source src="/bossyemail-vsl.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              
              {/* Floating atmospheric particles */}
              <motion.div 
                className="absolute -top-6 -left-6 w-3 h-3 bg-[#D1B4C6]/40 rounded-full blur-sm"
                animate={{ 
                  y: [0, -15, 0],
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              ></motion.div>
              <motion.div 
                className="absolute -bottom-8 -right-8 w-2 h-2 bg-[#D1B4C6]/50 rounded-full blur-sm"
                animate={{ 
                  y: [0, 12, 0],
                  opacity: [0.5, 0.9, 0.5],
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1.5
                }}
              ></motion.div>
              <motion.div 
                className="absolute top-1/3 -right-10 w-1.5 h-1.5 bg-[#D1B4C6]/60 rounded-full blur-sm"
                animate={{ 
                  x: [0, -8, 0],
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.4, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.8
                }}
              ></motion.div>
              <motion.div 
                className="absolute bottom-1/3 -left-12 w-2.5 h-2.5 bg-[#D1B4C6]/30 rounded-full blur-sm"
                animate={{ 
                  x: [0, 6, 0],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 2.2
                }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 