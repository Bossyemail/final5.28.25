import React from "react";
import { ArrowRight, Mail } from "lucide-react";

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
  const activities = MOCK_HISTORY;

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">History</h2>
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center text-zinc-400">
          <Mail className="w-12 h-12 mb-4" />
          <p className="text-lg font-medium mb-2">No activity yet</p>
          <p className="text-sm">Your activity will show up here as you use BossyEmail.</p>
        </div>
      ) : (
        <ul className="divide-y divide-zinc-200">
          {activities.map(act => (
            <li
              key={act.id}
              className="flex items-center group px-2 py-4 transition hover:bg-zinc-50"
            >
              <div className="flex-1 min-w-0">
                <div className="text-base font-semibold text-zinc-900 truncate">{act.subject}</div>
                <div className="text-sm text-zinc-500 truncate mt-1">{act.body}</div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className="text-xs text-zinc-400 min-w-[70px] text-right">{formatDate(act.date)}</span>
                <button
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-zinc-200 transition"
                  aria-label="View details"
                >
                  <ArrowRight className="w-5 h-5 text-zinc-700" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 