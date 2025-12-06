import Link from "next/link";
import { Header } from "@/components/header";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex flex-col items-center justify-center px-4 py-24">
        <div className="bg-white border border-[#E3E3E3] rounded-none p-8 max-w-lg w-full text-center">
          <h1 className="display-6 sm:display-7 md:display-8 mb-4 text-[#161616]" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 400, lineHeight: '1.25em', letterSpacing: '-0.02em' }}>404 – Just like that buyer, this page ghosted us.</h1>
          <p className="paragraph-default text-[#505050] mb-6" style={{ fontFamily: 'var(--font-inter-tight), sans-serif', lineHeight: '1.5em' }}>
            We looked everywhere — inbox, spam folder, even behind the drywall. No luck.<br />
            Let's try a better address.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-[#161616] hover:bg-[#292929] text-white text-sm font-medium px-8 py-4 rounded-none uppercase tracking-wide transition-all duration-200 inline-flex items-center justify-center gap-2 h-12 group"
            style={{ fontFamily: 'var(--font-inter-tight), sans-serif', fontWeight: 500 }}
          >
            Take me home
          </Link>
        </div>
      </main>
    </div>
  );
}
