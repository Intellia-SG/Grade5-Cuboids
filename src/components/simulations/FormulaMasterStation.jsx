import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import CuboidDiagram from '../shared/CuboidDiagram.jsx';
import NumberPad from '../shared/NumberPad.jsx';
import Mascot from '../shared/Mascot.jsx';

export default function FormulaMasterStation({ onCompleteStation, isCompleted }) {
  const length = 8;
  const width = 5;
  const targetHeight = 3;
  const volume = 120; // 8 * 5 * 3 = 120

  const [inputVal, setInputVal] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = () => {
    if (parseInt(inputVal, 10) === targetHeight) {
      setIsCorrect(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect. Remember: Height = Volume ÷ (Length × Width)');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: 'var(--gold)', marginBottom: '8px' }}>
        Station C: Formula Master
      </h3>
      <p style={{
        color: '#ffffff',
        marginBottom: '16px',
        fontSize: '1.1rem',
        fontWeight: 700,
        lineHeight: 1.4,
        background: 'rgba(255, 193, 7, 0.15)',
        border: '1.5px solid rgba(255, 193, 7, 0.4)',
        padding: '10px 18px',
        borderRadius: 'var(--radius-pill)',
        display: 'inline-block',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
      }}>
        A cargo pod has Volume = <strong style={{ color: 'var(--gold)' }}>120 cm³</strong>, Length = 8 cm, Width = 5 cm. What is its Height?
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', alignItems: 'center' }}>
        <div>
          <CuboidDiagram length={length} width={width} height={targetHeight} missingSlot="height" size="medium" />
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '10px 14px', borderRadius: 'var(--radius-md)', marginTop: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>
              8 × 5 × <span style={{ color: '#00e676' }}>?</span> = 120 cm³
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>
            Height: <span style={{ color: 'var(--gold)' }}>{inputVal || '?'}</span> cm
          </div>

          <NumberPad
            value={inputVal}
            onChange={setInputVal}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      {isCorrect ? (
        <div style={{ marginTop: '14px', animation: 'bounceIn 0.4s ease-out' }}>
          <Mascot mood="celebrating" message="Formula Mastered! 120 ÷ (8 × 5) = 120 ÷ 40 = 3 cm!" />
          {!isCompleted && (
            <div style={{ marginTop: '10px' }}>
              <button className="btn btn-primary btn-sm" onClick={onCompleteStation}>
                Complete Station C <CheckCircle2 size={16} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: '12px' }}>
          <Mascot mood="thinking" message={errorMsg || 'Multiply Length × Width first (8 × 5 = 40), then divide 120 by 40.'} />
        </div>
      )}
    </div>
  );
}
