"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"
import { useUser, UserButton } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import DarkModeToggle from "@/components/DarkModeToggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { isSignedIn } = useUser()
  const pathname = usePathname()
  const router = useRouter()
  const isDashboard = pathname.startsWith("/dashboard")

  const navItems = [
    { label: "Features", hash: "#features" },
    { label: "Pricing", hash: "#pricing" },
    { label: "FAQ", hash: "#faq" },
    { label: "About", hash: "#about" },
    { label: "Contact", hash: "#contact" },
  ]

  // Track active section on scroll
  useEffect(() => {
    if (isDashboard) return

    const handleScroll = () => {
      const sections = navItems.map(item => item.hash.replace("#", ""))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check on mount

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDashboard])

  const handleSectionLink = (e: React.MouseEvent, hash: string) => {
    e.preventDefault()
    setActiveSection(hash.replace("#", ""))
    if (isDashboard) {
      router.push("/" + hash)
    } else {
      const el = document.getElementById(hash.replace("#", ""))
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <header className="w-full bg-white dark:bg-[#161616] border-b border-[#E3E3E3] dark:border-[#292929] sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center gap-2 z-20">
            <img src="/transparent 1.png" alt="BossyEmail" className="h-8 w-8 dark:brightness-0 dark:invert" />
            <span className="text-xl text-[#161616] dark:text-white" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, letterSpacing: '-0.02em' }}>BossyEmail</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => {
              const isActive = activeSection === item.hash.replace("#", "")
              return (
                <button
                  key={item.hash}
                  onClick={(e) => handleSectionLink(e, item.hash)}
                  className="relative text-[#161616] dark:text-white hover:text-[#505050] dark:hover:text-[#ABABAB] transition-colors text-sm font-medium uppercase tracking-normal py-2 px-1 group"
                  style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400 }}
                >
                  <motion.span 
                    className="relative z-10 inline-flex items-center gap-2"
                    animate={isActive ? { y: -2 } : { y: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {item.label}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, y: 4, rotate: -90 }}
                          animate={{ opacity: 1, y: 0, rotate: 0 }}
                          exit={{ opacity: 0, y: 4, rotate: -90 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <ArrowUp className="w-4 h-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.span>
                </button>
              )
            })}
          </nav>

          {/* Action Button - Right */}
          <div className="hidden lg:flex items-center space-x-3 z-20">
            <DarkModeToggle />
            {isSignedIn ? (
              <>
                <Link href="/dashboard">
                  <Button
                    className="bg-[#161616] hover:bg-[#292929] text-white text-sm font-medium px-8 py-4 rounded-none transition-all duration-200 uppercase tracking-wide inline-flex items-center gap-2 h-12 group dark:bg-white dark:text-[#161616] dark:hover:bg-[#FBFBFB]"
                    style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
                  >
                    DASHBOARD
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45" />
                  </Button>
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                />
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button
                    variant="outline"
                    className="border border-[#161616] text-[#161616] hover:bg-[#FBFBFB] hover:text-[#161616] focus:text-[#161616] active:text-[#161616] transition-all duration-200 text-sm font-medium px-8 py-4 rounded-none uppercase tracking-wide h-12 dark:border-white dark:text-white dark:hover:bg-[#292929] dark:hover:text-white"
                    style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
                  >
                    LOG IN
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    className="bg-[#161616] hover:bg-[#292929] text-white text-sm font-medium px-8 py-4 rounded-none transition-all duration-200 uppercase tracking-wide h-12 dark:bg-white dark:text-[#161616] dark:hover:bg-[#FBFBFB]"
                    style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
                  >
                    SIGN UP
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2 z-20">
            <DarkModeToggle />
            <button
              className="p-2 text-[#161616] dark:text-white hover:text-[#505050] dark:hover:text-[#ABABAB]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-[#E3E3E3] dark:border-[#292929] bg-white dark:bg-[#161616] overflow-hidden transition-colors"
            >
              <nav className="flex flex-col space-y-4 py-4">
                {navItems.map((item) => {
                  const isActive = activeSection === item.hash.replace("#", "")
                  return (
                    <button
                      key={item.hash}
                      onClick={(e) => {
                        handleSectionLink(e, item.hash)
                        setIsMenuOpen(false)
                      }}
                      className="relative text-[#161616] dark:text-white hover:text-[#505050] dark:hover:text-[#ABABAB] transition-colors text-sm font-medium text-left uppercase tracking-wide py-2 px-4 group"
                      style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400 }}
                    >
                      <motion.span 
                        className="relative z-10 inline-flex items-center gap-2"
                        animate={isActive ? { x: -4 } : { x: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        {item.label}
                        <AnimatePresence>
                          {isActive && (
                            <motion.span
                              initial={{ opacity: 0, y: 4, rotate: -90 }}
                              animate={{ opacity: 1, y: 0, rotate: 0 }}
                              exit={{ opacity: 0, y: 4, rotate: -90 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                              <ArrowUp className="w-4 h-4" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.span>
                      
                      {/* Slide animation indicator */}
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-[#161616] dark:bg-white"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    </button>
                  )
                })}
                <div className="flex flex-col space-y-2 pt-4 border-t border-[#E3E3E3] dark:border-[#292929]">
                  {isSignedIn ? (
                    <>
                      <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        <Button
                          className="bg-[#161616] dark:bg-white hover:bg-[#292929] dark:hover:bg-[#FBFBFB] text-white dark:text-[#161616] justify-start text-sm font-medium transition-all duration-200 rounded-none uppercase tracking-wide w-full inline-flex items-center gap-2 h-12 group"
                          style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
                        >
                          DASHBOARD
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45 ml-auto" />
                        </Button>
                      </Link>
                      <div className="flex justify-center">
                        <UserButton
                          appearance={{
                            elements: {
                              avatarBox: "w-8 h-8"
                            }
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                        <Button
                          variant="outline"
                          className="border border-[#161616] dark:border-white text-[#161616] dark:text-white hover:bg-[#FBFBFB] dark:hover:bg-[#292929] hover:text-[#161616] dark:hover:text-white focus:text-[#161616] dark:focus:text-white active:text-[#161616] dark:active:text-white transition-all duration-200 justify-start text-sm font-medium rounded-none uppercase tracking-wide w-full h-12"
                          style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
                        >
                          LOG IN
                        </Button>
                      </Link>
                      <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                        <Button
                          className="bg-[#161616] dark:bg-white hover:bg-[#292929] dark:hover:bg-[#FBFBFB] text-white dark:text-[#161616] justify-start text-sm font-medium transition-all duration-200 rounded-none uppercase tracking-wide w-full h-12"
                          style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
                        >
                          SIGN UP
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
