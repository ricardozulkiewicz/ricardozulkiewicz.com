import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ricardo Zulk | B2B Technology Sales";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#1F1F1F",
          color: "#F7F5F0",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, Helvetica, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: 72,
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "radial-gradient(circle at 78% 18%, rgba(15,76,92,0.52), transparent 34%)",
            display: "flex",
            inset: 0,
            position: "absolute",
          }}
        />
        <div
          style={{
            border: "1px solid rgba(247,245,240,0.14)",
            display: "flex",
            height: 420,
            opacity: 0.42,
            position: "absolute",
            right: -80,
            top: 84,
            width: 420,
          }}
        />
        <div
          style={{
            border: "1px solid rgba(247,245,240,0.14)",
            display: "flex",
            height: 360,
            opacity: 0.5,
            position: "absolute",
            right: -10,
            top: 42,
            width: 360,
          }}
        />
        <div
          style={{
            background: "#0F4C5C",
            boxShadow: "0 0 46px rgba(15,76,92,0.9)",
            display: "flex",
            height: 72,
            position: "absolute",
            right: 224,
            top: 344,
            width: 72,
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "0.28em" }}>RICARDO ZULK</div>
            <div style={{ color: "#57A6B7", fontSize: 15, fontWeight: 700, letterSpacing: "0.28em" }}>
              B2B TECHNOLOGY SALES
            </div>
          </div>
          <div
            style={{
              border: "1px solid rgba(87,166,183,0.48)",
              color: "#57A6B7",
              display: "flex",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.18em",
              padding: "14px 18px",
            }}
          >
            STRATEGY · PIPELINE · REVENUE
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 880, position: "relative" }}>
          <div style={{ color: "#57A6B7", fontSize: 18, fontWeight: 700, letterSpacing: "0.2em" }}>
            IT OUTSOURCING · OUTBOUND · CRM GOVERNANCE
          </div>
          <div style={{ fontSize: 82, fontWeight: 400, letterSpacing: "-0.055em", lineHeight: 0.98 }}>
            Building the commercial system behind predictable B2B technology revenue.
          </div>
        </div>

        <div
          style={{
            color: "rgba(216,216,216,0.72)",
            display: "flex",
            fontSize: 23,
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div>ricardozulkiewicz.com</div>
          <div>São Paulo · Brazil</div>
        </div>
      </div>
    ),
    size
  );
}
