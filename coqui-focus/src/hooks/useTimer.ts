import { useEffect, useCallback, useRef } from 'react';
import { useTimerStore, TimerMode } from '@/store/useTimerStore';
import { useAudio } from './useAudio';

export function useTimer() {
  const { 
    timeLeft, 
    isRunning, 
    mode, 
    pomodorosCompleted,
    autoStartBreaks,
    autoStartPomodoro,
    customDurations,
    setTimeLeft, 
    setIsRunning, 
    resetTimer,
    setMode,
    completeTimer,
  } = useTimerStore();
  
  const { playStart, playEnd, playBreakEnd } = useAudio();
  const hasAutoSwitched = useRef(false);

  const tick = useCallback(() => {
    setTimeLeft(Math.max(0, timeLeft - 1));
  }, [timeLeft, setTimeLeft]);

  // Handle timer completion with auto-switch logic
  const handleTimerComplete = useCallback(() => {
    const wasPomodoro = mode === 'pomodoro';
    const nextPomodoroCount = wasPomodoro ? pomodorosCompleted + 1 : pomodorosCompleted;
    
    if (wasPomodoro) {
      playEnd();
      
      if (autoStartBreaks) {
        // Determine break type
        const shouldTakeLongBreak = nextPomodoroCount % 4 === 0;
        const nextMode: TimerMode = shouldTakeLongBreak ? 'longBreak' : 'shortBreak';
        
        setTimeout(() => {
          setMode(nextMode);
          setIsRunning(true);
        }, 1000);
      }
    } else {
      // Break ended
      playBreakEnd();
      
      if (autoStartPomodoro) {
        setTimeout(() => {
          setMode('pomodoro');
          setIsRunning(true);
        }, 1000);
      }
    }
  }, [mode, pomodorosCompleted, autoStartBreaks, autoStartPomodoro, setMode, setIsRunning, playEnd, playBreakEnd]);

  // Main timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(tick, 1000);
      hasAutoSwitched.current = false;
    } else if (timeLeft === 0 && !hasAutoSwitched.current) {
      hasAutoSwitched.current = true;
      completeTimer();
      handleTimerComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, tick, completeTimer, handleTimerComplete]);

  // Update document title
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const modeLabels: Record<TimerMode, string> = {
      pomodoro: 'Working...',
      shortBreak: 'Short Break',
      longBreak: 'Long Break',
    };

    document.title = `(${timeString}) ${modeLabels[mode]}`;
  }, [timeLeft, mode]);

  const toggleTimer = useCallback(() => {
    if (!isRunning) {
      playStart();
    }
    setIsRunning(!isRunning);
  }, [isRunning, setIsRunning, playStart]);

  const handleReset = useCallback(() => {
    resetTimer();
    hasAutoSwitched.current = false;
  }, [resetTimer]);

  const skipToNext = useCallback(() => {
    const modes: TimerMode[] = ['pomodoro', 'shortBreak', 'longBreak'];
    const currentIndex = modes.indexOf(mode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setMode(modes[nextIndex]);
    hasAutoSwitched.current = false;
  }, [mode, setMode]);

  return {
    timeLeft,
    isRunning,
    mode,
    pomodorosCompleted,
    autoStartBreaks,
    autoStartPomodoro,
    customDurations,
    toggleTimer,
    handleReset,
    skipToNext,
    setMode,
  };
}
