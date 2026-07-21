import React from 'react';
import { Award, X } from 'lucide-react';
import { BADGES } from '../../utils/badgeEngine.js';

export default function BadgePanel({ badgeId, onClose }) {
  const badge = BADGES.find((b) => b.id === badgeId) || {
    label: '🏆 Badge Unlocked',
    description: 'Awesome achievement!',
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '24px',
        background: 'rgba(30, 41, 59, 0.95)',
        border: '2px solid #fbbf24',
        borderRadius: '20px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        boxShadow: '0 8px 32px rgba(251, 191, 36, 0.3)',
        zIndex: 90,
        animation: 'bounceIn 0.4s ease-out forwards',
      }}
    >
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Award size={26} color="#0f172a" />
      </div>

      <div style={{ textAlign: 'left' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: '#fbbf24' }}>
          {badge.label}
        </div>
        <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
          {badge.description}
        </div>
      </div>

      <button
        onClick={onClose}
        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginLeft: '8px' }}
      >
        <X size={18} />
      </button>
    </div>
  );
}
