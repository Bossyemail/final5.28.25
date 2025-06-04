"use client"

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-[#e0e0e0] dark:bg-[#757575] dark:text-black">
      <div className="w-full max-w-3xl mx-auto px-0 md:px-0 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-8">
        <div className="flex-shrink-0 w-full md:w-80 lg:w-96 mt-8 md:mt-16 flex justify-start order-1 md:order-none -ml-16 md:-ml-48">
          <img
            src="/about-photo.jpg"
            alt="Aylen Montenegro"
            className="object-cover w-64 h-64 md:w-80 md:h-80"
          />
        </div>
        <div className="flex-1 order-2 md:order-none">
          <h2 className="text-5xl font-normal mb-4 text-black dark:text-black text-center md:text-left" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '48px' }}>
            About
          </h2>
          <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px' }} className="text-black dark:text-black">
            <p className="mb-3">
              Hey — I'm Aylen. I've spent the last 20+ years knee-deep in real estate contracts, timelines, and inboxes that should honestly come with a warning label. I've worked with buyers, sellers, lenders, and title companies — and I've survived every "where's that form?" meltdown you can imagine.
          </p>
            <p className="mb-3">
              After writing thousands of emails to clean up messes I didn't create, I finally thought: <span className="italic font-medium">What if I gave agents and TCs the exact words they need — before the panic sets in?</span>
          </p>
            <p className="mb-3">
              So I built BossyEmail. Not to replace you. Not to turn you into a robot. But to hand you the shortcut to sounding like the pro you already are — just without the 11pm eye twitch.
            </p>
            <p className="mb-3">
              This isn't some startup experiment. It's a tool built by someone who's been there — probably in heels, sweating through a closing with no AC and a missing wire transfer.
          </p>
            <p>
              Welcome to your new sidekick. You're gonna love what we built here.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 