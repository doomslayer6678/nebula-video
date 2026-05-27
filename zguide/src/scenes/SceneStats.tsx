import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const BG = "#0F1B3D";
const BLUE = "#1847F5";
const LIGHT_BLUE = "#4D8EF7";
const WHITE = "#FFFFFF";
const GREEN = "#22C55E";

const LineChart: React.FC<{ progress: number }> = ({ progress }) => {
  const W = 680;
  const H = 300;
  const pad = { top: 24, right: 24, bottom: 40, left: 56 };
  const cW = W - pad.left - pad.right;
  const cH = H - pad.top - pad.bottom;

  const points = [
    { x: 0.00, y: 0.82 },
    { x: 0.08, y: 0.78 },
    { x: 0.16, y: 0.72 },
    { x: 0.24, y: 0.68 },
    { x: 0.30, y: 0.74 },
    { x: 0.38, y: 0.58 },
    { x: 0.46, y: 0.48 },
    { x: 0.55, y: 0.38 },
    { x: 0.64, y: 0.28 },
    { x: 0.74, y: 0.18 },
    { x: 0.84, y: 0.12 },
    { x: 0.92, y: 0.06 },
    { x: 1.00, y: 0.02 },
  ];

  const visiblePoints = points.filter((p) => p.x <= progress);
  if (progress > 0 && visiblePoints.length < points.length) {
    const last = visiblePoints[visiblePoints.length - 1];
    const next = points[visiblePoints.length];
    if (next) {
      const segProgress = (progress - last.x) / (next.x - last.x);
      visiblePoints.push({
        x: last.x + (next.x - last.x) * segProgress,
        y: last.y + (next.y - last.y) * segProgress,
      });
    }
  }

  const toSVG = (p: { x: number; y: number }) => ({
    x: pad.left + p.x * cW,
    y: pad.top + p.y * cH,
  });

  const svgPoints = visiblePoints.map(toSVG);
  const pathD =
    svgPoints.length > 0
      ? `M ${svgPoints[0].x} ${svgPoints[0].y} ` +
        svgPoints
          .slice(1)
          .map((p, i) => {
            const prev = svgPoints[i];
            const cpx = (prev.x + p.x) / 2;
            return `C ${cpx} ${prev.y} ${cpx} ${p.y} ${p.x} ${p.y}`;
          })
          .join(" ")
      : "";

  const fillD =
    pathD && svgPoints.length > 1
      ? pathD +
        ` L ${svgPoints[svgPoints.length - 1].x} ${pad.top + cH} L ${pad.left} ${pad.top + cH} Z`
      : "";

  return (
    <svg width={W} height={H} style={{ overflow: "visible" }}>
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
        <line
          key={i}
          x1={pad.left}
          y1={pad.top + t * cH}
          x2={pad.left + cW}
          y2={pad.top + t * cH}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />
      ))}
      {fillD && (
        <path d={fillD} fill="url(#chartGradient)" opacity={0.35} />
      )}
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={GREEN} stopOpacity={0.6} />
          <stop offset="100%" stopColor={GREEN} stopOpacity={0} />
        </linearGradient>
      </defs>
      {pathD && (
        <path
          d={pathD}
          fill="none"
          stroke={GREEN}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {svgPoints.length > 0 && (
        <>
          <circle cx={svgPoints[svgPoints.length-1].x} cy={svgPoints[svgPoints.length-1].y} r={8} fill={GREEN} />
          <circle cx={svgPoints[svgPoints.length-1].x} cy={svgPoints[svgPoints.length-1].y} r={14} fill="none" stroke={GREEN} strokeWidth={2} opacity={0.4} />
        </>
      )}
      <line x1={pad.left} y1={pad.top+cH} x2={pad.left+cW} y2={pad.top+cH} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
      {["Jan","Mar","Jun","Sep","Dec"].map((label,i) => (
        <text key={i} x={pad.left+(i/4)*cW} y={H-8} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={14} fontFamily="Arial, sans-serif">{label}</text>
      ))}
    </svg>
  );
};

export const SceneStats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerIn = Math.min(
    spring({ frame, fps, config: { damping: 20, stiffness: 160 } }),
    1
  );
  const chartProgress = Math.min(interpolate(frame, [10, 100], [0, 1], { extrapolateRight: "clamp" }), 1);
  const line1In = Math.min(spring({ frame: frame - 5, fps, config: { damping: 20, stiffness: 200 } }), 1);
  const line2In = Math.min(spring({ frame: frame - 30, fps, config: { damping: 20, stiffness: 200 } }), 1);
  const line3In = Math.min(spring({ frame: frame - 55, fps, config: { damping: 20, stiffness: 200 } }), 1);

  const statCards = [
    { label: "Connections", value: "+", color: LIGHT_BLUE, delay: 15 },
    { label: "Loyal Regulars", value: "+", color: GREEN, delay: 35 },
    { label: "Revenue", value: "+", color: "#F59E0B", delay: 55 },
  ];

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
        opacity: containerIn,
        padding: "0 120px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div style={{ fontSize: 76, fontWeight: 900, color: WHITE, opacity: line1In, transform: `translateY(${interpolate(line1In,[0,1],[20,0])}px)`, lineHeight: 1.1 }}>
          More connections at your venue.
        </div>
        <div style={{ fontSize: 68, fontWeight: 800, color: LIGHT_BLUE, marginTop: 12, opacity: line2In, transform: `translateY(${interpolate(line2In,[0,1],[16,0])}px)` }}>
          More loyal regulars.
        </div>
        <div style={{ fontSize: 76, fontWeight: 900, color: GREEN, marginTop: 12, opacity: line3In, transform: `translateY(${interpolate(line3In,[0,1],[16,0])}px)` }}>
          More revenue.
        </div>
      </div>
      <div style={{ opacity: interpolate(frame,[20,45],[0,1],{extrapolateRight:"clamp"}), transform: `translateY(${interpolate(containerIn,[0,1],[20,0])}px)` }}>
        <LineChart progress={chartProgress} />
      </div>
      <div style={{ display: "flex", gap: 32, marginTop: 40 }}>
        {statCards.map((card, i) => {
          const cardIn = Math.min(spring({ frame: frame - card.delay, fps, config: { damping: 20, stiffness: 180 } }), 1);
          return (
            <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${card.color}33`, borderRadius: 16, padding: "16px 36px", display: "flex", flexDirection: "column", alignItems: "center", opacity: cardIn, transform: `translateY(${interpolate(cardIn,[0,1],[16,0])}px)` }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: card.color }}>{card.value}</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{card.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
