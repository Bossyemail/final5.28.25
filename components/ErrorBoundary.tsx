'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    // You can log to an error reporting service here (e.g., Sentry)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/dashboard'
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

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
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="text-sm text-[#ABABAB] cursor-pointer mb-2">Error details</summary>
                  <pre className="text-xs text-[#505050] dark:text-[#ABABAB] bg-[#FBFBFB] dark:bg-[#1a1a1a] p-3 rounded overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={this.handleReset}
                  className="bg-[#161616] hover:bg-[#292929] text-white px-6 py-3 rounded-none"
                >
                  Go to Dashboard
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-[#E3E3E3] dark:border-[#292929] px-6 py-3 rounded-none"
                >
                  Reload Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
