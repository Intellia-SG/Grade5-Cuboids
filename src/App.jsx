import React, { useReducer, useEffect } from 'react';
import { Home, Volume2, VolumeX, ArrowLeft, ArrowRight, Star } from 'lucide-react';
import IntroScreen from './components/IntroScreen.jsx';
import ProgressMap from './components/ProgressMap.jsx';
import FloatingNumbers from './components/shared/FloatingNumbers.jsx';
import WonderPhase from './components/phases/WonderPhase.jsx';
import StoryPhase from './components/phases/StoryPhase.jsx';
import SimulatePhase from './components/phases/SimulatePhase.jsx';
import PlayPhase from './components/phases/PlayPhase.jsx';
import ReflectPhase from './components/phases/ReflectPhase.jsx';
import XPTracker from './components/gamification/XPTracker.jsx';
import StreakCounter from './components/gamification/StreakCounter.jsx';
import BadgePanel from './components/gamification/BadgePanel.jsx';
import { generateSessionQuestions } from './utils/shuffle.js';
import { questionBank } from './data/questionBank.js';
import { calcXP, calcTotalStars } from './utils/scoring.js';
import { checkBadges } from './utils/badgeEngine.js';

const initialState = {
  phase: 'intro',
  storyPanel: 0,
  currentSimStation: 0,
  simStationsComplete: [false, false, false],
  simRound: 0,
  questionSet: [],
  currentQuestion: 0,
  currentWorld: 0,
  worldScores: Array(10).fill(null),
  hintsUsed: 0,
  attemptCount: 0,
  xp: 0,
  totalStars: 0,
  streak: 0,
  maxStreak: 0,
  badges: [],
  stationBPerfect: true,
  missingDimCorrect: 0,
  phaseComplete: {
    wonder: false,
    story: false,
    simulate: false,
    play: false,
    reflect: false,
  },
  audioEnabled: true,
  newBadgeToast: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, phase: action.payload };
      
    case 'COMPLETE_PHASE': {
      const phaseName = action.payload;
      const updatedComplete = { ...state.phaseComplete, [phaseName]: true };
      const newState = { ...state, phaseComplete: updatedComplete };
      const newBadges = checkBadges(newState);
      return {
        ...newState,
        badges: [...state.badges, ...newBadges],
        newBadgeToast: newBadges.length > 0 ? newBadges[0] : state.newBadgeToast,
      };
    }

    case 'NEXT_STORY_PANEL':
      return { ...state, storyPanel: Math.min(state.storyPanel + 1, 5) };

    case 'PREV_STORY_PANEL':
      return { ...state, storyPanel: Math.max(state.storyPanel - 1, 0) };

    case 'SET_SIM_STATION':
      return { ...state, currentSimStation: action.payload, simRound: 0 };

    case 'COMPLETE_SIM_STATION': {
      const stationIdx = action.payload;
      const updatedStations = [...state.simStationsComplete];
      updatedStations[stationIdx] = true;
      const newState = { ...state, simStationsComplete: updatedStations };
      const newBadges = checkBadges(newState);
      return {
        ...newState,
        badges: [...state.badges, ...newBadges],
        newBadgeToast: newBadges.length > 0 ? newBadges[0] : state.newBadgeToast,
      };
    }

    case 'NEXT_SIM_ROUND':
      return { ...state, simRound: state.simRound + 1 };

    case 'INIT_QUESTIONS':
      return { ...state, questionSet: generateSessionQuestions(questionBank) };

    case 'SET_WORLD':
      return { ...state, currentWorld: action.payload, currentQuestion: action.payload * 10 };

    case 'ANSWER_CORRECT': {
      const xpEarned = calcXP(state.attemptCount + 1, state.hintsUsed, state.streak);
      const newStreak = state.streak + 1;
      const worldIndex = Math.floor(state.currentQuestion / 10);
      const currentWorldScore = state.worldScores[worldIndex] || 0;
      const updatedWorldScores = [...state.worldScores];
      updatedWorldScores[worldIndex] = currentWorldScore + 1;

      const currentQObj = state.questionSet[state.currentQuestion];
      const isMissingDim = currentQObj?.type === 'missing_dimension';

      const newState = {
        ...state,
        xp: state.xp + xpEarned,
        streak: newStreak,
        maxStreak: Math.max(state.maxStreak, newStreak),
        worldScores: updatedWorldScores,
        totalStars: calcTotalStars(updatedWorldScores),
        hintsUsed: 0,
        attemptCount: 0,
        missingDimCorrect: isMissingDim ? state.missingDimCorrect + 1 : state.missingDimCorrect,
      };

      const newBadges = checkBadges(newState);
      return {
        ...newState,
        badges: [...state.badges, ...newBadges],
        newBadgeToast: newBadges.length > 0 ? newBadges[0] : state.newBadgeToast,
      };
    }

    case 'ANSWER_INCORRECT': {
      const isStationB = state.phase === 'simulate' && state.currentSimStation === 1;
      return {
        ...state,
        streak: 0,
        attemptCount: state.attemptCount + 1,
        stationBPerfect: isStationB ? false : state.stationBPerfect,
      };
    }

    case 'USE_HINT':
      return { ...state, hintsUsed: state.hintsUsed + 1 };

    case 'NEXT_QUESTION':
      return { ...state, currentQuestion: Math.min(state.currentQuestion + 1, 99) };

    case 'TOGGLE_AUDIO':
      return { ...state, audioEnabled: !state.audioEnabled };

    case 'CLEAR_BADGE_TOAST':
      return { ...state, newBadgeToast: null };

    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'INIT_QUESTIONS' });
  }, []);

  const handleNextPhase = () => {
    const phases = ['intro', 'wonder', 'story', 'simulate', 'play', 'reflect'];
    const currentIdx = phases.indexOf(state.phase);
    if (currentIdx >= 0 && currentIdx < phases.length - 1) {
      const nextPhase = phases[currentIdx + 1];
      if (state.phase !== 'intro') {
        dispatch({ type: 'COMPLETE_PHASE', payload: state.phase });
      }
      dispatch({ type: 'SET_PHASE', payload: nextPhase });
    }
  };

  const handlePrevPhase = () => {
    const phases = ['intro', 'wonder', 'story', 'simulate', 'play', 'reflect'];
    const currentIdx = phases.indexOf(state.phase);
    if (currentIdx > 0) {
      dispatch({ type: 'SET_PHASE', payload: phases[currentIdx - 1] });
    }
  };

  return (
    <div className="app-container">
      {/* Background Floating Math Symbols */}
      <FloatingNumbers />

      {/* Top Controls: Home Button, Journey Bar, Audio Toggle */}
      <button
        className="home-btn"
        onClick={() => dispatch({ type: 'SET_PHASE', payload: 'intro' })}
        title="Go to Start"
      >
        <Home size={18} />
      </button>

      <ProgressMap
        currentPhase={state.phase}
        phaseComplete={state.phaseComplete}
        onSelectPhase={(phase) => dispatch({ type: 'SET_PHASE', payload: phase })}
      />

      <button
        className="audio-toggle-btn"
        onClick={() => dispatch({ type: 'TOGGLE_AUDIO' })}
        title={state.audioEnabled ? 'Mute Audio' : 'Unmute Audio'}
      >
        {state.audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>

      {/* Main Viewport */}
      <main className={`phase-viewport phase-frame--${state.phase}`}>
        {state.phase === 'intro' && (
          <IntroScreen onStart={() => dispatch({ type: 'SET_PHASE', payload: 'wonder' })} />
        )}

        {state.phase === 'wonder' && (
          <WonderPhase
            audioEnabled={state.audioEnabled}
            onComplete={() => {
              dispatch({ type: 'COMPLETE_PHASE', payload: 'wonder' });
              dispatch({ type: 'SET_PHASE', payload: 'story' });
            }}
          />
        )}

        {state.phase === 'story' && (
          <StoryPhase
            panelIndex={state.storyPanel}
            audioEnabled={state.audioEnabled}
            onNext={() => dispatch({ type: 'NEXT_STORY_PANEL' })}
            onPrev={() => dispatch({ type: 'PREV_STORY_PANEL' })}
            onComplete={() => {
              dispatch({ type: 'COMPLETE_PHASE', payload: 'story' });
              dispatch({ type: 'SET_PHASE', payload: 'simulate' });
            }}
          />
        )}

        {state.phase === 'simulate' && (
          <SimulatePhase
            state={state}
            dispatch={dispatch}
            onComplete={() => {
              dispatch({ type: 'COMPLETE_PHASE', payload: 'simulate' });
              dispatch({ type: 'SET_PHASE', payload: 'play' });
            }}
          />
        )}

        {state.phase === 'play' && (
          <PlayPhase
            state={state}
            dispatch={dispatch}
            onComplete={() => {
              dispatch({ type: 'COMPLETE_PHASE', payload: 'play' });
              dispatch({ type: 'SET_PHASE', payload: 'reflect' });
            }}
          />
        )}

        {state.phase === 'reflect' && (
          <ReflectPhase
            state={state}
            onFinish={() => dispatch({ type: 'COMPLETE_PHASE', payload: 'reflect' })}
          />
        )}
      </main>

      {/* Badge Toast */}
      {state.newBadgeToast && (
        <BadgePanel
          badgeId={state.newBadgeToast}
          onClose={() => dispatch({ type: 'CLEAR_BADGE_TOAST' })}
        />
      )}

      {/* Bottom HUD Bar */}
      <footer className="hud" style={{ position: 'fixed', bottom: '14px', left: '50%', transform: 'translateX(-50%)', zIndex: 60 }}>
        <XPTracker xp={state.xp} />
        <StreakCounter streak={state.streak} />
        <div className="hud-item" style={{ color: '#ffc107' }}>
          <Star size={16} fill="#ffc107" />
          <span>{state.totalStars} Stars</span>
        </div>

        {state.phase !== 'intro' && (
          <button className="btn btn-secondary btn-sm" onClick={handlePrevPhase}>
            <ArrowLeft size={16} /> Back
          </button>
        )}
        {state.phase !== 'reflect' && (
          <button className="btn btn-primary btn-sm" onClick={handleNextPhase}>
            Next <ArrowRight size={16} />
          </button>
        )}
      </footer>
    </div>
  );
}
