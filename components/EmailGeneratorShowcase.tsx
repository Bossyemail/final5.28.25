import { useEffect, useState } from 'react';
import { Copy, Mail, RefreshCw, Save, Edit2, Trash2, ChevronDown, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const showcasePromptFull = 'help me ask for an escrow letter that is already late.';
const TYPING_SPEED = 32; // ms per character
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

function TemplateLibraryPreviewHero() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-4 text-left">
        <span className="text-xs font-normal text-zinc-500 uppercase tracking-wider">Time-Saving Templates</span>
        <div className="text-zinc-700 text-lg font-normal mt-1 mb-2">Browse 100+ plug-and-play templates</div>
      </div>
      <div className="divide-y divide-zinc-200 bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden" style={{ maxHeight: 260, overflowY: 'auto' }}>
        {templatePreviewData.map((tpl, idx) => (
          <div key={idx} className="flex items-center px-5 py-3 hover:bg-zinc-50 transition group">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-normal text-zinc-900 truncate">{tpl.title}</span>
                <span className="text-xs bg-zinc-100 text-zinc-700 rounded px-2 py-0.5 border border-zinc-200 font-normal ml-1">{tpl.category}</span>
              </div>
              <div className="text-sm text-zinc-600 truncate">{tpl.snippet}</div>
            </div>
            <div className="flex items-center gap-2 ml-4 flex-shrink-0 opacity-70 group-hover:opacity-100 transition">
              <button className="hover:text-[#734b6d]" title="Copy"><Copy className="w-4 h-4" /></button>
              <button className="hover:text-[#734b6d]" title="Favorite"><Star className="w-4 h-4" /></button>
              <button className="hover:text-[#734b6d]" title="Send"><Mail className="w-4 h-4" /></button>
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

export default function EmailGeneratorShowcase() {
  const [step, setStep] = useState(0);
  const [typedPrompt, setTypedPrompt] = useState('');
  const [dropdownValues, setDropdownValues] = useState([false, false, false]);
  const [cycle, setCycle] = useState(0); // for animation loop
  const [typedEmail, setTypedEmail] = useState('');
  const [showSendPulse, setShowSendPulse] = useState(false);
  const [showSentPopup, setShowSentPopup] = useState(false);
  const [showEmailWindow, setShowEmailWindow] = useState(false);
  const [showEmailSentMsg, setShowEmailSentMsg] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0 = generator, 1 = templates

  // Step 1: Show prompt
  useEffect(() => {
    if (step !== 1) {
      setTypedPrompt('');
      return;
    }
    let i = 0;
    setTypedPrompt('');
    const type = () => {
      setTypedPrompt(showcasePromptFull.slice(0, i));
      if (i < showcasePromptFull.length) {
        i++;
        setTimeout(type, 32);
      }
    };
    type();
  }, [step, cycle]);

  // Typewriter effect for generated email
  useEffect(() => {
    if (step !== 3) {
      setTypedEmail('');
      setShowSendPulse(false);
      setShowSentPopup(false);
      setShowEmailWindow(false);
      setShowEmailSentMsg(false);
      return;
    }
    const fullText = showcaseEmailLines.join('\n');
    let i = 0;
    setTypedEmail('');
    setShowSendPulse(false);
    setShowSentPopup(false);
    setShowEmailWindow(false);
    setShowEmailSentMsg(false);
    const type = () => {
      setTypedEmail(fullText.slice(0, i));
      if (i < fullText.length) {
        i++;
        setTimeout(type, TYPING_SPEED);
      } else {
        setTimeout(() => setShowSendPulse(true), 600);
        setTimeout(() => setShowEmailWindow(true), 1800);
        setTimeout(() => setShowEmailWindow(false), 3800);
        setTimeout(() => setShowEmailSentMsg(true), 4000);
        setTimeout(() => setShowEmailSentMsg(false), 6000);
      }
    };
    type();
  }, [step, cycle]);

  // Animation steps:
  // 0 = nothing, 1 = prompt, 2 = dropdowns+generate, 3 = email+actions
  useEffect(() => {
    let timers = [];
    // Step 1: Show prompt
    timers.push(setTimeout(() => setStep(1), 800));
    // Step 2: Dropdowns and generate
    timers.push(setTimeout(() => setStep(2), 800 + 1200));
    // Step 3: Email and actions
    timers.push(setTimeout(() => setStep(3), 800 + 1200 + 2600));
    // Calculate time for typewriter effect
    const fullText = showcaseEmailLines.join('\n');
    const typewriterDuration = fullText.length * TYPING_SPEED + 4000 + 2000; // typing + slower popup + sent message
    // Loop: hide, then restart by incrementing cycle
    timers.push(setTimeout(() => setStep(0), 800 + 1200 + 2600 + typewriterDuration));
    timers.push(setTimeout(() => setCycle(c => c + 1), 800 + 1200 + 2600 + typewriterDuration + 120));
    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  // Dropdown animation logic for step 2
  const dropdownStep = step === 2;
  // Reveal each dropdown value in sequence
  useEffect(() => {
    if (!dropdownStep) {
      setDropdownValues([false, false, false]);
      return;
    }
    let timers = [];
    timers.push(setTimeout(() => setDropdownValues([true, false, false]), 200));
    timers.push(setTimeout(() => setDropdownValues([true, true, false]), 900));
    timers.push(setTimeout(() => setDropdownValues([true, true, true]), 1600));
    return () => timers.forEach(clearTimeout);
  }, [dropdownStep, cycle]);

  // Reset all state at the start of each loop
  useEffect(() => {
    if (step === 0) {
      setTypedPrompt('');
      setDropdownValues([false, false, false]);
      setTypedEmail('');
      setShowSendPulse(false);
      setShowSentPopup(false);
      setShowEmailWindow(false);
      setShowEmailSentMsg(false);
    }
  }, [step]);

  // Add useEffect to reset all animation state when switching to the Time-Saving Templates tab
  useEffect(() => {
    if (activeTab !== 0) {
      setStep(0);
      setTypedPrompt('');
      setDropdownValues([false, false, false]);
      setTypedEmail('');
      setShowSendPulse(false);
      setShowSentPopup(false);
      setShowEmailWindow(false);
      setShowEmailSentMsg(false);
    }
  }, [activeTab]);

  return (
    <div className="w-full flex flex-col items-center py-12">
      <div className="max-w-2xl w-full">
        {/* Tabs */}
        <div className="flex border-b border-zinc-200 mb-6">
          <button className={`flex-1 px-0 py-2 text-sm font-medium border-b-2 focus:outline-none ${activeTab === 0 ? 'border-black text-black' : 'border-transparent text-zinc-400'}`} onClick={() => setActiveTab(0)}>Smart Email Generator</button>
          <button className={`flex-1 px-0 py-2 text-sm font-medium border-b-2 focus:outline-none ${activeTab === 1 ? 'border-black text-black' : 'border-transparent text-zinc-400'}`} onClick={() => setActiveTab(1)}>Time-Saving Templates</button>
        </div>
        {/* Card */}
        <div className="relative rounded-3xl bg-white shadow-md border border-zinc-200 px-2 py-6 sm:px-6 flex flex-col w-full">
          {activeTab === 0 ? (
            <div className="flex flex-col gap-6">
              {/* Prompt */}
              <AnimatePresence>
                {step >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4"
                  >
                    <div className="text-xs font-semibold text-zinc-400 mb-1 text-left">Prompt</div>
                    <div className="text-base text-zinc-900 text-left min-h-[28px]" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: 0 }}>{typedPrompt || showcasePromptFull}</div>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Dropdowns and Generate button, keep showing after email is generated */}
              <AnimatePresence>
                {(step === 2 || step === 3) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-wrap gap-2 items-center mb-2"
                  >
                    {dropdowns.map((d, idx) => (
                      <motion.div
                        key={d.label}
                        animate={dropdownValues[idx] || step === 3 ? { scale: 1.08, boxShadow: '0 0 0 2px #2563eb33', backgroundColor: '#e0e7ff' } : { scale: 1, boxShadow: 'none', backgroundColor: '#f4f4f5' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={`flex items-center gap-2 rounded-full border border-zinc-200 px-2 py-1 text-xs font-medium min-w-[90px] shadow-sm ${(dropdownValues[idx] || step === 3) ? 'ring-2 ring-blue-400' : ''}`}
                        style={{ zIndex: (dropdownValues[idx] || step === 3) ? 1 : 0 }}
                      >
                        <span className="text-zinc-500">{d.label}:</span>
                        <AnimatePresence>
                          {(dropdownValues[idx] || step === 3) && (
                            <motion.span
                              initial={{ opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 8 }}
                              transition={{ duration: 0.3 }}
                              className="text-zinc-900 font-semibold"
                            >
                              {d.value}
                            </motion.span>
                          )}
                        </AnimatePresence>
                        <ChevronDown className="w-3 h-3 ml-1 text-zinc-400" />
                      </motion.div>
                    ))}
                    <motion.button
                      className={`flex items-center justify-center rounded-full bg-black text-white px-5 py-2 text-xs font-semibold shadow-md hover:brightness-110 transition ml-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-white dark:text-[#212121] dark:hover:bg-[#f5f5f5] dark:border dark:border-[#424242] ${showSendPulse ? 'ring-4 ring-blue-300 animate-pulse' : ''}`}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      animate={(dropdownValues[2] || step === 3) ? { scale: 1.08, boxShadow: '0 0 0 4px #2563eb33' } : { scale: 1, boxShadow: 'none' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      Generate
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Generated Email */}
              <AnimatePresence>
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white border border-zinc-200 rounded-2xl p-4 relative"
                  >
                    <div className="text-xs font-semibold text-zinc-400 mb-1">Generated Email</div>
                    <div className="text-base text-zinc-900 text-left" style={{ lineHeight: 1.5, fontSize: '0.95rem', minHeight: '8em', textAlign: 'left' }}>
                      {typedEmail.split('\n').map((line, idx) => (
                        <div key={idx}>{line === '' ? <br /> : line}</div>
                      ))}
                    </div>
                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5 }}
                      className="flex gap-3 mt-4 justify-end items-center"
                    >
                      {actionButtons.map(({ icon: Icon, label }) => (
                        <button
                          key={label}
                          className={`flex flex-col items-center text-zinc-500 hover:text-blue-600 focus:outline-none ${label === 'Send' && showSendPulse ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-400' : ''}`}
                          tabIndex={-1}
                          style={{ borderRadius: 6, padding: '1px 2px', transition: 'background 0.2s, color 0.2s', minWidth: 38 }}
                        >
                          <Icon className="w-5 h-5 mb-0.5" />
                          <span className="text-[11px] font-medium leading-tight">{label}</span>
                        </button>
                      ))}
                    </motion.div>
                    {/* Sent popup */}
                    <AnimatePresence>
                      {showSentPopup && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.4 }}
                          className="absolute left-1/2 -translate-x-1/2 top-2/3 bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg text-base font-semibold z-50"
                          style={{ pointerEvents: 'none' }}
                        >
                          Email sent!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <TemplateLibraryPreviewHero />
          )}
          {/* Email window popup animation (now rendered inside card) */}
          <AnimatePresence>
            {showEmailWindow && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute left-1/2 top-1/2 z-50 bg-white border border-zinc-200 shadow-2xl rounded-2xl p-6 min-w-[320px] max-w-md"
                style={{ transform: 'translate(-50%, -50%)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-blue-700">Sending Email...</span>
                </div>
                <div className="text-sm text-zinc-900 whitespace-pre-line text-left" style={{ fontFamily: 'Inter, sans-serif', textAlign: 'left' }}>
                  {showcaseEmailLines.join('\n')}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Email sent message (now rendered inside card) */}
          <AnimatePresence>
            {showEmailSentMsg && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="absolute left-1/2 top-1/2 z-50 bg-blue-500 text-white px-8 py-4 rounded-xl shadow-lg text-lg font-semibold"
                style={{ transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
              >
                <span className="flex items-center gap-2"><Mail className="w-5 h-5 inline-block" />Email Sent!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <style jsx global>{`
        .blinking-cursor {
          display: inline-block;
          width: 1ch;
          animation: blink-cursor 1.1s steps(1) infinite;
          color: #232326;
          font-weight: 400;
          font-size: 1em;
          vertical-align: baseline;
        }
        @keyframes blink-cursor {
          0%, 60% { opacity: 1; }
          61%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
} 