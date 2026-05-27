import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const BG = "#0F1B3D";
const BLUE = "#1847F5";
const LIGHT_BLUE = "#4D8EF7";
const WHITE = "#FFFFFF";

const HexLogo: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <polygon points="50,3 93,26 93,74 50,97 7,74 7,26" fill={BLUE} />
    <polygon points="50,10 87,31 87,69 50,90 13,69 13,31" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={2} />
    <text x="50" y="67" textAnchor="middle" fill={WHITE} fontSize="50" fontWeight="900" fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'>Z</text>
  </svg>
);

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = Math.min(spring({ frame, fps, config: { damping: 14, stiffness: 140 } }), 1);
  const nameIn = Math.min(spring({ frame: frame - 12, fps, config: { damping: 20, stiffness: 200 } }), 1);
  const line1In = Math.min(spring({ frame: frame - 24, fps, config: { damping: 20, stiffness: 180 } }), 1);
  const line2In = Math.min(spring({ frame: frame - 40, fps, config: { damping: 20, stiffness: 180 } }), 1);
  const emailIn = Math.min(spring({ frame: frame - 58, fps, config: { damping: 18, stiffness: 160 } }), 1);

  const glowSize = 80 + 20 * Math.sin(frame * 0.08);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "absolute", width: glowSize * 4, height: glowSize * 4, borderRadius: "50%", background: `radial-gradient(circle, rgba(24,71,245,0.12) 0%, transparent 70%)`, pointerEvents: "none", opacity: logoIn }} />
      <div style={{ opacity: logoIn, transform: `scale(${interpolate(logoIn,[0,1],[0.5,1])})`, marginBottom: 24, filter: `drop-shadow(0 0 ${glowSize*0.3}px rgba(24,71,245,0.6))` }}>
        <HexLogo size={120} />
      </div>
      <div style={{ fontSize: 64, fontWeight: 900, color: WHITE, letterSpacing: "0.04em", opacity: nameIn, transform: `translateY(${interpolate(nameIn,[0,1],[16,0])}px)`, marginBottom: 56 }}>Z Guide</div>
      <div style={{ width: interpolate(line1In,[0,1],[0,320]), height: 2, background: `linear-gradient(90deg, transparent, ${BLUE}, ${LIGHT_BLUE}, transparent)`, marginBottom: 48, opacity: line1In }} />
      <div style={{ fontSize: 44, fontWeight: 500, color: "rgba(255,255,255,0.8)", textAlign: "center", lineHeight: 1.5, opacity: line1In, transform: `translateY(${interpolate(line1In,[0,1],[16,0])}px)` }}>
        Want to see how it works for your venue?
      </div>
      <div style={{ fontSize: 44, fontWeight: 500, color: "rgba(255,255,255,0.8)", textAlign: "center", marginTop: 8, opacity: line2In, transform: `translateY(${interpolate(line2In,[0,1],[12,0])}px)` }}>
        Reach out and we'll show you.
      </div>
      <div style={{ marginTop: 48, padding: "20px 56px", background: BLUE, borderRadius: 40, fontSize: 44, fontWeight: 800, color: WHITE, letterSpacing: "0.02em", opacity: emailIn, transform: `scale(${interpolate(emailIn,[0,1],[0.85,1])})`, boxShadow: `0 8px 40px rgba(24,71,245,0.5), 0 0 0 1px rgba(77,142,247,0.3)` }}>
        Info@ZGuide.com
      </div>
    </div>
  );
};
