/**
 * Generates deterministic abstract geometric SVG patterns for blog hero images.
 * Each pattern is seeded by the article slug for consistency across renders.
 */

export function slugToSeed(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

// Mulberry32 PRNG
function createRng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PALETTE = [
  "#D1D5DB",
  "#C4CAD0",
  "#B0B8C1",
  "#9CA3AF",
  "#BFC6CD",
  "#A8B2BC",
];

const ACCENT_FAINT = "rgba(44,62,80,0.06)";

interface BlogHeroPatternProps {
  seed: number;
  className?: string;
}

export default function BlogHeroPattern({
  seed,
  className,
}: BlogHeroPatternProps) {
  const rng = createRng(seed);
  const pick = <T,>(arr: T[]): T => arr[Math.floor(rng() * arr.length)];
  const range = (min: number, max: number) => min + rng() * (max - min);
  const filterId = `shadow-${seed}`;

  // Generate shapes
  const shapes: React.ReactNode[] = [];

  // Recipe based on seed
  const recipe = seed % 5;

  // -- Common: subtle grid dots --
  const dotSpacingX = 80 + Math.floor(rng() * 40);
  const dotSpacingY = 80 + Math.floor(rng() * 40);
  const dotOffsetX = Math.floor(rng() * 40);
  const dotOffsetY = Math.floor(rng() * 40);
  for (let x = dotOffsetX; x < 1600; x += dotSpacingX) {
    for (let y = dotOffsetY; y < 900; y += dotSpacingY) {
      if (rng() > 0.6) {
        shapes.push(
          <circle
            key={`dot-${x}-${y}`}
            cx={x}
            cy={y}
            r={1.5}
            fill="#C4CAD0"
            opacity={0.4}
          />
        );
      }
    }
  }

  if (recipe === 0) {
    // Scattered circles with outlines
    for (let i = 0; i < 8; i++) {
      const cx = range(100, 1500);
      const cy = range(80, 820);
      const r = range(30, 120);
      const filled = rng() > 0.5;
      shapes.push(
        <circle
          key={`circ-${i}`}
          cx={cx}
          cy={cy}
          r={r}
          fill={filled ? pick(PALETTE) : "none"}
          stroke={filled ? "none" : pick(PALETTE)}
          strokeWidth={filled ? 0 : 1.5}
          opacity={range(0.15, 0.35)}
          filter={filled ? `url(#${filterId})` : undefined}
        />
      );
    }
    // Accent large circle
    shapes.push(
      <circle
        key="accent-circ"
        cx={range(400, 1200)}
        cy={range(200, 700)}
        r={range(100, 200)}
        fill="none"
        stroke={ACCENT_FAINT}
        strokeWidth={2}
      />
    );
  } else if (recipe === 1) {
    // Diagonal lines with small rectangles
    for (let i = 0; i < 6; i++) {
      const x1 = range(0, 1600);
      const y1 = range(0, 900);
      const angle = range(-40, 40);
      const len = range(200, 500);
      const rad = (angle * Math.PI) / 180;
      shapes.push(
        <line
          key={`line-${i}`}
          x1={x1}
          y1={y1}
          x2={x1 + Math.cos(rad) * len}
          y2={y1 + Math.sin(rad) * len}
          stroke={pick(PALETTE)}
          strokeWidth={range(1, 2.5)}
          opacity={range(0.2, 0.4)}
        />
      );
    }
    for (let i = 0; i < 5; i++) {
      const w = range(40, 100);
      const h = range(40, 100);
      shapes.push(
        <rect
          key={`rect-${i}`}
          x={range(100, 1400)}
          y={range(80, 750)}
          width={w}
          height={h}
          rx={6}
          fill={pick(PALETTE)}
          opacity={range(0.1, 0.25)}
          filter={`url(#${filterId})`}
        />
      );
    }
  } else if (recipe === 2) {
    // Concentric arcs
    const cx = range(600, 1000);
    const cy = range(300, 600);
    for (let i = 0; i < 5; i++) {
      const r = 80 + i * 70 + range(-10, 10);
      const startAngle = range(0, 180);
      const sweep = range(90, 240);
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = ((startAngle + sweep) * Math.PI) / 180;
      const x1 = cx + Math.cos(startRad) * r;
      const y1 = cy + Math.sin(startRad) * r;
      const x2 = cx + Math.cos(endRad) * r;
      const y2 = cy + Math.sin(endRad) * r;
      shapes.push(
        <path
          key={`arc-${i}`}
          d={`M ${x1} ${y1} A ${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${x2} ${y2}`}
          fill="none"
          stroke={pick(PALETTE)}
          strokeWidth={range(1.5, 3)}
          opacity={range(0.2, 0.4)}
        />
      );
    }
    // Small accent dots cluster
    for (let i = 0; i < 12; i++) {
      shapes.push(
        <circle
          key={`adot-${i}`}
          cx={range(cx - 50, cx + 50)}
          cy={range(cy - 50, cy + 50)}
          r={range(3, 8)}
          fill={ACCENT_FAINT}
        />
      );
    }
  } else if (recipe === 3) {
    // Grid of rounded rectangles
    const cols = 4 + Math.floor(rng() * 3);
    const rows = 2 + Math.floor(rng() * 2);
    const cellW = 1400 / cols;
    const cellH = 700 / rows;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (rng() > 0.4) {
          const w = cellW * range(0.3, 0.7);
          const h = cellH * range(0.3, 0.7);
          const x = 100 + c * cellW + (cellW - w) / 2;
          const y = 100 + r * cellH + (cellH - h) / 2;
          shapes.push(
            <rect
              key={`grid-${c}-${r}`}
              x={x}
              y={y}
              width={w}
              height={h}
              rx={8}
              fill={rng() > 0.3 ? pick(PALETTE) : "none"}
              stroke={pick(PALETTE)}
              strokeWidth={1}
              opacity={range(0.12, 0.3)}
              filter={rng() > 0.5 ? `url(#${filterId})` : undefined}
            />
          );
        }
      }
    }
  } else {
    // Cross pattern with circles
    for (let i = 0; i < 7; i++) {
      const cx = range(100, 1500);
      const cy = range(80, 820);
      const size = range(20, 50);
      shapes.push(
        <g key={`cross-${i}`} opacity={range(0.2, 0.4)}>
          <line
            x1={cx - size}
            y1={cy}
            x2={cx + size}
            y2={cy}
            stroke={pick(PALETTE)}
            strokeWidth={1.5}
          />
          <line
            x1={cx}
            y1={cy - size}
            x2={cx}
            y2={cy + size}
            stroke={pick(PALETTE)}
            strokeWidth={1.5}
          />
        </g>
      );
    }
    for (let i = 0; i < 5; i++) {
      shapes.push(
        <circle
          key={`cross-circ-${i}`}
          cx={range(200, 1400)}
          cy={range(100, 800)}
          r={range(40, 90)}
          fill="none"
          stroke={pick(PALETTE)}
          strokeWidth={1}
          opacity={range(0.15, 0.3)}
        />
      );
    }
    shapes.push(
      <rect
        key="accent-rect"
        x={range(500, 900)}
        y={range(250, 550)}
        width={range(150, 300)}
        height={range(100, 200)}
        rx={10}
        fill={ACCENT_FAINT}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 1600 900"
      className={className}
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <rect width="1600" height="900" fill="#F2F3F5" />
      <defs>
        <filter id={filterId}>
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="3"
            floodOpacity="0.08"
          />
        </filter>
      </defs>
      {shapes}
    </svg>
  );
}
