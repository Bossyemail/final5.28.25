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
import { ArrowUpRight } from "lucide-react";

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
          <h2 className="text-2xl font-bold text-black font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>Upgrade to Continue</h2>
          <p className="text-base text-black font-sans max-w-md" style={{ fontFamily: 'Inter, sans-serif' }}>
            You've reached your free email generation limit. Choose a plan to keep creating professional emails.
          </p>
          <button
            onClick={() => setShowDialog(true)}
            className="bg-black text-white rounded-full font-semibold font-sans px-6 py-3 mt-2 shadow hover:bg-zinc-900 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem' }}
          >
            See Plans
          </button>
        </div>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="font-sans" style={{ fontFamily: 'Inter, sans-serif', background: '#fff', borderRadius: 20, boxShadow: '0 8px 32px 0 rgba(80,60,80,0.10)', padding: 0, minWidth: 420, maxWidth: 520 }}>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-black mb-1 text-left" style={{ fontFamily: 'Inter, sans-serif' }}>Pick Your Plan</DialogTitle>
              <DialogDescription className="text-base text-zinc-700 mb-4 text-left" style={{ fontFamily: 'Inter, sans-serif' }}>
                Get unlimited access to our smart email generator and more. Choose the plan that fits your workflow.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-8 mt-2 px-1 pb-2">
              {/* Inbox Lite Plan */}
              <div className="border border-zinc-200 rounded-2xl p-6 flex flex-col items-start bg-white shadow-sm w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-lg font-semibold text-black">Inbox Lite</span>
                  <span className="text-xl font-bold text-black">$29<span className="text-base font-normal text-zinc-700">/mo</span></span>
                </div>
                <p className="text-sm mb-4 text-zinc-700 text-left">Gives you access to our AI-powered, smart email generator—no fluff, just fast, polished replies for the daily grind.</p>
                <Button
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-black hover:bg-zinc-900 text-white text-base font-semibold py-3 px-4 mt-1 shadow-none"
                  style={{ fontFamily: 'Inter, sans-serif', boxShadow: 'none' }}
                  disabled={isLoading}
                  onClick={async () => {
                    setIsLoading(true);
                    const response = await fetch('/api/create-checkout-session', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ priceId: 'price_1RSlDYEApsNPWe3PYQu3K9j1' }),
                    });
                    const { url } = await response.json();
                    window.location.href = url;
                  }}
                >
                  {isLoading ? 'Loading...' : <><span>Subscribe to Lite</span> <ArrowUpRight className="w-5 h-5 ml-1" /></>}
                </Button>
              </div>
              {/* Inbox Royalty Plan */}
              <div className="border border-zinc-200 rounded-2xl p-6 flex flex-col items-start bg-white shadow-sm w-full relative" style={{ fontFamily: 'Inter, sans-serif' }}>
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-lg font-semibold text-black">Inbox Royalty</span>
                  <span className="text-xl font-bold text-black">$59<span className="text-base font-normal text-zinc-700">/mo</span></span>
                </div>
                {/* Most Popular Badge */}
                <span className="absolute top-4 right-4 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.02em' }}>Most Popular</span>
                <p className="text-sm mb-4 text-zinc-700 text-left">Gives you the full suite: email generator, custom and built-in templates, saved files, and more.</p>
                <Button
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-black hover:bg-zinc-900 text-white text-base font-semibold py-3 px-4 mt-1 shadow-none"
                  style={{ fontFamily: 'Inter, sans-serif', boxShadow: 'none' }}
                  disabled={isLoading}
                  onClick={async () => {
                    setIsLoading(true);
                    const response = await fetch('/api/create-checkout-session', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ priceId: 'price_1RSlGrEApsNPWe3P5R6MkIAY' }),
                    });
                    const { url } = await response.json();
                    window.location.href = url;
                  }}
                >
                  {isLoading ? 'Loading...' : <><span>Subscribe to Royalty</span> <ArrowUpRight className="w-5 h-5 ml-1" /></>}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return <>{children}</>;
} 