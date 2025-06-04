"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Star, FileText, History, LifeBuoy, User, CreditCard, ChevronRight, ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import React from "react"
import { motion } from "framer-motion"

export function Sidebar({ mobileOpen = false, onClose, onSectionChange, activeSection, onCollapseChange }: { mobileOpen?: boolean, onClose?: () => void, onSectionChange?: (section: string) => void, activeSection?: string, onCollapseChange?: (collapsed: boolean) => void }) {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  // Close on ESC for accessibility
  useEffect(() => {
    if (!mobileOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mobileOpen, onClose]);

  // Overlay for mobile drawer
  if (mobileOpen) {
    return (
      <div 
        className="fixed inset-0 z-40" 
        aria-label="Sidebar Drawer" 
        role="dialog"
        aria-modal="true"
      >
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/40 z-40" 
          onClick={onClose} 
          aria-label="Close sidebar overlay" 
          tabIndex={0}
        />
        {/* Sidebar Drawer */}
        <aside
          className="fixed left-0 top-0 h-full w-64 shadow-lg flex flex-col justify-between z-50 transition-all p-0 bg-[#383838] text-[#bdbdbd] backdrop-blur-sm"
          tabIndex={-1}
        >
          <nav className="flex-1 py-0.5 px-1">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center px-2 py-0.5 rounded-lg text-[#bdbdbd] hover:bg-[#616161] transition-colors group" 
                  aria-label="Email Generator"
                  aria-current={activeSection === 'generator' ? 'page' : undefined}
                  >
                  <LayoutDashboard className="w-5 h-5 text-black dark:text-[#e0e0e0] mr-3" aria-hidden="true" strokeWidth={2} />
                  <span className="text-sm font-medium">Email Generator</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#templates" 
                  className="flex items-center px-2 py-0.5 rounded-lg text-[#bdbdbd] hover:bg-[#616161] transition-colors group" 
                  aria-label="Templates"
                  aria-current={activeSection === 'templates' ? 'page' : undefined}
                >
                  <FileText className="w-5 h-5 text-black dark:text-[#e0e0e0] mr-3" aria-hidden="true" strokeWidth={2} />
                  <span className="text-sm font-medium">Templates</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#favorites" 
                  className="flex items-center px-2 py-0.5 rounded-lg text-[#bdbdbd] hover:bg-[#616161] transition-colors group" 
                  aria-label="Favorites"
                  aria-current={activeSection === 'favorites' ? 'page' : undefined}
                >
                  <Star className="w-5 h-5 text-black dark:text-[#e0e0e0] mr-3" aria-hidden="true" strokeWidth={2} />
                  <span className="text-sm font-medium">Favorites</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#history"
                  className="flex items-center px-2 py-0.5 rounded-lg text-[#bdbdbd] hover:bg-[#616161] transition-colors group" 
                  aria-label="History"
                  aria-current={activeSection === 'history' ? 'page' : undefined}
                >
                  <History className="w-5 h-5 text-black dark:text-[#e0e0e0] mr-3" aria-hidden="true" strokeWidth={2} />
                  <span className="text-sm font-medium">History</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex flex-col gap-2 py-4 px-2 border-t border-zinc-200">
            <SidebarIcon icon={LifeBuoy} label="Support" iconClass="text-black dark:text-[#e0e0e0]" strokeWidth={2} />
            <SidebarIcon icon={CreditCard} label="Subscription" iconClass="text-black dark:text-[#e0e0e0]" strokeWidth={2} />
            <SidebarIcon icon={User} label="Account" iconClass="text-black dark:text-[#e0e0e0]" strokeWidth={2} />
          </div>
        </aside>
      </div>
    );
  }

  return (
    <>
      {/* Mobile hamburger toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-[#424242] text-zinc-700 dark:text-[#e0e0e0] p-2 rounded-full shadow-lg"
        onClick={() => onClose && onClose()}
        aria-label="Toggle Sidebar"
        tabIndex={0}
      >
        <LayoutDashboard className="w-5 h-5 text-black dark:text-[#e0e0e0]" aria-hidden="true" strokeWidth={2} />
      </button>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex fixed top-16 left-0 h-[calc(100vh-4rem)] w-16 shadow-none flex-col justify-start z-20 transition-all duration-200 p-0 bg-[#e0e0e0] dark:bg-[#757575] text-zinc-700 dark:text-[#e0e0e0]"
        aria-label="Sidebar"
        role="navigation"
      >
        {/* Logo at the top */}
        <div className="flex items-center justify-center w-full pt-2 pb-0.5">
          <img src="/transparent 1.png" alt="Logo" className="h-8 w-auto" />
        </div>
        {activeSection && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-black dark:bg-[#757575] z-10" />}
        <div className="flex flex-col h-full w-full">
          <nav className="w-full mt-10" role="navigation" aria-label="Main navigation">
            <ul className="flex flex-col items-center gap-4 w-full">
              <li className="w-full">
                <button
                  type="button"
                  onClick={() => onSectionChange && onSectionChange('generator')}
                  className={`flex items-center justify-center w-full px-0 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${activeSection === 'generator' ? 'bg-zinc-100 dark:bg-[#616161]' : 'hover:bg-zinc-100 dark:hover:bg-[#616161]'}`}
                  aria-label="Email Generator"
                  aria-current={activeSection === 'generator' ? 'page' : undefined}
                  tabIndex={0}
                >
                  <LayoutDashboard className="w-5 h-5 text-black dark:text-[#e0e0e0]" aria-hidden="true" strokeWidth={2} />
                </button>
              </li>
              <li className="w-full">
                <button
                  type="button"
                  onClick={() => onSectionChange && onSectionChange('templates')}
                  className={`flex items-center justify-center w-full px-0 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${activeSection === 'templates' ? 'bg-zinc-100 dark:bg-[#616161]' : 'hover:bg-zinc-100 dark:hover:bg-[#616161]'}`}
                  aria-label="Templates"
                  aria-current={activeSection === 'templates' ? 'page' : undefined}
                  tabIndex={0}
                >
                  <FileText className="w-5 h-5 text-black dark:text-[#e0e0e0]" aria-hidden="true" strokeWidth={2} />
                </button>
              </li>
              <li className="w-full">
                <button
                  type="button"
                  onClick={() => onSectionChange && onSectionChange('favorites')}
                  className={`flex items-center justify-center w-full px-0 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${activeSection === 'favorites' ? 'bg-zinc-100 dark:bg-[#616161]' : 'hover:bg-zinc-100 dark:hover:bg-[#616161]'}`}
                  aria-label="Favorites"
                  aria-current={activeSection === 'favorites' ? 'page' : undefined}
                  tabIndex={0}
                >
                  <Star className="w-5 h-5 text-black dark:text-[#e0e0e0]" aria-hidden="true" strokeWidth={2} />
                </button>
              </li>
              <li className="w-full">
                <button
                  type="button"
                  onClick={() => onSectionChange && onSectionChange('history')}
                  className={`flex items-center justify-center w-full px-0 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${activeSection === 'history' ? 'bg-zinc-100 dark:bg-[#616161]' : 'hover:bg-zinc-100 dark:hover:bg-[#616161]'}`}
                  aria-label="History"
                  aria-current={activeSection === 'history' ? 'page' : undefined}
                  tabIndex={0}
                >
                  <History className="w-5 h-5 text-black dark:text-[#e0e0e0]" aria-hidden="true" strokeWidth={2} />
                </button>
              </li>
            </ul>
          </nav>
          {/* Bottom icons */}
          <div className="flex flex-col gap-2 py-4 w-full items-center px-0 mt-auto border-t border-zinc-200 dark:border-[#616161]" role="navigation" aria-label="Secondary navigation">
            <button
              type="button"
              onClick={() => onSectionChange && onSectionChange("support")}
              className={`flex items-center justify-center rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${activeSection === "support" ? "bg-zinc-100 dark:bg-[#616161]" : "hover:bg-zinc-100 dark:hover:bg-[#616161]"}`}
              aria-label="Support"
              tabIndex={0}
              title="Support"
            >
              <LifeBuoy className="w-5 h-5 text-black dark:text-[#e0e0e0]" aria-hidden="true" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => onSectionChange && onSectionChange("subscription")}
              className={`flex items-center justify-center rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${activeSection === "subscription" ? "bg-zinc-100 dark:bg-[#616161]" : "hover:bg-zinc-100 dark:hover:bg-[#616161]"}`}
              aria-label="Subscription"
              tabIndex={0}
              title="Subscription"
            >
              <CreditCard className="w-5 h-5 text-black dark:text-[#e0e0e0]" aria-hidden="true" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => onSectionChange && onSectionChange("account")}
              className={`flex items-center justify-center rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${activeSection === "account" ? "bg-zinc-100 dark:bg-[#616161]" : "hover:bg-zinc-100 dark:hover:bg-[#616161]"}`}
              aria-label="Account"
              tabIndex={0}
              title="Account"
            >
              <User className="w-5 h-5 text-black dark:text-[#e0e0e0]" aria-hidden="true" strokeWidth={2} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function SidebarIcon({ icon: Icon, label, iconClass, strokeWidth = 1.5 }: { icon: React.ElementType, label: string, iconClass: string, strokeWidth?: number }) {
  return (
    <button
      className="flex items-center px-3 py-2 w-full rounded-lg hover:bg-zinc-100 transition-colors group focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label={label}
      tabIndex={0}
    >
      <Icon className={`w-5 h-5 ${iconClass} mr-3`} aria-hidden="true" strokeWidth={strokeWidth} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}