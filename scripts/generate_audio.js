import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Config ────────────────────────────────────────────────────────────────────
const API_KEY   = 'sk_7ef27dccb32144843f8ee5068dfd4223a85326c56c14b00a';
const VOICE_ID  = 'EXAVITQu4vr4xnSDxMaL'; // "Sarah" – bright, child-friendly
const MODEL_ID  = 'eleven_multilingual_v2';
const OUT_DIR   = path.join(__dirname, '../public/assets/audio');
// ─────────────────────────────────────────────────────────────────────────────

// EXACT text matching audioMap.js keys → output filenames
// (special chars like × and m³ are passed as-is; ElevenLabs handles them)
const AUDIO_LINES = [
  { text: "Welcome to Volume of Cuboids! Today we are going to master Volume!", file: 'audio_welcome.mp3' },
  { text: "Mike has two boxes. One is flat and wide. The other is tall and narrow.", file: 'audio_wonder_1.mp3' },
  { text: "Which one can actually hold more toy blocks inside?", file: 'audio_wonder_2.mp3' },
  { text: "Let us find out what volume really means!", file: 'audio_wonder_3.mp3' },
  { text: "Sarah, John, and Mike run a small space cargo delivery company. Their spaceship has a cuboid-shaped cargo hold ready to pack!", file: 'audio_story_panel_0.mp3' },
  { text: "The cargo hold is 4 metres long, 3 metres wide, and 2 metres tall. To know how much cargo it can carry, we need to find its VOLUME.", file: 'audio_story_panel_1.mp3' },
  { text: "One bottom layer has 4 times 3 equals 12 unit cubes. Since it is 2 metres tall, there are 2 layers. 12 times 2 equals 24 cubes in total!", file: 'audio_story_panel_2.mp3' },
  { text: "So Volume equals length times width times height. That is 4 times 3 times 2, which gives us 24 cubic metres! Now we can calculate the volume of any cuboid instantly.", file: 'audio_story_panel_3.mp3' },
  { text: "Sarah checks a cube-shaped fuel tank where every side equals 3 metres. A cube is a special cuboid where all sides are equal! Volume equals 3 times 3 times 3, that is 27 cubic metres.", file: 'audio_story_panel_4.mp3' },
  { text: "John fills the aquarium escape pod: 1,000 cubic centimetres equals 1 litre of water! Volume measures 3D space, which gives us liquid capacity.", file: 'audio_story_panel_5.mp3' },
  { text: "Drag the unit cubes to fill the cargo hold completely!", file: 'audio_sim_station_a.mp3' },
  { text: "Look at these cuboids! Tap the cuboid with the largest volume.", file: 'audio_sim_station_b.mp3' },
  { text: "Fill in the missing dimension using the number pad.", file: 'audio_sim_station_c.mp3' },
  { text: "What a mission today! Can you tell me one thing you learned about volume?", file: 'audio_reflect_prompt.mp3' },
  { text: "Excellent! That is exactly the volume! You are a Cargo Champion!", file: 'audio_correct.mp3' },
];

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log(`📁 Created output directory: ${OUT_DIR}`);
}

function generateOne(text, filename, force = false) {
  return new Promise((resolve, reject) => {
    const outPath = path.join(OUT_DIR, filename);

    if (!force && fs.existsSync(outPath)) {
      console.log(`  ⏭  Skipping (exists): ${filename}`);
      return resolve('skipped');
    }

    const body = JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: { stability: 0.55, similarity_boost: 0.8, style: 0.2, use_speaker_boost: true },
    });

    const options = {
      hostname: 'api.elevenlabs.io',
      path: `/v1/text-to-speech/${VOICE_ID}`,
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Accept': 'audio/mpeg',
      },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let errData = '';
        res.on('data', (d) => (errData += d));
        res.on('end', () => reject(new Error(`HTTP ${res.statusCode} → ${errData.slice(0, 200)}`)));
        return;
      }
      const ws = fs.createWriteStream(outPath);
      res.pipe(ws);
      ws.on('finish', () => { console.log(`  ✅  Saved: ${filename}`); resolve('ok'); });
      ws.on('error', reject);
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  const FORCE_REGEN = new Set(AUDIO_LINES.map(a => a.file));

  console.log('\n🚀  CargoQuest Audio Generation — ElevenLabs TTS');
  console.log(`📂  Output: ${OUT_DIR}`);
  console.log(`🎙  Voice : ${VOICE_ID}  |  Model: ${MODEL_ID}`);
  console.log(`📋  Lines : ${AUDIO_LINES.length}\n`);

  let ok = 0, skip = 0, fail = 0;

  for (let i = 0; i < AUDIO_LINES.length; i++) {
    const { text, file } = AUDIO_LINES[i];
    const force = FORCE_REGEN.has(file);
    if (force) console.log(`[${String(i + 1).padStart(2, '0')}/${AUDIO_LINES.length}] ${file} [REGEN]`);
    else       console.log(`[${String(i + 1).padStart(2, '0')}/${AUDIO_LINES.length}] ${file}`);

    try {
      const result = await generateOne(text, file, force);
      result === 'skipped' ? skip++ : ok++;
    } catch (err) {
      console.error(`  ❌  Failed: ${file} — ${err.message}`);
      fail++;
    }

    if (i < AUDIO_LINES.length - 1) await new Promise(r => setTimeout(r, 800));
  }

  console.log(`\n────────────────────────────────────`);
  console.log(`✅ Generated : ${ok}`);
  console.log(`⏭  Skipped  : ${skip}`);
  console.log(fail > 0 ? `❌ Failed   : ${fail}` : `🎉 All done!`);
  console.log(`────────────────────────────────────\n`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
