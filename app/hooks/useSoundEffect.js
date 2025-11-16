import { useCallback } from "react";

const audioCache = {};

function getAudio(src) {
  if (!audioCache[src]) {
    const audio = new Audio(src);
    audio.preload = "auto";
    audioCache[src] = audio;
  }
  return audioCache[src];
}

export function useSoundEffect() {
  const playClick = useCallback(() => {
    try {
      const audio = getAudio("/assets/sounds/click_sound.wav");
      audio.currentTime = 0;
      const p = audio.play();
      if (p && typeof p.then === "function") {
        p.catch(() => {/* ignore autoplay block to keep UI smooth */});
      }
    } catch (_) { /* no-op */ }
  }, []);
  return { playClick };
}
