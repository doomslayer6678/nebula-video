import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from "remotion";

const NEON = "#00ff88";
const TEAL = "#3dd9d9";

export const SceneSolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dashIn = Math.min(spring({ frame: frame - 10, fps, config: { damping: 20, stiffness: 150 } }), 1);
  const logoIn = Math.min(spring({ frame: frame - 22, fps, config: { damping: 16, stiffness: 120 } }), 1);
  const textIn = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineW  = interpolate(textIn, [0, 1], [0, 520]);

  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0e1a", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 1000px 640px at 50% 50%, rgba(0,255,136,0.06) 0%, transparent 70%)",
        opacity: dashIn,
      }} />

      {/* Header — above the screenshot */}
      <div style={{
        position: "absolute", top: 115, left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center", opacity: textIn,
      }}>
        <div style={{
          width: lineW, height: 2,
          background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)`,
          margin: "0 auto 24px",
        }} />
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 44, fontWeight: 700, color: "#ffffff",
          letterSpacing: "-0.01em", whiteSpace: "nowrap",
          transform: `translateY(${interpolate(textIn, [0, 1], [-16, 0])}px)`,
        }}>
          Gapodox brings it all together.
        </div>
      </div>

      {/* Platform screenshot — slides in from right */}
      <div style={{
        position: "absolute", top: 230, left: 0, right: 0, bottom: 20,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: dashIn,
        transform: `translateX(${interpolate(dashIn, [0, 1], [320, 0])}px)`,
      }}>
        <Img
          src={staticFile("gapodox_brings_it_all_together.png")}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
        />
      </div>

      {/* Logo — top center */}
      <div style={{
        position: "absolute", top: 52, left: "50%",
        transform: `translateX(-50%) scale(${logoIn})`,
        opacity: logoIn,
      }}>
        <img src={staticFile("gapodox-logo.png")} alt="Gapodox" style={{ height: 44 }} />
      </div>
    </div>
  );
};
