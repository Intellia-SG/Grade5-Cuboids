import React, { useEffect, useState } from 'react';
import { Award, Send, Trophy } from 'lucide-react';
import Mascot from '../shared/Mascot.jsx';
import StarRating from '../gamification/StarRating.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { reflectQuestionNarration } from '../../utils/narration.js';
import { BADGES } from '../../utils/badgeEngine.js';

export default function ReflectPhase({ state, onFinish }) {
  const { speakQueue, stopAudio } = useAudio();
  const [reflectionInput, setReflectionInput] = useState('');
  const [submittedText, setSubmittedText] = useState(null);

  useEffect(() => {
    speakQueue(reflectQuestionNarration(), state.audioEnabled);
    return () => stopAudio();
  }, [state.audioEnabled, speakQueue, stopAudio]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reflectionInput.trim()) {
      setSubmittedText(reflectionInput);
      onFinish();
    }
  };

  const unlockedBadges = BADGES.filter((b) => state.badges.includes(b.id));

  return (
    <div className="reflect-screen">
      <div className="glass-card reflect-card" style={{ textAlign: 'center' }}>
        <div className="topic-badge" style={{ marginBottom: '10px' }}>
          <Award size={16} /> Phase 6: Reflect & Celebrate
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#ffffff', marginBottom: '12px' }}>
          Mission Complete, Cargo Champion! 🌟
        </h2>

        {/* Score Summary Box */}
        <div style={{ background: '#ffffff0a', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-md)', padding: '16px', margin: '14px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Total XP</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gold)' }}>{state.xp}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Total Stars</div>
              <StarRating stars={Math.min(state.totalStars, 3)} size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Max Streak</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--red)' }}>{state.maxStreak} 🔥</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Badges</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--purple-light)' }}>{unlockedBadges.length} / {BADGES.length}</div>
            </div>
          </div>
        </div>

        {/* Unlocked Badges Showcase */}
        {unlockedBadges.length > 0 && (
          <div style={{ margin: '14px 0', textAlign: 'left' }}>
            <div style={{ fontWeight: 800, color: 'var(--color-text-muted)', marginBottom: '8px', fontSize: '0.78rem', textTransform: 'uppercase' }}>
              Earned Badges Showcase:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {unlockedBadges.map((b) => (
                <div key={b.id} className="reflect-badge" style={{ padding: '8px 12px', flex: 'none', maxWidth: 'none' }}>
                  <span className="reflect-badge-icon">🏆</span>
                  <div>
                    <div className="reflect-badge-title">{b.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reflection Prompt */}
        <div style={{ marginTop: '16px' }}>
          <Mascot mood="thinking" message="What a mission today! What is one main thing you learned about volume or cuboids?" />

          {submittedText ? (
            <div style={{ background: '#00e67626', border: '1px solid #00e676', borderRadius: 'var(--radius-md)', padding: '14px', margin: '14px 0', color: '#ffffff', fontSize: '0.95rem', animation: 'pulse 0.3s ease' }}>
              💬 <strong>Your Reflection:</strong> "{submittedText}"
              <div style={{ marginTop: '4px', color: '#00e676', fontWeight: 700, fontSize: '0.85rem' }}>
                ✓ Reflection recorded! Excellent metacognition.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={reflectionInput}
                onChange={(e) => setReflectionInput(e.target.value)}
                placeholder="e.g. Volume = length × width × height..."
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: '#ffffff0f',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
              <button className="btn btn-primary btn-sm" type="submit" disabled={!reflectionInput.trim()}>
                Share <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
