'use client';

import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimeInputProps {
  label: string;
  spanglish: string;
  value: number;
  onChange: (value: number) => void;
}

export function TimeInput({ label, spanglish, value, onChange }: TimeInputProps) {
  const adjustTime = (delta: number) => {
    onChange(value + delta);
  };

  return (
    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
          <span className="ml-2 text-xs text-gray-500">({spanglish})</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            className={cn(
              "w-16 px-2 py-1 text-center text-lg font-semibold rounded-lg",
              "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600",
              "text-gray-900 dark:text-white",
              "focus:outline-none focus:ring-2 focus:ring-offset-1",
              "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            )}

            min="1"
            max="120"
          />
          <span className="text-sm text-gray-500">min</span>
        </div>
      </div>

      {/* Smart Time Chips */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => adjustTime(-5)}
          disabled={value <= 5}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
            "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600",
            "text-gray-700 dark:text-gray-300",
            "hover:bg-gray-100 dark:hover:bg-gray-600",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <Minus className="w-3 h-3" />
          5m
        </button>
        
        <button
          onClick={() => adjustTime(-1)}
          disabled={value <= 1}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
            "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600",
            "text-gray-700 dark:text-gray-300",
            "hover:bg-gray-100 dark:hover:bg-gray-600",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <Minus className="w-3 h-3" />
          1m
        </button>

        <div className="flex-1" />

        <button
          onClick={() => adjustTime(1)}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
            "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600",
            "text-gray-700 dark:text-gray-300",
            "hover:bg-gray-100 dark:hover:bg-gray-600"
          )}
        >
          <Plus className="w-3 h-3" />
          1m
        </button>
        
        <button
          onClick={() => adjustTime(5)}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
            "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600",
            "text-gray-700 dark:text-gray-300",
            "hover:bg-gray-100 dark:hover:bg-gray-600"
          )}
        >
          <Plus className="w-3 h-3" />
          5m
        </button>
      </div>
    </div>
  );
}
