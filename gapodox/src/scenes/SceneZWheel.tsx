import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const NEON = "#00ff88";
const TEAL = "#3dd9d9";

const TICKERS = [
  { ticker: "NVDA", price: "$225", angle: 18, dist: 430, green: true },
  { ticker: "TSLA", price: "$417", angle: 45, dist: 422, green: false },
  { ticker: "AMZN", price: "$268", angle: 72, dist: 415, green: true },
  { ticker: "MSFT", price: "$422", angle: 100, dist: 428, green: true },
  { ticker: "META", price: "$610", angle: 128, dist: 418, green: true },
  { ticker: "GOOGL", price: "$407", angle: 152, dist: 425, green: false },
  { ticker: "AAPL", price: "$198", angle: 178, dist: 420, green: false },
  { ticker: "JPM", price: "$299", angle: 204, dist: 430, green: true },
  { ticker: "BABA", price: "$134", angle: 228, dist: 415, green: true },
  { ticker: "NFLX", price: "$88", angle: 252, dist: 418, green: true },
  { ticker: "V", price: "$329", angle: 276, dist: 428, green: false },
  { ticker: "WFC", price: "$73", angle: 300, dist: 420, green: true },
  { ticker: "MA", price: "$497", angle: 324, dist: 415, green: true },
  { ticker: "GS", price: "$956", angle: 348, dist: 425, green: false },
];

const LINE_ANGLES = [18, 45, 72, 100, 128, 152, 178, 204, 228, 252, 276, 300, 324, 348, 8, 35, 62, 88, 115, 140];
const RINGS = [70, 140, 210, 290, 370];

export const SceneZWheel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = 960;
  const cy = 500;

  const centerIn = Math.min(spring({ frame: frame - 0, fps, config: { damping: 14, stiffness: 200 } }), 1);
  const ringSprings = RINGS.map((_, i) =>
    Math.min(spring({ frame: frame - i * 7, fps, config: { damping: 20, stiffness: 120 } }), 1)
  );
  const linesIn = interpolate(frame, [8, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tickerSprings = TICKERS.map((_, i) =>
    Math.min(spring({ frame: frame - (28 + i * 5), fps, config: { damping: 16, stiffness: 100 } }), 1)
  );
  const rotation = frame * 0.12;
  const text1In = interpolate(frame, [55, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const text2In = interpolate(frame, [75, 95], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glowPulse = 0.07 + Math.sin(frame * 0.08) * 0.03;

  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0e1a", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 700px 700px at ${cx}px ${cy}px, rgba(0,255,136,${glowPulse}) 0%, transparent 70%)`,
      }} />

      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="zw-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={NEON} stopOpacity="1" />
            <stop offset="40%" stopColor={NEON} stopOpacity="0.3" />
            <stop offset="100%" stopColor={NEON} stopOpacity="0" />
          </radialGradient>
          <filter id="zw-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {RINGS.map((r, i) => (
          <circle
            key={i} cx={cx} cy={cy}
            r={r * ringSprings[i]}
            fill="none"
            stroke={i === 0 ? NEON : "rgba(61,217,217,0.2)"}
            strokeWidth={i === 0 ? 2 : 1}
            opacity={ringSprings[i]}
          />
        ))}

        <g transform={`rotate(${rotation}, ${cx}, ${cy})`} opacity={linesIn}>
          {LINE_ANGLES.map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x2 = cx + Math.cos(rad) * 370;
            const y2 = cy + Math.sin(rad) * 370;
            return (
              <line key={i} x1={cx} y1={cy} x2={x2} y2={y2}
                stroke={NEON} strokeWidth={1.5} opacity={0.65} filter="url(#zw-glow)" />
            );
          })}
        </g>

        <circle cx={cx} cy={cy} r={22 * centerIn} fill="url(#zw-center)" filter="url(#zw-glow)" />
        <circle cx={cx} cy={cy} r={6 * centerIn} fill={NEON} />

        {TICKERS.map((t, i) => {
          const rad = (t.angle * Math.PI) / 180;
          const x = cx + Math.cos(rad) * t.dist;
          const y = cy + Math.sin(rad) * t.dist;
          const sp = tickerSprings[i];
          return (
            <g key={t.ticker} opacity={sp} transform={`translate(${x}, ${y})`}>
              <text textAnchor="middle" dy="-5" fontSize="15" fontWeight="700"
                fontFamily="monospace" fill={t.green ? NEON : "#ffffff"}
                textRendering="geometricPrecision">
                {t.ticker}
              </text>
              <text textAnchor="middle" dy="12" fontSize="11"
                fontFamily="monospace" fill="rgba(255,255,255,0.45)"
                textRendering="geometricPrecision">
                {t.price}
              </text>
            </g>
          );
        })}

        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const dist = [160, 230, 190, 250, 175, 220][i];
          const x = cx + Math.cos(rad) * dist;
          const y = cy + Math.sin(rad) * dist;
          const pulse = 0.4 + Math.sin(frame * 0.1 + i * 1.05) * 0.25;
          return (
            <circle key={i} cx={x} cy={y} r={4}
              fill={TEAL} opacity={linesIn * pulse} />
          );
        })}
      </svg>

      <div style={{
        position: "absolute", bottom: 80, left: 0, right: 0, textAlign: "center",
      }}>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 58, fontWeight: 900, color: "#ffffff",
          letterSpacing: "-0.02em", opacity: text1In,
          transform: `translateY(${interpolate(text1In, [0, 1], [20, 0])}px)`,
        }}>
          Meet the <span style={{ color: NEON }}>Z Wheel.</span>
        </div>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 24, fontWeight: 400, color: "rgba(255,255,255,0.6)",
          marginTop: 12, opacity: text2In,
        }}>
          Spot concentration, overlap, and exposure instantly.
        </div>
      </div>
    </div>
  );
};
