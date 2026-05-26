import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from "remotion";

const NEON = "#00ff88";
const TEAL = "#3dd9d9";
const BG = "#0d1526";

export const SceneSolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dashIn = Math.min(spring({ frame: frame - 10, fps, config: { damping: 20, stiffness: 150 } }), 1);
  const logoIn = Math.min(spring({ frame: frame - 22, fps, config: { damping: 16, stiffness: 120 } }), 1);
  const textIn = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineW  = interpolate(textIn, [0, 1], [0, 520]);

  return (
    <div style={{ position: "absolute", inset: 0, background: BG, overflow: "hidden" }}>
      {/* Header — above the screenshot */}
      <div style={{
        position: "absolute", top: 48, left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center", opacity: textIn,
      }}>
        <div style={{
          width: lineW, height: 2,
          background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)`,
          margin: "0 auto 20px",
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

      {/* Logo — top left */}
      <div style={{
        position: "absolute", top: 48, left: 60,
        transform: `scale(${logoIn})`,
        transformOrigin: "left center",
        opacity: logoIn,
      }}>
        <img src={staticFile("gapodox-logo.png")} alt="Gapodox" style={{ height: 36 }} />
      </div>

      {/* Platform screenshot — majority of screen below header */}
      <div style={{
        position: "absolute", top: 160, left: 60, right: 60, bottom: 40,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: dashIn,
        transform: `translateX(${interpolate(dashIn, [0, 1], [300, 0])}px)`,
      }}>
        <Img
          src={staticFile("gapodox-brings-it-all-together2.png")}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
        />
      </div>
    </div>
  );
};
