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
            Reset your password
          </h1>
          <p 
            className="paragraph-default text-[#505050] dark:text-[#ABABAB]"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
          >
            Enter your email address and we'll send you a reset link
          </p>
        </div>

        {/* Form */}
        {success ? (
          <div className="space-y-4">
            <div className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-none text-center">
              <p className="font-medium mb-1">Check your email</p>
              <p className="text-xs">We've sent a password reset link to {email}</p>
            </div>
            <button
              onClick={() => router.push('/sign-in')}
              className="w-full rounded-none bg-[#161616] dark:bg-white text-white dark:text-[#161616] py-3 text-sm font-medium hover:bg-[#292929] dark:hover:bg-[#FBFBFB] transition uppercase tracking-wide"
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
            >
              Back to sign in
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleResetPassword}>
            {error && (
              <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded-none">
                {error}
              </div>
            )}

            <div>
              <label 
                className="block text-sm font-medium text-[#161616] dark:text-white mb-1"
                style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
              >
                Your Email Address
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

            <button
              type="submit"
              disabled={loading || !isLoaded}
              className="w-full mt-2 rounded-none bg-[#161616] dark:bg-white text-white dark:text-[#161616] py-3 text-sm font-medium hover:bg-[#292929] dark:hover:bg-[#FBFBFB] transition disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
              style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
            >
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>
        )}

        {/* Footer */}
        <p 
          className="mt-6 text-center paragraph-small text-[#505050] dark:text-[#ABABAB]"
          style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
        >
          Remember your password?{' '}
          <a 
            href="/sign-in" 
            className="font-medium text-[#161616] dark:text-white hover:underline"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}

