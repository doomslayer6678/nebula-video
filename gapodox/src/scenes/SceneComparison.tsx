import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";

const NEON = "#00ff88";
const TEAL = "#3dd9d9";
const BLUE = "#4a9eff";

export const SceneComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftIn  = Math.min(spring({ frame: frame - 6,  fps, config: { damping: 18, stiffness: 130 } }), 1);
  const rightIn = Math.min(spring({ frame: frame - 12, fps, config: { damping: 18, stiffness: 130 } }), 1);
  const textIn  = interpolate(frame, [40, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0e1a", overflow: "hidden" }}>
      {/* Left panel — Congress/politicians screenshot */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "130px 40px 40px",
        opacity: leftIn,
        transform: `translateX(${interpolate(leftIn, [0, 1], [-80, 0])}px)`,
      }}>
        <Img
          src={staticFile("portfolio_stacks_up_against_congress.PNG")}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
        />
      </div>

      {/* Right panel — hedge funds screenshot */}
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "130px 40px 40px",
        opacity: rightIn,
        transform: `translateX(${interpolate(rightIn, [0, 1], [80, 0])}px)`,
      }}>
        <Img
          src={staticFile("hedge_funds.PNG")}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
        />
      </div>

      {/* Center divider */}
      <div style={{
        position: "absolute", left: "50%", top: 0, bottom: 0,
        width: 1, marginLeft: -0.5,
        background: `linear-gradient(180deg, transparent, ${TEAL} 30%, ${TEAL} 70%, transparent)`,
        opacity: 0.35,
      }} />

      {/* Header text — top of page */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        padding: "36px 80px 28px",
        background: "linear-gradient(180deg, rgba(8,12,20,0.95) 0%, rgba(8,12,20,0.88) 70%, transparent 100%)",
        textAlign: "center", opacity: textIn,
        transform: `translateY(${interpolate(textIn, [0, 1], [-20, 0])}px)`,
      }}>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 30, fontWeight: 500,
          color: "rgba(255,255,255,0.88)", letterSpacing: "0.01em",
          lineHeight: 1.45,
        }}>
          See how your portfolio stacks up against what{" "}
          <span style={{ color: NEON, fontWeight: 700 }}>hedge funds</span>{" "}and{" "}
          <span style={{ color: BLUE, fontWeight: 700 }}>Congress</span>{" "}are actually trading.
        </div>
      </div>
    </div>
  );
};
