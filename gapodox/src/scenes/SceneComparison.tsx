import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const NEON = "#00ff88";
const TEAL = "#3dd9d9";
const BLUE = "#4a9eff";

const HOLDINGS = [
  { ticker: "NVDA", value: "$28,410", pct: 22, color: NEON },
  { ticker: "AAPL", value: "$18,230", pct: 18, color: TEAL },
  { ticker: "MSFT", value: "$16,820", pct: 14, color: BLUE },
  { ticker: "BTC",  value: "$12,400", pct: 10, color: "#ff9900" },
  { ticker: "AMZN", value: "$8,371",  pct: 7,  color: NEON },
];

const ACTIVITY = [
  { who: "Pelosi",      action: "Bought",    ticker: "NVDA", amount: "$500K+",   when: "2d ago", color: NEON },
  { who: "Bridgewater", action: "Added",     ticker: "SPY",  amount: "2.3M shs", when: "1w ago", color: TEAL },
  { who: "Berkshire",   action: "Increased", ticker: "OXY",  amount: "$1.2B",    when: "1w ago", color: BLUE },
  { who: "Congress",    action: "Sold",      ticker: "MSFT", amount: "$250K+",   when: "3d ago", color: "#ff4455" },
  { who: "Citadel",     action: "Opened",    ticker: "AMZN", amount: "800K shs", when: "5d ago", color: NEON },
];

export const SceneComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dividerIn = Math.min(spring({ frame: frame - 0,  fps, config: { damping: 18, stiffness: 180 } }), 1);
  const leftIn    = Math.min(spring({ frame: frame - 6,  fps, config: { damping: 18, stiffness: 130 } }), 1);
  const rightIn   = Math.min(spring({ frame: frame - 12, fps, config: { damping: 18, stiffness: 130 } }), 1);
  const textIn    = interpolate(frame, [40, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const divH      = interpolate(dividerIn, [0, 1], [0, 1080]);

  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0e1a", overflow: "hidden" }}>
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "50%",
        background: "#0d1420",
        opacity: leftIn,
        transform: `translateX(${interpolate(leftIn, [0, 1], [-80, 0])}px)`,
        padding: "170px 64px 64px",
      }}>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: TEAL, letterSpacing: "0.22em", marginBottom: 14 }}>YOUR PORTFOLIO</div>
        <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 40, fontWeight: 800, color: "#ffffff", marginBottom: 32, letterSpacing: "-0.02em" }}>$84,231</div>
        {HOLDINGS.map((h, i) => {
          const rowIn = interpolate(frame, [10 + i * 8, 24 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={h.ticker} style={{ marginBottom: 18, opacity: rowIn, transform: `translateX(${interpolate(rowIn, [0, 1], [-30, 0])}px)` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontFamily: "monospace", fontSize: 14, color: h.color, fontWeight: 700 }}>{h.ticker}</span>
                <span style={{ fontFamily: "monospace", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{h.value} {"·"} {h.pct}%</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.07)", borderRadius: 2 }}>
                <div style={{ width: `${h.pct}%`, height: "100%", background: h.color, borderRadius: 2 }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "50%",
        background: "#0a111e",
        opacity: rightIn,
        transform: `translateX(${interpolate(rightIn, [0, 1], [80, 0])}px)`,
        padding: "170px 64px 64px",
      }}>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: BLUE, letterSpacing: "0.22em", marginBottom: 14 }}>HEDGE FUNDS &amp; CONGRESS</div>
        <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 40, fontWeight: 800, color: "#ffffff", marginBottom: 32, letterSpacing: "-0.02em" }}>Recent Activity</div>
        {ACTIVITY.map((t, i) => {
          const rowIn = interpolate(frame, [14 + i * 7, 28 + i * 7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{
              marginBottom: 14, padding: "12px 16px",
              background: "rgba(255,255,255,0.025)",
              borderLeft: `3px solid ${t.color}`, borderRadius: 6,
              opacity: rowIn,
              transform: `translateX(${interpolate(rowIn, [0, 1], [30, 0])}px)`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "monospace", fontSize: 13, color: t.color, fontWeight: 700 }}>{t.who}</span>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{t.when}</span>
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>
                {t.action} {t.ticker} {"·"} {t.amount}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        position: "absolute", left: "50%", top: 0,
        width: 2, height: divH, marginLeft: -1,
        background: `linear-gradient(180deg, transparent, ${TEAL} 30%, ${TEAL} 70%, transparent)`,
      }} />

      {/* Header text — top of page */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        padding: "36px 80px 28px",
        background: "linear-gradient(180deg, rgba(8,12,20,0.95) 0%, rgba(8,12,20,0.88) 70%, transparent 100%)",
        textAlign: "center", opacity: textIn,
        transform: `translateY(${interpolate(textIn, [0, 1], [-20, 0])}px)`,
      }}>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 30, fontWeight: 500,
          color: "rgba(255,255,255,0.88)", letterSpacing: "0.01em",
          lineHeight: 1.45,
        }}>
          See how your portfolio stacks up against what{" "}
          <span style={{ color: NEON, fontWeight: 700 }}>hedge funds</span>{" "}and{" "}
          <span style={{ color: BLUE, fontWeight: 700 }}>Congress</span>{" "}are actually trading.
        </div>
      </div>
    </div>
  );
};
