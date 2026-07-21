import React, { useState } from 'react';
import { Play, Globe } from 'lucide-react';
import QuestionRenderer from '../quiz/QuestionRenderer.jsx';
import WorldMap from '../gamification/WorldMap.jsx';

export default function PlayPhase({ state, dispatch, onComplete }) {
  const [showMap, setShowMap] = useState(false);

  const currentQObj = state.questionSet[state.currentQuestion];

  return (
    <div className="play-screen">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '640px', marginBottom: '4px' }}>
        <div className="topic-badge">
          <Play size={14} /> Phase 5: Quiz (World {state.currentWorld + 1})
        </div>

        <button
          className="btn btn-outline btn-sm"
          onClick={() => setShowMap(!showMap)}
        >
          <Globe size={14} color="var(--gold)" /> {showMap ? 'Hide Map' : 'World Sector Map'}
        </button>
      </div>

      {showMap ? (
        <WorldMap
          currentWorld={state.currentWorld}
          worldScores={state.worldScores}
          onSelectWorld={(worldIdx) => {
            dispatch({ type: 'SET_WORLD', payload: worldIdx });
            setShowMap(false);
          }}
        />
      ) : (
        <div className="play-question-area" style={{ width: '100%', maxWidth: '640px' }}>
          <QuestionRenderer
            question={currentQObj}
            questionIndex={state.currentQuestion}
            totalQuestions={100}
            hintsUsed={state.hintsUsed}
            onUseHint={() => dispatch({ type: 'USE_HINT' })}
            onAnswerCorrect={() => dispatch({ type: 'ANSWER_CORRECT' })}
            onAnswerIncorrect={() => dispatch({ type: 'ANSWER_INCORRECT' })}
            onNextQuestion={() => {
              if (state.currentQuestion === 99) {
                onComplete();
              } else {
                dispatch({ type: 'NEXT_QUESTION' });
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
