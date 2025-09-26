'use client'

import React from 'react'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 flex items-center justify-center relative overflow-hidden">
      {/* Background blur elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D1B4C6]/5 via-transparent to-[#D1B4C6]/5 blur-3xl"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D1B4C6]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D1B4C6]/10 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center relative z-10">
        <div className="w-full bg-zinc-800/30 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center border border-zinc-700/50" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
          <SignIn 
            appearance={{
              elements: {
                // Main container
                card: 'w-full items-center bg-transparent shadow-none border-none p-0',
                
                // Header elements
                headerTitle: 'text-2xl font-bold text-center text-white mb-6 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent',
                headerSubtitle: 'hidden',
                headerLogo: 'flex justify-center items-center mb-6',
                
                // Form elements
                formButtonPrimary: 'rounded-2xl bg-gradient-to-r from-[#D1B4C6] to-[#C4A7B9] hover:from-[#C4A7B9] hover:to-[#D1B4C6] text-black py-4 px-8 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mt-6 w-full',
                formButtonPrimaryText: 'Sign In',
                formFieldInput: 'rounded-2xl border border-zinc-600/50 bg-zinc-800/30 backdrop-blur-sm text-white py-4 px-5 text-base focus:ring-2 focus:ring-[#D1B4C6]/50 focus:border-[#D1B4C6] transition-all duration-300 placeholder-zinc-400',
                formFieldLabel: 'text-zinc-200 font-medium mb-2 text-sm',
                formFieldInputShowPasswordButton: 'text-zinc-400 hover:text-white transition-colors',
                
                // Social buttons
                socialButtonsBlockButton: 'rounded-2xl py-4 px-5 text-base font-medium mb-3 border border-zinc-600/50 bg-zinc-800/30 backdrop-blur-sm text-white hover:bg-zinc-700/50 hover:scale-105 transition-all duration-300 w-full',
                socialButtonsBlockButtonArrow: 'text-zinc-400',
                socialButtonsBlockButtonText: 'text-white',
                socialButtonsBlockButtonText__apple: 'Continue with Apple',
                socialButtonsBlockButtonText__facebook: 'Continue with Facebook',
                socialButtonsBlockButtonText__google: 'Continue with Google',
                
                // Footer elements
                footer: 'flex flex-col items-center gap-3 mt-6',
                footerActionLink: 'text-[#D1B4C6] hover:text-[#C4A7B9] font-semibold transition-colors',
                dividerRow: 'my-6',
                dividerLine: 'bg-zinc-600/50',
                dividerText: 'text-zinc-400 text-sm',
                
                // Identity provider icons
                identityProviderIcon: 'mx-auto',
                
                // Error messages
                formFieldError: 'text-red-400 text-sm mt-2',
                
                // Form resend code
                formResendCodeLink: 'text-[#D1B4C6] hover:text-[#C4A7B9] font-semibold transition-colors',
                
                // Form field action
                formFieldAction: 'text-[#D1B4C6] hover:text-[#C4A7B9] font-semibold transition-colors',
                
                // Additional text elements
                formFieldHint: 'text-zinc-400 text-sm mt-2',
                formFieldAction__signIn: 'text-zinc-400 text-sm',
                formFieldAction__signUp: 'text-[#D1B4C6] hover:text-[#C4A7B9] font-semibold transition-colors',
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
                colorTextSecondary: '#d1d5db',
                colorBackground: 'transparent',
                colorInputBackground: 'rgba(39, 39, 42, 0.3)',
                colorInputText: '#ffffff',
                borderRadius: '16px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            redirectUrl="/dashboard"
          />
          <div className="text-center mt-4">
            <p className="text-sm text-zinc-400">
              New here? <a href="/sign-up" className="text-[#D1B4C6] hover:text-[#C4A7B9] font-semibold">Sign up</a> – we don't bite.
            </p>
            <p className="text-xs text-zinc-500 mt-2">
              <a href="/privacy" className="hover:text-zinc-300">Privacy</a> | <a href="/terms" className="hover:text-zinc-300">Terms</a> | All the usual fine print.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}