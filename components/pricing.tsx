"use client"

import { Button } from "@/components/ui/button"
import { TrialButton } from "@/components/trial-button"
import { ArrowUpRight, X, Star } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    name: "Email Generator",
    lite: "Unlimited",
    royalty: "Unlimited"
  },
  {
    name: "Template Library",
    lite: false,
    royalty: "100+ templates"
  },
  {
    name: "Favorites Bar",
    lite: false,
    royalty: true
  },
  {
    name: "Exclusive Template Drops",
    lite: false,
    royalty: true
  },
  {
    name: "Priority Feature Access",
    lite: false,
    royalty: true
  },
]

const planIncludes = {
  lite: [
    "3 Free Emails to Start",
    "Unlimited Smart Email Generator"
  ],
  royalty: [
    "Everything in Lite, plus:",
    "Built-In Favorite Vault",
    "Custom Template Builder",
    "Full Email Template Library",
    "TC Tools & South Florida Library"
  ]
}

export function Pricing() {
  return (
    <section className="py-16 md:py-24 bg-[#e0e0e0] dark:bg-[#757575] dark:text-black" style={{ background: '#e0e0e0' }}>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-normal mb-3 sm:mb-4 text-black dark:text-black text-center">Simple, Transparent Pricing</h2>
          <p className="text-center text-black dark:text-black mb-8 sm:mb-12 text-sm sm:text-base" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
            Choose the plan that works for you. Start with 3 free emails.<br />
            Stay for the sanity-saving genius.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          {/* Inbox Lite */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl shadow-sm border border-black px-8 pt-8 pb-0 flex flex-col gap-6 dark:bg-[#757575]"
            style={{ background: '#D1B4C6' }}
          >
            <h3 className="text-base font-normal mb-2 text-black dark:text-black">Inbox Lite</h3>
            <div className="text-left" style={{ marginTop: '-8px', marginBottom: 0 }}>
              <span className="text-4xl font-bold text-black">$29</span>
              <span className="text-black dark:text-black">per month</span>
            </div>
            <ul className="space-y-2 mb-0 text-left">
              {planIncludes.lite.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <ArrowUpRight className="w-5 h-5 text-black" />
                  <span className="text-black dark:text-black">{item}</span>
                </li>
              ))}
            </ul>
            <TrialButton
              className="w-full bg-black text-white hover:bg-zinc-900 rounded-full px-8 py-3 font-normal shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2 dark:bg-white dark:text-[#212121] dark:hover:bg-[#f5f5f5] dark:border dark:border-[#424242]"
              label="Start Free Trial"
            />
            <div className="pt-0 pb-8 w-full">
              <div className="text-sm text-black text-left leading-snug italic text-gray-700" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, margin: 0, padding: 0 }}>
                Just type what you need — like "ask for HOA docs" — and get a polished, real estate-ready email in seconds.<br />
                Perfect for follow-ups, document chases, updates, and putting out fires without rewriting the same line 12 different ways.
              </div>
            </div>
          </motion.div>

          {/* Inbox Royalty */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl shadow-lg border border-black p-8 relative dark:bg-[#757575]"
            style={{ background: '#CBC4D6', color: '#232326', border: '1px solid #232326' }}
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#734b6d] text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
        </div>
            <h3 className="text-base font-normal mb-2 text-black dark:text-black">Inbox Royalty</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold" style={{ color: '#232326' }}>$59</span>
              <span style={{ color: '#232326', opacity: 0.8 }} className="text-black dark:text-black">per month</span>
        </div>
            <ul className="space-y-2 mb-6 text-left">
              {planIncludes.royalty.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <ArrowUpRight className="w-5 h-5 text-black" />
                  <span className="text-black dark:text-black">{item}</span>
            </li>
          ))}
        </ul>
            <TrialButton
              className="w-full bg-black text-white hover:bg-zinc-900 rounded-full px-8 py-3 font-normal shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition focus:outline-none focus:ring-2 focus:ring-offset-2 mb-3 flex items-center justify-center gap-2 dark:bg-white dark:text-[#212121] dark:hover:bg-[#f5f5f5] dark:border dark:border-[#424242]"
              label="Start Free Trial"
            />
            
            {/* Testimonial */}
            <div className="mt-8 p-4 rounded-xl" style={{ background: '#F3F3F3' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex" style={{ color: '#7ED6A6' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
      </div>
    </div>
              <p className="text-sm italic" style={{ color: '#232326', opacity: 0.9 }}>
                "The template library alone is worth it. I've saved hours every week on follow-ups and document requests."
              </p>
              <p className="text-sm mt-2" style={{ color: '#232326', opacity: 0.8 }}>- Sarah K., Transaction Coordinator</p>
          </div>
          </motion.div>
        </div>

        {/* Upgrade Note */}
        <div className="text-center mt-6">
          <p className="mb-1 text-center mt-12 text-black dark:text-black" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px' }}>
            Start with Lite and upgrade anytime. No commitment required.
          </p>
          <span className="text-center text-black dark:text-black" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', marginTop: 0 }}>
            Have questions? Check out our <a href="#faq" className="text-[#734b6d] hover:underline">FAQ section</a>
          </span>
        </div>
      </div>
    </section>
  )
}
