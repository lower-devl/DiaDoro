'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className={cn(
          "p-2.5 rounded-full transition-all duration-200",
          "bg-gray-100 dark:bg-gray-800",
          "min-h-[44px] min-w-[44px]"
        )}
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2.5 rounded-full transition-all duration-200",
        "bg-gray-100 dark:bg-gray-800",
        "hover:bg-gray-200 dark:hover:bg-gray-700",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A6D6]",
        "active:scale-95",
        "min-h-[44px] min-w-[44px] touch-manipulation"
      )}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      title={theme === 'light' ? 'Modo Noche' : 'Modo Día'}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      ) : (
        <Sun className="w-5 h-5 text-[#00d4aa]" />
      )}
    </button>
  );
}
