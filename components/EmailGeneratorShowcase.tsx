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
  const TEMPLATES_VISIBLE = 4;
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get the currently highlighted category (top visible template)
  const currentCategory = templatePreviewData[scrollIndex]?.category;

  // Get unique categories
  const categories = Array.from(new Set(templatePreviewData.map(t => t.category)));

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setScrollIndex((prev) => (prev + 1) % templatePreviewData.length);
    }, 2500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPaused]);

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Compute visible templates (looping)
  const visibleTemplates = Array.from({ length: TEMPLATES_VISIBLE }, (_, i) => {
    return templatePreviewData[(scrollIndex + i) % templatePreviewData.length];
  });

  // Animation for categories bar
  const [catScroll, setCatScroll] = useState(0);
  const catIntervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (isPaused) return;
    catIntervalRef.current = setInterval(() => {
      setCatScroll((prev) => (prev + 1) % categories.length);
    }, 1800);
    return () => { if (catIntervalRef.current) clearInterval(catIntervalRef.current); };
  }, [isPaused, categories.length]);

  // Compute visible categories for horizontal scroll (show 5 at a time)
  const CAT_VISIBLE = 5;
  const visibleCategories = Array.from({ length: CAT_VISIBLE }, (_, i) => {
    return categories[(catScroll + i) % categories.length];
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Animated horizontal category bar */}
      <div
        className="flex gap-2 mb-2 overflow-hidden relative px-1"
        style={{ minHeight: 36 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="flex gap-2"
          initial={false}
          animate={{ x: 0 }}
          transition={{ type: 'tween', duration: 0.6 }}
        >
          {visibleCategories.map((cat, idx) => (
            <span
              key={cat + idx}
              className={`px-3 py-1 rounded-full border text-xs font-semibold transition-all whitespace-nowrap ${cat === currentCategory ? 'bg-blue-600 text-white border-blue-700 shadow' : 'bg-zinc-100 text-zinc-700 border-zinc-200'}`}
              style={{ minWidth: 90, textAlign: 'center', boxShadow: cat === currentCategory ? '0 2px 12px 0 rgba(37,99,235,0.10)' : undefined }}
            >
              {cat}
            </span>
          ))}
        </motion.div>
      </div>
      {/* End category bar */}
      <div className="mb-4 text-left">
        <span className="text-xs font-normal text-zinc-500 uppercase tracking-wider">Time-Saving Templates</span>
        <div className="text-zinc-700 text-lg font-normal mt-1 mb-2">Browse 100+ plug-and-play templates</div>
      </div>
      <div
        className="divide-y divide-zinc-200 bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden"
        style={{ maxHeight: 260, overflowY: 'hidden', position: 'relative' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          initial={false}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 18 }}
        >
          {visibleTemplates.map((tpl, idx) => {
            const isFeatured = idx === 0;
            const highlight = tpl.category === currentCategory;
            return (
              <motion.div
                key={tpl.title + idx}
                className={`flex items-center px-5 py-3 transition group relative ${isFeatured ? 'z-10' : ''}`}
                style={{
                  background: isFeatured ? '#f5f8ff' : 'white',
                  borderLeft: isFeatured ? '4px solid #2563eb' : '4px solid transparent',
                  boxShadow: isFeatured ? '0 2px 16px 0 rgba(37,99,235,0.07)' : undefined,
                  animation: isFeatured ? 'pulseGlow 1.2s infinite alternate' : undefined,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
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
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <style jsx>{`
        @keyframes pulseGlow {
          0% { box-shadow: 0 2px 16px 0 rgba(37,99,235,0.07); }
          100% { box-shadow: 0 4px 32px 0 rgba(37,99,235,0.16); }
        }
      `}</style>
      <div className="text-center mt-4">
        <span className="text-xs text-zinc-500">...and many more templates inside BossyEmail</span>
      </div>
    </div>
  );
}

function FavoritesPreviewHero() {
  // For demo, toggle between empty and filled state here:
  const favorites = demoFavorites; // [] for empty state, demoFavorites for filled
  const FAVORITES_VISIBLE = 3;
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused || favorites.length <= FAVORITES_VISIBLE) return;
    intervalRef.current = setInterval(() => {
      setScrollIndex((prev) => (prev + 1) % favorites.length);
    }, 2500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPaused, favorites.length]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Compute visible favorites (looping)
  const visibleFavorites = Array.from({ length: FAVORITES_VISIBLE }, (_, i) => {
    return favorites[(scrollIndex + i) % favorites.length];
  });

  if (!favorites.length) {
    // Empty state: floating, gently pulsing star icon with message
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center h-[260px]">
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          className="mb-4"
        >
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            className="inline-flex items-center justify-center rounded-full bg-yellow-100 shadow-lg p-4"
          >
            <Star className="w-10 h-10 text-yellow-400" />
          </motion.div>
        </motion.div>
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="flex gap-8 w-full max-w-3xl justify-center"
          initial={false}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 18 }}
        >
          {visibleFavorites.map((tpl, idx) => {
            const isCenter = idx === 1;
            return (
              <motion.div
                key={tpl.title + idx}
                className={`relative flex flex-col items-start justify-start px-7 py-6 rounded-2xl border transition-all flex-shrink-0 bg-white` + (isCenter ? ' border-2 border-yellow-400 bg-yellow-50 shadow-xl z-10 scale-105' : ' border border-zinc-200 opacity-80')}
                style={{
                  minWidth: 260,
                  maxWidth: 320,
                  height: 140,
                  boxShadow: isCenter ? '0 8px 32px 0 rgba(250,204,21,0.13)' : undefined,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                {/* Animated star badge for center card */}
                {isCenter && (
                  <motion.span
                    className="absolute -top-5 right-5 z-20"
                    animate={{ scale: [1, 1.25, 1], filter: [
                      'drop-shadow(0 0 0px #fde68a)',
                      'drop-shadow(0 0 12px #fde68a)',
                      'drop-shadow(0 0 0px #fde68a)'] }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                  >
                    <Star className="w-10 h-10 text-yellow-400" />
                  </motion.span>
                )}
                <div className="flex items-center gap-2 mb-2 w-full">
                  <span className="font-semibold text-zinc-900 leading-tight line-clamp-2" style={{ fontSize: '1.08rem', maxWidth: 180 }}>{tpl.title}</span>
                  <span className="text-xs bg-zinc-100 text-zinc-700 rounded px-2 py-0.5 border border-zinc-200 font-normal ml-auto whitespace-nowrap">{tpl.category}</span>
                </div>
                <div className="text-sm text-zinc-600 leading-snug line-clamp-2" style={{ maxWidth: 240 }}>{tpl.snippet}</div>
              </motion.div>
            );
          })}
        </motion.div>
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
  const [typedPrompt, setTypedPrompt] = useState('');
  const [showGoAnim, setShowGoAnim] = useState(false);
  const [showPromptBar, setShowPromptBar] = useState(true);
  const [showResponse, setShowResponse] = useState(false);
  const [typedResponse, setTypedResponse] = useState('');
  const [showSendAnim, setShowSendAnim] = useState(false);
  const [showSentNotif, setShowSentNotif] = useState(false);

  useEffect(() => {
    // Step 1: Animate prompt bar text
    let i = 0;
    setTypedPrompt('');
    setShowGoAnim(false);
    setShowPromptBar(true);
    setShowResponse(false);
    setTypedResponse('');
    setShowSendAnim(false);
    setShowSentNotif(false);
    let loopTimeout: NodeJS.Timeout | null = null;
    function typePrompt() {
      setTypedPrompt(showcasePrompt.slice(0, i));
      if (i < showcasePrompt.length) {
        i++;
        setTimeout(typePrompt, 38);
      } else {
        // Step 2: Animate Go button, then hide prompt bar
        setTimeout(() => {
          setShowGoAnim(true);
          setTimeout(() => {
            setShowGoAnim(false);
            setShowPromptBar(false);
            // Step 3: Show response and animate its text word by word
            setShowResponse(true);
            setTimeout(() => {
              let words = showcaseResponse.split(/(\s+)/); // keep spaces
              let wi = 0;
              setTypedResponse('');
              function typeWord() {
                setTypedResponse(words.slice(0, wi + 1).join(''));
                if (wi < words.length - 1) {
                  wi++;
                  setTimeout(typeWord, 80);
                } else {
                  // Step 4: Animate Send button after response is fully typed
                  setTimeout(() => {
                    setShowSendAnim(true);
                    setTimeout(() => {
                      setShowSendAnim(false);
                      // Step 5: Show 'Email sent!' notification
                      setShowSentNotif(true);
                      setTimeout(() => {
                        setShowSentNotif(false);
                        // Step 6: Loop the animation after notification disappears
                        loopTimeout = setTimeout(() => {
                          setTypedPrompt('');
                          setShowGoAnim(false);
                          setShowPromptBar(true);
                          setShowResponse(false);
                          setTypedResponse('');
                          setShowSendAnim(false);
                          setShowSentNotif(false);
                          i = 0;
                          typePrompt();
                        }, 800);
                      }, 1400);
                    }, 700);
                  }, 600);
                }
              }
              typeWord();
            }, 400);
          }, 600); // Go button anim duration
        }, 400);
      }
    }
    typePrompt();
    // Cleanup
    return () => { if (loopTimeout) clearTimeout(loopTimeout); };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-[2.5rem] border border-zinc-200 shadow-sm bg-white px-8 py-10 flex flex-col items-center justify-center min-h-[180px] max-h-[320px] relative" style={{ overflow: 'hidden' }}>
        <AnimatePresence>
          {showPromptBar && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -32 }}
              transition={{ duration: 0.5, ease: 'easeIn' }}
              className="w-full"
            >
              {/* Prompt placeholder text (animated, now left-aligned) */}
              <div className="w-full mb-8 min-h-[2.5em] flex items-center justify-start">
                <span className="text-lg font-medium text-zinc-400" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  {typedPrompt}<span className="blinking-cursor">|</span>
                </span>
              </div>
              {/* Dropdowns and Go button row */}
              <div className="w-full flex flex-row items-center justify-start gap-6 px-2">
                {/* Dropdowns */}
                <div className="flex flex-row gap-4">
                  <div className="relative">
                    <select
                      className="appearance-none font-bold text-zinc-900 bg-[#f5f5f5] rounded-lg px-6 py-2 text-sm border-none focus:outline-none focus:ring-2 focus:ring-black transition w-[120px]"
                      disabled
                    >
                      <option className="font-bold">From</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">▼</span>
                  </div>
                  <div className="relative">
                    <select
                      className="appearance-none font-bold text-zinc-900 bg-[#f5f5f5] rounded-lg px-6 py-2 text-sm border-none focus:outline-none focus:ring-2 focus:ring-black transition w-[120px]"
                      disabled
                    >
                      <option className="font-bold">To</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">▼</span>
                  </div>
                  <div className="relative">
                    <select
                      className="appearance-none font-bold text-zinc-900 bg-[#f5f5f5] rounded-lg px-6 py-2 text-sm border-none focus:outline-none focus:ring-2 focus:ring-black transition w-[120px]"
                      disabled
                    >
                      <option className="font-bold">Tone</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">▼</span>
                  </div>
                </div>
                {/* Go button */}
                <motion.button
                  type="button"
                  className="ml-auto flex items-center justify-center bg-zinc-600 text-white rounded-full w-16 h-16 font-bold text-2xl shadow-none transition"
                  style={{ minWidth: 64, minHeight: 64 }}
                  animate={showGoAnim ? { scale: 0.92, backgroundColor: '#232326' } : { scale: 1, backgroundColor: '#525256' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  disabled
                >
                  Go
                </motion.button>
              </div>
              <style jsx>{`
                .blinking-cursor {
                  display: inline-block;
                  width: 1ch;
                  animation: blink-cursor 1.1s steps(1) infinite;
                  color: #bdbdbd;
                  font-weight: 400;
                  font-size: 1em;
                  vertical-align: baseline;
                }
                @keyframes blink-cursor {
                  0%, 60% { opacity: 1; }
                  61%, 100% { opacity: 0; }
                }
              `}</style>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Generated response below the bar, now in a fixed-size, left-aligned card */}
        {showResponse && (
          <div className="w-full flex justify-center mt-8 relative">
            <div className="rounded-2xl border border-zinc-200 shadow bg-white px-8 py-6 max-w-xl min-w-[420px] text-zinc-800 text-base font-normal flex flex-col items-start" style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.7, minHeight: 140, textAlign: 'left' }}>
              <div className="mb-6 w-full text-left whitespace-pre-line">
                {typedResponse}
              </div>
              <motion.button
                className="flex items-center gap-2 bg-zinc-900 text-white rounded-full px-6 py-3 font-semibold text-base shadow hover:brightness-110 transition mt-2"
                animate={showSendAnim ? { scale: 0.93, backgroundColor: '#2563eb' } : { scale: 1, backgroundColor: '#232326' }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                style={{ minWidth: 120 }}
                disabled
              >
                <Mail className="w-5 h-5" /> Send
              </motion.button>
              {/* Email sent notification overlay */}
              {showSentNotif && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="bg-green-100 text-green-800 px-6 py-3 rounded-xl shadow-lg text-base font-semibold flex items-center gap-3 border border-green-200" style={{ boxShadow: '0 4px 24px 0 rgba(80,200,120,0.10)' }}>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Email sent!
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { TemplateLibraryPreviewHero, FavoritesPreviewHero }; 