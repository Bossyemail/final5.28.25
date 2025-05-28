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
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-sidebar-foreground">Support</h2>
      <p className="text-sidebar-foreground/70 mb-6">
        Whether you're stuck, confused, or just emotionally exhausted from yet another inspection delay — we got you.<br /><br />
        Reach out via email, phone, or send us a message below. We promise a real human (who's probably also survived a 10PM "urgent" call) will get back to you ASAP.<br /><br />
        <span className="inline-block">👉 Let's fix it together — without the hold music.</span>
      </p>
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 mb-8 max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <a
            href="tel:3059809722"
            className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 font-semibold py-3 px-6 text-base hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-center"
            style={{ textDecoration: 'none' }}
          >
            <Phone className="w-5 h-5" /> 305-980-9722
          </a>
          <a
            href="mailto:contact@bossyemail.com"
            className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100 font-semibold py-3 px-6 text-base hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-center"
            style={{ textDecoration: 'none' }}
          >
            <Mail className="w-5 h-5" /> contact@bossyemail.com
          </a>
        </div>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-zinc-200 dark:border-zinc-700" />
          <span className="mx-4 text-zinc-400 text-sm">Or send us a message</span>
          <div className="flex-grow border-t border-zinc-200 dark:border-zinc-700" />
        </div>
        {submitted ? (
          <div className="text-green-600 font-semibold py-8 text-center">Thank you! Your message has been sent.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border border-zinc-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border border-zinc-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="How can we help?"
              className="w-full border border-zinc-200 rounded-lg px-4 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button type="submit" className="w-full bg-black text-white rounded-full py-2 font-semibold hover:bg-zinc-900 transition">Send</button>
          </form>
        )}
      </div>
    </div>
  );
} 