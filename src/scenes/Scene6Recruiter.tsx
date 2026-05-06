import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const DURATION = 90;

const SATELLITES = [
  { angle: -55, dist: 185, name: "Sarah C." },
  { angle:   5, dist: 205, name: "Marcus R." },
  { angle:  62, dist: 190, name: "Aisha J." },
  { angle: 125, dist: 178, name: "Tom W." },
  { angle: 185, dist: 198, name: "Priya M." },
];

const deg2rad = (d: number) => (d * Math.PI) / 180;

export const Scene6Recruiter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(
    frame,
    [0, 12, DURATION - 12, DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const hubEnter = spring({ frame: frame - 5,  fps, config: { damping: 12 } });
  const text1    = spring({ frame: frame - 12, fps, config: { damping: 14 } });
  const text2    = spring({ frame: frame - 34, fps, config: { damping: 14 } });

  return (
    <div style={{ position: "absolute", inset: 0, opacity: sceneOpacity }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 36% 50%, rgba(124,58,237,0.14) 0%, transparent 50%)" }} />

      <div style={{ position: "absolute", left: 0, top: 0, width: 560, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 420, height: 420 }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 420 420">
            {SATELLITES.map((s, i) => {
              const lineP = spring({ frame: frame - 12 - i * 9, fps, config: { damping: 16 } });
              const cx = 210 + Math.cos(deg2rad(s.angle)) * s.dist;
              const cy = 210 + Math.sin(deg2rad(s.angle)) * s.dist;
              return (
                <line key={i}
                  x1={210} y1={210}
                  x2={interpolate(lineP, [0, 1], [210, cx])}
                  y2={interpolate(lineP, [0, 1], [210, cy])}
                  stroke="#7C3AED" strokeWidth="1.5" opacity={0.45 * lineP}
                />
              );
            })}
          </svg>

          <div
            style={{
              position: "absolute", left: "50%", top: "50%",
              transform: `translate(-50%, -50%) scale(${interpolate(hubEnter, [0, 1], [0.2, 1])})`,
              width: 64, height: 64, borderRadius: "50%",
              background: "linear-gradient(135deg, #7C3AED, #A78BFA)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 48px rgba(124,58,237,0.55)",
              opacity: hubEnter,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="7" r="4" fill="white" />
              <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          {SATELLITES.map((s, i) => {
            const nodeP = spring({ frame: frame - 12 - i * 9, fps, config: { damping: 14 } });
            const cx = 210 + Math.cos(deg2rad(s.angle)) * s.dist;
            const cy = 210 + Math.sin(deg2rad(s.angle)) * s.dist;
            return (
              <div key={i} style={{ position: "absolute", left: cx, top: cy, transform: "translate(-50%, -50%)", opacity: nodeP, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(6,182,212,0.15)", border: "1.5px solid rgba(6,182,212,0.45)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#67E8F9" }}>
                  {s.name[0]}
                </div>
                <div style={{ fontSize: 10, color: "#64748B", whiteSpace: "nowrap" }}>{s.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ position: "absolute", right: 72, top: 0, bottom: 0, width: 530, display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
        <div style={{ fontSize: 46, fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2, letterSpacing: "-0.025em", opacity: text1, transform: `translateY(${interpolate(text1, [0, 1], [28, 0])}px)` }}>Less time coordinating.</div>
        <div style={{ fontSize: 46, fontWeight: 800, color: "#8B5CF6", lineHeight: 1.2, letterSpacing: "-0.025em", opacity: text2, transform: `translateY(${interpolate(text2, [0, 1], [28, 0])}px)` }}>More time actually hiring.</div>
      </div>
    </div>
  );
};
