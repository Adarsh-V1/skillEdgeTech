'use client'
import { useEffect, useState, useRef } from 'react';

export function useThrottledScroll(delay = 60) {
  const [progress, setProgress] = useState(0);
  const last = useRef(0);
  useEffect(() => {
    function update() {
      const now = performance.now();
      if (now - last.current < delay) return;
      last.current = now;
      const scrolled = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? scrolled / height : 0);
    }
    const onScroll = () => requestAnimationFrame(update);
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, [delay]);
  return progress;
}
