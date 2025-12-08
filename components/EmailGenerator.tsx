"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Loader2, Save, Sparkles, RefreshCw, Trash2, Mail, Check, X, ThumbsUp, ThumbsDown, Mic, MicOff, ArrowRight, SlidersHorizontal, ChevronDown } from "lucide-react";
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
import React from "react";

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
  
  // New features
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [optionsExpanded, setOptionsExpanded] = useState(false);

  // Initialize voice recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      try {
        const SpeechRecognition = (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setPrompt(transcript);
          setIsListening(false);
        };
        
        recognition.onerror = (event: any) => {
          console.log('Speech recognition error:', event.error);
          setIsListening(false);
          
          // Show user-friendly error messages
          if (event.error === 'not-allowed') {
            toast.error('Microphone permission denied. Please enable microphone access in your browser settings.');
          } else if (event.error === 'no-speech') {
            toast.error('No speech detected. Please try again.');
          } else if (event.error === 'network') {
            toast.error('Network error. Please check your connection and try again.');
          } else {
            toast.error('Voice input error. Please try again.');
          }
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        setRecognition(recognition);
      } catch (error) {
        console.log('Speech recognition not supported:', error);
      }
    }
  }, []);

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

  // Load signature and account info from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("bossyemail_account");
    if (stored) {
      const info = JSON.parse(stored);
      setSignature(info.signature || "");
      setAccountName(info.name || "");
    }
  }, []);

  // Helper to get the full signature with all account details
  function getFullSignature() {
    const stored = localStorage.getItem("bossyemail_account");
    if (!stored) return "";
    
    try {
      const info = JSON.parse(stored);
      if (!info.signature) return "";
      
      let fullSig = info.signature.replace('[Your Name]', info.name || 'Your Name');
      
      // Append additional account details if they exist
      if (info.title) fullSig += `\n${info.title}`;
      if (info.company) fullSig += `\n${info.company}`;
      if (info.address) fullSig += `\n${info.address}`;
      if (info.phone) fullSig += `\nPhone: ${info.phone}`;
      if (info.office) fullSig += `\nOffice: ${info.office}`;
      if (info.fax) fullSig += `\nFax: ${info.fax}`;
      if (info.email) fullSig += `\n${info.email}`;
      
      return fullSig;
    } catch (e) {
      console.error("Failed to parse account info:", e);
      return "";
    }
  }

  async function handleGenerate(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!prompt.trim()) {
      setError("Please enter a prompt to generate an email.");
      return;
    }
    setLoading(true);
    setError("");
    setIsStreaming(true);
    setStreamingContent("");
    
    // Add user message to thread
    const userMsg: ChatMessage = {
      id: `${Date.now()}-user`,
      type: 'user',
      content: prompt,
      timestamp: Date.now(),
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    
    try {

      // Create AI message placeholder for streaming
      const aiMsgId = `${Date.now()}-ai`;
      const aiMsg: ChatMessage = {
        id: aiMsgId,
        type: 'ai',
        content: '',
        subject: '',
        body: '',
        timestamp: Date.now(),
      };
      const messagesWithAI = [...newMessages, aiMsg];
      setMessages(messagesWithAI);

      // Call streaming API
      let res: Response;
      try {
        res = await fetch("/api/generate-email-stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, tone, recipient, sender }),
        });
      } catch (fetchError: any) {
        console.error('Fetch error:', fetchError);
        throw new Error(fetchError.message || "Network error. Please check your connection and try again.");
      }

      if (!res.ok) {
        let errorText = '';
        try {
          errorText = await res.text();
        } catch (e) {
          errorText = `Server error (${res.status})`;
        }
        console.error('API error response:', errorText, 'Status:', res.status);
        throw new Error(errorText || `Failed to generate email (${res.status})`);
      }

      const reader = res.body?.getReader();
      if (!reader) {
        throw new Error('No response body from server');
      }

      let fullContent = '';
      let subject = '';
      let body = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = new TextDecoder().decode(value, { stream: true });
          fullContent += chunk;
          setStreamingContent(fullContent);

          // Try to parse JSON when we have complete content
          // Look for JSON object boundaries
          const jsonMatch = fullContent.match(/\{[\s\S]*"subject"[\s\S]*"body"[\s\S]*\}/);
          if (jsonMatch) {
            try {
              const parsed = JSON.parse(jsonMatch[0]);
              if (parsed.subject && parsed.body) {
                subject = parsed.subject;
                body = parsed.body;
                break;
              }
            } catch (e) {
              // JSON might still be incomplete, continue
            }
          }
        }

        // After streaming is complete, try to parse the full content as JSON
        if (!subject || !body) {
          // Try to find and parse JSON in the content
          const jsonMatch = fullContent.match(/\{[\s\S]*"subject"[\s\S]*"body"[\s\S]*\}/);
          if (jsonMatch) {
            try {
              const parsed = JSON.parse(jsonMatch[0]);
              if (parsed.subject && parsed.body) {
                subject = parsed.subject;
                body = parsed.body;
              }
            } catch (e) {
              console.error('Failed to parse JSON:', e);
            }
          }
        }

        // If we still didn't get JSON, try to extract subject and body from the content
        if (!subject || !body) {
          const lines = fullContent.split('\n');
          let subjectLine = '';
          let bodyStart = -1;
          
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].toLowerCase().includes('subject:')) {
              subjectLine = lines[i].replace(/subject:\s*/i, '').trim();
              bodyStart = i + 1;
              break;
            }
          }
          
          if (subjectLine && bodyStart > 0) {
            subject = subjectLine;
            body = lines.slice(bodyStart).join('\n').trim();
          } else if (fullContent.trim()) {
            // Fallback: use the full content as body
            subject = 'Email Response';
            body = fullContent.trim();
          } else {
            throw new Error('No content received from server');
          }
        }
      } catch (streamError: any) {
        console.error('Streaming error:', streamError);
        throw new Error(streamError.message || 'Error reading streaming response');
      }

      // Append signature to body
      const fullSignature = getFullSignature();
      const bodyWithSignature = fullSignature ? `${body}\n\n${fullSignature}` : body;

      // Update the AI message with final content
      const finalAiMsg: ChatMessage = {
        ...aiMsg,
        content: `Subject: ${subject}\n\n${bodyWithSignature}`,
        subject,
        body: bodyWithSignature,
      };

      const finalMessages = [...newMessages, finalAiMsg];
      setMessages(finalMessages);
      
      await incrementUsage();
      setPrompt("");
    } catch (err: any) {
      console.error('Generation error:', err);
      
      // Provide more specific error messages
      let errorMessage = "Something went wrong.";
      if (err.message) {
        errorMessage = err.message;
      } else if (err.name === 'TypeError' && err.message?.includes('fetch')) {
        errorMessage = "Network error. Please check your connection and try again.";
      } else if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
        errorMessage = "Please sign in to generate emails.";
      } else if (err.message?.includes('403') || err.message?.includes('limit')) {
        errorMessage = "You've reached your free email limit. Please subscribe to continue.";
      }
      
      setError(errorMessage);
      
      // Remove the placeholder AI message if it was added
      setMessages(newMessages);
      
      // Fallback to regular API if streaming fails
      try {
        console.log('Attempting fallback to non-streaming API...');
        const fallbackRes = await fetch("/api/generate-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, tone, recipient, sender }),
        });
        
        if (!fallbackRes.ok) {
          const errorText = await fallbackRes.text();
          throw new Error(errorText || `Failed to generate email (${fallbackRes.status})`);
        }
        
        const fallbackData = await fallbackRes.json();
        if (fallbackData.error) throw new Error(fallbackData.error);
        
        // Append signature to fallback body
        const fullSignature = getFullSignature();
        const fallbackBodyWithSignature = fullSignature 
          ? `${fallbackData.body || ''}\n\n${fullSignature}` 
          : (fallbackData.body || '');

        const fallbackAiMsg: ChatMessage = {
          id: `${Date.now()}-ai`,
          type: 'ai',
          content: `Subject: ${fallbackData.subject || ''}\n\n${fallbackBodyWithSignature}`,
          subject: fallbackData.subject || '',
          body: fallbackBodyWithSignature,
          timestamp: Date.now(),
        };
        
        const fallbackMessages = [...newMessages, fallbackAiMsg];
        setMessages(fallbackMessages);
        await incrementUsage();
        setPrompt("");
        setError("");
      } catch (fallbackErr: any) {
        console.error('Fallback error:', fallbackErr);
        // Only update error if fallback also failed
        if (!errorMessage.includes('limit') && !errorMessage.includes('Unauthorized')) {
          setError(fallbackErr.message || "Failed to generate email. Please try again.");
        }
      }
    } finally {
      setLoading(false);
      setIsStreaming(false);
      setStreamingContent("");
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

  // Voice input functions
  const startListening = () => {
    if (recognition) {
      try {
        setIsListening(true);
        recognition.start();
      } catch (error: any) {
        console.error('Error starting voice recognition:', error);
        setIsListening(false);
        if (error.name === 'InvalidStateError') {
          toast.error('Voice recognition is already running. Please wait.');
        } else {
          toast.error('Unable to start voice input. Please try again.');
        }
      }
    } else {
      toast.error('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.');
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  // Conversation management
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
            className={`px-4 py-2 rounded-none text-sm font-medium transition-colors border ${value === opt ? 'text-[#161616] bg-[#FBFBFB] border-[#161616]' : 'bg-white text-[#505050] border-[#E3E3E3] hover:bg-[#FBFBFB] hover:border-[#ABABAB]'}`}
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: value === opt ? 500 : 400 }}
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

  // Custom renderer for ReactMarkdown to highlight [Placeholders]
  function renderWithPlaceholders(text: string) {
    const parts = text.split(/(\[.*?\])/g);
    return parts.map((part, i) => {
      if (/^\[.*\]$/.test(part)) {
        return (
          <span key={i} className="italic px-1 rounded" style={{ color: 'var(--accent-1)', backgroundColor: 'var(--accent-1-10)' }}>{part}</span>
        );
      }
      return part;
    });
  }

  return (
    <div className="flex h-[80vh] bg-white dark:bg-[#161616] transition-colors">
      {/* Main Chat Area */}
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-[#161616] dark:text-white flex flex-col" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
      <div className="flex-1 overflow-y-auto pb-4">
        
        {/* Pinned section */}
        {pinnedMessages.length > 0 && (
          <div className="mb-6">
            <div className="text-xs font-semibold text-[#ABABAB] mb-2 uppercase tracking-wide" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>Pinned</div>
            {pinnedMessages.map((msg, idx) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`rounded-none px-4 py-3 max-w-[80%] bg-white border border-[#E3E3E3] text-[#161616]`} style={{ fontFamily: 'var(--font-inter-tight), sans-serif', position: 'relative', fontSize: '1em', wordBreak: 'break-word' }}>
                  {msg.type === 'ai' && msg.subject && (
                    <div className="font-normal text-base mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400 }}>Subject: {msg.subject}</div>
                  )}
                  {msg.type === 'ai' && msg.body ? (
                    <>
                      <div className="mb-2">
                        <ReactMarkdown
                          components={{
                            p: ({node, ...props}) => <p className="text-base text-[#161616] dark:text-white leading-relaxed mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400 }} {...props} />,
                            text: ({children}) => <>{renderWithPlaceholders(children as string)}</>
                          }}
                        >
                          {msg.body}
                        </ReactMarkdown>
                      </div>
                      <div className="flex flex-row justify-between mt-6 pt-3 border-t border-[#E3E3E3] items-end">
                        {/* Left group: Like, Dislike, Favorite */}
                        <div className="flex flex-row gap-2 items-center">
                          <button
                            aria-label="Like"
                            className={`rounded-none p-2 transition-colors flex items-center justify-center border border-[#E3E3E3] ${feedback[msg.id]==='like' ? 'bg-[#FBFBFB] border-[#161616] text-[#161616]' : 'hover:bg-[#FBFBFB] text-[#ABABAB] hover:text-[#161616] hover:border-[#ABABAB]'}`}
                            onClick={() => setFeedback(f => ({ ...f, [msg.id]: f[msg.id]==='like' ? undefined : 'like' }))}
                            type="button"
                            style={{ width: 36, height: 36 }}
                          >
                            <ThumbsUp className="w-5 h-5" fill={feedback[msg.id]==='like' ? '#22c55e' : 'none'} />
                          </button>
                          <button
                            aria-label="Dislike"
                            className={`rounded-none p-2 transition-colors flex items-center justify-center border border-[#E3E3E3] ${feedback[msg.id]==='dislike' ? 'bg-[#FBFBFB] border-[#161616] text-[#161616]' : 'hover:bg-[#FBFBFB] text-[#ABABAB] hover:text-[#161616] hover:border-[#ABABAB]'}`}
                            onClick={() => setFeedback(f => ({ ...f, [msg.id]: f[msg.id]==='dislike' ? undefined : 'dislike' }))}
                            type="button"
                            style={{ width: 36, height: 36 }}
                          >
                            <ThumbsDown className="w-5 h-5" fill={feedback[msg.id]==='dislike' ? '#ef4444' : 'none'} />
                          </button>
                          <button
                            aria-label={favorites[msg.id] ? 'Unfavorite' : 'Favorite'}
                            className={`rounded-none p-2 transition-colors flex items-center justify-center border border-[#E3E3E3] ${favorites[msg.id] ? 'bg-[#FBFBFB] border-[#161616] text-[#161616]' : 'hover:bg-[#FBFBFB] text-[#ABABAB] hover:text-[#161616] hover:border-[#ABABAB]'}`}
                            style={{ width: 36, height: 36 }}
                            onClick={() => setFavorites(f => ({ ...f, [msg.id]: !f[msg.id] }))}
                            type="button"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill={favorites[msg.id] ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-6.16 3.73 1.64-7.03L2 9.24l7.19-.61L12 2.5l2.81 6.13 7.19.61-5.48 4.71 1.64 7.03z" />
                            </svg>
                          </button>
                        </div>
                        {/* Right group: Copy, Send, Delete */}
                        <div className="flex flex-row gap-1 items-center">
                          <button
                            className="flex items-center justify-center text-[#ABABAB] hover:text-[#161616] rounded-none border border-[#E3E3E3] hover:bg-[#FBFBFB] hover:border-[#ABABAB] p-2 transition"
                            style={{ width: 36, height: 36 }}
                            onClick={() => {
                              navigator.clipboard.writeText(`Subject: ${msg.subject || ''}\n\n${msg.body || ''}`);
                              toast.success('Copied!', { duration: 1200 });
                            }}
                            title="Copy"
                            type="button"
                          >
                            <Copy className="w-5 h-5" />
                          </button>
                          <a
                            href={`mailto:?subject=${encodeURIComponent(msg.subject || '')}&body=${encodeURIComponent(msg.body || '')}`}
                            className="flex items-center justify-center text-[#ABABAB] hover:text-[#161616] rounded-none border border-[#E3E3E3] hover:bg-[#FBFBFB] hover:border-[#ABABAB] p-2 transition"
                            style={{ width: 36, height: 36 }}
                            title="Send"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Mail className="w-5 h-5" />
                          </a>
                          <button
                            className="flex items-center justify-center text-[#ABABAB] hover:text-[#161616] rounded-none border border-[#E3E3E3] hover:bg-[#FBFBFB] hover:border-[#ABABAB] p-2 transition"
                            style={{ width: 36, height: 36 }}
                            onClick={() => {
                              setPrompt(msg.content.split('\n\n')[0] || '');
                              handleGenerate();
                            }}
                            title="Regenerate"
                            type="button"
                          >
                            <RefreshCw className="w-5 h-5" />
                          </button>
                          <button
                            className="flex items-center justify-center text-[#ABABAB] hover:text-[#161616] rounded-none border border-[#E3E3E3] hover:bg-[#FBFBFB] hover:border-[#ABABAB] p-2 transition"
                            style={{ width: 36, height: 36 }}
                            onClick={() => {
                              setMessages(prev => prev.filter(m => m.id !== msg.id));
                            }}
                            title="Delete"
                            type="button"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>{msg.content}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
              )}
        {/* Error display */}
        {error && (
                  <div className="mb-4 p-4 bg-[#FBFBFB] dark:bg-[#292929] border border-[#E3E3E3] dark:border-[#292929] rounded-none text-[#161616] dark:text-white">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}
        
        {/* Main chat thread (filtered) */}
        {filteredMessages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center mt-20 mb-8 w-full">
            <div className="text-2xl font-normal text-[#161616] dark:text-white mb-8" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400 }}>How can I help you today?</div>
            
            {/* Input form - shown when no messages */}
            <div className="w-full max-w-2xl">
              <form onSubmit={handleGenerate} className="w-full" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
                {/* Selected options tags */}
                {(sender || recipient || tone) && !optionsExpanded && (
                  <div className="flex flex-row gap-2 items-center flex-wrap mb-3">
                    {sender && (
                      <span className="text-xs text-[#505050] px-2 py-1 bg-[#FBFBFB] border border-[#E3E3E3] rounded-md">
                        From: {sender}
                      </span>
                    )}
                    {recipient && (
                      <span className="text-xs text-[#505050] px-2 py-1 bg-[#FBFBFB] border border-[#E3E3E3] rounded-md">
                        To: {recipient}
                      </span>
                    )}
                    {tone && (
                      <span className="text-xs text-[#505050] px-2 py-1 bg-[#FBFBFB] border border-[#E3E3E3] rounded-md">
                        Tone: {tone}
                      </span>
                    )}
                  </div>
                )}
                
                {/* Main input area */}
                <div className="relative">
                  {/* Text input container */}
                  <div className="flex-1 relative bg-white dark:bg-[#1a1a1a] rounded-2xl border border-[#E3E3E3] dark:border-[#292929] shadow-sm hover:shadow-md transition-all focus-within:border-[#161616] dark:focus-within:border-white focus-within:shadow-md">
                    <div className="relative flex items-center">
                      <textarea
                        className="w-full pl-12 pr-20 py-4 bg-transparent text-base text-[#161616] dark:text-white placeholder-[#ABABAB] focus:outline-none resize-none overflow-hidden rounded-t-2xl"
                        placeholder={typing || placeholder || 'Message BossyEmail...'}
                        value={prompt}
                        onChange={e => {
                          setPrompt(e.target.value);
                          e.target.style.height = 'auto';
                          e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                        }}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleGenerate();
                          }
                        }}
                        required
                        rows={1}
                        style={{ minHeight: 56, maxHeight: 200, fontFamily: 'var(--font-inter-tight), sans-serif' }}
                      />
                      
                      {/* Expand options button - left side, vertically centered */}
                      <button
                        type="button"
                        onClick={() => setOptionsExpanded(!optionsExpanded)}
                        className={`absolute left-4 z-10 p-1.5 rounded-lg transition-colors flex items-center justify-center ${
                          optionsExpanded || sender || recipient || tone
                            ? 'text-[#161616] bg-[#FBFBFB]' 
                            : 'text-[#ABABAB] hover:text-[#505050] hover:bg-[#FBFBFB]'
                        }`}
                        style={{ top: '50%', transform: 'translateY(-50%)', height: '24px', width: '24px' }}
                        title="Expand options"
                      >
                        <SlidersHorizontal className="w-4 h-4" />
                      </button>
                      
                      {/* Mic and Send buttons - right side, vertically centered */}
                      <div className="absolute right-3 flex items-center gap-2" style={{ top: '50%', transform: 'translateY(-50%)' }}>
                        <button
                          type="button"
                          onClick={isListening ? stopListening : startListening}
                          disabled={!recognition && !isListening}
                          className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
                            isListening 
                              ? 'text-[#161616] bg-[#FBFBFB] animate-pulse' 
                              : !recognition
                              ? 'text-[#ABABAB] opacity-40 cursor-not-allowed'
                              : 'text-[#ABABAB] hover:text-[#505050] hover:bg-[#FBFBFB]'
                          }`}
                          style={{ height: '24px', width: '24px' }}
                          title={!recognition ? 'Voice input not supported in this browser' : isListening ? 'Stop listening' : 'Start voice input'}
                        >
                          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </button>
                        <button
                          type="submit"
                          className="flex items-center justify-center bg-[#161616] text-white w-9 h-9 rounded-full hover:bg-[#292929] transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                          disabled={loading || !prompt.trim()}
                          style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                        >
                          {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <ArrowRight className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {/* Expandable options section - inside input at bottom */}
                    {optionsExpanded && (
                      <div className="px-4 pb-3 pt-3 rounded-b-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="relative">
                            <select
                              value={sender}
                              onChange={e => setSender(e.target.value)}
                              className="w-full px-3 py-2 pr-8 text-sm text-[#161616] bg-[#FBFBFB] border-none rounded-lg focus:outline-none focus:bg-white transition-colors appearance-none cursor-pointer"
                              style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                            >
                              <option value="">From</option>
                              {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#505050] pointer-events-none" />
                          </div>
                          <div className="relative">
                            <select
                              value={recipient}
                              onChange={e => setRecipient(e.target.value)}
                              className="w-full px-3 py-2 pr-8 text-sm text-[#161616] bg-[#FBFBFB] border-none rounded-lg focus:outline-none focus:bg-white transition-colors appearance-none cursor-pointer"
                              style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                            >
                              <option value="">To</option>
                              {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#505050] pointer-events-none" />
                          </div>
                          <div className="relative">
                            <select
                              value={tone}
                              onChange={e => setTone(e.target.value)}
                              className="w-full px-3 py-2 pr-8 text-sm text-[#161616] bg-[#FBFBFB] border-none rounded-lg focus:outline-none focus:bg-white transition-colors appearance-none cursor-pointer"
                              style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                            >
                              <option value="">Tone</option>
                              {TONES.map(toneOpt => <option key={toneOpt} value={toneOpt}>{toneOpt}</option>)}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#505050] pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Loading indicator */}
        {loading && !isStreaming && (
          <div className="flex justify-start mb-4">
            <div className="rounded-none px-4 py-3 bg-[#FBFBFB] border border-[#E3E3E3]">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-[#505050] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#505050] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[#505050] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        
        {filteredMessages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-6`}
            onTouchStart={msg.type === 'ai' ? (e) => handleTouchStart(e, msg.id) : undefined}
            onTouchEnd={msg.type === 'ai' ? (e) => handleTouchEnd(e, msg) : undefined}
          >
            <div
              className={`px-4 py-3 max-w-[85%] ${msg.type === 'user' ? 'bg-[#161616] text-white' : 'bg-white text-[#161616]'} ${favorites[msg.id] ? 'ring-2 ring-[#161616]' : ''}`}
              style={{ whiteSpace: 'pre-line', fontFamily: 'var(--font-inter-tight), sans-serif', position: 'relative', fontSize: '1em', wordBreak: 'break-word', lineHeight: '1.6' }}
            >
              {msg.type === 'ai' && msg.subject && (
                <div className="font-normal text-base mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400 }}>Subject: {msg.subject}</div>
              )}
              {msg.type === 'ai' && msg.body ? (
                <>
                  <div className="mb-2">
                    <ReactMarkdown
                      components={{
                        p: ({node, ...props}) => <p className="text-base text-[#161616] leading-relaxed mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400 }} {...props} />,
                        text: ({children}) => <>{renderWithPlaceholders(children as string)}</>
                      }}
                    >
                      {msg.body}
                    </ReactMarkdown>
                  </div>
                  <div className="flex flex-row justify-between mt-6 pt-3 border-t border-[#E3E3E3] items-end">
                    {/* Left group: Like, Dislike, Favorite */}
                    <div className="flex flex-row gap-1 items-center">
                      <button
                        aria-label="Like"
                        className={`rounded-none p-2 transition-colors flex items-center justify-center border border-[#E3E3E3] ${feedback[msg.id]==='like' ? 'bg-[#FBFBFB] border-[#161616] text-[#161616]' : 'bg-white text-[#ABABAB] hover:text-[#161616] hover:bg-[#FBFBFB] hover:border-[#ABABAB]'}`}
                        onClick={() => setFeedback(f => ({ ...f, [msg.id]: f[msg.id]==='like' ? undefined : 'like' }))}
                        type="button"
                        style={{ width: 36, height: 36 }}
                      >
                        <ThumbsUp className="w-5 h-5" fill={feedback[msg.id]==='like' ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        aria-label="Dislike"
                        className={`rounded-none p-2 transition-colors flex items-center justify-center border border-[#E3E3E3] ${feedback[msg.id]==='dislike' ? 'bg-[#FBFBFB] border-[#161616] text-[#161616]' : 'bg-white text-[#ABABAB] hover:text-[#161616] hover:bg-[#FBFBFB] hover:border-[#ABABAB]'}`}
                        onClick={() => setFeedback(f => ({ ...f, [msg.id]: f[msg.id]==='dislike' ? undefined : 'dislike' }))}
                        type="button"
                        style={{ width: 36, height: 36 }}
                      >
                        <ThumbsDown className="w-5 h-5" fill={feedback[msg.id]==='dislike' ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        aria-label={favorites[msg.id] ? 'Unfavorite' : 'Favorite'}
                        className={`rounded-none p-2 transition-colors flex items-center justify-center border border-[#E3E3E3] ${favorites[msg.id] ? 'bg-[#FBFBFB] border-[#161616] text-[#161616]' : 'bg-white text-[#ABABAB] hover:text-[#161616] hover:bg-[#FBFBFB] hover:border-[#ABABAB]'}`}
                        style={{ width: 36, height: 36 }}
                        onClick={() => setFavorites(f => ({ ...f, [msg.id]: !f[msg.id] }))}
                        type="button"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill={favorites[msg.id] ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-6.16 3.73 1.64-7.03L2 9.24l7.19-.61L12 2.5l2.81 6.13 7.19.61-5.48 4.71 1.64 7.03z" />
                        </svg>
                      </button>
                    </div>
                    {/* Right group: Copy, Send, Delete */}
                    <div className="flex flex-row gap-1 items-center">
                      <button
                        className="flex items-center justify-center text-[#ABABAB] hover:text-[#161616] rounded-none border border-[#E3E3E3] hover:bg-[#FBFBFB] hover:border-[#ABABAB] p-2 transition"
                        style={{ width: 36, height: 36 }}
                        onClick={() => {
                          navigator.clipboard.writeText(`Subject: ${msg.subject || ''}\n\n${msg.body || ''}`);
                          toast.success('Copied!', { duration: 1200 });
                        }}
                        title="Copy"
                        type="button"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                      <a
                        href={`mailto:?subject=${encodeURIComponent(msg.subject || '')}&body=${encodeURIComponent(msg.body || '')}`}
                        className="flex items-center justify-center text-[#ABABAB] hover:text-[#161616] rounded-none border border-[#E3E3E3] hover:bg-[#FBFBFB] hover:border-[#ABABAB] p-2 transition"
                        style={{ width: 36, height: 36 }}
                        title="Send"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                      <button
                        className="flex items-center justify-center text-[#ABABAB] hover:text-[#161616] rounded-none border border-[#E3E3E3] hover:bg-[#FBFBFB] hover:border-[#ABABAB] p-2 transition"
                        style={{ width: 36, height: 36 }}
                        onClick={() => {
                          setMessages(prev => prev.filter(m => m.id !== msg.id));
                        }}
                        title="Delete"
                        type="button"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div>{msg.content}</div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="rounded-none px-4 py-3 max-w-[80%] bg-[#FBFBFB] border border-[#E3E3E3] text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
              <TypingIndicator />
            </div>
          </div>
        )}
      </div>
      {/* Sticky input at bottom - ChatGPT style (only show when there are messages) */}
      {filteredMessages.length > 0 && (
      <div className="sticky bottom-0 bg-white border-t border-[#E3E3E3] pt-4 pb-4">
        <form onSubmit={handleGenerate} className="w-full max-w-4xl mx-auto px-4" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
          {/* Selected options tags */}
          {(sender || recipient || tone) && !optionsExpanded && (
            <div className="flex flex-row gap-2 items-center flex-wrap mb-3">
              {sender && (
                <span className="text-xs text-[#505050] px-2 py-1 bg-[#FBFBFB] border border-[#E3E3E3] rounded-md">
                  From: {sender}
                </span>
              )}
              {recipient && (
                <span className="text-xs text-[#505050] px-2 py-1 bg-[#FBFBFB] border border-[#E3E3E3] rounded-md">
                  To: {recipient}
                </span>
              )}
              {tone && (
                <span className="text-xs text-[#505050] px-2 py-1 bg-[#FBFBFB] border border-[#E3E3E3] rounded-md">
                  Tone: {tone}
                </span>
              )}
            </div>
          )}
          
          {/* Main input area */}
          <div className="relative">
            {/* Text input container */}
            <div className="flex-1 relative bg-white rounded-2xl border border-[#E3E3E3] shadow-sm hover:shadow-md transition-all focus-within:border-[#161616] focus-within:shadow-md">
              <div className="relative flex items-center">
                <textarea
                  className="w-full pl-12 pr-20 py-4 bg-transparent text-base text-[#161616] placeholder-[#ABABAB] focus:outline-none resize-none overflow-hidden rounded-t-2xl"
                  placeholder={typing || placeholder || 'Message BossyEmail...'}
                  value={prompt}
                  onChange={e => {
                    setPrompt(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleGenerate();
                    }
                  }}
                  required
                  rows={1}
                  style={{ minHeight: 56, maxHeight: 200, fontFamily: 'var(--font-inter-tight), sans-serif' }}
                />
                
                {/* Expand options button - left side, vertically centered */}
                <button
                  type="button"
                  onClick={() => setOptionsExpanded(!optionsExpanded)}
                  className={`absolute left-4 z-10 p-1.5 rounded-lg transition-colors flex items-center justify-center ${
                    optionsExpanded || sender || recipient || tone
                      ? 'text-[#161616] bg-[#FBFBFB]' 
                      : 'text-[#ABABAB] hover:text-[#505050] hover:bg-[#FBFBFB]'
                  }`}
                  style={{ top: '50%', transform: 'translateY(-50%)', height: '24px', width: '24px' }}
                  title="Expand options"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
                
                {/* Mic and Send buttons - right side, vertically centered */}
                <div className="absolute right-3 flex items-center gap-2" style={{ top: '50%', transform: 'translateY(-50%)' }}>
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    disabled={!recognition && !isListening}
                    className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
                      isListening 
                        ? 'text-[#161616] bg-[#FBFBFB] animate-pulse' 
                        : !recognition
                        ? 'text-[#ABABAB] opacity-40 cursor-not-allowed'
                        : 'text-[#ABABAB] hover:text-[#505050] hover:bg-[#FBFBFB]'
                    }`}
                    style={{ height: '24px', width: '24px' }}
                    title={!recognition ? 'Voice input not supported in this browser' : isListening ? 'Stop listening' : 'Start voice input'}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center bg-[#161616] text-white w-9 h-9 rounded-full hover:bg-[#292929] transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                    disabled={loading || !prompt.trim()}
                    style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Expandable options section - inside input at bottom */}
              {optionsExpanded && (
                <div className="px-4 pb-3 pt-3 rounded-b-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="relative">
                      <select
                        value={sender}
                        onChange={e => setSender(e.target.value)}
                        className="w-full px-3 py-2 pr-8 text-sm text-[#161616] bg-[#FBFBFB] border-none rounded-lg focus:outline-none focus:bg-white transition-colors appearance-none cursor-pointer"
                        style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                      >
                        <option value="">From</option>
                        {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#505050] pointer-events-none" />
                    </div>
                    <div className="relative">
                      <select
                        value={recipient}
                        onChange={e => setRecipient(e.target.value)}
                        className="w-full px-3 py-2 pr-8 text-sm text-[#161616] bg-[#FBFBFB] border-none rounded-lg focus:outline-none focus:bg-white transition-colors appearance-none cursor-pointer"
                        style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                      >
                        <option value="">To</option>
                        {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#505050] pointer-events-none" />
                    </div>
                    <div className="relative">
                      <select
                        value={tone}
                        onChange={e => setTone(e.target.value)}
                        className="w-full px-3 py-2 pr-8 text-sm text-[#161616] bg-[#FBFBFB] border-none rounded-lg focus:outline-none focus:bg-white transition-colors appearance-none cursor-pointer"
                        style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                      >
                        <option value="">Tone</option>
                        {TONES.map(toneOpt => <option key={toneOpt} value={toneOpt}>{toneOpt}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#505050] pointer-events-none" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      )}
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

    </div>
  );
} 