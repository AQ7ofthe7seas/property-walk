import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { Reveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "Agent Portal | PropertyWalk",
  description: "Order history, downloads, and account management for PropertyWalk agents.",
};

export default function AgentPortalPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-2 self-start text-sm text-slate-400 transition-colors hover:text-champagne"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to PropertyWalk
      </Link>

      <Reveal>
        <div className="glass mx-auto flex h-14 w-14 items-center justify-center rounded-full">
          <LayoutDashboard className="h-6 w-6 text-gold" strokeWidth={1.5} />
        </div>
        <h1 className="font-display mt-6 text-3xl font-bold tracking-tight text-champagne">
          Agent Portal
        </h1>
        <p className="mt-4 text-slate-400">
          Account login, order history, and video downloads for agents are on the roadmap
          and not built yet. This route is a placeholder, not a working sign-in, wiring up
          real accounts needs an auth and data decision first.
        </p>
        <p className="mt-6">
          {/* Replace with your contact email */}
          <a
            href="mailto:[EMAIL_PLACEHOLDER]"
            className="font-semibold text-champagne underline decoration-white/20 underline-offset-4 transition-colors hover:text-gold"
          >
            Email us
          </a>
          <span className="text-slate-500"> to check on an existing order in the meantime.</span>
        </p>
      </Reveal>
    </div>
  );
}
