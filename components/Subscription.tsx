import { useSubscription } from "@/hooks/use-subscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export function Subscription() {
  const { subscription, isSubscribed, isTrialing, isCanceled } = useSubscription();
  const [isLoading, setIsLoading] = useState(false);

  const handleManageSubscription = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
      });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async () => {
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

  return (
    <div className="space-y-6 text-center font-sans text-base text-sidebar-foreground">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-sidebar-foreground">Subscription</h3>
        <p className="text-sidebar-foreground/70 mb-6">
          Manage your subscription and billing information
        </p>
      </div>
      <Card className="mx-auto max-w-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-semibold text-sidebar-foreground">Current Plan</CardTitle>
          <CardDescription className="text-sidebar-foreground/70">
            {isSubscribed ? (
              isTrialing ? (
                "You're currently in your free trial period"
              ) : (
                "You're currently on the paid plan"
              )
            ) : (
              "Start your free trial to get unlimited access"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {subscription && (
            <div className="space-y-2 text-center">
              <div className="flex justify-between">
                <span className="text-sidebar-foreground/70">Status</span>
                <span className="text-sidebar-foreground font-semibold capitalize">{subscription.status}</span>
              </div>
              {subscription.currentPeriodEnd && (
                <div className="flex justify-between">
                  <span className="text-sidebar-foreground/70">
                    {isCanceled ? "Access until" : "Next billing date"}
                  </span>
                  <span className="text-sidebar-foreground font-semibold">
                    {new Date(subscription.currentPeriodEnd * 1000).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          {isSubscribed ? (
            <Button onClick={handleManageSubscription} disabled={isLoading} size="lg" className="w-full max-w-xs mx-auto bg-black text-white rounded-full px-8 py-3 font-semibold">
              {isLoading ? 'Loading...' : 'Manage Subscription'}
            </Button>
          ) : (
            <Button onClick={handleSubscribe} disabled={isLoading} size="lg" className="w-full max-w-xs mx-auto bg-black text-white rounded-full px-8 py-3 font-semibold">
              {isLoading ? 'Loading...' : 'Start Free Trial'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
} 