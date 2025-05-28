"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface TrialButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  label?: string;
}

export function TrialButton({ variant = "default", size = "default", className = "", label = "Let's Fix Your Emails" }: TrialButtonProps) {
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

  return (
    <Button
      onClick={handleSubscribe}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={className}
    >
      {isLoading ? 'Loading...' : label}
    </Button>
  );
} 