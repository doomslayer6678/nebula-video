import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const BG = "#0F1B3D";
const BLUE = "#1847F5";
const LIGHT_BLUE = "#4D8EF7";
const WHITE = "#FFFFFF";

const PhoneMockup: React.FC<{ slideUp: number; profileIn: number }> = ({ slideUp, profileIn }) => {
  return (
    <div
      style={{
        position: "relative",
        width: 340,
        height: 720,
        background: "#0a0f1e",
        borderRadius: 44,
        border: "2px solid rgba(255,255,255,0.15)",
        boxShadow:
          "0 0 0 1px rgba(0,0,0,0.7), 0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
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

      {/* Scanning state */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#050d1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: interpolate(profileIn, [0, 0.3], [1, 0]),
        }}
      >
        <div style={{ position: "relative", width: 200, height: 200 }}>
          {[
            { top: 0, left: 0, borderTop: `3px solid ${LIGHT_BLUE}`, borderLeft: `3px solid ${LIGHT_BLUE}` },
            { top: 0, right: 0, borderTop: `3px solid ${LIGHT_BLUE}`, borderRight: `3px solid ${LIGHT_BLUE}` },
            { bottom: 0, left: 0, borderBottom: `3px solid ${LIGHT_BLUE}`, borderLeft: `3px solid ${LIGHT_BLUE}` },
            { bottom: 0, right: 0, borderBottom: `3px solid ${LIGHT_BLUE}`, borderRight: `3px solid ${LIGHT_BLUE}` },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 30,
                height: 30,
                ...s,
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              left: 8,
              right: 8,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${LIGHT_BLUE}, transparent)`,
              top: `${30 + (slideUp * 40)}%`,
              opacity: 0.8,
            }}
          />
        </div>
      </div>

      {/* Profile pull-up */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(160deg, #0F1B3D 0%, #0a0f1e 100%)",
          opacity: profileIn,
          transform: `translateY(${interpolate(profileIn, [0, 1], [60, 0])}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 80,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${BLUE}, ${LIGHT_BLUE})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 900,
            color: WHITE,
            marginBottom: 12,
          }}
        >
          Z
        </div>
        <div style={{ width: 140, height: 18, background: "rgba(255,255,255,0.2)", borderRadius: 4, marginBottom: 8 }} />
        <div style={{ width: 100, height: 14, background: "rgba(255,255,255,0.1)", borderRadius: 4, marginBottom: 28 }} />
        <div
          style={{
            width: 200,
            height: 44,
            background: BLUE,
            borderRadius: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 700,
            color: WHITE,
            marginBottom: 20,
          }}
        >
          Connect
        </div>
        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.06em",
            textAlign: "center",
          }}
        >
          No personal info shared
        </div>
        <div style={{ marginTop: 32, width: "80%", display: "flex", flexDirection: "column", gap: 12 }}>
          {[0.15, 0.1, 0.12].map((op, i) => (
            <div key={i} style={{ width: "100%", height: 14, background: `rgba(255,255,255,${op})`, borderRadius: 4 }} />
          ))}
        </div>
      </div>

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
};

export const SceneScanning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerIn = Math.min(
    spring({ frame, fps, config: { damping: 20, stiffness: 160 } }),
    1
  );
  const scanProgress = Math.min(frame / 45, 1);
  const profileIn = Math.min(
    spring({ frame: frame - 45, fps, config: { damping: 18, stiffness: 120 } }),
    1
  );
  const line1In = Math.min(
    spring({ frame: frame - 8, fps, config: { damping: 20, stiffness: 200 } }),
    1
  );
  const line2In = Math.min(
    spring({ frame: frame - 28, fps, config: { damping: 20, stiffness: 200 } }),
    1
  );
  const privacyIn = Math.min(
    spring({ frame: frame - 55, fps, config: { damping: 20, stiffness: 200 } }),
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
      <div
        style={{
          flex: "0 0 auto",
          transform: `translateY(${interpolate(containerIn, [0, 1], [30, 0])}px)`,
        }}
      >
        <PhoneMockup slideUp={scanProgress} profileIn={profileIn} />
      </div>

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
