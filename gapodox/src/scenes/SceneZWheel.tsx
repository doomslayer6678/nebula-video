import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const NEON = "#00ff88";
const TEAL = "#3dd9d9";

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
  { ticker: "SOFI",  price: "$14",    angle: -168, green: true  },
] as const;

type IconType = "up" | "down" | "star" | "eye" | "refresh" | "wave";

const ICONS: { a: number; r: number; type: IconType }[] = [
  { a: 7.5,   r: 83,  type: "up"      },
  { a: 59.5,  r: 83,  type: "star"    },
  { a: 111.5, r: 83,  type: "up"      },
  { a: 163.5, r: 83,  type: "down"    },
  { a: 215.5, r: 83,  type: "up"      },
  { a: 267.5, r: 83,  type: "refresh" },
  { a: 315.5, r: 83,  type: "up"      },
  { a: 33.5,  r: 139, type: "eye"     },
  { a: 85.5,  r: 139, type: "up"      },
  { a: 137.5, r: 139, type: "up"      },
  { a: 187.5, r: 139, type: "wave"    },
  { a: 241.5, r: 139, type: "up"      },
  { a: 289.5, r: 139, type: "star"    },
  { a: 341.5, r: 139, type: "up"      },
  { a: 20.5,  r: 198, type: "up"      },
  { a: 72.5,  r: 198, type: "refresh" },
  { a: 124.5, r: 198, type: "up"      },
  { a: 176.5, r: 198, type: "star"    },
  { a: 226.5, r: 198, type: "down"    },
  { a: 276.5, r: 198, type: "up"      },
  { a: 328.5, r: 198, type: "eye"     },
  { a: 46.5,  r: 258, type: "up"      },
  { a: 98.5,  r: 258, type: "wave"    },
  { a: 150.5, r: 258, type: "up"      },
  { a: 200.5, r: 258, type: "eye"     },
  { a: 254.5, r: 258, type: "up"      },
  { a: 302.5, r: 258, type: "down"    },
  { a: 354.5, r: 258, type: "up"      },
  { a: 7.5,   r: 316, type: "star"    },
  { a: 111.5, r: 316, type: "up"      },
  { a: 207,   r: 316, type: "refresh" },
  { a: 302.5, r: 316, type: "up"      },
];

const toRad = (deg: number) => (deg * Math.PI) / 180;

function renderIcon(type: IconType, frame: number, idx: number): React.ReactNode {
  const pulse = 0.55 + Math.sin(frame * 0.09 + idx * 0.7) * 0.25;
  switch (type) {
    case "up":
      return <path d="M0,-5 L4,3 L-4,3Z" fill={NEON} opacity={pulse} />;
    case "down":
      return <path d="M0,5 L4,-3 L-4,-3Z" fill="#ff4455" opacity={pulse} />;
    case "star":
      return <path d="M0,-6 L1.4,-2 L5.7,-2 L2.3,1.5 L3.5,5.6 L0,3.2 L-3.5,5.6 L-2.3,1.5 L-5.7,-2 L-1.4,-2Z" fill="#ffd700" opacity={pulse} />;
    case "eye":
      return (
        <g opacity={pulse}>
          <ellipse cx="0" cy="0" rx="6" ry="4" fill="none" stroke="#4a9eff" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="1.8" fill="#4a9eff" />
        </g>
      );
    case "refresh": {
      const rot = (frame * 0.5 + idx * 90) % 360;
      return (
        <g transform={`rotate(${rot})`} opacity={pulse}>
          <circle cx="0" cy="0" r="5" fill="none" stroke={TEAL} strokeWidth="1.2" strokeDasharray="20 10" />
          <path d="M5,0 L3,-2 L3,2Z" fill={TEAL} />
        </g>
      );
    }
    case "wave":
      return (
        <g opacity={pulse}>
          <path d="M-6,-1 Q-3,-4 0,-1 Q3,2 6,-1" stroke="#ff6b9d" fill="none" strokeWidth="1.3" />
          <path d="M-6,2 Q-3,-1 0,2 Q3,5 6,2"  stroke="#ff6b9d" fill="none" strokeWidth="1.3" />
        </g>
      );
    default:
      return null;
  }
}

export const SceneZWheel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = 960;
  const cy = 540;
  const OUTER_R = 345;
  const RING_RADII = [55, 110, 168, 228, 288, 345];
  const TICKER_R = 395;

  const ringSprings = RING_RADII.map((_, i) =>
    Math.min(spring({ frame: frame - i * 5, fps, config: { damping: 22, stiffness: 120 } }), 1)
  );
  const centerIn = Math.min(spring({ frame: frame - 0, fps, config: { damping: 14, stiffness: 220 } }), 1);
  const linesIn  = interpolate(frame, [6,  30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const iconsIn  = interpolate(frame, [24, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tickerSprings = TICKERS.map((_, i) =>
    Math.min(spring({ frame: frame - (32 + i * 3), fps, config: { damping: 18, stiffness: 100 } }), 1)
  );
  const text1In = interpolate(frame, [60, 78], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const text2In = interpolate(frame, [78, 96], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const glowPulse = 0.10 + Math.sin(frame * 0.07) * 0.04;
  const glowSize  = 480 + Math.sin(frame * 0.06) * 32;
  const ringPulseScale = 1 + (frame % 48) / 48 * 0.26;
  const ringPulseOp    = (1 - (frame % 48) / 48) * 0.28 * centerIn;

  return (
    <div style={{ position: "absolute", inset: 0, background: "#080d18", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse ${glowSize}px ${glowSize}px at ${cx}px ${cy}px, rgba(0,255,136,${glowPulse}) 0%, transparent 65%)`,
      }} />

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

      {/* Text — above the wheel */}
      <div style={{ position: "absolute", top: 18, left: 0, right: 0, textAlign: "center" }}>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 54, fontWeight: 900, color: "#ffffff",
          letterSpacing: "-0.02em", opacity: text1In,
          transform: `translateY(${interpolate(text1In, [0, 1], [-20, 0])}px)`,
        }}>
          Meet the{" "}<span style={{ color: NEON }}>Z Wheel.</span>
        </div>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 22, fontWeight: 400, color: "rgba(255,255,255,0.58)",
          marginTop: 8, opacity: text2In,
          transform: `translateY(${interpolate(text2In, [0, 1], [-16, 0])}px)`,
        }}>
          Spot concentration, overlap, and exposure instantly.
        </div>
      </div>

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
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="center-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={NEON} stopOpacity="0.8" />
            <stop offset="60%"  stopColor={NEON} stopOpacity="0.2" />
            <stop offset="100%" stopColor={NEON} stopOpacity="0"   />
          </radialGradient>
        </defs>

        <circle cx={cx} cy={cy} r={OUTER_R} fill="#0c1128" />

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

        <g clipPath="url(#wheel-clip)" opacity={linesIn}>
          {TICKERS.map((t, i) => {
            const rad = toRad(t.angle);
            const x2 = cx + Math.cos(rad) * OUTER_R;
            const y2 = cy + Math.sin(rad) * OUTER_R;
            return (
              <line key={i}
                x1={cx} y1={cy} x2={x2} y2={y2}
                stroke={t.green ? NEON : "rgba(160,180,220,0.28)"}
                strokeWidth={t.green ? 1.2 : 0.8}
                opacity={t.green ? 0.72 : 0.45}
                filter={t.green ? "url(#line-glow)" : undefined}
              />
            );
          })}
        </g>

        <g clipPath="url(#wheel-clip)" opacity={iconsIn}>
          {ICONS.map((ic, i) => {
            const rad = toRad(ic.a);
            const x = cx + Math.cos(rad) * ic.r;
            const y = cy + Math.sin(rad) * ic.r;
            return (
              <g key={i} transform={`translate(${x},${y})`}>
                {renderIcon(ic.type, frame, i)}
              </g>
            );
          })}
        </g>

        <circle cx={cx} cy={cy} r={36 * centerIn} fill="url(#center-grad)" filter="url(#center-glow)" />
        <circle cx={cx} cy={cy} r={16 * centerIn} fill="#0a0f1e" stroke={NEON} strokeWidth="1.5" opacity={centerIn} />
        <circle cx={cx} cy={cy} r={6  * centerIn} fill={NEON} opacity={centerIn} />
        <circle cx={cx} cy={cy} r={2.5 * centerIn} fill="#ffffff" opacity={centerIn} />

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
    </div>
  );
};
