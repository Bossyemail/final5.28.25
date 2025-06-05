"use client"

import { AlertCircle, Clock, FileText, MessageSquare, Home, Users, FileCheck, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

const painPoints = [
  {
    icon: Clock,
    text: "Sent the same follow-up email 14 times this week"
  },
  {
    icon: FileText,
    text: "Rewritten 'just checking in' so many ways it should win a Pulitzer"
  },
  {
    icon: AlertCircle,
    text: "Wanted to scream into the void when someone asks for a copy of the addendum... again"
  },
  {
    icon: MessageSquare,
    text: "Spent more time on email than actually closing deals"
  }
]

const useCases = [
  {
    icon: Home,
    title: "For agents on showings",
    description: "Quick, professional responses between appointments"
  },
  {
    icon: FileCheck,
    title: "For TCs chasing signatures",
    description: "Clear, firm follow-ups that get results"
  },
  {
    icon: Users,
    title: "For brokers juggling files",
    description: "Consistent communication across your team"
  }
]

export function Why() {
  // Combine all sales copy points into a single array of card texts
  const cardTexts = [
    "Quick replies between showings. Boss-level emails on the fly.",
    "Follow-ups that get replies. Clear. Firm. Effective.",
    "Your team, same voice. No more chaos in the inbox.",
    "Sent the same follow-up 14x? Yeah, we've been there.",
    "'Just checking in' fatigue? We've rewritten it 27 ways.",
    "Addendum request #97. Cue internal screaming.",
    "More email than closings? Let's fix that.",
    "Built by a TC, not a tech bro. Real chaos. Real solution.",
    "Not a pretty inbox tool. It's a get-it-done tool.",
    "You do more than push paper. You keep deals alive.",
    "We're your shortcut. One damn good email at a time.",
    "Stop typing. Start closing. Let BossyEmail handle the follow-up."
  ]

  // Split cardTexts into 4 rows with 3 boxes per row
  const rows = [
    cardTexts.slice(0, 3),
    cardTexts.slice(3, 6),
    cardTexts.slice(6, 9),
    cardTexts.slice(9, 12)
  ];

  return (
    <section id="why" className="w-full py-16 md:py-24 px-4 bg-[#CBC4D6] text-white dark:bg-[#616161]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-normal text-black mb-6 text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '32px' }}>
            Why BossyEmail Exists
          </h2>
        <div className="mb-10 text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '18px', color: '#000' }}>
          <div>We built this for the agents doing the real work.</div>
          <div>if you've ever screamed into the void over an addendum request — this is for you.</div>
        </div>
        {/* Hide scrollbar utility */}
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        {/* Marquee effect for each row */}
        {/* Add the following CSS to your global stylesheet:
@keyframes marquee-ltr {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
@keyframes marquee-rtl {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee-ltr {
  animation: marquee-ltr 32s linear infinite;
}
.animate-marquee-rtl {
  animation: marquee-rtl 32s linear infinite;
}
.animate-marquee-ltr:hover,
.animate-marquee-rtl:hover {
  animation-play-state: paused;
}
*/}
        <div className="w-full hide-scrollbar overflow-x-auto pb-2 flex flex-col gap-y-6">
          <div className="overflow-x-hidden w-full mb-1">
            <div className="flex animate-marquee-ltr whitespace-nowrap gap-x-6">
              {[
                // Row 1 boxes
                [
                  ["Quick replies between showings.", "Boss-level emails on the fly."],
                  ["Follow-ups that get replies.", "Clear. Firm. Effective."],
                  ["Your team, same voice.", "No more chaos in the inbox."],
                  ["Sent the same follow-up 14x?", "Yeah, we've been there."]
                ],
                // Duplicate for seamless loop
                [
                  ["Quick replies between showings.", "Boss-level emails on the fly."],
                  ["Follow-ups that get replies.", "Clear. Firm. Effective."],
                  ["Your team, same voice.", "No more chaos in the inbox."],
                  ["Sent the same follow-up 14x?", "Yeah, we've been there."]
                ]
              ].flat().map(([line1, line2], idx) => (
                <div
                  key={"row1-" + idx}
                  className="flex items-center bg-white/70 backdrop-blur-md rounded-lg px-6 py-5 shadow-md min-w-[320px] max-w-xs text-left hover:bg-white/90 transition-colors border border-black/10"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', color: '#232326' }}
                >
                  <div className="flex flex-col mr-4">
                    <span className="leading-snug">{line1}</span>
                    <span className="leading-snug">{line2}</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#42275a] flex-shrink-0 ml-auto" />
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-x-hidden w-full mb-1">
            <div className="flex animate-marquee-rtl whitespace-nowrap gap-x-6">
              {[
                // Row 2 boxes
                [
                  ["'Just checking in' fatigue?", "We've rewritten it 27 ways."],
                  ["Addendum request #97.", "Cue internal screaming."],
                  ["More email than closings?", "Let's fix that."],
                  ["Built by a TC, not a tech bro.", "Real chaos. Real solution."]
                ],
                // Duplicate for seamless loop
                [
                  ["'Just checking in' fatigue?", "We've rewritten it 27 ways."],
                  ["Addendum request #97.", "Cue internal screaming."],
                  ["More email than closings?", "Let's fix that."],
                  ["Built by a TC, not a tech bro.", "Real chaos. Real solution."]
                ]
              ].flat().map(([line1, line2], idx) => (
                <div
                  key={"row2-" + idx}
                  className="flex items-center bg-white/70 backdrop-blur-md rounded-lg px-6 py-5 shadow-md min-w-[320px] max-w-xs text-left hover:bg-white/90 transition-colors border border-black/10"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', color: '#232326' }}
                >
                  <div className="flex flex-col mr-4">
                    <span className="leading-snug">{line1}</span>
                    <span className="leading-snug">{line2}</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#42275a] flex-shrink-0 ml-auto" />
              </div>
              ))}
            </div>
          </div>
          <div className="overflow-x-hidden w-full">
            <div className="flex animate-marquee-ltr whitespace-nowrap gap-x-6">
              {[
                // Row 3 boxes
                [
                  ["Not a pretty inbox tool.", "It's a get-it-done tool."],
                  ["You do more than push paper.", "You keep deals alive."],
                  ["We're your shortcut.", "One damn good email at a time."],
                  ["Stop typing. Start closing.", "Let BossyEmail handle the follow-up."]
                ],
                // Duplicate for seamless loop
                [
                  ["Not a pretty inbox tool.", "It's a get-it-done tool."],
                  ["You do more than push paper.", "You keep deals alive."],
                  ["We're your shortcut.", "One damn good email at a time."],
                  ["Stop typing. Start closing.", "Let BossyEmail handle the follow-up."]
                ]
              ].flat().map(([line1, line2], idx) => (
                <div
                  key={"row3-" + idx}
                  className="flex items-center bg-white/70 backdrop-blur-md rounded-lg px-6 py-5 shadow-md min-w-[320px] max-w-xs text-left hover:bg-white/90 transition-colors border border-black/10"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', color: '#232326' }}
                >
                  <div className="flex flex-col mr-4">
                    <span className="leading-snug">{line1}</span>
                    <span className="leading-snug">{line2}</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#42275a] flex-shrink-0 ml-auto" />
            </div>
          ))}
        </div>
          </div>
        </div>
      </div>
    </section>
  )
} 