"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { CreditCard, Wrench, Lock, MessageSquare, Zap, Star } from "lucide-react"

const faqs = [
  {
    category: "general",
    icon: Wrench,
    question: "What is BossyEmail and how does it help real estate professionals?",
    answer: "BossyEmail is a SaaS tool designed for real estate transaction coordinators and agents. It helps you write smart, professional emails fast — with a real estate–specific generator and a library of plug-and-send templates."
  },
  {
    category: "billing",
    icon: CreditCard,
    question: "Can I cancel BossyEmail anytime?",
    answer: "Absolutely. Cancel, upgrade, or downgrade at any time — no contracts, no strings, no awkward \"are you sure?\" messages."
  },
  {
    category: "features",
    icon: Star,
    question: "What's the difference between Inbox Lite and Inbox Royalty plans?",
    answer: "Inbox Lite gives you unlimited access to the email generator. Inbox Royalty includes the generator, our full real estate email template library, saved favorites, and early access to new features."
  },
  {
    category: "billing",
    icon: CreditCard,
    question: "What's included in the free trial?",
    answer: "Your 7-day free trial gives you full access to all features, including the email generator, templates, and favorites."
  },
  {
    category: "features",
    icon: Wrench,
    question: "How does the email generator work?",
    answer: "Just describe what you need — like 'follow-up on missing docs' or 'remind about inspection' — and our AI crafts a professional email in seconds. No more staring at a blank screen."
  },
  {
    category: "security",
    icon: Lock,
    question: "Is my data secure?",
    answer: "Absolutely. We use enterprise-grade encryption and never store your email content. Your templates and favorites are private to your account."
  },
  {
    category: "support",
    icon: MessageSquare,
    question: "What if I need help?",
    answer: "We've got your back. Email us 24/7, and you'll hear from a real person (not a bot) within hours. Plus, our help center is packed with tips and examples."
  },
  {
    category: "features",
    icon: Zap,
    question: "Can I customize the templates?",
    answer: "Yes! Every template is fully editable. Add your voice, tweak the tone, or start from scratch. It's your email, your way."
  }
]

const sortedFaqs = [...faqs].sort((a, b) => a.question.length - b.question.length);

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-white dark:bg-black">
      <div className="container px-4 md:px-6 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto max-w-xl text-gray-500 md:text-lg dark:text-gray-400 text-center mb-8">
          Got questions? We've got snappy answers.<br />
          No jargon, no fluff — just straight-up clarity about real estate emails, templates, billing, and everything in between.
        </p>
        <Accordion type="single" collapsible className="divide-y divide-gray-200 dark:divide-zinc-800">
          {sortedFaqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="px-4 py-4 text-lg font-semibold text-left">
                <div className="flex items-center gap-3">
                  <faq.icon className="w-5 h-5 text-[#734b6d]" />
                  {faq.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-500 dark:text-gray-400 md:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-lg font-semibold mb-4">Still not sure?</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#42275a] to-[#734b6d] text-white hover:brightness-110 rounded-full px-8 py-3 font-semibold shadow-lg"
          >
            Just Try It.
          </Button>
        </div>
      </div>
    </section>
  )
} 