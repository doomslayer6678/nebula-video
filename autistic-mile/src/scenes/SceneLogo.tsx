import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { TAMLogo } from "../components/TAMLogo";

export const SceneLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame: frame - 2, fps, config: { damping: 14, stiffness: 100 } });

  const glowW = 580 + Math.sin(frame * 0.10) * 60;
  const glowH = 580 + Math.sin(frame * 0.10) * 60;
  const glowOpacity = 0.09 + Math.sin(frame * 0.09) * 0.04;

  const dotsIn = spring({ frame: frame - 16, fps, config: { damping: 16, stiffness: 70 } });
  const DOT_ORBS = [
    { angle: 0,   dist: 280, size: 10, color: "#5aaee0", phase: 0   },
    { angle: 90,  dist: 260, size: 7,  color: "#f5e6c8", phase: 1.6 },
    { angle: 180, dist: 280, size: 10, color: "#5aaee0", phase: 0.8 },
    { angle: 270, dist: 260, size: 7,  color: "#f5e6c8", phase: 2.4 },
  ];

  const ringScale = 1 + (frame % 36) / 36 * 0.35;
  const ringOpacity = (1 - (frame % 36) / 36) * 0.25 * Math.min(enter, 1);

  return (
    <div
      style={{
        position: "absolute", inset: 0,
        background: "#1a2744",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {/* Pulsing radial glow behind logo */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse ${glowW}px ${glowH}px at 50% 50%, rgba(90,174,224,${glowOpacity}) 0%, transparent 65%)`,
      }} />

      {/* Expanding pulse ring */}
      <div style={{
        position: "absolute",
        width: 420, height: 420,
        borderRadius: "50%",
        border: "2px solid rgba(90,174,224,0.6)",
        transform: `scale(${ringScale})`,
        opacity: ringOpacity,
        pointerEvents: "none",
      }} />

      {/* Floating orbital dots */}
      {DOT_ORBS.map((orb, i) => {
        const rad = (orb.angle * Math.PI) / 180;
        const floatY = Math.sin(frame * 0.07 + orb.phase) * 12;
        const floatX = Math.cos(frame * 0.07 + orb.phase) * 6;
        return (
          <div key={i} style={{
            position: "absolute",
            left: `calc(50% + ${Math.cos(rad) * orb.dist + floatX}px - ${orb.size / 2}px)`,
            top:  `calc(50% + ${Math.sin(rad) * orb.dist + floatY}px - ${orb.size / 2}px)`,
            width: orb.size, height: orb.size,
            borderRadius: "50%", background: orb.color,
            opacity: dotsIn * 0.75,
          }} />
        );
      })}

      {/* Logo — entrance spring only, no continuous scale oscillation */}
      <div style={{
        opacity: Math.min(enter, 1),
        transform: `scale(${interpolate(enter, [0, 1], [0.82, 1])})`,
      }}>
        <TAMLogo size={400} />
      </div>
    </div>
  );
};
