import React from "react";

interface Props {
  size?: number;
}

export const TAMLogo: React.FC<Props> = ({ size = 320 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ display: "block", overflow: "visible" }}
      textRendering="geometricPrecision"
      shapeRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id="tam-theGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#E53E3E" />
          <stop offset="50%"  stopColor="#DD6B20" />
          <stop offset="100%" stopColor="#D69E2E" />
        </linearGradient>

        <linearGradient id="tam-autisticGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#2F855A" />
          <stop offset="14%"  stopColor="#2B6CB0" />
          <stop offset="29%"  stopColor="#6B46C1" />
          <stop offset="43%"  stopColor="#E53E3E" />
          <stop offset="57%"  stopColor="#DD6B20" />
          <stop offset="71%"  stopColor="#D69E2E" />
          <stop offset="86%"  stopColor="#2F855A" />
          <stop offset="100%" stopColor="#2B6CB0" />
        </linearGradient>

        <linearGradient id="tam-mileGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#6B46C1" />
          <stop offset="33%"  stopColor="#E53E3E" />
          <stop offset="67%"  stopColor="#2F855A" />
          <stop offset="100%" stopColor="#2B6CB0" />
        </linearGradient>

        <path
          id="tam-ringArc"
          d="M 10,100 A 90,90 0 0,1 190,100"
          fill="none"
        />
      </defs>

      <circle cx="100" cy="100" r="99" fill="#111111" />
      <circle cx="100" cy="100" r="82" fill="#FFFFFF" />

      <text
        style={{
          fontFamily: '"Arial", sans-serif',
          fontSize: 8,
          fontWeight: 700,
          letterSpacing: 1.5,
        }}
        textRendering="geometricPrecision"
      >
        <textPath
          href="#tam-ringArc"
          startOffset="50%"
          textAnchor="middle"
          fill="#FFFFFF"
        >
          TOGETHER, WE GO FURTHER
        </textPath>
      </text>

      <text
        x="100" y="67"
        textAnchor="middle"
        fontSize="21"
        fontWeight="bold"
        fontFamily='"Arial Black", "Arial", sans-serif'
        fill="url(#tam-theGrad)"
        textRendering="geometricPrecision"
      >
        The
      </text>

      <text
        x="100" y="97"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fontFamily='"Arial Black", "Arial", sans-serif'
        fill="url(#tam-autisticGrad)"
        textRendering="geometricPrecision"
      >
        Autistic
      </text>

      <text
        x="100" y="126"
        textAnchor="middle"
        fontSize="22"
        fontWeight="bold"
        fontFamily='"Arial Black", "Arial", sans-serif'
        fill="url(#tam-mileGrad)"
        textRendering="geometricPrecision"
      >
        Mile
      </text>

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
