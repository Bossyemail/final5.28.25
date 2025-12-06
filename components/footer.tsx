"use client"

import Link from "next/link"
import { Mail, ArrowRight, Share2 } from "lucide-react"
import { TbBrandThreads, TbBrandInstagram, TbBrandLinkedin } from "react-icons/tb"
import { useState } from "react"

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
    { name: "Process", href: "#process" },
  ],
  company: [
    { name: "Why", href: "#why" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "/contact" },
    { name: "Templates", href: "#real-scenarios" },
    { name: "Demo", href: "#video-demo" },
    { name: "Affiliate Program", href: "/affiliate" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Disclaimer", href: "/disclaimer" },
  ],
}

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription logic here
    console.log("Subscribed:", email)
    setEmail("")
  }

  return (
    <footer className="bg-[#161616] text-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section - Logo */}
        <div className="flex flex-col md:flex-row items-center justify-between py-8 border-b border-[#292929]">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <img src="/transparent 1.png" alt="BossyEmail" className="h-8 w-8" style={{ filter: 'brightness(0) invert(1)' }} />
            <h3 className="text-xl text-white" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, letterSpacing: '-0.02em' }}>BossyEmail</h3>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="grid md:grid-cols-2 gap-12 py-12 border-b border-[#292929]">
          {/* Left Column - Newsletter/CTA */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-normal mb-4 text-white" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>
                Never Send a Bad Email Again
              </h2>
              <p className="text-[#ABABAB] leading-relaxed" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
                Get tips, updates, and real estate email templates delivered to your inbox. Join thousands of agents who communicate like pros.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-[#292929] border border-[#292929] text-white placeholder-[#ABABAB] focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 rounded-none"
                style={{ '--tw-ring-color': 'var(--accent-1-50)', fontFamily: 'var(--font-inter-tight), sans-serif' } as React.CSSProperties}
                onFocus={(e) => e.currentTarget.style.setProperty('--tw-ring-color', 'var(--accent-1-50)')}
                required
              />
              <button
                type="submit"
                className="bg-white hover:bg-[#FBFBFB] text-[#161616] text-sm font-medium px-8 py-4 rounded-none transition-all duration-200 uppercase tracking-wide inline-flex items-center gap-2 h-12 group whitespace-nowrap"
                style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
              >
                SUBSCRIBE
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45" />
              </button>
            </form>
          </div>

          {/* Right Columns - Navigation Links */}
          <div className="grid grid-cols-2 gap-8">
            {/* Product Column */}
            <div>
              <ul className="space-y-0">
                {footerLinks.product.map((link, index) => (
                  <li key={link.name} className={index > 0 ? "border-t border-[#292929]" : ""}>
                    <Link
                      href={link.href}
                      className="py-3 text-white transition-colors duration-200 inline-flex items-center justify-between w-full group"
                      style={{ '--hover-color': 'var(--accent-1)', fontFamily: 'var(--font-inter-tight), sans-serif' } as React.CSSProperties}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-1)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                    >
                      <span className="text-sm">{link.name}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <ul className="space-y-0">
                {footerLinks.company.map((link, index) => (
                  <li key={link.name} className={index > 0 ? "border-t border-[#292929]" : ""}>
                    <Link
                      href={link.href}
                      className="py-3 text-white transition-colors duration-200 inline-flex items-center justify-between w-full group"
                      style={{ '--hover-color': 'var(--accent-1)', fontFamily: 'var(--font-inter-tight), sans-serif' } as React.CSSProperties}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-1)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                    >
                      <span className="text-sm">{link.name}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="grid md:grid-cols-3 gap-8 py-12 border-b border-[#292929]">
          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#292929] rounded-none flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-[#ABABAB] mb-1" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>Email</p>
              <a href="mailto:aylen@bossyemail.com" className="text-white hover:text-[#D1B4C6] transition-colors duration-200" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
                aylen@bossyemail.com
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#292929] rounded-none flex items-center justify-center flex-shrink-0">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-[#ABABAB] mb-1" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>Follow</p>
              <div className="flex items-center gap-3">
                <a href="https://www.threads.com/@bossyemail" target="_blank" rel="noopener noreferrer" aria-label="Threads" className="text-white hover:text-[#D1B4C6] transition-colors duration-200">
                  <TbBrandThreads className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/bossyemail/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:text-[#D1B4C6] transition-colors duration-200">
                  <TbBrandInstagram className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/bossy-email-6b1953368/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white hover:text-[#D1B4C6] transition-colors duration-200">
                  <TbBrandLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Empty column for spacing */}
          <div></div>
        </div>

        {/* Bottom Section - Copyright and Legal */}
        <div className="flex flex-col md:flex-row items-center justify-between py-8">
          <div className="flex flex-wrap items-center gap-4 mb-4 md:mb-0">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-[#ABABAB] hover:text-white transition-colors duration-200"
                style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <p className="text-sm text-[#ABABAB]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
            Copyright © 2025 BossyEmail | Built by someone who survived 11PM inspection drama.
          </p>
        </div>
      </div>
    </footer>
  )
}
