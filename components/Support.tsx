import { useState } from "react";
import { Mail, Phone } from "lucide-react";

export function Support() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  }

  return (
    <div className="w-full pl-32 pr-16 sm:pl-8 sm:pr-4 xs:pl-2 xs:pr-2 dark:bg-[#424242] dark:text-[#e0e0e0]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-normal mb-2 dark:text-[#e0e0e0]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '32px', WebkitFontSmoothing: 'antialiased' }}>Support</h2>
        <p className="mb-6 dark:text-[#e0e0e0]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', WebkitFontSmoothing: 'antialiased' }}>
        Whether you're stuck, confused, or just emotionally exhausted from yet another inspection delay — we got you.<br /><br />
        Reach out via email, phone, or send us a message below. We promise a real human (who's probably also survived a 10PM "urgent" call) will get back to you ASAP.<br /><br />
          <span className="inline-block dark:text-[#e0e0e0]">👉 Let's fix it together — without the hold music.</span>
      </p>
        <div className="bg-white dark:bg-[#424242] rounded-2xl shadow-xl p-8 mb-8 w-full">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <a
            href="tel:3059809722"
              className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-zinc-300 dark:border-[#616161] bg-transparent text-zinc-900 dark:text-[#e0e0e0] font-semibold py-3 px-6 text-base hover:bg-zinc-100 dark:hover:bg-[#616161] transition text-center"
            style={{ textDecoration: 'none' }}
          >
              <Phone className="w-5 h-5 dark:text-[#e0e0e0]" /> <span className="dark:text-[#e0e0e0]">305-980-9722</span>
          </a>
          <a
              href="mailto:aylen@bossyemail.com"
              className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-zinc-300 dark:border-[#616161] bg-transparent text-zinc-900 dark:text-[#e0e0e0] font-semibold py-3 px-2 text-base hover:bg-zinc-100 dark:hover:bg-[#616161] transition text-center"
            style={{ textDecoration: 'none' }}
          >
              <Mail className="w-5 h-5 dark:text-[#e0e0e0]" /> <span className="dark:text-[#e0e0e0]">aylen@bossyemail.com</span>
          </a>
        </div>
        <div className="flex items-center my-6">
            <div className="flex-grow border-t border-zinc-200 dark:border-[#616161]" />
            <span className="mx-4 text-zinc-400 dark:text-[#e0e0e0] text-sm">Or send us a message</span>
            <div className="flex-grow border-t border-zinc-200 dark:border-[#616161]" />
        </div>
        {submitted ? (
            <div className="font-semibold py-8 text-center dark:text-[#e0e0e0]">Thank you! Your message has been sent.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
                className="w-full border border-zinc-200 dark:border-[#616161] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#424242] dark:text-[#e0e0e0] dark:placeholder-[#e0e0e0]"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
                className="w-full border border-zinc-200 dark:border-[#616161] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#424242] dark:text-[#e0e0e0] dark:placeholder-[#e0e0e0]"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="How can we help?"
                className="w-full border border-zinc-200 dark:border-[#616161] rounded-lg px-4 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#424242] dark:text-[#e0e0e0] dark:placeholder-[#e0e0e0]"
              required
            />
              <button type="submit" className="w-full bg-black text-white rounded-full py-2 font-semibold hover:bg-zinc-900 transition dark:bg-white dark:text-[#e0e0e0] dark:hover:bg-[#616161] dark:border dark:border-[#424242]">Send</button>
          </form>
        )}
        </div>
      </div>
    </div>
  );
} 