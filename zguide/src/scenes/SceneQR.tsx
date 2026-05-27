import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, staticFile } from "remotion";

const BG = "#0F1B3D";
const BLUE = "#1847F5";
const LIGHT_BLUE = "#4D8EF7";
const WHITE = "#FFFFFF";

const QRPlaceholder: React.FC<{ scale: number; glow: number }> = ({ scale, glow }) => {
  const qr: number[][] = [
    [1,1,1,1,1,1,1,0,0,1,0,1,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,0,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0],
    [0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0],
    [1,0,1,0,0,1,0,0,1,0,1,0,0,1,0,1,0,0,1,0,1],
    [0,1,0,1,0,0,1,1,0,1,0,1,1,0,1,0,1,0,0,1,0],
    [1,0,1,0,1,1,0,0,1,0,1,0,0,1,0,1,0,1,1,0,1],
    [0,1,0,1,0,0,1,1,0,1,1,1,0,0,1,0,1,0,0,1,0],
    [0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,0,0,1,0,1,0,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0],
    [1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0],
    [1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1],
    [1,1,1,1,1,1,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0],
  ];

  const cellSize = 18 * scale;
  const padding = 20 * scale;

  return (
    <div
      style={{
        background: WHITE,
        borderRadius: 16 * scale,
        padding: padding,
        boxShadow: `0 0 ${60 * glow}px ${20 * glow}px rgba(72, 142, 247, 0.35)`,
        display: "inline-block",
      }}
    >
      <svg width={21 * cellSize} height={21 * cellSize}>
        {qr.map((row, rowIdx) =>
          row.map((cell, colIdx) =>
            cell === 1 ? (
              <rect
                key={`${rowIdx}-${colIdx}`}
                x={colIdx * cellSize}
                y={rowIdx * cellSize}
                width={cellSize - 1}
                height={cellSize - 1}
                fill="#0F1B3D"
                rx={1}
              />
            ) : null
          )
        )}
        <polygon
          points={`${10.5*cellSize},${8.5*cellSize} ${12.5*cellSize},${9.5*cellSize} ${12.5*cellSize},${11.5*cellSize} ${10.5*cellSize},${12.5*cellSize} ${8.5*cellSize},${11.5*cellSize} ${8.5*cellSize},${9.5*cellSize}`}
          fill={BLUE}
        />
        <text
          x={10.5 * cellSize}
          y={11.5 * cellSize}
          textAnchor="middle"
          fill="white"
          fontSize={cellSize * 1.8}
          fontWeight="900"
          fontFamily="Arial, sans-serif"
        >
          Z
        </text>
      </svg>
    </div>
  );
};

export const SceneQR: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerIn = Math.min(
    spring({ frame, fps, config: { damping: 20, stiffness: 180 } }),
    1
  );
  const qrIn = Math.min(
    spring({ frame: frame - 12, fps, config: { damping: 16, stiffness: 140 } }),
    1
  );
  const line1In = Math.min(
    spring({ frame: frame - 6, fps, config: { damping: 20, stiffness: 200 } }),
    1
  );
  const line2In = Math.min(
    spring({ frame: frame - 20, fps, config: { damping: 20, stiffness: 200 } }),
    1
  );

  const pulseGlow = frame > 30
    ? 0.7 + 0.3 * Math.sin((frame - 30) * 0.12)
    : qrIn;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: BG,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 120,
        opacity: containerIn,
      }}
    >
      <div style={{ flex: "0 0 auto", maxWidth: 700 }}>
        <div
          style={{
            width: interpolate(line1In, [0, 1], [0, 100]),
            height: 4,
            background: `linear-gradient(90deg, ${BLUE}, ${LIGHT_BLUE})`,
            borderRadius: 2,
            marginBottom: 36,
          }}
        />
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            color: WHITE,
            lineHeight: 1.1,
            opacity: line1In,
            transform: `translateX(${interpolate(line1In, [0, 1], [-30, 0])}px)`,
          }}
        >
          It starts with
          <br />
          <span style={{ color: LIGHT_BLUE }}>one QR code.</span>
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 400,
            color: "rgba(255,255,255,0.7)",
            marginTop: 28,
            lineHeight: 1.5,
            opacity: line2In,
            transform: `translateX(${interpolate(line2In, [0, 1], [-20, 0])}px)`,
          }}
        >
          Place it anywhere your
          <br />
          customers can see it.
        </div>
      </div>

      <div
        style={{
          flex: "0 0 auto",
          opacity: qrIn,
          transform: `scale(${interpolate(qrIn, [0, 1], [0.7, 1])}) rotate(${interpolate(qrIn, [0, 1], [-6, 0])}deg)`,
        }}
      >
        <QRPlaceholder scale={1.1} glow={pulseGlow} />
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 22,
            fontWeight: 600,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.08em",
          }}
        >
          SCAN WITH Z GUIDE
        </div>
      </div>
    </div>
  );
};
