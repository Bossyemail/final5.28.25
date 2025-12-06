"use client"

import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

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

export default function TemplatesPage() {
  const searchParams = useSearchParams()
  const scenario = searchParams.get('scenario')
  
  const email = scenario ? sampleEmails[scenario as keyof typeof sampleEmails] : null
  const scenarioTitle = scenario || 'Sample Email'

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1 relative">
        <section className="w-full py-16 md:py-24 text-black bg-white relative">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#505050] hover:text-[#161616] transition-colors mb-8"
                style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="paragraph-small">Back to Examples</span>
              </Link>
            </motion.div>

            {/* Email Display */}
            {email ? (
              <motion.div
                className="bg-white border border-[#E3E3E3] rounded-none p-8 md:p-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-6">
                  <h1 className="display-5 text-[#161616] mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
                    {scenarioTitle}
                  </h1>
                  <div className="border-t border-[#E3E3E3] pt-4 mt-4">
                    <p className="paragraph-small text-[#ABABAB] mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
                      SUBJECT
                    </p>
                    <p className="paragraph-large text-[#161616] font-medium" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500, lineHeight: '1.5em' }}>
                      {email.subject}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E3E3E3] pt-6">
                  <p className="paragraph-small text-[#ABABAB] mb-4" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
                    BODY
                  </p>
                  <div className="paragraph-default text-[#161616] whitespace-pre-line" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.8em' }}>
                    {email.body}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                  Please select a scenario to view the sample email.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

