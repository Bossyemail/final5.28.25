"use client"

import { Button } from "@/components/ui/button"
import { TrialButton } from "@/components/trial-button"
import { Star, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { TryGeneratorCTA } from "./try-generator-cta"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import EmailGeneratorShowcase from "./EmailGeneratorShowcase"
import EmailGeneratorShowcaseTabs from "./EmailGeneratorShowcaseTabs"

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
  },
  {
    quote: "I love the templates. It's like having a transaction therapist in my inbox.",
    author: "Ava P.",
    role: "Agent"
  },
  {
    quote: "BossyEmail saved me from losing it on a lender last week.",
    author: "Jordan M.",
    role: "Realtor"
  }
]

const avatarColors = [
  '#EFE1E1',
  '#F0D2DA',
  '#E0C1C6',
  '#D1B4C6',
  '#CBC4D6',
];

export function Hero() {
  return (
    <section className="flex flex-col justify-center items-center py-16 md:py-24 bg-white text-black dark:bg-[#757575] dark:text-black min-h-[70vh]">
      <div className="container flex flex-col items-center justify-center px-2 sm:px-4 md:px-6 h-full">
        <div className="flex flex-col items-center text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center justify-center"
          >
            <img src="/icon.png" alt="BossyEmail icon" className="mx-auto mb-8" style={{ height: '56px', width: 'auto' }} />
            <h1 className="text-2xl sm:text-3xl font-normal mb-4 sm:mb-6 text-black dark:text-black text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              Smart Email Generator + Instant Email<br />
              <span>Templates for Real Estate Pros.</span>
            </h1>
            <div className="mb-8 sm:mb-10 text-center text-zinc-700 dark:text-black text-sm sm:text-base" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Get the exact words to chase docs,<br />
              put out fires and follow up like a pro - in seconds.
            </div>
            {/* Main CTA Button */}
            <div className="w-full flex justify-center mb-6">
              <TryGeneratorCTA className="bg-black text-white hover:bg-zinc-900 rounded-full px-10 py-4 font-semibold text-lg shadow-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-[#f5f5f5] dark:text-[#212121] dark:hover:bg-[#e0e0e0] dark:border dark:border-[#424242]" label="Start Now" />
          </div>
            {/* Tabs and Card Container */}
            <EmailGeneratorShowcaseTabs />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function SocialProofAndTestimonials() {
  // Marquee shell design for testimonials
  return (
    <div className="w-full max-w-5xl mx-auto overflow-x-hidden py-6 flex flex-col items-center mb-12">
      <div className="flex items-center gap-3 mb-6">
        {/* Avatars */}
        <div className="flex -space-x-3">
          {['H', 'C', 'L', 'T'].map((initial, idx) => (
            <div
              key={initial}
              className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-xs border-2 border-white shadow"
              style={{ background: avatarColors[idx % avatarColors.length] }}
              title={initial === 'H' ? 'Hannah R.' : initial === 'C' ? 'Carlos M.' : initial === 'L' ? 'Lisa T.' : 'Tom S.'}
            >
              {initial}
            </div>
          ))}
        </div>
        {/* Star rating and trust statement */}
        <div className="flex items-center gap-2">
          <div className="flex" style={{ color: '#7ED6A6' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><polygon points="9.9,1.1 7.6,6.6 1.6,7.5 6,11.7 4.8,17.6 9.9,14.6 15,17.6 13.8,11.7 18.2,7.5 12.2,6.6 "/></svg>
            ))}
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Trusted by <span className="font-bold">500+</span> real estate professionals
          </span>
        </div>
      </div>
      {/* Marquee shell for testimonials */}
      <div className="overflow-x-hidden w-full">
        <div className="flex animate-marquee-ltr whitespace-nowrap gap-x-6" style={{ animationDuration: '32s' }}>
          {[...testimonials, ...testimonials].map((testimonial, idx) => {
            // Split quote into up to two sentences for display
            let sentences = testimonial.quote.split('. ');
            if (sentences.length > 1) {
              sentences[0] = sentences[0].endsWith('.') ? sentences[0] : sentences[0] + '.';
            }
            // Special handling for the 'Saved me 2 hours...' testimonial to ensure both sentences are on the same line
            if (testimonial.quote.startsWith('Saved me 2 hours a day on email writing')) {
              sentences = ['Saved me 2 hours a day on email writing. Game changer.'];
            }
            // Special handling for the 'I love the templates...' testimonial to keep it as one line
            if (testimonial.quote.startsWith("I love the templates. It's like having a transaction therapist in my inbox.")) {
              sentences = [testimonial.quote];
            }
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start bg-white/70 backdrop-blur-md rounded-lg px-5 py-4 shadow-xl min-w-[280px] max-w-xs text-left hover:bg-white/90 transition-colors border border-black/10"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '13px', color: '#232326' }}
              >
                <div className="flex items-center mb-2 sm:mb-0 mr-1 flex-shrink-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-black text-xs font-bold" style={{ background: avatarColors[idx % avatarColors.length] }}>
                    {testimonial.author[0]}
                  </div>
                </div>
                <div className="flex flex-col break-words whitespace-normal max-w-full">
                  <span className="leading-snug break-words whitespace-normal max-w-full">{sentences[0]}</span>
                  {sentences[1] && <span className="leading-snug break-words whitespace-normal max-w-full">{sentences[1]}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export function Header() {
  return (
    <header className="w-full border-b bg-white flex items-center">
      <div className="container flex items-center justify-between px-4" style={{ height: '48px' }}>
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="BossyEmail logo" className="h-8 w-auto" />
        </Link>
        <nav className="flex items-center gap-6">
          <a className="uppercase tracking-wide text-sm text-gray-700" href="#features">Features</a>
          {/* ...other links... */}
        </nav>
        <Button className="rounded-full bg-black text-white px-6 py-2 text-base font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
          Log in <ArrowUpRight size={18} />
        </Button>
      </div>
    </header>
  )
} 