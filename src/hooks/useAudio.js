import { useCallback } from 'react';
import { audioMap } from '../utils/audioMap.js';

let currentAudioInstance = null;
let activeSessionId = 0;

/**
 * Stop any currently playing audio immediately and cancel active playback queues.
 */
export function stopAudio() {
  activeSessionId++;
  if (currentAudioInstance) {
    currentAudioInstance.pause();
    currentAudioInstance.currentTime = 0;
    currentAudioInstance = null;
  }
}

/**
 * Resolve the MP3 URL for a given narration text.
 * Returns the static path from audioMap, or null if not found.
 */
function resolveAudioUrl(text) {
  return audioMap[text] || null;
}

/**
 * useAudio hook — provides speakQueue(segments, enabled)
 */
export function useAudio() {
  const speakQueue = useCallback(async (segments, enabled = true) => {
    // Stop previous audio and invalidate previous queue loops
    stopAudio();

    if (!enabled || !segments || segments.length === 0) {
      return;
    }

    const thisSessionId = activeSessionId;

    for (let i = 0; i < segments.length; i++) {
      if (activeSessionId !== thisSessionId) break;

      const { text } = segments[i];
      const url = resolveAudioUrl(text);

      if (!url) {
        console.warn(`[useAudio] No audio mapped for: "${text.slice(0, 60)}..."`);
        continue;
      }

      await new Promise((resolve) => {
        if (activeSessionId !== thisSessionId) {
          resolve();
          return;
        }

        const audio = new Audio(url);
        currentAudioInstance = audio;

        audio.onended = () => resolve();
        audio.onerror = (e) => {
          console.warn(`[useAudio] Failed to play: ${url}`, e);
          resolve();
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => resolve());
        }
      });

      if (activeSessionId !== thisSessionId) break;
    }
  }, []);

  const stop = useCallback(() => {
    stopAudio();
  }, []);

  return { speakQueue, stopAudio: stop };
}

