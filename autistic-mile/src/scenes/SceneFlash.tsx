import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const DotGrid: React.FC<{ id: string; color: string; alpha: number }> = ({ id, color, alpha }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
    <defs>
      <pattern id={id} x="0" y="0" width="38" height="38" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="1.8" fill={color} opacity={alpha} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

export const SceneFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const topSlide = spring({ frame,          fps, config: { damping: 22, stiffness: 120 } });
  const botSlide = spring({ frame: frame - 2, fps, config: { damping: 22, stiffness: 120 } });
  const frameIn  = spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 80  } });
  const dotsIn   = interpolate(frame, [12, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineIn   = interpolate(frame, [4,  16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const ghostX = -frame * 5;

  return (
    <div style={{ position: "absolute", inset: 0, background: "#0c1522", overflow: "hidden" }}>

      {/* Sky blue top panel — slides in from top */}
      <div style={{
        position: "absolute",
        left: 0, right: 0, top: 0, height: "52%",
        background: "#5aaee0",
        transform: `translateY(${interpolate(topSlide, [0, 1], [-600, 0])}px)`,
        overflow: "hidden",
      }}>
        <DotGrid id="fl-top" color="#1a2744" alpha={0.15} />
      </div>

      {/* Navy bottom panel — slides in from bottom */}
      <div style={{
        position: "absolute",
        left: 0, right: 0, bottom: 0, height: "52%",
        background: "#1a2744",
        transform: `translateY(${interpolate(botSlide, [0, 1], [600, 0])}px)`,
        overflow: "hidden",
      }}>
        <DotGrid id="fl-bot" color="#5aaee0" alpha={0.10} />
      </div>

      {/* Giant ghost text scrolling across the seam */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: 0,
        transform: `translateX(${ghostX}px) translateY(-50%)`,
        fontFamily: '"Bebas Neue", Impact, "Arial Narrow", sans-serif',
        fontSize: 300,
        fontWeight: 900,
        color: "rgba(255,255,255,0.055)",
        whiteSpace: "nowrap",
        letterSpacing: "0.06em",
        lineHeight: 1,
        pointerEvents: "none",
        userSelect: "none",
      }}>
        THE AUTISTIC MILE · THE AUTISTIC MILE · THE AUTISTIC MILE ·
      </div>

      {/* Horizontal divider line at the seam */}
      <div style={{
        position: "absolute",
        left: 0, right: 0,
        top: "50%", marginTop: -2,
        height: 4,
        background: "linear-gradient(90deg, transparent 0%, #f5e6c8 25%, #ffffff 50%, #f5e6c8 75%, transparent 100%)",
        opacity: lineIn,
      }} />

      {/* Outlined rectangle frame */}
      <div style={{
        position: "absolute",
        left: "9%", right: "9%", top: "8%", bottom: "8%",
        border: `2px solid rgba(245,230,200,${frameIn * 0.42})`,
        opacity: frameIn,
        transform: `scale(${interpolate(frameIn, [0, 1], [0.88, 1])})`,
        pointerEvents: "none",
      }} />

      {/* Outlined dots — top left */}
      <div style={{ position: "absolute", top: 92, left: 120, display: "flex", gap: 22, opacity: dotsIn }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", border: "2px solid rgba(26,39,68,0.55)" }} />
        ))}
      </div>

      {/* Outlined dots — bottom right */}
      <div style={{ position: "absolute", bottom: 92, right: 120, display: "flex", gap: 22, opacity: dotsIn }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", border: "2px solid rgba(90,174,224,0.55)" }} />
        ))}
      </div>

      {/* Solid accent dots — top right */}
      {[
        { top: 60,  right: 60,  size: 14, color: "#5aaee0", f: 5  },
        { top: 100, right: 90,  size: 9,  color: "#5aaee0", f: 8  },
        { top: 132, right: 70,  size: 7,  color: "#f5e6c8", f: 11 },
      ].map((d, i) => (
        <div key={i} style={{
          position: "absolute",
          top: d.top, right: d.right,
          width: d.size, height: d.size,
          borderRadius: "50%",
          background: d.color,
          opacity: interpolate(frame, [d.f, d.f + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }} />
      ))}
    </div>
  );
};
