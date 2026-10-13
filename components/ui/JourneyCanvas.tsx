"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { JourneyScene } from "@/components/journey/JourneyScene";

const STAGE_OPACITIES = [0.9, 0.48, 0.42, 0.42, 0.44] as const;

export default function JourneyCanvas({ stage }: { stage: number }) {
  const safeStage = Math.min(
    Math.max(stage, 0),
    STAGE_OPACITIES.length - 1,
  );
  const lowerStage = Math.floor(safeStage);
  const upperStage = Math.ceil(safeStage);
  const opacityProgress = safeStage - lowerStage;
  const sceneOpacity =
    STAGE_OPACITIES[lowerStage] +
    (STAGE_OPACITIES[upperStage] - STAGE_OPACITIES[lowerStage]) *
      opacityProgress;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] hidden transition-opacity duration-700 lg:block"
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
  );
}
