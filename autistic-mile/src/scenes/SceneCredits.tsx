import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const SceneCredits: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1 = spring({ frame: frame - 3,  fps, config: { damping: 16 } });
  const line2 = spring({ frame: frame - 12, fps, config: { damping: 16 } });

  const float1 = interpolate(line1, [0, 1], [24, Math.sin(frame * 0.055) * 5]);
  const float2 = interpolate(line2, [0, 1], [20, Math.sin(frame * 0.055 + 1.3) * 5]);

  const ghostX = -frame * 2.2;
  const glowW = 900 + Math.sin(frame * 0.07) * 80;
  const glowH = 500 + Math.sin(frame * 0.07) * 40;

  return (
    <div style={{ position: "absolute", inset: 0, background: "#1a2744", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse ${glowW}px ${glowH}px at 50% 50%, rgba(90,174,224,0.07) 0%, transparent 70%)` }} />
      <div style={{ position: "absolute", top: "50%", left: 0, transform: `translateX(${ghostX}px) translateY(-50%)`, fontFamily: '"Bebas Neue", Impact, "Arial Narrow", sans-serif', fontSize: 260, fontWeight: 900, color: "rgba(255,255,255,0.055)", whiteSpace: "nowrap", letterSpacing: "0.05em", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>THE AUTISTIC MILE · THE AUTISTIC MILE · THE AUTISTIC MILE ·</div>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
        <div style={{ fontSize: 62, fontWeight: 500, color: "#FFFFFF", letterSpacing: "0.06em", fontFamily: '"Inter", "Segoe UI", sans-serif', opacity: line1, transform: `translateY(${float1}px)` }}>Hosted by Jim Gaffney</div>
        <div style={{ width: interpolate(line2, [0, 1], [0, 700]), height: 2, background: "linear-gradient(90deg, transparent, #5aaee0, transparent)", borderRadius: 1 }} />
        <div style={{ fontSize: 38, fontWeight: 300, color: "#f5e6c8", letterSpacing: "0.04em", fontFamily: '"Inter", "Segoe UI", sans-serif', opacity: line2, transform: `translateY(${float2}px)` }}>In collaboration with Jacksonville School for Autism</div>
      </div>
      {[{ left: 120, bottom: 90, size: 9, color: "#5aaee0", phase: 0 }, { left: 150, bottom: 70, size: 6, color: "#f5e6c8", phase: 1.2 }, { right: 120, bottom: 90, size: 9, color: "#5aaee0", phase: 0.6 }, { right: 150, bottom: 70, size: 6, color: "#f5e6c8", phase: 1.8 }].map((d: any, i) => (
        <div key={i} style={{ position: "absolute", left: d.left, right: d.right, bottom: d.bottom + Math.sin(frame * 0.06 + d.phase) * 8, width: d.size, height: d.size, borderRadius: "50%", background: d.color, opacity: interpolate(frame, [8, 20], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />
      ))}
    </div>
  );
};
