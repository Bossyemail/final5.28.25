import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs';
import fs from 'fs';
import path from 'path';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

const ANALYTICS_FILE = path.join(process.cwd(), 'data', 'analytics.json');

function readAnalytics() {
  if (!fs.existsSync(ANALYTICS_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(ANALYTICS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const user = await clerkClient.users.getUser(userId);
    const isAdmin = user.publicMetadata?.isAdmin === true;
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const analytics = readAnalytics();
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      return date.toISOString().split('T')[0];
    }).reverse();
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      return date.toISOString().split('T')[0];
    }).reverse();

    // Filter events
    const todayEvents = analytics.filter((e: any) => e.date === today);
    const yesterdayEvents = analytics.filter((e: any) => e.date === yesterday);
    const last7DaysEvents = analytics.filter((e: any) => last7Days.includes(e.date));
    const last30DaysEvents = analytics.filter((e: any) => last30Days.includes(e.date));

    // Calculate stats
    const stats = {
      overview: {
        today: {
          pageViews: todayEvents.filter((e: any) => e.event === 'page_view').length,
          signUps: todayEvents.filter((e: any) => e.event === 'sign_up').length,
          signIns: todayEvents.filter((e: any) => e.event === 'sign_in').length,
          emailsGenerated: todayEvents.filter((e: any) => e.event === 'email_generated').length,
          checkoutsStarted: todayEvents.filter((e: any) => e.event === 'checkout_started').length,
          checkoutsCompleted: todayEvents.filter((e: any) => e.event === 'checkout_completed').length,
        },
        yesterday: {
          pageViews: yesterdayEvents.filter((e: any) => e.event === 'page_view').length,
          signUps: yesterdayEvents.filter((e: any) => e.event === 'sign_up').length,
          signIns: yesterdayEvents.filter((e: any) => e.event === 'sign_in').length,
          emailsGenerated: yesterdayEvents.filter((e: any) => e.event === 'email_generated').length,
          checkoutsStarted: yesterdayEvents.filter((e: any) => e.event === 'checkout_started').length,
          checkoutsCompleted: yesterdayEvents.filter((e: any) => e.event === 'checkout_completed').length,
        },
        last7Days: {
          pageViews: last7DaysEvents.filter((e: any) => e.event === 'page_view').length,
          signUps: last7DaysEvents.filter((e: any) => e.event === 'sign_up').length,
          signIns: last7DaysEvents.filter((e: any) => e.event === 'sign_in').length,
          emailsGenerated: last7DaysEvents.filter((e: any) => e.event === 'email_generated').length,
          checkoutsStarted: last7DaysEvents.filter((e: any) => e.event === 'checkout_started').length,
          checkoutsCompleted: last7DaysEvents.filter((e: any) => e.event === 'checkout_completed').length,
        },
        last30Days: {
          pageViews: last30DaysEvents.filter((e: any) => e.event === 'page_view').length,
          signUps: last30DaysEvents.filter((e: any) => e.event === 'sign_up').length,
          signIns: last30DaysEvents.filter((e: any) => e.event === 'sign_in').length,
          emailsGenerated: last30DaysEvents.filter((e: any) => e.event === 'email_generated').length,
          checkoutsStarted: last30DaysEvents.filter((e: any) => e.event === 'checkout_started').length,
          checkoutsCompleted: last30DaysEvents.filter((e: any) => e.event === 'checkout_completed').length,
        },
      },
      dailyBreakdown: last7Days.map(date => ({
        date,
        pageViews: analytics.filter((e: any) => e.date === date && e.event === 'page_view').length,
        signUps: analytics.filter((e: any) => e.date === date && e.event === 'sign_up').length,
        signIns: analytics.filter((e: any) => e.date === date && e.event === 'sign_in').length,
        emailsGenerated: analytics.filter((e: any) => e.date === date && e.event === 'email_generated').length,
        checkoutsCompleted: analytics.filter((e: any) => e.date === date && e.event === 'checkout_completed').length,
      })),
      events: {
        signUps: analytics.filter((e: any) => e.event === 'sign_up').length,
        signIns: analytics.filter((e: any) => e.event === 'sign_in').length,
        trialsStarted: analytics.filter((e: any) => e.event === 'trial_started').length,
        subscriptionsStarted: analytics.filter((e: any) => e.event === 'subscription_started').length,
        subscriptionsCanceled: analytics.filter((e: any) => e.event === 'subscription_canceled').length,
        emailsGenerated: analytics.filter((e: any) => e.event === 'email_generated').length,
        emailsCopied: analytics.filter((e: any) => e.event === 'email_copied').length,
        templatesUsed: analytics.filter((e: any) => e.event === 'template_used').length,
        checkoutsStarted: analytics.filter((e: any) => e.event === 'checkout_started').length,
        checkoutsCompleted: analytics.filter((e: any) => e.event === 'checkout_completed').length,
        checkoutsCanceled: analytics.filter((e: any) => e.event === 'checkout_canceled').length,
      },
    };

    // Get revenue from Stripe
    let revenue = {
      today: 0,
      yesterday: 0,
      last7Days: 0,
      last30Days: 0,
      total: 0,
    };

    try {
      const todayStart = new Date(today);
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date(today);
      todayEnd.setHours(23, 59, 59, 999);

      const yesterdayStart = new Date(yesterday);
      yesterdayStart.setHours(0, 0, 0, 0);
      const yesterdayEnd = new Date(yesterday);
      yesterdayEnd.setHours(23, 59, 59, 999);

      const last7DaysStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const last30DaysStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Get all successful payments
      const payments = await stripe.paymentIntents.list({
        limit: 100,
      });

      const successfulPayments = payments.data.filter(p => p.status === 'succeeded');
      
      revenue.total = successfulPayments.reduce((sum, p) => sum + (p.amount || 0), 0) / 100;
      
      revenue.today = successfulPayments
        .filter(p => {
          const created = new Date(p.created * 1000);
          return created >= todayStart && created <= todayEnd;
        })
        .reduce((sum, p) => sum + (p.amount || 0), 0) / 100;

      revenue.yesterday = successfulPayments
        .filter(p => {
          const created = new Date(p.created * 1000);
          return created >= yesterdayStart && created <= yesterdayEnd;
        })
        .reduce((sum, p) => sum + (p.amount || 0), 0) / 100;

      revenue.last7Days = successfulPayments
        .filter(p => {
          const created = new Date(p.created * 1000);
          return created >= last7DaysStart;
        })
        .reduce((sum, p) => sum + (p.amount || 0), 0) / 100;

      revenue.last30Days = successfulPayments
        .filter(p => {
          const created = new Date(p.created * 1000);
          return created >= last30DaysStart;
        })
        .reduce((sum, p) => sum + (p.amount || 0), 0) / 100;
    } catch (stripeError) {
      console.error('Stripe revenue error:', stripeError);
    }

    return NextResponse.json({
      ...stats,
      revenue,
      generatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Analytics stats error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
