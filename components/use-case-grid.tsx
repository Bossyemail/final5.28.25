"use client"

import { motion } from "framer-motion"
import { TryGeneratorCTA } from "./try-generator-cta"
import { ArrowRight, X } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const useCases = [
  {
    title: "Inspection issues",
    description: "BossyEmail generates a clear update that calms the buyer, nudges the agent, and keeps the deal alive."
  },
  {
    title: "HOA not responding",
    description: "Professional escalation — without sounding aggressive."
  },
  {
    title: "Appraisal came in low",
    description: "Tone-controlled email outlining next steps + protecting your side."
  },
  {
    title: "Offer submission",
    description: "A polished offer package message that makes listing agents take you seriously."
  },
  {
    title: "Client having a meltdown",
    description: "Your voice — but calmer, clearer, firmer."
  },
  {
    title: "Seller Not Providing Condo Docs",
    description: "A fact-based request that protects your buyer and establishes a paper trail."
  }
]

const sampleEmails: Record<string, { subject: string; body: string }> = {
  "Inspection issues": {
    subject: "Inspection Update + Next Steps",
    body: `Hi [Client Name],

I just received the inspection report and wanted to give you a clear, calm overview before we decide next steps.

Nothing is urgent or deal-breaking, but there are a few items worth addressing. I'm organizing the findings into a simple summary so it's easier to digest. I'll share that with you shortly along with recommended next steps.

For now, please know there's no action required on your end. I'm already coordinating with the agent to keep things moving smoothly.

I'll follow up again once I have everything outlined neatly for you.

Talk soon,
[Your Name]`
  },
  "HOA not responding": {
    subject: "Follow-Up Request: HOA Documents Needed",
    body: `Hi [HOA Contact/Agent],

Checking in again on the outstanding HOA items for [property address]. We're working through our transaction timeline and still need the following to remain on schedule:

[List the documents pending—application, approval, budget, etc.]

Please confirm receipt and provide an estimated delivery timeline so we can plan accordingly.

Thanks in advance for your attention — it helps keep the process moving for all parties.

Best,
[Your Name]`
  },
  "Appraisal came in low": {
    subject: "Appraisal Update + Options Moving Forward",
    body: `Hi [Client Name],

I just received the appraisal results, and the value came in lower than the contract price. This isn't uncommon, and we have a few options depending on how you'd like to proceed.

I'm putting together a clear breakdown of those options so you can make the decision that feels right. I'll send that over shortly.

In the meantime, there's nothing you need to do. I'm coordinating with the lender and agent to make sure everyone is aligned while we sort through next steps.

Talk soon,
[Your Name]`
  },
  "Offer submission": {
    subject: "Offer Package for [Property Address]",
    body: `Hi [Listing Agent Name],

Hope you're doing well. Please find attached our complete offer package for [property address]. We've included everything needed for a smooth review:

• Executed offer
• Proof of funds / pre-approval
• Supporting documentation

My buyer is highly motivated, flexible on timing, and prepared to move quickly.

Please confirm receipt, and feel free to reach out if you need anything else. Looking forward to working together.

Best,
[Your Name]`
  },
  "Client having a meltdown": {
    subject: "Quick Update — We're Still on Track",
    body: `Hi [Client Name],

I completely understand why this feels stressful — real estate moves fast, and there are a lot of moving parts at once. You're not alone in this, and I'm keeping a close eye on everything.

Here's what matters:
• Nothing is off track.
• No deadlines have been missed.
• I'm already coordinating behind the scenes to keep momentum.

Let me reorganize the latest updates into a clearer step-by-step so you can see exactly where things stand. I'll send that over shortly.

You're in good hands — we've got this.

Talk soon,
[Your Name]`
  },
  "Seller Not Providing Condo Docs": {
    subject: "Request for Required Condo Documents",
    body: `Hi [Listing Agent/Seller Name],

Following up on the outstanding condominium documents for [property address]. To remain compliant with contract timelines, we still need the following:

• Condo/HOA budget
• 2024–2025 year-end financials
• Rules & regulations
• Meeting minutes (past 12 months)
• Any pending assessments or special assessment information

Once you have these ready, please send them over so we can review and maintain our transaction schedule.

Thanks for your help — it's appreciated.

Best,
[Your Name]`
  }
}

export function UseCaseGrid() {
  const [selectedEmail, setSelectedEmail] = useState<{ title: string; subject: string; body: string } | null>(null)

  const handleEmailClick = (useCase: typeof useCases[0], index: number) => {
    const email = sampleEmails[useCase.title as keyof typeof sampleEmails]
    if (email) {
      setSelectedEmail({
        title: `Scenario ${index + 1}: ${useCase.title}`,
        subject: email.subject,
        body: email.body
      })
    }
  }

  return (
    <section id="real-scenarios" className="w-full py-16 md:py-24 text-black bg-white relative">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-[#ABABAB] uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
            REAL SCENARIOS
          </p>
          <h2 className="display-6 sm:display-7 md:display-8 mb-4 text-black" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
            Real emails for real real-estate chaos
          </h2>
          <p className="paragraph-default text-[#505050] max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            Examples of how BossyEmail handles the situations that cause delays, stress, and deal-killing miscommunication.
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              className="bg-[#FBFBFB] border border-[#E3E3E3] rounded-none p-6 md:p-8 hover:border-[#161616] transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -3, scale: 1.01 }}
              onClick={() => handleEmailClick(useCase, index)}
            >
              <h3 className="display-4 text-[#161616] mb-4 font-medium" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
                Scenario {index + 1}: {useCase.title}
              </h3>
              <p className="paragraph-default text-[#505050] mb-4" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                {useCase.description}
              </p>
              <div className="flex items-center gap-2 text-[#161616] group-hover:text-[#505050] transition-colors">
                <span className="paragraph-small font-medium" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>View Sample Email</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Email Modal */}
        <Dialog open={!!selectedEmail} onOpenChange={(open) => !open && setSelectedEmail(null)}>
          <DialogContent className="max-w-3xl rounded-none border-[#E3E3E3] bg-white p-0" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
            {selectedEmail && (
              <div className="p-8 md:p-12">
                <DialogHeader className="mb-6">
                  <DialogTitle className="display-5 text-[#161616] text-left" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
                    {selectedEmail.title}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="border-t border-[#E3E3E3] pt-6 mb-6">
                  <p className="paragraph-small text-[#ABABAB] mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
                    SUBJECT
                  </p>
                  <p className="paragraph-large text-[#161616] font-medium" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500, lineHeight: '1.5em' }}>
                    {selectedEmail.subject}
                  </p>
                </div>

                <div className="border-t border-[#E3E3E3] pt-6">
                  <p className="paragraph-small text-[#ABABAB] mb-4" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
                    BODY
                  </p>
                  <div className="paragraph-default text-[#161616] whitespace-pre-line" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.8em' }}>
                    {selectedEmail.body}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <TryGeneratorCTA 
            label="Generate My First 3 Emails Free" 
          />
        </motion.div>
      </div>
    </section>
  )
}

