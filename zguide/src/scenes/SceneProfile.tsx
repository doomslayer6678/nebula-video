import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const BG = "#0F1B3D";
const BLUE = "#1847F5";
const LIGHT_BLUE = "#4D8EF7";
const WHITE = "#FFFFFF";

// ─── SWAP IN YOUR SCREENSHOT ──────────────────────────────────────────────
// Once image1 is uploaded to the repo, replace the placeholder <div> inside
// ProfilePhone with:
//   import { Img, staticFile } from "remotion";
//   <Img src={staticFile("image1.png")} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }} />
// ──────────────────────────────────────────────────────────────────────────

const ProfilePhone: React.FC<{ slideIn: number }> = ({ slideIn }) => (
  <div
    style={{
      position: "relative",
      width: 360,
      height: 780,
      background: "#0a0f1e",
      borderRadius: 48,
      border: "2px solid rgba(255,255,255,0.14)",
      boxShadow: "0 0 0 1px rgba(0,0,0,0.7), 0 48px 120px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)",
      overflow: "hidden",
      flexShrink: 0,
      transform: `translateY(${interpolate(slideIn, [0, 1], [60, 0])}px)`,
    }}
  >
    <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 96, height: 24, background: "#000", borderRadius: 12, zIndex: 10 }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #0F1B3D 0%, #050d1a 100%)", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 70 }}>
      <div style={{ height: 20 }} />
      <div style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 24, letterSpacing: "0.04em" }}>Z Guide Profile</div>
      <div style={{ width: 90, height: 90, borderRadius: "50%", background: `linear-gradient(135deg, ${BLUE}, ${LIGHT_BLUE})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 900, color: WHITE, marginBottom: 14, boxShadow: `0 0 30px rgba(72,142,247,0.4)` }}>Z</div>
      <div style={{ width: 160, height: 20, background: "rgba(255,255,255,0.18)", borderRadius: 5, marginBottom: 8 }} />
      <div style={{ width: 110, height: 15, background: "rgba(255,255,255,0.1)", borderRadius: 4, marginBottom: 28 }} />
      <div style={{ width: 220, height: 48, background: BLUE, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700, color: WHITE, marginBottom: 14, boxShadow: `0 4px 24px rgba(24,71,245,0.5)` }}>Connect</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", marginBottom: 32 }}>🔒  No personal info shared</div>
      <div style={{ width: "82%", display: "flex", flexDirection: "column", gap: 14, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24 }}>
        {[0.14, 0.09, 0.11, 0.08].map((op, i) => (
          <div key={i} style={{ width: `${[90,70,80,60][i]}%`, height: 13, background: `rgba(255,255,255,${op})`, borderRadius: 4 }} />
        ))}
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", width: 110, height: 4, background: "rgba(255,255,255,0.25)", borderRadius: 2, zIndex: 10 }} />
  </div>
);

export const SceneProfile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerIn = Math.min(spring({ frame, fps, config: { damping: 20, stiffness: 160 } }), 1);
  const phoneIn = Math.min(spring({ frame: frame - 8, fps, config: { damping: 16, stiffness: 130 } }), 1);
  const line1In = Math.min(spring({ frame: frame - 12, fps, config: { damping: 20, stiffness: 200 } }), 1);
  const line2In = Math.min(spring({ frame: frame - 35, fps, config: { damping: 20, stiffness: 200 } }), 1);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: BG,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 100,
        opacity: containerIn,
      }}
    >
      <div style={{ flex: "0 0 auto", maxWidth: 740 }}>
        <div style={{ width: interpolate(line1In,[0,1],[0,100]), height: 4, background: `linear-gradient(90deg, ${BLUE}, ${LIGHT_BLUE})`, borderRadius: 2, marginBottom: 36 }} />
        <div style={{ fontSize: 68, fontWeight: 900, color: WHITE, lineHeight: 1.15, opacity: line1In, transform: `translateX(${interpolate(line1In,[0,1],[-28,0])}px)` }}>
          Your customers connect
          <br />
          <span style={{ color: LIGHT_BLUE }}>with each other</span>
          <br />
          through your venue.
        </div>
        <div style={{ fontSize: 44, fontWeight: 500, color: "rgba(255,255,255,0.65)", marginTop: 32, lineHeight: 1.4, opacity: line2In, transform: `translateX(${interpolate(line2In,[0,1],[-20,0])}px)` }}>
          You become the place
          <br />
          <span style={{ color: WHITE, fontWeight: 700 }}>where relationships are built.</span>
        </div>
      </div>
      <div style={{ flex: "0 0 auto", opacity: phoneIn }}>
        <ProfilePhone slideIn={phoneIn} />
      </div>
    </div>
  );
};
