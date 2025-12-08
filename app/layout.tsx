import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import * as Sentry from "@sentry/nextjs"
import Script from "next/script"
import React from "react"
import AppShell from "@/components/AppShell"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

// Inter Tight is not available via next/font/google, so we'll use a local import or CSS
// For now, we can use Inter with tighter letter-spacing as an alternative
// Or we can add Inter Tight via CSS @import

export const metadata: Metadata = {
  title: "BossyEmail - Real Estate Emails That Don't Suck",
  description: "Generate professional, witty, and effective real estate emails in seconds. Built by real estate pros, not tech bros.",
  keywords: ["real estate", "email templates", "transaction coordinator", "real estate agent", "email generator", "AI email"],
  authors: [{ name: "BossyEmail Team" }],
  creator: "BossyEmail",
  publisher: "BossyEmail",
  icons: {
    icon: '/transparent 2.png',
    shortcut: '/transparent 2.png',
    apple: '/transparent 2.png',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bossyemail.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bossyemail.com',
    title: 'BossyEmail - Real Estate Emails That Don\'t Suck',
    description: 'Generate professional, witty, and effective real estate emails in seconds. Built by real estate pros, not tech bros.',
    siteName: 'BossyEmail',
    images: [
      {
        url: '/transparent 2.png',
        width: 512,
        height: 512,
        alt: 'BossyEmail Icon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BossyEmail - Real Estate Emails That Don\'t Suck',
    description: 'Generate professional, witty, and effective real estate emails in seconds. Built by real estate pros, not tech bros.',
    images: ['/transparent 2.png'],
    creator: '@bossyemail',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: 'light',
        variables: {
          colorBackground: '#ffffff',
          colorInputBackground: '#ffffff',
          colorText: '#161616',
          colorTextSecondary: '#505050',
          colorPrimary: '#161616',
        },
      }}
    >
      <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }} suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const theme = localStorage.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                })();
              `,
            }}
          />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/transparent 2.png" type="image/png" />
          <link rel="apple-touch-icon" href="/transparent 2.png" />
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
          </Script>
        </head>
        <body className={inter.className} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
          <AppShell>{children}</AppShell>
        </body>
      </html>
    </ClerkProvider>
  )
}
