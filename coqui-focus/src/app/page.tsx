'use client';

import { useTimer } from '@/hooks/useTimer';
import { CircularProgress } from '@/components/Timer/CircularProgress';
import { DigitalDisplay } from '@/components/Timer/DigitalDisplay';
import { Controls } from '@/components/Timer/Controls';
import { TimeChips } from '@/components/Timer/TimeChips';
import { NavBar } from '@/components/Layout/NavBar';
import { Confetti } from '@/components/Effects/Confetti';

export default function Home() {
  const { isRunning, toggleTimer, handleReset } = useTimer();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#0a1929] dark:to-[#0d2137] bg-pattern transition-colors duration-300">
      <Confetti />
      <NavBar />
      
      <main className="flex flex-col items-center justify-center px-4 py-8 sm:py-12 md:py-16 lg:py-20 relative z-10">
        <div className="relative">
          {/* Circular Progress Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <CircularProgress size={320} strokeWidth={12} />
          </div>
          
          {/* Digital Display Centered */}
          <div className="relative z-10 flex flex-col items-center justify-center"
            style={{ minHeight: 320 }}>
            <DigitalDisplay />
          </div>
        </div>

        {/* Time Chips - Quick Adjust */}
        <div className="mt-6 sm:mt-8">
          <TimeChips />
        </div>

        {/* Controls */}
        <div className="mt-8 sm:mt-10">
          <Controls 
            isRunning={isRunning} 
            onToggle={toggleTimer} 
            onReset={handleReset} 
          />
        </div>

        {/* Instructions */}
        <div className="mt-12 sm:mt-16 text-center max-w-md px-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            La técnica Pomodoro: Trabaja 25 minutos, descansa 5.
            <br />
            Después de 4 pomodoros, toma un descanso largo de 15 minutos.
          </p>
        </div>
      </main>
    </div>
  );
}
