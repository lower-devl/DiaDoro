'use client';

import { Plus, Minus } from 'lucide-react';
import { useTimerStore } from '@/store/useTimerStore';
import { cn } from '@/lib/utils';

interface TimeChipProps {
  amount: number;
  onClick: () => void;
  variant: 'add' | 'subtract';
}

function TimeChip({ amount, onClick, variant }: TimeChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium",
        "transition-all duration-200 active:scale-95",
        "min-h-[44px] touch-manipulation",
        variant === 'add'
          ? "bg-[#2E8B57]/10 text-[#2E8B57] hover:bg-[#2E8B57]/20 dark:bg-[#2E8B57]/20 dark:text-[#4ade80] dark:hover:bg-[#2E8B57]/30"
          : "bg-[#EF3340]/10 text-[#EF3340] hover:bg-[#EF3340]/20 dark:bg-[#EF3340]/20 dark:text-[#f87171] dark:hover:bg-[#EF3340]/30"
      )}
      aria-label={variant === 'add' ? `Add ${amount} minutes` : `Subtract ${amount} minutes`}
    >
      {variant === 'add' ? (
        <Plus className="w-3.5 h-3.5" />
      ) : (
        <Minus className="w-3.5 h-3.5" />
      )}
      <span>{amount}m</span>
    </button>
  );
}

export function TimeChips() {
  const { timeLeft, setTimeLeft, duration, setDuration } = useTimerStore();

  const adjustTime = (seconds: number) => {
    const newTimeLeft = Math.max(0, timeLeft + seconds);
    const newDuration = Math.max(60, duration + seconds);
    setTimeLeft(newTimeLeft);
    setDuration(newDuration);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Quick Adjust
        </span>
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <TimeChip amount={5} variant="subtract" onClick={() => adjustTime(-5 * 60)} />
        <TimeChip amount={1} variant="subtract" onClick={() => adjustTime(-1 * 60)} />
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />
        <TimeChip amount={1} variant="add" onClick={() => adjustTime(1 * 60)} />
        <TimeChip amount={5} variant="add" onClick={() => adjustTime(5 * 60)} />
      </div>
    </div>
  );
}
