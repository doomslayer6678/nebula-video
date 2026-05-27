import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  staticFile,
  OffthreadVideo,
} from "remotion";

const BG = "#0F1B3D";
const BLUE = "#1847F5";
const LIGHT_BLUE = "#4D8EF7";
const WHITE = "#FFFFFF";

const PhoneWithVideo: React.FC<{ slideIn: number }> = ({ slideIn }) => (
  <div
    style={{
      position: "relative",
      width: 360,
      height: 780,
      background: "#000",
      borderRadius: 48,
      border: "2px solid rgba(255,255,255,0.15)",
      boxShadow:
        "0 0 0 1px rgba(0,0,0,0.7), 0 48px 120px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
      overflow: "hidden",
      flexShrink: 0,
      opacity: slideIn,
      transform: `translateY(${interpolate(slideIn, [0, 1], [40, 0])}px)`,
    }}
  >
    {/* Dynamic Island */}
    <div
      style={{
        position: "absolute",
        top: 12,
        left: "50%",
        transform: "translateX(-50%)",
        width: 96,
        height: 24,
        background: "#000",
        borderRadius: 12,
        zIndex: 10,
      }}
    />
    {/* Video fills the phone screen */}
    <OffthreadVideo
      src={staticFile("video1.mov")}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "top",
        display: "block",
      }}
      muted
    />
    {/* Home indicator */}
    <div
      style={{
        position: "absolute",
        bottom: 10,
        left: "50%",
        transform: "translateX(-50%)",
        width: 110,
        height: 4,
        background: "rgba(255,255,255,0.25)",
        borderRadius: 2,
        zIndex: 10,
      }}
    />
  </div>
);

export const SceneQR: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerIn = Math.min(
    spring({ frame, fps, config: { damping: 20, stiffness: 180 } }),
    1
  );
  const phoneIn = Math.min(
    spring({ frame: frame - 10, fps, config: { damping: 16, stiffness: 140 } }),
    1
  );
  const line1In = Math.min(
    spring({ frame: frame - 6, fps, config: { damping: 20, stiffness: 200 } }),
    1
  );
  const line2In = Math.min(
    spring({ frame: frame - 20, fps, config: { damping: 20, stiffness: 200 } }),
    1
  );

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
        gap: 120,
        opacity: containerIn,
      }}
    >
      {/* Left: text */}
      <div style={{ flex: "0 0 auto", maxWidth: 700 }}>
        <div
          style={{
            width: interpolate(line1In, [0, 1], [0, 100]),
            height: 4,
            background: `linear-gradient(90deg, ${BLUE}, ${LIGHT_BLUE})`,
            borderRadius: 2,
            marginBottom: 36,
          }}
        />
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            color: WHITE,
            lineHeight: 1.1,
            opacity: line1In,
            transform: `translateX(${interpolate(line1In, [0, 1], [-30, 0])}px)`,
          }}
        >
          It starts with
          <br />
          <span style={{ color: LIGHT_BLUE }}>one QR code.</span>
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 400,
            color: "rgba(255,255,255,0.7)",
            marginTop: 28,
            lineHeight: 1.5,
            opacity: line2In,
            transform: `translateX(${interpolate(line2In, [0, 1], [-20, 0])}px)`,
          }}
        >
          Place it anywhere your
          <br />
          customers can see it.
        </div>
      </div>

      {/* Right: phone with live video */}
      <div style={{ flex: "0 0 auto" }}>
        <PhoneWithVideo slideIn={phoneIn} />
      </div>
    </div>
  );
};
