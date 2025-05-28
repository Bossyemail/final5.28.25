"use client"

import { Button } from "@/components/ui/button"
import { TrialButton } from "@/components/trial-button"
import { Star, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    quote: "Saved me 2 hours a day on email writing. Game changer.",
    author: "Sarah K.",
    role: "Transaction Coordinator"
  },
  {
    quote: "Finally, emails that sound like a human wrote them.",
    author: "Michael R.",
    role: "Real Estate Agent"
  },
  {
    quote: "My clients actually respond to these emails.",
    author: "Lisa T.",
    role: "Broker"
  }
]

export function Hero() {
  return (
    <section className="pt-20 md:pt-28 pb-4 md:pb-6">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-tight uppercase mb-6">
              Real Estate Emails<br />
              <span className="block">That Don't Suck</span>
            </h1>
            <div className="max-w-2xl mx-auto mb-10">
              <div className="text-sm md:text-base text-gray-500 dark:text-gray-400 space-y-2">
                <p>
                  Most templates are vague, robotic, or clearly written by someone who's never seen a HUD-1 — let alone survived a 4PM Friday closing.
                </p>
                <p>
                  BossyEmail gives you the exact words to chase missing docs, put out fires, and sound like the pro you actually are — without the stress spiral.
                </p>
                <p>
                  No fluff. No filler. Just damn good emails for real estate chaos.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="w-full flex justify-center mb-8">
            <TrialButton
              size="lg"
              className="bg-black text-white hover:bg-zinc-900 rounded-full px-8 py-3 font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition focus:outline-none focus:ring-2 focus:ring-offset-2"
              label="Let's Fix Your Emails"
            />
          </div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-3xl mt-2"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
              {/* Avatars */}
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#734b6d] to-[#42275a] flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow" title="Hannah R.">H</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5a3a55] to-[#734b6d] flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow" title="Carlos M.">C</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563eb] to-[#734b6d] flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow" title="Lisa T.">L</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#111827] to-[#734b6d] flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow" title="Tom S.">T</div>
              </div>
              {/* Star rating and trust statement */}
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><polygon points="9.9,1.1 7.6,6.6 1.6,7.5 6,11.7 4.8,17.6 9.9,14.6 15,17.6 13.8,11.7 18.2,7.5 12.2,6.6 "/></svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Trusted by <span className="font-bold">500+</span> real estate professionals
                </span>
              </div>
            </div>

            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col items-center"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-2 mt-auto">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#42275a] to-[#734b6d] flex items-center justify-center text-white text-xs">
                      {testimonial.author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{testimonial.author}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 