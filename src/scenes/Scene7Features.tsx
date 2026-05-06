import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const DURATION = 120;

const FEATURES = [
  {
    color: "#7C3AED",
    title: "Smarter Candidate Matching",
    desc: "AI surfaces the right candidates from your ATS and beyond — ranked by fit, not recency.",
    delay: 10,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="#A78BFA" strokeWidth="2" />
        <path d="M16.5 16.5L21 21" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 11h6M11 8v6" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    color: "#06B6D4",
    title: "Automated Outreach",
    desc: "Omni-channel sequences that run automatically — so recruiters focus on conversations, not clicks.",
    delay: 30,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M22 2L11 13" stroke="#67E8F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#67E8F9" strokeWidth="2" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    color: "#A78BFA",
    title: "Real-time Funnel Insights",
    desc: "Live pipeline data so every decision is backed by signal — not guesswork.",
    delay: 52,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="14" width="4" height="7" rx="1" fill="#A78BFA" opacity="0.7" />
        <rect x="10" y="9" width="4" height="12" rx="1" fill="#A78BFA" opacity="0.85" />
        <rect x="17" y="4" width="4" height="17" rx="1" fill="#A78BFA" />
      </svg>
    ),
  },
];

export const Scene7Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(
    frame,
    [0, 12, DURATION - 12, DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const headerEnter = spring({ frame: frame - 5, fps, config: { damping: 14 } });

  return (
    <div style={{ position: "absolute", inset: 0, opacity: sceneOpacity }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(124,58,237,0.10) 0%, transparent 55%)" }} />

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 72px", gap: 40 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#7C3AED", letterSpacing: "0.2em", textTransform: "uppercase", opacity: headerEnter }}>Platform Capabilities</div>

        <div style={{ display: "flex", gap: 22, width: "100%" }}>
          {FEATURES.map((f, i) => {
            const cardEnter = spring({ frame: frame - f.delay, fps, config: { damping: 14 } });
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.025)",
                  border: `1px solid ${f.color}28`,
                  borderRadius: 16, padding: "28px 26px",
                  display: "flex", flexDirection: "column", gap: 14,
                  opacity: cardEnter,
                  transform: `translateY(${interpolate(cardEnter, [0, 1], [52, 0])}px)`,
                  boxShadow: `0 0 48px ${f.color}10`,
                }}
              >
                <div style={{ width: 50, height: 50, borderRadius: 12, background: `${f.color}18`, border: `1px solid ${f.color}38`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {f.icon}
                </div>
                <div style={{ fontSize: 19, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.3, letterSpacing: "-0.01em" }}>{f.title}</div>
                <div style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65, flex: 1 }}>{f.desc}</div>
                <div style={{ height: 2, background: `linear-gradient(90deg, ${f.color}, transparent)`, borderRadius: 1, opacity: 0.7 }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
