"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { TeamPricingForm } from "./team-pricing-form"
import { useState } from "react"

export function TeamPricing() {
  const [isTeamPricingOpen, setIsTeamPricingOpen] = useState(false)

  return (
    <section className="w-full py-16 md:py-24 text-black bg-white relative">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="display-6 sm:display-7 md:display-8 mb-6 text-black" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
            Teams & Brokerages
          </h2>
          <p className="paragraph-large text-[#505050] max-w-2xl mx-auto mb-8" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            Pricing begins at $99/mo for groups of 5+
          </p>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button
            onClick={() => setIsTeamPricingOpen(true)}
            className="bg-[#161616] dark:bg-white hover:bg-[#292929] dark:hover:bg-[#FBFBFB] text-white dark:text-[#161616] text-sm font-medium px-8 py-4 rounded-none transition-all duration-200 uppercase tracking-wide inline-flex items-center gap-2 h-12 group"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
          >
            BOOK A TEAM DEMO
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45" />
          </Button>
        </motion.div>
      </div>

      {/* Team Pricing Form Modal */}
      <TeamPricingForm
        open={isTeamPricingOpen}
        onOpenChange={setIsTeamPricingOpen}
      />
    </section>
  )
}

