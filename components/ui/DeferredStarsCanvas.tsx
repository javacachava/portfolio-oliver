"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const StarsCanvas = dynamic(
  () => import("./StarsCanvas").then((module) => module.StarsCanvas),
  { ssr: false },
);

const JourneyCanvas = dynamic(() => import("./JourneyCanvas"), {
  ssr: false,
});

const JOURNEY_SECTIONS = [
  { selector: "#inicio", stage: 0 },
  { selector: "#proyectos", stage: 1 },
  { selector: "#seguridad", stage: 2 },
  { selector: "#experiencia", stage: 3 },
  { selector: "#skills", stage: 4 },
  { selector: "#premios", stage: 4 },
  { selector: "#sobre-mi", stage: 4 },
  { selector: "#contacto", stage: 4 },
] as const;

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
    addEventListener?: (type: string, listener: EventListener) => void;
    removeEventListener?: (type: string, listener: EventListener) => void;
  };
};

export default function DeferredStarsCanvas() {
  const [enabled, setEnabled] = useState(false);
  const [largeViewport, setLargeViewport] = useState(false);
  const [stage, setStage] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const connection = navigator as NavigatorWithConnection;
    const viewportQuery = window.matchMedia("(min-width: 1024px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timeoutId: number | undefined;

    const supportsWebGL = (() => {
      try {
        const canvas = document.createElement("canvas");
        const context =
          canvas.getContext("webgl2") || canvas.getContext("webgl");
        if (!window.WebGLRenderingContext || !context) return false;

        return true;
      } catch {
        return false;
      }
    })();

    const updateViewport = () => setLargeViewport(viewportQuery.matches);
    const updateEligibility = () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);

      if (
        !supportsWebGL ||
        connection.connection?.saveData ||
        motionQuery.matches
      ) {
        setEnabled(false);
        return;
      }

      timeoutId = window.setTimeout(() => setEnabled(true), 900);
    };

    updateViewport();
    updateEligibility();
    viewportQuery.addEventListener("change", updateViewport);
    motionQuery.addEventListener("change", updateEligibility);
    connection.connection?.addEventListener?.("change", updateEligibility);

    return () => {
      viewportQuery.removeEventListener("change", updateViewport);
      motionQuery.removeEventListener("change", updateEligibility);
      connection.connection?.removeEventListener?.("change", updateEligibility);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/" || !enabled || !largeViewport) return;

    const sections = JOURNEY_SECTIONS.flatMap(
      ({ selector, stage: sectionStage }) => {
        const element = document.querySelector<HTMLElement>(selector);
        return element ? [{ element, stage: sectionStage }] : [];
      },
    );

    if (sections.length === 0) return;

    const updateStage = () => {
      const focusLine = window.innerHeight * 0.46;
      const measuredSections = sections.map((section) => ({
        ...section,
        rect: section.element.getBoundingClientRect(),
      }));
      let currentIndex = measuredSections.findIndex(
        ({ rect }) => rect.top <= focusLine && rect.bottom > focusLine,
      );

      if (currentIndex === -1) {
        currentIndex = measuredSections.reduce((closestIndex, section, index) => {
          const closest = measuredSections[closestIndex];
          const closestDistance = Math.abs(
            closest.rect.top + closest.rect.height / 2 - focusLine,
          );
          const distance = Math.abs(
            section.rect.top + section.rect.height / 2 - focusLine,
          );
          return distance < closestDistance ? index : closestIndex;
        }, 0);
      }

      const current = measuredSections[currentIndex];
      const next = measuredSections
        .slice(currentIndex + 1)
        .find((section) => section.stage !== current.stage);
      let stagePosition = current.stage;

      if (next) {
        const transitionDistance = Math.max(
          1,
          Math.min(window.innerHeight * 0.55, current.rect.height * 0.35),
        );
        const transitionProgress = Math.min(
          Math.max(
            1 - (current.rect.bottom - focusLine) / transitionDistance,
            0,
          ),
          1,
        );
        const easedProgress =
          transitionProgress * transitionProgress * (3 - 2 * transitionProgress);
        stagePosition =
          current.stage + (next.stage - current.stage) * easedProgress;
      }

      setStage(stagePosition);
    };

    let animationFrameId: number | undefined;
    const scheduleStageUpdate = () => {
      if (animationFrameId !== undefined) return;

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = undefined;
        updateStage();
      });
    };

    const observer = new IntersectionObserver(scheduleStageUpdate, {
      rootMargin: "-34% 0px -46% 0px",
      threshold: 0,
    });

    sections.forEach(({ element }) => observer.observe(element));
    window.addEventListener("scroll", scheduleStageUpdate, { passive: true });
    window.addEventListener("resize", scheduleStageUpdate);
    updateStage();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleStageUpdate);
      window.removeEventListener("resize", scheduleStageUpdate);
      if (animationFrameId !== undefined) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [enabled, largeViewport, pathname]);

  if (!enabled) return null;

  if (pathname !== "/" || !largeViewport) {
    return <StarsCanvas />;
  }

  return <JourneyCanvas stage={stage} />;
}
