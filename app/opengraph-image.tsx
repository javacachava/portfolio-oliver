import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.shortName} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: 80,
          background: "#f5f2eb",
          color: "#14181b",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#586067",
          }}
        >
          Portafolio · {profile.location}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, lineHeight: 1.02, letterSpacing: -2 }}>{profile.shortName}</div>
          <div style={{ marginTop: 24, fontSize: 38, color: "#2e363b" }}>{profile.role}</div>
          <div style={{ marginTop: 40, width: 120, height: 4, background: "#0b5c5a" }} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#586067" }}>
          <span>Ingeniería en Desarrollo de Software · WUJU</span>
          <span>oliver-ascencio.wuju.dev</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
