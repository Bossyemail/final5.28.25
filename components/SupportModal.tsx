import { useState } from "react";
import { Mail, Phone, X } from "lucide-react";

export function SupportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
      onClose();
    }, 1500);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><Mail className="w-5 h-5" /> Contact Support</h2>
        <div className="mb-4 space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-zinc-500" />
            <span className="font-semibold text-zinc-700">305-980-9722</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-zinc-500" />
            <a href="mailto:contact@bossyemail.com" className="font-semibold text-zinc-700 underline hover:text-blue-600">contact@bossyemail.com</a>
          </div>
        </div>
        <p className="text-sm text-zinc-500 mb-4">Have feedback or need help? Fill out the form below and our team will get back to you soon.</p>
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
            <button type="submit" className="w-full bg-black text-white rounded-lg py-2 font-semibold hover:bg-zinc-900 transition">Send</button>
          </form>
        )}
      </div>
    </div>
  );
} 