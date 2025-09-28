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
          className="fixed left-0 top-16 h-full w-16 shadow-lg flex flex-col justify-between z-50 transition-all p-0 bg-zinc-900 border-r border-zinc-800 backdrop-blur-sm"
          tabIndex={-1}
        >
          <nav className="flex-1 py-2 px-1">
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => onSectionChange && onSectionChange('generator')}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D1B4C6] transition-all duration-200 ${activeSection === 'generator' ? 'bg-[#D1B4C6] text-black' : 'hover:bg-zinc-800 text-zinc-300 hover:text-white'}`}
                  aria-label="Email Generator"
                  aria-current={activeSection === 'generator' ? 'page' : undefined}
                  tabIndex={0}
                  >
                  <LayoutDashboard className="w-6 h-6 text-white" aria-hidden="true" strokeWidth={2} />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSectionChange && onSectionChange('templates')}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D1B4C6] transition-all duration-200 ${activeSection === 'templates' ? 'bg-[#D1B4C6] text-black' : 'hover:bg-zinc-800 text-zinc-300 hover:text-white'}`}
                  aria-label="Templates"
                  aria-current={activeSection === 'templates' ? 'page' : undefined}
                  tabIndex={0}
                >
                  <FileText className="w-6 h-6 text-white" aria-hidden="true" strokeWidth={2} />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSectionChange && onSectionChange('favorites')}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D1B4C6] transition-all duration-200 ${activeSection === 'favorites' ? 'bg-[#D1B4C6] text-black' : 'hover:bg-zinc-800 text-zinc-300 hover:text-white'}`}
                  aria-label="Favorites"
                  aria-current={activeSection === 'favorites' ? 'page' : undefined}
                  tabIndex={0}
                >
                  <Star className="w-6 h-6 text-white" aria-hidden="true" strokeWidth={2} />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSectionChange && onSectionChange('history')}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D1B4C6] transition-all duration-200 ${activeSection === 'history' ? 'bg-[#D1B4C6] text-black' : 'hover:bg-zinc-800 text-zinc-300 hover:text-white'}`}
                  aria-label="History"
                  aria-current={activeSection === 'history' ? 'page' : undefined}
                  tabIndex={0}
                >
                  <History className="w-6 h-6 text-white" aria-hidden="true" strokeWidth={2} />
                </button>
              </li>
            </ul>
          </nav>
          <div className="flex flex-col gap-2 py-4 px-2 border-t border-zinc-200">
            <SidebarIcon icon={LifeBuoy} label="Support" iconClass="text-white" strokeWidth={2} />
            <SidebarIcon icon={CreditCard} label="Subscription" iconClass="text-white" strokeWidth={2} />
            <SidebarIcon icon={User} label="Account" iconClass="text-white" strokeWidth={2} />
          </div>
        </aside>
      </div>
    );
  }

  return (
    <>
      {/* Mobile hamburger toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-zinc-900 text-white p-2 rounded-lg shadow-lg hover:bg-zinc-800 transition-colors"
        onClick={() => onClose && onClose()}
        aria-label="Toggle Sidebar"
        tabIndex={0}
      >
        <LayoutDashboard className="w-5 h-5" aria-hidden="true" strokeWidth={2} />
      </button>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex fixed top-16 left-0 h-full w-16 shadow-lg flex-col justify-start z-20 transition-all duration-300 p-0 bg-zinc-900 border-r border-zinc-800 text-zinc-300"
        aria-label="Sidebar"
        role="navigation"
      >
        {/* Logo at the top */}
        <div className="flex items-center justify-center w-full pt-4 pb-2">
          <img src="/transparent 2.png" alt="BossyEmail" className="h-8 w-8" />
        </div>
        <div className="flex flex-col h-full w-full">
          <nav className="w-full mt-4" role="navigation" aria-label="Main navigation">
            <ul className="flex flex-col items-center gap-2 w-full px-2">
              <li className="w-full">
                  <button
                    type="button"
                  onClick={() => onSectionChange && onSectionChange('generator')}
                  className={`flex items-center justify-center w-10 h-10 mx-auto rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D1B4C6] transition-all duration-200 ${activeSection === 'generator' ? 'bg-[#D1B4C6] text-black' : 'hover:bg-zinc-800 text-zinc-300 hover:text-white'}`}
                  aria-label="Email Generator"
                  aria-current={activeSection === 'generator' ? 'page' : undefined}
                    tabIndex={0}
                  >
                  <LayoutDashboard className="w-6 h-6 text-white" aria-hidden="true" strokeWidth={2} />
                  </button>
                </li>
              <li className="w-full">
                  <button
                    type="button"
                  onClick={() => onSectionChange && onSectionChange('templates')}
                  className={`flex items-center justify-center w-10 h-10 mx-auto rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D1B4C6] transition-all duration-200 ${activeSection === 'templates' ? 'bg-[#D1B4C6] text-black' : 'hover:bg-zinc-800 text-zinc-300 hover:text-white'}`}
                  aria-label="Templates"
                  aria-current={activeSection === 'templates' ? 'page' : undefined}
                    tabIndex={0}
                  >
                  <FileText className="w-6 h-6 text-white" aria-hidden="true" strokeWidth={2} />
                  </button>
                </li>
              <li className="w-full">
                  <button
                    type="button"
                  onClick={() => onSectionChange && onSectionChange('favorites')}
                  className={`flex items-center justify-center w-10 h-10 mx-auto rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D1B4C6] transition-all duration-200 ${activeSection === 'favorites' ? 'bg-[#D1B4C6] text-black' : 'hover:bg-zinc-800 text-zinc-300 hover:text-white'}`}
                  aria-label="Favorites"
                  aria-current={activeSection === 'favorites' ? 'page' : undefined}
                    tabIndex={0}
                  >
                  <Star className="w-6 h-6 text-white" aria-hidden="true" strokeWidth={2} />
                  </button>
                </li>
              <li className="w-full">
                  <button
                    type="button"
                  onClick={() => onSectionChange && onSectionChange('history')}
                  className={`flex items-center justify-center w-10 h-10 mx-auto rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D1B4C6] transition-all duration-200 ${activeSection === 'history' ? 'bg-[#D1B4C6] text-black' : 'hover:bg-zinc-800 text-zinc-300 hover:text-white'}`}
                    aria-label="History"
                  aria-current={activeSection === 'history' ? 'page' : undefined}
                    tabIndex={0}
                  >
                  <History className="w-6 h-6 text-white" aria-hidden="true" strokeWidth={2} />
                  </button>
                </li>
              </ul>
            </nav>
          {/* Bottom icons */}
          <div className="flex flex-col gap-2 py-4 w-full items-center px-2 mt-auto border-t border-zinc-800" role="navigation" aria-label="Secondary navigation">
              <button
                type="button"
                onClick={() => onSectionChange && onSectionChange("support")}
              className={`flex items-center justify-center w-10 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D1B4C6] transition-all duration-200 ${activeSection === "support" ? "bg-[#D1B4C6] text-black" : "hover:bg-zinc-800 text-zinc-300 hover:text-white"}`}
                aria-label="Support"
                tabIndex={0}
              title="Support"
              >
              <LifeBuoy className="w-6 h-6 text-white" aria-hidden="true" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => onSectionChange && onSectionChange("subscription")}
              className={`flex items-center justify-center w-10 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D1B4C6] transition-all duration-200 ${activeSection === "subscription" ? "bg-[#D1B4C6] text-black" : "hover:bg-zinc-800 text-zinc-300 hover:text-white"}`}
                aria-label="Subscription"
                tabIndex={0}
              title="Subscription"
              >
              <CreditCard className="w-6 h-6 text-white" aria-hidden="true" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => onSectionChange && onSectionChange("account")}
              className={`flex items-center justify-center w-10 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D1B4C6] transition-all duration-200 ${activeSection === "account" ? "bg-[#D1B4C6] text-black" : "hover:bg-zinc-800 text-zinc-300 hover:text-white"}`}
                aria-label="Account"
                tabIndex={0}
              title="Account"
              >
              <User className="w-6 h-6 text-white" aria-hidden="true" strokeWidth={2} />
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
      className="flex items-center px-3 py-2 w-full rounded-full hover:bg-zinc-100 transition-colors group focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label={label}
      tabIndex={0}
    >
      <Icon className={`w-5 h-5 ${iconClass} mr-3`} aria-hidden="true" strokeWidth={strokeWidth} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
} 