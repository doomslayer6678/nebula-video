import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const NEON = "#00ff88";
const RED = "#ff4455";

const FakeWindow: React.FC<{
  title: string;
  rows: string[];
  accentColor: string;
  style?: React.CSSProperties;
}> = ({ title, rows, accentColor, style }) => (
  <div style={{
    background: "#0f1623",
    border: `1px solid ${accentColor}44`,
    borderRadius: 10, overflow: "hidden",
    width: 400,
    ...style,
  }}>
    <div style={{
      background: `${accentColor}18`,
      borderBottom: `1px solid ${accentColor}33`,
      padding: "10px 16px",
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
      <span style={{ marginLeft: 8, fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>{title}</span>
    </div>
    <div style={{ padding: "12px 16px" }}>
      {rows.map((r, i) => {
        const parts = r.split("|");
        return (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between",
            padding: "7px 0",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            fontSize: 13, fontFamily: "monospace",
          }}>
            <span style={{ color: "rgba(255,255,255,0.65)" }}>{parts[0]}</span>
            <span style={{ color: parts[1].includes("-") ? RED : NEON }}>{parts[1]}</span>
          </div>
        );
      })}
    </div>
  </div>
);

export const ScenePain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const w1 = Math.min(spring({ frame: frame - 0, fps, config: { damping: 18, stiffness: 200 } }), 1);
  const w2 = Math.min(spring({ frame: frame - 5, fps, config: { damping: 18, stiffness: 200 } }), 1);
  const w3 = Math.min(spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 200 } }), 1);
  const w4 = Math.min(spring({ frame: frame - 15, fps, config: { damping: 18, stiffness: 200 } }), 1);
  const text1 = interpolate(frame, [24, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const text2 = interpolate(frame, [38, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, background: "#080c14", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: 80, left: 60, opacity: w1,
        transform: `translate(${interpolate(w1, [0, 1], [-280, 0])}px, ${interpolate(w1, [0, 1], [-180, 0])}px) rotate(-3deg)`,
      }}>
        <FakeWindow title="Fidelity — Portfolio" accentColor="#4a9eff" rows={["AAPL|+$2,341", "MSFT|+$1,820", "TSLA|-$443", "AMZN|+$992", "NVDA|+$3,210"]} />
      </div>

      <div style={{
        position: "absolute", top: 60, right: 80, opacity: w2,
        transform: `translate(${interpolate(w2, [0, 1], [280, 0])}px, ${interpolate(w2, [0, 1], [-180, 0])}px) rotate(3deg)`,
      }}>
        <FakeWindow title="Robinhood — Crypto" accentColor="#00ff88" rows={["BTC|+4.2%", "ETH|-1.8%", "SOL|+7.1%", "DOGE|-3.2%", "LINK|+2.9%"]} />
      </div>

      <div style={{
        position: "absolute", bottom: 100, left: 80, opacity: w3,
        transform: `translate(${interpolate(w3, [0, 1], [-280, 0])}px, ${interpolate(w3, [0, 1], [180, 0])}px) rotate(2deg)`,
      }}>
        <FakeWindow title="TD Ameritrade — Options" accentColor="#ff9900" rows={["AAPL 180C|-$220", "SPY 450P|+$340", "QQQ 370C|-$180", "NVDA 500C|+$890"]} />
      </div>

      <div style={{
        position: "absolute", bottom: 80, right: 60, opacity: w4,
        transform: `translate(${interpolate(w4, [0, 1], [280, 0])}px, ${interpolate(w4, [0, 1], [180, 0])}px) rotate(-2deg)`,
      }}>
        <FakeWindow title="Google Sheets — Tracker" accentColor="#3dd9d9" rows={["Portfolio total|$84,231", "YTD return|+12.4%", "vs S&P 500|-3.1%", "Last updated|3 days ago"]} />
      </div>

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        pointerEvents: "none",
      }}>
        <div style={{ background: "rgba(8,12,20,0.88)", padding: "20px 56px", borderRadius: 6, textAlign: "center" }}>
          <div style={{
            fontFamily: '"Inter", "Helvetica Neue", sans-serif',
            fontSize: 68, fontWeight: 900, color: "#ffffff",
            opacity: text1, letterSpacing: "-0.02em",
            transform: `translateY(${interpolate(text1, [0, 1], [20, 0])}px)`,
          }}>
            Too many screens.
          </div>
          <div style={{
            fontFamily: '"Inter", "Helvetica Neue", sans-serif',
            fontSize: 68, fontWeight: 900, color: RED,
            opacity: text2, letterSpacing: "-0.02em", marginTop: 8,
            transform: `translateY(${interpolate(text2, [0, 1], [20, 0])}px)`,
          }}>
            Zero full picture.
          </div>
        </div>
      </div>
    </div>
  );
};
