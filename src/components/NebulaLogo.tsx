import React from "react";

interface Props {
  svgWidth?: number;
  textSize?: number;
  gap?: number;
}

// Three overlapping circles (teal, purple, green) + NEBULA wordmark
// viewBox "0 0 44 40": equilateral triangle arrangement, r=14, centres at
// (14,14), (30,14), (22,26) — each pair ~16px apart for ~43% overlap.
export const NebulaLogo: React.FC<Props> = ({
  svgWidth = 60,
  textSize = 32,
  gap = 18,
}) => {
  const svgHeight = (svgWidth / 44) * 40;

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap }}>
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox="0 0 44 40"
        style={{ isolation: "isolate", overflow: "visible" }}
      >
        <circle cx="14" cy="14" r="14" fill="#4CC9D4" style={{ mixBlendMode: "screen" }} />
        <circle cx="30" cy="14" r="14" fill="#7B5CE7" style={{ mixBlendMode: "screen" }} />
        <circle cx="22" cy="26" r="14" fill="#52C882" style={{ mixBlendMode: "screen" }} />
      </svg>
      <div
        style={{
          fontSize: textSize,
          fontWeight: 600,
          color: "#FFFFFF",
          letterSpacing: "0.12em",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          lineHeight: 1,
        }}
      >
        NEBULA
      </div>
    </div>
  );
};
