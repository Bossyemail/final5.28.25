'use client'

import React from 'react'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="w-full bg-white border border-[#E3E3E3] rounded-none p-8 md:p-10 flex flex-col items-center">
          <SignUp 
            appearance={{
              elements: {
                // Main container
                card: 'w-full items-center bg-transparent shadow-none border-none p-0',
                
                // Header elements
                headerTitle: 'text-2xl font-normal text-center text-[#161616] mb-6',
                headerSubtitle: 'hidden',
                headerLogo: 'flex justify-center items-center mb-6',
                
                // Form elements
                formButtonPrimary: 'rounded-none bg-[#161616] hover:bg-[#292929] text-white text-sm font-medium px-8 py-4 uppercase tracking-wide transition-all duration-200 h-12 w-full',
                formButtonPrimaryText: 'SIGN UP',
                formFieldInput: 'rounded-none border border-[#E3E3E3] bg-white text-[#161616] py-3 px-4 text-base focus:ring-2 focus:ring-[#161616]/20 focus:border-[#161616] transition-all duration-200 placeholder-[#ABABAB]',
                formFieldLabel: 'text-[#161616] font-medium mb-2 text-sm',
                formFieldInputShowPasswordButton: 'text-[#505050] hover:text-[#161616] transition-colors',
                
                // Social buttons
                socialButtonsBlockButton: 'rounded-none py-3 px-4 text-base font-medium mb-3 border border-[#161616] bg-white text-[#161616] hover:bg-[#FBFBFB] transition-all duration-200 w-full',
                socialButtonsBlockButtonArrow: 'text-[#505050]',
                socialButtonsBlockButtonText: 'text-[#161616]',
                socialButtonsBlockButtonText__apple: 'Continue with Apple',
                socialButtonsBlockButtonText__facebook: 'Continue with Facebook',
                socialButtonsBlockButtonText__google: 'Continue with Google',
                
                // Footer elements
                footer: 'flex flex-col items-center gap-3 mt-6',
                footerActionLink: 'text-[#161616] hover:text-[#505050] font-medium transition-colors',
                dividerRow: 'my-6',
                dividerLine: 'bg-[#E3E3E3]',
                dividerText: 'text-[#505050] text-sm',
                
                // Identity provider icons
                identityProviderIcon: 'mx-auto',
                
                // Error messages
                formFieldError: 'text-red-600 text-sm mt-2',
                
                // Form resend code
                formResendCodeLink: 'text-[#161616] hover:text-[#505050] font-medium transition-colors',
                
                // Form field action
                formFieldAction: 'text-[#161616] hover:text-[#505050] font-medium transition-colors',
                
                // Additional text elements
                formFieldHint: 'text-[#505050] text-sm mt-2',
                formFieldAction__signIn: 'text-[#505050] text-sm',
                formFieldAction__signUp: 'text-[#161616] hover:text-[#505050] font-medium transition-colors',
              },
              layout: {
                socialButtonsPlacement: "bottom",
                socialButtonsVariant: "blockButton",
                privacyPageUrl: "/privacy",
                termsPageUrl: "/terms",
              },
              variables: {
                colorPrimary: '#161616',
                colorText: '#161616',
                colorTextSecondary: '#505050',
                colorBackground: '#ffffff',
                colorInputBackground: '#ffffff',
                colorInputText: '#161616',
                borderRadius: '0px',
                fontFamily: 'var(--font-inter-tight), sans-serif',
                fontSize: '16px',
              },
            }}
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            redirectUrl="/dashboard"
          />
          <div className="text-center mt-4">
            <p className="text-sm text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
              Already have an account? <a href="/sign-in" className="text-[#161616] hover:text-[#505050] font-medium">Sign in</a> – we missed you.
            </p>
            <p className="text-xs text-[#ABABAB] mt-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
              <a href="/privacy" className="hover:text-[#505050]">Privacy</a> | <a href="/terms" className="hover:text-[#505050]">Terms</a> | All the usual fine print.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
