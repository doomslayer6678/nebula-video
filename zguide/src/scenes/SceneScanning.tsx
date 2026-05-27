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

// Browser window — same as SceneQR, fades out during transition
const BrowserLayer: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    style={{
      position: "absolute",
      width: 800,
      height: 510,
      background: "#0a0f1e",
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(0,0,0,0.5)",
      opacity,
    }}
  >
    <div
      style={{
        height: 44,
        background: "#171c30",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 8,
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E" }} />
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
      <div
        style={{
          flex: 1,
          marginLeft: 20,
          marginRight: 8,
          height: 26,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.02em",
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", monospace',
        }}
      >
        zguide.com
      </div>
    </div>
    <div style={{ width: "100%", height: "calc(100% - 44px)", overflow: "hidden" }}>
      <OffthreadVideo
        src={staticFile("video1.mov")}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
        muted
      />
    </div>
  </div>
);

// Phone with profile image — fades in after browser dissolves out
const PhoneLayer: React.FC<{ opacity: number; slideIn: number }> = ({ opacity, slideIn }) => (
  <div
    style={{
      position: "absolute",
      width: 340,
      height: 740,
      background: "#000",
      borderRadius: 48,
      border: "2px solid rgba(255,255,255,0.15)",
      boxShadow: "0 0 0 1px rgba(0,0,0,0.7), 0 48px 120px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
      overflow: "hidden",
      flexShrink: 0,
      opacity,
      transform: `translateY(${interpolate(slideIn, [0, 1], [30, 0])}px) scale(${interpolate(slideIn, [0, 1], [0.95, 1])})`,
    }}
  >
    {/* Dynamic Island */}
    <div
      style={{
        position: "absolute",
        top: 12,
        left: "50%",
        transform: "translateX(-50%)",
        width: 88,
        height: 22,
        background: "#000",
        borderRadius: 11,
        zIndex: 10,
      }}
    />
    <Img
      src={staticFile("image1.png")}
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
    />
    {/* Home indicator */}
    <div
      style={{
        position: "absolute",
        bottom: 10,
        left: "50%",
        transform: "translateX(-50%)",
        width: 100,
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

  const containerIn = Math.min(
    spring({ frame, fps, config: { damping: 20, stiffness: 160 } }),
    1
  );

  // Browser fades out over frames 70–110
  const browserOpacity = interpolate(frame, [0, 10, 70, 110], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phone fades + slides in over frames 85–125
  const phoneOpacity = interpolate(frame, [85, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phoneSlide = Math.min(
    spring({ frame: frame - 85, fps, config: { damping: 18, stiffness: 150 } }),
    1
  );

  // Text lines — first line early, second + third after profile is visible
  const line1In = Math.min(
    spring({ frame: frame - 6, fps, config: { damping: 20, stiffness: 200 } }),
    1
  );
  const line2In = Math.min(
    spring({ frame: frame - 90, fps, config: { damping: 20, stiffness: 200 } }),
    1
  );
  const privacyIn = Math.min(
    spring({ frame: frame - 120, fps, config: { damping: 20, stiffness: 200 } }),
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
        gap: 80,
        opacity: containerIn,
      }}
    >
      {/* Right side first in DOM so text stays on left */}
      {/* Left: text */}
      <div style={{ flex: "0 0 auto", maxWidth: 680 }}>
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
            fontSize: 70,
            fontWeight: 900,
            color: WHITE,
            lineHeight: 1.1,
            opacity: line1In,
            transform: `translateX(${interpolate(line1In, [0, 1], [-28, 0])}px)`,
          }}
        >
          Customers connect
          <br />
          <span style={{ color: LIGHT_BLUE }}>through Z Guide.</span>
        </div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 400,
            color: "rgba(255,255,255,0.7)",
            marginTop: 32,
            lineHeight: 1.55,
            opacity: line2In,
            transform: `translateX(${interpolate(line2In, [0, 1], [-20, 0])}px)`,
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
            transform: `translateX(${interpolate(privacyIn, [0, 1], [-20, 0])}px)`,
          }}
        >
          Ever.
        </div>
      </div>

      {/* Right: browser dissolves to phone — stacked in a shared container */}
      <div
        style={{
          position: "relative",
          flex: "0 0 auto",
          width: 800,
          height: 740,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BrowserLayer opacity={browserOpacity} />
        <PhoneLayer opacity={phoneOpacity} slideIn={phoneSlide} />
      </div>
    </div>
  );
};
