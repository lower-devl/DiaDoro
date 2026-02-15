import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

export interface CustomDurations {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}

export interface AudioSettings {
  alarmVolume: number;
  ambientVolume: number;
  coquiAmbientEnabled: boolean;
  wavesAmbientEnabled: boolean;
}

interface TimerState {
  mode: TimerMode;
  timeLeft: number;
  duration: number;
  isRunning: boolean;
  pomodorosCompleted: number;
  
  // Auto-switch settings
  autoStartBreaks: boolean;
  autoStartPomodoro: boolean;
  
  // Custom durations
  customDurations: CustomDurations;
  
  // Audio settings
  audioSettings: AudioSettings;
  
  // Actions
  setMode: (mode: TimerMode) => void;
  setTimeLeft: (time: number) => void;
  setDuration: (duration: number) => void;
  setIsRunning: (isRunning: boolean) => void;
  resetTimer: () => void;
  completeTimer: () => void;
  
  // Auto-switch actions
  setAutoStartBreaks: (value: boolean) => void;
  setAutoStartPomodoro: (value: boolean) => void;
  
  // Duration actions
  setCustomDuration: (mode: TimerMode, duration: number) => void;
  
  // Audio actions
  setAlarmVolume: (volume: number) => void;
  setAmbientVolume: (volume: number) => void;
  toggleCoquiAmbient: () => void;
  toggleWavesAmbient: () => void;
}

const DEFAULT_DURATIONS: CustomDurations = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  alarmVolume: 0.7,
  ambientVolume: 0.3,
  coquiAmbientEnabled: false,
  wavesAmbientEnabled: false,
};

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      mode: 'pomodoro',
      timeLeft: DEFAULT_DURATIONS.pomodoro,
      duration: DEFAULT_DURATIONS.pomodoro,
      isRunning: false,
      pomodorosCompleted: 0,
      
      autoStartBreaks: false,
      autoStartPomodoro: false,
      
      customDurations: { ...DEFAULT_DURATIONS },
      audioSettings: { ...DEFAULT_AUDIO_SETTINGS },
      
      setMode: (mode) => {
        const duration = get().customDurations[mode];
        set({ 
          mode, 
          timeLeft: duration,
          duration,
          isRunning: false 
        });
      },
      
      setTimeLeft: (timeLeft) => set({ timeLeft }),
      
      setDuration: (duration) => set({ duration }),
      
      setIsRunning: (isRunning) => set({ isRunning }),
      
      resetTimer: () => set((state) => ({ 
        timeLeft: state.duration,
        isRunning: false 
      })),
      
      completeTimer: () => set((state) => {
        const wasPomodoro = state.mode === 'pomodoro';
        const pomodorosCompleted = wasPomodoro 
          ? state.pomodorosCompleted + 1 
          : state.pomodorosCompleted;
        
        return {
          isRunning: false,
          pomodorosCompleted,
        };
      }),
      
      setAutoStartBreaks: (autoStartBreaks) => set({ autoStartBreaks }),
      
      setAutoStartPomodoro: (autoStartPomodoro) => set({ autoStartPomodoro }),
      
      setCustomDuration: (mode, duration) => set((state) => ({
        customDurations: {
          ...state.customDurations,
          [mode]: duration,
        },
        ...(state.mode === mode && {
          duration,
          timeLeft: duration,
        }),
      })),
      
      setAlarmVolume: (alarmVolume) => set((state) => ({
        audioSettings: { ...state.audioSettings, alarmVolume },
      })),
      
      setAmbientVolume: (ambientVolume) => set((state) => ({
        audioSettings: { ...state.audioSettings, ambientVolume },
      })),
      
      toggleCoquiAmbient: () => set((state) => ({
        audioSettings: { 
          ...state.audioSettings, 
          coquiAmbientEnabled: !state.audioSettings.coquiAmbientEnabled 
        },
      })),
      
      toggleWavesAmbient: () => set((state) => ({
        audioSettings: { 
          ...state.audioSettings, 
          wavesAmbientEnabled: !state.audioSettings.wavesAmbientEnabled 
        },
      })),
    }),
    {
      name: 'coqui-focus-storage',
      partialize: (state) => ({
        autoStartBreaks: state.autoStartBreaks,
        autoStartPomodoro: state.autoStartPomodoro,
        customDurations: state.customDurations,
        audioSettings: state.audioSettings,
        pomodorosCompleted: state.pomodorosCompleted,
      }),
    }
  )
);

export { DEFAULT_DURATIONS, DEFAULT_AUDIO_SETTINGS };
