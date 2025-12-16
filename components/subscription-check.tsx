import { useSubscription } from "@/hooks/use-subscription";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const isAdmin = user?.publicMetadata?.isAdmin === true;

  useEffect(() => {
    if (showDialog) {
      // Pre-select Royalty plan (most popular) to reduce friction
      setSelectedPlan('royalty');
    }
  }, [showDialog]);

  const handleSubscribe = async () => {
    if (!selectedPlan) return;
    if (!isSignedIn) {
      router.push('/sign-up');
      return;
    }
    try {
      setIsLoading(true);
      const priceId = selectedPlan === 'lite' ? 'price_1S9zinEApsNPWe3PwzWoZfom' : 'price_1SMfAgEApsNPWe3P2oUBGwvg';
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAdmin) {
    return <>{children}</>;
  }

  if (isSubscribed || isTrialing) {
    return <>{children}</>;
  }

  // No free tier - users must subscribe to start their 14-day trial
  if (!isSubscribed && !isTrialing) {
    return (
      <>
        <div className="flex flex-col items-center justify-center space-y-6 p-8 md:p-12 text-center max-w-2xl mx-auto">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-black font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>Start Your 14-Day Free Trial</h2>
            <p className="text-lg text-black font-sans max-w-lg mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Get unlimited access to our email generator for 14 days. No charge during trial. Cancel anytime.
            </p>
          </div>
          
          {/* Example Preview */}
          <div className="bg-[#FBFBFB] dark:bg-[#1a1a1a] border border-[#E3E3E3] dark:border-[#292929] rounded-lg p-6 text-left max-w-lg w-full">
            <p className="text-sm text-[#ABABAB] dark:text-[#ABABAB] mb-2 uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>Example</p>
            <p className="text-sm text-[#505050] dark:text-[#ABABAB] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              "Help me follow up on missing inspection documents"
            </p>
            <div className="bg-white dark:bg-[#161616] border border-[#E3E3E3] dark:border-[#292929] rounded p-4">
              <p className="text-xs text-[#ABABAB] dark:text-[#ABABAB] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Subject:</p>
              <p className="text-sm text-[#161616] dark:text-white mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Follow-Up: Inspection Documents</p>
              <p className="text-xs text-[#ABABAB] dark:text-[#ABABAB] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Body:</p>
              <p className="text-sm text-[#161616] dark:text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                Hi [Name],<br />
                Following up on the inspection documents we discussed. Please send them over so we can proceed...
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowDialog(true)}
            className="!bg-black !text-white rounded-full font-semibold font-sans px-8 py-4 mt-2 shadow hover:!bg-zinc-900 transition-colors text-lg"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Start Free Trial →
          </button>
          <p className="text-xs text-[#ABABAB] dark:text-[#ABABAB]" style={{ fontFamily: 'Inter, sans-serif' }}>
            No credit card charged during trial. Cancel anytime.
          </p>
        </div>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="font-sans rounded-2xl flex flex-col items-center justify-center" style={{ fontFamily: 'Inter, sans-serif', background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px 0 rgba(80,60,80,0.10)', padding: 0, minWidth: 320, width: '100%', maxWidth: 520 }}>
            <DialogHeader className="w-full px-6 pt-6">
              <DialogTitle 
                className="text-2xl sm:text-3xl font-extrabold text-black text-center mt-2 mb-2"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}
              >
                Pick Your Plan
              </DialogTitle>
              <DialogDescription 
                className="text-base sm:text-lg text-zinc-600 text-center mb-6 mx-auto"
                style={{ fontFamily: 'Inter, sans-serif', maxWidth: 420, fontWeight: 400, lineHeight: 1.5 }}
              >
                Start your 14-day free trial. No charge during trial. Cancel anytime.
              </DialogDescription>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4 mx-6">
                <p className="text-sm text-green-800 dark:text-green-200 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                  ✓ 14 days free • ✓ Unlimited emails • ✓ Cancel anytime
                </p>
              </div>
            </DialogHeader>
            <form className="flex flex-col gap-6 mt-2 px-2 pb-2 w-full" onSubmit={e => { e.preventDefault(); handleSubscribe(); }}>
              {/* Plan Options */}
              <div className="flex flex-col gap-4">
                {/* Lite Plan */}
                <label htmlFor="plan-lite" className={`flex items-center gap-4 rounded-2xl border-2 transition-all cursor-pointer p-5 bg-white shadow-sm w-full ${selectedPlan === 'lite' ? 'border-black ring-2 ring-black' : 'border-zinc-200 hover:border-zinc-400'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  <input
                    type="radio"
                    id="plan-lite"
                    name="plan"
                    value="lite"
                    checked={selectedPlan === 'lite'}
                    onChange={() => setSelectedPlan('lite')}
                    className="form-radio w-5 h-5 accent-black border-zinc-400"
                  />
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-lg font-semibold text-black">Inbox Lite</span>
                      <span className="text-xl font-bold text-black">$29<span className="text-base font-normal text-zinc-700">/mo</span></span>
                    </div>
                    <span className="text-sm text-zinc-700 mt-1">Gives you access to our AI-powered, smart email generator—no fluff, just fast, polished replies for the daily grind.</span>
                  </div>
                </label>
                {/* Royalty Plan */}
                <div className="relative w-full">
                  {/* Most Popular Badge */}
                  <span className="absolute -top-3 right-4 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full z-10" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.02em' }}>Most Popular</span>
                  <label htmlFor="plan-royalty" className={`flex items-center gap-4 rounded-2xl border-2 transition-all cursor-pointer p-5 bg-white shadow-sm w-full ${selectedPlan === 'royalty' ? 'border-black ring-2 ring-black' : 'border-zinc-200 hover:border-zinc-400'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    <input
                      type="radio"
                      id="plan-royalty"
                      name="plan"
                      value="royalty"
                      checked={selectedPlan === 'royalty'}
                      onChange={() => setSelectedPlan('royalty')}
                      className="form-radio w-5 h-5 accent-black border-zinc-400"
                    />
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-lg font-semibold text-black">Inbox Royalty</span>
                        <span className="text-xl font-bold text-black">$39<span className="text-base font-normal text-zinc-700">/mo</span></span>
                      </div>
                      <span className="text-sm text-zinc-700 mt-1">Gives you the full suite: email generator, custom and built-in templates, saved files, and more.</span>
                    </div>
                  </label>
                </div>
              </div>
              {/* CTA Button */}
              <Button
                type="submit"
                className="w-full bg-black text-white rounded-full py-3 font-semibold text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Inter, sans-serif', boxShadow: 'none' }}
                disabled={!selectedPlan || isLoading}
              >
                {isLoading ? 'Loading...' : 'Start 14-Day Free Trial →'}
              </Button>
              {/* Legal Text */}
              <div className="text-xs text-zinc-500 text-center mt-2 mb-1" style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>
                By subscribing, you agree to our <a href="/terms" className="underline hover:text-black">Terms</a> and <a href="/privacy" className="underline hover:text-black">Privacy Policy</a>.
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return <>{children}</>;
} 