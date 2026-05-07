import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { NebulaLogo } from "../components/NebulaLogo";

const DURATION = 45;

export const Scene9CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(
    frame,
    [0, 10, DURATION],
    [0, 1, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const logoEnter = spring({ frame: frame - 3,  fps, config: { damping: 12 } });
  const ctaEnter  = spring({ frame: frame - 12, fps, config: { damping: 12 } });
  const subEnter  = spring({ frame: frame - 20, fps, config: { damping: 14 } });

  const glowPulse = interpolate(frame, [0, 22, 45], [0.4, 1.0, 0.75], { extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, opacity: sceneOpacity }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 640px 420px at 50% 50%, rgba(124,58,237,${0.32 * glowPulse}) 0%, transparent 70%)` }} />

      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.055 }} viewBox="0 0 1280 720">
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={(i + 1) * (1280 / 12)} y1={0} x2={(i + 1) * (1280 / 12)} y2={720} stroke="#7C3AED" strokeWidth="1" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={(i + 1) * (720 / 7)} x2={1280} y2={(i + 1) * (720 / 7)} stroke="#7C3AED" strokeWidth="1" />
        ))}
      </svg>

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30 }}>
        <div
          style={{
            opacity: logoEnter,
            transform: `scale(${interpolate(logoEnter, [0, 1], [0.75, 1])})`,
          }}
        >
          <NebulaLogo svgWidth={80} textSize={42} gap={18} />
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
            color: "#FFFFFF", fontSize: 22, fontWeight: 700,
            padding: "16px 52px", borderRadius: 50, letterSpacing: "-0.01em",
            boxShadow: "0 0 64px rgba(124,58,237,0.55), 0 4px 24px rgba(124,58,237,0.45)",
            opacity: ctaEnter,
            transform: `scale(${interpolate(ctaEnter, [0, 1], [0.8, 1])})`,
          }}
        >Book a Demo</div>

        <div style={{ fontSize: 17, color: "#64748B", opacity: subEnter, letterSpacing: "0.02em" }}>nebula.io · See Nebula in action</div>
      </div>
    </div>
  );
};
