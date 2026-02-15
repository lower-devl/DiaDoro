'use client';

import { Volume2, Volume1, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VolumeSliderProps {
  label: string;
  description?: string;
  value: number;
  onChange: (value: number) => void;
}

export function VolumeSlider({ label, description, value, onChange }: VolumeSliderProps) {
  const getVolumeIcon = () => {
    if (value === 0) return <VolumeX className="w-5 h-5 text-gray-400" />;
    if (value < 0.5) return <Volume1 className="w-5 h-5 text-[#00A6D6]" />;
    return <Volume2 className="w-5 h-5 text-[#00A6D6]" />;
  };

  const percentage = Math.round(value * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {getVolumeIcon()}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12 text-right">
            {percentage}%
          </span>
        </div>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={cn(
            "w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer",
            "accent-[#00A6D6]",
            "focus:outline-none focus:ring-2 focus:ring-[#00A6D6]/50"
          )}
        />
        <div className="flex justify-between mt-1 text-xs text-gray-400">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
