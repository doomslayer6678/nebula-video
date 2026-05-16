import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

const STRIPES = [
  { color: "#E53E3E", top: -100, height: 270, delay: 0,  fromLeft: true  },
  { color: "#D69E2E", top:  100, height: 270, delay: 4,  fromLeft: false },
  { color: "#2F855A", top:  300, height: 270, delay: 8,  fromLeft: true  },
  { color: "#2B6CB0", top:  500, height: 270, delay: 4,  fromLeft: false },
  { color: "#DD6B20", top:  700, height: 270, delay: 2,  fromLeft: true  },
  { color: "#6B46C1", top:  900, height: 270, delay: 6,  fromLeft: false },
];

export const SceneFlash: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: "absolute", inset: 0, background: "#1a2744", overflow: "hidden" }}>
      {STRIPES.map((s, i) => {
        const enterX = interpolate(
          frame - s.delay,
          [0, 11],
          [s.fromLeft ? -2700 : 2700, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const exitX = interpolate(
          frame,
          [36, 56],
          [0, s.fromLeft ? 2700 : -2700],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const x = frame >= 36 ? exitX : enterX;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: s.top,
              width: 2700,
              height: s.height,
              background: s.color,
              transform: "skewX(-12deg)",
              transformOrigin: "center center",
            }}
          />
        );
      })}
    </div>
  );
};
