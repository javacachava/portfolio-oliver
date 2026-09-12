"use client";

import { Edges, Line, Sparkles } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { type ReactNode, useMemo, useRef } from "react";
import {
  Color,
  MathUtils,
  Object3D,
  Shape,
  type ExtrudeGeometryOptions,
  type Group,
  type InstancedMesh,
  type Mesh,
} from "three";

const STAGE_COUNT = 5;
const STAGE_SPACING = 7.2;
const TRACK_Y = -2.35;

const CORE_NODES = Array.from({ length: 8 }, (_, index) => {
  const angle = (index / 8) * Math.PI * 2;
  return [Math.cos(angle) * 1.82, Math.sin(angle) * 1.82, 0] as const;
});

const SECURITY_NODES = Array.from({ length: 10 }, (_, index) => {
  const angle = (index / 10) * Math.PI * 2;
  return [Math.cos(angle) * 2.02, Math.sin(angle) * 1.72, -0.2] as const;
});

const CLOUD_PARTS = [
  [-0.82, -0.08, 0.02, 0.72],
  [-0.28, 0.32, 0, 0.92],
  [0.48, 0.22, 0.02, 0.82],
  [0.92, -0.13, 0, 0.63],
  [0.08, -0.24, 0.08, 1.02],
] as const;

const CLOUD_NODES = [
  { position: [-1.78, 1.3, 0] as const, color: "#ffb224" },
  { position: [1.82, 1.14, 0] as const, color: "#4285f4" },
  { position: [1.6, -1.25, 0] as const, color: "#f38020" },
  { position: [-1.58, -1.34, 0] as const, color: "#22d3ee" },
] as const;

const LANGUAGE_NODES = [
  { position: [-1.42, 1.18, 0] as const, kind: "java" as const },
  { position: [1.42, 1.18, 0] as const, kind: "javascript" as const },
  { position: [-1.42, -1.13, 0] as const, kind: "python" as const },
  { position: [1.42, -1.13, 0] as const, kind: "shell" as const },
] as const;

const LANGUAGE_COLORS = {
  java: "#ef4444",
  javascript: "#f7df1e",
  python: "#4b8bbe",
  shell: "#4ade80",
} as const;

export type JourneySceneProps = {
  stage: number;
  reducedMotion?: boolean;
};

type StationProps = {
  index: number;
  stage: number;
  reducedMotion: boolean;
  accent: string;
  children: ReactNode;
};

function Station({
  index,
  stage,
  reducedMotion,
  accent,
  children,
}: StationProps) {
  const groupRef = useRef<Group>(null);
  const distance = Math.abs(stage - index);
  const focus = MathUtils.clamp(1 - distance, 0, 1);
  const targetScale = 0.76 + focus * 0.24;

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;

    if (reducedMotion) {
      groupRef.current.scale.setScalar(targetScale);
      groupRef.current.rotation.y = 0;
      return;
    }

    const time = clock.getElapsedTime();
    const scale = MathUtils.damp(
      groupRef.current.scale.x,
      targetScale,
      5,
      delta,
    );
    groupRef.current.scale.setScalar(scale);
    groupRef.current.rotation.y = MathUtils.damp(
      groupRef.current.rotation.y,
      (stage - index) * 0.08 + Math.sin(time * 0.45 + index) * 0.025,
      4,
      delta,
    );
  });

  return (
    <group ref={groupRef} position={[index * STAGE_SPACING, 0, 0]}>
      <mesh position={[0, 0, -1.25]}>
        <sphereGeometry args={[2.35, 24, 24]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.018 + focus * 0.02}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, TRACK_Y + 0.22, 0]}>
        <cylinderGeometry args={[0.36, 0.58, 0.18, 32]} />
        <meshStandardMaterial
          color="#09031e"
          emissive={accent}
          emissiveIntensity={0.45 + focus * 0.4}
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[0, TRACK_Y + 0.32, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.025, 8, 48]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>
      {children}
    </group>
  );
}

function DataTrack({ reducedMotion }: { reducedMotion: boolean }) {
  const pulsesRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const pulseColor = useMemo(() => new Color("#67e8f9"), []);
  const length = STAGE_SPACING * (STAGE_COUNT - 1);
  const pulseCount = 12;

  useFrame(({ clock }) => {
    if (!pulsesRef.current) return;

    const offset = reducedMotion ? 0 : clock.getElapsedTime() * 0.075;

    for (let index = 0; index < pulseCount; index += 1) {
      const progress = (index / pulseCount + offset) % 1;
      const pulse = 0.72 + Math.sin(progress * Math.PI) * 0.55;
      dummy.position.set(
        progress * length,
        TRACK_Y + Math.sin(progress * Math.PI * 8) * 0.04,
        0.01,
      );
      dummy.scale.setScalar(0.045 * pulse);
      dummy.updateMatrix();
      pulsesRef.current.setMatrixAt(index, dummy.matrix);
      pulsesRef.current.setColorAt(index, pulseColor);
    }

    pulsesRef.current.instanceMatrix.needsUpdate = true;
    if (pulsesRef.current.instanceColor) {
      pulsesRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group>
      <mesh position={[length / 2, TRACK_Y, 0]}>
        <boxGeometry args={[length, 0.018, 0.018]} />
        <meshBasicMaterial
          color="#7042f8"
          transparent
          opacity={0.65}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[length / 2, TRACK_Y - 0.1, -0.08]}>
        <boxGeometry args={[length, 0.01, 0.01]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.25}
          toneMapped={false}
        />
      </mesh>
      {Array.from({ length: STAGE_COUNT }, (_, index) => (
        <mesh
          key={index}
          position={[index * STAGE_SPACING, TRACK_Y + 0.16, 0]}
        >
          <cylinderGeometry args={[0.012, 0.012, 0.32, 8]} />
          <meshBasicMaterial color="#8b5cf6" toneMapped={false} />
        </mesh>
      ))}
      <instancedMesh
        ref={pulsesRef}
        args={[undefined, undefined, pulseCount]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#67e8f9" toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

function CorePortal({ reducedMotion }: { reducedMotion: boolean }) {
  const coreRef = useRef<Mesh>(null);
  const ringsRef = useRef<Group>(null);
  const nodesRef = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    if (!coreRef.current || !ringsRef.current || !nodesRef.current) return;

    if (reducedMotion) {
      coreRef.current.scale.setScalar(1);
      return;
    }

    const time = clock.getElapsedTime();
    coreRef.current.rotation.x += delta * 0.16;
    coreRef.current.rotation.y += delta * 0.28;
    coreRef.current.scale.setScalar(1 + Math.sin(time * 1.8) * 0.055);
    ringsRef.current.rotation.x += delta * 0.08;
    ringsRef.current.rotation.y -= delta * 0.12;
    nodesRef.current.rotation.z -= delta * 0.16;
  });

  return (
    <group position={[0, 0.05, 0]}>
      <group ref={ringsRef}>
        <mesh rotation={[0.28, 0.08, 0]}>
          <torusGeometry args={[1.48, 0.018, 8, 96]} />
          <meshBasicMaterial color="#a78bfa" toneMapped={false} />
        </mesh>
        <mesh rotation={[0.08, 0.7, 0.24]}>
          <torusGeometry args={[1.22, 0.013, 8, 80]} />
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.8}
            toneMapped={false}
          />
        </mesh>
        <mesh rotation={[0.82, 0.18, 0.4]}>
          <torusGeometry args={[0.96, 0.01, 8, 72]} />
          <meshBasicMaterial
            color="#ec4899"
            transparent
            opacity={0.62}
            toneMapped={false}
          />
        </mesh>
      </group>

      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.68, 2]} />
        <meshStandardMaterial
          color="#180a3d"
          emissive="#7042f8"
          emissiveIntensity={1.15}
          metalness={0.74}
          roughness={0.23}
          wireframe
        />
      </mesh>
      <mesh scale={0.48}>
        <octahedronGeometry args={[0.72, 0]} />
        <meshStandardMaterial
          color="#c4b5fd"
          emissive="#8b5cf6"
          emissiveIntensity={1.8}
          metalness={0.5}
          roughness={0.12}
        />
      </mesh>

      <group ref={nodesRef}>
        {CORE_NODES.map((position, index) => (
          <mesh key={index} position={position}>
            <octahedronGeometry args={[index % 2 === 0 ? 0.095 : 0.065, 0]} />
            <meshBasicMaterial
              color={index % 2 === 0 ? "#22d3ee" : "#c084fc"}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function SecurityVault({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<Group>(null);
  const scanRef = useRef<Mesh>(null);
  const pulseRef = useRef<Mesh>(null);
  const shield = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(0, 1.65);
    shape.lineTo(1.25, 1.08);
    shape.lineTo(1.08, -0.55);
    shape.quadraticCurveTo(0.9, -1.25, 0, -1.68);
    shape.quadraticCurveTo(-0.9, -1.25, -1.08, -0.55);
    shape.lineTo(-1.25, 1.08);
    shape.closePath();
    return shape;
  }, []);
  const extrude = useMemo<ExtrudeGeometryOptions>(
    () => ({
      depth: 0.16,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.06,
      bevelThickness: 0.05,
      curveSegments: 8,
    }),
    [],
  );

  useFrame(({ clock }, delta) => {
    if (!groupRef.current || !scanRef.current || !pulseRef.current) return;

    if (reducedMotion) {
      groupRef.current.rotation.y = -0.08;
      scanRef.current.position.y = 0;
      pulseRef.current.scale.setScalar(1);
      return;
    }

    const time = clock.getElapsedTime();
    groupRef.current.rotation.y = -0.08 + Math.sin(time * 0.55) * 0.1;
    scanRef.current.position.y = ((time * 0.72) % 3.2) - 1.6;
    const pulse = 1 + (Math.sin(time * 2.1) + 1) * 0.055;
    pulseRef.current.scale.setScalar(pulse);
    pulseRef.current.rotation.z -= delta * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, 0.02, 0]}>
      <mesh>
        <extrudeGeometry args={[shield, extrude]} />
        <meshStandardMaterial
          color="#0a2033"
          emissive="#06b6d4"
          emissiveIntensity={0.48}
          metalness={0.82}
          roughness={0.22}
          transparent
          opacity={0.92}
        />
        <Edges color="#67e8f9" threshold={10} />
      </mesh>

      <mesh ref={scanRef} position={[0, 0, 0.27]}>
        <boxGeometry args={[1.95, 0.025, 0.02]} />
        <meshBasicMaterial
          color="#5eead4"
          transparent
          opacity={0.9}
          toneMapped={false}
        />
      </mesh>

      <group position={[0, -0.16, 0.34]}>
        <mesh position={[0, 0.47, 0]}>
          <torusGeometry args={[0.39, 0.075, 12, 48, Math.PI]} />
          <meshStandardMaterial
            color="#b8f7ff"
            emissive="#22d3ee"
            emissiveIntensity={0.75}
            metalness={0.86}
            roughness={0.18}
          />
        </mesh>
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[0.88, 0.72, 0.24]} />
          <meshStandardMaterial
            color="#111827"
            emissive="#7042f8"
            emissiveIntensity={0.42}
            metalness={0.92}
            roughness={0.2}
          />
          <Edges color="#a78bfa" />
        </mesh>
        <mesh position={[0, 0.01, 0.135]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.085, 0.085, 0.035, 20]} />
          <meshBasicMaterial color="#67e8f9" toneMapped={false} />
        </mesh>
        <mesh position={[0, -0.15, 0.145]}>
          <boxGeometry args={[0.07, 0.22, 0.035]} />
          <meshBasicMaterial color="#67e8f9" toneMapped={false} />
        </mesh>
      </group>

      <mesh ref={pulseRef} position={[0, 0, -0.18]}>
        <torusGeometry args={[1.72, 0.022, 8, 84]} />
        <meshBasicMaterial
          color="#4ade80"
          transparent
          opacity={0.72}
          toneMapped={false}
        />
      </mesh>

      {SECURITY_NODES.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[index % 2 === 0 ? 0.065 : 0.04, 10, 10]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? "#4ade80" : "#22d3ee"}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function CloudConstellation({ reducedMotion }: { reducedMotion: boolean }) {
  const cloudRef = useRef<Group>(null);
  const orbitRef = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    if (!cloudRef.current || !orbitRef.current) return;

    if (reducedMotion) {
      cloudRef.current.rotation.y = -0.12;
      orbitRef.current.rotation.z = 0;
      return;
    }

    const time = clock.getElapsedTime();
    cloudRef.current.rotation.y = -0.12 + Math.sin(time * 0.42) * 0.12;
    cloudRef.current.position.y = 0.08 + Math.sin(time * 0.82) * 0.08;
    orbitRef.current.rotation.z -= delta * 0.075;
    orbitRef.current.rotation.y += delta * 0.045;
  });

  return (
    <group>
      <group ref={orbitRef}>
        <mesh rotation={[0.42, 0.22, 0.06]}>
          <torusGeometry args={[2.02, 0.015, 8, 96]} />
          <meshBasicMaterial
            color="#60a5fa"
            transparent
            opacity={0.66}
            toneMapped={false}
          />
        </mesh>
        <mesh rotation={[-0.36, 0.42, 0.08]}>
          <torusGeometry args={[1.72, 0.01, 8, 80]} />
          <meshBasicMaterial
            color="#a78bfa"
            transparent
            opacity={0.45}
            toneMapped={false}
          />
        </mesh>
      </group>

      <group ref={cloudRef} position={[0, 0.08, 0]}>
        {CLOUD_PARTS.map(([x, y, z, scale], index) => (
          <mesh key={index} position={[x, y, z]} scale={scale}>
            <sphereGeometry args={[0.7, 20, 20]} />
            <meshStandardMaterial
              color="#102c4d"
              emissive={index % 2 === 0 ? "#2563eb" : "#06b6d4"}
              emissiveIntensity={0.72}
              metalness={0.58}
              roughness={0.26}
              transparent
              opacity={0.91}
            />
            <Edges
              color={index % 2 === 0 ? "#60a5fa" : "#67e8f9"}
              threshold={25}
            />
          </mesh>
        ))}
        <mesh position={[0.08, 0.02, 0.7]}>
          <octahedronGeometry args={[0.31, 1]} />
          <meshStandardMaterial
            color="#dbeafe"
            emissive="#38bdf8"
            emissiveIntensity={1.7}
            metalness={0.4}
            roughness={0.12}
          />
        </mesh>
      </group>

      {CLOUD_NODES.map(({ position, color }, index) => (
        <group key={color}>
          <Line
            points={[position, [0, 0, 0]]}
            color={color}
            lineWidth={0.65}
            transparent
            opacity={0.54}
          />
          <mesh position={position} rotation={[0.35, index * 0.7, 0.18]}>
            <octahedronGeometry args={[0.22, 0]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1.15}
              metalness={0.6}
              roughness={0.18}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

type LanguageKind = keyof typeof LANGUAGE_COLORS;

function JavaSymbol() {
  return (
    <group position={[0, -0.05, 0.18]} scale={0.72}>
      <mesh position={[-0.08, -0.1, 0]}>
        <cylinderGeometry args={[0.34, 0.28, 0.48, 20]} />
        <meshStandardMaterial
          color="#fee2e2"
          emissive="#ef4444"
          emissiveIntensity={0.42}
          metalness={0.28}
          roughness={0.22}
        />
      </mesh>
      <mesh position={[0.3, -0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.17, 0.045, 8, 24]} />
        <meshBasicMaterial color="#fb7185" toneMapped={false} />
      </mesh>
      {[-0.16, 0.08, 0.28].map((x, index) => (
        <mesh
          key={x}
          position={[x, 0.43 + index * 0.035, 0]}
          rotation={[0, 0, index % 2 === 0 ? -0.18 : 0.18]}
        >
          <capsuleGeometry args={[0.024, 0.28, 4, 8]} />
          <meshBasicMaterial color="#fca5a5" toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function JavaScriptSymbol() {
  const pixels = [
    [-0.24, 0.24],
    [0, 0.24],
    [0, 0],
    [0, -0.24],
    [-0.24, -0.24],
    [0.3, 0.24],
    [0.52, 0.24],
    [0.3, 0],
    [0.52, -0.24],
    [0.3, -0.24],
  ] as const;

  return (
    <group position={[-0.12, 0, 0.18]} scale={0.72}>
      {pixels.map(([x, y], index) => (
        <mesh key={index} position={[x, y, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.08]} />
          <meshBasicMaterial color="#16120a" />
        </mesh>
      ))}
    </group>
  );
}

function PythonSymbol() {
  return (
    <group position={[0, 0, 0.2]} scale={0.75}>
      <mesh position={[-0.13, 0.16, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.17, 0.42, 6, 12]} />
        <meshStandardMaterial
          color="#4b8bbe"
          emissive="#2563eb"
          emissiveIntensity={0.62}
          metalness={0.35}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0.13, -0.16, 0.05]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.17, 0.42, 6, 12]} />
        <meshStandardMaterial
          color="#ffd43b"
          emissive="#f59e0b"
          emissiveIntensity={0.58}
          metalness={0.32}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[-0.3, 0.2, 0.17]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color="#e0f2fe" toneMapped={false} />
      </mesh>
      <mesh position={[0.3, -0.2, 0.22]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color="#fff7cc" toneMapped={false} />
      </mesh>
    </group>
  );
}

function ShellSymbol() {
  return (
    <group position={[0, 0, 0.19]} scale={0.78}>
      <mesh
        position={[-0.18, 0.05, 0]}
        rotation={[0, 0, -Math.PI / 4]}
      >
        <boxGeometry args={[0.09, 0.44, 0.08]} />
        <meshBasicMaterial color="#dcfce7" toneMapped={false} />
      </mesh>
      <mesh
        position={[-0.18, -0.2, 0]}
        rotation={[0, 0, Math.PI / 4]}
      >
        <boxGeometry args={[0.09, 0.44, 0.08]} />
        <meshBasicMaterial color="#dcfce7" toneMapped={false} />
      </mesh>
      <mesh position={[0.23, -0.3, 0]}>
        <boxGeometry args={[0.42, 0.08, 0.08]} />
        <meshBasicMaterial color="#86efac" toneMapped={false} />
      </mesh>
    </group>
  );
}

function LanguageNode({
  kind,
  position,
}: {
  kind: LanguageKind;
  position: readonly [number, number, number];
}) {
  const color = LANGUAGE_COLORS[kind];

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[1.12, 1.12, 0.16]} />
        <meshStandardMaterial
          color={kind === "javascript" ? "#d9be0f" : "#0c1228"}
          emissive={color}
          emissiveIntensity={kind === "javascript" ? 0.24 : 0.36}
          metalness={0.72}
          roughness={0.22}
          transparent
          opacity={0.96}
        />
        <Edges color={color} />
      </mesh>
      {kind === "java" && <JavaSymbol />}
      {kind === "javascript" && <JavaScriptSymbol />}
      {kind === "python" && <PythonSymbol />}
      {kind === "shell" && <ShellSymbol />}
      <mesh position={[0, -0.72, -0.08]}>
        <boxGeometry args={[0.72, 0.018, 0.018]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}

function LanguageOrbit({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current || !coreRef.current) return;

    if (reducedMotion) {
      groupRef.current.rotation.y = -0.08;
      coreRef.current.rotation.z = 0;
      return;
    }

    const time = clock.getElapsedTime();
    groupRef.current.rotation.y = -0.08 + Math.sin(time * 0.38) * 0.06;
    coreRef.current.rotation.x += delta * 0.2;
    coreRef.current.rotation.z -= delta * 0.28;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[0.35, 0.18, 0]}>
        <torusGeometry args={[2.06, 0.013, 8, 96]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.48}
          toneMapped={false}
        />
      </mesh>
      {LANGUAGE_NODES.map(({ position, kind }) => (
        <group key={kind}>
          <Line
            points={[position, [0, 0, -0.05]]}
            color={LANGUAGE_COLORS[kind]}
            lineWidth={0.5}
            transparent
            opacity={0.34}
          />
          <LanguageNode kind={kind} position={position} />
        </group>
      ))}
      <mesh ref={coreRef} position={[0, 0, -0.02]}>
        <dodecahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial
          color="#201044"
          emissive="#a855f7"
          emissiveIntensity={1.15}
          metalness={0.76}
          roughness={0.2}
          wireframe
        />
      </mesh>
      <mesh position={[0, 0, -0.08]} scale={0.52}>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshBasicMaterial color="#e9d5ff" toneMapped={false} />
      </mesh>
    </group>
  );
}

const BOARD_CARDS = [
  [-1.08, 0.38, "#22d3ee"],
  [-1.08, 0.04, "#60a5fa"],
  [-1.08, -0.3, "#a78bfa"],
  [0, 0.38, "#f59e0b"],
  [0, 0.04, "#c084fc"],
  [1.08, 0.38, "#4ade80"],
  [1.08, 0.04, "#34d399"],
  [1.08, -0.3, "#22c55e"],
] as const;

function ScrumSprint({ reducedMotion }: { reducedMotion: boolean }) {
  const loopRef = useRef<Group>(null);
  const boardRef = useRef<Group>(null);
  const movingCardRef = useRef<Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (!loopRef.current || !boardRef.current || !movingCardRef.current) return;

    if (reducedMotion) {
      loopRef.current.rotation.z = 0;
      boardRef.current.rotation.y = -0.12;
      movingCardRef.current.position.x = 0;
      return;
    }

    const time = clock.getElapsedTime();
    loopRef.current.rotation.z -= delta * 0.12;
    boardRef.current.rotation.y = -0.12 + Math.sin(time * 0.45) * 0.07;
    movingCardRef.current.position.x = Math.sin(time * 0.7) * 1.08;
    movingCardRef.current.position.y = -0.72 + Math.cos(time * 1.4) * 0.035;
  });

  return (
    <group>
      <group ref={loopRef} position={[0, 0, -0.35]}>
        <mesh>
          <torusGeometry args={[2.02, 0.025, 8, 96]} />
          <meshBasicMaterial
            color="#a78bfa"
            transparent
            opacity={0.76}
            toneMapped={false}
          />
        </mesh>
        {[0, 1, 2].map((index) => {
          const angle = (index / 3) * Math.PI * 2;
          return (
            <mesh
              key={index}
              position={[Math.cos(angle) * 2.02, Math.sin(angle) * 2.02, 0]}
              rotation={[0, 0, angle - Math.PI / 2]}
            >
              <coneGeometry args={[0.11, 0.3, 8]} />
              <meshBasicMaterial color="#67e8f9" toneMapped={false} />
            </mesh>
          );
        })}
      </group>

      <group ref={boardRef} position={[0, 0.08, 0]} rotation={[-0.04, -0.12, 0]}>
        {[-1.08, 0, 1.08].map((x, index) => (
          <mesh key={x} position={[x, 0, 0]}>
            <boxGeometry args={[0.88, 1.62, 0.12]} />
            <meshStandardMaterial
              color="#0b1023"
              emissive={index === 0 ? "#06b6d4" : index === 1 ? "#8b5cf6" : "#22c55e"}
              emissiveIntensity={0.27}
              metalness={0.68}
              roughness={0.27}
              transparent
              opacity={0.92}
            />
            <Edges
              color={index === 0 ? "#22d3ee" : index === 1 ? "#a78bfa" : "#4ade80"}
            />
          </mesh>
        ))}
        {BOARD_CARDS.map(([x, y, color], index) => (
          <mesh key={index} position={[x, y, 0.12]}>
            <boxGeometry args={[0.56, 0.21, 0.045]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.4}
              metalness={0.28}
              roughness={0.32}
            />
          </mesh>
        ))}
        <mesh ref={movingCardRef} position={[-1.08, -0.72, 0.16]}>
          <boxGeometry args={[0.48, 0.18, 0.06]} />
          <meshBasicMaterial color="#f8fafc" toneMapped={false} />
        </mesh>
      </group>

      {Array.from({ length: 5 }, (_, index) => {
        const angle = (index / 5) * Math.PI * 2 + Math.PI / 2;
        return (
          <mesh
            key={index}
            position={[Math.cos(angle) * 2.38, Math.sin(angle) * 2.05, -0.42]}
          >
            <octahedronGeometry args={[0.085, 0]} />
            <meshBasicMaterial
              color={index === 4 ? "#4ade80" : "#c4b5fd"}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/**
 * Contenido WebGL para un único Canvas global. El valor `stage` puede ser
 * entero (sección activa) o decimal (progreso de scroll) entre 0 y 4.
 */
export function JourneyScene({
  stage,
  reducedMotion = false,
}: JourneySceneProps) {
  const railRef = useRef<Group>(null);
  const viewportWidth = useThree((state) => state.viewport.width);
  const horizontalOffset = Math.min(2.85, viewportWidth * 0.235);
  const safeStage = Number.isFinite(stage)
    ? MathUtils.clamp(stage, 0, STAGE_COUNT - 1)
    : 0;

  useFrame(({ clock }, delta) => {
    if (!railRef.current) return;

    const targetX = -safeStage * STAGE_SPACING;

    if (reducedMotion) {
      railRef.current.position.x = targetX;
      railRef.current.position.y = 0;
      railRef.current.rotation.z = 0;
      return;
    }

    const time = clock.getElapsedTime();
    railRef.current.position.x = MathUtils.damp(
      railRef.current.position.x,
      targetX,
      3.7,
      delta,
    );
    railRef.current.position.y = MathUtils.damp(
      railRef.current.position.y,
      Math.sin(time * 0.28) * 0.035,
      2.5,
      delta,
    );
    railRef.current.rotation.z = MathUtils.damp(
      railRef.current.rotation.z,
      Math.sin(time * 0.22) * 0.006,
      2,
      delta,
    );
  });

  return (
    <group position={[horizontalOffset, 0, 0]} scale={0.72}>
      <ambientLight intensity={0.56} />
      <hemisphereLight args={["#b7e7ff", "#080014", 0.42]} />
      <pointLight
        color="#8b5cf6"
        intensity={16}
        distance={12}
        position={[-2.4, 3.4, 4.5]}
      />
      <pointLight
        color="#22d3ee"
        intensity={12}
        distance={11}
        position={[2.8, -1.3, 3.8]}
      />

      <Sparkles
        count={reducedMotion ? 45 : 90}
        scale={[35, 9, 7]}
        size={1.5}
        speed={reducedMotion ? 0 : 0.22}
        noise={reducedMotion ? 0 : 0.7}
        color="#c4b5fd"
        opacity={0.42}
      />

      <group ref={railRef}>
        <DataTrack reducedMotion={reducedMotion} />
        <Station
          index={0}
          stage={safeStage}
          reducedMotion={reducedMotion}
          accent="#8b5cf6"
        >
          <CorePortal reducedMotion={reducedMotion} />
        </Station>
        <Station
          index={1}
          stage={safeStage}
          reducedMotion={reducedMotion}
          accent="#3b82f6"
        >
          <CloudConstellation reducedMotion={reducedMotion} />
        </Station>
        <Station
          index={2}
          stage={safeStage}
          reducedMotion={reducedMotion}
          accent="#22d3ee"
        >
          <SecurityVault reducedMotion={reducedMotion} />
        </Station>
        <Station
          index={3}
          stage={safeStage}
          reducedMotion={reducedMotion}
          accent="#4ade80"
        >
          <ScrumSprint reducedMotion={reducedMotion} />
        </Station>
        <Station
          index={4}
          stage={safeStage}
          reducedMotion={reducedMotion}
          accent="#f59e0b"
        >
          <LanguageOrbit reducedMotion={reducedMotion} />
        </Station>
      </group>
    </group>
  );
}

export default JourneyScene;
