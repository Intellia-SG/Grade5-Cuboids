import React from 'react';

export default function CuboidFrame({ length, width, height, filledCount }) {
  const scale = 22;
  const isoAngle = Math.PI / 6;

  const project = (x, y, z) => {
    const px = (x - z) * Math.cos(isoAngle) * scale;
    const py = (x + z) * Math.sin(isoAngle) * scale - y * scale;
    return { px, py };
  };

  const centerOffsetX = (length + width + height) * scale * 0.9 + 20;
  const centerOffsetY = (length + width + height) * scale * 0.8 + 30;

  const totalSlots = length * width * height;

  // Render slots in order: bottom to top, back to front, left to right
  const cubes = [];
  let currentFilled = 0;

  for (let y = 0; y < height; y++) {
    for (let z = 0; z < width; z++) {
      for (let x = 0; x < length; x++) {
        const isFilled = currentFilled < filledCount;
        currentFilled++;

        const p0 = project(x, y, z);
        const pL = project(x + 1, y, z);
        const pLW = project(x + 1, y, z + 1);
        const pW = project(x, y, z + 1);

        const p0H = project(x, y + 1, z);
        const pLH = project(x + 1, y + 1, z);
        const pLHW = project(x + 1, y + 1, z + 1);
        const pWH = project(x, y + 1, z + 1);

        const pts = (face) =>
          face
            .map((p) => `${p.px + centerOffsetX},${p.py + centerOffsetY}`)
            .join(' ');

        cubes.push(
          <g key={`cube-${x}-${y}-${z}`}>
            {/* Slot wireframe or filled cube */}
            {isFilled ? (
              <>
                <polygon points={pts([pWH, pLHW, pLH, p0H])} fill="#7dd3fc" stroke="#0284c7" strokeWidth="1" />
                <polygon points={pts([pW, pLW, pLHW, pWH])} fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
                <polygon points={pts([pLW, pL, pLH, pLHW])} fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
              </>
            ) : (
              <polygon
                points={pts([pW, pLW, pLHW, pWH])}
                fill="rgba(56, 189, 248, 0.05)"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeDasharray="2,2"
                strokeWidth="1"
              />
            )}
          </g>
        );
      }
    }
  }

  const svgWidth = centerOffsetX * 2;
  const svgHeight = centerOffsetY + (height + width) * scale + 40;

  return (
    <div style={{ textAlign: 'center' }}>
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ maxWidth: '100%', height: 'auto' }}>
        {cubes}
      </svg>
    </div>
  );
}
