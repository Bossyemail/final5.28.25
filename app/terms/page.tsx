import React from "react";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 max-w-2xl w-full mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-sidebar-foreground">Terms of Service</h1>
        <p className="mb-6 text-base text-sidebar-foreground/90">
          Welcome to BossyEmail — where real estate pros stop guessing and start sending emails that actually get responses.
        </p>
        <p className="mb-6 text-base text-sidebar-foreground/80">
          By using our site, app, or services (referred to as "BossyEmail," "we," or "our"), you agree to play by the rules listed below. If you don't agree with these Terms, kindly hit the back button and go back to yelling at your inbox.
        </p>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">What You're Agreeing To (TL;DR)</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Not steal our content, code, or style.</li>
            <li>Not use our platform to send spammy, shady, or scammy emails.</li>
            <li>Use the app like a professional, not like someone who still faxes contracts.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Who Can Use This</h2>
          <p>You must be at least 18 years old and legally capable of signing contracts (real estate agents, we're looking at you). You also agree that all the info you give us is real — no fake names, burner emails, or shady shenanigans.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Your Account, Your Responsibility</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Keeping your login safe (don't blame us if your assistant goes rogue).</li>
            <li>Anything that happens under your account (even if your cat walks across the keyboard).</li>
            <li>Letting us know ASAP if you think someone's messing with your account.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">What You Can't Do</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Reverse engineering, copying, or reselling our platform (get your own ideas).</li>
            <li>Using BossyEmail to harass, mislead, or spam anyone.</li>
            <li>Uploading anything illegal, dangerous, or just plain gross.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Email Responsibility (aka, Don't Blame Us)</h2>
          <p>BossyEmail helps you write great emails, but what you do with them is on you. We're not responsible for deals gone bad, leads that ghost you, or typos that make it past your coffee-deprived eyes.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Payments and Subscriptions</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>BossyEmail is not free (because building cool stuff costs money).</li>
            <li>If you're on a paid plan, you agree to the pricing and billing terms at the time of purchase.</li>
            <li>All sales are final unless otherwise stated. No refunds for "oops" or "my cousin didn't like the font."</li>
            <li>Subscriptions auto-renew unless you cancel. Cancel anytime in your account settings before your next billing cycle.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">We Can Make Changes (And We Probably Will)</h2>
          <p>We might update or improve BossyEmail, fix bugs, change features, or adjust pricing. We also reserve the right to suspend or terminate access to anyone who's abusing the platform, breaking the law, or just being a pain.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">No Guarantees</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>You'll close more deals</li>
            <li>Your clients will actually read your emails</li>
            <li>The app will work 100% of the time (though we aim for it)</li>
          </ul>
          <p className="mt-2">Use at your own risk. We're not liable for lost time, lost money, or lost sanity.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Legal Stuff</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>These Terms are governed by the laws of Florida / United States.</li>
            <li>If there's ever a dispute, we'll try to resolve it like adults. If that fails, it goes to binding arbitration.</li>
            <li>If any part of these Terms is unenforceable, the rest still applies.</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">Questions?</h2>
          <p>Reach out. We don't bite.<br />📩 <a href="mailto:contact@bossyemail.com" className="underline text-[#734b6d]">contact@bossyemail.com</a></p>
        </section>
        <div className="mt-8 text-base font-semibold text-sidebar-foreground">Because real estate doesn't need more chaos — just better emails.</div>
      </div>
    </main>
  );
} 