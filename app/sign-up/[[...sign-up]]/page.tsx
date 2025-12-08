'use client'

import React, { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

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

      // Send email verification
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      
      // For now, we'll redirect to dashboard after signup
      // In production, you might want to show a verification screen
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/dashboard')
      } else {
        // Need to verify email
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'An error occurred')
      setLoading(false)
    }
  }

  const handleOAuthSignUp = async (provider: 'google' | 'apple' | 'facebook') => {
    if (!isLoaded) return
    try {
      await signUp.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: '/dashboard',
        redirectUrlComplete: '/dashboard',
      })
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'An error occurred')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white/80 border border-slate-200 shadow-xl p-10">
        {/* Background Grid */}
        <div
          className="absolute inset-x-0 top-0 h-40 opacity-60 rounded-t-3xl pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(148,163,184,0.25) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        ></div>

        {/* Branding */}
        <div className="relative flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center overflow-hidden">
            <img 
              src="/transparent 1.png" 
              alt="BossyEmail" 
              className="w-8 h-8 object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Create your account
          </h1>
          <p className="text-sm text-slate-500 mt-1">Join BossyEmail and get started</p>
        </div>

        {/* Social Buttons */}
        <div className="relative flex justify-center gap-4 mb-6">
          {/* Google */}
          <button
            onClick={() => handleOAuthSignUp('google')}
            className="h-12 w-12 flex items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
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
            className="h-12 w-12 flex items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
          >
            <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
              <path d="M16.365 1.43c0 1.14-.455 2.266-1.264 3.086-.9.915-2.377 1.627-3.614 1.524-.117-1.127.463-2.313 1.24-3.17.9-.987 2.428-1.7 3.508-1.44.076.32.13.64.13 1zM20.95 17.36c-.54 1.23-1.191 2.47-2.144 3.54-.79.89-1.74 1.87-2.963 1.87-1.166 0-1.957-.61-3.268-.61-1.346 0-2.212.62-3.38.62-1.22 0-2.153-.95-2.944-1.83-1.1-1.26-1.955-2.83-2.465-4.46C2.03 13.99 1.9 10.52 3.58 8.07c.87-1.29 2.34-2.11 3.92-2.11 1.226 0 2.385.67 3.27.67.845 0 2.205-.72 3.72-.72.67 0 3.095.06 4.55 2.34-.12.08-2.72 1.6-2.7 4.8.03 3.77 3.34 5.01 3.41 5.04-.03.1-.49 1.16-.8 1.27z"/>
            </svg>
          </button>

          {/* Facebook */}
          <button
            onClick={() => handleOAuthSignUp('facebook')}
            className="h-12 w-12 flex items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
          >
            <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495V14.708h-3.13v-3.62h3.13V8.412c0-3.1 1.893-4.788 4.658-4.788 1.324 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.765v2.316h3.587l-.467 3.62h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"/>
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-slate-200"></div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">or</span>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleEmailSignUp}>
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition"
              placeholder="Jane Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition"
              placeholder="••••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !isLoaded}
            className="w-full rounded-2xl bg-black text-white py-3 text-sm font-medium shadow-md hover:bg-slate-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <a href="/sign-in" className="font-semibold text-black hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
