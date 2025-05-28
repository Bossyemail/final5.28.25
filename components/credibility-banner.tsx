"use client"

export function CredibilityBanner() {
  return (
    <section className="w-full py-0 px-0">
      <div className="w-full flex flex-row items-stretch min-h-[120px] bg-gradient-to-r from-[#42275a] to-[#734b6d] relative overflow-hidden">
        {/* Left: Text Area */}
        <div className="flex-1 flex flex-col justify-center pl-8 pr-4 py-8 z-10">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-2 tracking-tight drop-shadow">Built by a Real Estate Pro</h3>
          <p className="text-white/90 text-base md:text-lg font-medium drop-shadow">
            Used by agents who are done emailing in ALL CAPS.<br />
            <span className="text-white/70 font-normal">BossyEmail: For pros who want results, not rage-typing.</span>
          </p>
        </div>
        {/* Right: Geometric/Folded Effect */}
        <div className="hidden md:flex flex-row items-stretch h-full w-[340px] relative">
          {/* Stripe 1 */}
          <div className="w-1/4 h-full bg-gradient-to-b from-[#734b6d] to-[#42275a] shadow-xl" style={{boxShadow:'8px 0 24px 0 rgba(67,39,90,0.18)'}} />
          {/* Stripe 2 (white) */}
          <div className="w-1/4 h-full bg-white shadow-xl" style={{boxShadow:'8px 0 24px 0 rgba(255,255,255,0.12)'}} />
          {/* Stripe 3 */}
          <div className="w-1/4 h-full bg-gradient-to-b from-[#42275a] to-[#734b6d] shadow-xl" style={{boxShadow:'8px 0 24px 0 rgba(67,39,90,0.18)'}} />
          {/* Stripe 4 (white, with shadow) */}
          <div className="w-1/4 h-full bg-white shadow-xl" style={{boxShadow:'8px 0 24px 0 rgba(255,255,255,0.12)'}} />
        </div>
      </div>
    </section>
  )
} 