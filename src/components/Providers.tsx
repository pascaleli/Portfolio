"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** reducedMotion="user": transforms are skipped for users who prefer reduced motion; opacity still resolves to visible. */
export default function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
