"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { CreditCard, Wrench, Lock, MessageSquare, Zap, Star, ArrowUpRight } from "lucide-react"

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

const iconColors = [
  '#EFE1E1',
  '#F0D2DA',
  '#E0C1C6',
  '#D1B4C6',
  '#CBC4D6',
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-white dark:bg-[#757575] dark:text-black">
      <div className="container px-4 md:px-6 max-w-2xl mx-auto dark:bg-[#757575]">
        <h2 className="text-3xl font-normal tracking-tight text-center mb-2 text-black dark:text-black" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '32px' }}>
          Frequently Asked Questions
        </h2>
        <p className="text-center text-black dark:text-black" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '16px' }}>
          Got questions? We've got real answers—no fluff, just facts.
        </p>
        <div className="mb-8" />
        <Accordion type="single" collapsible className="divide-y divide-gray-200 dark:divide-zinc-800">
          {sortedFaqs.map((faq, idx) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="px-2 py-2 text-sm font-normal text-left text-black dark:text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                <div className="flex items-center gap-2">
                  <faq.icon className="w-5 h-5" style={{ color: iconColors[idx % iconColors.length] }} />
                  {faq.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-2 text-zinc-700 dark:text-black text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-base font-normal mb-4 text-black dark:text-black">Still not sure?</p>
          <Button
            size="lg"
            className="mt-2 bg-black text-white rounded-full font-normal px-8 py-3 shadow-none border border-transparent hover:bg-zinc-900 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-white dark:text-[#212121] dark:hover:bg-[#f5f5f5] dark:border dark:border-[#424242]"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 400 }}
          >
            Just Try It.
            <ArrowUpRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  )
} 