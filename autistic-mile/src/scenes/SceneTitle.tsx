import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const SLAM = { damping: 9, stiffness: 320, mass: 0.45 };

export const SceneTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const theP      = spring({ frame: frame - 0,  fps, config: SLAM });
  const autisticP = spring({ frame: frame - 16, fps, config: SLAM });
  const mileP     = spring({ frame: frame - 32, fps, config: SLAM });

  const word = (progress: number, extra?: React.CSSProperties): React.CSSProperties => ({
    display: "block",
    fontFamily: '"Bebas Neue", Impact, "Arial Narrow", sans-serif',
    fontWeight: 900,
    fontSize: 210,
    lineHeight: 0.88,
    color: "#FFFFFF",
    letterSpacing: "0.04em",
    textAlign: "center",
    opacity: Math.min(progress, 1),
    transform: `translateY(${interpolate(progress, [0, 1], [-130, 0])}px)`,
    ...extra,
  });

  const bar1W = interpolate(autisticP, [0.6, 1], [0, 600], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bar2W = interpolate(mileP,     [0.6, 1], [0, 600], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const mileUnderlineW = interpolate(mileP, [0, 1], [0, 460]);

  return (
    <div style={{ position: "absolute", inset: 0, background: "#1a2744" }}>

      {/* Deep radial glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 1100px 620px at 50% 50%, rgba(90,174,224,0.10) 0%, transparent 70%)",
      }} />

      {/* Ghost MILE text behind */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: '"Bebas Neue", Impact, "Arial Narrow", sans-serif',
        fontSize: 460,
        fontWeight: 900,
        color: "rgba(90,174,224,0.04)",
        whiteSpace: "nowrap",
        letterSpacing: "0.04em",
        lineHeight: 1,
        pointerEvents: "none",
        userSelect: "none",
      }}>
        MILE
      </div>

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <span style={word(theP, { fontSize: 155, color: "rgba(255,255,255,0.80)" })}>THE</span>

        <div style={{
          width: bar1W,
          height: 2,
          background: "linear-gradient(90deg, transparent 0%, rgba(90,174,224,0.55) 50%, transparent 100%)",
          margin: "8px 0",
          borderRadius: 1,
        }} />

        <span style={word(autisticP)}>AUTISTIC</span>

        <div style={{
          width: bar2W,
          height: 2,
          background: "linear-gradient(90deg, transparent 0%, rgba(245,230,200,0.55) 50%, transparent 100%)",
          margin: "8px 0",
          borderRadius: 1,
        }} />

        <div style={{ position: "relative", lineHeight: 0 }}>
          <span style={word(mileP, { color: "#5aaee0", fontSize: 230 })}>MILE</span>
          <div style={{
            position: "absolute",
            bottom: -18,
            left: "50%",
            transform: "translateX(-50%)",
            width: mileUnderlineW,
            height: 7,
            background: "linear-gradient(90deg, #5aaee0, #f5e6c8)",
            borderRadius: 4,
          }} />
        </div>
      </div>
    </div>
  );
};
