"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyEmailButton({ email, className = "" }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };
  return (
    <>
      <button type="button" onClick={copy} className={className}>
        {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
        <span className="break-all">{copied ? "Copied!" : email}</span>
        <span className="sr-only"> (copy email address)</span>
      </button>
      <span role="status" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </>
  );
}
