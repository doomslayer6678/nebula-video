import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const NEON = "#00ff88";
const TEAL = "#3dd9d9";

// All tickers from the real Z Wheel, evenly spaced clockwise from top
const TICKERS = [
  { ticker: "V",     price: "$329",   angle: -90,  green: false },
  { ticker: "GOOGL", price: "$407",   angle: -77,  green: false },
  { ticker: "NVDA",  price: "$225",   angle: -64,  green: true  },
  { ticker: "UNH",   price: "$385",   angle: -51,  green: false },
  { ticker: "TSLA",  price: "$417",   angle: -38,  green: false },
  { ticker: "MCD",   price: "$279",   angle: -25,  green: true  },
  { ticker: "AMZN",  price: "$268",   angle: -12,  green: true  },
  { ticker: "MRK",   price: "$111",   angle:   1,  green: true  },
  { ticker: "MSFT",  price: "$422",   angle:  14,  green: true  },
  { ticker: "ORCL",  price: "$188",   angle:  27,  green: false },
  { ticker: "BH.A",  price: "$1,405", angle:  40,  green: false },
  { ticker: "META",  price: "$610",   angle:  53,  green: true  },
  { ticker: "PM",    price: "$188",   angle:  66,  green: false },
  { ticker: "NKE",   price: "$42",    angle:  79,  green: true  },
  { ticker: "JPM",   price: "$299",   angle:  92,  green: true  },
  { ticker: "WMT",   price: "$131",   angle: 105,  green: false },
  { ticker: "BABA",  price: "$134",   angle: 118,  green: true  },
  { ticker: "TMUS",  price: "$187",   angle: 131,  green: false },
  { ticker: "UPS",   price: "$95",    angle: 144,  green: true  },
  { ticker: "MS",    price: "$193",   angle: 157,  green: false },
  { ticker: "NFLX",  price: "$88",    angle: 170,  green: true  },
  { ticker: "WFC",   price: "$73",    angle: 183,  green: true  },
  { ticker: "MA",    price: "$497",   angle: 196,  green: true  },
  { ticker: "GS",    price: "$956",   angle: 209,  green: false },
  { ticker: "TM",    price: "$187",   angle: 222,  green: false },
  { ticker: "SHEL",  price: "$86",    angle: 235,  green: false },
  { ticker: "ADBE",  price: "$253",   angle: 248,  green: false },
  { ticker: "PG",    price: "$142",   angle: 261,  green: true  },
  { ticker: "HD",    price: "$301",   angle: -129, green: true  },
  { ticker: "UBER",  price: "$75",    angle: -142, green: true  },
  { ticker: "AXON",  price: "$413",   angle: -155, green: true  },
  { ticker: "UPS",   price: "$95",    angle: -168, green: true  },
] as const;

// Green radiating lines
const GREEN_LINE_ANGLES = Array.from({ length: 22 }, (_, i) => i * (360 / 22) - 90);

// Gray institutional lines (4 long diagonals like in the real image)
const GRAY_LINE_ANGLES = [-42, 15, 88, 152, 210];

// Icon positions scattered at middle radii
const ORANGE_ICONS = [
  { a: 20, r: 278 }, { a: 55, r: 265 }, { a: 95, r: 282 }, { a: 130, r: 270 },
  { a: 165, r: 275 }, { a: 205, r: 262 }, { a: 245, r: 278 }, { a: 285, r: 268 },
  { a: 320, r: 272 }, { a: -20, r: 265 }, { a: -55, r: 280 }, { a: -70, r: 268 },
];
const EYE_ICONS = [
  { a: 8, r: 225 }, { a: 80, r: 232 }, { a: 150, r: 220 },
  { a: 218, r: 228 }, { a: 292, r: 222 }, { a: 340, r: 230 },
];
const STAR_ICONS = [
  { a: 40, r: 248 }, { a: 115, r: 254 }, { a: 185, r: 242 },
  { a: 255, r: 250 }, { a: 315, r: 244 }, { a: -15, r: 252 },
];
const TEAL_ICONS = [
  { a: 60, r: 196 }, { a: 160, r: 202 }, { a: 250, r: 196 }, { a: 340, r: 200 },
];
const PINK_BARS = [
  { a: 25, r: 158 }, { a: 100, r: 162 }, { a: 175, r: 155 },
  { a: 250, r: 160 }, { a: 330, r: 156 },
];

const toRad = (deg: number) => (deg * Math.PI) / 180;

export const SceneZWheel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = 960, cy = 430;
  const OUTER_R = 345;
  const RING_RADII = [55, 110, 168, 228, 288, 345];
  const TICKER_R = 395;

  // Animation values
  const ringSprings = RING_RADII.map((_, i) =>
    Math.min(spring({ frame: frame - i * 5, fps, config: { damping: 22, stiffness: 120 } }), 1)
  );
  const centerIn    = Math.min(spring({ frame: frame - 0,  fps, config: { damping: 14, stiffness: 220 } }), 1);
  const linesIn     = interpolate(frame, [6, 30],  [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const grayIn      = interpolate(frame, [14, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const iconsIn     = interpolate(frame, [24, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tickerSprings = TICKERS.map((_, i) =>
    Math.min(spring({ frame: frame - (32 + i * 3), fps, config: { damping: 18, stiffness: 100 } }), 1)
  );
  const text1In = interpolate(frame, [60, 78], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const text2In = interpolate(frame, [78, 96], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const glowPulse = 0.10 + Math.sin(frame * 0.07) * 0.04;
  const glowSize  = 480 + Math.sin(frame * 0.06) * 32;

  // Pulse ring
  const ringPulseScale = 1 + (frame % 48) / 48 * 0.26;
  const ringPulseOp    = (1 - (frame % 48) / 48) * 0.28 * centerIn;

  return (
    <div style={{ position: "absolute", inset: 0, background: "#080d18", overflow: "hidden" }}>
      {/* Radial glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse ${glowSize}px ${glowSize}px at ${cx}px ${cy}px, rgba(0,255,136,${glowPulse}) 0%, transparent 65%)`,
      }} />

      {/* Pulse ring */}
      <div style={{
        position: "absolute",
        width: OUTER_R * 2, height: OUTER_R * 2,
        left: cx - OUTER_R, top: cy - OUTER_R,
        borderRadius: "50%",
        border: "1.5px solid rgba(0,255,136,0.45)",
        transform: `scale(${ringPulseScale})`,
        opacity: ringPulseOp,
        pointerEvents: "none",
      }} />

      <svg
        width={1920} height={1080}
        style={{ position: "absolute", inset: 0 }}
        shapeRendering="geometricPrecision"
      >
        <defs>
          <clipPath id="wheel-clip">
            <circle cx={cx} cy={cy} r={OUTER_R + 2} />
          </clipPath>
          <filter id="line-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="center-glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="center-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={NEON} stopOpacity="1" />
            <stop offset="50%" stopColor={NEON} stopOpacity="0.4" />
            <stop offset="100%" stopColor={NEON} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Filled dark circle background for the wheel */}
        <circle cx={cx} cy={cy} r={OUTER_R} fill="#0c1128" />

        {/* Concentric rings */}
        {RING_RADII.map((r, i) => (
          <circle key={i}
            cx={cx} cy={cy}
            r={r * ringSprings[i]}
            fill="none"
            stroke={i === RING_RADII.length - 1 ? "rgba(61,217,217,0.35)" : "rgba(80,100,160,0.22)"}
            strokeWidth={i === RING_RADII.length - 1 ? 1.5 : 1}
            opacity={ringSprings[i]}
          />
        ))}

        {/* Gray institutional lines */}
        <g clipPath="url(#wheel-clip)" opacity={grayIn}>
          {GRAY_LINE_ANGLES.map((angle, i) => {
            const rad = toRad(angle);
            const x2 = cx + Math.cos(rad) * OUTER_R;
            const y2 = cy + Math.sin(rad) * OUTER_R;
            return (
              <line key={i} x1={cx} y1={cy} x2={x2} y2={y2}
                stroke="rgba(180,190,220,0.35)" strokeWidth={2}
              />
            );
          })}
        </g>

        {/* Green radiating lines */}
        <g clipPath="url(#wheel-clip)" opacity={linesIn}>
          {GREEN_LINE_ANGLES.map((angle, i) => {
            const rad = toRad(angle);
            const x2 = cx + Math.cos(rad) * OUTER_R;
            const y2 = cy + Math.sin(rad) * OUTER_R;
            return (
              <line key={i} x1={cx} y1={cy} x2={x2} y2={y2}
                stroke={NEON} strokeWidth={1.2} opacity={0.7}
                filter="url(#line-glow)"
              />
            );
          })}
        </g>

        {/* Mini candlestick ring around center */}
        <g opacity={centerIn}>
          {Array.from({ length: 40 }, (_, i) => {
            const angle = toRad(i * 9);
            const r = 24 + Math.sin(i * 2.1) * 7;
            const barH = 5 + Math.abs(Math.sin(i * 1.8)) * 14;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            const isGreen = i % 3 !== 0;
            return (
              <rect key={i}
                x={x - 1.2} y={y - barH / 2}
                width={2.4} height={barH}
                fill={isGreen ? NEON : "#ff6b9d"}
                opacity={0.85}
              />
            );
          })}
        </g>

        {/* Orange icons */}
        <g opacity={iconsIn}>
          {ORANGE_ICONS.map((ic, i) => {
            const rad = toRad(ic.a);
            const x = cx + Math.cos(rad) * ic.r;
            const y = cy + Math.sin(rad) * ic.r;
            const pulse = 0.55 + Math.sin(frame * 0.09 + i * 0.8) * 0.25;
            return (
              <g key={i} transform={`translate(${x},${y})`} opacity={pulse}>
                <path d="M0,-7 C4,-3 4,3 0,8 C-4,3 -4,-3 0,-7Z" fill="#ff8800" />
              </g>
            );
          })}
        </g>

        {/* Blue eye icons */}
        <g opacity={iconsIn}>
          {EYE_ICONS.map((ic, i) => {
            const rad = toRad(ic.a);
            const x = cx + Math.cos(rad) * ic.r;
            const y = cy + Math.sin(rad) * ic.r;
            const pulse = 0.5 + Math.sin(frame * 0.08 + i * 1.1) * 0.3;
            return (
              <g key={i} transform={`translate(${x},${y})`} opacity={pulse}>
                <ellipse cx="0" cy="0" rx="6" ry="4" fill="none" stroke="#4a9eff" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="1.8" fill="#4a9eff" />
              </g>
            );
          })}
        </g>

        {/* Yellow star icons */}
        <g opacity={iconsIn}>
          {STAR_ICONS.map((ic, i) => {
            const rad = toRad(ic.a);
            const x = cx + Math.cos(rad) * ic.r;
            const y = cy + Math.sin(rad) * ic.r;
            const pulse = 0.5 + Math.sin(frame * 0.1 + i * 0.9) * 0.3;
            return (
              <g key={i} transform={`translate(${x},${y})`} opacity={pulse}>
                <path d="M0,-7 L1.8,-2 L7,-2 L3,2 L5,8 L0,4 L-5,8 L-3,2 L-7,-2 L-1.8,-2Z" fill="#ffd700" />
              </g>
            );
          })}
        </g>

        {/* Teal refresh icons */}
        <g opacity={iconsIn}>
          {TEAL_ICONS.map((ic, i) => {
            const rad = toRad(ic.a);
            const x = cx + Math.cos(rad) * ic.r;
            const y = cy + Math.sin(rad) * ic.r;
            const rot = (frame * 0.5 + i * 90) % 360;
            const pulse = 0.55 + Math.sin(frame * 0.07 + i * 1.4) * 0.25;
            return (
              <g key={i} transform={`translate(${x},${y}) rotate(${rot})`} opacity={pulse}>
                <circle cx="0" cy="0" r="5" fill="none" stroke={TEAL} strokeWidth="1.2"
                  strokeDasharray="22 8" />
                <path d="M5,0 L3,-2.5 L3,2.5Z" fill={TEAL} />
              </g>
            );
          })}
        </g>

        {/* Pink wave bars near center */}
        <g opacity={iconsIn}>
          {PINK_BARS.map((ic, i) => {
            const rad = toRad(ic.a);
            const x = cx + Math.cos(rad) * ic.r;
            const y = cy + Math.sin(rad) * ic.r;
            const pulse = 0.5 + Math.sin(frame * 0.11 + i * 1.0) * 0.3;
            return (
              <g key={i} transform={`translate(${x},${y})`} opacity={pulse}>
                <path d="M-6,-1 Q-3,-4 0,-1 Q3,2 6,-1" stroke="#ff6b9d" fill="none" strokeWidth="1.4" />
                <path d="M-6,2 Q-3,-1 0,2 Q3,5 6,2"  stroke="#ff6b9d" fill="none" strokeWidth="1.4" />
              </g>
            );
          })}
        </g>

        {/* Center glow */}
        <circle cx={cx} cy={cy} r={28 * centerIn} fill="url(#center-grad)" filter="url(#center-glow)" />
        <circle cx={cx} cy={cy} r={7  * centerIn} fill={NEON} filter="url(#center-glow)" />
        <circle cx={cx} cy={cy} r={3  * centerIn} fill="#ffffff" />

        {/* Ticker labels — outside the outer ring */}
        {TICKERS.map((t, i) => {
          const rad = toRad(t.angle);
          const x = cx + Math.cos(rad) * TICKER_R;
          const y = cy + Math.sin(rad) * TICKER_R;
          const sp = tickerSprings[i];
          const col = t.green ? NEON : "rgba(200,210,230,0.85)";
          return (
            <g key={i} opacity={sp} transform={`translate(${x},${y})`}>
              <text textAnchor="middle" dy="-5" fontSize="13" fontWeight="700"
                fontFamily="monospace" fill={col}
                textRendering="geometricPrecision">
                {t.ticker}
              </text>
              <text textAnchor="middle" dy="10" fontSize="10"
                fontFamily="monospace" fill="rgba(180,190,220,0.55)"
                textRendering="geometricPrecision">
                {t.price}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Text — bottom, well below wheel (wheel bottom = cy + OUTER_R = 775) */}
      <div style={{
        position: "absolute", bottom: 52, left: 0, right: 0, textAlign: "center",
      }}>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 54, fontWeight: 900, color: "#ffffff",
          letterSpacing: "-0.02em", opacity: text1In,
          transform: "translateY(" + interpolate(text1In, [0, 1], [20, 0]) + "px)",
        }}>
          Meet the{" "}<span style={{ color: NEON }}>Z Wheel.</span>
        </div>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 22, fontWeight: 400, color: "rgba(255,255,255,0.58)",
          marginTop: 10, opacity: text2In,
        }}>
          Spot concentration, overlap, and exposure instantly.
        </div>
      </div>
    </div>
  );
};
