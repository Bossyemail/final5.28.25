"use client"

import { motion } from "framer-motion"
import { CheckCircle, Mail, Clock, Sparkles, Zap, Shield, Copy, Star, RefreshCw, Save, Edit2, Trash2, ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"

const features = [
  {
    title: "Emails That Actually Sound Like You",
    description: "Choose your role, audience, and tone—BossyEmail fills in the rest. Professional, firm, friendly, or funny—we match your voice in seconds.",
    icon: Sparkles,
    example: {
      subject: "Follow-up: Missing HOA Questionnaire",
      body: "Hi John,\n\nI noticed we're still waiting on the HOA questionnaire for 123 Main St. The lender needs this by Friday to keep us on track for closing.\n\nCould you send it over today? I've attached the form for your convenience.\n\nLet me know if you need anything else!\n\nBest,\nSarah"
    }
  },
  {
    title: "One Click. Job Done.",
    description: "Copy, send, rewrite, save, or delete—whatever you need, it's right there. No extra tabs. No extra steps. Just fast, focused control.",
    icon: Zap,
    example: {
      subject: "Closing Documents Ready for Review",
      body: "Hi Lisa,\n\nGreat news! All closing documents are ready for your review. I've attached them to this email.\n\nPlease review and let me know if you have any questions. We're on track for closing next Friday.\n\nLooking forward to hearing from you!\n\nBest regards,\nDavid"
    }
  },
  {
    title: "Templates That Don't Suck",
    description: "Built for real contracts and real chaos. From earnest money reminders to inventory requests, every template is written like a human—and a damn good one at that.",
    icon: Clock,
    example: {
      subject: "Inspection Reminder: 456 Oak Ave",
      body: "Hi Team,\n\nJust a friendly reminder that the inspection for 456 Oak Ave is scheduled for tomorrow at 2 PM.\n\nPlease ensure all utilities are on and the property is accessible. I'll be there to meet the inspector.\n\nLet me know if you need anything else!\n\nBest,\nMichael"
    }
  },
  {
    title: "Your Greatest Hits, Front and Center",
    description: "Save the emails you use most and find them fast—sorted by stage, type, or chaos level. No more digging. Just search, click, and send.",
    icon: Star,
    example: {
      subject: "Secure: Wire Instructions for 789 Pine St",
      body: "Hi Client,\n\nAs requested, here are the wire instructions for your closing at 789 Pine St.\n\nPlease note: These instructions are for your eyes only. Never share wire instructions via email or phone.\n\nLet me know once you've received this information.\n\nBest,\nSarah"
    }
  }
]

function TemplateLibraryPreview() {
  // Example template data with new categories
  const templates = [
    {
      category: "Contract Buyer Side",
      title: "We're Under Contract!",
      snippet: "Hi {{Buyer Name}}, Great news — we're officially under contract on {{Property Address}}..."
    },
    {
      category: "Contract Buyer Side",
      title: "Buyer's Agent introducing TC - We're Under Contract",
      snippet: "Hi {{Buyer Name}}, Great news — we're officially under contract on {{Property Address}}..."
    },
    {
      category: "Deposits",
      title: "Earnest Money Deposit Reminder w/ Wire Safety",
      snippet: "Hi {{Buyer Name}}, Just a reminder that your earnest money deposit is due by {{Deadline}}..."
    },
    {
      category: "Contract Buyer Side",
      title: "Request for Lease & Inventory",
      snippet: "Hi {{Listing Agent Name}}, As part of our due diligence and in accordance with Section 10..."
    },
    {
      category: "Financing",
      title: "Loan Application Status Email to Buyer",
      snippet: "Hi {{Buyer Name}}, I hope you're doing well! As part of the financing timeline outlined..."
    },
    {
      category: "Financing",
      title: "Loan Application Confirmation Email to Lender",
      snippet: "Hi {{Lender Name}}, I hope you're doing well. We're reaching out to confirm that {{Buyer Name}}..."
    },
    {
      category: "Contract Buyer Side",
      title: "Appraisal Report Status",
      snippet: "Hi {{Lender Name}}, I wanted to follow up to see if the appraisal report has been completed..."
    },
    {
      category: "Condo / HOA",
      title: "HOA Questionnaire Request",
      snippet: "Hi {{HOA Contact}}, Could you send over the completed HOA questionnaire for {{Property Address}}?"
    },
    {
      category: "Closing",
      title: "Closing Disclosure Review",
      snippet: "Hi {{Buyer Name}}, Please review the attached Closing Disclosure and let me know if you have questions..."
    },
    {
      category: "Listing",
      title: "Listing Feedback Request",
      snippet: "Hi {{Agent Name}}, Do you have any feedback from your recent showing at {{Property Address}}?"
    },
    {
      category: "Offer",
      title: "Offer Submission Confirmation",
      snippet: "Hi {{Buyer Name}}, Your offer for {{Property Address}} has been submitted. I'll update you as soon as I hear back..."
    },
  ];
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-4 text-left">
        <span className="text-xs font-normal text-zinc-500 uppercase tracking-wider">Time-Saving Templates</span>
        <div className="text-zinc-700 dark:text-zinc-200 text-lg font-normal mt-1 mb-2">Browse 100+ plug-and-play templates</div>
      </div>
      <div className="divide-y divide-zinc-200 dark:divide-zinc-700 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm overflow-hidden" style={{ maxHeight: 340, overflowY: 'auto' }}>
        {templates.map((tpl, idx) => (
          <div key={idx} className="flex items-center px-5 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition group">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-normal text-zinc-900 dark:text-zinc-100 truncate">{tpl.title}</span>
                <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded px-2 py-0.5 border border-zinc-200 dark:border-zinc-700 font-normal ml-1">{tpl.category}</span>
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-300 truncate">{tpl.snippet}</div>
            </div>
            <div className="flex items-center gap-3 ml-4 flex-shrink-0 opacity-70 group-hover:opacity-100 transition">
              <button className="hover:text-[#734b6d]" title="Copy"><Copy className="w-5 h-5" /></button>
              <button className="hover:text-[#734b6d]" title="Favorite"><Star className="w-5 h-5" /></button>
              <button className="hover:text-[#734b6d]" title="Send"><Mail className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <span className="text-xs text-zinc-500">...and many more templates inside BossyEmail</span>
      </div>
    </div>
  );
}

function OneClickActionsPreview() {
  const actions = [
    {
      icon: <Copy className="w-6 h-6" />, label: "Copy", desc: "Copy the generated email to your clipboard."
    },
    {
      icon: <Mail className="w-6 h-6" />, label: "Send", desc: "Open your email client to send this email."
    },
    {
      icon: <RefreshCw className="w-6 h-6" />, label: "Regenerate", desc: "Generate a new version of the email."
    },
    {
      icon: <Save className="w-6 h-6" />, label: "Save", desc: "Save this email to your templates."
    },
    {
      icon: <Edit2 className="w-6 h-6" />, label: "Edit", desc: "Edit the subject or body of the email."
    },
    {
      icon: <Trash2 className="w-6 h-6" />, label: "Delete", desc: "Clear the generated email and start over."
    },
  ];
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6">
      <div className="flex gap-6 mb-2">
        {actions.map((action, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="text-zinc-700 dark:text-zinc-200">{action.icon}</div>
            <span className="text-xs mt-1 text-zinc-500 dark:text-zinc-400">{action.label}</span>
          </div>
        ))}
      </div>
      <div className="w-full grid grid-cols-1 gap-2">
        {actions.map((action, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <span className="w-6 h-6 flex items-center justify-center text-zinc-400">{action.icon}</span>
            <span className="font-normal text-zinc-800 dark:text-zinc-100">{action.label}:</span>
            <span>{action.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const TABS = [
  { label: "Time-Saving Templates", component: <TemplateLibraryPreview /> },
  { label: "One-Click Actions", component: <OneClickActionsPreview /> },
];

export function Features() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <section className="w-full py-16 md:py-24 bg-white dark:bg-[#757575] dark:text-black">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-normal mb-4 text-black dark:text-black" style={{ fontFamily: 'Inter, sans-serif', fontSize: '32px', fontWeight: 400 }}>
              Features That Make You Look Good
            </h2>
            <p className="text-center text-black dark:text-black max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '16px' }}>
              Everything you need to write professional, effective emails that get results.
            </p>
          </div>

          {/* Horizontal Scrollable Features */}
          <div className="relative mb-20">
            <div className="flex overflow-x-auto pb-8 gap-12 snap-x snap-mandatory scrollbar-hide">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex-none w-[320px] snap-center"
                >
                  <div className="relative bg-white dark:bg-[#757575] p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-100 dark:border-zinc-700 h-full rounded-xl" style={{ border: '1px solid #232326' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#EFE1E1] to-[#CBC4D6] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-black dark:bg-white flex items-center justify-center mb-6">
                        <feature.icon className="w-6 h-6 text-white dark:text-black" />
                      </div>
                      <h3 className="text-sm font-semibold mb-3 text-black dark:text-black" style={{ fontSize: '14px' }}>{feature.title}</h3>
                      <p className="text-xs text-zinc-600 dark:text-black" style={{ fontSize: '12px' }}>{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Scroll Indicators */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
              {features.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 transition-all duration-300"
                  style={{
                    backgroundColor: index === activeTab ? '#000' : '',
                    transform: index === activeTab ? 'scale(1.2)' : 'scale(1)'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <p className="mb-6 text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '18px', color: '#000' }}>
              Ready to transform your email game?
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full font-normal shadow-lg transition hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-white dark:text-[#212121] dark:hover:bg-[#f5f5f5] dark:border dark:border-[#424242]"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 400 }}
            >
              Get Started
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
} 