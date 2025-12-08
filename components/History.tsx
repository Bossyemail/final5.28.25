import React, { useState, useMemo } from "react";
import { Mail, Search, Trash2, Clock } from "lucide-react";
import { useSubscription } from "@/hooks/use-subscription";
import { useUser } from "@clerk/nextjs";

// Conversation interface
interface Conversation {
  id: string;
  title: string; // First user message or subject
  preview: string; // Preview of the email body
  timestamp: number;
  subject?: string;
  body?: string;
}

// Mock conversations - in production, these would come from localStorage or API
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    title: "Request for $10k credit due to inspection report",
    preview: "I hope this email finds you well. I wanted to bring to your attention some concerning findings in the recent inspection report...",
    timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
    subject: "Request for $10,000 credit due to inspection report findings",
    body: "I hope this email finds you well. I wanted to bring to your attention some concerning findings in the recent inspection report for the property at [Property Address]. Unfortunately, the report has highlighted several issues that were not disclosed prior to the inspection.\n\nGiven the nature of these findings, I kindly request a credit of $10,000 to address the necessary repairs and maintenance. I believe this credit would help ensure the property meets the expected standards and alleviate some of the financial burden on my end.\n\nI appreciate your understanding and cooperation in this matter. Please let me know the next steps to proceed with this request.\n\nThank you for your attention to this issue."
  },
  {
    id: "c2",
    title: "Deposit reminder follow-up",
    preview: "Hi Buyer, just a quick reminder that your deposit is due soon. Please let us know if you have any questions!",
    timestamp: Date.now() - 24 * 60 * 60 * 1000, // Yesterday
    subject: "Deposit Reminder",
    body: "Hi Buyer, just a quick reminder that your deposit is due soon. Please let us know if you have any questions!"
  },
  {
    id: "c3",
    title: "Congrats on closing!",
    preview: "Congratulations on closing your new home! Wishing you all the best in this exciting new chapter.",
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
    subject: "Congrats on Closing!",
    body: "Congratulations on closing your new home! Wishing you all the best in this exciting new chapter."
  },
  {
    id: "c4",
    title: "Inspection scheduling request",
    preview: "I'd like to schedule the inspection for next week. Please let me know your availability.",
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
    subject: "Inspection Scheduling",
    body: "I'd like to schedule the inspection for next week. Please let me know your availability."
  },
  {
    id: "c5",
    title: "Addendum request for repairs",
    preview: "Following up on our conversation about the repairs needed. I'd like to request an addendum to the contract.",
    timestamp: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15 days ago
    subject: "Addendum Request",
    body: "Following up on our conversation about the repairs needed. I'd like to request an addendum to the contract."
  },
];

function getDateGroup(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days <= 7) return "Previous 7 days";
  if (days <= 30) return "Previous 30 days";
  return "Older";
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - timestamp;
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const minutes = Math.floor(diff / (60 * 1000));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function History() {
  const { subscription } = useSubscription();
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.isAdmin === true;
  const isRoyalty = subscription?.priceId === 'price_1SMfAgEApsNPWe3P2oUBGwvg';
  const hasFullAccess = isRoyalty || isAdmin;
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Load conversations from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem("bossyemail_conversations");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setConversations(parsed);
        }
      } catch (e) {
        console.error("Failed to load conversations:", e);
      }
    }
  }, []);

  // Filter conversations by search query
  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const query = searchQuery.toLowerCase();
    return conversations.filter(
      (conv) =>
        conv.title.toLowerCase().includes(query) ||
        conv.preview.toLowerCase().includes(query) ||
        conv.subject?.toLowerCase().includes(query)
    );
  }, [conversations, searchQuery]);

  // Group conversations by date
  const groupedConversations = useMemo(() => {
    const groups: Record<string, Conversation[]> = {};
    filteredConversations.forEach((conv) => {
      const group = getDateGroup(conv.timestamp);
      if (!groups[group]) groups[group] = [];
      groups[group].push(conv);
    });
    // Sort conversations within each group by timestamp (newest first)
    Object.keys(groups).forEach((group) => {
      groups[group].sort((a, b) => b.timestamp - a.timestamp);
    });
    return groups;
  }, [filteredConversations]);

  // Order of date groups
  const dateGroupOrder = ["Today", "Yesterday", "Previous 7 days", "Previous 30 days", "Older"];

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = conversations.filter((conv) => conv.id !== id);
    setConversations(updated);
    localStorage.setItem("bossyemail_conversations", JSON.stringify(updated));
  };

  const handleConversationClick = (conv: Conversation) => {
    // In a real implementation, this would load the conversation in the EmailGenerator
    // For now, we'll just log it
    console.log("Load conversation:", conv);
    // You could emit an event or use a context to load this in EmailGenerator
  };

  if (!hasFullAccess) {
    return (
      <div className="w-full pl-8 pr-8 sm:pl-4 sm:pr-4" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
        <div className="max-w-2xl mx-auto py-8">
          <h2 className="text-2xl font-normal mb-6 text-[#161616] dark:text-white" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400 }}>History</h2>
          <p className="text-base font-medium mb-2 text-[#505050] dark:text-[#ABABAB]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>This feature is only available for Inbox Royalty subscribers.</p>
          <p className="text-sm text-[#505050] dark:text-[#ABABAB]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>Please upgrade your plan to access history.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pl-8 pr-8 sm:pl-4 sm:pr-4" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
      <div className="max-w-4xl mx-auto py-8">
        <h2 className="text-2xl font-normal mb-6 text-[#161616] dark:text-white" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400 }}>History</h2>
        
        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ABABAB]" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm text-[#161616] dark:text-white bg-white dark:bg-[#1a1a1a] border border-[#E3E3E3] dark:border-[#292929] rounded-2xl focus:outline-none focus:border-[#161616] dark:focus:border-white transition-colors"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
          />
        </div>

        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Mail className="w-12 h-12 mb-4 text-[#ABABAB]" />
            <p className="text-base font-medium mb-2 text-[#161616] dark:text-white" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
              {searchQuery ? "No conversations found" : "No conversations yet"}
            </p>
            <p className="text-sm text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
              {searchQuery ? "Try a different search term" : "Your conversation history will appear here"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {dateGroupOrder.map((groupName) => {
              const groupConversations = groupedConversations[groupName];
              if (!groupConversations || groupConversations.length === 0) return null;

              return (
                <div key={groupName}>
                  <h3 className="text-xs font-medium text-[#ABABAB] mb-2 uppercase tracking-wide px-1" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
                    {groupName}
                  </h3>
                  <ul className="space-y-1">
                    {groupConversations.map((conv) => (
                      <li
                        key={conv.id}
                        onMouseEnter={() => setHoveredId(conv.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => handleConversationClick(conv)}
                        className="group relative flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#FBFBFB] cursor-pointer transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="text-sm font-normal text-[#161616] dark:text-white truncate" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
                              {conv.title}
                            </div>
                            <span className="text-xs text-[#ABABAB] whitespace-nowrap" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
                              {formatTime(conv.timestamp)}
                            </span>
                          </div>
                          <div className="text-xs text-[#505050] truncate" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
                            {conv.preview}
                          </div>
                        </div>
                        {hoveredId === conv.id && (
                          <button
                            onClick={(e) => handleDelete(conv.id, e)}
                            className="flex items-center justify-center w-7 h-7 rounded-none border border-[#E3E3E3] hover:bg-[#FBFBFB] hover:border-[#ABABAB] text-[#ABABAB] hover:text-[#161616] transition-colors"
                            aria-label="Delete conversation"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
