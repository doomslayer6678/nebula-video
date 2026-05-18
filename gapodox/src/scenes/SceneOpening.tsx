import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const NEON = "#00ff88";
const TEAL = "#3dd9d9";
const BLUE = "#4a9eff";
const SLAM = { damping: 9, stiffness: 320, mass: 0.45 };

export const SceneOpening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1 = Math.min(spring({ frame: frame - 0, fps, config: SLAM }), 1);
  const line2 = Math.min(spring({ frame: frame - 18, fps, config: SLAM }), 1);
  const statIn = interpolate(frame, [48, 68], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pctCount = Math.min(spring({ frame: frame - 55, fps, config: { damping: 12, stiffness: 200 } }), 1);
  const dividerW = interpolate(statIn, [0, 1], [0, 560]);
  const gridOpacity = interpolate(frame, [0, 20], [0, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0e1a", overflow: "hidden" }}>
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
        background: `radial-gradient(ellipse 900px 600px at 50% 48%, rgba(0,255,136,0.05) 0%, transparent 70%)`,
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 108, fontWeight: 900,
          color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1,
          opacity: line1,
          transform: `translateY(${interpolate(line1, [0, 1], [-80, 0])}px)`,
          textAlign: "center",
        }}>
          YOU’RE DIVERSIFIED.
        </div>

        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 108, fontWeight: 900,
          color: NEON, letterSpacing: "-0.02em", lineHeight: 1.1,
          opacity: line2,
          transform: `translateY(${interpolate(line2, [0, 1], [-80, 0])}px)`,
          textAlign: "center", marginBottom: 56,
        }}>
          OR SO YOU THINK.
        </div>

        <div style={{
          width: dividerW, height: 2,
          background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)`,
          marginBottom: 32,
        }} />

        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 28, fontWeight: 400,
          color: "rgba(255,255,255,0.65)", letterSpacing: "0.01em",
          opacity: statIn, textAlign: "center",
        }}>
          The top 10 stocks make up nearly{” ”}
          <span style={{ color: NEON, fontWeight: 800, fontSize: 36 }}>
            {Math.round(interpolate(pctCount, [0, 1], [0, 40]))}%
          </span>
          {” ”}of the S&amp;P 500.
        </div>
      </div>

      {["tl", "tr", "bl", "br"].map((corner) => {
        const isRight = corner.includes("r");
        const isBottom = corner.includes("b");
        return (
          <div key={corner} style={{
            position: "absolute",
            top: isBottom ? undefined : 60,
            bottom: isBottom ? 60 : undefined,
            left: isRight ? undefined : 60,
            right: isRight ? 60 : undefined,
            opacity: line1 * 0.55,
          }}>
            <div style={{ width: 72, height: 2, background: TEAL, position: "absolute", [isRight ? "right" : "left"]: 0, top: 0 }} />
            <div style={{ width: 2, height: 72, background: TEAL, position: "absolute", [isRight ? "right" : "left"]: 0, [isBottom ? "bottom" : "top"]: 0 }} />
          </div>
        );
      })}
    </div>
  );
};
