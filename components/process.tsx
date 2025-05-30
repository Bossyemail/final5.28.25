"use client"

import { ArrowRight, PenLine, Sparkles, Send } from "lucide-react"

const steps = [
  {
    icon: PenLine,
    title: "Describe",
    description: "Tell us what you need — we speak real estate."
  },
  {
    icon: Sparkles,
    title: "Generate",
    description: "Get a pro-level email in seconds, not hours."
  },
  {
    icon: Send,
    title: "Send",
    description: "Copy, or Send and watch the magic happen."
  }
]

export function Process() {
  return (
    <section id="process" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-center">
              How It Works
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Three simple steps to professional real estate emails
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl py-12">
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#42275a] to-[#734b6d] text-white shadow-lg">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#42275a]">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden md:block">
                    <ArrowRight className="h-6 w-6 text-[#734b6d]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 