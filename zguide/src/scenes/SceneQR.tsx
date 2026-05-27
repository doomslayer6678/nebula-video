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

// macOS-style browser window — fits the desktop/web recording perfectly
const BrowserMockup: React.FC<{ slideIn: number }> = ({ slideIn }) => (
  <div
    style={{
      width: 800,
      height: 510,
      background: "#0a0f1e",
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(0,0,0,0.5)",
      flexShrink: 0,
      opacity: slideIn,
      transform: `translateY(${interpolate(slideIn, [0, 1], [40, 0])}px)`,
    }}
  >
    {/* Browser chrome bar */}
    <div
      style={{
        height: 44,
        background: "#171c30",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 8,
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        flexShrink: 0,
      }}
    >
      {/* Traffic lights */}
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57", flexShrink: 0 }} />
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E", flexShrink: 0 }} />
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840", flexShrink: 0 }} />
      {/* URL bar */}
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

    {/* Video fills the content area */}
    <div style={{ width: "100%", height: "calc(100% - 44px)", overflow: "hidden" }}>
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
  </div>
);

export const SceneQR: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerIn = Math.min(
    spring({ frame, fps, config: { damping: 20, stiffness: 180 } }),
    1
  );
  const browserIn = Math.min(
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
        gap: 80,
        opacity: containerIn,
      }}
    >
      {/* Left: text */}
      <div style={{ flex: "0 0 auto", maxWidth: 620 }}>
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
            fontSize: 38,
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

      {/* Right: browser window with live video */}
      <div style={{ flex: "0 0 auto" }}>
        <BrowserMockup slideIn={browserIn} />
      </div>
    </div>
  );
};
