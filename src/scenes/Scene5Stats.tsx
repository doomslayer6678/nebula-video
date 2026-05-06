import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const DURATION = 105;

export const Scene5Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(
    frame,
    [0, 12, DURATION - 12, DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const stat1  = spring({ frame: frame - 5,  fps, config: { damping: 10, stiffness: 50 } });
  const label1 = spring({ frame: frame - 15, fps, config: { damping: 14 } });
  const stat2  = spring({ frame: frame - 30, fps, config: { damping: 10, stiffness: 50 } });
  const label2 = spring({ frame: frame - 40, fps, config: { damping: 14 } });

  return (
    <div style={{ position: "absolute", inset: 0, opacity: sceneOpacity }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 25% 50%, rgba(124,58,237,0.22) 0%, transparent 45%), radial-gradient(ellipse at 75% 50%, rgba(6,182,212,0.18) 0%, transparent 45%)",
        }}
      />

      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 100 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div
            style={{
              fontSize: 128, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1,
              background: "linear-gradient(135deg, #C4B5FD, #7C3AED)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              opacity: stat1,
              transform: `scale(${interpolate(stat1, [0, 1], [0.45, 1])})`,
            }}
          >3×</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#E2E8F0", textAlign: "center", letterSpacing: "-0.01em", opacity: label1, transform: `translateY(${interpolate(label1, [0, 1], [14, 0])}px)` }}>Faster Sourcing</div>
          <div style={{ fontSize: 13, color: "#475569", opacity: label1 }}>vs. traditional workflows</div>
        </div>

        <div style={{ width: 1, height: 220, background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.14), transparent)" }} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div
            style={{
              fontSize: 128, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1,
              background: "linear-gradient(135deg, #67E8F9, #06B6D4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              opacity: stat2,
              transform: `scale(${interpolate(stat2, [0, 1], [0.45, 1])})`,
            }}
          >60%</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#E2E8F0", textAlign: "center", letterSpacing: "-0.01em", opacity: label2, transform: `translateY(${interpolate(label2, [0, 1], [14, 0])}px)` }}>Less Manual Work</div>
          <div style={{ fontSize: 13, color: "#475569", opacity: label2 }}>admin, coordination & busywork</div>
        </div>
      </div>
    </div>
  );
};
