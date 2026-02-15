'use client';

import { Play, Pause, RotateCcw, SkipForward, Zap, Volume2 } from 'lucide-react';
import { useTimerStore, TimerMode } from '@/store/useTimerStore';
import { cn } from '@/lib/utils';

interface ControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
}

const MODES: { id: TimerMode; label: string; spanglish: string }[] = [
  { id: 'pomodoro', label: 'Work', spanglish: 'Trabajo' },
  { id: 'shortBreak', label: 'Short Break', spanglish: 'Descanso Corto' },
  { id: 'longBreak', label: 'Long Break', spanglish: 'Descanso Largo' },
];

export function Controls({ isRunning, onToggle, onReset }: ControlsProps) {
  const { 
    mode, 
    setMode,
    autoStartBreaks,
    autoStartPomodoro,
  } = useTimerStore();

  const isAutoMode = autoStartBreaks || autoStartPomodoro;

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6">
      {/* Auto-Switch Indicators */}
      {isAutoMode && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00A6D6]/10 border border-[#00A6D6]/20">
          <Zap className="w-4 h-4 text-[#00A6D6]" />
          <span className="text-sm text-[#00A6D6] font-medium">
            Auto: {autoStartBreaks && autoStartPomodoro ? 'Full' : autoStartBreaks ? 'Breaks' : 'Work'}
          </span>
        </div>
      )}

      {/* Mode Switcher */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 p-1.5 bg-gray-100 dark:bg-gray-800/50 rounded-full">
        {MODES.map(({ id, label, spanglish }) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            className={cn(
              "px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200",
              "min-h-[44px] touch-manipulation btn-interactive",
              mode === id
                ? id === 'pomodoro'
                  ? "bg-[#EF3340] text-white shadow-lg"
                  : "bg-[#2E8B57] text-white shadow-lg"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
            aria-pressed={mode === id}
            title={label}
          >
            <span className="hidden sm:inline">{spanglish}</span>
            <span className="sm:hidden">{label}</span>
          </button>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onReset}
          className={cn(
            "p-3 sm:p-4 rounded-full transition-all duration-200 btn-interactive",
            "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
            "hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400",
            "min-h-[48px] min-w-[48px] touch-manipulation"
          )}
          aria-label="Reset timer"
          title="Reiniciar"
        >
          <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={onToggle}
          className={cn(
            "px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-200",
            "flex items-center gap-2 sm:gap-3 btn-interactive",
            "min-h-[56px] touch-manipulation",
            isRunning
              ? "bg-[#00A6D6] hover:bg-[#0085ab] text-white shadow-lg hover:shadow-xl"
              : mode === 'pomodoro'
                ? "bg-[#EF3340] hover:bg-[#d62d38] text-white shadow-lg hover:shadow-xl"
                : "bg-[#2E8B57] hover:bg-[#267349] text-white shadow-lg hover:shadow-xl",
            "focus:outline-none focus:ring-4 focus:ring-offset-2",
            isRunning ? "focus:ring-[#00A6D6]" : mode === 'pomodoro' ? "focus:ring-[#EF3340]" : "focus:ring-[#2E8B57]"
          )}
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden sm:inline">Espérate</span>
              <span className="sm:hidden">Pausa</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden sm:inline">¡Dale!</span>
              <span className="sm:hidden">Iniciar</span>
            </>
          )}
        </button>

        <button
          onClick={() => {
            const currentIndex = MODES.findIndex(m => m.id === mode);
            const nextIndex = (currentIndex + 1) % MODES.length;
            setMode(MODES[nextIndex].id);
          }}
          className={cn(
            "p-3 sm:p-4 rounded-full transition-all duration-200 btn-interactive",
            "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
            "hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400",
            "min-h-[48px] min-w-[48px] touch-manipulation"
          )}
          aria-label="Skip to next mode"
          title="Saltar"
        >
          <SkipForward className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Audio Indicator */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Volume2 className="w-4 h-4" />
        <span>Sonidos activados</span>
      </div>
    </div>
  );
}
