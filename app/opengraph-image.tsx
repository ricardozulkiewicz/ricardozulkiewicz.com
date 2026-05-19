import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ricardo Zulkiewicz | B2B Sales, CRM & IT Outsourcing";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #020617 0%, #0f172a 52%, #1e3a8a 100%)",
          color: "white",
          padding: 72,
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 34, fontWeight: 700 }}>Ricardo Zulkiewicz</div>
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 999,
              padding: "12px 20px",
              fontSize: 22,
              color: "#bfdbfe",
            }}
          >
            ricardozulkiewicz.com
          </div>
        </div>
        <div>
          <div
            style={{
              display: "inline-flex",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.08)",
              borderRadius: 999,
              padding: "12px 20px",
              fontSize: 24,
              color: "#bbf7d0",
              marginBottom: 30,
            }}
          >
            B2B Sales · CRM · IT Outsourcing · Sales Enablement
          </div>
          <div style={{ fontSize: 70, lineHeight: 1.02, fontWeight: 800, letterSpacing: -2 }}>
            Commercial strategy with practical execution.
          </div>
          <div style={{ marginTop: 30, fontSize: 28, lineHeight: 1.35, color: "#cbd5e1", maxWidth: 900 }}>
            Turning commercial context into pipeline, relationships and B2B growth.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
