import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";

const NEON = "#00ff88";
const TEAL = "#3dd9d9";
const BLUE = "#4a9eff";
const BG = "#0d1526";

const PhoneMockup: React.FC<{ src: string }> = ({ src }) => (
  <div style={{
    position: "relative",
    width: 360, height: 780,
    background: "#0a0f1e",
    borderRadius: 48,
    border: "2px solid rgba(255,255,255,0.14)",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.7), 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
    overflow: "hidden",
    flexShrink: 0,
  }}>
    {/* Dynamic Island */}
    <div style={{
      position: "absolute", top: 12, left: "50%",
      transform: "translateX(-50%)",
      width: 96, height: 24,
      background: "#000", borderRadius: 12, zIndex: 10,
    }} />
    <Img
      src={staticFile(src)}
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
    />
    {/* Home indicator */}
    <div style={{
      position: "absolute", bottom: 10, left: "50%",
      transform: "translateX(-50%)",
      width: 110, height: 4,
      background: "rgba(255,255,255,0.3)", borderRadius: 2,
    }} />
  </div>
);

export const SceneComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftIn  = Math.min(spring({ frame: frame - 6,  fps, config: { damping: 18, stiffness: 130 } }), 1);
  const rightIn = Math.min(spring({ frame: frame - 12, fps, config: { damping: 18, stiffness: 130 } }), 1);
  const textIn  = interpolate(frame, [40, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, background: BG, overflow: "hidden" }}>
      {/* Left panel — Congress phone */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        paddingTop: 130,
        opacity: leftIn,
        transform: `translateX(${interpolate(leftIn, [0, 1], [-60, 0])}px)`,
      }}>
        <PhoneMockup src="portfolio_stacks_up_against_congress.PNG" />
      </div>

      {/* Right panel — hedge funds phone */}
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        paddingTop: 130,
        opacity: rightIn,
        transform: `translateX(${interpolate(rightIn, [0, 1], [60, 0])}px)`,
      }}>
        <PhoneMockup src="hedge_funds.PNG" />
      </div>

      {/* Center divider */}
      <div style={{
        position: "absolute", left: "50%", top: 0, bottom: 0,
        width: 1, marginLeft: -0.5,
        background: `linear-gradient(180deg, transparent, ${TEAL} 30%, ${TEAL} 70%, transparent)`,
        opacity: 0.3,
      }} />

      {/* Header text — top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        padding: "36px 80px 28px",
        background: `linear-gradient(180deg, ${BG} 0%, rgba(13,21,38,0.92) 70%, transparent 100%)`,
        textAlign: "center", opacity: textIn,
        transform: `translateY(${interpolate(textIn, [0, 1], [-20, 0])}px)`,
      }}>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 30, fontWeight: 500,
          color: "rgba(255,255,255,0.88)", lineHeight: 1.45,
        }}>
          See how your portfolio stacks up against what{" "}
          <span style={{ color: NEON, fontWeight: 700 }}>hedge funds</span>{" "}and{" "}
          <span style={{ color: BLUE, fontWeight: 700 }}>Congress</span>{" "}are actually trading.
        </div>
      </div>
    </div>
  );
};
