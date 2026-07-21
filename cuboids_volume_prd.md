# Product Requirements Document (PRD)
## Cuboids & Volume — Grade 5 Math
### Intellia Global | World Mathematics Curriculum (Common Core · Singapore MOE · UK National Curriculum · CBSE/ICSE · Australian Curriculum)

---

## 1. Executive Summary

This document defines product requirements for **"CargoQuest: The Cuboid Challenge"** — an interactive, gamified, simulation-based lesson module teaching **Volume of Cuboids** to Grade 5 students (age 10–11) worldwide. The module is built as a standalone React web experience and is designed to be embedded as a lesson page, e.g.:

```
https://intelliasg.com/courses/grade-5-math/lessons/cuboids-and-volume/
```

The lesson lives as an expansion of the existing course catalogue referenced at `https://intelliasg.com/courses/grade-3-math` — following the same course-page pattern, but re-parented under **Grade 5 Math**, since Volume of Cuboids is a Grade 5 topic across virtually every major national curriculum.

The product **strictly mirrors** the visual language, UX structure, phase model, and component architecture of the reference build:

- **Reference UI:** `https://equal-tau.vercel.app/`
- **Reference Repo:** `https://github.com/dsamyak/equal`

Audio narration uses **ElevenLabs exclusively** — Voice "Alice" (`Xb7hH8MSUJpSbSDYk0k2`), model `eleven_multilingual_v2` — with pre-generated static `.mp3` assets for all fixed phase narration and dynamic on-the-fly generation for the randomised practice questions, exactly per the architecture in the uploaded **Number Bonds Audio & Narration Pipeline** document.

The module follows Intellia's proven 6-screen learner journey:

```
INTRO → WONDER → STORY → SIMULATE → PLAY → REFLECT
```

---

## 2. Product Vision & Goals

### Vision
To make **Volume of Cuboids** — a concept every Grade 5 curriculum in the world teaches — feel like an adventure rather than a formula to memorize, by letting students **build cuboids out of unit cubes, run a cargo-packing simulation, and only then** derive and drill the abstract formula `V = l × w × h`, following a strict **Concrete → Pictorial → Abstract (CPA)** progression, then reinforcing it with unlimited randomised practice.

### Goals

| Goal | Metric |
|---|---|
| Learning Completion | ≥85% of students complete all 6 screens |
| Practice Engagement | ≥90% attempt at least 10 practice questions |
| Score Achievement | Average challenge score ≥75% on first attempt |
| Session Duration | Average engagement ≥18 minutes per session |
| Curriculum Alignment | 100% aligned to global Grade 5 volume standards (see §4) |
| Phase Progression | ≥80% reach the Play phase in a single session |
| Simulation Interaction Rate | ≥95% attempt all 3 simulation stations |
| Randomisation Integrity | 0% repeated question order across sessions |

---

## 3. Target Users

**Primary: Grade 5 Students (Age 10–11), Global**
- Comfortable with 2-digit/3-digit arithmetic and basic area concepts (pre-requisite: area of rectangle)
- Ready to move from 2D (area) to 3D (volume) spatial reasoning
- Motivated by game mechanics: XP, streaks, worlds, badges
- Names, contexts, and objects in word problems should feel **globally inclusive** — not tied to one country

**Secondary: Parents & Teachers (Global)**
- Assign as classwork, homework, or enrichment
- Expect alignment across international frameworks, since students may be US, UK, Indian, Singaporean, Australian, or otherwise
- Monitor via on-screen phase completion indicators

---

## 4. Curriculum Alignment — Global Grade 5 Standards

**Topic:** Volume of Cuboids (and Cubes as a special case)

| Curriculum | Reference Standard(s) |
|---|---|
| **Common Core (USA)** | 5.MD.C.3, 5.MD.C.4, 5.MD.C.5 — Geometric measurement: understand concepts of volume; relate volume to multiplication and addition |
| **Singapore MOE Primary Mathematics** | Primary 5, Measurement strand — Volume of Cubes and Cuboids |
| **UK National Curriculum (Key Stage 2, Year 5–6)** | Measurement — estimate volume; calculate volume of cubes and cuboids |
| **CBSE / ICSE (India), Class 5** | Mensuration — Volume, unit cubes, cm³/m³, volume vs. capacity |
| **Australian Curriculum (Year 5–6, ACMMG)** | Measurement and Geometry — connect volume to the areas of cross-sections and lengths |

### Learning Objectives Covered
- **LO1** Recognise a cuboid and identify its length, width (breadth), and height
- **LO2** Understand volume as the amount of 3D space occupied, measured in cubic units (unit cubes)
- **LO3** Build/visualise a cuboid from unit cubes and count total cubes to find volume
- **LO4** Derive and apply the formula **Volume = length × width × height**
- **LO5** Recognise the cube as a special cuboid: **Volume = side³**
- **LO6** Find a missing dimension when volume and two dimensions are known
- **LO7** Convert between volume units (cm³ ↔ m³) and relate volume to capacity (1000 cm³ = 1 litre)
- **LO8** Compare volumes of different cuboids; reason about "which container holds more"
- **LO9** Solve real-world word problems involving tanks, boxes, containers, and packing
- **LO10** Use correct vocabulary: "cuboid," "cube," "unit cube," "length/width/height," "volume," "cubic centimetres (cm³)," "cubic metres (m³)," "capacity"

### CPA Progression for This Lesson
- **Concrete** → Physical unit cubes stacked to fill a wireframe cuboid (simulated digitally, draggable)
- **Pictorial** → 3D diagrams of cuboids with labelled dimensions; isometric cube-grid drawings
- **Abstract** → `V = l × w × h`; solving for missing values; word problems

### Number Ranges
- **Easy:** Whole-number dimensions 1–10, volume ≤ 200 cm³
- **Medium:** Whole-number dimensions 2–15, volume ≤ 1,000 cm³; introduces cm³ ↔ litres
- **Hard:** Dimensions up to 20, decimals to 1 d.p. for one dimension, volume ≤ 4,000 cm³; missing-dimension and packing problems

### Vocabulary Focus
"cuboid," "cube," "unit cube," "length," "width," "height," "volume," "cubic centimetre (cm³)," "cubic metre (m³)," "capacity," "litre," "how many cubes fit," "missing dimension"

---

## 5. The 6-Screen Learner Journey

```
┌────────────────────────────────────────────────────────────────────────────┐
│ INTRO SCREEN → Progress Map (6-step visual tracker, top bar)               │
│ Welcome: "Hi, Cargo Cadet! Today we're going to master Volume!" 📦🚀        │
│ Lesson badge shown (locked). 6 glowing phase dots visible.                 │
└────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1 — WONDER (≈1–2 min)                                                │
│                                                                             │
│ Hook: "Mike has two boxes. One is a flat, wide box. The other is a tall,   │
│ narrow box. Both boxes look 'about the same size' — but which one can     │
│ actually hold MORE toy blocks inside?"                                     │
│                                                                             │
│ Visual: Two cuboid outlines rotate slowly in 3D; toy blocks pour into      │
│ each, filling at different rates.                                          │
│ Narration (ElevenLabs): Alice voice reads the hook warmly.                 │
│ → Mascot "Cubie" (a friendly cube-bot) appears, puzzled.                   │
│ → "Let's find out what VOLUME really means!"                              │
└────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 2 — STORY: "CargoQuest — The Cuboid Challenge" (≈3–4 min)           │
│                                                                             │
│ Panel 1: Sarah, John, and Mike run a small space-cargo delivery company.   │
│ Their spaceship has a cuboid-shaped cargo hold. 🚀📦                       │
│ Panel 2: "The cargo hold is 4 metres long, 3 metres wide, and 2 metres     │
│ tall. To know how much cargo it can carry, we need its VOLUME."           │
│ Panel 3: Unit-cube grid animates filling the hold layer by layer:          │
│ "One layer has 4 × 3 = 12 cubes. There are 2 layers. 12 × 2 = 24 cubes!"  │
│ Panel 4: "So Volume = length × width × height = 4 × 3 × 2 = 24 m³!"        │
│ Panel 5: Sarah checks a cube-shaped fuel tank, side = 3 m: "A cube is a    │
│ special cuboid — all sides equal! Volume = 3 × 3 × 3 = 27 m³."           │
│ Panel 6: John needs to know how many litres of water their aquarium-       │
│ shaped escape pod holds: "1000 cm³ = 1 litre! Volume tells us capacity."  │
│                                                                             │
│ → Illustrated story panels (animated slide-in), ElevenLabs narration       │
│ → Key vocabulary highlighted: "volume," "unit cube," "length × width ×    │
│   height," "capacity"                                                      │
│ → 3D cuboid diagram introduced visually (isometric cube stack)             │
└────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 3 — SIMULATE (≈6–8 min)                                              │
│                                                                             │
│ 3 Interactive Stations — student must complete all 3 to advance            │
│                                                                             │
│ Station A — "Build the Cargo Box" (Concrete)                              │
│ Drag unit cubes to fill a 3D wireframe cuboid completely. Counter shows    │
│ cubes placed vs. cubes needed. On completion, the app reveals: "You used   │
│ 24 cubes — that's the Volume!" and overlays the l × w × h formula.       │
│                                                                             │
│ Station B — "Volume Detective" (Pictorial)                                │
│ 4 isometric cuboid diagrams shown with dimensions labelled. Student taps   │
│ the cuboid(s) matching a target volume, or ranks them by volume.           │
│                                                                             │
│ Station C — "Formula Master" (Abstract)                                   │
│ "Volume = ___ × ___ × ___" or "12 × 5 × ___ = 180" — fill the missing     │
│ value using a number pad. Diagram shown as scaffold.                       │
│                                                                             │
│ → Mascot Cubie reacts to each completed station                           │
│ → ElevenLabs narrates each station's instruction and feedback              │
└────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 4 — PLAY (≈8–10 min)                                                 │
│                                                                             │
│ IntelliPlay™ Level: 100 randomised questions across 10 worlds              │
│ 10 questions per world, world unlocks at ≥6/10 correct                    │
│ Stars (1–3), XP, badges, and streak fire counter active                   │
│ → Mastery gates the world map; encouragement-first feedback               │
└────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 5 — REFLECT (≈1–2 min)                                               │
│                                                                             │
│ Journal prompt: "If you built a treehouse-shaped cuboid box, how would    │
│ you find out how much it can hold? Explain in your own words."            │
│ Or: LearnFlow AI chat — type/speak your understanding                     │
│ Lesson complete badge unlocks here. Summary of XP + badges shown.          │
│ → "Share with your teacher!" button (screenshot / export)                 │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Phase 3 — Simulation Design (Detailed)

### 6.1 Station A — "Build the Cargo Box" (Concrete)

**Visual:**
- An empty 3D wireframe cuboid (rendered isometrically) with grid lines marking unit-cube slots
- A tray of draggable unit cubes below
- "Fill the cargo box completely!" instruction narrated by Alice

**Interaction:**
- Student drags a cube at a time into the next open grid slot (auto-snaps layer by layer, back-to-front, bottom-to-top)
- Tap-to-place accessibility mode: tap a cube in the tray, then tap the next open slot
- Live counter: "Cubes placed: 14 / 24"
- When full, a formula bar animates in beneath: `4 × 3 × 2 = 24 unit cubes = 24 cm³ (or m³)`

**Feedback:**
- Box completely and correctly filled → mascot cheers, "Perfect! The cargo hold holds 24 cubes of space!" 🎉
- Student tries to overfill or place outside the frame → gentle bounce-back animation + "Cubes only fit inside the box!"

**Variants per round (randomised):**
- Round 1: 2 × 2 × 2 (8 cubes) — a cube
- Round 2: 3 × 2 × 2 (12 cubes)
- Round 3: 4 × 3 × 2 (24 cubes)
- Round 4: 5 × 3 × 2 (30 cubes)

### 6.2 Station B — "Volume Detective" (Pictorial)

**Visual:**
- 4 isometric cuboid cards (2×2 grid), each with length/width/height labelled on the diagram (no volume shown)
- Some cuboids are visually similar in size but differ in actual volume (classic misconception target)

**Interaction:**
- Prompt A: "Tap the cuboid with the LARGEST volume" (single-select)
- Prompt B: "Tap all cuboids with a volume greater than 30 cm³" (multi-select)
- On submit: correct choices glow green, incorrect glow red (1.5s), then explanation overlay shows each computed volume

**Teaching goal:**
- Break the "looks bigger = holds more" misconception by forcing computation, not just visual estimation

**Distractor design:**
- One "long and flat" cuboid vs. one "short and wide" cuboid with the same or a deceptively close volume
- One clearly smaller-looking cuboid that actually has a larger volume due to a longer hidden dimension

**3 rounds with increasing complexity:**
- Round 1: whole numbers 1–6, single-select "largest volume"
- Round 2: whole numbers 2–10, multi-select "greater than X"
- Round 3: one dimension may be a cube's side (a×a×a), mixed cuboids and cubes

### 6.3 Station C — "Formula Master" (Abstract)

**Visual:**
```
Volume = ___ × ___ × ___
```
(one or more blanks highlighted for input; others show given values)

**Interaction:**
- Number pad (large, tap-friendly, 0–9 plus decimal point for hard-tier)
- Cuboid diagram shown above as visual scaffold
- "Show me the cubes" hint button always visible → replays the Station A cube-fill animation for this problem
- On submit: correct → bounce animation; incorrect → shake + hint

**Variants (rotated per round):**
- Find total volume: `5 × 4 × 3 = ___`
- Find missing dimension: `6 × ___ × 2 = 36`
- Cube case: `Volume of a cube with side 4 cm = ___`

ElevenLabs narrates each equation aloud when displayed (e.g., "Five times four times three equals what? Type the answer!").

---

## 7. Phase 4 — Question Bank (100 Randomised Questions)

### 7.1 Question Types (10 types × 10 questions = 100 total)

| Type | Description | Example |
|---|---|---|
| Q1 | Calculate volume from 3 given dimensions | A box is 6 cm long, 4 cm wide, 3 cm tall. Find its volume. |
| Q2 | Count unit cubes in a 3D diagram | [Diagram] How many unit cubes make up this cuboid? |
| Q3 | Find a missing dimension | Volume = 60 cm³. Length = 5 cm, width = 4 cm. Find the height. |
| Q4 | Compare two cuboids' volumes | Which has a greater volume: Box A (5×3×2) or Box B (4×4×2)? |
| Q5 | Real-world word problem (tank/box/container) | Sarah's fish tank is 40 cm × 25 cm × 20 cm. What is its volume? |
| Q6 | Volume ↔ capacity conversion | A container holds 3000 cm³ of water. How many litres is that? |
| Q7 | Cube volume (special case) | Find the volume of a cube with side length 7 cm. |
| Q8 | True/False — volume statement | "A cuboid 2×3×4 has the same volume as a cube of side 3." True or False? |
| Q9 | MCQ — which cuboid shows a given volume | Which of these 4 cuboids has a volume of 48 cm³? |
| Q10 | Packing / estimation problem | How many 2 cm cubes fit exactly inside a 6 cm × 4 cm × 2 cm box? |

### 7.2 Question Distribution by Difficulty

| Type | Count | Easy (≤200 cm³) | Medium (≤1,000 cm³) | Hard (≤4,000 cm³, decimals) |
|---|---|---|---|---|
| Q1 | 10 | 5 | 3 | 2 |
| Q2 | 10 | 5 | 3 | 2 |
| Q3 | 10 | 3 | 4 | 3 |
| Q4 | 10 | 4 | 4 | 2 |
| Q5 | 10 | 3 | 4 | 3 |
| Q6 | 10 | 3 | 4 | 3 |
| Q7 | 10 | 5 | 3 | 2 |
| Q8 | 10 | 5 | 3 | 2 |
| Q9 | 10 | 4 | 4 | 2 |
| Q10 | 10 | 3 | 4 | 3 |
| **Total** | **100** | **40** | **36** | **24** |

### 7.3 Global Names & Contexts Used in Word Problems

**Names (globally diverse):** John, Sarah, Mike, Emma, Liam, Aisha, Carlos, Yuki, Priya, Kwame, Olga, Noah, Fatima, Diego, Mei

**Objects/Contexts:** shipping crates, aquariums, storage boxes, swimming pools, sandboxes, moving boxes, gift boxes, water tanks, toy chests, cereal boxes, freight containers, ice cube trays, planters, suitcases

**Settings:** the CargoQuest spaceship, a moving-house scenario, a school science fair, an aquarium shop, a toy factory, a summer camp storage shed

### 7.4 Global-Curriculum-Aligned Language Requirements

All questions use vocabulary consistent across Common Core, Singapore MOE, UK NC, CBSE/ICSE, and Australian Curriculum phrasing:

- "volume," "cuboid," "cube," "unit cube," "length," "width," "height"
- "cubic centimetres (cm³)," "cubic metres (m³)," "capacity," "litres"
- "how many cubes fit," "missing dimension," "greater than / less than"

Sentence structures avoid country-specific idioms or units (no imperial-only problems) — metric units are the default, consistent with the global majority.

---

## 8. Gamification Design

### 8.1 Reward System

- **Stars (⭐):** Earned per 10-question world (1–3 stars based on score)
- **XP Points:** 10 XP correct first try | 7 XP second try | 5 XP with hint used
- **Streak 🔥:** Fire counter for consecutive correct answers
- **Streak Bonus:** +5 XP per correct answer when streak ≥ 5

### 8.2 Badges (Unlockable)

- 📦 **"Cargo Cadet"** — Complete Wonder + Story phases
- 🧊 **"Cube Builder"** — Complete all 3 Simulation stations
- 🚀 **"Volume Voyager"** — Score ≥80% on Play phase
- 💎 **"Perfect Packer"** — Score 10/10 in any world
- 🔥 **"Streak Star"** — Achieve a streak of 10 consecutive correct answers
- 🌟 **"Full Mission Complete"** — Complete all 6 screens
- 🕵️ **"Sharp-Eyed Detective"** — Get 5 correct in Station B without any wrong pick
- 📐 **"Formula Master"** — Answer 5 missing-dimension questions correctly (Q3)

### 8.3 Feedback Mechanics

**✅ Correct:**
- Bounce animation on answer card + mascot happy mood
- ElevenLabs celebration audio: "Excellent! That's exactly the volume! 🎉"
- XP floats up from answer card (+10 / +7 / +5)
- Streak fire counter increments

**❌ Incorrect (Attempt 1):**
- Gentle shake animation + ElevenLabs: "Not quite! Let's look at the box again 📦"
- Hint 1 activates: cuboid diagram highlighted with dimensions labelled

**❌ Incorrect (Attempt 2):**
- Stronger shake + Hint 2: cube-fill animation plays for this specific problem
- ElevenLabs: "Watch the cubes fill in! Can you count the layers with me?"

**❌ Incorrect (Attempt 3):**
- Answer revealed with animated explanation (mascot explains)
- ElevenLabs: full explanation read aloud
- No score penalty — encouragement only

No negative scoring. Encouragement-first approach always.

### 8.4 World Map (IntelliPlay™ Level Progression)

1. **World 1 — "Toy Box Town"** (Q1–10, dims 1–5, easy, ≤60 cm³)
2. **World 2 — "Moving Day"** (Q11–20, dims 2–6, easy-med, ≤120 cm³)
3. **World 3 — "Aquarium Alley"** (Q21–30, dims 2–8, medium, ≤300 cm³)
4. **World 4 — "Gift Wrap Galaxy"** (Q31–40, dims 3–10, medium, ≤500 cm³)
5. **World 5 — "Warehouse Wonders"** (Q41–50, dims 4–12, medium-hard, ≤800 cm³)
6. **World 6 — "Cube Fuel Station"** (Q51–60, dims 3–10, hard, includes cube-only, ≤1,000 cm³)
7. **World 7 — "Storage Station Alpha"** (Q61–70, dims 4–14, hard, missing dimensions)
8. **World 8 — "Freight Container Frontier"** (Q71–80, dims 5–16, hard, word problems)
9. **World 9 — "Litre Lagoon"** (Q81–90, mixed types, capacity conversions, hard)
10. **World 10 — "Cargo Command Center"** (Q91–100, mixed, hardest, decimals + packing problems)

**Unlock gate:** ≥6/10 correct (1-star minimum) required to advance to next world. 3 stars in a world unlocks a hidden "Bonus Mission" (3 extra questions).

### 8.5 Mascot ("Cubie" — LearnFlow AI Companion)

- **Character:** A friendly, glowing cube-shaped robot named "Cubie"
- **Mood States:** idle | curious | happy | thinking | celebrating | encouraging
- **Appearances:** Wonder hook, Story narration, Simulation feedback, Reflect phase
- **Reactions:** Correct answer, badge unlock, streak milestone, world completion
- **Audio:** All mascot speech via ElevenLabs Alice voice (pre-generated `.mp3`)

---

## 9. Audio & Narration Design

This section follows the architecture in the uploaded **Number Bonds Audio & Narration Pipeline** document exactly, retargeted to this lesson's content.

### 9.1 ElevenLabs Pipeline

- **Voice Provider:** ElevenLabs (ONLY — no browser Web Speech API fallback)
- **Voice Name:** Alice (Clear, Engaging Educator)
- **Voice ID:** `Xb7hH8MSUJpSbSDYk0k2`
- **Model:** `eleven_multilingual_v2`
- **API Key Env Var:** `VITE_ELEVENLABS_API_KEY`

### 9.2 Voice Settings by Style (reused from the pipeline doc)

| Style | Stability | Similarity Boost | Style | Speaker Boost |
|---|---|---|---|---|
| `celebration` | 0.12 | 0.45 | 0.75 | ✅ |
| `encouragement` | 0.16 | 0.50 | 0.65 | ✅ |
| `question` | 0.20 | 0.55 | 0.55 | ✅ |
| `emphasis` | 0.16 | 0.50 | 0.60 | ✅ |
| `thinking` | 0.24 | 0.60 | 0.35 | ✅ |
| `statement` / `instruction` | 0.20 | 0.55 | 0.50 | ✅ |

### 9.3 Content Policy: Paragraphs & Questions ONLY

> Audio is generated ONLY for paragraph text and questions. Titles, headings, and section labels are NEVER narrated — this keeps narration focused on educational content and prevents repetitive title reading.

### 9.4 Pre-generated Audio (Offline — `scripts/generate_audio.js`)

All fixed narration (Wonder hook, Story panels, Simulate instructions, Reflect prompt, badge unlock lines, world completion lines) is pre-generated offline and stored as static `.mp3` files in `public/assets/audio/`, with `src/utils/audioMap.js` auto-generated to map exact text → file path.

### 9.5 Dynamic Generation (Practice Questions)

Phase 4 practice questions are generated dynamically via the ElevenLabs API if not already pre-cached, using the in-memory `elevenLabsCache`. If no API key is present, narration is silently skipped — never falls back to browser TTS.

### 9.6 Segment Synchronisation

Narration is parsed as an array of sentence-level segments. While segment `i` plays, segment `i+1` is eagerly preloaded, eliminating latency gaps — matching the pipeline's `narrate()` queue behaviour exactly.

### 9.7 Narration Script Examples

**Phase 1 (Wonder) — style: thinking**
> "Mike has two boxes. One is flat and wide. The other is tall and narrow."
> "Which one can actually hold more toy blocks inside?"
> "Let us find out what volume really means!"

**Phase 2 (Story, Panel 3) — style: statement**
> "One layer has four times three, which is twelve cubes."
> "There are two layers. Twelve times two equals twenty four cubes!"

**Phase 3 (Station A) — style: instruction**
> "Drag the cubes to fill the cargo box completely!"
> "Make sure every space is filled. Can you do it?"

**Phase 4 (Correct feedback) — style: celebration**
> "Excellent! That's exactly the volume! You're a Cargo Champion!"

**Phase 5 (Reflect) — style: thinking**
> "What a mission today! Can you tell me one thing you learned about volume?"

### 9.8 Audio Script Parity (1:1 Strict Rule)

Every on-screen text string that is narrated must match `narration.js` exactly — same words, same punctuation. Any UI text change requires updating both the `generate_audio.js` phrases array and `narration.js` together.

---

## 10. UX & Visual Design Requirements

### 10.1 Visual Theme

- **Reference UI:** `https://equal-tau.vercel.app/` (mirror exactly)
- **Reference Repo:** `https://github.com/dsamyak/equal`
- **Colours:** Match the reference build exactly — primary blue, accent gold/yellow for rewards, soft coral/red for wrong-answer states, white card backgrounds with soft drop shadows
- **Typography:** Rounded, playful — Nunito or Fredoka One
- **Illustrations:** Cartoon-style, globally neutral imagery (spaceships, cargo, aquariums, toy boxes — not tied to one country/culture)
- **Cuboid Diagrams:** Isometric 3D SVG boxes, distinctly coloured faces, unit-cube grid overlays

### 10.2 Layout Structure (mirrors equal-tau.vercel.app)

- **Top Bar:** Logo | Lesson title "Volume of Cuboids" | 6-phase dot tracker
- **Main Area:** Phase content (fills screen, responsive, smooth phase transitions)
- **Bottom Bar:** XP counter | Star count | Streak fire | Phase navigation arrows
- **Sidebar:** Hidden on mobile; shown on tablet+ as vertical phase map

### 10.3 Cuboid/Volume Diagram Visual Component (Primary Visual)

Used throughout all phases:
- Isometric 3D cuboid rendered as SVG with visible unit-cube grid lines
- Labelled length/width/height along respective edges
- Missing value shown as a dashed "?" edge label
- Cube-fill count-up animation on first render
- Formula label beneath: `l × w × h = V`

### 10.4 Accessibility

- Large tap targets (minimum 44×44px on all interactive elements)
- WCAG AA colour contrast on all text elements
- All narration via ElevenLabs (premium, consistent voice)
- Keyboard navigable (Tab + Enter for all interactions)
- No mandatory time pressure (optional timer toggle in challenge mode only)
- Drag interactions have touch-equivalent tap+tap fallback

### 10.5 Responsive Design

- **Primary:** iPad / tablet (768px+) — classroom context
- **Secondary:** Desktop browser (1024px+)
- **Tertiary:** Mobile (375px+) — stacked single-column layout

---

## 11. Content Requirements

### 11.1 Simulation Visuals

- Cuboid wireframes: SVG isometric grid, unit cubes as small coloured 3D-look squares
- Object pool: unit cubes in varied colours rotated per session
- Station B cards: 4 isometric cuboid diagrams, distinct dimensions, clean whitespace
- Abstract formula bar: large bold typography, one highlighted blank per round

### 11.2 Question Bank Coverage

- All 10 question types × 10 questions = 100 unique question objects in `questionBank.js`
- Questions randomised per session using Fisher-Yates shuffle
- No two sessions present the same question order
- MCQ distractors always plausible (dimension swap errors, off-by-one-layer errors, area-instead-of-volume errors)

### 11.3 Word Problem Format (Global Style)

**Volume calculation:**
> "[Name]'s [container] is [length] cm long, [width] cm wide, and [height] cm tall. What is its volume?"

**Missing dimension:**
> "A [container] has a volume of [total] cm³. Its length is [length] cm and its width is [width] cm. What is its height?"

**Capacity conversion:**
> "[Name]'s [container] holds [total] cm³ of water. How many litres is that?"

**Packing/estimation:**
> "How many [size] cm cubes fit exactly inside a [length] × [width] × [height] cm box?"

### 11.4 Audio Script Parity (1:1 Strict Parity Rule)

Every on-screen text string that is narrated must match the narration.js text exactly — same words, same punctuation. This prevents confusion for learners who are simultaneously listening and reading.

---

## 12. Success Criteria (v1.0)

| Criterion | Target |
|---|---|
| All 100 questions randomised correctly | ✅ Required |
| All 3 simulation stations functional | ✅ Required |
| All 6 screens navigable end-to-end | ✅ Required |
| Gamification (XP, stars, 8 badges) working | ✅ Required |
| World map 10-world progression logic correct | ✅ Required |
| ElevenLabs audio plays for all phase narration | ✅ Required |
| Audio pipeline (pre-gen + dynamic) functional | ✅ Required |
| Mobile/tablet responsive layout | ✅ Required |
| Global Grade 5 volume standards 100% covered | ✅ Required |
| Loads in < 3 seconds (Vite production build) | ✅ Required |
| WCAG AA accessible | ✅ Required |
| UI matches equal-tau.vercel.app structure | ✅ Required |
| Hosted correctly at Grade 5 course lesson URL | ✅ Required |

---

## 13. Out of Scope (v1.0)

- Teacher dashboard / backend analytics
- Student login / account persistence across devices
- Multiplayer or class competition features
- Parent progress report emails
- Print worksheet generation
- Surface area, nets, or cylinder/prism volume (separate future modules)
- Assessment against a full standardized test engine

---

**Document Version:** 1.0 | July 2026
**Product:** Intellia Global — Grade 5 Math
**Lesson Title:** CargoQuest — The Cuboid Challenge (Volume of Cuboids)
**Curriculum:** Global Grade 5 Mathematics (Common Core, Singapore MOE, UK NC, CBSE/ICSE, Australian Curriculum)
**Reference UI:** https://equal-tau.vercel.app/
**Reference Repo:** https://github.com/dsamyak/equal
**Audio Pipeline:** ElevenLabs (Alice, `Xb7hH8MSUJpSbSDYk0k2`, `eleven_multilingual_v2`)
**Parent Course Page (pattern reference):** https://intelliasg.com/courses/grade-3-math
