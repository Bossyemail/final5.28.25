"use client"

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 text-white relative">
      <div className="absolute bottom-1/3 right-1/3 w-88 h-88 bg-[#D1B4C6]/8 rounded-full blur-3xl"></div>
      {/* Additional light source */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            <div className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              ABOUT
            </div>
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                Hey — I'm Aylen. I've spent the last 20+ years knee-deep in real estate contracts, timelines, and inboxes that should honestly come with a warning label. I've worked with buyers, sellers, lenders, and title companies — and I've survived every "where's that form?" meltdown you can imagine.
              </p>
              <p>
                After writing thousands of emails to clean up messes I didn't create, I finally thought: <span className="italic text-[#D1B4C6] font-medium">What if I gave agents and TCs the exact words they need — before the panic sets in?</span>
              </p>
              <p>
                So I built BossyEmail. Not to replace you. Not to turn you into a robot. But to hand you the shortcut to sounding like the pro you already are — just without the 11pm eye twitch.
              </p>
              <p>
                This isn't some startup experiment. It's a tool built by someone who's been there — probably in heels, sweating through a closing with no AC and a missing wire transfer.
              </p>
              <p className="text-white font-medium">
                Welcome to your new sidekick. You're gonna love what we built here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 