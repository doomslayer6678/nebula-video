import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from "remotion";

const NEON = "#00ff88";
const TEAL = "#3dd9d9";

export const SceneSolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flyOut = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dashIn = Math.min(spring({ frame: frame - 10, fps, config: { damping: 20, stiffness: 150 } }), 1);
  const logoIn = Math.min(spring({ frame: frame - 22, fps, config: { damping: 16, stiffness: 120 } }), 1);
  const textIn = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineW = interpolate(textIn, [0, 1], [0, 520]);

  const PLACEHOLDER_COLORS = ["#4a9eff", "#00ff88", "#ff9900", "#3dd9d9"];

  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0e1a", overflow: "hidden" }}>
      {PLACEHOLDER_COLORS.map((color, i) => (
        <div key={i} style={{
          position: "absolute",
          top: i < 2 ? 80 : undefined, bottom: i >= 2 ? 100 : undefined,
          left: i % 2 === 0 ? 60 : undefined, right: i % 2 === 1 ? 80 : undefined,
          width: 390, height: 210,
          background: "#0f1623", border: `1px solid ${color}33`, borderRadius: 8,
          opacity: Math.max(0, 1 - flyOut * 2.2),
          transform: `translateX(${-flyOut * 1600}px)`,
        }} />
      ))}

      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 1000px 640px at 50% 50%, rgba(0,255,136,0.06) 0%, transparent 70%)`,
        opacity: dashIn,
      }} />

      <div style={{
        position: "absolute", left: "50%", top: "50%",
        width: 960, height: 500,
        transform: `translate(-50%, -50%) translateX(${interpolate(dashIn, [0, 1], [320, 0])}px)`,
        opacity: dashIn,
        background: "#0d1420",
        border: "1px solid rgba(61,217,217,0.22)",
        borderRadius: 16, overflow: "hidden",
      }}>
        <div style={{
          padding: "20px 32px", borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: `${TEAL}22`, border: `1px solid ${TEAL}55` }} />
          <span style={{ color: "rgba(255,255,255,0.45)", fontFamily: "monospace", fontSize: 13 }}>Portfolio Overview</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            {["1D", "1W", "1M", "1Y"].map((t) => (
              <div key={t} style={{
                padding: "4px 12px", borderRadius: 4, fontSize: 12, fontFamily: "monospace",
                background: t === "1M" ? `${TEAL}22` : "transparent",
                border: `1px solid ${t === "1M" ? TEAL : "rgba(255,255,255,0.1)"}`,
                color: t === "1M" ? TEAL : "rgba(255,255,255,0.35)",
              }}>{t}</div>
            ))}
          </div>
        </div>
        <div style={{ padding: "24px 32px", display: "flex", gap: 32 }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontFamily: "monospace", marginBottom: 8 }}>TOTAL VALUE</div>
            <div style={{ color: NEON, fontSize: 44, fontWeight: 700, fontFamily: "monospace" }}>$84,231.40</div>
            <div style={{ color: NEON, fontSize: 14, fontFamily: "monospace", marginTop: 4 }}>▲ +12.4% this month</div>
            <svg width="100%" height="110" style={{ marginTop: 20 }}>
              <polyline points="0,100 80,78 160,83 240,58 320,48 400,28 480,18 540,12" stroke={NEON} strokeWidth="2.5" fill="none" />
              <polyline points="0,100 80,78 160,83 240,58 320,48 400,28 480,18 540,12 540,110 0,110" fill={`${NEON}12`} stroke="none" />
            </svg>
          </div>
          <div style={{ width: 200 }}>
            {[
              { ticker: "NVDA", pct: 22, color: NEON },
              { ticker: "AAPL", pct: 18, color: TEAL },
              { ticker: "MSFT", pct: 14, color: "#4a9eff" },
              { ticker: "BTC", pct: 12, color: "#ff9900" },
              { ticker: "Other", pct: 34, color: "rgba(255,255,255,0.25)" },
            ].map((h, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, fontFamily: "monospace" }}>{h.ticker}</span>
                  <span style={{ color: h.color, fontSize: 12, fontFamily: "monospace" }}>{h.pct}%</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2 }}>
                  <div style={{ width: `${h.pct}%`, height: "100%", background: h.color, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        position: "absolute", top: 52, left: "50%",
        transform: `translateX(-50%) scale(${logoIn})`,
        opacity: logoIn,
      }}>
        <img src={staticFile("gapodox-logo.png")} alt="Gapodox" style={{ height: 44 }} />
      </div>

      <div style={{ position: "absolute", bottom: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <div style={{ width: lineW, height: 2, background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)`, margin: "0 auto 24px" }} />
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 44, fontWeight: 700, color: "#ffffff",
          opacity: textIn, letterSpacing: "-0.01em", whiteSpace: "nowrap",
        }}>
          Gapodox brings it all together.
        </div>
      </div>
    </div>
  );
};
