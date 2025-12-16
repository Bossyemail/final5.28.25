'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', error)
    }
    // In production, you could log to an error reporting service here
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#161616] px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white dark:bg-[#1a1a1a] border border-[#E3E3E3] dark:border-[#292929] rounded-none p-8">
          <h1 className="display-6 mb-4 text-[#161616] dark:text-white" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
            Something went wrong
          </h1>
          <p className="paragraph-default text-[#505050] dark:text-[#ABABAB] mb-6" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
            We encountered an unexpected error. Don't worry, your data is safe.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <details className="mb-6 text-left">
              <summary className="text-sm text-[#ABABAB] cursor-pointer mb-2">Error details</summary>
              <pre className="text-xs text-[#505050] dark:text-[#ABABAB] bg-[#FBFBFB] dark:bg-[#1a1a1a] p-3 rounded overflow-auto">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={reset}
              className="bg-[#161616] hover:bg-[#292929] text-white px-6 py-3 rounded-none"
            >
              Try Again
            </Button>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="border-[#E3E3E3] dark:border-[#292929] px-6 py-3 rounded-none"
              >
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
