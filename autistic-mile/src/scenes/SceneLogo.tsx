import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { TAMLogo } from "../components/TAMLogo";

export const SceneLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame: frame - 2, fps, config: { damping: 14, stiffness: 100 } });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#1a2744",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 600px 600px at 50% 50%, rgba(90,174,224,0.10) 0%, transparent 65%)",
        }}
      />
      <div
        style={{
          opacity: enter,
          transform: `scale(${interpolate(enter, [0, 1], [0.82, 1])})`,
        }}
      >
        <TAMLogo size={400} />
      </div>
    </div>
  );
};
