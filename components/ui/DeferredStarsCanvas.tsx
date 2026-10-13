"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const StarsCanvas = dynamic(
  () => import("./StarsCanvas").then((module) => module.StarsCanvas),
  { ssr: false },
);

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

export default function DeferredStarsCanvas() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const connection = navigator as NavigatorWithConnection;

    if (
      connection.connection?.saveData ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => setEnabled(true), 1800);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return enabled ? <StarsCanvas /> : null;
}
