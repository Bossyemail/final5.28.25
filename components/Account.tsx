import { useState, useEffect } from "react";

const DEFAULT = {
  name: "",
  title: "",
  company: "",
  address: "",
  phone: "",
  office: "",
  fax: "",
  email: "",
  signature: "Best regards,\n[Your Name]"
};

export function Account() {
  const [info, setInfo] = useState(DEFAULT);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("bossyemail_account");
    if (stored) {
      setInfo(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever info changes
  useEffect(() => {
    localStorage.setItem("bossyemail_account", JSON.stringify(info));
  }, [info]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }

  return (
    <div className="w-full font-sans pl-32 pr-16 sm:pl-8 sm:pr-4 xs:pl-2 xs:pr-2 dark:bg-[#424242] dark:text-[#e0e0e0]" style={{ fontFamily: 'Inter, sans-serif', color: '#232326', WebkitFontSmoothing: 'antialiased' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 dark:text-[#e0e0e0]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#232326' }}>Account & Signature</h2>
        <form className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="name"
              value={info.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="flex-1 border border-zinc-200 dark:border-[#616161] rounded-lg px-4 py-2 text-base sm:text-lg font-normal focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#424242] dark:text-[#e0e0e0] dark:placeholder-[#e0e0e0]"
            />
            <input
              type="text"
              name="title"
              value={info.title}
              onChange={handleChange}
              placeholder="Title"
              className="flex-1 border border-zinc-200 dark:border-[#616161] rounded-lg px-4 py-2 text-base sm:text-lg font-normal focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#424242] dark:text-[#e0e0e0] dark:placeholder-[#e0e0e0]"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              name="company"
              value={info.company}
              onChange={handleChange}
              placeholder="Company"
              className="flex-1 border border-zinc-200 dark:border-[#616161] rounded-lg px-4 py-2 text-base sm:text-lg font-normal focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#424242] dark:text-[#e0e0e0] dark:placeholder-[#e0e0e0]"
            />
          </div>
          <div>
            <textarea
              name="address"
              value={info.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border border-zinc-200 dark:border-[#616161] rounded-lg px-4 py-2 min-h-[48px] text-base sm:text-lg font-normal focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#424242] dark:text-[#e0e0e0] dark:placeholder-[#e0e0e0]"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="tel"
              name="phone"
              value={info.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="flex-1 border border-zinc-200 dark:border-[#616161] rounded-lg px-4 py-2 text-base sm:text-lg font-normal focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#424242] dark:text-[#e0e0e0] dark:placeholder-[#e0e0e0]"
            />
            <input
              type="tel"
              name="office"
              value={info.office}
              onChange={handleChange}
              placeholder="Office"
              className="flex-1 border border-zinc-200 dark:border-[#616161] rounded-lg px-4 py-2 text-base sm:text-lg font-normal focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#424242] dark:text-[#e0e0e0] dark:placeholder-[#e0e0e0]"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="tel"
              name="fax"
              value={info.fax}
              onChange={handleChange}
              placeholder="Fax"
              className="flex-1 border border-zinc-200 dark:border-[#616161] rounded-lg px-4 py-2 text-base sm:text-lg font-normal focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#424242] dark:text-[#e0e0e0] dark:placeholder-[#e0e0e0]"
            />
            <input
              type="email"
              name="email"
              value={info.email}
              onChange={handleChange}
              placeholder="Email"
              className="flex-1 border border-zinc-200 dark:border-[#616161] rounded-lg px-4 py-2 text-base sm:text-lg font-normal focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#424242] dark:text-[#e0e0e0] dark:placeholder-[#e0e0e0]"
            />
          </div>
          <textarea
            name="signature"
            value={info.signature}
            onChange={handleChange}
            placeholder="Signature block (shown at the bottom of your emails)"
            className="w-full border border-zinc-200 dark:border-[#616161] rounded-lg px-4 py-2 min-h-[60px] text-base sm:text-lg font-normal focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#424242] dark:text-[#e0e0e0] dark:placeholder-[#e0e0e0]"
          />
        </form>
        <div className="mt-8">
          <div className="text-xs text-zinc-500 dark:text-[#e0e0e0] mb-1">Signature Preview</div>
          <div className="border border-zinc-200 dark:border-[#616161] rounded-lg bg-zinc-50 dark:bg-[#424242] p-4 whitespace-pre-line text-sm text-zinc-700 dark:text-[#e0e0e0]">
            {info.signature.replace('[Your Name]', info.name || 'Your Name')}
            {info.title && `\n${info.title}`}
            {info.company && `\n${info.company}`}
            {info.address && `\n${info.address}`}
            {info.phone && `\nPhone: ${info.phone}`}
            {info.office && `\nOffice: ${info.office}`}
            {info.fax && `\nFax: ${info.fax}`}
            {info.email && `\n${info.email}`}
          </div>
        </div>
      </div>
    </div>
  );
} 