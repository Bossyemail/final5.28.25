"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"
import { useUser, UserButton } from "@clerk/nextjs"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isSignedIn, user } = useUser()

  return (
    <header className="w-full bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border-b border-zinc-800 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/transparent 2.png" alt="BossyEmail" className="h-8 w-8" />
            <span className="text-xl font-bold text-white">BossyEmail</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="#features" className="text-zinc-300 hover:text-white transition-colors text-sm font-medium">
              FEATURES
            </Link>
            
            <Link href="#pricing" className="text-zinc-300 hover:text-white transition-colors text-sm font-medium">
              PRICING
            </Link>
            
            <Link href="#faq" className="text-zinc-300 hover:text-white transition-colors text-sm font-medium">
              FAQ
            </Link>
            
            <Link href="#about" className="text-zinc-300 hover:text-white transition-colors text-sm font-medium">
              ABOUT
            </Link>
            
            <Link href="#contact" className="text-zinc-300 hover:text-white transition-colors text-sm font-medium">
              CONTACT
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <Link href="/dashboard">
                  <Button 
                    className="bg-[#D1B4C6] hover:bg-[#C4A7B9] text-black text-sm font-medium px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(209,180,198,0.4)] rounded-lg"
                  >
                    Dashboard
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
                    className="border-zinc-600 text-zinc-300 hover:text-white hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium px-6 py-2 rounded-lg"
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button 
                    className="bg-[#D1B4C6] hover:bg-[#C4A7B9] text-black text-sm font-medium px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(209,180,198,0.4)] rounded-lg"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-zinc-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-zinc-800 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="#features" 
                className="text-zinc-300 hover:text-white transition-colors text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                FEATURES
              </Link>
              <Link 
                href="#pricing" 
                className="text-zinc-300 hover:text-white transition-colors text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                PRICING
              </Link>
              <Link 
                href="#faq" 
                className="text-zinc-300 hover:text-white transition-colors text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                href="#about" 
                className="text-zinc-300 hover:text-white transition-colors text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link 
                href="#contact" 
                className="text-zinc-300 hover:text-white transition-colors text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-zinc-800">
                {isSignedIn ? (
                  <>
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button 
                        className="bg-[#D1B4C6] hover:bg-[#C4A7B9] text-black justify-start text-sm font-medium transition-all duration-300 rounded-lg w-full"
                      >
                        Dashboard
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
                        className="border-zinc-600 text-zinc-300 hover:text-white hover:bg-white hover:text-black transition-all duration-300 justify-start text-sm font-medium rounded-lg w-full"
                      >
                        Log In
                      </Button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                      <Button 
                        className="bg-[#D1B4C6] hover:bg-[#C4A7B9] text-black justify-start text-sm font-medium transition-all duration-300 rounded-lg w-full"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}