import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { audioMap } from '../src/utils/audioMap.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const audioDir = path.join(__dirname, '../public/assets/audio');
if (fs.existsSync(audioDir)) {
  const activeFiles = new Set(Object.values(audioMap).map((p) => path.basename(p)));
  const files = fs.readdirSync(audioDir);

  let cleanedCount = 0;
  files.forEach((file) => {
    if (!activeFiles.has(file)) {
      fs.unlinkSync(path.join(audioDir, file));
      cleanedCount++;
    }
  });

  console.log(`Cleaned ${cleanedCount} orphaned audio files.`);
}
