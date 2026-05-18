import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const NEON = "#00ff88";
const TEAL = "#3dd9d9";
const BLUE = "#4a9eff";
const ORANGE = "#ff9900";

const FeatureRow: React.FC<{
  icon: string; label: string; sub: string; color: string; progress: number;
}> = ({ icon, label, sub, color, progress }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 28,
    padding: "26px 40px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    opacity: progress,
    transform: `translateX(${interpolate(progress, [0, 1], [-60, 0])}px)`,
  }}>
    <div style={{
      width: 58, height: 58, borderRadius: 14, flexShrink: 0,
      background: `${color}18`, border: `1.5px solid ${color}55`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 28,
    }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 34, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.01em" }}>{label}</div>
      <div style={{ fontFamily: "monospace", fontSize: 13, color: "rgba(255,255,255,0.38)", marginTop: 4 }}>{sub}</div>
    </div>
    <div style={{ fontFamily: "monospace", fontSize: 13, color, display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
      LIVE
    </div>
  </div>
);

export const SceneFeatures: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn  = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardIn  = Math.min(spring({ frame: frame - 4,  fps, config: { damping: 20, stiffness: 150 } }), 1);
  const row1    = Math.min(spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 130 } }), 1);
  const row2    = Math.min(spring({ frame: frame - 26, fps, config: { damping: 18, stiffness: 130 } }), 1);
  const row3    = Math.min(spring({ frame: frame - 42, fps, config: { damping: 18, stiffness: 130 } }), 1);
  const tickerIn = interpolate(frame, [55, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0e1a", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 1100px 700px at 50% 50%, rgba(74,158,255,0.05) 0%, transparent 70%)",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 180px",
      }}>
        {/* Label — triple size from original */}
        <div style={{
          fontFamily: "monospace", fontSize: 36, color: TEAL,
          letterSpacing: "0.18em", marginBottom: 36,
          opacity: headIn, alignSelf: "flex-start", fontWeight: 700,
          transform: `translateY(${interpolate(headIn, [0, 1], [-20, 0])}px)`,
        }}>
          ONE DASHBOARD. SEE EVERYTHING.
        </div>

        <div style={{
          width: "100%", background: "#0d1420",
          border: "1px solid rgba(61,217,217,0.18)",
          borderRadius: 16, overflow: "hidden",
          opacity: cardIn,
          transform: `scale(${interpolate(cardIn, [0, 1], [0.96, 1])})`,
        }}>
          <FeatureRow icon="📈" label="Your stocks." sub="Real-time quotes · P&L · Sector breakdown" color={NEON} progress={row1} />
          <FeatureRow icon="₿" label="Your crypto." sub="BTC · ETH · SOL · 100+ assets tracked" color={ORANGE} progress={row2} />
          <FeatureRow icon="🌐" label="What the market’s actually doing." sub="S&P 500 · Nasdaq · Sector flows · Institutional activity" color={BLUE} progress={row3} />
        </div>

        <div style={{ marginTop: 36, display: "flex", gap: 48, opacity: tickerIn }}>
          {[
            { label: "S&P 500", val: "5,421.03", chg: "+0.82%", up: true },
            { label: "NASDAQ",  val: "17,148.25", chg: "+1.14%", up: true },
            { label: "BTC",     val: "$67,840",   chg: "-0.34%", up: false },
            { label: "VIX",     val: "13.24",     chg: "-2.1%",  up: false },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 4, letterSpacing: "0.1em" }}>{s.label}</div>
              <div style={{ fontFamily: "monospace", fontSize: 20, color: "#ffffff", fontWeight: 600 }}>{s.val}</div>
              <div style={{ fontFamily: "monospace", fontSize: 13, color: s.up ? NEON : "#ff4455" }}>{s.chg}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
