'use client';

import { X, Volume2, Clock, Zap } from 'lucide-react';
import { useTimerStore, TimerMode } from '@/store/useTimerStore';
import { cn } from '@/lib/utils';
import { TimeInput } from './TimeInput';
import { VolumeSlider } from './VolumeSlider';
import { ToggleSwitch } from './ToggleSwitch';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MODE_LABELS: Record<TimerMode, { label: string; spanglish: string }> = {
  pomodoro: { label: 'Pomodoro', spanglish: 'Trabajo' },
  shortBreak: { label: 'Short Break', spanglish: 'Descanso Corto' },
  longBreak: { label: 'Long Break', spanglish: 'Descanso Largo' },
};

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const {
    autoStartBreaks,
    autoStartPomodoro,
    customDurations,
    audioSettings,
    setAutoStartBreaks,
    setAutoStartPomodoro,
    setCustomDuration,
    setAlarmVolume,
    setAmbientVolume,
    toggleCoquiAmbient,
    toggleWavesAmbient,
  } = useTimerStore();

  if (!isOpen) return null;

  const handleDurationChange = (mode: TimerMode, minutes: number) => {
    const clampedMinutes = Math.max(1, Math.min(120, minutes));
    setCustomDuration(mode, clampedMinutes * 60);
  };

  const totalWorkTime = Math.round((customDurations.pomodoro / 60) * 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#EF3340]/10">
              <Clock className="w-5 h-5 text-[#EF3340]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Ajustes
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Auto-Switch Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-[#00A6D6]" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                Auto-Switch
              </h3>
            </div>
            <div className="space-y-3">
              <ToggleSwitch
                label="Auto-start breaks"
                description="Start break automatically when work ends"
                checked={autoStartBreaks}
                onChange={setAutoStartBreaks}
              />
              <ToggleSwitch
                label="Auto-start pomodoros"
                description="Start work automatically when break ends"
                checked={autoStartPomodoro}
                onChange={setAutoStartPomodoro}
              />
            </div>
            {(autoStartBreaks || autoStartPomodoro) && (
              <div className="mt-3 p-3 rounded-lg bg-[#00A6D6]/10 border border-[#00A6D6]/20">
                <p className="text-sm text-[#00A6D6]">
                  Modo &quot;Auto&quot; activado - ¡Puedes dejar la app corriendo por horas!
                </p>
              </div>
            )}
          </section>

          {/* Timer Durations Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-[#EF3340]" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                Timer Durations
              </h3>
            </div>
            <div className="space-y-4">
              {(Object.keys(MODE_LABELS) as TimerMode[]).map((mode) => (
                <TimeInput
                  key={mode}
                  label={MODE_LABELS[mode].label}
                  spanglish={MODE_LABELS[mode].spanglish}
                  value={Math.round(customDurations[mode] / 60)}
                  onChange={(value) => handleDurationChange(mode, value)}
                />
              ))}
            </div>
            
            {/* Flow State Slider */}
            <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Flow State
                </span>
                <span className="text-xs text-gray-500">
                  {Math.round(customDurations.pomodoro / 60)} min × 4 = {totalWorkTime} min
                </span>
              </div>
              <input
                type="range"
                min="25"
                max="50"
                step="5"
                value={Math.round(customDurations.pomodoro / 60)}
                onChange={(e) => handleDurationChange('pomodoro', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#EF3340]"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>25m</span>
                <span className="text-[#00A6D6] font-medium">Fluid transition</span>
                <span>50m</span>
              </div>
            </div>
          </section>

          {/* Audio Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Volume2 className="w-4 h-4 text-[#2E8B57]" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                Audio
              </h3>
            </div>
            
            <div className="space-y-6">
              <VolumeSlider
                label="Alarm Volume"
                description="Session start/end sounds"
                value={audioSettings.alarmVolume}
                onChange={setAlarmVolume}
              />
              
              <VolumeSlider
                label="Ambient Volume"
                description="Background nature sounds"
                value={audioSettings.ambientVolume}
                onChange={setAmbientVolume}
              />
              
              <div className="space-y-3 pt-2">
                <ToggleSwitch
                  label="El Yunque at Night"
                  description="Coquí chirping ambient sound"
                  checked={audioSettings.coquiAmbientEnabled}
                  onChange={toggleCoquiAmbient}
                />
                <ToggleSwitch
                  label="Luquillo Waves"
                  description="Ocean waves ambient sound"
                  checked={audioSettings.wavesAmbientEnabled}
                  onChange={toggleWavesAmbient}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
          <button
            onClick={onClose}
            className={cn(
              "w-full py-3 px-4 rounded-xl font-semibold text-white",
              "bg-[#00A6D6] hover:bg-[#0085ab]",
              "transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-[#00A6D6] focus:ring-offset-2"
            )}
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
}
