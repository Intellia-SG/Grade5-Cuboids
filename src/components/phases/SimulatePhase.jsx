import React, { useEffect } from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import CubeFillStation from '../simulations/CubeFillStation.jsx';
import VolumeDetectiveStation from '../simulations/VolumeDetectiveStation.jsx';
import FormulaMasterStation from '../simulations/FormulaMasterStation.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { simulateStationIntro } from '../../utils/narration.js';

export default function SimulatePhase({ state, dispatch, onComplete }) {
  const { speakQueue, stopAudio } = useAudio();
  const currentStation = state.currentSimStation;

  useEffect(() => {
    speakQueue(simulateStationIntro(currentStation), state.audioEnabled);
    return () => stopAudio();
  }, [currentStation, state.audioEnabled, speakQueue, stopAudio]);

  const handleStationDone = () => {
    dispatch({ type: 'COMPLETE_SIM_STATION', payload: currentStation });
    if (currentStation < 2) {
      dispatch({ type: 'SET_SIM_STATION', payload: currentStation + 1 });
    }
  };

  const allDone = state.simStationsComplete.every(Boolean);

  return (
    <div className="simulate-screen">
      <div className="station-selector">
        {['A: CubeFill', 'B: Detective', 'C: Formula'].map((label, idx) => (
          <button
            key={idx}
            className={`station-tab ${currentStation === idx ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_SIM_STATION', payload: idx })}
          >
            <span className="station-tab-label">
              {state.simStationsComplete[idx] ? '✓ ' : ''}{label}
            </span>
          </button>
        ))}
      </div>

      <div className="glass-card simulate-card">
        {currentStation === 0 && <CubeFillStation onCompleteStation={handleStationDone} isCompleted={state.simStationsComplete[0]} />}
        {currentStation === 1 && <VolumeDetectiveStation onCompleteStation={handleStationDone} isCompleted={state.simStationsComplete[1]} onMistake={() => dispatch({ type: 'ANSWER_INCORRECT' })} />}
        {currentStation === 2 && <FormulaMasterStation onCompleteStation={handleStationDone} isCompleted={state.simStationsComplete[2]} />}

        {allDone && (
          <div className="sim-complete-card" style={{ marginTop: '20px', padding: '16px', background: '#00e67624', borderRadius: '18px', border: '1px solid #00e676', textAlign: 'center' }}>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#00e676', marginBottom: '4px' }}>
              All 3 Simulation Stations Completed! 🏆
            </h4>
            <p style={{ color: '#ffffff', marginBottom: '12px', fontSize: '0.9rem' }}>
              You have mastered concrete, pictorial, and abstract volume skills.
            </p>
            <button className="btn btn-primary" onClick={onComplete}>
              Proceed to Practice Phase <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
