"use client"

import { useUser, UserButton } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { EmailGenerator } from "@/components/EmailGenerator"
import { Favorites } from "@/components/Favorites"
import { Sidebar } from "@/components/Sidebar"
import { History } from "@/components/History"
import { Templates } from "@/components/Templates"
import { Account } from "@/components/Account"
import { Subscription } from "@/components/Subscription"
import { Support } from "@/components/Support"
import { SubscriptionButton } from "@/components/subscription-button"
import { SubscriptionCheck } from "@/components/subscription-check"
import { Header } from "@/components/header"
import { useState, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu, CheckCircle2, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useUser()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("generator")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // Check for checkout success or cancel
  useEffect(() => {
    const checkout = searchParams.get('checkout')
    if (checkout === 'success') {
      setShowSuccessMessage(true)
      // Remove query param from URL
      router.replace('/dashboard', { scroll: false })
      // Auto-hide after 8 seconds (give users time to read)
      setTimeout(() => setShowSuccessMessage(false), 8000)
    } else if (checkout === 'cancel') {
      // Track checkout canceled
      if (typeof window !== 'undefined') {
        import('@/lib/analytics').then(({ analytics }) => {
          analytics.checkoutCanceled('unknown')
        })
      }
      // Silently remove cancel param - don't show error, just let them try again
      router.replace('/dashboard', { scroll: false })
    }
  }, [searchParams, router])

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!isSignedIn) {
    redirect("/sign-in")
  }

  const handleSectionLink = (e: React.MouseEvent, hash: string) => {
    e.preventDefault()
    if (pathname === "/") {
      const el = document.getElementById(hash.replace("#", ""))
      if (el) el.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push("/" + hash)
    }
  }

  const handleSubscribe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: 'YOUR_PRICE_ID' }),
      });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#161616] transition-colors">
      {/* Header for desktop */}
      <div className="hidden md:block">
        <Header />
      </div>
      
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 z-40 bg-white dark:bg-[#161616] border-b border-[#E3E3E3] dark:border-[#292929] flex items-center justify-between px-4 text-black dark:text-white transition-colors">
        <button
          className="p-2 rounded-none hover:bg-[#FBFBFB] focus:outline-none focus:ring-2 transition-colors border border-[#E3E3E3]"
          style={{ '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties}
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar menu"
        >
          <Menu className="w-6 h-6 text-[#161616] dark:text-white" />
        </button>
        
        {/* Mobile navigation menu */}
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost"
            size="sm"
            className="text-[#505050] dark:text-[#ABABAB] hover:text-[#161616] dark:hover:text-white hover:bg-[#FBFBFB] dark:hover:bg-[#292929] text-xs font-medium px-2 py-1 rounded-none"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
            onClick={(e) => handleSectionLink(e, "#features")}
          >
            Features
          </Button>
          <Button 
            variant="ghost"
            size="sm"
            className="text-[#505050] dark:text-[#ABABAB] hover:text-[#161616] dark:hover:text-white hover:bg-[#FBFBFB] dark:hover:bg-[#292929] text-xs font-medium px-2 py-1 rounded-none"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
            onClick={(e) => handleSectionLink(e, "#pricing")}
          >
            Pricing
          </Button>
          <Button 
            variant="ghost"
            size="sm"
            className="text-[#505050] dark:text-[#ABABAB] hover:text-[#161616] dark:hover:text-white hover:bg-[#FBFBFB] dark:hover:bg-[#292929] text-xs font-medium px-2 py-1 rounded-none"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
            onClick={(e) => handleSectionLink(e, "#faq")}
          >
            FAQ
          </Button>
          <Button 
            variant="ghost"
            size="sm"
            className="text-[#505050] dark:text-[#ABABAB] hover:text-[#161616] dark:hover:text-white hover:bg-[#FBFBFB] dark:hover:bg-[#292929] text-xs font-medium px-2 py-1 rounded-none"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
            onClick={(e) => handleSectionLink(e, "#about")}
          >
            About
          </Button>
          <Button 
            variant="ghost"
            size="sm"
            className="text-[#505050] dark:text-[#ABABAB] hover:text-[#161616] dark:hover:text-white hover:bg-[#FBFBFB] dark:hover:bg-[#292929] text-xs font-medium px-2 py-1 rounded-none"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
            onClick={(e) => handleSectionLink(e, "#contact")}
          >
            Contact
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      
      <div className="flex flex-1">
      <Sidebar 
        mobileOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        onSectionChange={section => setActiveSection(section)}
        activeSection={activeSection}
        onCollapseChange={setSidebarCollapsed}
      />
      <main
        className="flex-1 flex flex-col transition-all duration-300 w-full md:ml-16 ml-0 pt-4 bg-white dark:bg-[#161616] transition-colors"
        role="main"
        aria-live="polite"
      >
        {/* Success Message */}
        <AnimatePresence>
          {showSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mx-4 mb-4 md:mx-8"
            >
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-medium text-green-900 dark:text-green-100" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
                      Welcome! Your 14-day free trial has started
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
                      You now have unlimited access. Start generating your first email below.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSuccessMessage(false)}
                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-full">
          {activeSection === "generator" && (
            <div role="region" aria-label="Email Generator Section">
              <SubscriptionCheck>
                <EmailGenerator />
              </SubscriptionCheck>
            </div>
          )}
          {activeSection === "favorites" && (
            <div role="region" aria-label="Favorites Section">
              <Favorites />
            </div>
          )}
          {activeSection === "templates" && (
            <div role="region" aria-label="Templates Section">
              <Templates />
            </div>
          )}
          {activeSection === "history" && (
            <div role="region" aria-label="History Section">
              <History />
            </div>
          )}
          {activeSection === "account" && (
            <div role="region" aria-label="Account Section">
              <Account />
            </div>
          )}
          {activeSection === "subscription" && (
            <div role="region" aria-label="Subscription Section">
              <Subscription />
            </div>
          )}
          {activeSection === "support" && (
            <div role="region" aria-label="Support Section">
              <Support />
            </div>
          )}
        </div>
      </main>
      </div>
    </div>
  )
} 