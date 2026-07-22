import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle } from 'lucide-react';
import CuboidDiagram from '../shared/CuboidDiagram.jsx';
import Mascot from '../shared/Mascot.jsx';

const DETECTIVE_CARDS = [
  { id: 'A', length: 5, width: 4, height: 3, volume: 60 },
  { id: 'B', length: 6, width: 3, height: 3, volume: 54 },
  { id: 'C', length: 4, width: 4, height: 4, volume: 64 },
  { id: 'D', length: 5, width: 5, height: 2, volume: 50 },
];

export default function VolumeDetectiveStation({ onCompleteStation, onMistake }) {
  const targetVolume = 60;
  const [selectedId, setSelectedId] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (card) => {
    setSelectedId(card.id);
    if (card.volume === targetVolume) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      if (onMistake) onMistake();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: 'var(--purple-light)', marginBottom: '8px' }}>
        Station B: Volume Detective
      </h3>
      <p style={{
        color: '#ffffff',
        marginBottom: '16px',
        fontSize: '1.1rem',
        fontWeight: 700,
        lineHeight: 1.4,
        background: 'rgba(124, 92, 191, 0.2)',
        border: '1.5px solid rgba(124, 92, 191, 0.45)',
        padding: '10px 18px',
        borderRadius: 'var(--radius-pill)',
        display: 'inline-block',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
      }}>
        Inspect the 4 cargo pods below. Find the pod with a volume of exactly <strong style={{ color: 'var(--gold)' }}>{targetVolume} cm³</strong>!
      </p>

      <div className="detective-grid">
        {DETECTIVE_CARDS.map((card) => {
          const isSelected = selectedId === card.id;
          const isTarget = card.volume === targetVolume;

          return (
            <div
              key={card.id}
              onClick={() => handleSelect(card)}
              style={{
                background: isSelected
                  ? isTarget
                    ? 'rgba(0, 230, 118, 0.18)'
                    : 'rgba(239, 83, 80, 0.18)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: `2px solid ${
                  isSelected
                    ? isTarget
                      ? '#00e676'
                      : '#ef5350'
                    : 'rgba(255, 255, 255, 0.1)'
                }`,
                borderRadius: 'var(--radius-md)',
                padding: '10px 6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--gold)', marginBottom: '4px', fontSize: '0.9rem' }}>
                Pod {card.id}
              </div>
              <CuboidDiagram length={card.length} width={card.width} height={card.height} size="small" showFormula={false} />
              {isSelected ? (
                <div style={{ marginTop: '6px', fontWeight: 800, fontSize: '0.82rem', color: isTarget ? '#00e676' : '#ef5350' }}>
                  {card.length} × {card.width} × {card.height} = {card.volume} cm³
                </div>
              ) : (
                <div style={{ marginTop: '6px', fontWeight: 700, fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  V = ? cm³
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isCorrect ? (
        <div style={{ animation: 'bounceIn 0.4s ease-out', marginTop: '10px' }}>
          <Mascot mood="happy" message="Case Solved! Pod A is 5 × 4 × 3 = 60 cm³!" />
          <button className="btn btn-primary btn-sm" onClick={onCompleteStation} style={{ marginTop: '8px' }}>
            Complete Station B <CheckCircle2 size={16} />
          </button>
        </div>
      ) : (
        <div style={{ marginTop: '10px' }}>
          <Mascot mood={selectedId ? 'encouraging' : 'thinking'} message={selectedId ? 'Not that pod! Calculate length × width × height for each.' : 'Tap a pod to test its volume!'} />
        </div>
      )}
    </div>
  );
}
