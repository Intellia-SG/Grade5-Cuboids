import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import CuboidDiagram from '../shared/CuboidDiagram.jsx';
import { storyPanels } from '../../data/storyContent.js';
import { useAudio } from '../../hooks/useAudio.js';
import { getStoryNarration } from '../../utils/narration.js';

export default function StoryPhase({
  panelIndex,
  audioEnabled,
  onNext,
  onPrev,
  onComplete,
  onSelectPanel,
}) {
  const { speakQueue, stopAudio } = useAudio();
  const currentPanel = storyPanels[panelIndex] || storyPanels[0];

  useEffect(() => {
    speakQueue(getStoryNarration(panelIndex), audioEnabled);
    return () => stopAudio();
  }, [panelIndex, audioEnabled, speakQueue, stopAudio]);

  const isLast = panelIndex === storyPanels.length - 1;

  return (
    <div className="story-screen">
      <div className="story-card-v2">
        <div className="story-card-body">
          {/* Left Side: Story Illustration / Canvas */}
          <div className="story-image-panel">
            {currentPanel.image ? (
              <img
                src={currentPanel.image}
                alt={currentPanel.title}
                className="story-panel-img"
              />
            ) : (
              <CuboidDiagram
                length={currentPanel.length}
                width={currentPanel.width}
                height={currentPanel.height}
                showCubeGrid={currentPanel.showCubeGrid}
              />
            )}
          </div>

          {/* Right Side: Title, Large Text, Callout, Controls */}
          <div className="story-text-panel">
            <div className="story-header-content">
              <h2 className="story-panel-title">{currentPanel.title}</h2>
              <p className="story-panel-body">{currentPanel.text}</p>
            </div>

            {currentPanel.highlight && (
              <div className="story-callout-box">
                <span className="story-callout-icon">💡</span>
                <span className="story-callout-text">{currentPanel.highlight}</span>
              </div>
            )}

            {/* Bottom Controls matching reference layout */}
            <div className="story-control-bar">
              <button
                className="btn-story-nav btn-story-prev"
                onClick={onPrev}
                disabled={panelIndex === 0}
              >
                <ArrowLeft size={18} /> Prev
              </button>

              <div className="story-pagination-group">
                <div className="story-dots-row">
                  {storyPanels.map((_, idx) => (
                    <button
                      key={idx}
                      className={`story-dot-v2 ${idx === panelIndex ? 'active' : ''}`}
                      onClick={() => onSelectPanel && onSelectPanel(idx)}
                      title={`Go to Panel ${idx + 1}`}
                      aria-label={`Panel ${idx + 1}`}
                    />
                  ))}
                </div>
                <span className="story-page-indicator">
                  {panelIndex + 1} / {storyPanels.length}
                </span>
              </div>

              {isLast ? (
                <button className="btn-story-nav btn-story-next" onClick={onComplete}>
                  Start Simulations <CheckCircle2 size={18} />
                </button>
              ) : (
                <button className="btn-story-nav btn-story-next" onClick={onNext}>
                  Next Panel <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
