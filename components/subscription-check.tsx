import { useSubscription } from "@/hooks/use-subscription";
import { useEmailUsage } from "@/hooks/use-email-usage";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SubscriptionCheckProps {
  children: React.ReactNode;
}

export function SubscriptionCheck({ children }: SubscriptionCheckProps) {
  const { isSubscribed, isTrialing } = useSubscription();
  const { hasReachedLimit } = useEmailUsage();
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
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

  if (isSubscribed || isTrialing) {
    return <>{children}</>;
  }

  if (hasReachedLimit) {
    return (
      <>
        <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
          <h2 className="text-2xl font-bold">Upgrade to Continue</h2>
          <p className="text-muted-foreground max-w-md">
            You've reached your free email generation limit. Start your free trial to continue creating professional emails.
          </p>
          <Button onClick={() => setShowDialog(true)} size="lg">
            Let&apos;s Fix Your Emails
          </Button>
        </div>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ready to Boss Your Inbox?</DialogTitle>
              <DialogDescription>
                Get unlimited access to our smart email generator and start creating professional emails in seconds.
                Just Try It.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end">
              <Button onClick={handleSubscribe} disabled={isLoading}>
                {isLoading ? 'Loading...' : "Let's Fix Your Emails"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return <>{children}</>;
} 