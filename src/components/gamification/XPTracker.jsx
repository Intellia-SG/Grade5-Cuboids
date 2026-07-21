import React from 'react';
import { Sparkles } from 'lucide-react';

export default function XPTracker({ xp = 0 }) {
  return (
    <div className="stat-badge" style={{ color: '#38bdf8' }}>
      <Sparkles size={18} fill="#38bdf8" />
      <span>{xp} XP</span>
    </div>
  );
}
