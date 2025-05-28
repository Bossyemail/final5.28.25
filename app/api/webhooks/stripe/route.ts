import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { clerkClient } from '@clerk/nextjs';
import { SubscriptionData } from '@/types/subscription';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

// This is your Stripe webhook secret for testing your endpoint locally.
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

async function updateUserSubscription(
  userId: string,
  subscriptionData: SubscriptionData
) {
  try {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        subscription: subscriptionData,
      },
    });
  } catch (error) {
    console.error('Error updating user subscription:', error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        const subscriptionData: SubscriptionData = {
          status: subscription.status as SubscriptionData['status'],
          customerId: subscription.customer as string,
          subscriptionId: subscription.id,
          priceId: subscription.items.data[0].price.id,
          currentPeriodEnd: subscription.current_period_end,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        };

        // Get user ID from metadata
        const userId = session.metadata?.userId;
        if (!userId) {
          throw new Error('No user ID found in session metadata');
        }

        await updateUserSubscription(userId, subscriptionData);
        console.log('Subscription created for user:', userId);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;
        
        if (!userId) {
          throw new Error('No user ID found in subscription metadata');
        }

        const subscriptionData: SubscriptionData = {
          status: subscription.status as SubscriptionData['status'],
          customerId: subscription.customer as string,
          subscriptionId: subscription.id,
          priceId: subscription.items.data[0].price.id,
          currentPeriodEnd: subscription.current_period_end,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        };

        await updateUserSubscription(userId, subscriptionData);
        console.log('Subscription updated for user:', userId);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;
        
        if (!userId) {
          throw new Error('No user ID found in subscription metadata');
        }

        // Set subscription status to canceled
        const subscriptionData: SubscriptionData = {
          status: 'canceled',
          customerId: subscription.customer as string,
          subscriptionId: subscription.id,
          priceId: subscription.items.data[0].price.id,
          currentPeriodEnd: subscription.current_period_end,
          cancelAtPeriodEnd: true,
        };

        await updateUserSubscription(userId, subscriptionData);
        console.log('Subscription canceled for user:', userId);
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
} 