import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          background: "#1F1F1F",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 42,
            top: 42,
            width: 78,
            height: 78,
            border: "13px solid #F7F5F0",
            borderRadius: 9,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 70,
            top: 70,
            width: 78,
            height: 78,
            border: "13px solid #F7F5F0",
            borderRadius: 9,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 124,
            top: 124,
            width: 20,
            height: 20,
            background: "#0F4C5C",
            borderRadius: 3,
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
