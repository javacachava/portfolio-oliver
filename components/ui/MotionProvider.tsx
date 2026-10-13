"use client";

import { MotionConfig } from "framer-motion";

// Con "prefers-reduced-motion" las animaciones de transform se omiten y solo quedan los fades.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
