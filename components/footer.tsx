"use client"

import Link from "next/link"
import { Github, Twitter } from "lucide-react"

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
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Disclaimer", href: "/disclaimer" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-[#42275a]">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">BossyEmail</h3>
            <p className="text-sm text-white/80">
              Real estate emails done right...in seconds.
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a href="#" className="text-white/80 hover:text-white" aria-label="Facebook" tabIndex={-1}>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-white/80 hover:text-white" aria-label="Instagram" tabIndex={-1}>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              {/* Threads */}
              <a href="#" className="text-white/80 hover:text-white" aria-label="Threads" tabIndex={-1}>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-white/80 hover:text-white" aria-label="LinkedIn" tabIndex={-1}>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="16" y1="8" x2="16" y2="16"/><line x1="8" y1="8" x2="8" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white/90">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white/90">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white/90">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/90">
            <span className="font-bold">© 2025 BossyEmail</span>. Built by someone who <span className="italic text-white">survived 11PM inspection drama</span>.
          </p>
        </div>
      </div>
    </footer>
  )
} 