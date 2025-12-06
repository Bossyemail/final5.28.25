import { useEffect, useState, useRef } from 'react';
import { Copy, Mail, RefreshCw, Save, Edit2, Trash2, ChevronDown, Star, Send, CheckCircle2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const showcasePromptFull = 'help me ask for an escrow letter that is already late.';
const TYPING_SPEED = 60; // ms per character (slower for full prompt visibility)
const showcaseEmailLines = [
  'Subject: Follow-Up on Escrow Letter Request',
  '',
  'Hi there,',
  '',
  'I wanted to follow up on the escrow letter, as we were expecting to receive it by now. Could you please provide an update on its status or share the letter with us at your earliest convenience?',
  '',
  'Let me know if anything is needed on our end to move this along.',
  '',
  'Thank you,',
];

const actionButtons = [
  { icon: Copy, label: 'Copy' },
  { icon: Mail, label: 'Send' },
  { icon: RefreshCw, label: 'Rewrite' },
  { icon: Save, label: 'Save' },
  { icon: Edit2, label: 'Edit' },
  { icon: Trash2, label: 'Delete' },
];

const dropdowns = [
  { label: 'From', value: 'Buyer\'s Agent' },
  { label: 'To', value: 'Escrow Officer' },
  { label: 'Tone', value: 'Professional' },
];

// Add TemplateLibraryPreview for the Time-Saving Templates tab
const templatePreviewData = [
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

// Demo favorites data (replace with real data if available)
const demoFavorites = [
  {
    category: "Contract Buyer Side",
    title: "We're Under Contract!",
    snippet: "Hi {{Buyer Name}}, Great news — we're officially under contract on {{Property Address}}..."
  },
  {
    category: "Deposits",
    title: "Earnest Money Deposit Reminder w/ Wire Safety",
    snippet: "Hi {{Buyer Name}}, Just a reminder that your earnest money deposit is due by {{Deadline}}..."
  },
  {
    category: "Financing",
    title: "Loan Application Status Email to Buyer",
    snippet: "Hi {{Buyer Name}}, I hope you're doing well! As part of the financing timeline outlined..."
  },
  {
    category: "Closing",
    title: "Closing Disclosure Review",
    snippet: "Hi {{Buyer Name}}, Please review the attached Closing Disclosure and let me know if you have questions..."
  },
];

function TemplateLibraryPreviewHero() {
  // Show first 4 templates statically
  const visibleTemplates = templatePreviewData.slice(0, 4);
  const categories = Array.from(new Set(templatePreviewData.map(t => t.category)));
  const visibleCategories = categories.slice(0, 5);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Animated horizontal category bar */}
      <div
        className="flex gap-2 mb-2 overflow-hidden relative px-1"
        style={{ minHeight: 36 }}
      >
        <div className="flex gap-2">
          {visibleCategories.map((cat, idx) => (
            <span
              key={cat + idx}
              className="px-3 py-1 rounded-full border text-xs font-semibold transition-all whitespace-nowrap bg-zinc-100 text-zinc-700 border-zinc-200"
              style={{ minWidth: 90, textAlign: 'center' }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
      {/* End category bar */}
      <div className="mb-4 text-left">
        <span className="text-xs font-normal text-zinc-500 uppercase tracking-wider">Time-Saving Templates</span>
        <div className="text-zinc-700 text-lg font-normal mt-1 mb-2">Browse 300+ plug-and-play templates</div>
      </div>
      <div
        className="divide-y divide-zinc-200 bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden"
        style={{ maxHeight: 260, overflowY: 'hidden', position: 'relative' }}
      >
        <div>
          {visibleTemplates.map((tpl, idx) => {
            const isFeatured = idx === 0;
            const highlight = tpl.category === visibleCategories[0];
            return (
              <div
                key={tpl.title + idx}
                className={`flex items-center px-5 py-3 transition group relative`}
                style={{
                  background: isFeatured ? '#f5f8ff' : 'white',
                  borderLeft: isFeatured ? '4px solid #2563eb' : '4px solid transparent',
                  boxShadow: isFeatured ? '0 2px 16px 0 rgba(37,99,235,0.07)' : undefined,
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-normal text-zinc-900 truncate">{tpl.title}</span>
                    <span className={`text-xs rounded px-2 py-0.5 border font-normal ml-1 ${highlight ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-zinc-100 text-zinc-700 border-zinc-200'}`}>{tpl.category}</span>
                  </div>
                  <div className="text-sm text-zinc-600 truncate">{tpl.snippet}</div>
                </div>
                <div className="flex items-center gap-2 ml-4 flex-shrink-0 opacity-70 group-hover:opacity-100 transition">
                  <button className="hover:text-[#734b6d]" title="Copy"><Copy className="w-4 h-4" /></button>
                  <button className="hover:text-[#734b6d]" title="Favorite"><Star className="w-4 h-4" /></button>
                  <button className="hover:text-[#734b6d]" title="Send"><Mail className="w-4 h-4" /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-center mt-4">
        <span className="text-xs text-zinc-500">...and many more templates inside BossyEmail</span>
      </div>
    </div>
  );
}

function FavoritesPreviewHero() {
  // For demo, show filled state
  const favorites = demoFavorites;
  const visibleFavorites = favorites.slice(0, 3);

  if (!favorites.length) {
    // Empty state: floating, gently pulsing star icon with message
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center h-[260px]">
        <div className="mb-4">
          <div className="inline-flex items-center justify-center rounded-full bg-yellow-100 shadow-lg p-4">
            <Star className="w-10 h-10 text-yellow-400" />
          </div>
        </div>
        <div className="text-base font-medium text-zinc-400 text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
          Your favorite templates will appear here.
        </div>
      </div>
    );
  }

  // Horizontal auto-scroll animation (like TemplateLibraryPreviewHero)
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-4 text-left">
        <span className="text-xs font-normal text-zinc-500 uppercase tracking-wider">Favorites</span>
        <div className="text-zinc-700 text-lg font-normal mt-1 mb-2">Your favorite templates, always at your fingertips</div>
      </div>
      <div
        className="overflow-x-hidden rounded-xl border border-zinc-200 shadow-sm bg-white px-2 py-6 flex justify-center"
        style={{ minHeight: 200, maxHeight: 260 }}
      >
        <div className="flex gap-8 w-full max-w-3xl justify-center">
          {visibleFavorites.map((tpl, idx) => {
            const isCenter = idx === 1;
            return (
              <div
                key={tpl.title + idx}
                className={`relative flex flex-col items-start justify-start px-7 py-6 rounded-2xl border transition-all flex-shrink-0 bg-white` + (isCenter ? ' border-2 border-yellow-400 bg-yellow-50 shadow-xl z-10 scale-105' : ' border border-zinc-200 opacity-80')}
                style={{
                  minWidth: 260,
                  maxWidth: 320,
                  height: 140,
                  boxShadow: isCenter ? '0 8px 32px 0 rgba(250,204,21,0.13)' : undefined,
                }}
              >
                {/* Animated star badge for center card */}
                {isCenter && (
                  <span className="absolute -top-5 right-5 z-20">
                    <Star className="w-10 h-10 text-yellow-400" />
                  </span>
                )}
                <div className="flex items-center gap-2 mb-2 w-full">
                  <span className="font-semibold text-zinc-900 leading-tight line-clamp-2" style={{ fontSize: '1.08rem', maxWidth: 180 }}>{tpl.title}</span>
                  <span className="text-xs bg-zinc-100 text-zinc-700 rounded px-2 py-0.5 border border-zinc-200 font-normal ml-auto whitespace-nowrap">{tpl.category}</span>
                </div>
                <div className="text-sm text-zinc-600 leading-snug line-clamp-2" style={{ maxWidth: 240 }}>{tpl.snippet}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-center mt-4">
        <span className="text-xs text-zinc-500">...and many more favorites inside BossyEmail</span>
      </div>
    </div>
  );
}

export default function EmailGeneratorShowcase() {
  const showcasePrompt = 'Help me ask for an escrow letter for the second deposit';
  const showcaseResponse = `Following up on the escrow letter for the second deposit on the above mentioned.\n\nPlease share a copy of the same once available, so we can update our file's deadlines accordingly.`;
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-[2.5rem] border border-zinc-200 shadow-sm bg-white px-8 py-10 flex flex-col items-center justify-center min-h-[180px] max-h-[320px] relative" style={{ overflow: 'hidden' }}>
        {/* Static email response display */}
        <div className="w-full flex justify-center relative">
          <div className="rounded-2xl border border-zinc-200 shadow bg-white px-8 py-6 max-w-xl min-w-[420px] text-zinc-800 text-base font-normal flex flex-col items-start" style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.7, minHeight: 140, textAlign: 'left' }}>
            <div className="mb-6 w-full text-left whitespace-pre-line">
              {showcaseResponse}
            </div>
            <button
              className="flex items-center gap-2 bg-zinc-900 text-white rounded-full px-6 py-3 font-semibold text-base shadow hover:brightness-110 transition mt-2"
              style={{ minWidth: 120 }}
              disabled
            >
              <Mail className="w-5 h-5" /> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { TemplateLibraryPreviewHero, FavoritesPreviewHero }; 