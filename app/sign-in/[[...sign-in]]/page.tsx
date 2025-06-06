'use client'

import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f6fa] to-[#e9e4ef] dark:from-[#232326] dark:to-[#3a3740]">
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center">
        <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl px-6 py-8 flex flex-col items-center border border-zinc-100 dark:border-zinc-800" style={{ boxShadow: '0 8px 32px 0 rgba(80,60,80,0.10)' }}>
          <div className="flex justify-center w-full mb-2">
            {/* Clerk logo/icon will be rendered here by Clerk */}
          </div>
          <h1 className="text-xl font-bold text-center text-zinc-900 dark:text-white mb-2" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>
            Back for more? You're either busy or brilliant. Probably both.
          </h1>
          <SignIn 
            appearance={{
              elements: {
                // Main container
                card: 'w-full items-center bg-transparent shadow-none border-none p-0',
                
                // Header elements
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                headerLogo: 'flex justify-center items-center mb-2',
                
                // Form elements
                formButtonPrimary: 'rounded-full bg-black text-white py-3 px-6 text-base font-semibold shadow hover:bg-zinc-900 transition-all mt-4 w-full dark:bg-white dark:text-[#212121] dark:hover:bg-[#f5f5f5] dark:border dark:border-[#424242]',
                formButtonPrimaryText: 'LET\'S DO THIS',
                formFieldInput: 'rounded-full border border-zinc-200 dark:border-zinc-700 py-3 px-4 text-base focus:ring-2 focus:ring-primary focus:border-primary transition-all',
                formFieldLabel: 'text-zinc-700 dark:text-zinc-200 font-medium mb-1.5',
                formFieldInputShowPasswordButton: 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200',
                
                // Social buttons
                socialButtonsBlockButton: 'rounded-full py-3 px-4 text-base font-semibold mb-2 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all w-full',
                socialButtonsBlockButtonArrow: 'text-zinc-500 dark:text-zinc-400',
                socialButtonsBlockButtonText: 'text-zinc-700 dark:text-zinc-200',
                socialButtonsBlockButtonText__apple: 'Continue with Apple',
                socialButtonsBlockButtonText__facebook: 'Continue with Facebook',
                socialButtonsBlockButtonText__google: 'Continue with Google',
                
                // Footer elements
                footer: 'flex flex-col items-center gap-2 mt-4',
                footerActionLink: 'text-primary hover:text-primary/90 font-semibold',
                dividerRow: 'my-4',
                dividerLine: 'bg-zinc-200 dark:bg-zinc-700',
                dividerText: 'text-zinc-500 dark:text-zinc-400 text-sm',
                
                // Identity provider icons
                identityProviderIcon: 'mx-auto',
                
                // Error messages
                formFieldError: 'text-red-500 dark:text-red-400 text-sm mt-1',
                
                // Form resend code
                formResendCodeLink: 'text-primary hover:text-primary/90 font-semibold',
                
                // Form field action
                formFieldAction: 'text-primary hover:text-primary/90 font-semibold',
                
                // Additional text elements
                formFieldHint: 'text-zinc-500 dark:text-zinc-400 text-sm mt-1',
                formFieldAction__signIn: 'text-zinc-500 dark:text-zinc-400 text-sm',
                formFieldAction__signUp: 'text-primary hover:text-primary/90 font-semibold',
              },
              layout: {
                socialButtonsPlacement: "bottom",
                socialButtonsVariant: "blockButton",
                privacyPageUrl: "/privacy",
                termsPageUrl: "/terms",
              },
              variables: {
                colorPrimary: '#000000',
                colorText: '#232326',
                colorTextSecondary: '#666666',
                colorBackground: '#ffffff',
                colorInputBackground: '#ffffff',
                colorInputText: '#232326',
                borderRadius: '9999px',
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            redirectUrl="/dashboard"
          />
          <div className="text-center mt-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              New here? <a href="/sign-up" className="text-primary hover:text-primary/90 font-semibold">Sign up</a> – we don't bite.
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
              <a href="/privacy" className="hover:text-zinc-600 dark:hover:text-zinc-300">Privacy</a> | <a href="/terms" className="hover:text-zinc-600 dark:hover:text-zinc-300">Terms</a> | All the usual fine print.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 