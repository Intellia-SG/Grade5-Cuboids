# Technical Requirements Document (TRD)
## Cuboids & Volume — Grade 5 Math
### Intellia Global | World Mathematics Curriculum

---

## 1. Technical Overview

This document specifies the architecture, component design, state management, data models, simulation logic, gamification implementation, audio pipeline, and quality standards for **"CargoQuest: The Cuboid Challenge"** — the Grade 5 Volume of Cuboids interactive lesson module.

The module is a **React 18 application (Vite + JSX)**, structured identically to the reference repository `https://github.com/dsamyak/equal`, and styled to match `https://equal-tau.vercel.app/`. It will be embedded at a lesson URL pattern matching the existing course structure, e.g.:

```
https://intelliasg.com/courses/grade-5-math/lessons/cuboids-and-volume/
```

Audio narration uses **ElevenLabs exclusively** (no browser Web Speech API fallback), directly implementing the pipeline described in the uploaded **Number Bonds Audio & Narration Pipeline** document, adapted for this lesson's scripts and question bank.

---

## 2. Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| UI Framework | React 18 (JSX, Vite) | Matches reference `equal` repo structure |
| State Management | `useState` + `useReducer` | Sufficient for single-module complexity |
| Styling | CSS Modules + Tailwind | Matches reference repo CSS approach |
| Icons | Lucide React | Available in artifact environment |
| Animation | CSS keyframes + transitions | No external dependency needed |
| 3D/Isometric Diagrams | Inline SVG (React) | For isometric cuboid + unit-cube visuals |
| Persistence | `localStorage` | Session state, no backend needed |
| Audio (Primary) | ElevenLabs API | Premium, consistent voice (Alice) |
| Audio (Playback) | HTML5 Audio API (`new Audio()`) | Browser-native, no library needed |
| Math | Vanilla JS | No library required |
| Build Tool | Vite | Matches repo (`vite.config.js` present) |

---

## 3. Project Structure (mirrors the `equal` repo)

```
cuboid-volume/
├── public/
│   ├── assets/
│   │   ├── audio/                       # Pre-generated .mp3 files (ElevenLabs)
│   │   │   ├── audio_wonder_hook_0.mp3
│   │   │   ├── audio_story_panel1_0.mp3
│   │   │   ├── ... (all panels 1–6)
│   │   │   ├── audio_station_a_instruction_0.mp3
│   │   │   ├── audio_station_b_instruction_0.mp3
│   │   │   ├── audio_station_c_instruction_0.mp3
│   │   │   ├── audio_correct_0.mp3
│   │   │   ├── audio_reflect_prompt_0.mp3
│   │   │   └── ... (all fixed phrases pre-generated)
│   │   └── images/
│   │       ├── mascot-idle.svg
│   │       ├── mascot-happy.svg
│   │       ├── mascot-thinking.svg
│   │       ├── mascot-celebrate.svg
│   │       └── world-map-bg.svg
├── src/
│   ├── main.jsx                         # React entry point
│   ├── App.jsx                          # Root component, global state (useReducer)
│   ├── App.css                          # Global styles (mirrors equal-tau.vercel.app CSS)
│   ├── components/
│   │   ├── IntroScreen.jsx              # Welcome + lesson overview + phase dot tracker
│   │   ├── ProgressMap.jsx              # 6-phase dot tracker (top bar)
│   │   ├── phases/
│   │   │   ├── WonderPhase.jsx          # Phase 1: Hook animation + ElevenLabs narration
│   │   │   ├── StoryPhase.jsx           # Phase 2: CargoQuest illustrated narrative panels
│   │   │   ├── SimulatePhase.jsx        # Phase 3: Simulation station wrapper
│   │   │   ├── PlayPhase.jsx            # Phase 4: IntelliPlay™ quiz engine
│   │   │   └── ReflectPhase.jsx         # Phase 5: Journal + completion badge
│   │   ├── simulations/
│   │   │   ├── CubeFillStation.jsx      # Station A: Drag unit cubes into wireframe cuboid
│   │   │   ├── VolumeDetectiveStation.jsx # Station B: Compare/identify volumes visually
│   │   │   └── FormulaMasterStation.jsx # Station C: Fill "Volume = ___ × ___ × ___"
│   │   ├── quiz/
│   │   │   ├── QuestionRenderer.jsx     # Polymorphic dispatcher → type-specific component
│   │   │   ├── CalcVolumeQ.jsx          # Q1: Calculate volume from 3 dimensions
│   │   │   ├── CountCubesQ.jsx          # Q2: Count unit cubes in 3D diagram
│   │   │   ├── MissingDimQ.jsx          # Q3: Find missing dimension
│   │   │   ├── CompareVolumeQ.jsx       # Q4: Compare two cuboids' volumes
│   │   │   ├── WordProblemQ.jsx         # Q5: Real-world container word problem
│   │   │   ├── CapacityConvertQ.jsx     # Q6: cm³ ↔ litres conversion
│   │   │   ├── CubeVolumeQ.jsx          # Q7: Cube volume (a³)
│   │   │   ├── TrueFalseVolumeQ.jsx     # Q8: True/False volume statement
│   │   │   ├── SpotVolumeMCQ.jsx        # Q9: Which cuboid shows given volume?
│   │   │   ├── PackingEstimateQ.jsx     # Q10: How many small cubes fit inside?
│   │   │   └── HintOverlay.jsx          # Hint 1 & 2 + animated explanation after 3 fails
│   │   ├── gamification/
│   │   │   ├── XPTracker.jsx            # XP bar + floating XP animation
│   │   │   ├── StarRating.jsx           # 1–3 star rating per world
│   │   │   ├── BadgePanel.jsx           # Badge unlock toast + panel
│   │   │   ├── StreakCounter.jsx        # Fire streak counter
│   │   │   └── WorldMap.jsx             # 10-world progress map (horizontal scroll)
│   │   └── shared/
│   │       ├── Mascot.jsx               # "Cubie" cube-bot with mood states
│   │       ├── CuboidDiagram.jsx        # Reusable SVG: isometric cuboid, l×w×h labelled
│   │       ├── UnitCubePool.jsx         # Draggable unit-cube source tray
│   │       ├── CuboidFrame.jsx          # Wireframe droppable cuboid (Station A)
│   │       ├── NumberPad.jsx            # Large tap-friendly digit input (0–9, decimal)
│   │       └── FeedbackOverlay.jsx      # Correct/incorrect overlay with animation
│   ├── data/
│   │   ├── questionBank.js              # 100 question objects (all types)
│   │   └── storyContent.js              # CargoQuest story panel data (text + visuals)
│   ├── hooks/
│   │   ├── useAudio.js                  # ElevenLabs + HTML5 Audio playback hook
│   │   ├── useGameState.js              # Gamification state hook
│   │   └── useLocalStorage.js           # Session persistence hook (24hr resume)
│   └── utils/
│       ├── audioMap.js                  # AUTO-GENERATED: text → .mp3 path map
│       ├── shuffle.js                   # Fisher-Yates randomisation
│       ├── scoring.js                   # XP + star calculation + distractor gen
│       └── badgeEngine.js               # Badge unlock condition logic
├── scripts/
│   ├── generate_audio.js                # Offline ElevenLabs audio pre-generation
│   └── clean_audio.js                   # Remove orphaned .mp3 files
├── api/
│   └── elevenlabs.js                    # ElevenLabs proxy (if server-side key needed)
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

---

## 4. Application State Architecture

### 4.1 Global State (`App.jsx` — `useReducer`)

```javascript
const initialState = {
  // Navigation
  phase: 'intro',            // 'intro'|'wonder'|'story'|'simulate'|'play'|'reflect'|'results'
  storyPanel: 0,              // 0–5 (6 story panels)
  currentSimStation: 0,       // 0=CubeFill, 1=VolumeDetective, 2=FormulaMaster
  simStationsComplete: [false, false, false],
  simRound: 0,                 // Round index within current station (0–3)

  // Play / Challenge phase
  questionSet: [],             // 100 shuffled Question objects
  currentQuestion: 0,          // 0–99
  currentWorld: 0,             // 0–9 (10 worlds)
  worldScores: Array(10).fill(null),
  hintsUsed: 0,
  attemptCount: 0,             // Attempts on current question (max 3)

  // Gamification
  xp: 0,
  totalStars: 0,
  streak: 0,
  maxStreak: 0,
  badges: [],                  // Array of unlocked badge IDs
  stationBPerfect: null,       // For "Sharp-Eyed Detective" badge
  missingDimCorrect: 0,        // For "Formula Master" badge

  // Session metadata
  phaseComplete: {
    wonder: false, story: false, simulate: false,
    play: false, reflect: false,
  },
  sessionId: crypto.randomUUID(),

  // Settings
  audioEnabled: true,          // ElevenLabs narration on/off
  musicEnabled: false,         // Background ambient music (off by default)
};
```

### 4.2 Reducer Action Types

```javascript
const ACTIONS = {
  SET_PHASE: 'SET_PHASE',
  NEXT_STORY_PANEL: 'NEXT_STORY_PANEL',
  ADVANCE_SIM_STATION: 'ADVANCE_SIM_STATION',
  COMPLETE_SIM_STATION: 'COMPLETE_SIM_STATION',
  NEXT_SIM_ROUND: 'NEXT_SIM_ROUND',
  LOAD_QUESTIONS: 'LOAD_QUESTIONS',
  ANSWER_CORRECT: 'ANSWER_CORRECT',
  ANSWER_INCORRECT: 'ANSWER_INCORRECT',
  USE_HINT: 'USE_HINT',
  NEXT_QUESTION: 'NEXT_QUESTION',
  UNLOCK_BADGE: 'UNLOCK_BADGE',
  COMPLETE_PHASE: 'COMPLETE_PHASE',
  TOGGLE_AUDIO: 'TOGGLE_AUDIO',
  TOGGLE_MUSIC: 'TOGGLE_MUSIC',
  RESTORE_SESSION: 'RESTORE_SESSION',
  RESET_SESSION: 'RESET_SESSION',
};
```

### 4.3 Key Reducer Logic

```javascript
// ANSWER_CORRECT dispatch
case ACTIONS.ANSWER_CORRECT: {
  const xpEarned = calcXP(state.attemptCount + 1, state.hintsUsed, state.streak);
  const newStreak = state.streak + 1;
  const worldIndex = Math.floor(state.currentQuestion / 10);
  const newWorldScore = (state.worldScores[worldIndex] || 0) + 1;
  const updatedWorldScores = [...state.worldScores];
  updatedWorldScores[worldIndex] = newWorldScore;

  return {
    ...state,
    xp: state.xp + xpEarned,
    streak: newStreak,
    maxStreak: Math.max(state.maxStreak, newStreak),
    worldScores: updatedWorldScores,
    totalStars: calcTotalStars(updatedWorldScores),
    hintsUsed: 0,
    attemptCount: 0,
  };
}

// ANSWER_INCORRECT dispatch
case ACTIONS.ANSWER_INCORRECT: {
  return {
    ...state,
    streak: 0,
    attemptCount: state.attemptCount + 1,
  };
}
```

---

## 5. Question Data Model

### 5.1 Question Schema

```typescript
interface Question {
  id: string;                  // e.g. "Q1_003", "Q7_008"
  type: QuestionType;          // One of 10 enum values (see below)
  world: number;                // 0–9 (which world this belongs to)
  difficulty: 1 | 2 | 3;        // 1=easy(≤200cm³), 2=medium(≤1000cm³), 3=hard(≤4000cm³)

  // Core math values
  length: number;
  width: number;
  height: number;
  volume: number;                // length × width × height
  missingSlot: 'length' | 'width' | 'height' | 'volume' | null;

  // Rendering
  questionText: string;          // Full narrated question text (ElevenLabs reads this)
  visual: VisualType;             // 'cuboidDiagram' | 'cubeGrid' | 'formula' | 'trueFalse'
  unit: 'cm' | 'm';

  // MCQ
  options?: (number|string)[];    // 4 MCQ options (always includes correctAnswer)

  // Hints
  hint1: string;                  // Shown after 1 wrong attempt
  hint2: string;                  // Shown after 2 wrong attempts (animation trigger)
  explanation: string;            // Full text explanation after 3 fails (read aloud)

  // Word problems only
  characterName?: string;
  containerName?: string;         // 'box', 'tank', 'container', 'aquarium', 'crate'

  // True/False only
  isTrue?: boolean;

  // Capacity conversion only
  litres?: number;

  // Answer
  correctAnswer: number | string;
}

type QuestionType =
  | 'calc_volume'          // Q1: Calculate volume from 3 dimensions
  | 'count_cubes'          // Q2: Count unit cubes in 3D diagram
  | 'missing_dimension'    // Q3: Find missing dimension
  | 'compare_volume'       // Q4: Compare two cuboids' volumes
  | 'word_problem'         // Q5: Real-world container word problem
  | 'capacity_convert'     // Q6: cm³ ↔ litres conversion
  | 'cube_volume'          // Q7: Cube volume (a³)
  | 'true_false_volume'    // Q8: True/False volume statement
  | 'spot_volume_mcq'      // Q9: Which cuboid shows given volume?
  | 'packing_estimate';    // Q10: How many small cubes fit inside?

type VisualType =
  | 'cuboidDiagram'  // SVG isometric cuboid with labelled dimensions
  | 'cubeGrid'       // Isometric unit-cube grid for counting
  | 'formula'        // "Volume = ___ × ___ × ___" with highlighted blank
  | 'trueFalse';     // Statement + True/False buttons
```

### 5.2 Sample Question Objects

```javascript
// Q1 — Calculate Volume
{
  id: "Q1_001",
  type: "calc_volume",
  world: 0,
  difficulty: 1,
  length: 6, width: 4, height: 3, volume: 72,
  missingSlot: "volume",
  questionText: "A box is 6 cm long, 4 cm wide, and 3 cm tall. Find its volume.",
  visual: "cuboidDiagram",
  unit: "cm",
  hint1: "Multiply length by width first: 6 × 4 = 24.",
  hint2: "Now multiply by the height: 24 × 3 = 72.",
  explanation: "Volume = length × width × height = 6 × 4 × 3 = 72 cm³.",
  options: [48, 60, 72, 84],
  correctAnswer: 72,
}

// Q5 — Word Problem
{
  id: "Q5_004",
  type: "word_problem",
  world: 3,
  difficulty: 2,
  length: 40, width: 25, height: 20, volume: 20000,
  missingSlot: "volume",
  questionText: "Sarah's fish tank is 40 cm long, 25 cm wide, and 20 cm tall. What is its volume?",
  visual: "cuboidDiagram",
  unit: "cm",
  characterName: "Sarah",
  containerName: "fish tank",
  hint1: "Multiply the length and width first: 40 × 25 = 1000.",
  hint2: "Now multiply by the height: 1000 × 20 = 20000.",
  explanation: "40 × 25 × 20 = 20,000 cm³. That's Sarah's fish tank's volume.",
  options: [18000, 19000, 20000, 21000],
  correctAnswer: 20000,
}

// Q6 — Capacity Conversion
{
  id: "Q6_002",
  type: "capacity_convert",
  world: 8,
  difficulty: 2,
  length: null, width: null, height: null, volume: 3000,
  missingSlot: null,
  questionText: "A container holds 3000 cm³ of water. How many litres is that?",
  visual: "formula",
  unit: "cm",
  litres: 3,
  hint1: "Remember: 1000 cm³ = 1 litre.",
  hint2: "3000 ÷ 1000 = 3.",
  explanation: "3000 cm³ ÷ 1000 = 3 litres.",
  options: [0.3, 3, 30, 300],
  correctAnswer: 3,
}

// Q10 — Packing Estimate
{
  id: "Q10_005",
  type: "packing_estimate",
  world: 9,
  difficulty: 3,
  length: 6, width: 4, height: 2, volume: 48,
  missingSlot: null,
  questionText: "How many 2 cm cubes fit exactly inside a 6 cm × 4 cm × 2 cm box?",
  visual: "cubeGrid",
  unit: "cm",
  hint1: "How many 2 cm cubes fit along each edge? 6 ÷ 2 = 3, 4 ÷ 2 = 2, 2 ÷ 2 = 1.",
  hint2: "Multiply the cubes per edge: 3 × 2 × 1 = 6.",
  explanation: "3 cubes fit along the length, 2 along the width, 1 along the height: 3 × 2 × 1 = 6 cubes.",
  options: [4, 6, 8, 12],
  correctAnswer: 6,
}
```

---

## 6. Cuboid/Volume Diagram SVG Component

```javascript
// CuboidDiagram.jsx — reusable isometric SVG for a cuboid with labelled dimensions

const CuboidDiagram = ({
  length,
  width,
  height,
  missingSlot,       // 'length' | 'width' | 'height' | null
  unit = 'cm',
  showCubeGrid = false,
  animated = false,
  size = 'medium',    // 'small' | 'medium' | 'large'
}) => {
  const scale = size === 'large' ? 18 : size === 'medium' ? 14 : 10;
  const isoAngle = 30; // degrees, standard isometric projection

  // Isometric projection helper: converts (x, y, z) grid coords to 2D screen coords
  const project = (x, y, z) => {
    const px = (x - z) * Math.cos(isoAngle * Math.PI / 180) * scale;
    const py = (x + z) * Math.sin(isoAngle * Math.PI / 180) * scale - y * scale;
    return { px, py };
  };

  const svgWidth = (length + height) * scale * 1.8 + 80;
  const svgHeight = (width + height) * scale * 1.2 + 100;

  return (
    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}
         xmlns="http://www.w3.org/2000/svg"
         style={{ maxWidth: '100%', height: 'auto' }}>
      {/* Top face, front face, side face drawn as three parallelograms */}
      {/* Front face (length × height) */}
      <polygon points={facePoints('front', length, width, height, project)}
               fill="var(--cuboid-front, #7FB3E8)" stroke="#3A6EA5" strokeWidth="2" />
      {/* Top face (length × width) */}
      <polygon points={facePoints('top', length, width, height, project)}
               fill="var(--cuboid-top, #A8D0F0)" stroke="#3A6EA5" strokeWidth="2" />
      {/* Side face (width × height) */}
      <polygon points={facePoints('side', length, width, height, project)}
               fill="var(--cuboid-side, #5C93C9)" stroke="#3A6EA5" strokeWidth="2" />

      {/* Optional unit-cube grid lines overlaid on all 3 faces */}
      {showCubeGrid && renderCubeGridLines(length, width, height, project)}

      {/* Dimension labels along each visible edge */}
      <text /* length label */ fontSize="14" fontWeight="600">
        {missingSlot === 'length' ? '?' : `${length} ${unit}`}
      </text>
      <text /* width label */ fontSize="14" fontWeight="600">
        {missingSlot === 'width' ? '?' : `${width} ${unit}`}
      </text>
      <text /* height label */ fontSize="14" fontWeight="600">
        {missingSlot === 'height' ? '?' : `${height} ${unit}`}
      </text>

      {/* Formula label underneath */}
      <text x={svgWidth / 2} y={svgHeight - 10} textAnchor="middle"
            fontSize="15" fontWeight="bold" fill="#333">
        {`${length} × ${width} × ${height} = ${missingSlot === 'volume' ? '?' : length * width * height} ${unit}³`}
      </text>
    </svg>
  );
};
```

**Animation variants:**
- `animated=true` → CSS `cubeCountUp` keyframe: unit cubes fill in one-by-one with 60ms delay per cube, layer by layer (matches Station A's build sequence)
- `shake` variant → CSS `shake` keyframe applied to `<svg>` wrapper on wrong answer
- `bounce` variant → CSS `bounceIn` keyframe applied to `<svg>` wrapper on correct answer

---

## 7. Simulation Station Component Specs

### 7.1 `CubeFillStation.jsx` — Station A (Concrete)

**State:**
```javascript
const [config, setConfig] = useState(getStationARound(state.simRound));
// config: { length: 4, width: 3, height: 2 } → 24 unit cubes total

const [placed, setPlaced] = useState(0); // Cubes placed so far
const [grid, setGrid] = useState(
  Array(config.length * config.width * config.height).fill(false) // Slot occupancy
);
```

**Interaction (Drag):**
- `UnitCubePool` renders draggable cube `<div>` elements
- `CuboidFrame` renders a wireframe grid of droppable slots, filled bottom-to-top, back-to-front
- `onDrop`: marks next open slot `true`; increments `placed`
- Live counter badge: `"Cubes placed: 14 / 24"`

**Interaction (Tap fallback):**
- Tap cube in pool → cube becomes "selected" (glows)
- Tap next open slot → cube moves into slot

**Completion Check:**
- `placed === config.length * config.width * config.height` → cuboid fully built
- On completion: formula bar animates in: `4 × 3 × 2 = 24 unit cubes = 24 cm³`
- ElevenLabs plays celebration audio

**Station A Rounds (4 rounds, randomised order):**
```javascript
{ length: 2, width: 2, height: 2 } // 8 cubes (a cube!)
{ length: 3, width: 2, height: 2 } // 12 cubes
{ length: 4, width: 3, height: 2 } // 24 cubes
{ length: 5, width: 3, height: 2 } // 30 cubes
```

### 7.2 `VolumeDetectiveStation.jsx` — Station B (Pictorial)

**State:**
```javascript
const [cuboidCards, setCuboidCards] = useState(generateCuboidCards(round));
const [selected, setSelected] = useState([]); // Indices of tapped cards
const [submitted, setSubmitted] = useState(false);
```

**Card Generation (`generateCuboidCards`):**
- Creates 4 cuboid cards with labelled dimensions but no shown volume
- Deliberately includes at least one "looks big but isn't" and one "looks small but has a hidden long dimension" distractor
- Volumes computed internally for validation, never displayed pre-submit

**Interaction:**
- Prompt varies: "Tap the LARGEST volume" (single-select) or "Tap all with volume > X" (multi-select)
- "Check" button submits selection
- On submit: correct cards glow green, wrong cards glow red (1.5s), then a volume-reveal overlay shows each computed value
- Then advance to next round or next station

**Rounds (3 rounds per station):**
- Round 1: whole numbers 1–6, single-select "largest volume"
- Round 2: whole numbers 2–10, multi-select "greater than X"
- Round 3: mixed cuboids and cubes, dimensions up to 12

### 7.3 `FormulaMasterStation.jsx` — Station C (Abstract)

**State:**
```javascript
const [problem, setProblem] = useState(getFormulaProblem(state.simRound));
// problem: { length, width, height, volume, missingSlot }
const [inputValue, setInputValue] = useState('');
const [showDiagram, setShowDiagram] = useState(false);
```

**Layout:**
```jsx
<div className="formula-row">
  <span className="label">Volume =</span>
  {missingSlot === 'length'
    ? <BlankInput value={inputValue} />
    : <span className="given-value">{length}</span>}
  <span className="operator">×</span>
  {missingSlot === 'width'
    ? <BlankInput value={inputValue} />
    : <span className="given-value">{width}</span>}
  <span className="operator">×</span>
  {missingSlot === 'height'
    ? <BlankInput value={inputValue} />
    : <span className="given-value">{height}</span>}
  {missingSlot === 'volume' && (
    <>
      <span className="equals">=</span>
      <BlankInput value={inputValue} />
    </>
  )}
</div>
<NumberPad max={4000} value={inputValue} onChange={setInputValue} onSubmit={handleSubmit} />
<button onClick={() => setShowDiagram(!showDiagram)}>Show me the cubes 🧊</button>
{showDiagram && <CuboidDiagram length={length} width={width} height={height}
                                 missingSlot={missingSlot} showCubeGrid animated />}
```

**Variants (rotated across 3 rounds):**
- Round 1: Find total volume → `5 × 4 × 3 = ___`
- Round 2: Find missing dimension → `6 × ___ × 2 = 36`
- Round 3: Cube case → `Volume of a cube with side 4 cm = ___`

ElevenLabs reads the full equation aloud when displayed: "Five times four times three equals what? Type the answer!"

---

## 8. Audio Pipeline (ElevenLabs — Matching the Uploaded Reference Architecture)

### 8.1 Voice Configuration

- **Voice Name:** Alice
- **Voice ID:** `Xb7hH8MSUJpSbSDYk0k2`
- **Model:** `eleven_multilingual_v2`
- **API Key Var:** `VITE_ELEVENLABS_API_KEY` (in `.env.local`)

### 8.2 Speech Style Settings (per style type — reused from the uploaded pipeline)

| Style | stability | similarity_boost | style | use_speaker_boost |
|---|---|---|---|---|
| `celebration` | 0.12 | 0.45 | 0.75 | true |
| `encouragement` | 0.16 | 0.50 | 0.65 | true |
| `question` | 0.20 | 0.55 | 0.55 | true |
| `emphasis` | 0.16 | 0.50 | 0.60 | true |
| `thinking` | 0.24 | 0.60 | 0.35 | true |
| `statement` / `instruction` | 0.20 | 0.55 | 0.50 | true |

### 8.3 Offline Pre-generation Script (`scripts/generate_audio.js`)

```javascript
const phrases = [
  // Phase 1 — Wonder
  { text: "Mike has two boxes. One is flat and wide. The other is tall and narrow.", style: 'thinking' },
  { text: "Which one can actually hold more toy blocks inside?", style: 'question' },
  { text: "Let us find out what volume really means!", style: 'encouragement' },

  // Phase 2 — Story Panels (CargoQuest)
  { text: "Sarah, John, and Mike run a small space cargo delivery company.", style: 'statement' },
  { text: "Their cargo hold is four metres long, three metres wide, and two metres tall.", style: 'statement' },
  { text: "One layer has four times three, which is twelve cubes.", style: 'statement' },
  { text: "There are two layers. Twelve times two equals twenty four cubes!", style: 'emphasis' },
  { text: "So volume equals length times width times height, which is twenty four cubic metres!", style: 'emphasis' },
  { text: "A cube is a special cuboid. All its sides are equal!", style: 'statement' },
  { text: "One thousand cubic centimetres equals one litre. Volume tells us capacity!", style: 'emphasis' },

  // Phase 3 — Simulation Instructions
  { text: "Drag the cubes to fill the cargo box completely!", style: 'instruction' },
  { text: "Make sure every space is filled. Can you do it?", style: 'question' },
  { text: "Look at these cuboids. Which one has the largest volume? Tap to choose!", style: 'instruction' },
  { text: "Now fill in the missing number. Five times four times three equals what?", style: 'question' },

  // Phase 4 — Feedback
  { text: "Excellent! That's exactly the volume! You're a Cargo Champion!", style: 'celebration' },
  { text: "Not quite! Let's look at the box again.", style: 'encouragement' },
  { text: "Watch the cubes fill in! Can you count the layers with me?", style: 'thinking' },

  // Phase 5 — Reflect
  { text: "What a mission today! Can you tell me one thing you learned about volume?", style: 'thinking' },
  { text: "Mission complete! You are a Volume Voyager!", style: 'celebration' },

  // Badge unlocks
  { text: "Badge unlocked! You are a Cargo Cadet!", style: 'celebration' },
  { text: "Badge unlocked! Cube Builder! You completed all three stations!", style: 'celebration' },
  { text: "Badge unlocked! Volume Voyager! You scored over eighty percent!", style: 'celebration' },
];

// Script hits ElevenLabs API for each phrase, saves to public/assets/audio/
// Auto-generates src/utils/audioMap.js mapping text → .mp3 path
// Rate-limits at 500ms between API calls
```

### 8.4 Frontend Audio Engine (`src/hooks/useAudio.js`)

```javascript
// Step 1: Check audioMap for pre-generated static asset
// Step 2: If not found + API key present → fetch from ElevenLabs dynamically
// Step 3: Cache dynamic result in elevenLabsCache (in-memory Map)
// Step 4: Play via HTML5 Audio API (new Audio(url))
// Step 5: While segment i plays → preload segment i+1 (eager preload)

const elevenLabsCache = new Map(); // In-memory; cleared on page refresh

export async function getAudioUrl(text, style = 'statement', apiKey) {
  // 1. Static map check (fastest path)
  if (audioMap[text]) return audioMap[text];

  // 2. Memory cache check
  const cacheKey = `${text}::${style}`;
  if (elevenLabsCache.has(cacheKey)) return elevenLabsCache.get(cacheKey);

  // 3. Dynamic generation (requires API key)
  if (!apiKey) return null; // Silent skip — no fallback

  const styleSettings = STYLE_SETTINGS[style] ?? STYLE_SETTINGS.statement;
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/Xb7hH8MSUJpSbSDYk0k2`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: styleSettings,
      }),
    }
  );

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  elevenLabsCache.set(cacheKey, url);
  return url;
}

export async function narrate(segments, apiKey, onSegmentStart) {
  for (let i = 0; i < segments.length; i++) {
    const { text, style } = segments[i];
    const url = await getAudioUrl(text, style, apiKey);
    if (!url) continue; // Silent skip if no audio available

    // Eager preload next segment
    if (i + 1 < segments.length) {
      getAudioUrl(segments[i + 1].text, segments[i + 1].style, apiKey);
    }

    if (onSegmentStart) onSegmentStart(i);
    await playAudio(url); // Resolves on 'ended' event
  }
}

async function playAudio(url) {
  return new Promise((resolve) => {
    const audio = new Audio(url);
    audio.onended = resolve;
    audio.onerror = resolve; // Silent fail — never block UX
    audio.play().catch(resolve);
  });
}
```

### 8.5 Audio Cleanup (`scripts/clean_audio.js`)

- Imports `audioMap.js` to determine all valid referenced `.mp3` paths
- Scans `public/assets/audio/` for all `.mp3` files
- Deletes any `.mp3` not present in `audioMap` (orphaned files)
- Run after any phrase deletion or text edit in `generate_audio.js`

### 8.6 Narration Synchronisation Rules (1:1 Parity)

**CRITICAL:** Every on-screen text string that is narrated must match `narration.js` EXACTLY (same words, same punctuation, same capitalisation). Any UI text change requires:

1. Update `generate_audio.js` phrases array
2. Re-run: `node scripts/generate_audio.js`
3. Update corresponding text in the React UI component
4. Optionally run: `node scripts/clean_audio.js`

### 8.7 Content Policy Enforcement

As per the uploaded pipeline document, audio is generated **only** for paragraph text and question text — never for titles, headings, or section labels. This is enforced at the `narration.js` authoring level: phase functions (`introNarration()`, `wonderNarration()`, `getStoryNarration()`, `simulateStationIntro()`, `reflectQuestionNarration()`, etc.) must never include heading strings.

---

## 9. Randomisation Engine

### 9.1 Fisher-Yates Shuffle (`utils/shuffle.js`)

```javascript
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateSessionQuestions(bank) {
  const byType = {};
  bank.forEach(q => {
    if (!byType[q.type]) byType[q.type] = [];
    byType[q.type].push(q);
  });

  // Pick 10 from each type (shuffled), then shuffle the combined 100
  const selected = Object.values(byType)
    .flatMap(qs => shuffleArray(qs).slice(0, 10));

  return shuffleArray(selected);
}
```

### 9.2 MCQ Distractor Generation (`utils/scoring.js`)

```javascript
export function generateDistractors(correct, min = 0, max = 4000, count = 3) {
  const distractors = new Set();
  // Strategy: common conceptual errors — off-by-one-dimension, area-not-volume,
  // wrong-layer-count — mapped to numeric offsets relative to the correct volume
  const offsets = [-Math.round(correct * 0.1), -Math.round(correct * 0.2),
                    Math.round(correct * 0.1), Math.round(correct * 0.2),
                    -1, 1];

  shuffleArray(offsets).forEach(offset => {
    const d = correct + offset;
    if (d >= min && d <= max && d !== correct && d > 0 && distractors.size < count)
      distractors.add(d);
  });

  // Ensure always 4 options
  while (distractors.size < count) {
    const d = correct + (distractors.size + 1) * 2;
    if (d <= max && d !== correct) distractors.add(d);
  }

  return shuffleArray([correct, ...distractors]);
}
```

### 9.3 Session Persistence (24-hour resume)

```javascript
const SESSION_KEY = 'intellia_cuboid_volume_v1';

// On app mount: restore if within 24 hours
const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
if (saved && Date.now() - saved.timestamp < 86400000) {
  dispatch({ type: ACTIONS.RESTORE_SESSION, payload: saved });
}

// On every state change: persist progress
useEffect(() => {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    phase: state.phase,
    storyPanel: state.storyPanel,
    simStationsComplete: state.simStationsComplete,
    currentQuestion: state.currentQuestion,
    xp: state.xp,
    streak: state.streak,
    maxStreak: state.maxStreak,
    badges: state.badges,
    worldScores: state.worldScores,
    phaseComplete: state.phaseComplete,
    timestamp: Date.now(),
  }));
}, [state]);
```

---

## 10. Gamification Implementation

### 10.1 XP Calculation (`utils/scoring.js`)

```javascript
export function calcXP(attemptNumber, hintsUsed, streak) {
  const base = attemptNumber === 1 ? 10 : hintsUsed > 0 ? 5 : 7;
  const streakBonus = streak >= 5 ? 5 : 0;
  return base + streakBonus;
}
```

### 10.2 Star Rating (per world of 10 questions)

```javascript
export function calcStars(correct, total = 10) {
  if (correct >= 9) return 3; // Gold: ≥90%
  if (correct >= 7) return 2; // Silver: ≥70%
  if (correct >= 5) return 1; // Bronze: ≥50% (world unlock gate)
  return 0; // Try again
}

export function canUnlockWorld(worldScore) {
  return worldScore !== null && worldScore >= 5;
}

export function calcTotalStars(worldScores) {
  return worldScores.reduce((sum, ws) => sum + (ws !== null ? calcStars(ws) : 0), 0);
}
```

### 10.3 Badge Engine (`utils/badgeEngine.js`)

```javascript
export const BADGES = [
  {
    id: 'cargo_cadet',
    label: '📦 Cargo Cadet',
    description: 'Complete Wonder and Story phases',
    condition: (s) => s.phaseComplete.wonder && s.phaseComplete.story,
  },
  {
    id: 'cube_builder',
    label: '🧊 Cube Builder',
    description: 'Complete all 3 Simulation stations',
    condition: (s) => s.simStationsComplete.every(Boolean),
  },
  {
    id: 'volume_voyager',
    label: '🚀 Volume Voyager',
    description: 'Score 80%+ in Play phase',
    condition: (s) => {
      const totalCorrect = s.worldScores.reduce((sum, ws) => sum + (ws || 0), 0);
      return totalCorrect >= 80;
    },
  },
  {
    id: 'perfect_packer',
    label: '💎 Perfect Packer',
    description: 'Score 10/10 in any world',
    condition: (s) => s.worldScores.some(ws => ws === 10),
  },
  {
    id: 'streak_star',
    label: '🔥 Streak Star',
    description: 'Achieve a streak of 10 consecutive correct answers',
    condition: (s) => s.maxStreak >= 10,
  },
  {
    id: 'full_mission_complete',
    label: '🌟 Full Mission Complete',
    description: 'Complete all 6 screens',
    condition: (s) => Object.values(s.phaseComplete).every(Boolean),
  },
  {
    id: 'sharp_eyed_detective',
    label: '🕵️ Sharp-Eyed Detective',
    description: 'Complete Station B without any wrong selection',
    condition: (s) => s.stationBPerfect === true,
  },
  {
    id: 'formula_master',
    label: '📐 Formula Master',
    description: 'Answer 5 missing-dimension questions correctly',
    condition: (s) => (s.missingDimCorrect || 0) >= 5,
  },
];

export function checkBadges(state) {
  return BADGES
    .filter(b => !state.badges.includes(b.id) && b.condition(state))
    .map(b => b.id);
}

// Call after every state update that could unlock a badge:
const newBadges = checkBadges(newState);
if (newBadges.length > 0) {
  dispatch({ type: ACTIONS.UNLOCK_BADGE, payload: newBadges });
  newBadges.forEach(id => {
    const badge = BADGES.find(b => b.id === id);
    narrate([{ text: badge.description, style: 'celebration' }], apiKey);
  });
}
```

---

## 11. CSS Animation Keyframes (matching equal-tau.vercel.app style)

```css
@keyframes bounceIn {
  0%   { transform: scale(0.3); opacity: 0; }
  50%  { transform: scale(1.05); opacity: 1; }
  70%  { transform: scale(0.9); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
}

@keyframes floatUp {
  0%   { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-60px) scale(1.5); opacity: 0; }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(74, 144, 217, 0.4); }
  50%      { box-shadow: 0 0 0 12px rgba(74, 144, 217, 0); }
}

@keyframes celebrate {
  0%   { transform: rotate(-5deg) scale(1); }
  25%  { transform: rotate(5deg) scale(1.1); }
  50%  { transform: rotate(-3deg) scale(1.05); }
  75%  { transform: rotate(3deg) scale(1.1); }
  100% { transform: rotate(0deg) scale(1); }
}

@keyframes slideInUp {
  from { transform: translateY(30px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

@keyframes cubeCountUp {
  /* Applied to each unit cube with staggered delay, layer by layer */
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

@keyframes cuboidFacePop {
  0%   { transform: scale(0.5); opacity: 0; }
  60%  { transform: scale(1.08); }
  100% { transform: scale(1); opacity: 1; }
}

/* Stagger: each unit cube gets animation-delay: (layerIndex * 150ms) + (cubeIndex * 60ms) */
```

---

## 12. Component Prop Contracts

| Component | Props | Returns |
|---|---|---|
| `CuboidDiagram` | `{ length, width, height, missingSlot?, unit?, showCubeGrid?, animated?, size? }` | Isometric SVG element (inline, responsive) |
| `CuboidFrame` | `{ length, width, height, filledSlots, onDrop, highlighted? }` | Droppable wireframe grid with slot occupancy overlay |
| `UnitCubePool` | `{ cubesRemaining, onDragStart, onTap }` | Flex-wrap grid of draggable/tappable cube elements |
| `NumberPad` | `{ max, allowDecimal?, value, onChange, onSubmit }` | Grid of digit buttons (min 44×44px), backspace, submit |
| `Mascot` | `{ mood: 'idle'\|'happy'\|'thinking'\|'celebrating'\|'encouraging' }` | img/svg + CSS animation class mapped to mood |
| `QuestionRenderer` | `{ question: Question, onAnswer: (answer: any) => void, hints: number }` | Type-specific question component |
| `FeedbackOverlay` | `{ isCorrect: boolean, explanation?: string, xpEarned: number, onContinue: () => void }` | Animated modal overlay (bounceIn correct / shake wrong) |
| `WorldMap` | `{ worldScores: (number\|null)[], currentWorld: number, onSelectWorld: (i) => void }` | Horizontal scrollable world list with star ratings and lock icons |
| `BadgePanel` | `{ badges: string[], newBadgeId?: string }` | Badge grid with unlock toast animation for `newBadgeId` |

---

## 13. Performance Requirements

| Metric | Target |
|---|---|
| Initial load time | < 2 seconds (Vite production build) |
| Time to first meaningful paint | < 1 second |
| SVG animation frame rate | 60 fps |
| Memory usage | < 60 MB |
| Bundle size (gzipped) | < 600 KB |
| Lighthouse Performance score | ≥ 90 |
| Lighthouse Accessibility score | ≥ 90 |
| ElevenLabs pre-gen audio TTFB | 0ms (static `.mp3` assets) |
| ElevenLabs dynamic audio TTFB | < 2 seconds (API latency) |

---

## 14. Browser & Device Support

| Environment | Support Level |
|---|---|
| Chrome 110+ (desktop) | Full |
| Safari 15+ (iPad) | Full — primary classroom device |
| Firefox 110+ | Full |
| Edge 110+ | Full |
| Android Chrome | Full |
| iOS Safari 15+ | Full |
| IE 11 | Not supported |

**Primary test device:** iPad (768px, touch) — classroom use context
**Secondary:** Desktop Chrome (1280px+)

---

## 15. Testing & QA Requirements

- **Unit tests:** `shuffle.js`, `scoring.js`, `badgeEngine.js` — pure function coverage ≥ 90%
- **Component tests:** `CuboidDiagram` renders correct number of faces/labels for a matrix of `length/width/height` combinations, including edge cases (cube where `l=w=h`, and very thin cuboids where one dimension = 1)
- **Randomisation test:** Run 100 simulated sessions of `generateSessionQuestions()`; assert no two sessions produce an identical order and each type contributes exactly 10 questions
- **Audio parity test:** Automated diff between all narrated strings in `narration.js` and the `phrases` array in `generate_audio.js` — must be 100% identical set
- **Accessibility audit:** Axe/Lighthouse pass on every phase screen, WCAG AA minimum
- **Manual QA:** Full 6-phase walkthrough on iPad Safari and Desktop Chrome, verifying drag-and-drop AND tap-fallback paths for all 3 simulation stations

---

**Document Version:** 1.0 | July 2026
**Product:** Intellia Global — Grade 5 Math
**Lesson Title:** CargoQuest — The Cuboid Challenge (Volume of Cuboids)
**Reference UI:** https://equal-tau.vercel.app/
**Reference Repo:** https://github.com/dsamyak/equal
**Audio Pipeline:** ElevenLabs (Alice, `Xb7hH8MSUJpSbSDYk0k2`, `eleven_multilingual_v2`) — per uploaded Number Bonds Audio & Narration Pipeline doc
