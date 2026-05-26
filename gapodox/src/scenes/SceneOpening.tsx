import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const NEON = "#00ff88";
const TEAL = "#3dd9d9";
const BLUE = "#4a9eff";
const SLAM = { damping: 9, stiffness: 320, mass: 0.45 };
const BG = "#0d1526";

export const SceneOpening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1a = Math.min(spring({ frame: frame - 0,  fps, config: SLAM }), 1);
  const line1b = Math.min(spring({ frame: frame - 14, fps, config: SLAM }), 1);
  const line2  = Math.min(spring({ frame: frame - 36, fps, config: { damping: 12, stiffness: 180 } }), 1);

  const gridOpacity = interpolate(frame, [0, 20], [0, 0.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glowIn = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, background: BG, overflow: "hidden" }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: gridOpacity }}>
        <defs>
          <pattern id="gp-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill={BLUE} opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gp-grid)" />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 900px 600px at 50% 50%, rgba(0,255,136,0.06) 0%, transparent 70%)",
        opacity: glowIn,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 96, fontWeight: 900, color: "#ffffff",
          letterSpacing: "-0.025em", lineHeight: 1,
          opacity: line1a,
          transform: "translateY(" + interpolate(line1a, [0, 1], [-90, 0]) + "px)",
          textAlign: "center",
        }}>Adding another investing app</div>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 96, fontWeight: 900, color: "#ffffff",
          letterSpacing: "-0.025em", lineHeight: 1.1,
          opacity: line1b,
          transform: "translateY(" + interpolate(line1b, [0, 1], [-90, 0]) + "px)",
          textAlign: "center", marginBottom: 48,
        }}>won&apos;t make you a better investor.</div>
        <div style={{
          width: interpolate(line2, [0, 1], [0, 480]), height: 2,
          background: "linear-gradient(90deg, transparent, " + TEAL + ", transparent)",
          marginBottom: 36,
        }} />
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 52, fontWeight: 600, color: NEON,
          letterSpacing: "-0.01em", opacity: line2,
          transform: "translateY(" + interpolate(line2, [0, 1], [30, 0]) + "px)",
          textAlign: "center",
        }}>Seeing everything in one place will.</div>
      </div>
      {(["tl", "tr", "bl", "br"] as const).map((corner) => {
        const isRight = corner.includes("r");
        const isBottom = corner.includes("b");
        return (
          <div key={corner} style={{
            position: "absolute",
            top: isBottom ? undefined : 60, bottom: isBottom ? 60 : undefined,
            left: isRight ? undefined : 60, right: isRight ? 60 : undefined,
            opacity: line1a * 0.5,
          }}>
            <div style={{ width: 72, height: 2, background: TEAL, position: "absolute", [isRight ? "right" : "left"]: 0, top: 0 }} />
            <div style={{ width: 2, height: 72, background: TEAL, position: "absolute", [isRight ? "right" : "left"]: 0, [isBottom ? "bottom" : "top"]: 0 }} />
          </div>
        );
      })}
    </div>
  );
};
