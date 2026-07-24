import { ImageResponse } from "next/og";

export const alt = "Directive OS — Simplify. Automate. Scale.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          background:
            "radial-gradient(circle at 20% 10%, rgba(124,58,237,.55), transparent 40%), linear-gradient(135deg, #070815 0%, #101225 62%, #17192E 100%)",
          color: "#F8F7FF",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#C4B5FD",
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Simplify. Automate. Scale.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 1000 }}>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            Practical Business Systems for Growing Businesses.
          </div>
          <div style={{ color: "#A9A6BA", display: "flex", fontSize: 28 }}>
            Directive OS
          </div>
        </div>
      </div>
    ),
    size
  );
}
