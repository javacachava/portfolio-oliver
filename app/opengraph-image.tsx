import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.shortName}: ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Tarjeta social: vacío violeta con órbitas de neón y el nombre como protagonista. */
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
          background: "#030014",
          color: "#f0f0ff",
          position: "relative",
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
          <defs>
            <radialGradient id="g" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7042f8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#7042f8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="930" cy="300" r="300" fill="url(#g)" />
          <circle cx="930" cy="300" r="250" fill="none" stroke="#7042f8" strokeWidth="2" opacity="0.55" />
          <circle cx="930" cy="300" r="170" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.5" />
          <circle cx="930" cy="300" r="90" fill="none" stroke="#f43f5e" strokeWidth="2" opacity="0.4" />
          <circle cx="930" cy="300" r="34" fill="#7042f8" />
          <circle cx="1090" cy="190" r="9" fill="#67e8f9" />
          <circle cx="790" cy="440" r="7" fill="#b49bff" />
        </svg>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, color: "#b49bff" }}>
          <span style={{ fontWeight: 800 }}>{"›_"}</span>
          <span style={{ fontSize: 26, color: "#a89fd2" }}>{profile.location}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 0.98, letterSpacing: -3 }}>
            {profile.shortName}
          </div>
          <div style={{ marginTop: 26, fontSize: 40, color: "#b49bff", maxWidth: 760 }}>
            {profile.role}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#a89fd2" }}>
          <span>Ingeniería en Desarrollo de Software y cofundador de WUJU</span>
          <span>oliver-ascencio.wuju.dev</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
