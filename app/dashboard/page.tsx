"use client"

import { useUser } from "@clerk/nextjs"
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
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useUser()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("generator")
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

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

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        mobileOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        onSectionChange={section => setActiveSection(section)}
        activeSection={activeSection}
        onCollapseChange={setSidebarCollapsed}
      />
      <main
        className={`flex-1 flex flex-col items-center pt-16 transition-all duration-200 px-2 sm:px-4 md:px-8 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-56'}`}
      >
        <div className="w-full max-w-2xl">
          {activeSection === "generator" && (
            <>
              <h2 className="text-2xl font-bold text-sidebar-foreground mb-6">Smart Email Generator</h2>
              <SubscriptionCheck>
                <EmailGenerator />
              </SubscriptionCheck>
            </>
          )}
          {activeSection === "favorites" && <Favorites />}
          {activeSection === "templates" && <Templates />}
          {activeSection === "history" && <History />}
          {activeSection === "account" && <Account />}
          {activeSection === "subscription" && <Subscription />}
          {activeSection === "support" && <Support />}
        </div>
      </main>
    </div>
  )
} 