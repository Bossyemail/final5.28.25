"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

const faqs = [
  {
    question: "Is this different from ChatGPT?",
    answer: "Yes — BossyEmail is trained specifically for real estate communication. No prompting. No guessing."
  },
  {
    question: "Do I need templates?",
    answer: "No — you can use them, but the generator can also customize emails from scratch."
  },
  {
    question: "What's the free trial?",
    answer: "Generate your first 3 emails free. No credit card required."
  },
  {
    question: "Can my team use this?",
    answer: "Yes — team plans start at $99/mo."
  }
]

export function FAQ() {
  return (
    <section id="faq" className="w-full py-16 md:py-24 text-black bg-white relative">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <p className="text-sm text-[#ABABAB] uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
            FAQ
          </p>
          <h2 className="display-6 sm:display-7 md:display-8 mb-4 text-black" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
            Questions agents ask before getting started
          </h2>
          <p className="paragraph-default text-[#505050] max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            Quick answers to help you feel confident, informed, and ready to send your first email.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="bg-white border border-[#E3E3E3] rounded-none">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx}
                value={`item-${idx}`} 
                className="border-b border-[#E3E3E3] last:border-b-0"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline group [&>svg]:hidden">
                  <div className="flex items-center gap-6 w-full">
                    {/* Number Square */}
                    <div 
                      className="w-12 h-12 flex items-center justify-center flex-shrink-0 border border-[#161616] rounded-none transition-colors duration-200 group-data-[state=open]:bg-[#161616] group-data-[state=open]:text-white"
                      style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                    >
                      <span className="text-sm font-medium">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    
                    {/* Question */}
                    <span 
                      className="flex-1 text-left font-medium text-[#161616] group-data-[state=open]:font-semibold transition-all duration-200"
                      style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
                    >
                      {faq.question}
                    </span>

                    {/* Custom Chevron Icon */}
                    <ChevronRight className="w-5 h-5 text-[#505050] flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-6 pb-5">
                  <div className="flex items-start gap-6">
                    {/* Spacer for number square */}
                    <div className="w-12 flex-shrink-0"></div>
                    {/* Answer */}
                    <p 
                      className="flex-1 text-[#505050] leading-relaxed"
                      style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="paragraph-default text-[#505050] dark:text-[#ABABAB] mb-4" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>Still not sure?</p>
          <Button
            className="bg-[#161616] dark:bg-white hover:bg-[#292929] dark:hover:bg-[#FBFBFB] text-white dark:text-[#161616] text-sm font-medium px-8 py-4 rounded-none transition-all duration-200 uppercase tracking-wide inline-flex items-center gap-2 mx-auto group h-12"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
          >
            JUST TRY IT
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45" />
          </Button>
        </div>
      </div>
    </section>
  )
}
