import { useCallback, useRef, useEffect } from 'react';
import { useTimerStore } from '@/store/useTimerStore';

// Data URLs for placeholder sounds (simple beep tones)
const START_SOUND = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZSA0PVanu8LdnHgU2k9n1unEiBC13yO/eizEIHWq+8+OZURE'; 
const END_SOUND = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZSA0PVanu8LdnHgU2k9n1unEiBC13yO/eizEIHWq+8+OZURE';
const BREAK_END_SOUND = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZSA0PVanu8LdnHgU2k9n1unEiBC13yO/eizEIHWq+8+OZURE';

export function useAudio() {
  const { audioSettings } = useTimerStore();
  const startAudioRef = useRef<HTMLAudioElement | null>(null);
  const endAudioRef = useRef<HTMLAudioElement | null>(null);
  const breakEndAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements
  useEffect(() => {
    if (typeof window !== 'undefined') {
      startAudioRef.current = new Audio(START_SOUND);
      endAudioRef.current = new Audio(END_SOUND);
      breakEndAudioRef.current = new Audio(BREAK_END_SOUND);
    }
  }, []);

  // Update volumes when settings change
  useEffect(() => {
    if (startAudioRef.current) {
      startAudioRef.current.volume = audioSettings.alarmVolume;
    }
    if (endAudioRef.current) {
      endAudioRef.current.volume = audioSettings.alarmVolume;
    }
    if (breakEndAudioRef.current) {
      breakEndAudioRef.current.volume = audioSettings.alarmVolume;
    }
  }, [audioSettings.alarmVolume]);

  const playStart = useCallback(() => {
    if (startAudioRef.current) {
      startAudioRef.current.currentTime = 0;
      startAudioRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }, []);

  const playEnd = useCallback(() => {
    if (endAudioRef.current) {
      endAudioRef.current.currentTime = 0;
      endAudioRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }, []);

  const playBreakEnd = useCallback(() => {
    if (breakEndAudioRef.current) {
      breakEndAudioRef.current.currentTime = 0;
      breakEndAudioRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }, []);

  return {
    playStart,
    playEnd,
    playBreakEnd,
  };
}
