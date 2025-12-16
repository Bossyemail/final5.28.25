'use client'

import React, { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { analytics } from '@/lib/analytics'

export default function Page() {
  const { signUp, setActive, isLoaded } = useSignUp()
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return

    setLoading(true)
    setError('')

    try {
      const result = await signUp.create({
        firstName,
        emailAddress: email,
        password,
      })

      // Activate session immediately for seamless access
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        analytics.signUp('email')
        router.replace('/dashboard')
      } else {
        // If email verification is required, still allow access
        // User can verify later without blocking their experience
        try {
          await setActive({ session: result.createdSessionId })
          analytics.signUp('email')
          router.replace('/dashboard')
        } catch (activateErr) {
          // If activation fails, show helpful error
          setError('Account created but session activation failed. Please try signing in.')
          setLoading(false)
        }
      }
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || 'An error occurred'
      
      // Provide more helpful error messages
      if (errorMessage.includes('email') && errorMessage.includes('taken') || errorMessage.includes('exists')) {
        setError('An account with this email already exists. Please sign in instead.')
      } else if (errorMessage.includes('password')) {
        setError('Password does not meet requirements. Please use a stronger password.')
      } else {
        setError(errorMessage)
      }
      setLoading(false)
    }
  }

  const handleOAuthSignUp = async (provider: 'google' | 'apple' | 'facebook') => {
    if (!isLoaded) return
    
    // Check if we're on Safari and provide helpful guidance
    const isSafari = typeof window !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    
    try {
      setError('') // Clear any previous errors
      analytics.signUp(provider)
      await signUp.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: '/dashboard',
        redirectUrlComplete: '/dashboard',
      })
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || 'An error occurred'
      
      // Provide Safari-specific guidance
      if (isSafari && (errorMessage.includes('popup') || errorMessage.includes('blocked') || errorMessage.includes('redirect'))) {
        setError('Safari may have blocked the sign-up window. Please try using email/password sign-up, or allow pop-ups for this site in Safari settings.')
      } else {
        setError(errorMessage)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#161616] px-4 transition-colors">
      <div className="relative w-full max-w-md rounded-none bg-white dark:bg-[#1a1a1a] border border-[#E3E3E3] dark:border-[#292929] p-10">
        {/* Branding */}
        <div className="relative flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-none bg-[#161616] dark:bg-white flex items-center justify-center overflow-hidden">
            <img 
              src="/transparent 1.png" 
              alt="BossyEmail" 
              className="w-8 h-8 object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <h1 
            className="mt-3 display-6 text-[#161616] dark:text-white mb-2"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400 }}
          >
            Create your account
          </h1>
          <p 
            className="paragraph-default text-[#505050] dark:text-[#ABABAB]"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
          >
            Join BossyEmail and get started
          </p>
        </div>

        {/* Social Buttons */}
        <div className="relative flex justify-center gap-4 mb-6">
          {/* Google */}
          <button
            onClick={() => handleOAuthSignUp('google')}
            type="button"
            className="h-12 w-12 flex items-center justify-center rounded-none border border-[#E3E3E3] dark:border-[#292929] bg-white dark:bg-[#1a1a1a] hover:bg-[#FBFBFB] dark:hover:bg-[#292929] transition"
            aria-label="Sign up with Google"
          >
            <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#000000"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#000000"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#000000"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#000000"/>
            </svg>
          </button>

          {/* Apple */}
          <button
            onClick={() => handleOAuthSignUp('apple')}
            type="button"
            className="h-12 w-12 flex items-center justify-center rounded-none border border-[#E3E3E3] dark:border-[#292929] bg-white dark:bg-[#1a1a1a] hover:bg-[#FBFBFB] dark:hover:bg-[#292929] transition"
            aria-label="Sign up with Apple"
          >
            <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
              <path d="M16.365 1.43c0 1.14-.455 2.266-1.264 3.086-.9.915-2.377 1.627-3.614 1.524-.117-1.127.463-2.313 1.24-3.17.9-.987 2.428-1.7 3.508-1.44.076.32.13.64.13 1zM20.95 17.36c-.54 1.23-1.191 2.47-2.144 3.54-.79.89-1.74 1.87-2.963 1.87-1.166 0-1.957-.61-3.268-.61-1.346 0-2.212.62-3.38.62-1.22 0-2.153-.95-2.944-1.83-1.1-1.26-1.955-2.83-2.465-4.46C2.03 13.99 1.9 10.52 3.58 8.07c.87-1.29 2.34-2.11 3.92-2.11 1.226 0 2.385.67 3.27.67.845 0 2.205-.72 3.72-.72.67 0 3.095.06 4.55 2.34-.12.08-2.72 1.6-2.7 4.8.03 3.77 3.34 5.01 3.41 5.04-.03.1-.49 1.16-.8 1.27z"/>
            </svg>
          </button>

          {/* Facebook */}
          <button
            onClick={() => handleOAuthSignUp('facebook')}
            type="button"
            className="h-12 w-12 flex items-center justify-center rounded-none border border-[#E3E3E3] dark:border-[#292929] bg-white dark:bg-[#1a1a1a] hover:bg-[#FBFBFB] dark:hover:bg-[#292929] transition"
            aria-label="Sign up with Facebook"
          >
            <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495V14.708h-3.13v-3.62h3.13V8.412c0-3.1 1.893-4.788 4.658-4.788 1.324 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.765v2.316h3.587l-.467 3.62h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"/>
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-[#E3E3E3] dark:bg-[#292929]"></div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#ABABAB] dark:text-[#ABABAB]">or</span>
          <div className="h-px flex-1 bg-[#E3E3E3] dark:bg-[#292929]"></div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleEmailSignUp}>
          {error && (
            <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-200 border border-red-200 dark:border-red-800 p-3 rounded-lg">
              <p className="font-medium mb-1">{error}</p>
              {error.includes('Safari') && (
                <p className="text-xs mt-2 text-red-700 dark:text-red-300">
                  Tip: Email/password sign-up works reliably on all browsers, including Safari.
                </p>
              )}
            </div>
          )}

          <div>
            <label 
              className="block text-sm font-medium text-[#161616] dark:text-white mb-1"
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
            >
              Full Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-none border border-[#E3E3E3] dark:border-[#292929] bg-white dark:bg-[#161616] px-4 py-3 text-sm text-[#161616] dark:text-white placeholder-[#ABABAB] focus:bg-[#FBFBFB] dark:focus:bg-[#1a1a1a] focus:border-[#161616] dark:focus:border-white focus:ring-2 focus:ring-[#161616]/10 dark:focus:ring-white/10 outline-none transition"
              placeholder="Jane Doe"
              required
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
            />
          </div>

          <div>
            <label 
              className="block text-sm font-medium text-[#161616] dark:text-white mb-1"
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-none border border-[#E3E3E3] dark:border-[#292929] bg-white dark:bg-[#161616] px-4 py-3 text-sm text-[#161616] dark:text-white placeholder-[#ABABAB] focus:bg-[#FBFBFB] dark:focus:bg-[#1a1a1a] focus:border-[#161616] dark:focus:border-white focus:ring-2 focus:ring-[#161616]/10 dark:focus:ring-white/10 outline-none transition"
              placeholder="you@example.com"
              required
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
            />
          </div>

          <div>
            <label 
              className="block text-sm font-medium text-[#161616] dark:text-white mb-1"
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-none border border-[#E3E3E3] dark:border-[#292929] bg-white dark:bg-[#161616] px-4 py-3 text-sm text-[#161616] dark:text-white placeholder-[#ABABAB] focus:bg-[#FBFBFB] dark:focus:bg-[#1a1a1a] focus:border-[#161616] dark:focus:border-white focus:ring-2 focus:ring-[#161616]/10 dark:focus:ring-white/10 outline-none transition"
              placeholder="••••••••••"
              required
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !isLoaded}
            className="w-full rounded-none bg-[#161616] dark:bg-white text-white dark:text-[#161616] py-3 text-sm font-medium hover:bg-[#292929] dark:hover:bg-[#FBFBFB] transition disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        {/* Footer */}
        <p 
          className="mt-6 text-center paragraph-small text-[#505050] dark:text-[#ABABAB]"
          style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
        >
          Already have an account?{' '}
          <a 
            href="/sign-in" 
            className="font-medium text-[#161616] dark:text-white hover:underline"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
          >
            Sign in
          </a>
        </p>
        
        {/* Browser Compatibility Note */}
        <p 
          className="mt-4 text-center paragraph-small text-[#ABABAB] dark:text-[#ABABAB]"
          style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
        >
          Having trouble? Email/password sign-up works on all browsers, including Safari.
        </p>
      </div>
    </div>
  )
}
