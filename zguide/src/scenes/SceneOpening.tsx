import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const BG = "#0F1B3D";
const BLUE = "#1847F5";
const LIGHT_BLUE = "#4D8EF7";
const WHITE = "#FFFFFF";

const HexLogo: React.FC<{ size: number; opacity: number }> = ({ size, opacity }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity }}>
    <polygon
      points="50,3 93,26 93,74 50,97 7,74 7,26"
      fill={BLUE}
    />
    <text
      x="50"
      y="68"
      textAnchor="middle"
      fill={WHITE}
      fontSize="52"
      fontWeight="900"
      fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    >
      Z
    </text>
  </svg>
);

export const SceneOpening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = Math.min(
    spring({ frame, fps, config: { damping: 18, stiffness: 220 } }),
    1
  );
  const line1In = Math.min(
    spring({ frame: frame - 8, fps, config: { damping: 18, stiffness: 260 } }),
    1
  );
  const line2In = Math.min(
    spring({ frame: frame - 22, fps, config: { damping: 18, stiffness: 260 } }),
    1
  );
  const line3In = Math.min(
    spring({ frame: frame - 40, fps, config: { damping: 18, stiffness: 260 } }),
    1
  );

  const accentWidth = interpolate(logoIn, [0, 1], [0, 120]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: 32, opacity: logoIn, transform: `scale(${interpolate(logoIn, [0, 1], [0.6, 1])})` }}>
        <HexLogo size={80} opacity={1} />
      </div>

      {/* Accent bar */}
      <div
        style={{
          width: accentWidth,
          height: 4,
          background: `linear-gradient(90deg, ${BLUE}, ${LIGHT_BLUE})`,
          borderRadius: 2,
          marginBottom: 48,
        }}
      />

      {/* Line 1 */}
      <div
        style={{
          fontSize: 88,
          fontWeight: 900,
          color: WHITE,
          textAlign: "center",
          lineHeight: 1.05,
          opacity: line1In,
          transform: `translateY(${interpolate(line1In, [0, 1], [30, 0])}px) scale(${interpolate(line1In, [0, 1], [0.92, 1])})`,
          letterSpacing: "-1px",
        }}
      >
        Z Guide is a free social app
      </div>

      {/* Line 2 */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: LIGHT_BLUE,
          textAlign: "center",
          marginTop: 20,
          opacity: line2In,
          transform: `translateY(${interpolate(line2In, [0, 1], [24, 0])}px)`,
        }}
      >
        that helps people meet in real life.
      </div>

      {/* Line 3 */}
      <div
        style={{
          fontSize: 52,
          fontWeight: 400,
          color: "rgba(255,255,255,0.65)",
          textAlign: "center",
          marginTop: 28,
          opacity: line3In,
          transform: `translateY(${interpolate(line3In, [0, 1], [20, 0])}px)`,
        }}
      >
        Starting at venues like yours.
      </div>
    </div>
  );
};
