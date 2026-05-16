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
    transform: `translateY(${interpolate(progress, [0, 1], [-140, 0])}px)`,
    ...extra,
  });

  const mileUnderlineW = interpolate(mileP, [0, 1], [0, 460]);

  return (
    <div style={{ position: "absolute", inset: 0, background: "#1a2744" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 900px 500px at 50% 50%, rgba(90,174,224,0.07) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={word(theP)}>THE</span>
        <span style={word(autisticP)}>AUTISTIC</span>

        <div style={{ position: "relative", lineHeight: 0 }}>
          <span style={word(mileP, { color: "#5aaee0" })}>MILE</span>
          <div
            style={{
              position: "absolute",
              bottom: -14,
              left: "50%",
              transform: "translateX(-50%)",
              width: mileUnderlineW,
              height: 7,
              background: "linear-gradient(90deg, #5aaee0, #f5e6c8)",
              borderRadius: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
};
