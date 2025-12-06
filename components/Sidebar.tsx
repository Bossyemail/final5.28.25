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
          className="fixed left-0 top-16 h-full w-16 shadow-lg flex flex-col justify-between z-50 transition-all p-0 bg-white border-r border-[#E3E3E3] backdrop-blur-sm"
          tabIndex={-1}
        >
          <nav className="flex-1 py-2 px-1">
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => onSectionChange && onSectionChange('generator')}
                  className={`flex items-center justify-center w-10 h-10 rounded-none border border-[#E3E3E3] focus:outline-none focus:ring-2 transition-all duration-200 ${activeSection === 'generator' ? 'bg-[#161616] border-[#161616]' : 'hover:bg-[#FBFBFB] text-[#505050] hover:text-[#161616] hover:border-[#ABABAB]'}`}
                  style={{ '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties}
                  aria-label="Email Generator"
                  aria-current={activeSection === 'generator' ? 'page' : undefined}
                  tabIndex={0}
                  >
                  <LayoutDashboard 
                    className="w-6 h-6" 
                    style={{ color: activeSection === 'generator' ? '#FFFFFF' : '#505050', stroke: activeSection === 'generator' ? '#FFFFFF' : '#505050' }}
                    aria-hidden="true" 
                    strokeWidth={activeSection === 'generator' ? 2 : 1.5} 
                  />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSectionChange && onSectionChange('templates')}
                  className={`flex items-center justify-center w-10 h-10 rounded-none border border-[#E3E3E3] focus:outline-none focus:ring-2 transition-all duration-200 ${activeSection === 'templates' ? 'bg-[#161616] border-[#161616]' : 'hover:bg-[#FBFBFB] text-[#505050] hover:text-[#161616] hover:border-[#ABABAB]'}`}
                  style={{ '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties}
                  aria-label="Templates"
                  aria-current={activeSection === 'templates' ? 'page' : undefined}
                  tabIndex={0}
                >
                  <FileText 
                    className="w-6 h-6" 
                    style={{ color: activeSection === 'templates' ? '#FFFFFF' : '#505050', stroke: activeSection === 'templates' ? '#FFFFFF' : '#505050' }}
                    aria-hidden="true" 
                    strokeWidth={activeSection === 'templates' ? 2 : 1.5} 
                  />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSectionChange && onSectionChange('favorites')}
                  className={`flex items-center justify-center w-10 h-10 rounded-none border border-[#E3E3E3] focus:outline-none focus:ring-2 transition-all duration-200 ${activeSection === 'favorites' ? 'bg-[#161616] border-[#161616]' : 'hover:bg-[#FBFBFB] text-[#505050] hover:text-[#161616] hover:border-[#ABABAB]'}`}
                  style={{ '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties}
                  aria-label="Favorites"
                  aria-current={activeSection === 'favorites' ? 'page' : undefined}
                  tabIndex={0}
                >
                  <Star 
                    className="w-6 h-6" 
                    style={{ color: activeSection === 'favorites' ? '#FFFFFF' : '#505050', stroke: activeSection === 'favorites' ? '#FFFFFF' : '#505050' }}
                    aria-hidden="true" 
                    strokeWidth={activeSection === 'favorites' ? 2 : 1.5} 
                  />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSectionChange && onSectionChange('history')}
                  className={`flex items-center justify-center w-10 h-10 rounded-none border border-[#E3E3E3] focus:outline-none focus:ring-2 transition-all duration-200 ${activeSection === 'history' ? 'bg-[#161616] border-[#161616]' : 'hover:bg-[#FBFBFB] text-[#505050] hover:text-[#161616] hover:border-[#ABABAB]'}`}
                  style={{ '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties}
                    aria-label="History"
                  aria-current={activeSection === 'history' ? 'page' : undefined}
                    tabIndex={0}
                  >
                  <History 
                    className="w-6 h-6" 
                    style={{ color: activeSection === 'history' ? '#FFFFFF' : '#505050', stroke: activeSection === 'history' ? '#FFFFFF' : '#505050' }}
                    aria-hidden="true" 
                    strokeWidth={activeSection === 'history' ? 2 : 1.5} 
                  />
                </button>
              </li>
            </ul>
          </nav>
          <div className="flex flex-col gap-1.5 py-2 px-2 border-t border-[#E3E3E3]">
            <SidebarIcon icon={LifeBuoy} label="Support" iconClass="text-[#ABABAB]" strokeWidth={1.5} />
            <SidebarIcon icon={CreditCard} label="Subscription" iconClass="text-[#ABABAB]" strokeWidth={1.5} />
            <SidebarIcon icon={User} label="Account" iconClass="text-[#ABABAB]" strokeWidth={1.5} />
          </div>
        </aside>
      </div>
    );
  }

  return (
    <>
      {/* Mobile hamburger toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white text-[#161616] p-2 rounded-none border border-[#E3E3E3] shadow-lg hover:bg-[#FBFBFB] transition-colors"
        onClick={() => onClose && onClose()}
        aria-label="Toggle Sidebar"
        tabIndex={0}
      >
        <LayoutDashboard className="w-5 h-5" aria-hidden="true" strokeWidth={2} />
      </button>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex fixed top-16 left-0 h-full w-16 shadow-lg flex-col justify-start z-20 transition-all duration-300 p-0 bg-white border-r border-[#E3E3E3]"
        aria-label="Sidebar"
        role="navigation"
      >
        <div className="flex flex-col h-full w-full">
          <nav className="w-full mt-4 pt-4" role="navigation" aria-label="Main navigation">
            <ul className="flex flex-col items-center gap-2 w-full px-2">
              <li className="w-full">
                  <button
                    type="button"
                  onClick={() => onSectionChange && onSectionChange('generator')}
                  className={`flex items-center justify-center w-10 h-10 mx-auto rounded-none border border-[#E3E3E3] focus:outline-none focus:ring-2 transition-all duration-200 ${activeSection === 'generator' ? 'bg-[#161616] border-[#161616]' : 'hover:bg-[#FBFBFB] text-[#505050] hover:text-[#161616] hover:border-[#ABABAB]'}`}
                  style={{ '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties}
                  aria-label="Email Generator"
                  aria-current={activeSection === 'generator' ? 'page' : undefined}
                    tabIndex={0}
                  >
                  <LayoutDashboard 
                    className="w-6 h-6" 
                    style={{ color: activeSection === 'generator' ? '#FFFFFF' : '#505050', stroke: activeSection === 'generator' ? '#FFFFFF' : '#505050' }}
                    aria-hidden="true" 
                    strokeWidth={activeSection === 'generator' ? 2 : 1.5} 
                  />
                  </button>
                </li>
              <li className="w-full">
                  <button
                    type="button"
                  onClick={() => onSectionChange && onSectionChange('templates')}
                  className={`flex items-center justify-center w-10 h-10 mx-auto rounded-none border border-[#E3E3E3] focus:outline-none focus:ring-2 transition-all duration-200 ${activeSection === 'templates' ? 'bg-[#161616] border-[#161616]' : 'hover:bg-[#FBFBFB] text-[#505050] hover:text-[#161616] hover:border-[#ABABAB]'}`}
                  style={{ '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties}
                  aria-label="Templates"
                  aria-current={activeSection === 'templates' ? 'page' : undefined}
                    tabIndex={0}
                  >
                  <FileText 
                    className="w-6 h-6" 
                    style={{ color: activeSection === 'templates' ? '#FFFFFF' : '#505050', stroke: activeSection === 'templates' ? '#FFFFFF' : '#505050' }}
                    aria-hidden="true" 
                    strokeWidth={activeSection === 'templates' ? 2 : 1.5} 
                  />
                  </button>
                </li>
              <li className="w-full">
                  <button
                    type="button"
                  onClick={() => onSectionChange && onSectionChange('favorites')}
                  className={`flex items-center justify-center w-10 h-10 mx-auto rounded-none border border-[#E3E3E3] focus:outline-none focus:ring-2 transition-all duration-200 ${activeSection === 'favorites' ? 'bg-[#161616] border-[#161616]' : 'hover:bg-[#FBFBFB] text-[#505050] hover:text-[#161616] hover:border-[#ABABAB]'}`}
                  style={{ '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties}
                  aria-label="Favorites"
                  aria-current={activeSection === 'favorites' ? 'page' : undefined}
                    tabIndex={0}
                  >
                  <Star 
                    className="w-6 h-6" 
                    style={{ color: activeSection === 'favorites' ? '#FFFFFF' : '#505050', stroke: activeSection === 'favorites' ? '#FFFFFF' : '#505050' }}
                    aria-hidden="true" 
                    strokeWidth={activeSection === 'favorites' ? 2 : 1.5} 
                  />
                  </button>
                </li>
              <li className="w-full">
                  <button
                    type="button"
                  onClick={() => onSectionChange && onSectionChange('history')}
                  className={`flex items-center justify-center w-10 h-10 mx-auto rounded-none border border-[#E3E3E3] focus:outline-none focus:ring-2 transition-all duration-200 ${activeSection === 'history' ? 'bg-[#161616] border-[#161616]' : 'hover:bg-[#FBFBFB] text-[#505050] hover:text-[#161616] hover:border-[#ABABAB]'}`}
                  style={{ '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties}
                    aria-label="History"
                  aria-current={activeSection === 'history' ? 'page' : undefined}
                    tabIndex={0}
                  >
                  <History 
                    className="w-6 h-6" 
                    style={{ color: activeSection === 'history' ? '#FFFFFF' : '#505050', stroke: activeSection === 'history' ? '#FFFFFF' : '#505050' }}
                    aria-hidden="true" 
                    strokeWidth={activeSection === 'history' ? 2 : 1.5} 
                  />
                  </button>
                </li>
              </ul>
            </nav>
          {/* Bottom icons */}
          <div className="flex flex-col gap-1.5 py-1 w-full items-center px-2 mt-auto mb-20 border-t border-[#E3E3E3]" role="navigation" aria-label="Secondary navigation">
              <button
                type="button"
                onClick={() => onSectionChange && onSectionChange("support")}
              className={`flex items-center justify-center w-10 h-10 rounded-none border border-[#E3E3E3] focus:outline-none focus:ring-2 transition-all duration-200 ${activeSection === "support" ? "bg-[#161616] border-[#161616]" : "hover:bg-[#FBFBFB] text-[#505050] hover:text-[#161616] hover:border-[#ABABAB]"}`}
                style={{ '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties}
                aria-label="Support"
                tabIndex={0}
              title="Support"
              >
              <LifeBuoy 
                className="w-6 h-6" 
                style={{ color: activeSection === "support" ? '#FFFFFF' : '#505050', stroke: activeSection === "support" ? '#FFFFFF' : '#505050' }}
                aria-hidden="true" 
                strokeWidth={activeSection === "support" ? 2 : 1.5} 
              />
              </button>
              <button
                type="button"
                onClick={() => onSectionChange && onSectionChange("subscription")}
              className={`flex items-center justify-center w-10 h-10 rounded-none border border-[#E3E3E3] focus:outline-none focus:ring-2 transition-all duration-200 ${activeSection === "subscription" ? "bg-[#161616] border-[#161616]" : "hover:bg-[#FBFBFB] text-[#505050] hover:text-[#161616] hover:border-[#ABABAB]"}`}
                style={{ '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties}
                aria-label="Subscription"
                tabIndex={0}
              title="Subscription"
              >
              <CreditCard 
                className="w-6 h-6" 
                style={{ color: activeSection === "subscription" ? '#FFFFFF' : '#505050', stroke: activeSection === "subscription" ? '#FFFFFF' : '#505050' }}
                aria-hidden="true" 
                strokeWidth={activeSection === "subscription" ? 2 : 1.5} 
              />
              </button>
              <button
                type="button"
                onClick={() => onSectionChange && onSectionChange("account")}
              className={`flex items-center justify-center w-10 h-10 rounded-none border border-[#E3E3E3] focus:outline-none focus:ring-2 transition-all duration-200 ${activeSection === "account" ? "bg-[#161616] border-[#161616]" : "hover:bg-[#FBFBFB] text-[#505050] hover:text-[#161616] hover:border-[#ABABAB]"}`}
                style={{ '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties}
                aria-label="Account"
                tabIndex={0}
              title="Account"
              >
              <User 
                className="w-6 h-6" 
                style={{ color: activeSection === "account" ? '#FFFFFF' : '#505050', stroke: activeSection === "account" ? '#FFFFFF' : '#505050' }}
                aria-hidden="true" 
                strokeWidth={activeSection === "account" ? 2 : 1.5} 
              />
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
      className="flex items-center px-3 py-2 w-full rounded-none border border-[#E3E3E3] hover:bg-[#FBFBFB] transition-colors group focus:outline-none focus:ring-2"
      style={{ fontFamily: 'var(--font-inter-tight), sans-serif', '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties}
      aria-label={label}
      tabIndex={0}
    >
      <Icon className={`w-5 h-5 ${iconClass} mr-3`} aria-hidden="true" strokeWidth={strokeWidth} />
      <span className="text-sm font-medium text-[#505050] group-hover:text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>{label}</span>
    </button>
  );
} 