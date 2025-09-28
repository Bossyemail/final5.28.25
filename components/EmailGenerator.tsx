"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Loader2, Save, Sparkles, RefreshCw, Trash2, Mail, ChevronDown, Edit2, Check, X, ThumbsUp, ThumbsDown, Pin, Mic, MicOff, MessageSquare, Plus } from "lucide-react";
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
  const [conversations, setConversations] = useState<Array<{id: string, title: string, messages: ChatMessage[]}>>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

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
    updateCurrentConversation(newMessages);
    
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
      const res = await fetch("/api/generate-email-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, tone, recipient, sender }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to generate email: ${errorText}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response body');

      let fullContent = '';
      let subject = '';
      let body = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = new TextDecoder().decode(value);
          fullContent += chunk;
          setStreamingContent(fullContent);

          // Try to parse JSON when we have complete content
          try {
            const parsed = JSON.parse(fullContent);
            if (parsed.subject && parsed.body) {
              subject = parsed.subject;
              body = parsed.body;
              break;
            }
          } catch (e) {
            // Continue streaming until we have complete JSON
          }
        }
      } catch (streamError) {
        console.error('Streaming error:', streamError);
        throw new Error('Error reading streaming response');
      }

      // Update the AI message with final content
      const finalAiMsg: ChatMessage = {
        ...aiMsg,
        content: `Subject: ${subject}\n\n${body}`,
        subject,
        body,
      };

      const finalMessages = [...newMessages, finalAiMsg];
      setMessages(finalMessages);
      updateCurrentConversation(finalMessages);
      
      await incrementUsage();
      setPrompt("");
    } catch (err: any) {
      console.error('Generation error:', err);
      setError(err.message || "Something went wrong.");
      
      // Fallback to regular API if streaming fails
      try {
        const fallbackRes = await fetch("/api/generate-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, tone, recipient, sender }),
        });
        const fallbackData = await fallbackRes.json();
        if (fallbackData.error) throw new Error(fallbackData.error);
        
        const fallbackAiMsg: ChatMessage = {
          id: `${Date.now()}-ai`,
          type: 'ai',
          content: `Subject: ${fallbackData.subject || ''}\n\n${fallbackData.body || ''}`,
          subject: fallbackData.subject || '',
          body: fallbackData.body || '',
          timestamp: Date.now(),
        };
        
        const fallbackMessages = [...newMessages, fallbackAiMsg];
        setMessages(fallbackMessages);
        updateCurrentConversation(fallbackMessages);
        setError("");
      } catch (fallbackErr: any) {
        console.error('Fallback error:', fallbackErr);
        setError(fallbackErr.message || "Failed to generate email");
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
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  // Conversation management
  const createNewConversation = () => {
    const newId = Date.now().toString();
    const newConversation = {
      id: newId,
      title: "New Conversation",
      messages: []
    };
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newId);
    setMessages([]);
  };

  const switchConversation = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setCurrentConversationId(conversationId);
      setMessages(conversation.messages);
    }
  };

  const updateCurrentConversation = (newMessages: ChatMessage[]) => {
    if (currentConversationId) {
      setConversations(prev => prev.map(conv => 
        conv.id === currentConversationId 
          ? { ...conv, messages: newMessages, title: newMessages[0]?.content?.slice(0, 30) + "..." || "New Conversation" }
          : conv
      ));
    }
  };

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
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${value === opt ? 'bg-[#D1B4C6] text-black border-[#D1B4C6]' : 'bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200'}`}
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
          <span key={i} className="italic text-[#D1B4C6] bg-[#D1B4C6]/10 px-1 rounded">{part}</span>
        );
      }
      return part;
    });
  }

  return (
    <div className="max-w-3xl w-full mx-auto font-sans px-2 sm:px-4 md:px-6 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 text-zinc-900 flex flex-col h-[80vh] shadow-none">
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Suggested prompts when no messages */}
        {messages.length === 0 && (
          <div className="mb-8">
            <div className="text-sm font-medium text-zinc-500 mb-4">Try these prompts:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Write a follow-up email about missing documents",
                "Draft a credit request for $5,000",
                "Create a closing congratulations message",
                "Write an inspection reminder email"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(suggestion)}
                  className="text-left p-3 rounded-lg border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-colors text-sm text-zinc-700 hover:text-zinc-900"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Pinned section */}
        {pinnedMessages.length > 0 && (
          <div className="mb-6">
            <div className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">Pinned</div>
            {pinnedMessages.map((msg, idx) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`rounded-xl px-4 py-3 max-w-[80%] bg-yellow-50 border border-yellow-300 text-yellow-900`} style={{ fontFamily: 'Inter, sans-serif', position: 'relative', fontSize: '1.1em', wordBreak: 'break-word', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  {msg.type === 'ai' && msg.subject && (
                    <div className="font-bold text-lg mb-1">Subject: {msg.subject}</div>
                  )}
                  {msg.type === 'ai' && msg.body ? (
                    <>
                      <div className="mb-2">
                        <ReactMarkdown
                          components={{
                            p: ({node, ...props}) => <p className="prose prose-zinc dark:prose-invert max-w-none text-base leading-relaxed" {...props} />,
                            text: ({children}) => <>{renderWithPlaceholders(children as string)}</>
                          }}
                        >
                          {msg.body}
                        </ReactMarkdown>
                      </div>
                      <div className="flex flex-row justify-between mt-6 pt-3 border-t border-zinc-100 dark:border-[#333] items-end">
                        {/* Left group: Like, Dislike, Favorite */}
                        <div className="flex flex-row gap-2 items-center">
                          <button
                            aria-label="Like"
                            className={`rounded-full p-2 transition-colors flex items-center justify-center ${feedback[msg.id]==='like' ? 'bg-green-100 text-green-700' : 'hover:bg-zinc-200 text-zinc-500 dark:text-zinc-400'}`}
                            onClick={() => setFeedback(f => ({ ...f, [msg.id]: f[msg.id]==='like' ? undefined : 'like' }))}
                            type="button"
                            style={{ width: 36, height: 36 }}
                          >
                            <ThumbsUp className="w-5 h-5" fill={feedback[msg.id]==='like' ? '#22c55e' : 'none'} />
                          </button>
                          <button
                            aria-label="Dislike"
                            className={`rounded-full p-2 transition-colors flex items-center justify-center ${feedback[msg.id]==='dislike' ? 'bg-red-100 text-red-700' : 'hover:bg-zinc-200 text-zinc-500 dark:text-zinc-400'}`}
                            onClick={() => setFeedback(f => ({ ...f, [msg.id]: f[msg.id]==='dislike' ? undefined : 'dislike' }))}
                            type="button"
                            style={{ width: 36, height: 36 }}
                          >
                            <ThumbsDown className="w-5 h-5" fill={feedback[msg.id]==='dislike' ? '#ef4444' : 'none'} />
                          </button>
                          <button
                            aria-label={favorites[msg.id] ? 'Unfavorite' : 'Favorite'}
                            className={`rounded-full p-2 transition-colors flex items-center justify-center ${favorites[msg.id] ? 'text-yellow-500' : 'hover:text-yellow-500 text-zinc-500 dark:text-zinc-400'}`}
                            style={{ width: 36, height: 36 }}
                            onClick={() => setFavorites(f => ({ ...f, [msg.id]: !f[msg.id] }))}
                            type="button"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill={favorites[msg.id] ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-6.16 3.73 1.64-7.03L2 9.24l7.19-.61L12 2.5l2.81 6.13 7.19.61-5.48 4.71 1.64 7.03z" />
                            </svg>
                          </button>
                        </div>
                        {/* Reference button below left group */}
                        <div className="flex flex-col items-start">
                          <button
                            aria-label="Reference this email"
                            className="rounded-full p-2 transition-colors hover:bg-blue-100 text-blue-700 text-xs font-semibold mt-1"
                            type="button"
                            onClick={() => {
                              const summary = `Follow up on: ${msg.subject || 'previous email'}\n\n\"${(msg.body || msg.content).slice(0, 200)}${(msg.body || msg.content).length > 200 ? '...' : ''}\"`;
                              setPrompt(summary);
                            }}
                          >
                            Reference
                          </button>
                        </div>
                        {/* Right group: Copy, Send, Edit, Delete */}
                        <div className="flex flex-row gap-1 items-center">
                          <button
                            className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white rounded-full p-2 transition"
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
                            className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white rounded-full p-2 transition"
                            style={{ width: 36, height: 36 }}
                            title="Send"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Mail className="w-5 h-5" />
                          </a>
                          <button
                            className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white rounded-full p-2 transition"
                            style={{ width: 36, height: 36 }}
                            onClick={handleEdit}
                            title="Edit"
                            type="button"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white rounded-full p-2 transition"
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
                            className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white rounded-full p-2 transition"
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
                  {/* Pin button */}
                  <button
                    aria-label="Unpin"
                    className="absolute top-2 right-2 rounded-full p-2 transition-colors bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-black dark:bg-[#232323] dark:hover:bg-[#333] dark:text-zinc-400"
                    onClick={() => setPinned(p => ({ ...p, [msg.id]: false }))}
                    type="button"
                    style={{ width: 36, height: 36 }}
                  >
                    <Pin className="w-5 h-5" fill="none" />
                  </button>
                </div>
              </div>
            ))}
          </div>
              )}
        {/* Error display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}
        
        {/* Main chat thread (filtered) */}
        {filteredMessages.length === 0 && !loading && (
          <div className="text-center text-zinc-400 mt-12">No messages yet. Start by entering a prompt below.</div>
        )}
        
        {/* Loading indicator */}
        {loading && !isStreaming && (
          <div className="flex justify-start mb-4">
            <div className="rounded-xl px-4 py-3 bg-zinc-100 border border-zinc-200">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Streaming content */}
        {isStreaming && streamingContent && (
          <div className="flex justify-start mb-4">
            <div className="rounded-xl px-4 py-3 bg-zinc-100 border border-zinc-200 max-w-[80%]">
              <div className="text-sm text-zinc-600 whitespace-pre-wrap">
                {streamingContent}
                <span className="animate-pulse">|</span>
              </div>
            </div>
          </div>
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
                <div className="font-bold text-lg mb-1">Subject: {msg.subject}</div>
              )}
              {msg.type === 'ai' && msg.body ? (
                <>
                  <div className="mb-2">
                    <ReactMarkdown
                      components={{
                        p: ({node, ...props}) => <p className="prose prose-zinc dark:prose-invert max-w-none text-base leading-relaxed" {...props} />,
                        text: ({children}) => <>{renderWithPlaceholders(children as string)}</>
                      }}
                    >
                      {msg.body}
                    </ReactMarkdown>
                  </div>
                  <div className="flex flex-row justify-between mt-6 pt-3 border-t border-zinc-100 dark:border-[#333] items-end">
                    {/* Left group: Like, Dislike, Favorite */}
                    <div className="flex flex-row gap-1 items-center">
                      <button
                        aria-label="Like"
                        className={`rounded-full p-2 transition-colors flex items-center justify-center ${feedback[msg.id]==='like' ? 'bg-green-100 text-green-700' : 'hover:bg-zinc-200 text-zinc-500 dark:text-zinc-400'}`}
                        onClick={() => setFeedback(f => ({ ...f, [msg.id]: f[msg.id]==='like' ? undefined : 'like' }))}
                        type="button"
                        style={{ width: 36, height: 36 }}
                      >
                        <ThumbsUp className="w-5 h-5" fill={feedback[msg.id]==='like' ? '#22c55e' : 'none'} />
                      </button>
                      <button
                        aria-label="Dislike"
                        className={`rounded-full p-2 transition-colors flex items-center justify-center ${feedback[msg.id]==='dislike' ? 'bg-red-100 text-red-700' : 'hover:bg-zinc-200 text-zinc-500 dark:text-zinc-400'}`}
                        onClick={() => setFeedback(f => ({ ...f, [msg.id]: f[msg.id]==='dislike' ? undefined : 'dislike' }))}
                        type="button"
                        style={{ width: 36, height: 36 }}
                      >
                        <ThumbsDown className="w-5 h-5" fill={feedback[msg.id]==='dislike' ? '#ef4444' : 'none'} />
                      </button>
                      <button
                        aria-label={favorites[msg.id] ? 'Unfavorite' : 'Favorite'}
                        className={`rounded-full p-2 transition-colors flex items-center justify-center ${favorites[msg.id] ? 'text-yellow-500' : 'hover:text-yellow-500 text-zinc-500 dark:text-zinc-400'}`}
                        style={{ width: 36, height: 36 }}
                        onClick={() => setFavorites(f => ({ ...f, [msg.id]: !f[msg.id] }))}
                        type="button"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill={favorites[msg.id] ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-6.16 3.73 1.64-7.03L2 9.24l7.19-.61L12 2.5l2.81 6.13 7.19.61-5.48 4.71 1.64 7.03z" />
                        </svg>
                      </button>
                    </div>
                    {/* Reference button below left group */}
                    <div className="flex flex-col items-start">
                      <button
                        aria-label="Reference this email"
                        className="rounded-full p-2 transition-colors hover:bg-blue-100 text-blue-700 text-xs font-semibold mt-1"
                        type="button"
                        onClick={() => {
                          const summary = `Follow up on: ${msg.subject || 'previous email'}\n\n\"${(msg.body || msg.content).slice(0, 200)}${(msg.body || msg.content).length > 200 ? '...' : ''}\"`;
                          setPrompt(summary);
                        }}
                      >
                        Reference
                      </button>
                    </div>
                    {/* Right group: Copy, Send, Edit, Delete */}
                    <div className="flex flex-row gap-1 items-center">
                      <button
                        className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white rounded-full p-2 transition"
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
                        className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white rounded-full p-2 transition"
                        style={{ width: 36, height: 36 }}
                        title="Send"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                      <button
                        className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white rounded-full p-2 transition"
                        style={{ width: 36, height: 36 }}
                        onClick={handleEdit}
                        title="Edit"
                        type="button"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        className="flex items-center justify-center text-zinc-500 hover:text-black dark:hover:text-white rounded-full p-2 transition"
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
              {/* Pin button */}
              {msg.type === 'ai' && (
                <button
                  aria-label={pinned[msg.id] ? 'Unpin' : 'Pin'}
                  className={`absolute top-2 right-2 rounded-full p-2 transition-colors ${pinned[msg.id] ? 'bg-yellow-100 text-yellow-700' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-[#232323] dark:hover:bg-[#333] dark:text-zinc-400'}`}
                  onClick={() => setPinned(p => ({ ...p, [msg.id]: !p[msg.id] }))}
                  type="button"
                  style={{ width: 36, height: 36 }}
                >
                  <Pin className="w-5 h-5" fill={pinned[msg.id] ? 'currentColor' : 'none'} />
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
      <form onSubmit={handleGenerate} className="w-full relative flex flex-col bg-white dark:bg-[#424242] rounded-[2.5rem] px-6 pt-5 pb-6 border border-black" style={{ minHeight: 140, maxWidth: '100%' }}>
        {/* Prompt input on top */}
        <textarea
          className="w-full px-4 py-3 bg-transparent border-none text-lg text-zinc-900 dark:text-[#e0e0e0] placeholder-zinc-400 dark:placeholder-[#bdbdbd] focus:outline-none focus:ring-0 mb-4 resize-none overflow-hidden"
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
          style={{ minWidth: 120, minHeight: 48, maxHeight: 200, borderRadius: '0.75rem' }}
        />
        {/* Dropdowns row */}
        <div className="flex flex-row gap-2 items-center flex-wrap justify-between" style={{ paddingBottom: 0 }}>
          <div className="flex flex-row gap-2 items-center flex-wrap">
          <div className="relative flex-shrink-0">
            <select
              value={sender}
              onChange={e => setSender(e.target.value)}
              className="appearance-none font-bold text-zinc-900 dark:text-[#f5f5f5] bg-[#f5f5f5] dark:bg-[#333] rounded-lg px-3 py-2 text-sm border-none focus:outline-none focus:ring-2 focus:ring-black transition min-w-[100px] max-w-[120px]"
            >
              <option value="" className="font-bold">From</option>
              {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">▼</span>
          </div>
          <div className="relative flex-shrink-0">
            <select
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              className="appearance-none font-bold text-zinc-900 dark:text-[#f5f5f5] bg-[#f5f5f5] dark:bg-[#333] rounded-lg px-3 py-2 text-sm border-none focus:outline-none focus:ring-2 focus:ring-black transition min-w-[100px] max-w-[120px]"
            >
              <option value="" className="font-bold">To</option>
              {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">▼</span>
          </div>
          <div className="relative flex-shrink-0">
            <select
              value={tone}
              onChange={e => setTone(e.target.value)}
              className="appearance-none font-bold text-zinc-900 dark:text-[#f5f5f5] bg-[#f5f5f5] dark:bg-[#333] rounded-lg px-3 py-2 text-sm border-none focus:outline-none focus:ring-2 focus:ring-black transition min-w-[100px] max-w-[120px]"
            >
              <option value="" className="font-bold">Tone</option>
              {TONES.map(toneOpt => <option key={toneOpt} value={toneOpt}>{toneOpt}</option>)}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">▼</span>
          </div>
          </div>
          
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-600'
            }`}
            title={isListening ? 'Stop listening' : 'Start voice input'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>
        {/* Circular Go button at bottom right */}
        <button
          type="submit"
          className="absolute bottom-6 right-6 flex items-center justify-center bg-black text-white rounded-full w-12 h-12 font-bold text-lg hover:brightness-110 transition disabled:opacity-60"
          disabled={loading || !prompt}
          style={{ minWidth: 48, minHeight: 48 }}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Go"}
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