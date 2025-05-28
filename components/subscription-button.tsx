import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function SubscriptionButton() {
  const { isSubscribed, isTrialing, isCanceled } = useSubscription();
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleSubscribe = async () => {
    if (!isSignedIn) {
      router.push('/sign-up');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: 'price_1RSlGrEApsNPWe3P5R6MkIAY' }),
      });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="space-y-2">
        <Button disabled>
          {isTrialing ? 'Trial Active' : 'Subscribed'}
        </Button>
        {isCanceled && (
          <p className="text-sm text-muted-foreground">
            Your subscription will end at the end of the billing period
          </p>
        )}
      </div>
    );
  }

  return (
    <Button onClick={handleSubscribe} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Subscribe Now'}
    </Button>
  );
} 