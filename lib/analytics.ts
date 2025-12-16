// Analytics utility for tracking events
'use client'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export type AnalyticsEvent = 
  | 'page_view'
  | 'sign_up'
  | 'sign_in'
  | 'trial_started'
  | 'subscription_started'
  | 'subscription_canceled'
  | 'email_generated'
  | 'email_copied'
  | 'email_sent'
  | 'template_used'
  | 'favorite_added'
  | 'checkout_started'
  | 'checkout_completed'
  | 'checkout_canceled'
  | 'pricing_viewed'
  | 'feature_viewed'
  | 'cta_clicked';

export interface AnalyticsEventData {
  event: AnalyticsEvent;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: number;
}

// Track event to both Google Analytics and our backend
export function trackEvent(event: AnalyticsEvent, properties?: Record<string, any>) {
  const eventData: AnalyticsEventData = {
    event,
    properties,
    timestamp: Date.now(),
  };

  // Track in Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, {
      ...properties,
      timestamp: Date.now(),
    });
  }

  // Track in our backend
  if (typeof window !== 'undefined') {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    }).catch((err) => {
      console.error('Analytics tracking error:', err);
    });
  }
}

// Track page views
export function trackPageView(path: string, title?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: path,
      page_title: title,
    });
  }

  trackEvent('page_view', {
    path,
    title,
  });
}

// Convenience functions for common events
export const analytics = {
  signUp: (method: 'email' | 'google' | 'apple' | 'facebook') => {
    trackEvent('sign_up', { method });
  },
  signIn: (method: 'email' | 'google' | 'apple' | 'facebook') => {
    trackEvent('sign_in', { method });
  },
  trialStarted: (planId: string) => {
    trackEvent('trial_started', { planId });
  },
  subscriptionStarted: (planId: string, amount: number) => {
    trackEvent('subscription_started', { planId, amount });
  },
  subscriptionCanceled: (planId: string) => {
    trackEvent('subscription_canceled', { planId });
  },
  emailGenerated: (length: number, tone?: string) => {
    trackEvent('email_generated', { length, tone });
  },
  emailCopied: () => {
    trackEvent('email_copied');
  },
  emailSent: () => {
    trackEvent('email_sent');
  },
  templateUsed: (templateId: string, category?: string) => {
    trackEvent('template_used', { templateId, category });
  },
  favoriteAdded: (templateId: string) => {
    trackEvent('favorite_added', { templateId });
  },
  checkoutStarted: (planId: string, amount: number) => {
    trackEvent('checkout_started', { planId, amount });
  },
  checkoutCompleted: (planId: string, amount: number, subscriptionId: string) => {
    trackEvent('checkout_completed', { planId, amount, subscriptionId });
  },
  checkoutCanceled: (planId: string) => {
    trackEvent('checkout_canceled', { planId });
  },
  pricingViewed: () => {
    trackEvent('pricing_viewed');
  },
  featureViewed: (featureName: string) => {
    trackEvent('feature_viewed', { featureName });
  },
  ctaClicked: (ctaLocation: string, ctaText: string) => {
    trackEvent('cta_clicked', { location: ctaLocation, text: ctaText });
  },
};
