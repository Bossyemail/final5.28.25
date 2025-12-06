import React from "react";
import { Header } from "@/components/header";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex items-center justify-center pt-20 pb-16 px-4 md:px-6">
        <div className="bg-white border border-[#E3E3E3] rounded-none p-8 max-w-2xl w-full mx-auto">
        <h1 className="display-6 sm:display-7 md:display-8 mb-6 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>Disclaimer</h1>
        <p className="mb-6 paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
          We're good at what we do, but we're not perfect — and we're definitely not your attorney.
        </p>
        <section className="mb-6">
          <h2 className="display-4 mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>General Disclaimer</h2>
          <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>BossyEmail is a software platform designed to help real estate professionals craft faster, smarter, sassier emails. While we aim to provide helpful and accurate content, the information generated or provided by BossyEmail is for informational purposes only and should not be considered legal advice, financial advice, or a substitute for professional judgment.</p>
          <p className="mt-2 paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>Always double-check important communications and edit as needed. You're the one pressing "send," not us.</p>
        </section>
        <section className="mb-6">
          <h2 className="display-4 mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>Real Estate-Specific Content</h2>
          <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>BossyEmail creates messages, templates, and suggestions tailored for real estate agents, brokers, and transaction coordinators. We've been around enough contracts to make you blush — but we're not a law firm, and using our content doesn't create any client-attorney anything.</p>
          <p className="mt-2 paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>So yes, BossyEmail can and will make mistakes (just like that one buyer who changed their mind three times). It's your responsibility to review and confirm accuracy, compliance, and all legal requirements based on your local market and brokerage policies.</p>
        </section>
        <section className="mb-6">
          <h2 className="display-4 mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>No Guarantees</h2>
          <ul className="list-disc pl-6 space-y-1 paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            <li>Magically fix your broken lead pipeline</li>
            <li>Prevent you from sending a typo-ridden email (spell check is still your friend)</li>
            <li>Make you top producer of the month (though we love that for you)</li>
          </ul>
          <p className="mt-2 paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>We do our best to deliver a reliable and helpful product — but use at your own risk.</p>
        </section>
        <section className="mb-6">
          <h2 className="display-4 mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>Third-Party Stuff</h2>
          <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>BossyEmail may link to third-party websites, tools, or resources. We don't control them, endorse them, or take responsibility for whatever they do with your info, your cookies, or your time. Click responsibly.</p>
        </section>
        <section className="mb-6">
          <h2 className="display-4 mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>Limitation of Liability</h2>
          <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>To the maximum extent allowed by law, BossyEmail and its team are not liable for any indirect, incidental, or facepalm-worthy damages resulting from your use (or misuse) of the platform — including, but not limited to: missed deals, embarrassing typos, compliance issues, or "accidentally sent to all."</p>
        </section>
        <section className="mb-6">
          <h2 className="display-4 mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>You Are Still the Boss</h2>
          <ul className="list-disc pl-6 space-y-1 paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            <li>Reviewing every message before sending</li>
            <li>Following your local real estate laws and brokerage guidelines</li>
            <li>Taking credit for the wins and owning the mistakes (but hopefully fewer of those)</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="display-4 mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>Questions?</h2>
          <p className="paragraph-default text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>Got concerns, confusion, or compliments? We're here for it.<br />📬 <a href="mailto:aylen@bossyemail.com" className="underline text-[#161616] hover:text-[#505050]">aylen@bossyemail.com</a></p>
        </section>
        <div className="mt-8 paragraph-default font-medium text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>Let's keep it professional, sharp, and drama-free — one email at a time.<br />Now go review that email before you hit send.</div>
        </div>
      </main>
    </div>
  );
}
