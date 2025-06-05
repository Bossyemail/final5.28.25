'use client'

import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f6fa] to-[#e9e4ef] dark:from-[#232326] dark:to-[#3a3740]">
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center">
        <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl px-3 py-4 flex flex-col items-center border border-zinc-100 dark:border-zinc-800" style={{ boxShadow: '0 8px 32px 0 rgba(80,60,80,0.10)' }}>
          <h1 className="text-xl font-bold text-center text-zinc-900 dark:text-white mb-2" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>
            Welcome Back
          </h1>
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: 'rounded-full bg-black text-white py-2 px-4 text-base font-semibold shadow hover:bg-zinc-900 transition-all mt-2',
                formFieldInput: 'rounded-full border border-zinc-200 dark:border-zinc-700 py-2 px-4 text-base focus:ring-2 focus:ring-primary focus:border-primary transition-all',
                formFieldLabel: 'text-zinc-700 dark:text-zinc-200 font-medium mb-0.5',
                card: 'w-full items-center bg-transparent shadow-none border-none p-0',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                headerLogo: 'flex justify-center mb-2',
                socialButtonsBlockButton: 'rounded-full py-2 px-4 text-base font-semibold mb-2',
                footer: 'flex justify-center mt-2',
                footerActionLink: 'text-primary hover:text-primary/90 font-semibold',
                dividerRow: 'my-2',
                identityProviderIcon: 'mx-auto',
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            redirectUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  )
} 