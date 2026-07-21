import React from 'react';
import { Sparkles, HelpCircle, BookOpen, Layers, Play, Award } from 'lucide-react';

const PHASES = [
  { id: 'intro', label: 'INTRO', icon: Sparkles },
  { id: 'wonder', label: 'WONDER', icon: HelpCircle },
  { id: 'story', label: 'STORY', icon: BookOpen },
  { id: 'simulate', label: 'SIMULATE', icon: Layers },
  { id: 'play', label: 'PLAY', icon: Play },
  { id: 'reflect', label: 'REFLECT', icon: Award },
];

export default function ProgressMap({ currentPhase, phaseComplete, onSelectPhase }) {
  const currentIdx = PHASES.findIndex((p) => p.id === currentPhase);

  return (
    <div className="journey-bar">
      {PHASES.map((phase, idx) => {
        const Icon = phase.icon;
        const isActive = currentPhase === phase.id;
        const isCompleted = phaseComplete[phase.id] || idx < currentIdx;

        return (
          <React.Fragment key={phase.id}>
            {idx > 0 && <div className="journey-connector" />}
            <button
              className={`journey-step ${isActive ? 'active' : ''}`}
              onClick={() => onSelectPhase(phase.id)}
              style={{
                color: isActive ? '#ffc107' : isCompleted ? '#ffffffd9' : undefined,
              }}
            >
              <span className="journey-step-icon">
                <Icon size={18} />
              </span>
              <span className="journey-step-label">{phase.label}</span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}
