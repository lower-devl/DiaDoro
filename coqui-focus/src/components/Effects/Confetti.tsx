'use client';

import { useConfetti } from '@/hooks/useConfetti';

export function Confetti() {
  // This component just initializes the confetti hook
  useConfetti();
  return null;
}
