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
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu } from "lucide-react"

export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useUser()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("generator")
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
    <div className="min-h-screen flex flex-col">
      {/* Header for desktop */}
      <div className="hidden md:block">
        <Header />
      </div>
      
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 z-40 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 text-white">
        <button
          className="p-2 rounded-full hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#D1B4C6] transition-colors"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <Button 
            className="rounded-lg bg-[#D1B4C6] hover:bg-[#C4A7B9] text-black font-medium px-4 py-2 shadow hover:shadow-[0_0_15px_rgba(209,180,198,0.4)] transition-all duration-300"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            asChild
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
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
        className="flex-1 flex flex-col transition-all duration-300 w-full md:ml-16 ml-0"
        role="main"
        aria-live="polite"
      >
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