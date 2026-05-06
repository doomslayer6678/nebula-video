import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const DURATION = 90;

export const Scene3Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(
    frame,
    [0, 12, DURATION - 12, DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const logoEnter = spring({ frame: frame - 5,  fps, config: { damping: 12, stiffness: 60 } });
  const lineEnter = spring({ frame: frame - 22, fps, config: { damping: 18 } });
  const textEnter = spring({ frame: frame - 28, fps, config: { damping: 14 } });

  const glowRadius = interpolate(frame, [0, DURATION], [280, 520], { extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, opacity: sceneOpacity }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse ${glowRadius}px ${glowRadius * 0.6}px at 50% 48%, rgba(124,58,237,0.28) 0%, transparent 70%)`,
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
          gap: 28,
        }}
      >
        <div
          style={{
            opacity: logoEnter,
            transform: `scale(${interpolate(logoEnter, [0, 1], [0.65, 1])})`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              background: "linear-gradient(135deg, #C4B5FD 0%, #7C3AED 45%, #06B6D4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            nebula
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#475569",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              marginTop: 10,
            }}
          >
            AI Recruiting Platform
          </div>
        </div>

        <div
          style={{
            width: interpolate(lineEnter, [0, 1], [0, 220]),
            height: 1,
            background: "linear-gradient(90deg, transparent, #7C3AED, transparent)",
          }}
        />

        <div
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: "#FFFFFF",
            textAlign: "center",
            letterSpacing: "-0.02em",
            opacity: textEnter,
            transform: `translateY(${interpolate(textEnter, [0, 1], [22, 0])}px)`,
          }}
        >
          Nebula changes that.
        </div>
      </div>
    </div>
  );
};
