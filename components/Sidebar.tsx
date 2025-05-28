"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Star, FileText, History, LifeBuoy, User, CreditCard, ChevronRight, ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import React from "react"
import { motion } from "framer-motion"

export function Sidebar({ mobileOpen = false, onClose, onSectionChange, activeSection, onCollapseChange }: { mobileOpen?: boolean, onClose?: () => void, onSectionChange?: (section: string) => void, activeSection?: string, onCollapseChange?: (collapsed: boolean) => void }) {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const [collapsed, setCollapsed] = useState(false);

  // Close on ESC for accessibility
  useEffect(() => {
    if (!mobileOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mobileOpen, onClose]);

  // Persist sidebar state
  useEffect(() => {
    const stored = localStorage.getItem("bossyemail_sidebar_collapsed");
    if (stored) setCollapsed(stored === "true");
  }, []);
  useEffect(() => {
    localStorage.setItem("bossyemail_sidebar_collapsed", String(collapsed));
    if (onCollapseChange) onCollapseChange(collapsed);
  }, [collapsed, onCollapseChange]);

  // Overlay for mobile drawer
  if (mobileOpen) {
    return (
      <div className="fixed inset-0 z-40 flex" aria-label="Sidebar Drawer" role="dialog">
        <div className="fixed inset-0 bg-black/40" onClick={onClose} aria-label="Close sidebar overlay" tabIndex={0} />
        <aside className="relative w-56 h-full bg-sidebar border-r border-border shadow-lg flex flex-col justify-between z-50 transition-all" tabIndex={-1}>
          <nav className="flex-1 py-8 px-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors group ${
                    pathname === "/dashboard" 
                      ? "bg-sidebar-primary/10 text-sidebar-primary font-semibold" 
                      : "text-sidebar-foreground"
                  }`}
                  aria-current={pathname === "/dashboard" ? "page" : undefined}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LayoutDashboard className="w-5 h-5" aria-hidden="true" />
                  </motion.div>
                  <span className="text-sm font-medium">Email Generator</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#favorites"
                  className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors group text-sidebar-foreground"
                  aria-label="Favorites"
                >
                  <Star className="w-5 h-5" aria-hidden="true" />
                  <span className="text-sm font-medium">Favorites</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#templates"
                  className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors group text-sidebar-foreground"
                  aria-label="Templates"
                >
                  <FileText className="w-5 h-5" aria-hidden="true" />
                  <span className="text-sm font-medium">Templates</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#history"
                  className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors group text-sidebar-foreground"
                  aria-label="History"
                >
                  <History className="w-5 h-5" aria-hidden="true" />
                  <span className="text-sm font-medium">History</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex flex-col gap-4 border-t border-border py-4 px-4">
            <div className="flex items-center justify-between">
              <SidebarIcon icon={LifeBuoy} label="Support" />
              <SidebarIcon icon={CreditCard} label="Subscription" />
              <SidebarIcon icon={User} label="Account" />
            </div>
          </div>
        </aside>
      </div>
    );
  }

  return (
    <>
      {/* Mobile hamburger toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-sidebar text-sidebar-foreground p-2 rounded-full shadow-lg"
        onClick={() => onClose && onClose()}
        aria-label="Toggle Sidebar"
        tabIndex={0}
      >
        <LayoutDashboard className="w-6 h-6" />
      </button>
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex fixed top-16 left-0 h-[calc(100vh-4rem)] ${collapsed ? 'w-16' : 'w-56'} bg-sidebar border-r border-border shadow-none flex-col justify-between z-20 transition-all duration-200`}
        aria-label="Sidebar"
        role="navigation"
      >
        <div className="flex flex-col h-full w-full py-4">
          {/* Collapse/Expand toggle and nav icons grouped at the top */}
          <div className={`flex flex-col items-start ${collapsed ? 'gap-y-4 px-2' : 'gap-y-4 w-full px-2'}`}>
            <button
              className="w-9 h-9 bg-sidebar border border-border rounded-full shadow flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              onClick={() => setCollapsed(c => !c)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              tabIndex={0}
            >
              {collapsed ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
            </button>
            <nav className="w-full">
              <ul className={`flex flex-col items-start ${collapsed ? 'gap-y-4' : 'gap-y-4 w-full'}`}>
                <li>
                  <button
                    type="button"
                    onClick={() => onSectionChange && onSectionChange("generator")}
                    className={`flex w-full items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors group ${
                      activeSection === "generator"
                        ? "bg-sidebar-primary/10 text-sidebar-primary font-semibold"
                        : "text-sidebar-foreground"
                    }`}
                    aria-current={activeSection === "generator" ? "page" : undefined}
                    tabIndex={0}
                    title={collapsed ? "Email Generator" : undefined}
                  >
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <LayoutDashboard className="w-5 h-5" aria-hidden="true" />
                    </motion.div>
                    {!collapsed && <span className="text-sm font-medium">Email Generator</span>}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSectionChange && onSectionChange("favorites")}
                    className={`flex w-full items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors group ${
                      activeSection === "favorites"
                        ? "bg-sidebar-primary/10 text-sidebar-primary font-semibold"
                        : "text-sidebar-foreground"
                    }`}
                    aria-label="Favorites"
                    aria-current={activeSection === "favorites" ? "page" : undefined}
                    tabIndex={0}
                    title={collapsed ? "Favorites" : undefined}
                  >
                    <Star className="w-5 h-5" aria-hidden="true" />
                    {!collapsed && <span className="text-sm font-medium">Favorites</span>}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSectionChange && onSectionChange("templates")}
                    className={`flex w-full items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors group ${
                      activeSection === "templates"
                        ? "bg-sidebar-primary/10 text-sidebar-primary font-semibold"
                        : "text-sidebar-foreground"
                    }`}
                    aria-label="Templates"
                    aria-current={activeSection === "templates" ? "page" : undefined}
                    tabIndex={0}
                    title={collapsed ? "Templates" : undefined}
                  >
                    <FileText className="w-5 h-5" aria-hidden="true" />
                    {!collapsed && <span className="text-sm font-medium">Templates</span>}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onSectionChange && onSectionChange("history")}
                    className={`flex w-full items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors group ${
                      activeSection === "history"
                        ? "bg-sidebar-primary/10 text-sidebar-primary font-semibold"
                        : "text-sidebar-foreground"
                    }`}
                    aria-label="History"
                    aria-current={activeSection === "history" ? "page" : undefined}
                    tabIndex={0}
                    title={collapsed ? "History" : undefined}
                  >
                    <History className="w-5 h-5" aria-hidden="true" />
                    {!collapsed && <span className="text-sm font-medium">History</span>}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          {/* Bottom icons at the bottom */}
          <div className={`flex flex-col gap-6 border-t border-border py-4 w-full items-center ${collapsed ? 'px-0' : 'px-4'} mt-auto`}>
            <div className={`flex ${collapsed ? 'flex-col items-center gap-6' : 'items-center justify-between'}`}>
              <button
                type="button"
                onClick={() => onSectionChange && onSectionChange("support")}
                className={`flex items-center justify-center rounded-full p-2 ${activeSection === "support" ? "bg-sidebar-primary/10 text-sidebar-primary" : "text-sidebar-foreground/60 hover:text-sidebar-primary"}`}
                aria-label="Support"
                tabIndex={0}
                title={collapsed ? "Support" : undefined}
              >
                <LifeBuoy className="w-6 h-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onSectionChange && onSectionChange("subscription")}
                className={`flex items-center justify-center rounded-full p-2 ${activeSection === "subscription" ? "bg-sidebar-primary/10 text-sidebar-primary" : "text-sidebar-foreground/60 hover:text-sidebar-primary"}`}
                aria-label="Subscription"
                tabIndex={0}
                title={collapsed ? "Subscription" : undefined}
              >
                <CreditCard className="w-6 h-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onSectionChange && onSectionChange("account")}
                className={`flex items-center justify-center rounded-full p-2 ${activeSection === "account" ? "bg-sidebar-primary/10 text-sidebar-primary" : "text-sidebar-foreground/60 hover:text-sidebar-primary"}`}
                aria-label="Account"
                tabIndex={0}
                title={collapsed ? "Account" : undefined}
              >
                <User className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

function SidebarIcon({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex items-center justify-center cursor-pointer"
      tabIndex={0}
      aria-label={label}
      role="button"
    >
      <Icon className="w-6 h-6 text-sidebar-foreground/60 group-hover:text-sidebar-primary transition-colors duration-200" aria-hidden="true" />
      <motion.span
        initial={{ opacity: 0, y: 5 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute left-1/2 -translate-x-1/2 top-10 z-30 whitespace-nowrap rounded bg-sidebar-foreground px-2 py-1 text-xs text-sidebar pointer-events-none"
      >
        {label}
      </motion.span>
    </motion.div>
  )
} 