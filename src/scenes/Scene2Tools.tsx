import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const DURATION = 120;

const TOOLS = [
  { label: "ATS",         x:  70, y:  70, color: "#3B82F6", delay: 0 },
  { label: "LinkedIn",    x: 270, y:  55, color: "#38BDF8", delay: 3 },
  { label: "Spreadsheet", x: 490, y:  80, color: "#22C55E", delay: 6 },
  { label: "Email",       x: 720, y:  60, color: "#F59E0B", delay: 2 },
  { label: "CRM",         x: 930, y:  75, color: "#EC4899", delay: 4 },
  { label: "Job Boards",  x:1120, y:  65, color: "#A78BFA", delay: 1 },
  { label: "Slack",       x: 150, y: 570, color: "#818CF8", delay: 5 },
  { label: "Calendar",    x: 370, y: 590, color: "#14B8A6", delay: 2 },
  { label: "Docs",        x: 590, y: 565, color: "#FB7185", delay: 7 },
  { label: "Video",       x: 810, y: 580, color: "#F97316", delay: 3 },
  { label: "Reports",     x:1040, y: 570, color: "#67E8F9", delay: 5 },
];

function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}` : "255,255,255";
}

export const Scene2Tools: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(
    frame,
    [0, 12, DURATION - 12, DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const text1 = spring({ frame: frame - 5,  fps, config: { damping: 14 } });
  const text2 = spring({ frame: frame - 38, fps, config: { damping: 14 } });

  return (
    <div style={{ position: "absolute", inset: 0, opacity: sceneOpacity }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 60%)",
        }}
      />

      {TOOLS.map((tool, i) => {
        const enter = spring({ frame: frame - tool.delay, fps, config: { damping: 12, stiffness: 70 } });
        const floatY = Math.sin(frame * 0.04 + i * 0.9) * 5;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: tool.x,
              top: tool.y + floatY,
              padding: "7px 14px",
              background: `rgba(${hexToRgb(tool.color)},0.12)`,
              border: `1px solid rgba(${hexToRgb(tool.color)},0.35)`,
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              color: tool.color,
              opacity: enter,
              transform: `translateY(${interpolate(enter, [0, 1], [20, 0])}px)`,
              whiteSpace: "nowrap",
            }}
          >
            {tool.label}
          </div>
        );
      })}

      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        viewBox="0 0 1280 720"
      >
        <path d="M 165 88 Q 380 310 500 100" stroke="#7C3AED" strokeWidth="1" fill="none" opacity="0.12" strokeDasharray="5 5" />
        <path d="M 380 73 Q 600 250 730 80" stroke="#06B6D4" strokeWidth="1" fill="none" opacity="0.12" strokeDasharray="5 5" />
        <path d="M 240 585 Q 480 420 600 580" stroke="#F59E0B" strokeWidth="1" fill="none" opacity="0.12" strokeDasharray="5 5" />
        <path d="M 740 80 Q 890 260 830 595" stroke="#EC4899" strokeWidth="1" fill="none" opacity="0.12" strokeDasharray="5 5" />
        <path d="M 500 100 Q 700 350 820 595" stroke="#A78BFA" strokeWidth="1" fill="none" opacity="0.10" strokeDasharray="5 5" />
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "#FFFFFF",
            textAlign: "center",
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
            opacity: text1,
            transform: `translateY(${interpolate(text1, [0, 1], [30, 0])}px)`,
          }}
        >
          Too many tools. Too much manual work.
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 600,
            color: "#94A3B8",
            textAlign: "center",
            letterSpacing: "-0.01em",
            opacity: text2,
            transform: `translateY(${interpolate(text2, [0, 1], [30, 0])}px)`,
          }}
        >
          And no visibility into what's actually working.
        </div>
      </div>
    </div>
  );
};
