import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const DURATION = 90;

const NODES = [
  { x: 140, y: 110, delay: 0 },
  { x: 340, y: 80, delay: 2 },
  { x: 560, y: 150, delay: 4 },
  { x: 760, y: 65, delay: 1 },
  { x: 960, y: 135, delay: 3 },
  { x: 1130, y: 95, delay: 5 },
  { x: 190, y: 590, delay: 2 },
  { x: 420, y: 615, delay: 5 },
  { x: 660, y: 575, delay: 1 },
  { x: 870, y: 605, delay: 3 },
  { x: 1090, y: 585, delay: 4 },
];

const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [6, 7], [7, 8], [8, 9], [9, 10],
  [0, 6], [2, 8], [4, 9],
];

export const Scene1Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(
    frame,
    [0, 12, DURATION - 12, DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const line1 = spring({ frame: frame - 8, fps, config: { damping: 14, stiffness: 80 } });
  const line2 = spring({ frame: frame - 32, fps, config: { damping: 14, stiffness: 80 } });

  const nodeOpacity = NODES.map((n) =>
    Math.min(1, spring({ frame: frame - n.delay, fps, config: { damping: 10 } }))
  );

  return (
    <div style={{ position: "absolute", inset: 0, opacity: sceneOpacity }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.14) 0%, transparent 55%), radial-gradient(ellipse at 70% 50%, rgba(6,182,212,0.08) 0%, transparent 55%)",
        }}
      />

      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 1280 720"
      >
        {EDGES.map(([a, b], i) => {
          const opacity = Math.min(nodeOpacity[a], nodeOpacity[b]) * 0.35;
          return (
            <line
              key={i}
              x1={NODES[a].x} y1={NODES[a].y}
              x2={NODES[b].x} y2={NODES[b].y}
              stroke="#7C3AED"
              strokeWidth="1.5"
              opacity={opacity}
            />
          );
        })}
        {NODES.map((n, i) => (
          <g key={i} opacity={nodeOpacity[i]}>
            <circle cx={n.x} cy={n.y} r={10} fill="rgba(124,58,237,0.15)" stroke="#7C3AED" strokeWidth="1.5" />
            <circle cx={n.x} cy={n.y} r={3} fill="#A78BFA" />
          </g>
        ))}
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 100px",
          gap: 20,
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.15,
            letterSpacing: "-0.025em",
            opacity: line1,
            transform: `translateY(${interpolate(line1, [0, 1], [40, 0])}px)`,
          }}
        >
          Enterprise hiring isn't broken because of talent.
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#8B5CF6",
            textAlign: "center",
            lineHeight: 1.15,
            letterSpacing: "-0.025em",
            opacity: line2,
            transform: `translateY(${interpolate(line2, [0, 1], [40, 0])}px)`,
          }}
        >
          It's broken because of execution.
        </div>
      </div>
    </div>
  );
};
