import React from 'react';
import { Flame } from 'lucide-react';

export default function StreakCounter({ streak = 0 }) {
  return (
    <div className="stat-badge" style={{ color: streak > 0 ? '#f43f5e' : '#94a3b8' }}>
      <Flame size={18} fill={streak > 0 ? '#f43f5e' : 'none'} />
      <span>{streak} Streak</span>
    </div>
  );
}
