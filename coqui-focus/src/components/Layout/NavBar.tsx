'use client';

import { useState } from 'react';
import { Heart, Settings } from 'lucide-react';
import Image from 'next/image';
import { ThemeToggle } from '@/components/Theme/ThemeToggle';
import { SettingsModal } from '@/components/Settings/SettingsModal';
import { AmbientPlayer } from '@/components/Audio/AmbientPlayer';

export function NavBar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  return (
    <>
      <nav className="w-full px-4 sm:px-6 py-4 bg-white dark:bg-[#0a1929] border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Taino Coqui Logo */}
            <button 
              onClick={() => setShowEasterEgg(true)}
              className="w-8 h-8 sm:w-10 sm:h-10 relative hover:scale-110 transition-transform"
              title="Click for surprise!"
            >
              <Image
                src="/assets/taino-coqui.svg"
                alt="Coquí"
                fill
                className="object-contain"
              />
            </button>
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

      {/* Bad Bunny Easter Egg Modal */}
      {showEasterEgg && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowEasterEgg(false)}
        >
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl max-w-sm mx-4 text-center">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <Image
                src="/assets/bad-bunny-easter-egg.svg"
                alt="Bad Bunny Easter Egg"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              ¡Safaera!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You found the Bad Bunny easter egg! 🐰
            </p>
            <button
              onClick={() => setShowEasterEgg(false)}
              className="px-4 py-2 bg-[#EF3340] text-white rounded-full hover:bg-[#d62d3a] transition-colors"
            >
              ¡Dale!
            </button>
          </div>
        </div>
      )}

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
}
