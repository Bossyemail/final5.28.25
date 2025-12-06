import { useState } from "react";
import { Mail } from "lucide-react";

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
    <div className="w-full pl-8 pr-8 sm:pl-4 sm:pr-4" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
      <div className="max-w-2xl mx-auto py-8">
        <h2 className="text-2xl font-normal mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400 }}>Support</h2>
        <p className="text-sm text-[#505050] mb-6" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
          Whether you're stuck, confused, or just emotionally exhausted from yet another inspection delay — we got you.<br /><br />
          Reach out via email or send us a message below. We promise a real human (who's probably also survived a 10PM "urgent" call) will get back to you ASAP.<br /><br />
          <span className="inline-block">👉 Let's fix it together — without the hold music.</span>
        </p>
        <div className="bg-white border border-[#E3E3E3] rounded-none p-6 w-full">
          <div className="mb-4">
            <a
              href="mailto:aylen@bossyemail.com"
              className="w-full flex items-center justify-center gap-2 rounded-none border border-[#161616] bg-white text-[#161616] font-medium py-2 px-4 text-sm hover:bg-[#FBFBFB] transition text-center"
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500, textDecoration: 'none' }}
            >
              <Mail className="w-4 h-4" /> <span>aylen@bossyemail.com</span>
            </a>
          </div>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-[#E3E3E3]" />
            <span className="mx-4 text-[#505050] text-xs" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>Or send us a message</span>
            <div className="flex-grow border-t border-[#E3E3E3]" />
          </div>
          {submitted ? (
            <div className="font-medium py-6 text-center text-sm text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>Thank you! Your message has been sent.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border border-[#E3E3E3] rounded-none px-3 py-1 text-sm bg-white text-[#161616] placeholder-[#ABABAB] focus:outline-none focus:border-[#161616] transition-colors"
                style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full border border-[#E3E3E3] rounded-none px-3 py-1 text-sm bg-white text-[#161616] placeholder-[#ABABAB] focus:outline-none focus:border-[#161616] transition-colors"
                style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                required
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help?"
                className="w-full border border-[#E3E3E3] rounded-none px-3 py-1 min-h-[100px] text-sm bg-white text-[#161616] placeholder-[#ABABAB] focus:outline-none focus:border-[#161616] transition-colors resize-none"
                style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
                required
              />
              <button 
                type="submit" 
                className="w-full bg-[#161616] hover:bg-[#292929] text-white text-sm font-medium px-4 py-2 rounded-none transition-colors"
                style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
              >
                Send
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
