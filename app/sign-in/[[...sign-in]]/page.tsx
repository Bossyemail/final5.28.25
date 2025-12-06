'use client'

import React from 'react'
import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-8">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="w-full bg-white border border-[#E3E3E3] rounded-none p-6 md:p-8 flex flex-col items-center">
          {/* Company Logo and Name */}
          <div className="flex items-center gap-2 mb-6">
            <Image 
              src="/transparent 1.png" 
              alt="BossyEmail" 
              width={32} 
              height={32} 
              className="h-8 w-8"
            />
            <span className="text-xl text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, letterSpacing: '-0.02em' }}>
              BossyEmail
            </span>
          </div>
          
          <SignIn 
            appearance={{
              elements: {
                // Main container
                card: 'w-full items-center bg-transparent shadow-none border-none p-0',
                
                // Header elements
                headerTitle: 'text-xl font-normal text-center text-[#161616] mb-2',
                headerSubtitle: 'text-sm text-[#505050] text-center mb-6',
                headerLogo: 'hidden',
                
                // Form elements
                formButtonPrimary: 'rounded-none bg-[#161616] hover:bg-[#292929] text-white text-sm font-medium px-6 py-3 uppercase tracking-wide transition-all duration-200 h-10 w-full',
                formButtonPrimaryText: 'CONTINUE',
                formFieldInput: 'rounded-none border border-[#E3E3E3] bg-white text-[#161616] py-2.5 px-3 text-sm focus:ring-2 focus:ring-[#161616]/20 focus:border-[#161616] transition-all duration-200 placeholder-[#ABABAB]',
                formFieldLabel: 'text-[#161616] font-medium mb-1.5 text-sm',
                formFieldInputShowPasswordButton: 'text-[#505050] hover:text-[#161616] transition-colors',
                
                // Social buttons - styled as small icons in a row
                socialButtons: 'flex flex-row gap-2 justify-center mb-4',
                socialButtonsBlockButton: 'rounded-none p-2 border border-[#E3E3E3] bg-white text-[#161616] hover:bg-[#FBFBFB] transition-all duration-200 w-12 h-12 flex items-center justify-center min-w-[48px]',
                socialButtonsBlockButtonArrow: 'hidden',
                socialButtonsBlockButtonText: 'hidden',
                socialButtonsBlockButtonText__apple: '',
                socialButtonsBlockButtonText__facebook: '',
                socialButtonsBlockButtonText__google: '',
                
                // Footer elements
                footer: 'hidden',
                footerActionLink: 'text-[#161616] hover:text-[#505050] font-medium transition-colors text-sm',
                dividerRow: 'my-4',
                dividerLine: 'bg-[#E3E3E3]',
                dividerText: 'text-[#505050] text-xs',
                
                // Identity provider icons - make them larger for icon-only buttons
                identityProviderIcon: 'w-6 h-6',
                
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
                socialButtonsPlacement: "top",
                socialButtonsVariant: "blockButton",
                privacyPageUrl: "/privacy",
                termsPageUrl: "/terms",
              },
              baseTheme: 'light',
              variables: {
                colorPrimary: '#161616',
                colorText: '#161616',
                colorTextSecondary: '#505050',
                colorBackground: '#ffffff',
                colorInputBackground: '#ffffff',
                colorInputText: '#161616',
                colorDanger: '#ef4444',
                colorSuccess: '#22c55e',
                borderRadius: '0px',
                fontFamily: 'var(--font-inter-tight), sans-serif',
                fontSize: '16px',
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            redirectUrl="/dashboard"
          />
          <div className="text-center mt-4">
            <p className="text-sm text-[#505050] mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
              No account? <a href="/sign-up" className="text-[#161616] hover:text-[#505050] font-medium">Sign up</a>
            </p>
            <p className="text-xs text-[#ABABAB]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
              <a href="/privacy" className="hover:text-[#505050]">Privacy</a> <a href="/terms" className="hover:text-[#505050]">Terms</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
