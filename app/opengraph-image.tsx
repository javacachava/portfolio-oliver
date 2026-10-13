import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.shortName}: ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Tarjeta social: pistas de cobre sobre espresso, con el nombre como protagonista. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#15100d",
          color: "#f5ebdd",
          position: "relative",
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          <g fill="none" stroke="#c88248" strokeWidth="3" strokeLinejoin="round">
            <path d="M760 150 H900 L930 180 V260 L960 290 H1200" />
            <path d="M700 250 H840 L870 280 V380 L900 410 H1200" opacity="0.7" />
            <path d="M820 520 H960 L990 490 V440 L1020 410" opacity="0.5" />
          </g>
          <g fill="#15100d" stroke="#c88248" strokeWidth="3">
            <circle cx="760" cy="150" r="7" />
            <circle cx="700" cy="250" r="7" />
            <circle cx="820" cy="520" r="7" />
          </g>
        </svg>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              border: "3px solid #c88248",
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
              color: "#c88248",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            OA
          </div>
          <div style={{ fontSize: 26, color: "#e5b88e" }}>{profile.location}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>
            {profile.shortName}
          </div>
          <div style={{ marginTop: 28, fontSize: 38, color: "#e5b88e", maxWidth: 820 }}>
            {profile.role}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#b3a392" }}>
          <span>Ingeniería en Desarrollo de Software y cofundador de WUJU</span>
          <span>oliver-ascencio.wuju.dev</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
