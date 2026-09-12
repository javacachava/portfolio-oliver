"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { JourneyScene } from "@/components/journey/JourneyScene";

const STAGES = [
  { code: "01", label: "IDENTIDAD", detail: "security core" },
  { code: "02", label: "CLOUD", detail: "productos · infraestructura" },
  { code: "03", label: "PROTECCIÓN", detail: "riesgo · control" },
  { code: "04", label: "SCRUM", detail: "equipos · incrementos" },
  { code: "05", label: "STACK", detail: "Java · JS · Py · Sh" },
] as const;

export default function JourneyCanvas({ stage }: { stage: number }) {
  const safeStage = Math.min(Math.max(stage, 0), STAGES.length - 1);
  const activeStage = Math.round(safeStage);
  const active = STAGES[activeStage];
  const opacityStops = [0.94, 0.3, 0.3, 0.28, 0.3];
  const lowerStage = Math.floor(safeStage);
  const upperStage = Math.ceil(safeStage);
  const opacityProgress = safeStage - lowerStage;
  const sceneOpacity =
    opacityStops[lowerStage] +
    (opacityStops[upperStage] - opacityStops[lowerStage]) * opacityProgress;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[15] hidden transition-opacity duration-700 lg:block"
        style={{
          opacity: sceneOpacity,
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, transparent 44%, black 64%, black 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, transparent 44%, black 64%, black 100%)",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 6.8], fov: 42, near: 0.1, far: 80 }}
          dpr={[1, 1.5]}
          frameloop="always"
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: "high-performance",
          }}
          performance={{ min: 0.55 }}
          shadows={false}
        >
          <Suspense fallback={null}>
            <JourneyScene stage={safeStage} />
          </Suspense>
        </Canvas>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-5 top-1/2 z-20 hidden -translate-y-1/2 xl:flex xl:flex-col xl:items-end"
      >
        <div className="mb-3 rounded-lg border border-[#7042f8]/35 bg-[#070119]/80 px-3 py-2 text-right shadow-[0_0_28px_rgba(112,66,248,0.16)] backdrop-blur-md">
          <p className="font-mono text-[9px] tracking-[0.2em] text-[#b49bff]">
            JOURNEY // {active.code}
          </p>
          <p className="mt-1 font-mono text-[10px] font-semibold tracking-[0.12em] text-white">
            {active.label}
          </p>
          <p className="mt-0.5 font-mono text-[8px] text-cyan-200/70">
            {active.detail}
          </p>
        </div>

        <ol className="flex flex-col items-center gap-2 rounded-full border border-[#7042f8]/25 bg-[#070119]/65 px-2 py-3 backdrop-blur-md">
          {STAGES.map((item, index) => (
            <li
              key={item.code}
              className="relative grid h-3 w-3 place-items-center"
            >
              <span
                className={`block rounded-full transition-[width,height,background-color,box-shadow] duration-500 ${
                  index === activeStage
                    ? "h-2.5 w-2.5 bg-cyan-300 shadow-[0_0_12px_#67e8f9]"
                    : index < activeStage
                      ? "h-1.5 w-1.5 bg-[#a78bfa]"
                      : "h-1.5 w-1.5 bg-white/20"
                }`}
              />
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
