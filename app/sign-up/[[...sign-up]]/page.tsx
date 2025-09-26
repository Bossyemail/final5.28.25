'use client'

import React from 'react'
import { SignUp } from '@clerk/nextjs'
import { Header } from '@/components/header'

export default function Page() {
  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      <div className="flex items-center justify-center pt-20 pb-16">
        <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center">
          <div className="w-full bg-zinc-800 rounded-2xl shadow-2xl px-6 py-8 flex flex-col items-center border border-zinc-700" style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3)' }}>
            <div className="flex justify-center w-full mb-2">
              {/* Clerk logo/icon will be rendered here by Clerk */}
            </div>
            <h1 className="text-xl font-bold text-center text-white mb-2" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>
              Join BossyEmail
            </h1>
            <SignUp 
              appearance={{
                elements: {
                  // Main container
                  card: 'w-full items-center bg-transparent shadow-none border-none p-0',
                  
                  // Header elements
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  headerLogo: 'flex justify-center items-center mb-2',
                  
                  // Form elements
                  formButtonPrimary: 'rounded-lg bg-[#D1B4C6] hover:bg-[#C4A7B9] text-black py-3 px-6 text-base font-semibold shadow hover:scale-105 hover:shadow-[0_0_15px_rgba(209,180,198,0.4)] transition-all mt-4 w-full',
                  formButtonPrimaryText: 'Sign Up',
                  formFieldInput: 'rounded-lg border border-zinc-600 bg-zinc-700 text-white py-3 px-4 text-base focus:ring-2 focus:ring-[#D1B4C6] focus:border-[#D1B4C6] transition-all',
                  formFieldLabel: 'text-zinc-300 font-medium mb-1.5',
                  formFieldInputShowPasswordButton: 'text-zinc-400 hover:text-zinc-200',
                  
                  // Social buttons
                  socialButtonsBlockButton: 'rounded-lg py-3 px-4 text-base font-semibold mb-2 border border-zinc-600 bg-zinc-700 text-white hover:bg-zinc-600 transition-all w-full',
                  socialButtonsBlockButtonArrow: 'text-zinc-400',
                  socialButtonsBlockButtonText: 'text-white',
                  socialButtonsBlockButtonText__apple: 'Continue with Apple',
                  socialButtonsBlockButtonText__facebook: 'Continue with Facebook',
                  socialButtonsBlockButtonText__google: 'Continue with Google',
                  
                  // Footer elements
                  footer: 'flex flex-col items-center gap-2 mt-4',
                  footerActionLink: 'text-[#D1B4C6] hover:text-[#C4A7B9] font-semibold',
                  dividerRow: 'my-4',
                  dividerLine: 'bg-zinc-600',
                  dividerText: 'text-zinc-400 text-sm',
                  
                  // Identity provider icons
                  identityProviderIcon: 'mx-auto',
                  
                  // Error messages
                  formFieldError: 'text-red-400 text-sm mt-1',
                  
                  // Form resend code
                  formResendCodeLink: 'text-[#D1B4C6] hover:text-[#C4A7B9] font-semibold',
                  
                  // Form field action
                  formFieldAction: 'text-[#D1B4C6] hover:text-[#C4A7B9] font-semibold',
                  
                  // Additional text elements
                  formFieldHint: 'text-zinc-400 text-sm mt-1',
                  formFieldAction__signIn: 'text-zinc-400 text-sm',
                  formFieldAction__signUp: 'text-[#D1B4C6] hover:text-[#C4A7B9] font-semibold',
                },
                layout: {
                  socialButtonsPlacement: "bottom",
                  socialButtonsVariant: "blockButton",
                  privacyPageUrl: "/privacy",
                  termsPageUrl: "/terms",
                },
                variables: {
                  colorPrimary: '#D1B4C6',
                  colorText: '#ffffff',
                  colorTextSecondary: '#a1a1aa',
                  colorBackground: '#27272a',
                  colorInputBackground: '#3f3f46',
                  colorInputText: '#ffffff',
                  borderRadius: '8px',
                },
              }}
              routing="path"
              path="/sign-up"
              signInUrl="/sign-in"
              redirectUrl="/dashboard"
            />
            <div className="text-center mt-4">
              <p className="text-sm text-zinc-400">
                Already have an account? <a href="/sign-in" className="text-[#D1B4C6] hover:text-[#C4A7B9] font-semibold">Sign in</a> – we missed you.
              </p>
              <p className="text-xs text-zinc-500 mt-2">
                <a href="/privacy" className="hover:text-zinc-300">Privacy</a> | <a href="/terms" className="hover:text-zinc-300">Terms</a> | All the usual fine print.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}