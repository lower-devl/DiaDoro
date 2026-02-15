'use client';

import { useTimerStore, TimerMode } from '@/store/useTimerStore';
import { cn } from '@/lib/utils';

const MODE_LABELS: Record<TimerMode, string> = {
  pomodoro: 'Trabajando',
  shortBreak: 'Descanso Corto',
  longBreak: 'Descanso Largo',
};

const MODE_COLORS: Record<TimerMode, string> = {
  pomodoro: 'text-[#EF3340]',
  shortBreak: 'text-[#2E8B57]',
  longBreak: 'text-[#2E8B57]',
};

export function DigitalDisplay() {
  const { timeLeft, mode } = useTimerStore();
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs sm:text-sm font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
        {MODE_LABELS[mode]}
      </div>
      <div 
        className={cn(
          "font-bold tabular-nums tracking-tight transition-colors duration-300 timer-display",
          MODE_COLORS[mode]
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        <span>{formattedMinutes}</span>
        <span className="animate-pulse">:</span>
        <span>{formattedSeconds}</span>
      </div>
    </div>
  );
}
