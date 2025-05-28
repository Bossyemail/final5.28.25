"use client"

import { Button } from "@/components/ui/button"
import { TrialButton } from "@/components/trial-button"
import { Check, X, Star } from "lucide-react"
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
    "3 free emails to start",
    "Basic email generation",
    "Essential templates",
    "Email history"
  ],
  royalty: [
    "Everything in Lite, plus:",
    "Full template library",
    "Custom templates",
    "Priority support",
    "Early access to new features"
  ]
}

export function Pricing() {
  return (
    <section className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-500 md:text-xl dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that works for you. All plans include a 3-email free trial.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Includes 3 free emails. No credit card required. No strings.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Inbox Lite */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-8"
          >
            <h3 className="text-2xl font-bold mb-2">Inbox Lite</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$29</span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              {planIncludes.lite.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            <TrialButton
              size="lg"
              className="w-full bg-black text-white hover:bg-zinc-900 rounded-full px-8 py-3 font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition focus:outline-none focus:ring-2 focus:ring-offset-2"
              label="Start Free Trial"
            />
          </motion.div>

          {/* Inbox Royalty */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-[#42275a] to-[#734b6d] rounded-2xl shadow-lg border border-[#734b6d] p-8 text-white relative"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#734b6d] text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Inbox Royalty</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$59</span>
              <span className="text-white/80">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              {planIncludes.royalty.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-white" />
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
            <TrialButton
              size="lg"
              className="w-full bg-white text-[#42275a] hover:bg-white/90 rounded-full px-8 py-3 font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition focus:outline-none focus:ring-2 focus:ring-offset-2"
              label="Start Free Trial"
            />
            
            {/* Testimonial */}
            <div className="mt-8 p-4 bg-white/10 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-white/90 italic">
                "The template library alone is worth it. I've saved hours every week on follow-ups and document requests."
              </p>
              <p className="text-sm text-white/80 mt-2">- Sarah K., Transaction Coordinator</p>
            </div>
          </motion.div>
        </div>

        {/* Upgrade Note */}
        <div className="text-center mt-8">
          <p className="text-gray-500 dark:text-gray-400">
            Start with Lite and upgrade anytime. No commitment required.
          </p>
        </div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="text-left font-semibold px-4 py-3">Feature</th>
                  <th className="text-center font-semibold px-4 py-3">Inbox Lite</th>
                  <th className="text-center font-semibold px-4 py-3">Inbox Royalty</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className={index !== features.length - 1 ? "border-b border-zinc-200 dark:border-zinc-700" : ""}>
                    <td className="text-gray-600 dark:text-gray-400 px-4 py-2 whitespace-nowrap">{feature.name}</td>
                    <td className="text-center px-4 py-2">
                      {feature.lite === true ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : feature.lite === false ? (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      ) : (
                        <span className="text-gray-600 dark:text-gray-400">{feature.lite}</span>
                      )}
                    </td>
                    <td className="text-center px-4 py-2">
                      {feature.royalty === true ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : feature.royalty === false ? (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      ) : (
                        <span className="text-gray-600 dark:text-gray-400">{feature.royalty}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Link */}
        <div className="text-center mt-12">
          <p className="text-gray-500 dark:text-gray-400">
            Have questions? Check out our{" "}
            <a href="#faq" className="text-[#734b6d] hover:underline">
              FAQ section
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
