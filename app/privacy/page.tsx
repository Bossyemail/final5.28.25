import React from "react";
import { Header } from "@/components/header";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex items-center justify-center pt-20 pb-16 px-4 md:px-6">
        <div className="bg-white border border-[#E3E3E3] rounded-none p-8 max-w-2xl w-full mx-auto">
        <h1 className="display-6 sm:display-7 md:display-8 mb-6 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>Privacy Policy</h1>
        <p className="mb-6 paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
          Absolutely — here's a <span className="font-semibold">BossyEmail-style Privacy Policy</span>, keeping it witty, real-estate-savvy, and crystal clear, with just enough sass to keep readers awake (and compliant):
        </p>
        <section className="mb-6">
          <h2 className="display-4 mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>1. What We Collect (aka, Your Digital Fingerprint)</h2>
          <ul className="list-disc pl-6 space-y-1 paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            <li><span className="font-semibold">The basics</span>: Like your name, email address, and whatever info you give us when you sign up, shoot us a message, or copy/paste templates like a boss.</li>
            <li><span className="font-semibold">Your moves</span>: We track how you use the app — buttons clicked, templates generated, emails crafted. Don't worry, we're not judging (unless you email in Comic Sans).</li>
            <li><span className="font-semibold">Device vibes</span>: IP address, browser type, and other techy stuff so we can make sure things run smoother than a closing with no contingencies.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="display-4 mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>2. Why We Collect It (No, Not for Fun)</h2>
          <ul className="list-disc pl-6 space-y-1 paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            <li>Keep BossyEmail running like a well-oiled CRM.</li>
            <li>Send you updates, occasional tips, or clever emails that actually help you close more deals (and fewer tabs).</li>
            <li>Fix bugs, improve features, and make sure your email generator doesn't crash when you're trying to send that urgent inspection extension.</li>
            <li>Stay compliant — we're not trying to get sued either.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="display-4 mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>3. Who We Share It With (Short List, Promise)</h2>
          <ul className="list-disc pl-6 space-y-1 paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            <li><span className="font-semibold">Our team + tech tools:</span> Only the good ones. Developers, email systems, etc. All under tight NDAs and tighter security.</li>
            <li><span className="font-semibold">The law:</span> If we're legally required to share something, we'll do it — but we'll groan loudly first.</li>
          </ul>
          <div className="mt-2 paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>What we <span className="font-bold">don't do</span>:<br />Sell your data. Ever. Not even for a grande iced oat milk latte.</div>
        </section>
        <section className="mb-6">
          <h2 className="display-4 mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>4. Your Rights (Because You're the Boss)</h2>
          <ul className="list-disc pl-6 space-y-1 paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            <li>Ask what info we have on you</li>
            <li>Update it if it's wrong (we all make typos)</li>
            <li>Ask us to delete it (we'll be sad, but we'll do it)</li>
          </ul>
          <div className="mt-2 paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>Just email us at <a href="mailto:aylen@bossyemail.com" className="underline text-[#161616] hover:text-[#505050]">aylen@bossyemail.com</a> and we'll take care of it faster than an agent running to a cash buyer.</div>
        </section>
        <section className="mb-6">
          <h2 className="display-4 mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>5. Cookies (No, Not the Chocolate Chip Kind)</h2>
          <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>We use cookies to make the site work better. Like remembering your preferences or helping us understand how you use the app. You can disable them, but then things might break — and nobody wants a broken email tool.</p>
        </section>
        <section className="mb-6">
          <h2 className="display-4 mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>6. Changes to This Policy</h2>
          <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>If we ever change this privacy policy, we'll update the date above. Major changes? We'll let you know. No fine print sneakiness here.</p>
        </section>
        <section className="mb-6">
          <h2 className="display-4 mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>7. Questions?</h2>
          <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>Need clarification? Want to nerd out about data policies? Just email us: <a href="mailto:aylen@bossyemail.com" className="underline text-[#161616] hover:text-[#505050]">aylen@bossyemail.com</a></p>
        </section>
        <div className="mt-8 paragraph-default font-medium text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>Let's keep it professional, legal, and drama-free — the way real estate should be.</div>
        </div>
      </main>
    </div>
  );
}
