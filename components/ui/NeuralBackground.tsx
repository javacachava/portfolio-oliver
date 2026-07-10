"use client";

import { motion } from "framer-motion";

// Red neuronal decorativa: 3 capas de nodos + conexiones + pulsos viajando
const LAYERS: number[][] = [
  // x fijo por capa, lista de y por nodo (viewBox 900x420)
  [80, 130, 210, 290, 340],
  [450, 90, 170, 250, 330],
  [820, 150, 210, 270],
];

interface Node {
  x: number;
  y: number;
}

const layerNodes: Node[][] = LAYERS.map(([x, ...ys]) =>
  ys.map((y) => ({ x, y }))
);

const edges: Array<{ a: Node; b: Node }> = [];
for (let l = 0; l < layerNodes.length - 1; l++) {
  for (const a of layerNodes[l]) {
    for (const b of layerNodes[l + 1]) {
      edges.push({ a, b });
    }
  }
}

// Subconjunto de aristas con pulso animado (índices deterministas)
const PULSED = [0, 5, 10, 14, 19, 23];

export default function NeuralBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none flex items-center justify-center">
      {/* Glow radial central */}
      <div
        className="absolute w-[70%] h-[70%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(112,66,248,0.14) 0%, rgba(6,182,212,0.05) 45%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <svg
        viewBox="0 0 900 420"
        className="w-full max-w-5xl h-auto opacity-40"
        aria-hidden
      >
        {/* Conexiones */}
        {edges.map((e, i) => (
          <line
            key={i}
            x1={e.a.x}
            y1={e.a.y}
            x2={e.b.x}
            y2={e.b.y}
            stroke="#7042f8"
            strokeWidth="0.7"
            opacity="0.3"
          />
        ))}

        {/* Pulsos viajando por conexiones seleccionadas */}
        {PULSED.map((idx, i) => {
          const e = edges[idx % edges.length];
          return (
            <motion.circle
              key={idx}
              r="2.5"
              fill="#06b6d4"
              style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }}
              initial={{ cx: e.a.x, cy: e.a.y, opacity: 0 }}
              animate={{
                cx: [e.a.x, e.b.x],
                cy: [e.a.y, e.b.y],
                opacity: [0, 0.9, 0],
              }}
              transition={{
                duration: 2.6,
                delay: i * 0.9,
                repeat: Infinity,
                repeatDelay: 3.5,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Nodos */}
        {layerNodes.flat().map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="4"
            fill="#7042f8"
            style={{ filter: "drop-shadow(0 0 6px rgba(112,66,248,0.8))" }}
            animate={{ opacity: [0.35, 0.85, 0.35] }}
            transition={{
              duration: 3,
              delay: i * 0.25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
