import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from "remotion";

const NEON = "#00ff88";
const TEAL = "#3dd9d9";
const BG = "#0d1526";

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = Math.min(spring({ frame: frame - 0,  fps, config: { damping: 16, stiffness: 120 } }), 1);
  const tag1In = Math.min(spring({ frame: frame - 16, fps, config: { damping: 18, stiffness: 100 } }), 1);
  const divIn  = interpolate(frame, [26, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctaIn  = Math.min(spring({ frame: frame - 40, fps, config: { damping: 14, stiffness: 90 } }), 1);

  const glowSize = 640 + Math.sin(frame * 0.07) * 70;
  const glowOp   = 0.07 + Math.sin(frame * 0.05) * 0.025;

  const DOTS = [
    { x: 210, y: 190, phase: 0 }, { x: 1710, y: 175, phase: 1.2 },
    { x: 170, y: 880, phase: 0.7 }, { x: 1750, y: 895, phase: 1.9 },
    { x: 960, y: 100, phase: 0.4 }, { x: 960,  y: 970, phase: 1.5 },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, background: BG, overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse ${glowSize}px ${Math.round(glowSize * 0.6)}px at 50% 50%, rgba(0,255,136,${glowOp}) 0%, transparent 70%)`,
      }} />
      {DOTS.map((d, i) => (
        <div key={i} style={{
          position: "absolute", left: d.x,
          top: d.y + Math.sin(frame * 0.06 + d.phase) * 8,
          width: 6, height: 6, borderRadius: "50%",
          background: TEAL, opacity: ctaIn * 0.5,
        }} />
      ))}
      <div style={{ position: "absolute", top: 56, left: 56, opacity: logoIn * 0.5 }}>
        <div style={{ width: 64, height: 2, background: TEAL }} />
        <div style={{ width: 2, height: 64, background: TEAL }} />
      </div>
      <div style={{ position: "absolute", top: 56, right: 56, opacity: logoIn * 0.5 }}>
        <div style={{ width: 64, height: 2, background: TEAL, marginLeft: -62 }} />
        <div style={{ width: 2, height: 64, background: TEAL, marginLeft: 62 }} />
      </div>
      <div style={{ position: "absolute", bottom: 56, left: 56, opacity: logoIn * 0.5 }}>
        <div style={{ width: 2, height: 64, background: TEAL, marginTop: -62 }} />
        <div style={{ width: 64, height: 2, background: TEAL }} />
      </div>
      <div style={{ position: "absolute", bottom: 56, right: 56, opacity: logoIn * 0.5 }}>
        <div style={{ width: 2, height: 64, background: TEAL, marginTop: -62, marginLeft: 62 }} />
        <div style={{ width: 64, height: 2, background: TEAL, marginLeft: -62 }} />
      </div>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          opacity: logoIn,
          transform: `scale(${interpolate(logoIn, [0, 1], [0.72, 1])})`,
          marginBottom: 44, height: 80,
          display: "flex", alignItems: "center",
        }}>
          <Img src={staticFile("gapodox-logo.png")} style={{ height: 80, mixBlendMode: "screen" as const }} />
        </div>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 30, fontWeight: 400,
          color: "rgba(255,255,255,0.72)", letterSpacing: "0.01em",
          opacity: tag1In, marginBottom: 28,
        }}>Portfolio clarity for modern investors.</div>
        <div style={{
          width: interpolate(divIn, [0, 1], [0, 280]), height: 1,
          background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)`,
          marginBottom: 32,
        }} />
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 26, fontWeight: 700, color: NEON,
          letterSpacing: "0.06em", opacity: ctaIn,
          transform: `scale(${interpolate(ctaIn, [0, 1], [0.92, 1])})`,
          border: `1px solid ${NEON}44`,
          padding: "16px 52px", borderRadius: 8,
          background: `${NEON}0c`,
        }}>TRY FREE AT GAPODOX.COM</div>
      </div>
    </div>
  );
};
