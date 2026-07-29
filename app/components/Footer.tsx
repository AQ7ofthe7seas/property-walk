import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-slate-500">
      <p>&copy; 2026 PropertyWalk. All rights reserved.</p>
      <p className="mt-2">
        <Link href="/agent-portal" className="underline decoration-white/20 underline-offset-4 hover:text-champagne">
          Agent Portal
        </Link>
      </p>
    </footer>
  );
}
