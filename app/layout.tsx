import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"
import * as Sentry from "@sentry/nextjs"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BossyEmail - Real Estate Emails That Don't Suck",
  description: "Generate professional, witty, and effective real estate emails in seconds. Built by real estate pros, not tech bros.",
  keywords: ["real estate", "email templates", "transaction coordinator", "real estate agent", "email generator", "AI email"],
  authors: [{ name: "BossyEmail Team" }],
  creator: "BossyEmail",
  publisher: "BossyEmail",
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
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BossyEmail - Real Estate Email Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BossyEmail - Real Estate Emails That Don\'t Suck',
    description: 'Generate professional, witty, and effective real estate emails in seconds. Built by real estate pros, not tech bros.',
    images: ['/og-image.png'],
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
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.png" type="image/png" />
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
        <body className={inter.className}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Toaster position="top-center" richColors />
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
