import React from "react";
import { ArrowRight, Mail } from "lucide-react";
import { useSubscription } from "@/hooks/use-subscription";
import { useUser } from "@clerk/nextjs";

// Define allowed activity types
const ACTIVITY_TYPES = ["generate", "favorite", "copy"] as const;
type ActivityType = typeof ACTIVITY_TYPES[number];

const MOCK_HISTORY: {
  id: string;
  type: ActivityType;
  subject: string;
  body: string;
  date: string; // ISO or readable string
}[] = [
  {
    id: "a1",
    type: "generate",
    subject: "Deposit Reminder",
    body: "Hi Buyer, just a quick reminder that your deposit is due soon. Please let us know if you have any questions!",
    date: "2024-06-01T10:15:00Z",
  },
  {
    id: "a2",
    type: "favorite",
    subject: "Deposit Reminder",
    body: "Hi Buyer, just a quick reminder that your deposit is due soon. Please let us know if you have any questions!",
    date: "2024-06-01T10:16:00Z",
  },
  {
    id: "a3",
    type: "generate",
    subject: "Congrats on Closing!",
    body: "Congratulations on closing your new home! Wishing you all the best in this exciting new chapter.",
    date: "2024-05-28T14:30:00Z",
  },
  {
    id: "a4",
    type: "copy",
    subject: "Congrats on Closing!",
    body: "Congratulations on closing your new home! Wishing you all the best in this exciting new chapter.",
    date: "2024-05-28T14:32:00Z",
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", { month: "long", day: "numeric" }).toUpperCase();
}

export function History() {
  const { subscription } = useSubscription();
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.isAdmin === true;
  const isRoyalty = subscription?.priceId === 'price_1RSlGrEApsNPWe3P5R6MkIAY';
  const hasFullAccess = isRoyalty || isAdmin;

  if (!hasFullAccess) {
    return (
      <div className="w-full font-sans pl-32 pr-32 sm:pl-8 sm:pr-8 xs:pl-2 xs:pr-2 dark:bg-[#424242] dark:text-[#e0e0e0]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 dark:text-[#f5f5f5]">History</h2>
          <p className="text-lg font-medium mb-2">This feature is only available for Inbox Royalty subscribers.</p>
          <p className="text-sm">Please upgrade your plan to access history.</p>
        </div>
      </div>
    );
  }

  const activities = MOCK_HISTORY;

  return (
    <div className="w-full font-sans pl-32 pr-16 sm:pl-8 sm:pr-4 xs:pl-2 xs:pr-2 dark:bg-[#424242] dark:text-[#e0e0e0]" style={{ fontFamily: 'Inter, sans-serif', color: '#232326', WebkitFontSmoothing: 'antialiased' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 dark:text-[#f5f5f5]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#232326' }}>History</h2>
      {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-zinc-400 dark:text-[#bdbdbd]">
          <Mail className="w-12 h-12 mb-4" />
          <p className="text-lg font-medium mb-2">No activity yet</p>
          <p className="text-sm">Your activity will show up here as you use BossyEmail.</p>
        </div>
      ) : (
          <ul className="divide-y divide-zinc-200 dark:divide-[#616161]">
          {activities.map(act => (
            <li
              key={act.id}
                className="flex items-start xs:items-center group px-2 py-4 transition hover:bg-zinc-50 dark:hover:bg-[#616161]"
            >
              <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="text-base font-semibold text-zinc-900 dark:text-[#e0e0e0] truncate">{act.subject}</div>
                    <span className="text-xs text-zinc-400 dark:text-[#bdbdbd] min-w-[70px] text-right ml-4 xs:ml-8 mt-0.5 xs:mt-0">{formatDate(act.date)}</span>
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-[#bdbdbd] truncate mt-1">{act.body}</div>
              </div>
                <div className="flex items-center gap-2 ml-4 mt-2 xs:mt-0">
                <button
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-zinc-200 dark:hover:bg-[#616161] transition"
                  aria-label="View details"
                >
                    <ArrowRight className="w-5 h-5 text-zinc-700 dark:text-[#e0e0e0]" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
} 