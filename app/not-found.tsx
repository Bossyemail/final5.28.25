import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-24">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <h1 className="text-4xl font-extrabold mb-2 text-sidebar-foreground">404 – Just like that buyer, this page ghosted us.</h1>
        <p className="text-lg text-sidebar-foreground/80 mb-6">
          We looked everywhere — inbox, spam folder, even behind the drywall. No luck.<br />
          Let's try a better address.
        </p>
        <Link href="/" className="inline-block px-8 py-3 rounded-full bg-black text-white font-semibold text-base transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
          👉 Take me home
        </Link>
      </div>
    </main>
  );
} 