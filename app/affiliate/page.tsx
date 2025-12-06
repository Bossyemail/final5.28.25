"use client"

import { Header } from "@/components/header"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex items-center justify-center pt-20 pb-16 px-4 md:px-6">
        <motion.div 
          className="bg-white border border-[#E3E3E3] rounded-none p-8 md:p-12 max-w-3xl w-full mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="display-6 sm:display-7 md:display-8 mb-6 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
            Affiliate Program
          </h1>
          
          <div className="space-y-6 mb-8">
            <p className="paragraph-large text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.6em' }}>
              Coming Soon
            </p>
            <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.6em' }}>
              We're building an affiliate program that rewards real estate professionals who share BossyEmail with their network.
            </p>
            <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.6em' }}>
              Interested in becoming an affiliate? We'd love to hear from you. Reach out and we'll notify you as soon as the program launches.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href="/contact"
              className="bg-[#161616] hover:bg-[#292929] text-white text-sm font-medium px-8 py-4 rounded-none transition-all duration-300 uppercase tracking-wide inline-flex items-center gap-2 h-12 group"
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
            >
              CONTACT US
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
            </Link>
            <Link
              href="/"
              className="bg-white hover:bg-[#FBFBFB] text-black border border-[#161616] text-sm font-medium px-8 py-4 rounded-none transition-all duration-300 uppercase tracking-wide inline-flex items-center gap-2 h-12 group"
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
            >
              BACK TO HOME
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

