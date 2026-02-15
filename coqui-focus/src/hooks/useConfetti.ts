'use client';

import { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useTimerStore } from '@/store/useTimerStore';

export function useConfetti() {
  const { timeLeft, mode, isRunning } = useTimerStore();

  const triggerConfetti = useCallback(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    // Puerto Rico flag colors
    const colors = ['#EF3340', '#FFFFFF', '#00A6D6'];

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: colors,
        shapes: ['circle', 'square'],
        scalar: randomInRange(0.8, 1.2)
      });
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: colors,
        shapes: ['circle', 'square'],
        scalar: randomInRange(0.8, 1.2)
      });
    }, 250);
  }, []);

  useEffect(() => {
    // Trigger confetti when timer reaches 0 and was running (session complete)
    if (timeLeft === 0 && !isRunning && mode === 'pomodoro') {
      triggerConfetti();
    }
  }, [timeLeft, isRunning, mode, triggerConfetti]);

  return { triggerConfetti };
}
