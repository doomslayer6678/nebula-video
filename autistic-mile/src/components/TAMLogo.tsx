import React from "react";

interface Props {
  size?: number;
}

const THE = [
  { char: "T", color: "#E53E3E" },
  { char: "h", color: "#DD6B20" },
  { char: "e", color: "#D69E2E" },
];
const AUTISTIC = [
  { char: "A", color: "#2F855A" },
  { char: "u", color: "#2B6CB0" },
  { char: "t", color: "#6B46C1" },
  { char: "i", color: "#E53E3E" },
  { char: "s", color: "#DD6B20" },
  { char: "t", color: "#D69E2E" },
  { char: "i", color: "#2F855A" },
  { char: "c", color: "#2B6CB0" },
];
const MILE = [
  { char: "M", color: "#6B46C1" },
  { char: "i", color: "#E53E3E" },
  { char: "l", color: "#2F855A" },
  { char: "e", color: "#2B6CB0" },
];

export const TAMLogo: React.FC<Props> = ({ size = 320 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: "block" }}>
      <circle cx="100" cy="100" r="99" fill="#111111" />
      <circle cx="100" cy="100" r="82" fill="#FFFFFF" />
      <defs>
        <path id="ringArc" d="M 20,100 A 80,80 0 0,1 180,100" fill="none" />
      </defs>
      <text style={{ fontFamily: '"Arial", sans-serif', fontSize: 9.5, fontWeight: 700, letterSpacing: 1 }}>
        <textPath href="#ringArc" startOffset="50%" textAnchor="middle" fill="#FFFFFF">
          TOGETHER, WE GO FURTHER
        </textPath>
      </text>
      <text x="100" y="68" textAnchor="middle" fontSize="25" fontWeight="bold" fontFamily='"Arial Black", "Arial", sans-serif'>
        {THE.map((c, i) => <tspan key={i} fill={c.color}>{c.char}</tspan>)}
      </text>
      <text x="100" y="104" textAnchor="middle" fontSize="24" fontWeight="bold" fontFamily='"Arial Black", "Arial", sans-serif'>
        {AUTISTIC.map((c, i) => <tspan key={i} fill={c.color}>{c.char}</tspan>)}
      </text>
      <text x="100" y="139" textAnchor="middle" fontSize="26" fontWeight="bold" fontFamily='"Arial Black", "Arial", sans-serif'>
        {MILE.map((c, i) => <tspan key={i} fill={c.color}>{c.char}</tspan>)}
      </text>
      <g>
        <line x1="74"  y1="172" x2="98"  y2="150" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="126" y1="172" x2="102" y2="150" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="100" y1="170" x2="100" y2="165" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="100" y1="162" x2="100" y2="157" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="100" y1="154" x2="100" y2="151" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
};
