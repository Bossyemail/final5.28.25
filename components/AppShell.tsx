"use client";
import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Toaster } from "sonner";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  return (
    <div className="flex min-h-screen flex-col bg-white text-black dark:bg-[#757575] dark:text-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Toaster position="top-center" richColors />
    </div>
  );
} 