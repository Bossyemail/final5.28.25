"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Loader2, Save, Sparkles, RefreshCw, Trash2, Mail, ChevronDown, Edit2, Check, X, ThumbsUp, ThumbsDown } from "lucide-react";
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
import ReactMarkdown from "react-markdown";
import { marked } from "marked";

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

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  subject?: string;
  body?: string;
  timestamp: number;
}

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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [feedback, setFeedback] = useState<Record<string, 'like' | 'dislike' | undefined>>({});
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [pinned, setPinned] = useState<Record<string, boolean>>({});
  const [searchChat, setSearchChat] = useState("");

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
    if (!prompt) return;
    setLoading(true);
    setError("");
    try {
      // Add user message to thread
      const userMsg: ChatMessage = {
        id: `${Date.now()}-user`,
        type: 'user',
        content: prompt,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, userMsg]);
      // Call API
      const res = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, tone, recipient, sender }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      // Add AI message to thread
      const aiMsg: ChatMessage = {
        id: `${Date.now()}-ai`,
        type: 'ai',
        content: `Subject: ${data.subject || ''}\n\n${data.body || ''}`,
        subject: data.subject || '',
        body: data.body || '',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMsg]);
      await incrementUsage();
      setPrompt("");
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

  function copyHtmlFromMarkdown(markdown: string) {
    const html = typeof marked.parse === 'function' ? marked.parse(markdown) : '';
    if (typeof html === 'string') {
      navigator.clipboard.writeText(html);
    } else if (html instanceof Promise) {
      html.then(res => navigator.clipboard.writeText(res));
    }
  }

  function handleTouchStart(e: React.TouchEvent, msgId: string) {
    touchStartX.current = e.changedTouches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent, msg: ChatMessage) {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const dx = touchEndX.current - touchStartX.current;
      if (dx > 60) {
        // Swipe right: favorite
        setFavorites(f => ({ ...f, [msg.id]: !f[msg.id] }));
        toast.success(favorites[msg.id] ? 'Removed from favorites' : 'Added to favorites');
      } else if (dx < -60) {
        // Swipe left: copy
        if (msg.body) {
          navigator.clipboard.writeText(msg.body);
          toast.success('Copied to clipboard!');
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  }

  function TypingIndicator() {
    const [dots, setDots] = useState('');
    useEffect(() => {
      if (!dots && typeof window === 'undefined') return;
      const interval = setInterval(() => {
        setDots(prev => prev.length < 3 ? prev + '.' : '');
      }, 500);
      return () => clearInterval(interval);
    }, []);
    return (
      <div className="flex items-center gap-2">
        <span>BossyEmail is writing{dots}</span>
      </div>
    );
  }

  // Filtered and pinned messages
  const pinnedMessages = messages.filter(m => pinned[m.id]);
  const filteredMessages = messages.filter(m => {
    if (pinned[m.id]) return false; // Don't show pinned in main thread
    if (!searchChat.trim()) return true;
    const text = (m.subject || "") + " " + (m.body || m.content || "");
    return text.toLowerCase().includes(searchChat.toLowerCase());
  });

  return (
    <div className="max-w-3xl w-full mx-auto font-sans px-2 sm:px-4 md:px-6 dark:bg-[#424242] dark:text-[#e0e0e0] flex flex-col h-[80vh]">
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Search bar */}
        <div className="mb-4 sticky top-0 z-10 bg-white dark:bg-[#424242] pt-2 pb-2">
          <input
            type="text"
            value={searchChat}
            onChange={e => setSearchChat(e.target.value)}
            placeholder="Search chat..."
            className="w-full px-4 py-2 rounded-full border border-zinc-300 dark:border-[#757575] bg-white dark:bg-[#616161] text-zinc-900 dark:text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-black text-base"
          />
        </div>
        {/* Pinned section */}
        {pinnedMessages.length > 0 && (
          <div className="mb-6">
            <div className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">Pinned</div>
            {pinnedMessages.map((msg, idx) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`rounded-xl px-4 py-3 max-w-[80%] bg-yellow-50 border border-yellow-300 text-yellow-900`} style={{ fontFamily: 'Inter, sans-serif', position: 'relative', fontSize: '1.1em', wordBreak: 'break-word', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  {msg.type === 'ai' && msg.subject && (
                    <div className="font-bold mb-1">Subject: {msg.subject}</div>
                  )}
                  {msg.type === 'ai' && msg.body ? (
                    <>
                      <div className="mb-2">
                        {msg.subject && (
                          <div className="font-bold text-lg mb-1">Subject: {msg.subject}</div>
                        )}
                        <ReactMarkdown components={{ p: ({node, ...props}) => <p className="prose prose-zinc dark:prose-invert max-w-none text-base leading-relaxed" {...props} /> }}>{msg.body}</ReactMarkdown>
                      </div>
                      <div className="flex flex-row gap-2 mt-2 mb-1 items-center justify-start">
                        <button
                          className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white"
                          style={{ width: 28, height: 28 }}
                          onClick={() => {
                            navigator.clipboard.writeText(`Subject: ${msg.subject || ''}\n\n${msg.body || ''}`);
                            toast.success('Copied to clipboard!');
                          }}
                          title="Copy"
                          type="button"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <a
                          href={`mailto:?subject=${encodeURIComponent(msg.subject || '')}&body=${encodeURIComponent(msg.body || '')}`}
                          className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white"
                          style={{ width: 28, height: 28 }}
                          title="Send"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                        <button
                          className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white"
                          style={{ width: 28, height: 28 }}
                          onClick={() => handleGenerate()}
                          title="Rewrite"
                          type="button"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button
                          className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white"
                          style={{ width: 28, height: 28 }}
                          onClick={handleEdit}
                          title="Edit"
                          type="button"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white"
                          style={{ width: 28, height: 28 }}
                          onClick={() => {
                            setMessages(prev => prev.filter(m => m.id !== msg.id));
                          }}
                          title="Delete"
                          type="button"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div>{msg.content}</div>
                  )}
                  {/* Pin button */}
                  <button
                    aria-label="Unpin"
                    className="absolute top-2 right-2 rounded-full p-2 bg-yellow-200 hover:bg-yellow-300 text-yellow-900"
                    onClick={() => setPinned(p => ({ ...p, [msg.id]: false }))}
                    type="button"
                    style={{ fontSize: '1.1em' }}
                  >
                    📌
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Main chat thread (filtered) */}
        {filteredMessages.length === 0 && (
          <div className="text-center text-zinc-400 mt-12">No messages yet. Start by entering a prompt below.</div>
        )}
        {filteredMessages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            onTouchStart={msg.type === 'ai' ? (e) => handleTouchStart(e, msg.id) : undefined}
            onTouchEnd={msg.type === 'ai' ? (e) => handleTouchEnd(e, msg) : undefined}
          >
            <div
              className={`rounded-xl px-4 py-3 max-w-[80%] ${msg.type === 'user' ? 'bg-black text-white' : 'text-black dark:text-[#e0e0e0]'} ${favorites[msg.id] ? 'ring-2 ring-yellow-400' : ''}`}
              style={{ whiteSpace: 'pre-line', fontFamily: 'Inter, sans-serif', position: 'relative', fontSize: '1.1em', wordBreak: 'break-word', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              {msg.type === 'ai' && msg.subject && (
                <div className="font-bold mb-1">Subject: {msg.subject}</div>
              )}
              {msg.type === 'ai' && msg.body ? (
                <>
                  <div className="mb-2">
                    {msg.subject && (
                      <div className="font-bold text-lg mb-1">Subject: {msg.subject}</div>
                    )}
                    <ReactMarkdown components={{ p: ({node, ...props}) => <p className="prose prose-zinc dark:prose-invert max-w-none text-base leading-relaxed" {...props} /> }}>{msg.body}</ReactMarkdown>
                  </div>
                  <div className="flex flex-row gap-2 mt-2 mb-1 items-center justify-start">
                    <button
                      className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white"
                      style={{ width: 28, height: 28 }}
                      onClick={() => {
                        navigator.clipboard.writeText(`Subject: ${msg.subject || ''}\n\n${msg.body || ''}`);
                        toast.success('Copied to clipboard!');
                      }}
                      title="Copy"
                      type="button"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <a
                      href={`mailto:?subject=${encodeURIComponent(msg.subject || '')}&body=${encodeURIComponent(msg.body || '')}`}
                      className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white"
                      style={{ width: 28, height: 28 }}
                      title="Send"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <button
                      className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white"
                      style={{ width: 28, height: 28 }}
                      onClick={() => handleGenerate()}
                      title="Rewrite"
                      type="button"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                      className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white"
                      style={{ width: 28, height: 28 }}
                      onClick={handleEdit}
                      title="Edit"
                      type="button"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white"
                      style={{ width: 28, height: 28 }}
                      onClick={() => {
                        setMessages(prev => prev.filter(m => m.id !== msg.id));
                      }}
                      title="Delete"
                      type="button"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {/* Like/Dislike buttons for AI responses */}
                  <div className="flex gap-2 mt-2 items-center">
                    <button
                      aria-label="Like"
                      className={`rounded-full p-2 transition-colors ${feedback[msg.id]==='like' ? 'bg-green-100 text-green-700' : 'hover:bg-zinc-200'}`}
                      onClick={() => setFeedback(f => ({ ...f, [msg.id]: f[msg.id]==='like' ? undefined : 'like' }))}
                      type="button"
                    >
                      <ThumbsUp className="w-5 h-5" fill={feedback[msg.id]==='like' ? '#22c55e' : 'none'} />
                    </button>
                    <button
                      aria-label="Dislike"
                      className={`rounded-full p-2 transition-colors ${feedback[msg.id]==='dislike' ? 'bg-red-100 text-red-700' : 'hover:bg-zinc-200'}`}
                      onClick={() => setFeedback(f => ({ ...f, [msg.id]: f[msg.id]==='dislike' ? undefined : 'dislike' }))}
                      type="button"
                    >
                      <ThumbsDown className="w-5 h-5" fill={feedback[msg.id]==='dislike' ? '#ef4444' : 'none'} />
                    </button>
                    {/* Reference button */}
                    <button
                      aria-label="Reference this email"
                      className="rounded-full p-2 transition-colors hover:bg-blue-100 text-blue-700 ml-2"
                      type="button"
                      onClick={() => {
                        const summary = `Follow up on: ${msg.subject || 'previous email'}\n\n"${(msg.body || msg.content).slice(0, 200)}${(msg.body || msg.content).length > 200 ? '...' : ''}"`;
                        setPrompt(summary);
                      }}
                    >
                      <span className="text-xs font-semibold">Reference</span>
                    </button>
                  </div>
                  {msg.type === 'ai' && (
                    <button
                      aria-label={favorites[msg.id] ? 'Unfavorite' : 'Favorite'}
                      className={`ml-2 rounded-full p-2 transition-colors ${favorites[msg.id] ? 'bg-yellow-100 text-yellow-700' : 'hover:bg-yellow-50'} hidden sm:inline-flex`}
                      style={{ fontSize: '1.2em' }}
                      onClick={() => setFavorites(f => ({ ...f, [msg.id]: !f[msg.id] }))}
                      type="button"
                    >
                      <span role="img" aria-label="star">⭐</span>
                    </button>
                  )}
                </>
              ) : (
                <div>{msg.content}</div>
              )}
              {/* Pin button */}
              {msg.type === 'ai' && (
                <button
                  aria-label={pinned[msg.id] ? 'Unpin' : 'Pin'}
                  className={`absolute top-2 right-2 rounded-full p-2 ${pinned[msg.id] ? 'bg-yellow-200 text-yellow-900' : 'bg-zinc-200 text-zinc-700 hover:bg-yellow-100'} transition-colors`}
                  onClick={() => setPinned(p => ({ ...p, [msg.id]: !p[msg.id] }))}
                  type="button"
                  style={{ fontSize: '1.1em' }}
                >
                  📌
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="rounded-xl px-4 py-3 max-w-[80%] bg-zinc-100 dark:bg-[#616161] text-black dark:text-[#e0e0e0] font-sans">
              <TypingIndicator />
            </div>
          </div>
        )}
      </div>
      {/* Sticky input at bottom */}
      <form onSubmit={handleGenerate} className="w-full flex items-start gap-2 bg-white dark:bg-[#424242] p-2 border-t border-zinc-200 dark:border-[#616161] sticky bottom-0 z-10" style={{ minHeight: 64 }}>
        <div className="flex-1 flex flex-col">
          <textarea
            className="w-full px-4 py-3 rounded-full border border-zinc-300 dark:border-[#757575] bg-white dark:bg-[#616161] text-zinc-900 dark:text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-black text-base sm:text-lg resize-none min-h-[48px] max-h-[160px] overflow-auto"
            placeholder={typing || placeholder}
            value={prompt}
            onChange={e => {
              setPrompt(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            required
            rows={1}
            style={{ minHeight: 48, borderRadius: 9999 }}
          />
          {/* Selectors below the textarea, with spacing */}
          <div className="flex flex-row gap-2 items-center mt-3 pl-2">
            <select
              value={sender}
              onChange={e => setSender(e.target.value)}
              className="rounded-full border border-zinc-200 dark:border-[#757575] bg-zinc-50 dark:bg-[#616161] text-zinc-900 dark:text-[#e0e0e0] font-semibold text-xs w-[90px] min-w-[70px] px-3 py-1 shadow-sm focus:ring-2 focus:ring-black focus:border-black transition-all duration-150 hover:border-black outline-none"
            >
              <option value="">From</option>
              {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
            <select
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              className="rounded-full border border-zinc-200 dark:border-[#757575] bg-zinc-50 dark:bg-[#616161] text-zinc-900 dark:text-[#e0e0e0] font-semibold text-xs w-[90px] min-w-[70px] px-3 py-1 shadow-sm focus:ring-2 focus:ring-black focus:border-black transition-all duration-150 hover:border-black outline-none"
            >
              <option value="">To</option>
              {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
            <select
              value={tone}
              onChange={e => setTone(e.target.value)}
              className="rounded-full border border-zinc-200 dark:border-[#757575] bg-zinc-50 dark:bg-[#616161] text-zinc-900 dark:text-[#e0e0e0] font-semibold text-xs w-[90px] min-w-[70px] px-3 py-1 shadow-sm focus:ring-2 focus:ring-black focus:border-black transition-all duration-150 hover:border-black outline-none"
            >
              <option value="">Tone</option>
              {TONES.map(toneOpt => <option key={toneOpt} value={toneOpt}>{toneOpt}</option>)}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="self-start bg-black text-white rounded-full px-6 py-3 font-semibold shadow-md hover:brightness-110 transition disabled:opacity-60 mt-0"
          disabled={loading || !prompt}
          style={{ minHeight: 48 }}
        >
          Go
        </button>
        {/* Floating Action Button (FAB) for mobile */}
        <button
          type="submit"
          className="fixed bottom-20 right-4 z-20 bg-black text-white rounded-full p-4 shadow-lg sm:hidden flex items-center justify-center"
          style={{ fontSize: 22, boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}
          disabled={loading || !prompt}
          aria-label="Go"
        >
          Go
        </button>
      </form>
      <style jsx global>{`
        @media (max-width: 640px) {
          .prose, .prose-invert, .prose-zinc {
            font-size: 1.05em !important;
          }
          .rounded-xl {
            border-radius: 1.2em !important;
          }
          .p-2, .px-4, .py-3 {
            padding: 0.9em !important;
          }
          .icon-button, .rounded-full, button {
            min-width: 44px;
            min-height: 44px;
            font-size: 1.1em;
          }
        }
      `}</style>
    </div>
  );
} 