import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const DURATION = 150;

const CANDIDATES = [
  { name: "Sarah Chen",    role: "Sr. Engineer",   match: 94, delay: 22 },
  { name: "Marcus Rivera", role: "Product Lead",   match: 88, delay: 34 },
  { name: "Aisha Johnson", role: "Data Scientist",  match: 91, delay: 46 },
  { name: "Tom Walsh",     role: "DevOps Lead",    match: 85, delay: 58 },
];

const PIPELINE = [
  { label: "Sourced",    value: 87, color: "#7C3AED" },
  { label: "Outreached", value: 62, color: "#06B6D4" },
  { label: "Responded",  value: 41, color: "#A78BFA" },
];

export const Scene4Platform: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(
    frame,
    [0, 15, DURATION - 15, DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const text1   = spring({ frame: frame - 8,  fps, config: { damping: 14 } });
  const text2   = spring({ frame: frame - 30, fps, config: { damping: 14 } });
  const uiSlide = spring({ frame: frame - 5,  fps, config: { damping: 14 } });

  return (
    <div style={{ position: "absolute", inset: 0, opacity: sceneOpacity }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 65% 50%, rgba(124,58,237,0.12) 0%, transparent 55%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 72, top: 0, bottom: 0, width: 460,
          display: "flex", flexDirection: "column", justifyContent: "center", gap: 20,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, color: "#7C3AED", letterSpacing: "0.18em", textTransform: "uppercase", opacity: text1 }}>
          The Platform
        </div>
        <div
          style={{
            fontSize: 40, fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2,
            letterSpacing: "-0.025em", opacity: text1,
            transform: `translateY(${interpolate(text1, [0, 1], [30, 0])}px)`,
          }}
        >
          AI-powered recruiting that sits on top of your ATS.
        </div>
        <div
          style={{
            fontSize: 20, fontWeight: 500, color: "#94A3B8", lineHeight: 1.55,
            opacity: text2,
            transform: `translateY(${interpolate(text2, [0, 1], [20, 0])}px)`,
          }}
        >
          Turns disconnected workflows into one coordinated system.
        </div>
      </div>

      <div
        style={{
          position: "absolute", right: 56, top: 52, width: 580, bottom: 52,
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16, overflow: "hidden",
          opacity: uiSlide,
          transform: `translateX(${interpolate(uiSlide, [0, 1], [44, 0])}px)`,
          boxShadow: "0 0 80px rgba(124,58,237,0.12)",
        }}
      >
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: 8,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7C3AED", boxShadow: "0 0 8px #7C3AED" }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#E2E8F0" }}>AI Candidate Matching</span>
          <div style={{ marginLeft: "auto", background: "rgba(124,58,237,0.2)", color: "#A78BFA", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.08em" }}>LIVE</div>
        </div>

        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {CANDIDATES.map((c, i) => {
            const cardEnter = spring({ frame: frame - c.delay, fps, config: { damping: 14 } });
            return (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 10, padding: "11px 14px",
                  display: "flex", alignItems: "center", gap: 12,
                  opacity: cardEnter,
                  transform: `translateX(${interpolate(cardEnter, [0, 1], [28, 0])}px)`,
                }}
              >
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>
                  {c.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#E2E8F0" }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>{c.role}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: c.match >= 90 ? "#A78BFA" : "#67E8F9" }}>{c.match}%</div>
                  <div style={{ fontSize: 9, color: "#475569", fontWeight: 500 }}>match</div>
                </div>
              </div>
            );
          })}

          <div style={{ marginTop: 6 }}>
            <div style={{ fontSize: 10, color: "#475569", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Funnel</div>
            {PIPELINE.map((p, i) => {
              const barP = spring({ frame: frame - 72 - i * 14, fps, config: { damping: 18 } });
              return (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 11, color: "#94A3B8" }}>{p.label}</span>
                    <span style={{ fontSize: 11, color: p.color, fontWeight: 600 }}>{p.value}%</span>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                    <div style={{ height: "100%", width: `${Math.min(barP, 1) * p.value}%`, background: p.color, borderRadius: 2 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
