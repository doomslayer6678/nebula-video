import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const DURATION = 90;

const POINTS = [
  { headline: "No rip-and-replace.",       sub: "Works on top of your existing ATS — zero migration",                       delay: 5  },
  { headline: "No black box AI.",           sub: "Transparent, recruiter-controlled decisions at every step",               delay: 26 },
  { headline: "Just faster, smarter hiring.", sub: "A productivity multiplier built for professional recruiters",           delay: 48 },
];

export const Scene8Differentiation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(
    frame,
    [0, 12, DURATION - 12, DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div style={{ position: "absolute", inset: 0, opacity: sceneOpacity }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.09) 0%, transparent 55%)" }} />

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", gap: 36, padding: "0 140px" }}>
        {POINTS.map((p, i) => {
          const enter = spring({ frame: frame - p.delay, fps, config: { damping: 14 } });
          return (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 22, opacity: enter, transform: `translateX(${interpolate(enter, [0, 1], [-44, 0])}px)` }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7C3AED", boxShadow: "0 0 14px #7C3AED", flexShrink: 0, marginTop: 14 }} />
              <div>
                <div style={{ fontSize: 42, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.025em", lineHeight: 1.1 }}>{p.headline}</div>
                <div style={{ fontSize: 16, color: "#64748B", marginTop: 6, lineHeight: 1.5 }}>{p.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
