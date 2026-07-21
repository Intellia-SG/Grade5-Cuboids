import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';
import Mascot from './Mascot.jsx';

export default function FeedbackOverlay({
  isCorrect,
  explanation = '',
  xpEarned = 0,
  onContinue,
}) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '20px',
        animation: 'slideInUp 0.3s ease-out forwards',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'rgba(30, 41, 59, 0.95)',
          border: `2px solid ${isCorrect ? 'rgba(52, 211, 153, 0.4)' : 'rgba(248, 113, 113, 0.4)'}`,
          borderRadius: '28px',
          padding: '32px',
          textAlign: 'center',
          boxShadow: isCorrect
            ? '0 0 40px rgba(52, 211, 153, 0.25)'
            : '0 0 40px rgba(248, 113, 113, 0.25)',
          animation: isCorrect ? 'bounceIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'shake 0.4s ease',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          {isCorrect ? (
            <CheckCircle2 size={64} color="#34d399" />
          ) : (
            <XCircle size={64} color="#f87171" />
          )}
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.6rem',
            color: isCorrect ? '#34d399' : '#f87171',
            marginBottom: '12px',
          }}
        >
          {isCorrect ? 'Spot On! Excellent Job!' : 'Not Quite!'}
        </h3>

        {isCorrect && xpEarned > 0 && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: '20px',
              background: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              fontWeight: 800,
              fontSize: '1.1rem',
              marginBottom: '16px',
            }}
          >
            <Sparkles size={18} /> +{xpEarned} XP Earned!
          </div>
        )}

        <div style={{ margin: '16px 0' }}>
          <Mascot
            mood={isCorrect ? 'celebrating' : 'encouraging'}
            message={explanation || (isCorrect ? 'That matches the volume perfectly!' : "Let's review the cuboid dimensions.")}
          />
        </div>

        <button className="btn btn-primary" onClick={onContinue} style={{ width: '100%', marginTop: '16px' }}>
          Continue Mission <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
