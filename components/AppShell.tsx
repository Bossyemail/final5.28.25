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
        ? 'bg-gradient-to-br from-zinc-50 via-white to-zinc-100 text-zinc-900' 
        : 'bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 text-white'
    }`}>
      {!isDashboard && <Header />}
      <main className="flex-1">{children}</main>
      <Toaster position="top-center" richColors />
    </div>
  );
} 