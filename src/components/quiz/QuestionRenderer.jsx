import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import CuboidDiagram from '../shared/CuboidDiagram.jsx';
import NumberPad from '../shared/NumberPad.jsx';
import FeedbackOverlay from '../shared/FeedbackOverlay.jsx';
import { calcXP } from '../../utils/scoring.js';

export default function QuestionRenderer({
  question,
  questionIndex,
  totalQuestions = 100,
  hintsUsed,
  onUseHint,
  onAnswerCorrect,
  onAnswerIncorrect,
  onNextQuestion,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [typedInput, setTypedInput] = useState('');
  const [feedback, setFeedback] = useState(null); // { isCorrect: bool, explanation: string, xp: number }

  if (!question) return <div className="glass-card">Loading Question...</div>;

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    checkAnswer(option);
  };

  const handlePadSubmit = () => {
    const parsed = parseFloat(typedInput);
    checkAnswer(parsed);
  };

  const checkAnswer = (val) => {
    const isCorrect = val === question.correctAnswer || String(val) === String(question.correctAnswer);
    const xp = isCorrect ? calcXP(1, hintsUsed, 0) : 0;

    if (isCorrect) {
      onAnswerCorrect();
    } else {
      onAnswerIncorrect();
    }

    setFeedback({
      isCorrect,
      explanation: question.explanation,
      xp,
    });
  };

  const handleContinue = () => {
    setFeedback(null);
    setSelectedOption(null);
    setTypedInput('');
    onNextQuestion();
  };

  const isNumericPadType = question.type === 'missing_dimension' && !question.options;

  return (
    <div className="glass-card question-card" style={{ maxWidth: '640px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
      {/* Top Question Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ fontWeight: 800, color: 'var(--gold)', fontSize: '0.88rem', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
          Question {questionIndex + 1} of {totalQuestions}
        </div>

        <button
          className="btn btn-outline btn-sm"
          onClick={onUseHint}
          disabled={hintsUsed >= 2}
          style={{ opacity: hintsUsed >= 2 ? 0.45 : 1 }}
        >
          <HelpCircle size={14} color="var(--gold)" /> Hint ({2 - hintsUsed} left)
        </button>
      </div>

      {/* Main Question Text */}
      <h3 className="question-text" style={{ fontFamily: 'var(--font-display)', color: '#ffffff', marginBottom: '14px', lineHeight: 1.3 }}>
        {question.questionText}
      </h3>

      {/* Dynamic Visual representation */}
      {question.length && question.width && question.height ? (
        <div style={{ margin: '14px 0', display: 'flex', justifyContent: 'center' }}>
          <CuboidDiagram
            length={question.length}
            width={question.width}
            height={question.height}
            missingSlot={question.missingSlot}
            showCubeGrid={question.type === 'count_cubes' || question.type === 'packing_estimate'}
            isCube={question.type === 'cube_volume'}
            unit={question.unit || 'cm'}
            size="small"
          />
        </div>
      ) : null}

      {/* Hint Display Banner */}
      {hintsUsed > 0 && (
        <div style={{ background: '#ffc1071a', border: '1px solid rgba(255, 193, 7, 0.3)', borderRadius: 'var(--radius-md)', padding: '10px 14px', margin: '12px 0', fontSize: '0.88rem', color: 'var(--gold)' }}>
          💡 <strong>Hint:</strong> {hintsUsed === 1 ? question.hint1 : question.hint2}
        </div>
      )}

      {/* Options Grid or Digit Pad Input */}
      {isNumericPadType ? (
        <div style={{ marginTop: '16px' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px', fontFamily: 'var(--font-display)' }}>
            Answer: <span style={{ color: 'var(--gold)' }}>{typedInput || '?'}</span> {question.unit}
          </div>
          <NumberPad
            value={typedInput}
            onChange={setTypedInput}
            onSubmit={handlePadSubmit}
            allowDecimal={question.type === 'capacity_convert'}
          />
        </div>
      ) : (
        <div className="options-grid" style={{ marginTop: '16px' }}>
          {question.options?.map((opt, i) => {
            const isSelected = selectedOption === opt;
            return (
              <button
                key={i}
                className={`option-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => handleOptionClick(opt)}
              >
                {String(opt)} {typeof opt === 'number' && question.unit ? (question.unit === 'cubes' ? 'cubes' : `${question.unit}³`) : ''}
              </button>
            );
          })}
        </div>
      )}

      {/* Feedback Dialog Overlay */}
      {feedback && (
        <FeedbackOverlay
          isCorrect={feedback.isCorrect}
          explanation={feedback.explanation}
          xpEarned={feedback.xp}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
}
