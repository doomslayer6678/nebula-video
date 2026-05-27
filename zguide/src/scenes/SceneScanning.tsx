import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  staticFile,
  OffthreadVideo,
  Img,
} from "remotion";

const BG = "#0F1B3D";
const BLUE = "#1847F5";
const LIGHT_BLUE = "#4D8EF7";
const WHITE = "#FFFFFF";

// Single phone mockup — video2.mov plays for ~5s, then cross-dissolves to image1.png
const PhoneWithTransition: React.FC<{
  phoneIn: number;
  videoOpacity: number;
  profileOpacity: number;
}> = ({ phoneIn, videoOpacity, profileOpacity }) => (
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
      opacity: phoneIn,
      transform: `translateY(${interpolate(phoneIn, [0, 1], [40, 0])}px)`,
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

    {/* Layer 1: video2.mov — phone recording of QR code pull-up, fades out at ~5s */}
    <div style={{ position: "absolute", inset: 0, opacity: videoOpacity }}>
      <OffthreadVideo
        src={staticFile("video2.mov")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top",
          display: "block",
        }}
        muted
      />
    </div>

    {/* Layer 2: image1.png profile — fades in over the last ~2s */}
    <div style={{ position: "absolute", inset: 0, opacity: profileOpacity }}>
      <Img
        src={staticFile("image1.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top",
          display: "block",
        }}
      />
    </div>

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

export const SceneScanning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone slides in at scene start
  const phoneIn = Math.min(
    spring({ frame, fps, config: { damping: 20, stiffness: 160 } }),
    1
  );

  // video2 plays for ~5s (150 frames), then dissolves out over 30 frames
  const videoOpacity = interpolate(
    frame,
    [0, 10, 145, 180],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // image1 fades in starting at frame 150, fully visible by frame 185 (~2s remaining)
  const profileOpacity = interpolate(
    frame,
    [150, 185],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Text: first line early, privacy lines after profile appears
  const line1In = Math.min(
    spring({ frame: frame - 6, fps, config: { damping: 20, stiffness: 200 } }),
    1
  );
  const line2In = Math.min(
    spring({ frame: frame - 155, fps, config: { damping: 20, stiffness: 200 } }),
    1
  );
  const privacyIn = Math.min(
    spring({ frame: frame - 178, fps, config: { damping: 20, stiffness: 200 } }),
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
      }}
    >
      {/* Left: phone — video2 dissolves to image1 */}
      <div style={{ flex: "0 0 auto" }}>
        <PhoneWithTransition
          phoneIn={phoneIn}
          videoOpacity={videoOpacity}
          profileOpacity={profileOpacity}
        />
      </div>

      {/* Right: text */}
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
            fontSize: 72,
            fontWeight: 900,
            color: WHITE,
            lineHeight: 1.1,
            opacity: line1In,
            transform: `translateX(${interpolate(line1In, [0, 1], [30, 0])}px)`,
          }}
        >
          Customers connect
          <br />
          <span style={{ color: LIGHT_BLUE }}>through Z Guide.</span>
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 400,
            color: "rgba(255,255,255,0.7)",
            marginTop: 32,
            lineHeight: 1.5,
            opacity: line2In,
            transform: `translateX(${interpolate(line2In, [0, 1], [20, 0])}px)`,
          }}
        >
          No phone numbers.
          <br />
          No personal information.
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: LIGHT_BLUE,
            marginTop: 16,
            opacity: privacyIn,
            transform: `translateX(${interpolate(privacyIn, [0, 1], [20, 0])}px)`,
          }}
        >
          Ever.
        </div>
      </div>
    </div>
  );
};
