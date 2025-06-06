"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Loader2, Save, Sparkles, RefreshCw, Trash2, Mail, ChevronDown, Edit2, Check, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { BriefcaseIcon, SmileIcon } from "lucide-react";
import { useEmailUsage } from "@/hooks/use-email-usage";
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { UserButton } from "@clerk/nextjs";

const TONES = [
  "Professional",
  "Witty",
  "Empathetic",
  "Direct",
  "Snarky",
];
const ROLES = [
  "Buyer",
  "Seller",
  "Buyer's Agent",
  "Listing Agent",
  "Closer",
  "Property Manager",
  "Assistant",
  "Notary",
  "Lender",
  "Processor",
  "Other",
];
const PLACEHOLDERS = [
  "Write a warm follow-up… or a cold one. Your call.",
  "Need a witty inspection reminder? Type it!",
  "'Congrats on closing!' or 'We need that addendum.'",
  "Short, sweet, and a little sassy.",
  "What do you want to say? BossyEmail delivers.",
];

export function EmailGenerator() {
  const { user } = useUser();
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("");
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0]);
  const placeholderIndex = useRef(0);
  const [typing, setTyping] = useState("");
  const { incrementUsage } = useEmailUsage();
  const [isEditing, setIsEditing] = useState(false);
  const [editSubject, setEditSubject] = useState("");
  const [editBody, setEditBody] = useState("");
  const [signature, setSignature] = useState("");
  const [accountName, setAccountName] = useState("");
  type HistoryItem = {
    prompt: string;
    subject: string;
    body: string;
    signature: string;
    timestamp: number;
  };
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Animated placeholder effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let i = 0;
    setTyping("");
    function type() {
      setTyping(placeholder.slice(0, i));
      if (i < placeholder.length) {
        i++;
        timeout = setTimeout(type, 35);
      }
    }
    type();
    return () => clearTimeout(timeout);
  }, [placeholder]);
  useEffect(() => {
    const interval = setInterval(() => {
      placeholderIndex.current = (placeholderIndex.current + 1) % PLACEHOLDERS.length;
      setPlaceholder(PLACEHOLDERS[placeholderIndex.current]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Load signature and name from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("bossyemail_account");
    if (stored) {
      const info = JSON.parse(stored);
      setSignature(info.signature || "");
      setAccountName(info.name || "");
    }
  }, []);

  // Helper to get the signature with name replaced
  function getFinalSignature() {
    if (!signature) return "";
    return signature.replace('[Your Name]', accountName || 'Your Name');
  }

  async function handleGenerate(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");
    setSubject("");
    setBody("");
    try {
      const res = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, tone, recipient, sender }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSubject(data.subject || "");
      setBody(data.body || "");
      setHistory(prev => [
        {
          prompt,
          subject: data.subject || "",
          body: data.body || "",
          signature: getFinalSignature(),
          timestamp: Date.now(),
        },
        ...prev
      ]);
      await incrementUsage();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    toast.success("Email copied to clipboard!", {
      description: "You can now paste it into your email client.",
      duration: 3000,
    });
  }

  function handleSave() {
    // TODO: Implement save functionality
    toast.success("Email saved!", {
      description: "You can find it in your templates.",
      duration: 3000,
    });
  }

  function handleClear() {
    setPrompt("");
    setSubject("");
    setBody("");
    setError("");
    toast.info("Form cleared", {
      duration: 2000,
    });
  }

  function handleEdit() {
    setEditSubject(subject);
    setEditBody(body);
    setIsEditing(true);
  }

  function handleEditSave() {
    setSubject(editSubject);
    setBody(editBody);
    setIsEditing(false);
    toast.success("Email updated.");
  }

  function handleEditCancel() {
    setIsEditing(false);
  }

  function handlePromptClear() {
    setPrompt("");
  }

  // Helper for pill button groups
  function PillGroup({ options, value, onChange, ariaLabel }: { options: string[], value: string, onChange: (v: string) => void, ariaLabel: string }) {
    return (
      <div className="flex gap-1" role="group" aria-label={ariaLabel}>
        {options.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${value === opt ? 'bg-black text-white border-black' : 'bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200'}`}
            aria-pressed={value === opt}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }

  function LoadingSkeleton() {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl w-full mx-auto font-sans px-2 sm:px-4 md:px-6 dark:bg-[#424242] dark:text-[#e0e0e0]" style={{ fontFamily: 'Inter, Roboto, SF Pro, Arial, sans-serif' }}>
      <h2 className="text-3xl font-bold mb-6 text-[#232326] dark:text-[#e0e0e0]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, WebkitFontSmoothing: 'antialiased' }}>
        Email Generator
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="resize-y overflow-auto min-h-[220px] max-h-[700px] rounded-3xl bg-white shadow-md border border-zinc-200 px-2 py-4 sm:px-4 sm:py-6 flex flex-col w-full"
      >
        <form className="w-full flex flex-col flex-grow" onSubmit={handleGenerate} aria-label="Smart Email Generator Form">
          <div className="flex flex-col flex-grow">
            <div className="relative w-full">
              <textarea
                className="w-full bg-transparent border border-zinc-300 outline-none px-4 py-2 text-base sm:text-lg font-normal placeholder-zinc-500 rounded-2xl transition-all duration-200 focus:ring-2 focus:ring-primary/80 focus:border-primary resize-none min-h-[48px] mb-0 pr-10"
                placeholder={typing || placeholder}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                aria-label="Prompt"
                required
                rows={2}
                style={{ minWidth: 0, overflow: 'hidden' }}
                tabIndex={0}
              />
              {prompt && (
                <button
                  type="button"
                  onClick={handlePromptClear}
                  className="absolute top-2 right-4 text-zinc-400 hover:text-zinc-700 text-xl focus:outline-none focus:ring-2 focus:ring-primary rounded-full bg-white"
                  aria-label="Clear prompt"
                  tabIndex={0}
                >
                  ×
                </button>
              )}
            </div>
          </div>
          {/* Dropdowns and action buttons in a single row */}
          <div className="flex flex-nowrap items-center gap-2 w-full mb-12 mt-0 overflow-x-auto min-h-[56px]">
            {/* Sender Dropdown (From) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full bg-zinc-50 border border-zinc-200 px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary min-w-[110px] shadow-sm"
                  aria-label="From"
                >
                  {sender ? sender : <span className="text-zinc-500">From</span>}
                  <ChevronDown className="w-4 h-4 ml-1 text-zinc-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="rounded-xl ring-0 border-0 p-1 !shadow-none !border-0">
                {ROLES.map(r => (
                  <DropdownMenuItem key={r} onClick={() => setSender(r)} className="py-1 px-2 text-sm rounded transition-colors hover:bg-zinc-100 focus:bg-zinc-100">
                    {r}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Recipient Dropdown (To) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full bg-zinc-50 border border-zinc-200 px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary min-w-[110px] shadow-sm"
                  aria-label="To"
                >
                  {recipient ? recipient : <span className="text-zinc-500">To</span>}
                  <ChevronDown className="w-4 h-4 ml-1 text-zinc-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="rounded-xl ring-0 border-0 p-1 !shadow-none !border-0">
                {ROLES.map(r => (
                  <DropdownMenuItem key={r} onClick={() => setRecipient(r)} className="py-1 px-2 text-sm rounded transition-colors hover:bg-zinc-100 focus:bg-zinc-100">
                    {r}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Tone Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full bg-zinc-50 border border-zinc-200 px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary min-w-[110px] shadow-sm"
                  aria-label="Tone"
                >
                  {tone ? tone : <span className="text-zinc-500">Tone</span>}
                  <ChevronDown className="w-4 h-4 ml-1 text-zinc-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[180px] rounded-xl ring-0 border-0 p-1 !shadow-none !border-0 bg-white">
                {TONES.map(toneOpt => (
                  <DropdownMenuItem
                    key={toneOpt}
                    onClick={() => setTone(toneOpt)}
                    className={`py-1 px-2 text-sm rounded transition-colors ${tone === toneOpt ? 'bg-zinc-100 text-black' : ''} hover:bg-zinc-100 focus:bg-zinc-100`}
                  >
                    <span>{toneOpt}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex-1" />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex items-center justify-center rounded-full bg-black text-white px-8 py-3 font-semibold shadow-md hover:brightness-110 transition disabled:opacity-60 ml-2 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={loading || !prompt || !sender || !recipient || !tone}
              aria-label="Generate Email"
              tabIndex={0}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-6 h-6 animate-spin" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Generate
                </motion.div>
              )}
            </motion.button>
          </div>
        </form>
        {/* Generated email preview below the form, after the thin line */}
        {loading ? (
          <LoadingSkeleton />
        ) : (subject || body) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col flex-grow justify-end min-h-[220px] mt-8"
          >
            <hr className="border-t border-zinc-200 mb-2" />
            <div>
              <div className="flex items-center mb-2">
                <span className="text-base font-bold text-zinc-900 mr-2">Subject:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editSubject}
                    onChange={e => setEditSubject(e.target.value)}
                    className="flex-1 border border-zinc-200 rounded-lg p-2 text-base"
                    autoFocus
                  />
                ) : (
                  <span className="text-base font-semibold text-zinc-800">{subject}</span>
                )}
              </div>
              {isEditing ? (
                <textarea
                  value={editBody}
                  onChange={e => setEditBody(e.target.value)}
                  className="resize-y min-h-[120px] w-full border border-zinc-200 rounded-lg p-3 text-base mb-2"
                />
              ) : (
                <div className="generated-email-body text-base text-zinc-900 mt-1">
                  {body
                    .split(/\n{2,}|(?<!\n)\n(?!\n)/)
                    .map(para => para.trim())
                    .filter(para => para.length > 0)
                    .map((para, idx) => (
                    <p key={idx} className="mb-4 whitespace-pre-line">{para}</p>
                  ))}
                  {getFinalSignature() && (
                    <>
                      <p className="mt-6 whitespace-pre-line">{getFinalSignature()}</p>
                    </>
                  )}
                </div>
              )}
              {isEditing && (
                <div className="flex gap-2 mt-2 justify-end">
                  <button onClick={handleEditSave} className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700" title="Save" aria-label="Save"><Check className="w-4 h-4" />Save</button>
                  <button onClick={handleEditCancel} className="flex items-center gap-1 bg-zinc-200 text-zinc-700 px-3 py-1 rounded hover:bg-zinc-300" title="Cancel" aria-label="Cancel"><X className="w-4 h-4" />Cancel</button>
                </div>
              )}
              {!isEditing && (
                <div className="flex gap-2 mt-4 justify-end items-center">
                  <button onClick={handleCopy} className="icon-button" title="Copy Email" aria-label="Copy Email" tabIndex={0}><Copy className="w-5 h-5" /></button>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
                    className="icon-button"
                    title="Send Email"
                    aria-label="Send Email"
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={0}
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <button onClick={handleGenerate} className="icon-button" title="Regenerate" aria-label="Regenerate Email" tabIndex={0}><RefreshCw className="w-5 h-5" /></button>
                  <button onClick={handleSave} className="icon-button" title="Save Email" aria-label="Save Email" tabIndex={0}><Save className="w-5 h-5" /></button>
                  <button onClick={handleEdit} className="icon-button" title="Edit Email" aria-label="Edit Email" tabIndex={0}><Edit2 className="w-5 h-5" /></button>
                  <button onClick={handleClear} className="icon-button" title="Clear Email" aria-label="Clear Email" tabIndex={0}><Trash2 className="w-5 h-5" /></button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-destructive text-sm mt-4"
            aria-live="polite"
          >
            {error}
          </motion.div>
        )}
      </motion.div>
      <style jsx global>{`
        .fab {
          background: #fff;
          color: #2563eb;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          cursor: pointer;
          border: 1px solid #e0e7ff;
          margin-bottom: 4px;
          transition: background 0.2s, color 0.2s;
        }
        .fab:hover { background: #2563eb; color: #fff; }
        .icon-button {
          background: none;
          border: none;
          cursor: pointer;
          color: #222;
          padding: 6px;
          border-radius: 50%;
          transition: color 0.2s, background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-button:hover, .icon-button:focus { color: #2563eb; background: #e0e7ff; outline: none; }
        body, .font-sans { font-family: 'Inter', 'Roboto', 'SF Pro', Arial, sans-serif; }
        .generated-email-body {
          line-height: 1.7;
        }
        .generated-email-body p, .generated-email-body br {
          margin-bottom: 1em;
        }
        @media (max-width: 640px) {
          .generated-email-body, .icon-button, .fab {
            font-size: 1rem;
          }
          .icon-button, .fab {
            min-width: 44px;
            min-height: 44px;
          }
        }
      `}</style>
    </div>
  );
} 