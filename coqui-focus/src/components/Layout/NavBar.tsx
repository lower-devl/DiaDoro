'use client';

import { useState } from 'react';
import { Heart, Settings } from 'lucide-react';
import { ThemeToggle } from '@/components/Theme/ThemeToggle';
import { SettingsModal } from '@/components/Settings/SettingsModal';
import { AmbientPlayer } from '@/components/Audio/AmbientPlayer';

export function NavBar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <nav className="w-full px-4 sm:px-6 py-4 bg-white dark:bg-[#0a1929] border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#EF3340] to-[#00A6D6] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-base sm:text-lg">C</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              Coquí Focus
            </h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <AmbientPlayer />
            
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Open settings"
              title="Ajustes"
            >
              <Settings className="w-5 h-5" />
            </button>
            
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Hecho con</span>
              <Heart className="w-4 h-4 text-[#EF3340] fill-[#EF3340]" />
              <span>en Puerto Rico</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
}
