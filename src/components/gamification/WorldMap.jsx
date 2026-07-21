import React from 'react';
import { Lock, Star, Play, Globe } from 'lucide-react';
import StarRating from './StarRating.jsx';
import { canUnlockWorld, calcStars } from '../../utils/scoring.js';

const WORLDS = [
  { id: 0, name: '1. Launch Pad', desc: 'Basics of Cuboids & Cube Counting' },
  { id: 1, name: '2. Cubic Corner', desc: 'Direct Volume Calculations' },
  { id: 2, name: '3. Layer Station', desc: 'Layers & Wireframe Stacks' },
  { id: 3, name: '4. Formula Dock', desc: 'Missing Dimensions & Formulas' },
  { id: 4, name: '5. Detective Outpost', desc: '3D Card Comparisons' },
  { id: 5, name: '6. Word Matrix', desc: 'Real-World Container Problems' },
  { id: 6, name: '7. Capacity Core', desc: 'Litres & cm³ Conversions' },
  { id: 7, name: '8. Cuboid Citadel', desc: 'Cube Volumes & Formulas' },
  { id: 8, name: '9. Packing Galaxy', desc: 'Small Cubes & Packing Estimates' },
  { id: 9, name: '10. Cosmic Master', desc: 'Ultimate Mixed Challenge' },
];

export default function WorldMap({ currentWorld, worldScores, onSelectWorld }) {
  return (
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        <Globe size={22} color="#38bdf8" />
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#f8fafc' }}>
          IntelliPlay™ 10-World Sector Map
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {WORLDS.map((w, idx) => {
          const score = worldScores[idx];
          const isUnlocked = idx === 0 || canUnlockWorld(worldScores[idx - 1]);
          const stars = score !== null ? calcStars(score) : 0;
          const isCurrent = currentWorld === idx;

          return (
            <div
              key={w.id}
              onClick={() => isUnlocked && onSelectWorld(idx)}
              style={{
                background: isCurrent
                  ? 'rgba(56, 189, 248, 0.2)'
                  : isUnlocked
                  ? 'rgba(15, 23, 42, 0.6)'
                  : 'rgba(15, 23, 42, 0.3)',
                border: `2px solid ${
                  isCurrent
                    ? '#38bdf8'
                    : isUnlocked
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(255, 255, 255, 0.05)'
                }`,
                borderRadius: '20px',
                padding: '16px',
                cursor: isUnlocked ? 'pointer' : 'not-allowed',
                opacity: isUnlocked ? 1 : 0.5,
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: isUnlocked ? '#38bdf8' : '#94a3b8' }}>
                  {w.name}
                </div>
                {!isUnlocked ? <Lock size={16} color="#94a3b8" /> : <Play size={16} color="#38bdf8" />}
              </div>

              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '12px', minHeight: '36px' }}>
                {w.desc}
              </div>

              {isUnlocked && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <StarRating stars={stars} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                    {score !== null ? `${score}/10` : '0/10'}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
