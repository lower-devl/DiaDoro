'use client';

import { useEffect, useRef } from 'react';
import { useTimerStore } from '@/store/useTimerStore';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

// Ambient sounds are loaded from /public/sounds/
// Files: coqui-ambient.mp3, waves-ambient.mp3

export function AmbientPlayer() {
  const { audioSettings, toggleCoquiAmbient, toggleWavesAmbient } = useTimerStore();
  const coquiAudioRef = useRef<HTMLAudioElement | null>(null);
  const wavesAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // In production, load actual audio files from /public/sounds/
      coquiAudioRef.current = new Audio('/sounds/coqui-ambient.mp3');
      wavesAudioRef.current = new Audio('/sounds/waves-ambient.mp3');
      
      if (coquiAudioRef.current) {
        coquiAudioRef.current.loop = true;
      }
      if (wavesAudioRef.current) {
        wavesAudioRef.current.loop = true;
      }
    }
  }, []);

  // Handle Coquí ambient
  useEffect(() => {
    if (coquiAudioRef.current) {
      coquiAudioRef.current.volume = audioSettings.ambientVolume;
      
      if (audioSettings.coquiAmbientEnabled) {
        coquiAudioRef.current.play().catch(() => {
          // Autoplay blocked
        });
      } else {
        coquiAudioRef.current.pause();
      }
    }
  }, [audioSettings.coquiAmbientEnabled, audioSettings.ambientVolume]);

  // Handle Waves ambient
  useEffect(() => {
    if (wavesAudioRef.current) {
      wavesAudioRef.current.volume = audioSettings.ambientVolume;
      
      if (audioSettings.wavesAmbientEnabled) {
        wavesAudioRef.current.play().catch(() => {
          // Autoplay blocked
        });
      } else {
        wavesAudioRef.current.pause();
      }
    }
  }, [audioSettings.wavesAmbientEnabled, audioSettings.ambientVolume]);

  const isAnyAmbientActive = audioSettings.coquiAmbientEnabled || audioSettings.wavesAmbientEnabled;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          if (isAnyAmbientActive) {
            if (audioSettings.coquiAmbientEnabled) toggleCoquiAmbient();
            if (audioSettings.wavesAmbientEnabled) toggleWavesAmbient();
          } else {
            toggleCoquiAmbient();
          }
        }}
        className={cn(
          "p-2 rounded-full transition-all duration-200",
          isAnyAmbientActive
            ? "bg-[#2E8B57]/20 text-[#2E8B57]"
            : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
        )}
        aria-label={isAnyAmbientActive ? 'Mute ambient sounds' : 'Play ambient sounds'}
        title={isAnyAmbientActive ? 'Desactivar sonidos' : 'Activar sonidos'}
      >
        {isAnyAmbientActive ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
      
      {isAnyAmbientActive && (
        <div className="flex items-center gap-1">
          {audioSettings.coquiAmbientEnabled && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#2E8B57]/10 text-[#2E8B57]">
              Coquí
            </span>
          )}
          {audioSettings.wavesAmbientEnabled && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#00A6D6]/10 text-[#00A6D6]">
              Waves
            </span>
          )}
        </div>
      )}
    </div>
  );
}
