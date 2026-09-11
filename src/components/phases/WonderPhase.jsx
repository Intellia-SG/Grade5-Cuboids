import React, { useEffect, useState } from 'react';
import { HelpCircle, ArrowRight } from 'lucide-react';
import CuboidDiagram from '../shared/CuboidDiagram.jsx';
import Mascot from '../shared/Mascot.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { wonderNarration } from '../../utils/narration.js';

export default function WonderPhase({ audioEnabled, onComplete }) {
  const { speakQueue, stopAudio } = useAudio();
  const [selectedBox, setSelectedBox] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    speakQueue(wonderNarration(), audioEnabled);
    return () => stopAudio();
  }, [audioEnabled, speakQueue, stopAudio]);

  const handleSelect = (boxId) => {
    setSelectedBox(boxId);
    setRevealed(true);
  };

  return (
    <div className="wonder-screen">
      <div className="glass-card wonder-card-v2">
        {/* Top Header */}
        <div style={{ textAlign: 'center' }}>
          <div className="topic-badge" style={{ marginBottom: '4px' }}>
            <HelpCircle size={15} /> Phase 1: Wonder
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: '#ffffff', marginBottom: '4px' }}>
            Which Cargo Hold Has More Space?
          </h2>

          <p style={{ fontSize: '0.96rem', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.35 }}>
            Mike has two cargo boxes for space delivery. Box A is flat and wide (6 × 4 × 2). Box B is tall and narrow (3 × 4 × 4).
          </p>
        </div>

        {/* 2-Column Side-by-Side Boxes */}
        <div className="wonder-grid">
          {/* Box A */}
          <div
            onClick={() => handleSelect('A')}
            className={`wonder-box-card ${selectedBox === 'A' ? 'active-a' : ''}`}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: '4px', fontSize: '1.05rem', textAlign: 'center' }}>
              Box A (Flat & Wide)
            </h3>
            <CuboidDiagram length={6} width={4} height={2} size="medium" showCubeGrid={revealed} showFormula={false} />
            {revealed ? (
              <div style={{ marginTop: '6px', fontWeight: 800, color: 'var(--gold)', fontSize: '0.95rem', textAlign: 'center' }}>
                6 × 4 × 2 = 48 unit cubes
              </div>
            ) : (
              <div style={{ marginTop: '6px', fontWeight: 700, color: 'var(--color-text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>
                Tap to count cubes 👆
              </div>
            )}
          </div>

          {/* Box B */}
          <div
            onClick={() => handleSelect('B')}
            className={`wonder-box-card ${selectedBox === 'B' ? 'active-b' : ''}`}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--purple-light)', marginBottom: '4px', fontSize: '1.05rem', textAlign: 'center' }}>
              Box B (Tall & Narrow)
            </h3>
            <CuboidDiagram length={3} width={4} height={4} size="medium" showCubeGrid={revealed} showFormula={false} />
            {revealed ? (
              <div style={{ marginTop: '6px', fontWeight: 800, color: 'var(--purple-light)', fontSize: '0.95rem', textAlign: 'center' }}>
                3 × 4 × 4 = 48 unit cubes
              </div>
            ) : (
              <div style={{ marginTop: '6px', fontWeight: 700, color: 'var(--color-text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>
                Tap to count cubes 👆
              </div>
            )}
          </div>
        </div>

        {/* Bottom Horizontal Bar */}
        <div className="wonder-bottom-bar">
          {revealed ? (
            <>
              <Mascot
                mood="happy"
                message="Surprise! Both hold 48 unit cubes! Volume is the total 3D space inside."
              />
              <button className="btn btn-primary btn-sm" onClick={onComplete} style={{ flexShrink: 0, padding: '10px 22px', fontSize: '1rem' }}>
                Continue to Story <ArrowRight size={18} />
              </button>
            </>
          ) : (
            <Mascot mood="thinking" message="Tap a box above to reveal its cube count and compare their volumes!" />
          )}
        </div>
      </div>
    </div>
  );
}
