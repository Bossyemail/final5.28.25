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
    <section id="faq" className="py-16 md:py-24 text-white relative">
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-[#D1B4C6]/8 rounded-full blur-3xl"></div>
      {/* Additional light source */}
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-white/4 rounded-full blur-3xl"></div>
      <div className="container px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight text-center">
          <div className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            FAQ
          </div>
        </h2>
        <p className="text-center mb-12 text-base text-zinc-300">
          Still scrolling? That means you're either really thorough… or you're procrastinating writing another email. Either way, BossyEmail will save you time, make you sound sharp, and keep deals moving. Go on—your inbox will thank you.
        </p>
        <Accordion type="single" collapsible className="space-y-4">
          {sortedFaqs.map((faq, idx) => (
            <AccordionItem key={faq.question} value={faq.question} className="border border-zinc-800 rounded-lg hover:border-[#D1B4C6]/20 hover:shadow-[0_0_20px_rgba(209,180,198,0.05)] transition-all duration-300">
              <AccordionTrigger className="px-6 py-4 text-left text-white hover:text-zinc-300 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <faq.icon className="w-5 h-5 text-[#D1B4C6]" />
                  <span className="font-medium">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-zinc-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-base text-zinc-300 mb-4">Still not sure?</p>
          <Button
            size="lg"
            className="bg-[#D1B4C6] hover:bg-[#C4A7B9] text-black px-6 py-3 rounded-lg font-medium text-base transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            Just Try It.
            <ArrowUpRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  )
} 