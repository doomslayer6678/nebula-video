import React from "react";
import { useCurrentFrame, interpolate, Img, staticFile } from "remotion";

const NEON = "#00ff88";
const BG = "#0d1526";

export const SceneZWheel: React.FC = () => {
  const frame = useCurrentFrame();

  const text1In = interpolate(frame, [8,  26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const text2In = interpolate(frame, [24, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const imgIn   = interpolate(frame, [4,  28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glowPulse = 0.05 + Math.sin(frame * 0.07) * 0.02;

  return (
    <div style={{ position: "absolute", inset: 0, background: BG, overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse 800px 800px at 50% 50%, rgba(0,255,136,${glowPulse}) 0%, transparent 60%)`,
      }} />
      <div style={{ position: "absolute", top: 18, left: 0, right: 0, textAlign: "center" }}>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 54, fontWeight: 900, color: "#ffffff",
          letterSpacing: "-0.02em", opacity: text1In,
          transform: `translateY(${interpolate(text1In, [0, 1], [-20, 0])}px)`,
        }}>Meet the{" "}<span style={{ color: NEON }}>Z Wheel.</span></div>
        <div style={{
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          fontSize: 22, fontWeight: 400, color: "rgba(255,255,255,0.58)",
          marginTop: 8, opacity: text2In,
          transform: `translateY(${interpolate(text2In, [0, 1], [-16, 0])}px)`,
        }}>Spot concentration, overlap, and exposure instantly.</div>
      </div>
      <div style={{
        position: "absolute", top: 130, left: 0, right: 0, bottom: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: imgIn,
      }}>
        <Img
          src={staticFile("meet_the_z_wheel_scene.png")}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
        />
      </div>
    </div>
  );
};
