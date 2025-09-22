"use client"

import Link from "next/link"
import { Github, Twitter } from "lucide-react"
import { TbBrandThreads, TbBrandInstagram, TbBrandLinkedin } from "react-icons/tb"

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
    <footer className="text-white relative border-t border-zinc-800">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left Column - Brand & Social */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <img src="/transparent 2.png" alt="BossyEmail" className="h-8 w-8" />
              <h3 className="text-2xl font-bold text-white">BossyEmail</h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Real estate emails done right...<br />in seconds.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.threads.com/@bossyemail" target="_blank" rel="noopener noreferrer" aria-label="Threads" className="text-zinc-400 hover:text-white transition-colors duration-200">
                <TbBrandThreads className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/bossyemail/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-zinc-400 hover:text-white transition-colors duration-200">
                <TbBrandInstagram className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/bossy-email-6b1953368/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-zinc-400 hover:text-white transition-colors duration-200">
                <TbBrandLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Right Column - Navigation Links */}
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">Product</h4>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-800">
          <p className="text-sm text-center text-zinc-400 pt-8">
            <span className="font-bold text-white">© 2025 BossyEmail</span>. Built by someone who <span className="italic">survived 11PM inspection drama</span>.
          </p>
        </div>
      </div>
    </footer>
  )
} 