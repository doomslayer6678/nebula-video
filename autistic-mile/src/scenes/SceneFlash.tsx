import React from "react";
import { useCurrentFrame } from "remotion";

// Logo color palette: Red, Yellow, Green, Blue — rapid subliminal hits
const FLASHES = [
  { from: 0,  to: 2,  bg: "#000000" },
  { from: 2,  to: 7,  bg: "#D32F2F" }, // Red
  { from: 7,  to: 12, bg: "#F9A825" }, // Yellow/Gold
  { from: 12, to: 17, bg: "#2E7D32" }, // Green
  { from: 17, to: 22, bg: "#1565C0" }, // Blue
  { from: 22, to: 60, bg: "#1a2744" }, // Deep navy — hold
];

function getBg(frame: number): string {
  for (let i = FLASHES.length - 1; i >= 0; i--) {
    if (frame >= FLASHES[i].from) return FLASHES[i].bg;
  }
  return "#000000";
}

export const SceneFlash: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, background: getBg(frame) }} />
  );
};
