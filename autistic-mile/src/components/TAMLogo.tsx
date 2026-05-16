import React from "react";

interface Props {
  size?: number;
}

const THE: { char: string; color: string }[] = [
  { char: "T", color: "#E53E3E" },
  { char: "h", color: "#DD6B20" },
  { char: "e", color: "#D69E2E" },
];
const AUTISTIC: { char: string; color: string }[] = [
  { char: "A", color: "#2F855A" },
  { char: "u", color: "#2B6CB0" },
  { char: "t", color: "#6B46C1" },
  { char: "i", color: "#E53E3E" },
  { char: "s", color: "#DD6B20" },
  { char: "t", color: "#D69E2E" },
  { char: "i", color: "#2F855A" },
  { char: "c", color: "#2B6CB0" },
];
const MILE: { char: string; color: string }[] = [
  { char: "M", color: "#6B46C1" },
  { char: "i", color: "#E53E3E" },
  { char: "l", color: "#2F855A" },
  { char: "e", color: "#2B6CB0" },
];

export const TAMLogo: React.FC<Props> = ({ size = 320 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ display: "block", overflow: "visible" }}
    >
      {/* Outer black ring */}
      <circle cx="100" cy="100" r="99" fill="#111111" />

      {/* Inner white circle */}
      <circle cx="100" cy="100" r="82" fill="#FFFFFF" />

      {/* Arc on the black ring (r≈90) — top half, so text sits in ring area */}
      <defs>
        <path
          id="ringArc"
          d="M 10,100 A 90,90 0 0,1 190,100"
          fill="none"
        />
      </defs>
      <text
        style={{
          fontFamily: '"Arial", sans-serif',
          fontSize: 8,
          fontWeight: 700,
          letterSpacing: 1.5,
        }}
      >
        <textPath
          href="#ringArc"
          startOffset="50%"
          textAnchor="middle"
          fill="#FFFFFF"
        >
          TOGETHER, WE GO FURTHER
        </textPath>
      </text>

      {/* "The" — rainbow */}
      <text
        x="100"
        y="67"
        textAnchor="middle"
        fontSize="21"
        fontWeight="bold"
        fontFamily='"Arial Black", "Arial", sans-serif'
      >
        {THE.map((c, i) => (
          <tspan key={i} fill={c.color}>
            {c.char}
          </tspan>
        ))}
      </text>

      {/* "Autistic" — rainbow, slightly smaller so all 8 chars fit */}
      <text
        x="100"
        y="97"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fontFamily='"Arial Black", "Arial", sans-serif'
      >
        {AUTISTIC.map((c, i) => (
          <tspan key={i} fill={c.color}>
            {c.char}
          </tspan>
        ))}
      </text>

      {/* "Mile" — rainbow */}
      <text
        x="100"
        y="126"
        textAnchor="middle"
        fontSize="22"
        fontWeight="bold"
        fontFamily='"Arial Black", "Arial", sans-serif'
      >
        {MILE.map((c, i) => (
          <tspan key={i} fill={c.color}>
            {c.char}
          </tspan>
        ))}
      </text>

      {/* Road icon — converging lines to a vanishing point */}
      <g>
        <line x1="74"  y1="162" x2="97"  y2="142" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="126" y1="162" x2="103" y2="142" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="100" y1="160" x2="100" y2="155" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="100" y1="151" x2="100" y2="146" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="100" y1="143" x2="100" y2="140" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
};
