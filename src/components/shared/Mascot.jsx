import React from 'react';
import { Box, Sparkles, Smile, Lightbulb, PartyPopper, Heart } from 'lucide-react';

export default function Mascot({ mood = 'idle', message = '', className = '' }) {
  const getMoodIcon = () => {
    switch (mood) {
      case 'happy':
        return <Smile size={28} color="#fbbf24" />;
      case 'thinking':
        return <Lightbulb size={28} color="#38bdf8" />;
      case 'celebrating':
        return <PartyPopper size={28} color="#a855f7" />;
      case 'encouraging':
        return <Heart size={28} color="#f43f5e" />;
      default:
        return <Sparkles size={28} color="#38bdf8" />;
    }
  };

  const getAnimationClass = () => {
    switch (mood) {
      case 'celebrating':
        return 'animation-celebrate';
      case 'happy':
        return 'animation-bounce';
      case 'thinking':
        return 'animation-pulse';
      default:
        return '';
    }
  };

  return (
    <div
      className={`mascot-container ${getAnimationClass()} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '14px',
        background: 'rgba(15, 23, 42, 0.7)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: '24px',
        padding: '12px 20px',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* Robot Cube Head Avatar */}
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(56, 189, 248, 0.4)',
          position: 'relative',
        }}
      >
        <Box size={32} color="#0f172a" />
        <div style={{ position: 'absolute', top: '-4px', right: '-4px' }}>
          {getMoodIcon()}
        </div>
      </div>

      {message && (
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
            Cubie
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc' }}>
            {message}
          </div>
        </div>
      )}
    </div>
  );
}
