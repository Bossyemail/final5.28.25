"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function TryGeneratorCTA({ label = "Try the Email Generator", className = "" }: { label?: string, className?: string }) {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    if (!isSignedIn) {
      router.push("/sign-up?redirect_url=/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Button
      style={{
        background: '#000',
        color: '#fff',
        borderRadius: '9999px',
        fontWeight: 400,
        fontFamily: 'inherit, sans-serif',
        fontSize: '1rem',
        boxShadow: 'none',
        padding: '0.75rem 2rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
      className={className}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : label}
      <ArrowUpRight size={18} />
    </Button>
  );
} 