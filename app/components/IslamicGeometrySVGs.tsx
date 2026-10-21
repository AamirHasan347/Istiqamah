"use client";

import React from "react";

/**
 * 1. Rub el Hizb (8-Pointed Islamic Star with Central Calligraphic Dot)
 */
export function RubElHizbLogo({
  className = "w-8 h-8",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g className="origin-center transition-transform duration-700 hover:rotate-45">
        <rect
          x="22"
          y="22"
          width="56"
          height="56"
          rx="4"
          stroke="#C48F3F"
          strokeWidth="3.5"
        />
        <rect
          x="22"
          y="22"
          width="56"
          height="56"
          rx="4"
          transform="rotate(45 50 50)"
          stroke="#C48F3F"
          strokeWidth="3.5"
        />
        <circle
          cx="50"
          cy="50"
          r="9"
          fill="#C48F3F"
          className="animate-pulse"
        />
      </g>
    </svg>
  );
}

/**
 * 2. Interactive 12-Pointed Islamic Shamsa Medallion with 12 Golden Pearls
 */
export function ShamsaMedallion({
  activePearls = 9,
  onTogglePearl,
  className = "w-44 h-44",
}: {
  activePearls: number;
  onTogglePearl?: (index: number) => void;
  className?: string;
}) {
  const pearls = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const cx = Number((100 + 74 * Math.cos(angle)).toFixed(3));
    const cy = Number((100 + 74 * Math.sin(angle)).toFixed(3));
    return { index: i, cx, cy };
  });

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="pearlGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE5B4" />
          <stop offset="55%" stopColor="#C48F3F" />
          <stop offset="100%" stopColor="#85581A" />
        </radialGradient>
        <filter id="goldDropGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Sacred Ring */}
      <circle
        cx="100"
        cy="100"
        r="88"
        stroke="rgba(196, 143, 63, 0.25)"
        strokeWidth="1.2"
        strokeDasharray="4 4"
      />
      <circle
        cx="100"
        cy="100"
        r="74"
        stroke="rgba(196, 143, 63, 0.35)"
        strokeWidth="1.5"
      />

      {/* Slowly Rotating 12-Pointed Star Interlace */}
      <g className="origin-center animate-[spin_45s_linear_infinite]">
        {[0, 30, 60].map((deg) => (
          <rect
            key={deg}
            x="52"
            y="52"
            width="96"
            height="96"
            rx="6"
            transform={`rotate(${deg} 100 100)`}
            stroke="rgba(196, 143, 63, 0.45)"
            strokeWidth="1.4"
            fill="rgba(22, 74, 59, 0.22)"
          />
        ))}
        <circle
          cx="100"
          cy="100"
          r="34"
          stroke="rgba(88, 196, 163, 0.5)"
          strokeWidth="1.2"
          fill="rgba(14, 23, 21, 0.65)"
        />
      </g>

      {/* 12 Interactive Golden Pearls */}
      {pearls.map(({ index, cx, cy }) => {
        const isLit = index < activePearls;
        return (
          <g
            key={index}
            onClick={() => onTogglePearl?.(index + 1)}
            className="cursor-pointer transition-transform duration-300 hover:scale-125"
          >
            <circle
              cx={cx}
              cy={cy}
              r={isLit ? 6.8 : 4.8}
              fill={isLit ? "url(#pearlGlow)" : "rgba(255,255,255,0.14)"}
              stroke={isLit ? "#FFF3D6" : "rgba(196,143,63,0.4)"}
              strokeWidth={isLit ? "1.5" : "1"}
              filter={isLit ? "url(#goldDropGlow)" : undefined}
            />
          </g>
        );
      })}
    </svg>
  );
}

/**
 * 3. Hanging Andalusian Sanctuary Lantern SVG
 */
export function SanctuaryLantern({
  className = "w-14 h-44",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 80 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hanging Chain */}
      <line
        x1="40"
        y1="0"
        x2="40"
        y2="78"
        stroke="#C48F3F"
        strokeWidth="1.8"
        strokeDasharray="5 3"
      />
      {/* Dome Cap */}
      <path
        d="M24 98C24 85 40 76 40 76C40 76 56 85 56 98H24Z"
        fill="#164A3B"
        stroke="#C48F3F"
        strokeWidth="2"
      />
      {/* Lantern Body */}
      <path
        d="M20 98H60L52 162H28L20 98Z"
        fill="rgba(196, 143, 63, 0.14)"
        stroke="#C48F3F"
        strokeWidth="2"
      />
      {/* Inner Warm Flame Glow */}
      <circle
        cx="40"
        cy="130"
        r="14"
        fill="#C48F3F"
        fillOpacity="0.45"
        className="animate-pulse"
      />
      <circle cx="40" cy="130" r="6" fill="#FFE7B3" />
      {/* Lattice Lines */}
      <path
        d="M30 98L40 162L50 98"
        stroke="#C48F3F"
        strokeWidth="1.2"
        strokeOpacity="0.7"
      />
      {/* Finial Drop */}
      <path
        d="M28 162L40 182L52 162H28Z"
        fill="#164A3B"
        stroke="#C48F3F"
        strokeWidth="2"
      />
      <circle cx="40" cy="190" r="3.5" fill="#C48F3F" />
    </svg>
  );
}

/**
 * 4. Pointed Andalusian Mihrab Arch SVG Frame
 */
export function MihrabArchDecoration({
  className = "w-full h-full",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 600 760"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M20 740V310C20 140 165 35 300 16C435 35 580 140 580 310V740"
        stroke="rgba(196, 143, 63, 0.4)"
        strokeWidth="2"
      />
      <path
        d="M36 740V315C36 155 175 55 300 34C425 55 564 155 564 315V740"
        stroke="rgba(196, 143, 63, 0.2)"
        strokeWidth="1.2"
        strokeDasharray="6 6"
      />
    </svg>
  );
}
