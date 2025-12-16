import { useState, useEffect } from "react";
import { toast } from "sonner";

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
  const [hasChanges, setHasChanges] = useState(false);
  const [initialInfo, setInitialInfo] = useState(DEFAULT);

  // Load from localStorage on mount (with browser compatibility)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem("bossyemail_account");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setInfo(parsed);
            setInitialInfo(parsed);
          } catch (e) {
            console.error("Failed to parse stored account info:", e);
          }
        }
      }
    } catch (e) {
      // localStorage may be disabled or unavailable (private browsing, etc.)
      console.warn("localStorage not available:", e);
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInfo({ ...info, [e.target.name]: e.target.value });
    setHasChanges(true);
  }

  function handleSave() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem("bossyemail_account", JSON.stringify(info));
        setInitialInfo(info);
        setHasChanges(false);
        toast.success("Account information saved", { duration: 2000 });
      } else {
        toast.error("Unable to save: localStorage not available", { duration: 3000 });
      }
    } catch (e) {
      console.error("Failed to save account info:", e);
      toast.error("Failed to save. Please try again.", { duration: 3000 });
    }
  }

  return (
    <div className="w-full pl-8 pr-8 sm:pl-4 sm:pr-4" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
      <div className="max-w-2xl mx-auto py-8">
        <h2 className="text-2xl font-normal mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400 }}>Account & Signature</h2>
        <p className="mb-6 text-sm text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
          Manage your account details and email signature below.
        </p>
      <form className="space-y-3">
        <div className="flex gap-3">
          <input
            type="text"
            name="name"
            value={info.name}
            onChange={handleChange}
            placeholder="Your Name"
              className="flex-1 border border-[#E3E3E3] rounded-none px-3 py-1 text-sm font-normal focus:outline-none focus:border-[#161616] bg-white text-[#161616] placeholder-[#ABABAB] transition-colors"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
          />
          <input
            type="text"
            name="title"
            value={info.title}
            onChange={handleChange}
            placeholder="Title"
              className="flex-1 border border-[#E3E3E3] rounded-none px-3 py-1 text-sm font-normal focus:outline-none focus:border-[#161616] bg-white text-[#161616] placeholder-[#ABABAB] transition-colors"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            name="company"
            value={info.company}
            onChange={handleChange}
            placeholder="Company"
              className="flex-1 border border-[#E3E3E3] rounded-none px-3 py-1 text-sm font-normal focus:outline-none focus:border-[#161616] bg-white text-[#161616] placeholder-[#ABABAB] transition-colors"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
          />
        </div>
        <div>
          <textarea
            name="address"
            value={info.address}
            onChange={handleChange}
            placeholder="Address"
              className="w-full border border-[#E3E3E3] rounded-none px-3 py-1 min-h-[60px] text-sm font-normal focus:outline-none focus:border-[#161616] bg-white text-[#161616] placeholder-[#ABABAB] transition-colors resize-none"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
          />
        </div>
        <div className="flex gap-3">
          <input
            type="tel"
            name="phone"
            value={info.phone}
            onChange={handleChange}
            placeholder="Phone"
              className="flex-1 border border-[#E3E3E3] rounded-none px-3 py-1 text-sm font-normal focus:outline-none focus:border-[#161616] bg-white text-[#161616] placeholder-[#ABABAB] transition-colors"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
          />
          <input
            type="tel"
            name="office"
            value={info.office}
            onChange={handleChange}
            placeholder="Office"
              className="flex-1 border border-[#E3E3E3] rounded-none px-3 py-1 text-sm font-normal focus:outline-none focus:border-[#161616] bg-white text-[#161616] placeholder-[#ABABAB] transition-colors"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
          />
        </div>
        <div className="flex gap-3">
          <input
            type="tel"
            name="fax"
            value={info.fax}
            onChange={handleChange}
            placeholder="Fax"
              className="flex-1 border border-[#E3E3E3] rounded-none px-3 py-1 text-sm font-normal focus:outline-none focus:border-[#161616] bg-white text-[#161616] placeholder-[#ABABAB] transition-colors"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
          />
          <input
            type="email"
            name="email"
            value={info.email}
            onChange={handleChange}
            placeholder="Email"
              className="flex-1 border border-[#E3E3E3] rounded-none px-3 py-1 text-sm font-normal focus:outline-none focus:border-[#161616] bg-white text-[#161616] placeholder-[#ABABAB] transition-colors"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
          />
        </div>
        <textarea
          name="signature"
          value={info.signature}
          onChange={handleChange}
          placeholder="Signature block (shown at the bottom of your emails)"
            className="w-full border border-[#E3E3E3] rounded-none px-3 py-1 min-h-[80px] text-sm font-normal focus:outline-none focus:border-[#161616] bg-white text-[#161616] placeholder-[#ABABAB] transition-colors resize-none"
          style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
        />
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={!hasChanges}
            className={`px-4 py-2 text-sm font-normal border transition-colors ${
              hasChanges
                ? 'bg-[#161616] text-white border-[#161616] hover:bg-[#292929]'
                : 'bg-[#FBFBFB] text-[#ABABAB] border-[#E3E3E3] cursor-not-allowed'
            }`}
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
          >
            Save
          </button>
        </div>
      </form>
      <div className="mt-6">
          <div className="text-xs text-[#505050] mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>Signature Preview</div>
          <div className="border border-[#E3E3E3] rounded-none bg-[#FBFBFB] p-3 whitespace-pre-line text-sm text-[#161616] leading-relaxed">
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