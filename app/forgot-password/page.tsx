'use client'

import React, { useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
  const { signIn, isLoaded } = useSignIn()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      setSuccess(true)
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'An error occurred')
    } finally {
      setLoading(false)
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
            Reset your password
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Enter your email address and we'll send you a reset link
          </p>
        </div>

        {/* Form */}
        {success ? (
          <div className="space-y-4">
            <div className="text-sm text-green-600 bg-green-50 p-4 rounded-lg text-center">
              <p className="font-medium mb-1">Check your email</p>
              <p className="text-xs">We've sent a password reset link to {email}</p>
            </div>
            <button
              onClick={() => router.push('/sign-in')}
              className="w-full rounded-2xl bg-black text-white py-3 text-sm font-medium shadow-md hover:bg-slate-900 transition"
            >
              Back to sign in
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleResetPassword}>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Your Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition"
                placeholder="you@example.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !isLoaded}
              className="w-full mt-2 rounded-2xl bg-black text-white py-3 text-sm font-medium shadow-md hover:bg-slate-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>
        )}

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Remember your password?{' '}
          <a href="/sign-in" className="font-semibold text-black hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}

