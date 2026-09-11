import React from 'react';

export default function CuboidDiagram({
  length = 4,
  width = 3,
  height = 2,
  missingSlot = null, // 'length' | 'width' | 'height' | 'volume' | null
  unit = 'cm',
  showCubeGrid = false,
  animated = false,
  size = 'medium', // 'small' | 'medium' | 'large'
  isCube = false,
  showFormula = true,
  className = '',
}) {
  const scale = size === 'large' ? 22 : size === 'medium' ? 16 : 12;
  // Unique ID suffix to prevent SVG gradient ID collisions across multiple instances
  const uid = `${length}-${width}-${height}-${size}`;
  const isoAngle = Math.PI / 6; // 30 degrees

  // Isometric projection helper
  const project = (x, y, z) => {
    const px = (x - z) * Math.cos(isoAngle) * scale;
    const py = (x + z) * Math.sin(isoAngle) * scale - y * scale;
    return { px, py };
  };

  const l = length;
  const w = width;
  const h = height;

  const centerOffsetX = (l + w + h) * scale * 0.9 + 25;
  const centerOffsetY = (l + w + h) * scale * 0.8 + 40;

  // Key vertex coordinates in 3D
  const p000 = project(0, 0, 0);
  const pL00 = project(l, 0, 0);
  const pL0W = project(l, 0, w);
  const p00W = project(0, 0, w);

  const p0H0 = project(0, h, 0);
  const pLH0 = project(l, h, 0);
  const pLHW = project(l, h, w);
  const p0HW = project(0, h, w);

  const pointsToString = (pts) =>
    pts.map((p) => `${p.px + centerOffsetX},${p.py + centerOffsetY}`).join(' ');

  // SVG Faces
  const topFace = [p0HW, pLHW, pLH0, p0H0];
  const frontFace = [p00W, pL0W, pLHW, p0HW];
  const sideFace = [pL0W, pL00, pLH0, pLHW];

  const svgWidth = centerOffsetX * 2;
  const svgHeight = showFormula ? centerOffsetY + (h + w) * scale + 50 : centerOffsetY + (h + w) * scale + 20;

  const volumeVal = l * w * h;

  return (
    <div className={`cuboid-diagram-wrapper ${className}`} style={{ textAlign: 'center', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        style={{
          width: '100%',
          maxWidth: size === 'large' ? '320px' : size === 'medium' ? '260px' : '220px',
          height: 'auto',
          filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.4))',
        }}
      >
        <defs>
          <linearGradient id={`frontGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id={`topGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id={`sideGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>

        {/* 3D Cuboid Faces */}
        <polygon
          points={pointsToString(topFace)}
          fill={`url(#topGrad-${uid})`}
          stroke="#0f172a"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon
          points={pointsToString(frontFace)}
          fill={`url(#frontGrad-${uid})`}
          stroke="#0f172a"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon
          points={pointsToString(sideFace)}
          fill={`url(#sideGrad-${uid})`}
          stroke="#0f172a"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Optional Unit Cube Grid Lines */}
        {showCubeGrid && (
          <g stroke="#0f172a" strokeWidth="1" strokeOpacity="0.4">
            {/* Grid on front face */}
            {Array.from({ length: l - 1 }).map((_, i) => {
              const p1 = project(i + 1, 0, w);
              const p2 = project(i + 1, h, w);
              return (
                <line
                  key={`f-v-${i}`}
                  x1={p1.px + centerOffsetX}
                  y1={p1.py + centerOffsetY}
                  x2={p2.px + centerOffsetX}
                  y2={p2.py + centerOffsetY}
                />
              );
            })}
            {Array.from({ length: h - 1 }).map((_, j) => {
              const p1 = project(0, j + 1, w);
              const p2 = project(l, j + 1, w);
              return (
                <line
                  key={`f-h-${j}`}
                  x1={p1.px + centerOffsetX}
                  y1={p1.py + centerOffsetY}
                  x2={p2.px + centerOffsetX}
                  y2={p2.py + centerOffsetY}
                />
              );
            })}
          </g>
        )}

        {/* Dimension Labels */}
        {/* Length (bottom front edge) */}
        <text
          x={(p00W.px + pL0W.px) / 2 + centerOffsetX}
          y={(p00W.py + pL0W.py) / 2 + centerOffsetY + 22}
          textAnchor="middle"
          fill="#f8fafc"
          fontSize="15"
          fontWeight="700"
        >
          {missingSlot === 'length' ? 'Length: ?' : isCube ? `Side: ${l} ${unit}` : `L: ${l} ${unit}`}
        </text>

        {/* Width (bottom side edge) */}
        {!isCube && (
          <text
            x={(pL0W.px + pL00.px) / 2 + centerOffsetX + 14}
            y={(pL0W.py + pL00.py) / 2 + centerOffsetY + 18}
            textAnchor="start"
            fill="#f8fafc"
            fontSize="15"
            fontWeight="700"
          >
            {missingSlot === 'width' ? 'Width: ?' : `W: ${w} ${unit}`}
          </text>
        )}

        {/* Height (far-left vertical edge) */}
        {!isCube && (
          <text
            x={(p00W.px + p0HW.px) / 2 + centerOffsetX - 12}
            y={(p00W.py + p0HW.py) / 2 + centerOffsetY}
            textAnchor="end"
            fill="#f8fafc"
            fontSize="15"
            fontWeight="700"
          >
            {missingSlot === 'height' ? 'Height: ?' : `H: ${h} ${unit}`}
          </text>
        )}

        {/* Formula summary text underneath */}
        {showFormula && (
          <text
            x={svgWidth / 2}
            y={svgHeight - 12}
            textAnchor="middle"
            fill="#fbbf24"
            fontSize="16"
            fontWeight="800"
          >
            {missingSlot === 'volume'
              ? `Volume = ? ${unit}³`
              : isCube
              ? `V = ${l}³ = ${volumeVal} ${unit}³`
              : `V = ${l} × ${w} × ${h} = ${volumeVal} ${unit}³`}
          </text>
        )}
      </svg>
    </div>
  );
}
