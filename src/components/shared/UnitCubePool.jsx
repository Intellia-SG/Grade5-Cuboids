import React from 'react';
import { Box } from 'lucide-react';

export default function UnitCubePool({ cubesRemaining, selectedCube, onSelectCube, onAddCube }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        background: '#ffffff0a',
        borderRadius: 'var(--radius-md)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#e2e8f0', fontFamily: 'var(--font-display)' }}>
        Cargo Tray (Cubes left: <span style={{ color: 'var(--gold)' }}>{cubesRemaining}</span>)
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', maxWidth: '280px' }}>
        {Array.from({ length: Math.min(cubesRemaining, 10) }).map((_, i) => (
          <button
            key={i}
            onClick={onAddCube}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #00b0ff, #0088cc)',
              border: '1.5px solid #80d8ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0, 176, 255, 0.3)',
              transition: 'transform 0.15s ease',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Box size={18} color="#ffffff" />
          </button>
        ))}
      </div>

      <button
        className="btn btn-primary btn-sm"
        onClick={onAddCube}
        disabled={cubesRemaining === 0}
        style={{ width: '100%', marginTop: '2px', opacity: cubesRemaining === 0 ? 0.45 : 1 }}
      >
        + Add Cube to Cargo Hold
      </button>
    </div>
  );
}
