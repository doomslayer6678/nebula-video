import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const DotGrid: React.FC<{ id: string; color: string; alpha: number }> = ({ id, color, alpha }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
    <defs>
      <pattern id={id} x="0" y="0" width="38" height="38" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="1.8" fill={color} opacity={alpha} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

const SPLIT = 46;

export const SceneTagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftSlide  = spring({ frame,           fps, config: { damping: 22, stiffness: 110 } });
  const rightSlide = spring({ frame: frame - 3, fps, config: { damping: 22, stiffness: 110 } });
  const dividerIn  = interpolate(frame, [14, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const frameIn    = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dotsIn     = interpolate(frame, [8, 20], [0, 1],  { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const label   = spring({ frame: frame - 16, fps, config: { damping: 18, stiffness: 80 } });
  const educate = spring({ frame: frame - 22, fps, config: { damping: 18, stiffness: 80 } });
  const engage  = spring({ frame: frame - 30, fps, config: { damping: 18, stiffness: 80 } });
  const inspire = spring({ frame: frame - 38, fps, config: { damping: 18, stiffness: 80 } });

  const contentFloat = Math.sin(frame * 0.06) * 5;
  const ghostX = -frame * 2.5;
  const scanX = interpolate(frame % 44, [0, 44], [-20, 1100]);
  const divGlowY = (frame * 16) % 1160 - 40;

  return (
    <div style={{ position: "absolute", inset: 0, background: "#0c1522", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${SPLIT}%`, background: "#5aaee0", transform: `translateX(${interpolate(leftSlide, [0, 1], [-100, 0])}%)`, overflow: "hidden" }}>
        <DotGrid id="tl-left" color="#1a2744" alpha={0.13} />
        <div style={{ position: "absolute", top: "50%", left: -40, transform: `translateX(${ghostX}px) translateY(-50%)`, fontFamily: '"Bebas Neue", Impact, "Arial Narrow", sans-serif', fontSize: 240, fontWeight: 900, color: "rgba(26,39,68,0.10)", whiteSpace: "nowrap", letterSpacing: "0.04em", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>AUTISTIC MILE · AUTISTIC MILE ·</div>
        <div style={{ position: "absolute", top: 92, left: 80, display: "flex", gap: 20, opacity: dotsIn }}>
          {[0,1,2,3,4,5].map(i => (<div key={i} style={{ width: 11, height: 11, borderRadius: "50%", border: "2px solid rgba(26,39,68,0.45)", opacity: 0.6 + Math.sin(frame * 0.07 + i * 0.5) * 0.4 }} />))}
        </div>
        <div style={{ position: "absolute", bottom: 92, left: 80, display: "flex", gap: 18, opacity: dotsIn }}>
          {[0,1,2].map(i => (<div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(26,39,68,0.30)", opacity: 0.5 + Math.sin(frame * 0.09 + i * 0.8) * 0.5 }} />))}
        </div>
      </div>
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: `${100 - SPLIT}%`, background: "#1a2744", transform: `translateX(${interpolate(rightSlide, [0, 1], [100, 0])}%)`, overflow: "hidden" }}>
        <DotGrid id="tl-right" color="#5aaee0" alpha={0.09} />
        <div style={{ position: "absolute", left: scanX, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg, transparent, rgba(90,174,224,0.15), transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: "8%", right: "7%", top: "12%", bottom: "12%", border: `1.5px solid rgba(90,174,224,${frameIn * 0.28})`, opacity: frameIn }} />
        <div style={{ position: "absolute", right: 110, top: "50%", transform: `translateY(calc(-50% + ${contentFloat}px))`, textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#5aaee0", letterSpacing: "0.30em", fontFamily: '"Inter", "Segoe UI", sans-serif', textTransform: "uppercase", marginBottom: 18, opacity: label, transform: `translateX(${interpolate(label, [0, 1], [40, 0])}px)` }}>THE AUTISTIC MILE</div>
          <div style={{ width: interpolate(educate, [0, 1], [0, 90]), height: 3, background: "#5aaee0", borderRadius: 2, marginBottom: 24, marginLeft: "auto" }} />
          {[
            { s: educate, text: "EDUCATE." },
            { s: engage,  text: "ENGAGE."  },
            { s: inspire, text: "INSPIRE."  },
          ].map(({ s, text }) => (
            <div key={text} style={{ fontSize: 30, fontWeight: 300, color: "#f5e6c8", letterSpacing: "0.38em", fontFamily: '"Inter", "Segoe UI", sans-serif', textTransform: "uppercase", lineHeight: 1.9, opacity: s, transform: `translateX(${interpolate(s, [0, 1], [30, 0])}px)` }}>{text}</div>
          ))}
        </div>
        {[{ top: 62, right: 62, size: 13, color: "#5aaee0" }, { top: 100, right: 90, size: 9, color: "#5aaee0" }, { top: 130, right: 72, size: 7, color: "#f5e6c8" }].map((d, i) => (
          <div key={i} style={{ position: "absolute", top: d.top, right: d.right, width: d.size, height: d.size, borderRadius: "50%", background: d.color, opacity: dotsIn * (0.6 + Math.sin(frame * 0.08 + i * 1.2) * 0.4) }} />
        ))}
        <div style={{ position: "absolute", bottom: 92, right: 110, display: "flex", gap: 20, opacity: dotsIn }}>
          {[0,1,2,3].map(i => (<div key={i} style={{ width: 11, height: 11, borderRadius: "50%", border: "1.5px solid rgba(90,174,224,0.45)", opacity: 0.5 + Math.sin(frame * 0.07 + i * 0.6) * 0.5 }} />))}
        </div>
      </div>
      <div style={{ position: "absolute", left: `${SPLIT}%`, top: 0, bottom: 0, width: 4, marginLeft: -2, background: "linear-gradient(180deg, transparent 0%, #f5e6c8 20%, #5aaee0 50%, #f5e6c8 80%, transparent 100%)", opacity: dividerIn }} />
      <div style={{ position: "absolute", left: `${SPLIT}%`, marginLeft: -8, top: divGlowY, width: 20, height: 60, background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.55) 0%, transparent 70%)", pointerEvents: "none", opacity: dividerIn }} />
    </div>
  );
};
