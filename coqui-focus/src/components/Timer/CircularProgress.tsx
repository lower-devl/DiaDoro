'use client';

import { useTimerStore, TimerMode } from '@/store/useTimerStore';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  size?: number;
  strokeWidth?: number;
}

const MODE_COLORS: Record<TimerMode, { primary: string; secondary: string }> = {
  pomodoro: { primary: '#EF3340', secondary: '#00A6D6' },
  shortBreak: { primary: '#2E8B57', secondary: '#00A6D6' },
  longBreak: { primary: '#2E8B57', secondary: '#00A6D6' },
};

export function CircularProgress({ size = 320, strokeWidth = 12 }: CircularProgressProps) {
  const { timeLeft, duration, mode } = useTimerStore();
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = duration > 0 ? (duration - timeLeft) / duration : 0;
  const strokeDashoffset = circumference - progress * circumference;
  
  const colors = MODE_COLORS[mode];

  // Responsive size
  const responsiveSize = typeof window !== 'undefined' && window.innerWidth < 640 
    ? Math.min(size, 280) 
    : size;
  const responsiveStrokeWidth = typeof window !== 'undefined' && window.innerWidth < 640
    ? Math.min(strokeWidth, 10)
    : strokeWidth;
  const responsiveRadius = (responsiveSize - responsiveStrokeWidth) / 2;
  const responsiveCircumference = responsiveRadius * 2 * Math.PI;
  const responsiveStrokeDashoffset = responsiveCircumference - progress * responsiveCircumference;

  return (
    <div className="relative" style={{ width: responsiveSize, height: responsiveSize }}>
      <svg
        width={responsiveSize}
        height={responsiveSize}
        className="transform -rotate-90"
        aria-label="Timer progress"
      >
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.secondary} />
          </linearGradient>
        </defs>
        
        {/* Background ring */}
        <circle
          cx={responsiveSize / 2}
          cy={responsiveSize / 2}
          r={responsiveRadius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={responsiveStrokeWidth}
          className="dark:stroke-gray-700"
        />
        
        {/* Progress ring */}
        <circle
          cx={responsiveSize / 2}
          cy={responsiveSize / 2}
          r={responsiveRadius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={responsiveStrokeWidth}
          strokeLinecap="round"
          strokeDasharray={responsiveCircumference}
          strokeDashoffset={responsiveStrokeDashoffset}
          className={cn(
            "transition-all duration-1000 ease-linear",
            progress > 0 && "drop-shadow-lg"
          )}
        />
      </svg>
    </div>
  );
}
