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
    <footer className="border-t" style={{ background: 'var(--footer-bg)', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="flex flex-col items-start gap-0">
            <img src="/logo.png" alt="BossyEmail logo" className="h-40 w-auto self-start -mt-14" />
            <p className="text-sm m-0 -mt-8 mb-4" style={{ color: 'var(--footer-text)' }}>
              Real estate emails done right...in seconds.
            </p>
            <div className="flex space-x-2">
              <a href="https://www.threads.com/@bossyemail" target="_blank" rel="noopener noreferrer" aria-label="Threads">
                <TbBrandThreads className="h-8 w-8" style={{ color: 'var(--footer-text)' }} />
              </a>
              <a href="https://www.instagram.com/bossyemail/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <TbBrandInstagram className="h-8 w-8" style={{ color: 'var(--footer-text)' }} />
              </a>
              <a href="https://www.linkedin.com/in/bossy-email-6b1953368/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <TbBrandLinkedin className="h-8 w-8" style={{ color: 'var(--footer-text)' }} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold" style={{ color: 'var(--footer-text)' }}>Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-black"
                    style={{ color: 'var(--footer-text)' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold" style={{ color: 'var(--footer-text)' }}>Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-black"
                    style={{ color: 'var(--footer-text)' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold" style={{ color: 'var(--footer-text)' }}>Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans font-normal hover:text-black"
                    style={{ color: 'var(--footer-text)', fontFamily: 'Inter, sans-serif' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t" style={{ borderColor: '#2323261A' }}>
          <p className="text-sm text-center" style={{ color: 'var(--footer-text)', paddingTop: '2rem' }}>
            <span className="font-bold">© 2025 BossyEmail</span>. Built by someone who <span className="italic">survived 11PM inspection drama</span>.
          </p>
        </div>
      </div>
    </footer>
  )
} 