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
    <div className="w-full pl-32 pr-16 sm:pl-8 sm:pr-4 xs:pl-2 xs:pr-2 dark:bg-[#424242] dark:text-[#e0e0e0]" style={{ fontFamily: 'Inter, sans-serif', color: '#232326', WebkitFontSmoothing: 'antialiased' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 dark:text-[#e0e0e0]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#232326' }}>Subscription</h2>
        <p className="mb-6 sm:text-lg dark:text-[#e0e0e0]" style={{ fontWeight: 400, fontSize: '18px' }}>
          Manage your subscription and billing information.<br />
          You're not just managing transactions — you're managing chaos. Let us help.
        </p>
        <p className="mb-8 sm:text-lg dark:text-[#e0e0e0]" style={{ fontWeight: 400, fontSize: '18px' }}>
          Whether you're a solo agent buried in follow-ups or a TC juggling ten contracts and a meltdown, BossyEmail is here to make sure your inbox runs like a closing table on caffeine.<br />
          Choose your plan, and let's get to work.
        </p>
        <div className="bg-white dark:bg-[#424242] rounded-2xl shadow-xl p-8 mb-8 w-full">
          <div className="space-y-6">
            <div>
              <div className="text-lg font-semibold mb-1 dark:text-[#e0e0e0]" style={{ fontWeight: 600 }}>Current Plan</div>
              <div className="mb-6 dark:text-[#e0e0e0]" style={{ fontWeight: 400, fontSize: '18px' }}>
                {isSubscribed ? (
                  isTrialing ? (
                    "You're currently in your free trial period"
                  ) : (
                    "You're currently on the paid plan"
                  )
                ) : (
                  "Start your free trial to get unlimited access"
                )}
              </div>
            </div>
            {subscription && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="dark:text-[#e0e0e0]" style={{ fontWeight: 400, fontSize: '18px' }}>Status</span>
                  <span className="font-semibold capitalize dark:text-[#e0e0e0]" style={{ fontWeight: 600, fontSize: '18px' }}>{subscription.status}</span>
                </div>
                {subscription.currentPeriodEnd && (
                  <div className="flex justify-between">
                    <span className="dark:text-[#e0e0e0]" style={{ fontWeight: 400, fontSize: '18px' }}>
                      {isCanceled ? "Access until" : "Next billing date"}
                    </span>
                    <span className="font-semibold dark:text-[#e0e0e0]" style={{ fontWeight: 600, fontSize: '18px' }}>
                      {new Date(subscription.currentPeriodEnd * 1000).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            )}
            <div>
              {isSubscribed ? (
                <Button onClick={handleManageSubscription} disabled={isLoading} size="lg" className="w-1/2 mx-auto block bg-black text-white rounded-full px-8 py-3 font-medium text-base text-center flex items-center justify-center gap-2 dark:bg-white dark:text-[#212121] dark:hover:bg-[#f5f5f5] dark:border dark:border-[#424242]" style={{ fontWeight: 500 }}>
                  {isLoading ? 'Loading...' : <><span>Manage Subscription</span> <ArrowUpRight size={20} /></>}
                </Button>
              ) : (
                <Button onClick={handleSubscribe} disabled={isLoading} size="lg" className="w-1/2 mx-auto block bg-black text-white rounded-full px-8 py-3 font-medium text-base text-center flex items-center justify-center gap-2 dark:bg-white dark:text-[#212121] dark:hover:bg-[#f5f5f5] dark:border dark:border-[#424242]" style={{ fontWeight: 500 }}>
                  {isLoading ? 'Loading...' : <><span>Start Free Trial</span> <ArrowUpRight size={20} /></>}
                </Button>
              )}
            </div>
            <div className="mt-8" style={{ fontWeight: 400, fontSize: '18px' }}>
              <div className="font-semibold text-lg mb-2 dark:text-[#e0e0e0]" style={{ fontWeight: 600 }}>What You Get (Besides Your Sanity Back)</div>
              <ul className="mb-4 space-y-1 pl-0 dark:text-[#e0e0e0]">
                <li>✍️ Real estate-specific emails, generated in seconds</li>
                <li>💬 Smart, editable templates that don't sound like a robot wrote them</li>
                <li>🧠 A brain trained on FAR/BAR, addenda, awkward inspections, and ghosting clients</li>
                <li>🛠️ Tools that make you look pro — even when you're in leggings answering emails from your car</li>
                <li>⏱️ More time for closings, less time rewriting "just following up..." for the 100th time.</li>
              </ul>
              <div className="font-semibold mb-1 dark:text-[#e0e0e0]" style={{ fontWeight: 600 }}>Try It Free — No Strings, No Card, No BS</div>
              <div className="dark:text-[#e0e0e0]">We'll give you 3 emails on the house so you can see what the hype's about.</div>
              <div className="mt-2 text-sm dark:text-[#e0e0e0]" style={{ fontWeight: 400, fontSize: '16px' }}>Because if you're gonna pay for a tool, it should actually work. (And look good doing it.)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 