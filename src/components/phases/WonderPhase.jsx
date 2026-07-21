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
      <div className="wonder-orb">
        <HelpCircle size={40} color="#ffffff" />
      </div>

      <div className="glass-card wonder-card">
        <div className="topic-badge" style={{ marginBottom: '8px' }}>
          <HelpCircle size={16} /> Phase 1: Wonder
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#ffffff', marginBottom: '10px' }}>
          Which Cargo Hold Has More Space?
        </h2>

        <p style={{ fontSize: '1.02rem', color: 'var(--color-text-muted)', maxWidth: '500px', margin: '0 auto 20px' }}>
          Mike has two cargo boxes for space delivery. Box A is flat and wide (6 × 4 × 2). Box B is tall and narrow (3 × 4 × 4).
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          {/* Box A */}
          <div
            onClick={() => handleSelect('A')}
            style={{
              background: selectedBox === 'A' ? '#ffc10729' : '#ffffff0a',
              border: `2px solid ${selectedBox === 'A' ? 'var(--gold)' : 'rgba(255, 255, 255, 0.1)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: '8px', fontSize: '1.1rem' }}>
              Box A (Flat & Wide)
            </h3>
            <CuboidDiagram length={6} width={4} height={2} size="small" showCubeGrid={revealed} />
            {revealed && (
              <div style={{ marginTop: '10px', fontWeight: 800, color: 'var(--gold)', fontSize: '1rem' }}>
                6 × 4 × 2 = 48 unit cubes
              </div>
            )}
          </div>

          {/* Box B */}
          <div
            onClick={() => handleSelect('B')}
            style={{
              background: selectedBox === 'B' ? '#7c5cbf29' : '#ffffff0a',
              border: `2px solid ${selectedBox === 'B' ? 'var(--purple-light)' : 'rgba(255, 255, 255, 0.1)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--purple-light)', marginBottom: '8px', fontSize: '1.1rem' }}>
              Box B (Tall & Narrow)
            </h3>
            <CuboidDiagram length={3} width={4} height={4} size="small" showCubeGrid={revealed} />
            {revealed && (
              <div style={{ marginTop: '10px', fontWeight: 800, color: 'var(--purple-light)', fontSize: '1rem' }}>
                3 × 4 × 4 = 48 unit cubes
              </div>
            )}
          </div>
        </div>

        {revealed ? (
          <div className="wonder-discover" style={{ flexDirection: 'column' }}>
            <Mascot
              mood="happy"
              message="Surprise! Both hold exactly 48 unit cubes! Volume is the total 3D space inside, regardless of shape."
            />
            <div style={{ marginTop: '14px' }}>
              <button className="btn btn-primary btn-lg" onClick={onComplete}>
                Continue to Story <ArrowRight size={20} />
              </button>
            </div>
          </div>
        ) : (
          <Mascot mood="thinking" message="Tap a box to reveal its cube count and compare their volumes!" />
        )}
      </div>
    </div>
  );
}
