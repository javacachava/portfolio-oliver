"use client";

import {
  Points,
  PointMaterial,
  type PointsInstancesProps,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useEffect, useState, useRef, Suspense } from "react";
import type { Points as PointsType } from "three";

export const StarBackground = (props: PointsInstancesProps) => {
  const ref = useRef<PointsType | null>(null);
  // 5001 = múltiplo de 3 (x,y,z); 5000 deja un punto incompleto con NaN
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5001), { radius: 1.2 }),
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={new Float32Array(sphere)}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => {
  const [shown, setShown] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  // Entra con fade y deja de renderizar con la pestaña oculta.
  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    const timeoutId = window.setTimeout(() => setShown(true), 60);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className="w-full h-auto fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: shown ? 1 : 0, transition: "opacity 900ms ease-out" }}
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        frameloop={tabVisible ? "always" : "never"}
      >
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
      </Canvas>
    </div>
  );
};
