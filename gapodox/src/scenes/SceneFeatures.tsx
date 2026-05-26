import React from "react";
import { useCurrentFrame, interpolate, Img, staticFile } from "remotion";

const TEAL = "#3dd9d9";
const BG = "#0d1526";

export const SceneFeatures: React.FC = () => {
  const frame = useCurrentFrame();

  const headIn = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const imgIn  = interpolate(frame, [8, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, background: BG, overflow: "hidden" }}>
      {/* Label */}
      <div style={{
        position: "absolute", top: 48, left: 180, right: 180,
        fontFamily: "monospace", fontSize: 36, color: TEAL,
        letterSpacing: "0.18em", fontWeight: 700,
        opacity: headIn,
        transform: `translateY(${interpolate(headIn, [0, 1], [-20, 0])}px)`,
      }}>
        ONE DASHBOARD. SEE EVERYTHING.
      </div>

      {/* Platform screenshot */}
      <div style={{
        position: "absolute", top: 130, left: 0, right: 0, bottom: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: imgIn,
      }}>
        <Img
          src={staticFile("one-dashboard-see-everything2.png")}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
        />
      </div>
    </div>
  );
};
