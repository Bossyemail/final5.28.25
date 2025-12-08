"use client";
import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Toaster } from "sonner";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  
  return (
    <div className={`flex min-h-screen flex-col transition-all duration-300 ${
      isDashboard 
        ? 'bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-[#161616] dark:via-[#161616] dark:to-[#1a1a1a] text-zinc-900 dark:text-white' 
        : 'bg-white dark:bg-[#161616] text-zinc-900 dark:text-white'
    }`}>
      {!isDashboard && <Header />}
      <main className="flex-1">{children}</main>
      <Toaster position="top-center" richColors />
    </div>
  );
} 