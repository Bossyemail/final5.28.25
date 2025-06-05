'use client'

import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-md">
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-primary text-primary-foreground hover:bg-primary/90',
              footerActionLink: 'text-primary hover:text-primary/90',
              footer: 'flex justify-center',
              card: 'items-center',
              headerTitle: 'text-center w-full',
              headerSubtitle: 'text-center w-full',
              headerLogo: 'mx-auto block',
            },
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  )
} 