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
  const [typedEmail, setTypedEmail] = useState('');
  const [dropdownValues, setDropdownValues] = useState([false, false, false]);
  const [cycle, setCycle] = useState(0); // for animation loop
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [promptDone, setPromptDone] = useState(false);
  const [showSentNotif, setShowSentNotif] = useState(false);
  const notifTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Step 1: Show prompt
  useEffect(() => {
    if (step !== 1) {
      setTypedPrompt('');
      setPromptDone(false);
      return;
    }
    let i = 0;
    setTypedPrompt('');
    const type = () => {
      setTypedPrompt(showcasePromptFull.slice(0, i));
      if (i < showcasePromptFull.length) {
        i++;
        setTimeout(type, TYPING_SPEED);
      } else {
        setPromptDone(true);
      }
    };
    type();
  }, [step, cycle]);

  // Step 2: Dropdowns
  useEffect(() => {
    if (step !== 2) {
      setDropdownValues([false, false, false]);
      return;
    }
    let timers = [];
    timers.push(setTimeout(() => setDropdownValues([true, false, false]), 200));
    timers.push(setTimeout(() => setDropdownValues([true, true, false]), 900));
    timers.push(setTimeout(() => setDropdownValues([true, true, true]), 1600));
    return () => timers.forEach(clearTimeout);
  }, [step, cycle]);

  // Step 3: Typewriter effect for generated email
  useEffect(() => {
    if (step !== 3) {
      setTypedEmail('');
      return;
    }
    const fullText = showcaseEmailLines.join('\n');
    let i = 0;
    setTypedEmail('');
    const type = () => {
      setTypedEmail(fullText.slice(0, i));
      if (i < fullText.length) {
        i++;
        setTimeout(type, TYPING_SPEED);
      }
    };
    type();
  }, [step, cycle]);

  // Animation steps: 0 = nothing, 1 = prompt, 2 = dropdowns+generate, 3 = email+actions
  useEffect(() => {
    let timers = [];
    timers.push(setTimeout(() => setStep(1), 400)); // Prompt
    // Wait for prompt to finish typing, then pause for 1.2s, then move to dropdowns
    timers.push(setTimeout(() => setStep(2), 400 + showcasePromptFull.length * TYPING_SPEED + 1200));
    // Dropdowns for 1.6s
    timers.push(setTimeout(() => setStep(3), 400 + showcasePromptFull.length * TYPING_SPEED + 1200 + 1600));
    // Calculate time for typewriter effect
    const fullText = showcaseEmailLines.join('\n');
    const typewriterDuration = fullText.length * TYPING_SPEED + 2000; // typing + pause
    // Add extra time for send animation and checkmark
    const sendAnimTime = 900;
    const sentCheckTime = 1200;
    timers.push(setTimeout(() => setStep(0), 400 + showcasePromptFull.length * TYPING_SPEED + 1200 + 1600 + typewriterDuration + sendAnimTime + sentCheckTime)); // Reset
    timers.push(setTimeout(() => setCycle(c => c + 1), 400 + showcasePromptFull.length * TYPING_SPEED + 1200 + 1600 + typewriterDuration + sendAnimTime + sentCheckTime + 120));
    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  // Reset all state when remounting
  useEffect(() => {
    setStep(0);
    setTypedPrompt('');
    setDropdownValues([false, false, false]);
    setTypedEmail('');
  }, []);

  // Auto-animate Send button as part of the showcase (not on click)
  useEffect(() => {
    if (step === 3) {
      // Wait for email to finish typing, then animate send
      const fullText = showcaseEmailLines.join('\n');
      const typewriterDuration = fullText.length * TYPING_SPEED;
      const sendTimeout = setTimeout(() => {
        setSending(true);
        setSent(false);
        setTimeout(() => {
          setSending(false);
          setSent(true);
          setTimeout(() => {
            setSent(false);
            setShowSentNotif(true);
            notifTimeoutRef.current = setTimeout(() => setShowSentNotif(false), 1200);
          }, 1200);
        }, 900); // send animation duration
      }, typewriterDuration + 800); // pause after typing
      return () => clearTimeout(sendTimeout);
    } else {
      setSending(false);
      setSent(false);
      setShowSentNotif(false);
      if (notifTimeoutRef.current) clearTimeout(notifTimeoutRef.current);
    }
  }, [step, cycle]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-xl border border-zinc-200 shadow-sm bg-white px-5 py-6 flex flex-col justify-center min-h-[320px] max-h-[400px] relative" style={{ overflow: 'hidden' }}>
        {/* Centered Email sent notification overlay */}
        <AnimatePresence>
          {showSentNotif && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <div className="bg-green-100 text-green-800 px-6 py-3 rounded-xl shadow-lg text-base font-semibold flex items-center gap-3 border border-green-200" style={{ boxShadow: '0 4px 24px 0 rgba(80,200,120,0.10)' }}>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Email sent!
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* End notification overlay */}
        <div className="flex flex-col gap-6 h-full justify-center">
          <AnimatePresence>
            {step === 1 && (
              <motion.div
                key="prompt"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-2 h-full justify-center"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-zinc-500" />
                    </div>
                  </div>
                  <div className="bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-3 shadow-sm text-left min-w-[120px] max-w-xl" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#232326', boxShadow: '0 2px 8px 0 rgba(80,60,80,0.04)' }}>
                    {typedPrompt}<span className="blinking-cursor">|</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {step === 2 && (
              <motion.div
                key="dropdowns"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap gap-2 items-center mb-2"
              >
                {dropdowns.map((d, idx) => (
                  <motion.div
                    key={d.label}
                    animate={dropdownValues[idx] ? { scale: 1.08, boxShadow: '0 0 0 2px #2563eb33', backgroundColor: '#e0e7ff' } : { scale: 1, boxShadow: 'none', backgroundColor: '#f4f4f5' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`flex items-center gap-2 rounded-full border border-zinc-200 px-2 py-1 text-xs font-medium min-w-[90px] shadow-sm ${dropdownValues[idx] ? 'ring-2 ring-blue-400' : ''}`}
                    style={{ zIndex: dropdownValues[idx] ? 1 : 0 }}
                  >
                    <span className="text-zinc-500">{d.label}:</span>
                    <AnimatePresence>
                      {dropdownValues[idx] && (
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
                  className="flex items-center justify-center rounded-full bg-black text-white px-5 py-2 text-xs font-semibold shadow-md hover:brightness-110 transition ml-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-white dark:text-[#212121] dark:hover:bg-[#f5f5f5] dark:border dark:border-[#424242]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  animate={dropdownValues[2] ? { scale: 1.08, boxShadow: '0 0 0 4px #2563eb33' } : { scale: 1, boxShadow: 'none' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  Generate
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {step === 3 && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4 h-full justify-center"
              >
                <div className="text-sm text-zinc-900 text-left font-mono" style={{ lineHeight: 1.5, fontSize: '0.85rem', minHeight: '8em', textAlign: 'left', fontFamily: 'Inter, monospace' }}>
                  {typedEmail.split('\n').map((line, idx) => (
                    <div key={idx}>{line === '' ? <br /> : line}</div>
                  ))}
                </div>
                <div className="flex gap-3 mt-2 justify-end items-center">
                  {actionButtons.map(({ icon: Icon, label }) => {
                    if (label === 'Send') {
                      return (
                        <motion.button
                          key={label}
                          className={`flex flex-col items-center text-zinc-500 focus:outline-none relative justify-center pointer-events-none` + (sending ? ' opacity-60' : '')}
                          style={{ borderRadius: 6, padding: '1px 2px', transition: 'background 0.2s, color 0.2s', minWidth: 38, minHeight: 38 }}
                          disabled
                        >
                          {sending ? (
                            <motion.span
                              initial={{ x: 0, opacity: 1 }}
                              animate={{ x: 32, opacity: 0 }}
                              transition={{ duration: 0.7, ease: 'easeIn' }}
                              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24 }}
                            >
                              <Send className="w-6 h-6 text-blue-500" />
                            </motion.span>
                          ) : (
                            <motion.span
                              initial={{ scale: 0.7, opacity: 0 }}
                              animate={{ scale: 1.1, opacity: 1 }}
                              exit={{ scale: 0.7, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24 }}
                            >
                              <CheckCircle2 className="w-6 h-6 text-green-500" />
                            </motion.span>
                          )}
                        </motion.button>
                      );
                    }
                    return (
                      <button
                        key={label}
                        className="flex flex-col items-center text-zinc-500 hover:text-blue-600 focus:outline-none"
                        tabIndex={-1}
                        style={{ borderRadius: 6, padding: '1px 2px', transition: 'background 0.2s, color 0.2s', minWidth: 38, minHeight: 38 }}
                        disabled={sending}
                      >
                        <Icon className="w-5 h-5 mb-0.5" />
                        <span className="text-[11px] font-medium leading-tight">{label}</span>
                      </button>
                    );
                  })}
                </div>
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