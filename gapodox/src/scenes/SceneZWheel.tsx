import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from "remotion";

const NEON = "#00ff88";
const TEAL = "#3dd9d9";

export const SceneZWheel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wheelIn = Math.min(spring({ frame: frame - 0, fps, config: { damping: 18, stiffness: 90 } }), 1);
  const glowPulse = 0.10 + Math.sin(frame * 0.07) * 0.04;
  const glowSize = 520 + Math.sin(frame * 0.06) * 35;

  // Expanding pulse ring that repeats
  const ringScale = 1 + (frame % 45) / 45 * 0.28;
  const ringOpacity = (1 - (frame % 45) / 45) * 0.3 * wheelIn;

  const text1In = interpolate(frame, [40, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const text2In = interpolate(frame, [58, 76], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Wheel size — leaves ~220px at bottom for text
  const wheelSize = 680;
  const cx = 960;
  const cy = 430;

  return (
    <div style={{ position: "absolute", inset: 0, background: "#080d18", overflow: "hidden" }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse ${glowSize}px ${glowSize}px at ${cx}px ${cy}px, rgba(0,255,136,${glowPulse}) 0%, transparent 65%)`,
      }} />

      {/* Pulse ring behind the wheel */}
      <div style={{
        position: "absolute",
        width: wheelSize, height: wheelSize,
        left: cx - wheelSize / 2, top: cy - wheelSize / 2,
        borderRadius: "50%",
        border: "2px solid rgba(0,255,136,0.5)",
        transform: `scale(${ringScale})`,
        opacity: ringOpacity,
        pointerEvents: "none",
      }} />

      {/* Real Z Wheel image — springs in from center */}
      <div style={{
        position: "absolute",
        width: wheelSize, height: wheelSize,
        left: cx - wheelSize / 2, top: cy - wheelSize / 2,
        opacity: wheelIn,
        transform: `scale(${interpolate(wheelIn, [0, 1], [0.35, 1])})`,
      }}>
        <Img
          src={staticFile("z-wheel.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Text — well below the wheel bottom edge (cy + wheelSize/2 = 770) */}
      <div style={{
        position: "absolute",
        bottom: 60, left: 0, right: 0, textAlign: "center",
      }}>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 56, fontWeight: 900, color: "#ffffff",
          letterSpacing: "-0.02em", opacity: text1In,
          transform: "translateY(" + interpolate(text1In, [0, 1], [20, 0]) + "px)",
        }}>
          Meet the{" "}<span style={{ color: NEON }}>Z Wheel.</span>
        </div>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 22, fontWeight: 400, color: "rgba(255,255,255,0.58)",
          marginTop: 10, opacity: text2In,
          letterSpacing: "0.01em",
        }}>
          Spot concentration, overlap, and exposure instantly.
        </div>
      </div>

      {/* Corner accent dots */}
      {[NEON, TEAL, NEON, TEAL].map((color, i) => {
        const positions = [
          { left: 80, top: 80 }, { right: 80, top: 80 },
          { left: 80, bottom: 80 }, { right: 80, bottom: 80 },
        ];
        const pos = positions[i];
        return (
          <div key={i} style={{
            position: "absolute", ...pos,
            width: 8, height: 8, borderRadius: "50%",
            background: color,
            opacity: text1In * (0.5 + Math.sin(frame * 0.07 + i * 1.2) * 0.3),
          }} />
        );
      })}
    </div>
  );
};
