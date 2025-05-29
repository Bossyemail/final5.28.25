import { useUser } from '@clerk/nextjs';
import { SubscriptionData } from '@/types/subscription';

export function useSubscription() {
  const { user } = useUser();
  
  const subscription = user?.unsafeMetadata?.subscription as SubscriptionData | undefined;
  
  const isSubscribed = subscription?.status === 'active' || subscription?.status === 'trialing';
  const isTrialing = subscription?.status === 'trialing';
  const isCanceled = subscription?.cancelAtPeriodEnd;
  
  return {
    subscription,
    isSubscribed,
    isTrialing,
    isCanceled,
  };
} 