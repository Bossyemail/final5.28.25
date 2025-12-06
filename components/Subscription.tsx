import { useSubscription } from "@/hooks/use-subscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

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
        body: JSON.stringify({ priceId: 'price_1SMfAgEApsNPWe3P2oUBGwvg' }),
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
    <div className="w-full pl-8 pr-8 sm:pl-4 sm:pr-4" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
      <div className="max-w-2xl mx-auto py-8">
        <h2 className="text-2xl font-normal mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400 }}>Subscription</h2>
        <p className="mb-6 text-sm text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
          Manage your subscription and billing details.
        </p>
        <div className="bg-white rounded-none border border-[#E3E3E3] p-6 w-full">
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium mb-1 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>Current Plan</div>
              <div className="mb-4 text-sm text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
            {isSubscribed ? (
              isTrialing ? (
                "You're currently in your free trial period"
              ) : (
                "You're currently on the paid plan"
              )
            ) : (
              "Start your free trial to unlock full access."
            )}
              </div>
            </div>
            {subscription && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>Status</span>
                  <span className="text-sm font-medium capitalize text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>{subscription.status}</span>
                </div>
                {subscription.currentPeriodEnd && (
                  <div className="flex justify-between">
                    <span className="text-sm text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
                    {isCanceled ? "Access until" : "Next billing date"}
                  </span>
                    <span className="text-sm font-medium text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
                    {new Date(subscription.currentPeriodEnd * 1000).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          )}
            <div>
          {isSubscribed ? (
                <Button onClick={handleManageSubscription} disabled={isLoading} className="w-full bg-[#161616] text-white rounded-none px-4 py-2 font-medium text-sm text-center flex items-center justify-center gap-2 hover:bg-[#292929] border border-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
                  {isLoading ? 'Loading...' : <><span>Manage Subscription</span> <ArrowUpRight size={16} /></>}
            </Button>
          ) : (
                <Button onClick={handleSubscribe} disabled={isLoading} className="w-full bg-[#161616] text-white rounded-none px-4 py-2 font-medium text-sm text-center flex items-center justify-center gap-2 hover:bg-[#292929] border border-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>
                  {isLoading ? 'Loading...' : <><span>Start Free Trial</span> <ArrowUpRight size={16} /></>}
            </Button>
          )}
            </div>
            <div className="mt-6">
              <div className="font-medium text-sm mb-2 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>What You Get (Beyond Your Sanity Back)</div>
              <ul className="mb-4 space-y-1.5 pl-0 text-sm text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
                <li>✨ Real-estate fluent emails, generated in seconds — complete, deal-specific, and written like a seasoned pro.</li>
                <li>💬 Smart, editable templates — polished communication without the "robot wrote this" feeling.</li>
                <li>🧠 Trained on real contracts + real chaos — FAR/BAR, addenda, inspections, financing delays, HOA black holes, and everything in between.</li>
                <li>🛠️ Tools that elevate your professionalism — even when you're writing emails from your car between showings.</li>
                <li>⏱️ More time for actual closings — less time rewriting "just following up…" for the hundredth time.</li>
              </ul>
              <div className="font-medium mb-1 text-sm text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}>Try It Free — No Card, No Commitment</div>
              <div className="text-sm text-[#505050] mb-2" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>Your first 3 emails are on us so you can see exactly why agents and TCs rely on BossyEmail every day.</div>
              <div className="text-sm text-[#505050]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>If you're going to pay for a tool, it should actually work — and make you look good while you use it.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 