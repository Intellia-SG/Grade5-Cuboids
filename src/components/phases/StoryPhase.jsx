import React, { useEffect } from 'react';
import { BookOpen, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import CuboidDiagram from '../shared/CuboidDiagram.jsx';
import { storyPanels } from '../../data/storyContent.js';
import { useAudio } from '../../hooks/useAudio.js';
import { getStoryNarration } from '../../utils/narration.js';

export default function StoryPhase({ panelIndex, audioEnabled, onNext, onPrev, onComplete }) {
  const { speakQueue, stopAudio } = useAudio();
  const currentPanel = storyPanels[panelIndex] || storyPanels[0];

  useEffect(() => {
    speakQueue(getStoryNarration(panelIndex), audioEnabled);
    return () => stopAudio();
  }, [panelIndex, audioEnabled, speakQueue, stopAudio]);

  const isLast = panelIndex === storyPanels.length - 1;

  return (
    <div className="story-screen">
      <div className="glass-card story-card">
        <div style={{ padding: '16px 22px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="topic-badge">
            <BookOpen size={16} /> Phase 2: Story ({panelIndex + 1} / {storyPanels.length})
          </div>

          <div className="story-dots">
            {storyPanels.map((_, idx) => (
              <button
                key={idx}
                className={`story-dot ${idx === panelIndex ? 'active' : ''}`}
                title={`Go to Panel ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="story-content">
          <h2 className="story-title">{currentPanel.title}</h2>

          {currentPanel.image && (
            <div className="story-image-container">
              <img
                src={currentPanel.image}
                alt={currentPanel.title}
                className="story-image"
              />
            </div>
          )}

          <div className="story-body">{currentPanel.text}</div>
          {currentPanel.highlight && (
            <div className="story-highlight">{currentPanel.highlight}</div>
          )}
        </div>

        <div className="story-nav">
          <button
            className="btn btn-outline btn-sm"
            onClick={onPrev}
            disabled={panelIndex === 0}
          >
            <ArrowLeft size={16} /> Previous
          </button>

          {isLast ? (
            <button className="btn btn-primary btn-sm" onClick={onComplete}>
              Start Simulations <CheckCircle2 size={16} />
            </button>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={onNext}>
              Next Panel <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
