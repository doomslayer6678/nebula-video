import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

// Diagonal speed beams sweeping left→right across the navy bg
const BEAMS = [
  { yTop: -160, yBot: 620,  delay: 0,  width: 320, opacity: 0.10 },
  { yTop: 300,  yBot: 1280, delay: 7,  width: 240, opacity: 0.07 },
  { yTop: 560,  yBot: 1600, delay: 3,  width: 200, opacity: 0.08 },
  { yTop: -360, yBot: 240,  delay: 11, width: 180, opacity: 0.06 },
];

export const SceneTagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cut2 = interpolate(frame, [38, 43], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineEnter = spring({ frame: frame - 48, fps, config: { damping: 18, stiffness: 80 } });

  return (
    <div style={{ position: "absolute", inset: 0, background: "#1a2744" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(90,174,224,0.06) 0%, transparent 65%)",
        }}
      />

      {BEAMS.map((b, i) => {
        const x = interpolate(frame - b.delay, [0, 55], [-700, 2600], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: b.yTop,
              width: b.width,
              height: b.yBot - b.yTop,
              background: "#5aaee0",
              opacity: b.opacity,
              transform: "skewX(-18deg)",
              pointerEvents: "none",
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: 2,
          background: "linear-gradient(90deg, #5aaee0 0%, rgba(90,174,224,0.2) 60%, transparent 100%)",
          opacity: cut2 * 0.35,
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 130,
          left: 130,
          opacity: taglineEnter,
          transform: `translateX(${interpolate(taglineEnter, [0, 1], [-28, 0])}px)`,
        }}
      >
        <div
          style={{
            width: interpolate(taglineEnter, [0, 1], [0, 64]),
            height: 3,
            background: "#5aaee0",
            borderRadius: 2,
            marginBottom: 14,
          }}
        />
        <div
          style={{
            fontSize: 30,
            fontWeight: 300,
            color: "#f5e6c8",
            letterSpacing: "0.38em",
            fontFamily: '"Inter", "Segoe UI", sans-serif',
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          EDUCATE. ENGAGE. INSPIRE.
        </div>
      </div>
    </div>
  );
};
