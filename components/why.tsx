"use client"

import { AlertCircle, Clock, FileText, MessageSquare, Home, Users, FileCheck } from "lucide-react"
import { motion } from "framer-motion"

const painPoints = [
  {
    icon: Clock,
    text: "Sent the same follow-up email 14 times this week"
  },
  {
    icon: FileText,
    text: "Rewritten 'just checking in' so many ways it should win a Pulitzer"
  },
  {
    icon: AlertCircle,
    text: "Wanted to scream into the void when someone asks for a copy of the addendum... again"
  },
  {
    icon: MessageSquare,
    text: "Spent more time on email than actually closing deals"
  }
]

const useCases = [
  {
    icon: Home,
    title: "For agents on showings",
    description: "Quick, professional responses between appointments"
  },
  {
    icon: FileCheck,
    title: "For TCs chasing signatures",
    description: "Clear, firm follow-ups that get results"
  },
  {
    icon: Users,
    title: "For brokers juggling files",
    description: "Consistent communication across your team"
  }
]

export function Why() {
  return (
    <section id="why" className="w-full py-16 md:py-24 px-4 bg-gradient-to-r from-[#42275a] to-[#734b6d] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
      <div className="max-w-4xl mx-auto flex flex-col gap-12 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 relative">
            Why BossyEmail Exists
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full"></span>
          </h2>
          <p className="text-lg text-white/80">
            (Besides Saving Your Sanity)
          </p>
        </div>

        {/* Use Cases Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-colors"
            >
              <useCase.icon className="w-8 h-8 mb-4 text-white" />
              <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
              <p className="text-white/80">{useCase.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Pain Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 transition-transform hover:scale-105"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <point.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-lg font-medium">{point.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empathy Section */}
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Built by someone who's lived the chaos — not just coded it.
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg">✓</span>
              </div>
              <p className="text-base md:text-lg text-white/90">
                BossyEmail was built by a real estate pro who spent two decades chasing signatures, smoothing over chaos, and writing more emails than a campaign manager in an election year.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg">✓</span>
              </div>
              <p className="text-base md:text-lg text-white/90">
                This tool isn't about making your inbox pretty.<br />
                It's about giving you the right words, at the right time, to get the job done — and maybe even clock out on time for once.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg">✓</span>
              </div>
              <p className="text-base md:text-lg text-white/90">
                Because you're not just pushing paper. You're running deals, managing people, and keeping everything from falling apart.
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl font-bold mt-8 text-center">
            We're here to help make that easier. One damn good email at a time.
          </p>
        </div>
      </div>
    </section>
  )
} 