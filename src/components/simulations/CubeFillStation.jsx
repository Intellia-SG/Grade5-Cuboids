import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import CuboidFrame from '../shared/CuboidFrame.jsx';
import UnitCubePool from '../shared/UnitCubePool.jsx';
import Mascot from '../shared/Mascot.jsx';

export default function CubeFillStation({ onCompleteStation }) {
  const length = 4;
  const width = 3;
  const height = 2;
  const targetTotal = length * width * height; // 24

  const [filledCount, setFilledCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleAddCube = () => {
    if (filledCount < targetTotal) {
      const next = filledCount + 1;
      setFilledCount(next);
      if (next === targetTotal) {
        setCompleted(true);
      }
    }
  };

  const handleFillAll = () => {
    setFilledCount(targetTotal);
    setCompleted(true);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: 'var(--gold)', marginBottom: '8px' }}>
        Station A: Build the Cargo Box
      </h3>
      <p style={{
        color: '#ffffff',
        marginBottom: '16px',
        fontSize: '1.15rem',
        fontWeight: 700,
        lineHeight: 1.4,
        background: 'rgba(255, 193, 7, 0.15)',
        border: '1.5px solid rgba(255, 193, 7, 0.4)',
        padding: '10px 18px',
        borderRadius: 'var(--radius-pill)',
        display: 'inline-block',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
      }}>
        Fill the <span style={{ color: 'var(--gold)', textDecoration: 'underline' }}>4 m × 3 m × 2 m</span> cargo hold with <span style={{ color: '#00e676' }}>1 m³</span> unit cubes!
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', alignItems: 'center' }}>
        <div>
          <CuboidFrame length={length} width={width} height={height} filledCount={filledCount} />
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginTop: '8px', fontFamily: 'var(--font-display)' }}>
            Filled: <span style={{ color: 'var(--gold)' }}>{filledCount}</span> / {targetTotal} m³
          </div>
        </div>

        <div>
          <UnitCubePool
            cubesRemaining={targetTotal - filledCount}
            onAddCube={handleAddCube}
          />
          <button
            className="btn btn-outline btn-sm"
            onClick={handleFillAll}
            style={{ width: '100%', marginTop: '8px' }}
          >
            ⚡ Auto-Fill Layer by Layer
          </button>
        </div>
      </div>

      <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'center' }}>
        {completed ? (
          <div style={{ animation: 'bounceIn 0.4s ease-out' }}>
            <Mascot mood="celebrating" message="Cargo Hold Complete! 4 × 3 × 2 = 24 cubic metres!" />
            <button
              className="btn btn-primary btn-sm"
              onClick={onCompleteStation}
              style={{ marginTop: '10px' }}
            >
              Complete Station A <CheckCircle2 size={16} />
            </button>
          </div>
        ) : (
          <Mascot mood="idle" message={`Keep tapping to stack cubes! ${targetTotal - filledCount} left.`} />
        )}
      </div>
    </div>
  );
}
