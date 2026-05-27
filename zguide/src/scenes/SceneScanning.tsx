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

// This scene plays video1.mov for the first ~3s inside a phone, then
// cross-dissolves to image1.png (the Z Guide profile) to show the result
// of scanning the QR code. Text appears alongside.
const PhoneScanToProfile: React.FC<{
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

    {/* Layer 1: video1.mov — fades out during cross-dissolve */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: videoOpacity,
      }}
    >
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
    </div>

    {/* Layer 2: image1.png profile — fades in during cross-dissolve */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: profileOpacity,
      }}
    >
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

  // Phone slides in
  const phoneIn = Math.min(
    spring({ frame, fps, config: { damping: 20, stiffness: 160 } }),
    1
  );

  // video1 shows for first ~3s (90 frames), then cross-dissolves out over next 30 frames
  const videoOpacity = interpolate(frame, [0, 10, 80, 115], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // profile image fades in starting at frame 80, fully visible by frame 120
  const profileOpacity = interpolate(frame, [80, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text lines — stagger around the cross-dissolve moment
  const line1In = Math.min(
    spring({ frame: frame - 8, fps, config: { damping: 20, stiffness: 200 } }),
    1
  );
  const line2In = Math.min(
    spring({ frame: frame - 85, fps, config: { damping: 20, stiffness: 200 } }),
    1
  );
  const privacyIn = Math.min(
    spring({ frame: frame - 115, fps, config: { damping: 20, stiffness: 200 } }),
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
      {/* Left: phone — video dissolving to profile */}
      <div style={{ flex: "0 0 auto" }}>
        <PhoneScanToProfile
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
