"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

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
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${isScrolled ? 'shadow-lg h-12 md:h-14' : 'shadow-none h-16 md:h-20'}`}>
      <div className="container flex items-center transition-all duration-300 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24" style={{ minHeight: isScrolled ? '3rem' : '4rem' }}>
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden mr-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open sidebar menu"
          tabIndex={0}
        >
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>
        <div className="mr-4 flex ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-12">
          <Link href="/" className="mr-4 sm:mr-6 flex items-center space-x-2">
            <span className="font-bold text-lg md:text-xl lg:text-2xl transition-all duration-300">BossyEmail</span>
          </Link>
        </div>
        {/* Desktop nav */}
        <div className="flex flex-1 items-center justify-center">
          <nav className="hidden md:flex items-center space-x-2" aria-label="Main navigation" role="navigation">
            <a href="/#features" onClick={e => handleSectionLink(e, "#features")} className="text-base font-light text-zinc-500 hover:text-black transition-colors px-1 py-0">
              Features
            </a>
            <a href="/#pricing" onClick={e => handleSectionLink(e, "#pricing")} className="text-base font-light text-zinc-500 hover:text-black transition-colors px-1 py-0">
              Pricing
            </a>
            <a href="/#faq" onClick={e => handleSectionLink(e, "#faq")} className="text-base font-light text-zinc-500 hover:text-black transition-colors px-1 py-0">
              FAQ
            </a>
            <a href="/#process" onClick={e => handleSectionLink(e, "#process")} className="text-base font-light text-zinc-500 hover:text-black transition-colors px-1 py-0">
              Process
            </a>
            <a href="/#why" onClick={e => handleSectionLink(e, "#why")} className="text-base font-light text-zinc-500 hover:text-black transition-colors px-1 py-0">
              Why
            </a>
            <a href="/#about" onClick={e => handleSectionLink(e, "#about")} className="text-base font-light text-zinc-500 hover:text-black transition-colors px-1 py-0">
              About
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {isSignedIn ? (
            <>
              <Button 
                className="rounded-full bg-gradient-to-r from-[#42275a] to-[#734b6d] text-white font-semibold px-4 sm:px-6 py-2 shadow hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-offset-2"
                asChild
              >
                <Link href="/dashboard">My Bossy Inbox</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <Button className="rounded-full bg-black text-white px-6 sm:px-8 py-2 font-semibold" asChild>
              <Link href="/sign-in">Let's Go</Link>
            </Button>
          )}
        </div>
      </div>
      {/* Mobile menu overlay with slide-in animation */}
      <div className={`fixed inset-0 z-50 bg-black/40 flex md:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ transitionProperty: 'opacity' }}
      >
        <div
          ref={mobileMenuRef}
          className={`bg-white dark:bg-zinc-900 w-72 max-w-full h-full shadow-xl p-6 flex flex-col transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="font-bold text-lg">BossyEmail</span>
            <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <nav className="flex flex-col gap-2">
            <a href="/#features" onClick={e => handleSectionLink(e, "#features")} className="text-base font-bold uppercase tracking-wider transition-colors hover:text-primary text-foreground py-4 px-2 rounded-lg active:bg-zinc-100 dark:active:bg-zinc-800">Features</a>
            <a href="/#pricing" onClick={e => handleSectionLink(e, "#pricing")} className="text-base font-bold uppercase tracking-wider transition-colors hover:text-primary text-foreground py-4 px-2 rounded-lg active:bg-zinc-100 dark:active:bg-zinc-800">Pricing</a>
            <a href="/#faq" onClick={e => handleSectionLink(e, "#faq")} className="text-base font-bold uppercase tracking-wider transition-colors hover:text-primary text-foreground py-4 px-2 rounded-lg active:bg-zinc-100 dark:active:bg-zinc-800">FAQ</a>
            <a href="/#process" onClick={e => handleSectionLink(e, "#process")} className="text-base font-bold uppercase tracking-wider transition-colors hover:text-primary text-foreground py-4 px-2 rounded-lg active:bg-zinc-100 dark:active:bg-zinc-800">Process</a>
            <a href="/#why" onClick={e => handleSectionLink(e, "#why")} className="text-base font-bold uppercase tracking-wider transition-colors hover:text-primary text-foreground py-4 px-2 rounded-lg active:bg-zinc-100 dark:active:bg-zinc-800">Why</a>
            <a href="/#about" onClick={e => handleSectionLink(e, "#about")} className="text-base font-bold uppercase tracking-wider transition-colors hover:text-primary text-foreground py-4 px-2 rounded-lg active:bg-zinc-100 dark:active:bg-zinc-800">About</a>
          </nav>
          <div className="mt-auto pt-8 flex flex-col gap-4">
            {isSignedIn ? (
              <Button className="rounded-full bg-gradient-to-r from-[#42275a] to-[#734b6d] text-white font-semibold px-6 py-2 shadow hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-offset-2" asChild>
                <Link href="/dashboard">My Bossy Inbox</Link>
              </Button>
            ) : (
              <Button className="rounded-full bg-black text-white px-8 py-2 font-semibold" asChild>
                <Link href="/sign-in">Let's Go</Link>
              </Button>
            )}
          </div>
        </div>
        {/* Clickable overlay to close */}
        <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
      </div>
    </header>
  )
} 