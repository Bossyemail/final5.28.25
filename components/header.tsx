"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Menu, ArrowUpRight, X } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import DarkModeToggle from "@/components/DarkModeToggle"

export function Header({ onMobileMenu }: { onMobileMenu?: () => void }) {
  const { isSignedIn } = useUser()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on outside click or esc
  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false)
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileMenuOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleEsc)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleEsc)
    }
  }, [mobileMenuOpen])

  const handleSectionLink = (e: React.MouseEvent, hash: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (pathname === "/") {
      const el = document.getElementById(hash.replace("#", ""))
      if (el) el.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push("/" + hash)
    }
  }

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-zinc-900/95 text-black dark:text-white backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 min-h-16 flex items-center ${isScrolled ? 'shadow-lg' : 'shadow-none'}`}>
      <div className="container flex items-center transition-all duration-300 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 h-16">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden mr-2 p-2 rounded-full hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setMobileMenuOpen(open => !open)}
          aria-label="Open sidebar menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          tabIndex={0}
        >
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>
        <div className="flex items-center flex-grow">
          <div className="mr-4 flex ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-12">
            <Link href="/" className="mr-4 sm:mr-6 flex items-center space-x-2" style={{ overflow: 'hidden' }}>
              <img src="/logo-new.png" alt="BossyEmail logo" className="h-16 w-auto" style={{ objectFit: 'contain', display: 'block' }} />
            </Link>
          </div>
        </div>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center justify-center w-full space-x-3" aria-label="Main navigation" role="navigation">
          <a href="/#features" onClick={e => handleSectionLink(e, "#features")} className="text-base font-medium uppercase tracking-wide text-zinc-500 hover:text-black transition-colors px-2 py-0 focus:outline-none focus:ring-2 focus:ring-primary rounded" style={{ fontFamily: 'Inter, sans-serif' }}>
            FEATURES
          </a>
          <a href="/#pricing" onClick={e => handleSectionLink(e, "#pricing")} className="text-base font-medium uppercase tracking-wide text-zinc-500 hover:text-black transition-colors px-2 py-0 focus:outline-none focus:ring-2 focus:ring-primary rounded" style={{ fontFamily: 'Inter, sans-serif' }}>
            PRICING
          </a>
          <a href="/#faq" onClick={e => handleSectionLink(e, "#faq")} className="text-base font-medium uppercase tracking-wide text-zinc-500 hover:text-black transition-colors px-2 py-0 focus:outline-none focus:ring-2 focus:ring-primary rounded" style={{ fontFamily: 'Inter, sans-serif' }}>
            FAQ
          </a>
          <a href="/#process" onClick={e => handleSectionLink(e, "#process")} className="text-base font-medium uppercase tracking-wide text-zinc-500 hover:text-black transition-colors px-2 py-0 focus:outline-none focus:ring-2 focus:ring-primary rounded" style={{ fontFamily: 'Inter, sans-serif' }}>
            PROCESS
          </a>
          <a href="/#why" onClick={e => handleSectionLink(e, "#why")} className="text-base font-medium uppercase tracking-wide text-zinc-500 hover:text-black transition-colors px-2 py-0 focus:outline-none focus:ring-2 focus:ring-primary rounded" style={{ fontFamily: 'Inter, sans-serif' }}>
            WHY
          </a>
          <a href="/#about" onClick={e => handleSectionLink(e, "#about")} className="text-base font-medium uppercase tracking-wide text-zinc-500 hover:text-black transition-colors px-2 py-0 focus:outline-none focus:ring-2 focus:ring-primary rounded" style={{ fontFamily: 'Inter, sans-serif' }}>
            ABOUT
          </a>
        </nav>
        {/* Actions: DarkModeToggle, Dashboard button, UserButton */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          <DarkModeToggle />
          {isSignedIn ? (
            <>
              <Button 
                className="rounded-full bg-black text-white font-medium px-4 sm:px-6 py-2 shadow hover:bg-zinc-900 transition focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-white dark:text-[#212121] dark:hover:bg-[#f5f5f5] dark:border dark:border-[#424242]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                asChild
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <Button className="rounded-full bg-black text-white px-6 sm:px-8 py-2 text-base font-normal focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-white dark:text-[#212121] dark:hover:bg-[#f5f5f5] dark:border dark:border-[#424242]" style={{ fontFamily: 'Inter, sans-serif' }} asChild>
              <Link href="/sign-in">Log in <ArrowUpRight size={18} /></Link>
            </Button>
          )}
        </div>
      </div>
      {/* Mobile menu overlay and drawer */}
      {mobileMenuOpen && (
        <div className="absolute left-0 top-full w-full md:w-auto max-w-[14rem] bg-white shadow-lg z-50 md:hidden" style={{ width: 'min(100vw, 14rem)' }}>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
          <nav aria-label="Mobile navigation" className="pt-2">
            <ul className="flex flex-col divide-y divide-zinc-200">
              <li>
                <a href="/#features" onClick={e => { handleSectionLink(e, "#features"); setMobileMenuOpen(false); }}
                  className="block text-base font-medium text-zinc-900 hover:bg-zinc-100 px-4 py-3">
                  Features
                </a>
              </li>
              <li>
                <a href="/#pricing" onClick={e => { handleSectionLink(e, "#pricing"); setMobileMenuOpen(false); }}
                  className="block text-base font-medium text-zinc-900 hover:bg-zinc-100 px-4 py-3">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/#faq" onClick={e => { handleSectionLink(e, "#faq"); setMobileMenuOpen(false); }}
                  className="block text-base font-medium text-zinc-900 hover:bg-zinc-100 px-4 py-3">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/#process" onClick={e => { handleSectionLink(e, "#process"); setMobileMenuOpen(false); }}
                  className="block text-base font-medium text-zinc-900 hover:bg-zinc-100 px-4 py-3">
                  Process
                </a>
              </li>
              <li>
                <a href="/#why" onClick={e => { handleSectionLink(e, "#why"); setMobileMenuOpen(false); }}
                  className="block text-base font-medium text-zinc-900 hover:bg-zinc-100 px-4 py-3">
                  Why
                </a>
              </li>
              <li>
                <a href="/#about" onClick={e => { handleSectionLink(e, "#about"); setMobileMenuOpen(false); }}
                  className="block text-base font-medium text-zinc-900 hover:bg-zinc-100 px-4 py-3">
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}