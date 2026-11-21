"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** Cycles through phrases. Screen readers get the full list once via an sr-only span. */
export default function Typewriter({ words, className = "" }: { words: string[]; className?: string }) {
  const reduce = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = words[i % words.length];
    let delay = deleting ? 35 : 70;
    if (!deleting && text === word) delay = 5000;
    if (deleting && text === "") delay = 300;
    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setI((n) => n + 1);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, words, reduce]);

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className={`caret ${className}`}>
        {reduce ? words[0] : text}
      </span>
    </>
  );
}
