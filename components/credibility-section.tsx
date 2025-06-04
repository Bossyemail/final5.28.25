"use client"

import { Star, CheckCircle } from "lucide-react"
import { TryGeneratorCTA } from "./try-generator-cta"

export function FinalCTA() {
  return (
    <section className="w-full py-16 md:py-24 flex items-center justify-center font-sans bg-[#D1B4C6] dark:bg-[#efe1e1]">
      <div className="max-w-2xl w-full flex flex-col items-center text-center px-4">
        <h2 className="mb-2 text-black dark:text-black text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '20px' }}>
          Still drafting emails from scratch?
          <br />
          Let BossyEmail write them for you — free to try, no strings.
        </h2>
        <TryGeneratorCTA className="bg-black text-white rounded-full px-8 py-3 font-normal mt-4 dark:bg-white dark:text-[#212121] dark:hover:bg-[#f5f5f5] dark:border dark:border-[#424242]" label="Try the Generator" />
      </div>
    </section>
  );
} 