import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const SceneCredits: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1 = spring({ frame: frame - 3,  fps, config: { damping: 16 } });
  const line2 = spring({ frame: frame - 10, fps, config: { damping: 16 } });

  return (
    <div style={{ position: "absolute", inset: 0, background: "#1a2744" }}>
      {/* Ghost title */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {["THE", "AUTISTIC", "MILE"].map((w) => (
          <span
            key={w}
            style={{
              display: "block",
              fontFamily: '"Bebas Neue", Impact, "Arial Narrow", sans-serif',
              fontWeight: 900,
              fontSize: 210,
              lineHeight: 0.88,
              color: "rgba(255,255,255,0.07)",
              letterSpacing: "0.04em",
              textAlign: "center",
            }}
          >
            {w}
          </span>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 160,
          gap: 18,
        }}
      >
        <div
          style={{
            fontSize: 38,
            fontWeight: 400,
            color: "#FFFFFF",
            letterSpacing: "0.06em",
            fontFamily: '"Inter", "Segoe UI", sans-serif',
            opacity: line1,
            transform: `translateY(${interpolate(line1, [0, 1], [24, 0])}px)`,
          }}
        >
          Hosted by Jim Gaffney
        </div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 300,
            color: "#f5e6c8",
            letterSpacing: "0.04em",
            fontFamily: '"Inter", "Segoe UI", sans-serif',
            opacity: line2,
            transform: `translateY(${interpolate(line2, [0, 1], [20, 0])}px)`,
          }}
        >
          In collaboration with Jacksonville School for Autism
        </div>
      </div>
    </div>
  );
};
