import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 max-w-2xl w-full mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-sidebar-foreground">Privacy Policy</h1>
        <p className="mb-6 text-base text-sidebar-foreground/90">
          Absolutely — here's a <span className="font-semibold">BossyEmail-style Privacy Policy</span>, keeping it witty, real-estate-savvy, and crystal clear, with just enough sass to keep readers awake (and compliant):
        </p>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">1. What We Collect (aka, Your Digital Fingerprint)</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><span className="font-semibold">The basics</span>: Like your name, email address, and whatever info you give us when you sign up, shoot us a message, or copy/paste templates like a boss.</li>
            <li><span className="font-semibold">Your moves</span>: We track how you use the app — buttons clicked, templates generated, emails crafted. Don't worry, we're not judging (unless you email in Comic Sans).</li>
            <li><span className="font-semibold">Device vibes</span>: IP address, browser type, and other techy stuff so we can make sure things run smoother than a closing with no contingencies.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">2. Why We Collect It (No, Not for Fun)</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Keep BossyEmail running like a well-oiled CRM.</li>
            <li>Send you updates, occasional tips, or clever emails that actually help you close more deals (and fewer tabs).</li>
            <li>Fix bugs, improve features, and make sure your email generator doesn't crash when you're trying to send that urgent inspection extension.</li>
            <li>Stay compliant — we're not trying to get sued either.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">3. Who We Share It With (Short List, Promise)</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><span className="font-semibold">Our team + tech tools:</span> Only the good ones. Developers, email systems, etc. All under tight NDAs and tighter security.</li>
            <li><span className="font-semibold">The law:</span> If we're legally required to share something, we'll do it — but we'll groan loudly first.</li>
          </ul>
          <div className="mt-2">What we <span className="font-bold">don't do</span>:<br />Sell your data. Ever. Not even for a grande iced oat milk latte.</div>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">4. Your Rights (Because You're the Boss)</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Ask what info we have on you</li>
            <li>Update it if it's wrong (we all make typos)</li>
            <li>Ask us to delete it (we'll be sad, but we'll do it)</li>
          </ul>
          <div className="mt-2">Just email us at <a href="mailto:contact@bossyemail.com" className="underline text-[#734b6d]">contact@bossyemail.com</a> and we'll take care of it faster than an agent running to a cash buyer.</div>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">5. Cookies (No, Not the Chocolate Chip Kind)</h2>
          <p>We use cookies to make the site work better. Like remembering your preferences or helping us understand how you use the app. You can disable them, but then things might break — and nobody wants a broken email tool.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">6. Changes to This Policy</h2>
          <p>If we ever change this privacy policy, we'll update the date above. Major changes? We'll let you know. No fine print sneakiness here.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">7. Questions?</h2>
          <p>Need clarification? Want to nerd out about data policies? Just email us: <a href="mailto:contact@bossyemail.com" className="underline text-[#734b6d]">contact@bossyemail.com</a></p>
        </section>
        <div className="mt-8 text-base font-semibold text-sidebar-foreground">Let's keep it professional, legal, and drama-free — the way real estate should be.</div>
      </div>
    </main>
  );
} 