"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

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

  // Default to primary button style (black background, white text) if no className provided
  const defaultClassName = className || "bg-[#161616] hover:bg-[#292929] text-white";
  
  return (
    <Button
      className={`${defaultClassName} text-sm font-medium px-8 py-4 rounded-none transition-all duration-200 uppercase tracking-wide inline-flex items-center gap-2 h-12 group`}
      onClick={handleClick}
      disabled={isLoading}
      style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
    >
      {isLoading ? "Loading..." : label}
      {!isLoading && <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45" />}
    </Button>
  );
} 