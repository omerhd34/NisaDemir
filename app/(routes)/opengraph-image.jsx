import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Uzman Klinik Psikolog Nisa Demir";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #334155 100%)",
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
          padding: 48,
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          Uzman Klinik Psikolog
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 42,
            fontWeight: 600,
            color: "#94a3b8",
            textAlign: "center",
          }}
        >
          Nisa Demir
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 26,
            color: "#cbd5e1",
            textAlign: "center",
          }}
        >
          Bireysel ve online terapi
        </div>
      </div>
    ),
    { ...size }
  );
}
