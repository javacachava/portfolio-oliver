import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Oliver Ascencio — Desarrollador Full-Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 100,
            width: 500,
            height: 400,
            borderRadius: 9999,
            background: "#6366f1",
            opacity: 0.07,
            filter: "blur(120px)",
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, zIndex: 1 }}>
          <div
            style={{
              fontSize: 14,
              color: "#6366f1",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Disponible para roles Full-Stack
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#ededed",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Oliver Ascencio
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#6366f1",
              fontWeight: 500,
            }}
          >
            Desarrollador Full-Stack · Santa Ana, El Salvador
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#a1a1aa",
              marginTop: 8,
              maxWidth: 700,
              lineHeight: 1.5,
            }}
          >
            Construyo software que resuelve problemas reales en El Salvador.
            Backend sólido, producto con propósito.
          </div>
        </div>

        {/* Stack tags */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            display: "flex",
            gap: 10,
            zIndex: 1,
          }}
        >
          {["TypeScript", "Node.js", "React", "PostgreSQL", "Docker"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.25)",
                color: "#a1a1aa",
                fontSize: 13,
                fontFamily: "monospace",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            fontSize: 16,
            color: "#3f3f46",
            fontWeight: 600,
            zIndex: 1,
          }}
        >
          oliver.wuju.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
