import React from "react";
import { useCurrentFrame, interpolate, Img, staticFile } from "remotion";

const NEON = "#00ff88";
const TEAL = "#3dd9d9";

export const ScenePain: React.FC = () => {
  const frame = useCurrentFrame();

  const imgIn   = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line1In = interpolate(frame, [20, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line2In = interpolate(frame, [34, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line3In = interpolate(frame, [48, 64], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, background: "#080c14", overflow: "hidden" }}>
      {/* Platform screenshot fills the background */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: imgIn,
      }}>
        <Img
          src={staticFile("one_dashboard_your_portfolio_hedge_funds_and_congress.png")}
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        />
      </div>

      {/* Text overlay */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        pointerEvents: "none",
      }}>
        <div style={{
          background: "rgba(8,12,20,0.88)",
          padding: "24px 64px", borderRadius: 8, textAlign: "center",
        }}>
          <div style={{
            fontFamily: '"Inter", "Helvetica Neue", sans-serif',
            fontSize: 80, fontWeight: 900, color: NEON,
            opacity: line1In, letterSpacing: "-0.02em",
            transform: `translateY(${interpolate(line1In, [0, 1], [20, 0])}px)`,
          }}>
            One dashboard.
          </div>
          <div style={{
            fontFamily: '"Inter", "Helvetica Neue", sans-serif',
            fontSize: 38, fontWeight: 400, color: "rgba(255,255,255,0.85)",
            opacity: line2In, letterSpacing: "-0.01em", marginTop: 8,
            transform: `translateY(${interpolate(line2In, [0, 1], [16, 0])}px)`,
          }}>
            Your portfolio, hedge funds, and Congress,
          </div>
          <div style={{
            fontFamily: '"Inter", "Helvetica Neue", sans-serif',
            fontSize: 38, fontWeight: 400, color: TEAL,
            opacity: line3In, letterSpacing: "-0.01em",
            transform: `translateY(${interpolate(line3In, [0, 1], [16, 0])}px)`,
          }}>
            all in one place.
          </div>
        </div>
      </div>
    </div>
  );
};
