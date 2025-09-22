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
    <section className="py-16 md:py-24 text-white relative">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#D1B4C6]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#D1B4C6]/8 rounded-full blur-3xl"></div>
      {/* Additional light source */}
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            <div className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              <div>SIMPLE,</div>
              <div>TRANSPARENT PRICING</div>
            </div>
          </h2>
          <p className="text-base text-zinc-300 max-w-2xl leading-relaxed mb-8">
            Choose the plan that works for you. Start with 3 free emails.<br />
            Stay for the sanity-saving genius.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          {/* Inbox Lite */}
          <motion.div 
            className="bg-zinc-800 rounded-lg border border-zinc-700 p-6 md:p-8 flex flex-col gap-6 hover:border-[#D1B4C6]/30 hover:shadow-[0_0_30px_rgba(209,180,198,0.1)] hover:shadow-[#D1B4C6]/10 transition-all duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-medium text-white">Inbox Lite</h3>
            <div className="text-left">
              <span className="text-4xl font-bold text-white">$19</span>
              <span className="text-zinc-400 ml-2">per month</span>
            </div>
            <ul className="space-y-3 mb-4 text-left">
              {planIncludes.lite.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <ArrowUpRight className="w-4 h-4 text-[#D1B4C6]" />
                  <span className="text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#pricing"
              className="w-full bg-[#D1B4C6] hover:bg-[#C4A7B9] text-black px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 inline-flex items-center justify-center gap-2 hover:scale-105 hover:shadow-[0_0_20px_rgba(209,180,198,0.4)] active:scale-95"
            >
              Start Free Trial
              <ArrowUpRight className="w-5 h-5" />
            </a>
            <div className="pt-4 border-t border-zinc-700">
              <p className="text-sm text-zinc-400 leading-relaxed">
                Just type what you need — like "ask for HOA docs" — and get a polished, real estate-ready email in seconds. Perfect for follow-ups, document chases, updates, and putting out fires without rewriting the same line 12 different ways.
              </p>
            </div>
          </motion.div>

          {/* Inbox Royalty */}
          <motion.div 
            className="bg-zinc-800 rounded-lg border border-[#D1B4C6] p-6 md:p-8 relative hover:shadow-[0_0_40px_rgba(209,180,198,0.2)] hover:shadow-[#D1B4C6]/20 transition-all duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#D1B4C6] text-black px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <h3 className="text-xl font-medium text-white">Inbox Royalty</h3>
            <div className="text-left mb-6">
              <span className="text-4xl font-bold text-white">$59</span>
              <span className="text-zinc-400 ml-2">per month</span>
            </div>
            <ul className="space-y-3 mb-6 text-left">
              {planIncludes.royalty.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <ArrowUpRight className="w-4 h-4 text-[#D1B4C6]" />
                  <span className="text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#pricing"
              className="w-full bg-[#D1B4C6] hover:bg-[#C4A7B9] text-black px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 inline-flex items-center justify-center gap-2 mb-6 hover:scale-105 hover:shadow-[0_0_20px_rgba(209,180,198,0.4)] active:scale-95"
            >
              Start Free Trial
              <ArrowUpRight className="w-5 h-5" />
            </a>
            
            {/* Testimonial */}
            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-[#D1B4C6]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-sm italic text-zinc-300 mb-2">
                "The template library alone is worth it. I've saved hours every week on follow-ups and document requests."
              </p>
              <p className="text-sm text-zinc-400">- Sarah K., Transaction Coordinator</p>
            </div>
          </motion.div>
        </div>

        {/* Upgrade Note */}
        <div className="text-center mt-12">
          <p className="text-base text-zinc-300 mb-2">
            Start with Lite and upgrade anytime. No commitment required.
          </p>
          <p className="text-base text-zinc-300">
            Have questions? Check out our <a href="#faq" className="text-[#D1B4C6] hover:underline">FAQ section</a>
          </p>
        </div>
      </div>
    </section>
  )
}
