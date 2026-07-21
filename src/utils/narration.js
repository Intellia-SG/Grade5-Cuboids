export const say = (text) => ({ text, style: 'statement' });
export const ask = (text) => ({ text, style: 'question' });
export const cheer = (text) => ({ text, style: 'celebration' });
export const think = (text) => ({ text, style: 'thinking' });
export const instruct = (text) => ({ text, style: 'instruction' });

export function introNarration() {
  return [
    say("Welcome to Volume of Cuboids! Today we are going to master Volume!")
  ];
}

export function wonderNarration() {
  return [
    think("Mike has two boxes. One is flat and wide. The other is tall and narrow."),
    ask("Which one can actually hold more toy blocks inside?"),
    say("Let us find out what volume really means!")
  ];
}

export function getStoryNarration(panelIndex) {
  const texts = [
    "Sarah, John, and Mike run a small space cargo delivery company. Their spaceship has a cuboid-shaped cargo hold ready to pack!",
    "The cargo hold is 4 metres long, 3 metres wide, and 2 metres tall. To know how much cargo it can carry, we need to find its VOLUME.",
    "One bottom layer has 4 × 3 = 12 unit cubes. Since it is 2 metres tall, there are 2 layers. 12 × 2 = 24 cubes in total!",
    "So Volume = length × width × height = 4 × 3 × 2 = 24 m³! Now we can calculate the volume of any cuboid instantly.",
    "Sarah checks a cube-shaped fuel tank where side = 3 m. A cube is a special cuboid where all sides are equal! Volume = 3 × 3 × 3 = 27 m³.",
    "John fills the aquarium escape pod: 1,000 cubic centimetres equals 1 litre of water! Volume measures 3D space, which gives us liquid capacity."
  ];

  return [say(texts[panelIndex] || texts[0])];
}

export function simulateStationIntro(stationIndex) {
  const stationTexts = [
    "Drag the unit cubes to fill the cargo hold completely!",
    "Look at these cuboids! Tap the cuboid with the largest volume.",
    "Fill in the missing dimension using the number pad."
  ];
  return [instruct(stationTexts[stationIndex] || stationTexts[0])];
}

export function reflectQuestionNarration() {
  return [
    think("What a mission today! Can you tell me one thing you learned about volume?")
  ];
}

export function correctNarration() {
  return [
    cheer("Excellent! That's exactly the volume! You're a Cargo Champion!")
  ];
}
