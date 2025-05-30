"use client"

import { motion } from "framer-motion"
import { CheckCircle, Mail, Clock, Sparkles, Zap, Shield, Copy, Star, RefreshCw, Save, Edit2, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

const features = [
  {
    title: "Smart Email Generator",
    description: "AI-powered email generation that understands real estate context and terminology.",
    icon: Sparkles,
    example: {
      subject: "Follow-up: Missing HOA Questionnaire",
      body: "Hi John,\n\nI noticed we're still waiting on the HOA questionnaire for 123 Main St. The lender needs this by Friday to keep us on track for closing.\n\nCould you send it over today? I've attached the form for your convenience.\n\nLet me know if you need anything else!\n\nBest,\nSarah"
    }
  },
  {
    title: "Time-Saving Templates",
    description: "Pre-built templates for common real estate scenarios, ready to use in seconds.",
    icon: Clock,
    example: {
      subject: "Inspection Reminder: 456 Oak Ave",
      body: "Hi Team,\n\nJust a friendly reminder that the inspection for 456 Oak Ave is scheduled for tomorrow at 2 PM.\n\nPlease ensure all utilities are on and the property is accessible. I'll be there to meet the inspector.\n\nLet me know if you need anything else!\n\nBest,\nMichael"
    }
  },
  {
    title: "One-Click Actions",
    description: "Copy, edit, or send emails directly from the generator with a single click.",
    icon: Zap,
    example: {
      subject: "Closing Documents Ready for Review",
      body: "Hi Lisa,\n\nGreat news! All closing documents are ready for your review. I've attached them to this email.\n\nPlease review and let me know if you have any questions. We're on track for closing next Friday.\n\nLooking forward to hearing from you!\n\nBest regards,\nDavid"
    }
  },
  {
    title: "Secure & Private",
    description: "Your data and communications are encrypted and protected at all times.",
    icon: Shield,
    example: {
      subject: "Secure: Wire Instructions for 789 Pine St",
      body: "Hi Client,\n\nAs requested, here are the wire instructions for your closing at 789 Pine St.\n\nPlease note: These instructions are for your eyes only. Never share wire instructions via email or phone.\n\nLet me know once you've received this information.\n\nBest,\nSarah"
    }
  }
]

function AnimatedEmailGeneratorDemo() {
  // Demo prompt and response
  const promptText = "Request a quick update on missing HOA docs for 123 Main St."
  const responseText = `Subject: Quick Update Needed for 123 Main St.\n\nHi John,\n\nJust checking in—could you send over the HOA questionnaire for 123 Main St.? The lender needs it by Friday to keep us on track for closing.\n\nLet me know if you need anything!\n\nBest,\nSarah`

  const [typedPrompt, setTypedPrompt] = useState("");
  const [typedResponse, setTypedResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  // Typewriter effect for prompt
  useEffect(() => {
    let i = 0;
    setTypedPrompt("");
    setTypedResponse("");
    setShowResponse(false);
    const typePrompt = () => {
      if (i <= promptText.length) {
        setTypedPrompt(promptText.slice(0, i));
        i++;
        setTimeout(typePrompt, 35);
      } else {
        setTimeout(() => setShowResponse(true), 500);
      }
    };
    typePrompt();
    // eslint-disable-next-line
  }, []);

  // Typewriter effect for response
  useEffect(() => {
    if (!showResponse) return;
    let j = 0;
    setTypedResponse("");
    const typeResponse = () => {
      if (j <= responseText.length) {
        setTypedResponse(responseText.slice(0, j));
        j++;
        setTimeout(typeResponse, 15);
      }
    };
    typeResponse();
    // eslint-disable-next-line
  }, [showResponse]);

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-700 p-6 flex flex-col gap-4" style={{ fontFamily: 'Inter, Roboto, SF Pro, Arial, sans-serif' }}>
      <div className="mb-2">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Smart Email Generator</span>
      </div>
      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700 mb-2">
        <span className="text-xs text-zinc-500">Prompt</span>
        <div className="mt-1 text-base text-zinc-900 dark:text-zinc-100 min-h-[28px]">
          {typedPrompt}<span className="animate-pulse">|</span>
        </div>
      </div>
      <div className="flex-1 bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
        <span className="text-xs text-zinc-500">Generated Email</span>
        <div className="mt-1 whitespace-pre-line text-zinc-900 dark:text-zinc-100 min-h-[120px]">
          {typedResponse}
        </div>
      </div>
    </div>
  );
}

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
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Time-Saving Templates</span>
        <div className="text-zinc-700 dark:text-zinc-200 text-lg font-bold mt-1 mb-2">Browse 100+ plug-and-play templates</div>
      </div>
      <div className="divide-y divide-zinc-200 dark:divide-zinc-700 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm overflow-hidden" style={{ maxHeight: 340, overflowY: 'auto' }}>
        {templates.map((tpl, idx) => (
          <div key={idx} className="flex items-center px-5 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition group">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{tpl.title}</span>
                <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded px-2 py-0.5 border border-zinc-200 dark:border-zinc-700 font-medium ml-1">{tpl.category}</span>
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
            <span className="font-medium text-zinc-800 dark:text-zinc-100">{action.label}:</span>
            <span>{action.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const TABS = [
  { label: "Smart Email Generator", component: <AnimatedEmailGeneratorDemo /> },
  { label: "Time-Saving Templates", component: <TemplateLibraryPreview /> },
  { label: "One-Click Actions", component: <OneClickActionsPreview /> },
];

export function Features() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section className="py-20 md:py-28">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Features That Make You Look Good</h2>
          <p className="text-gray-500 md:text-xl dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to write professional, effective emails that get results.
          </p>
        </div>

        {/* Tabbed interface */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex border-b border-zinc-200 dark:border-zinc-700 mb-8">
            {TABS.map((tab, idx) => (
              <button
                key={tab.label}
                className={`px-6 py-2 border-t border-l border-r rounded-t-lg text-sm font-medium focus:outline-none transition-colors
                  ${idx === 0 ? 'border-l-zinc-200 dark:border-l-zinc-700' : ''}
                  ${idx === TABS.length - 1 ? 'border-r-zinc-200 dark:border-r-zinc-700' : ''}
                  ${activeTab === idx
                    ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-black dark:text-white'
                    : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900'}
                `}
                style={{ marginRight: '-1px', zIndex: activeTab === idx ? 2 : 1 }}
                onClick={() => setActiveTab(idx)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-b-2xl shadow-md border border-t-0 border-zinc-200 dark:border-zinc-700 p-6 min-h-[340px] flex items-center justify-center">
            {TABS[activeTab].component}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Ready to transform your email game?
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 bg-[#734b6d] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#5a3a55] transition-colors"
          >
            Get Started
            <CheckCircle className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
} 