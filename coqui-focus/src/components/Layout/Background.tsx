'use client';

import { useTheme } from '@/hooks/useTheme';

export function Background() {
  const { theme } = useTheme();
  
  const bgImage = theme === 'dark' 
    ? '/assets/bg-el-morro-night.svg'
    : '/assets/bg-el-morro-day.svg';

  return (
    <div 
      className="fixed inset-0 -z-10 bg-cover bg-center bg-fixed bg-no-repeat transition-all duration-700"
      style={{ backgroundImage: `url(${bgImage})` }}
    />
  );
}