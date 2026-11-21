import { ShieldCheck } from "lucide-react";
import { site } from "@/data/content";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-5 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6 lg:px-8">
        <p className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-brand" aria-hidden />
          © 2026 {site.fullName} · Accra, Ghana
        </p>
        <div className="flex items-center gap-2">
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className="grid h-10 w-10 place-items-center rounded-full border border-line transition hover:border-brand hover:bg-brand hover:text-white">
            <LinkedinIcon size={16} />
          </a>
          <a href={site.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className="grid h-10 w-10 place-items-center rounded-full border border-line transition hover:border-brand hover:bg-brand hover:text-white">
            <GithubIcon size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
