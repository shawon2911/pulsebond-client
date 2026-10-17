// components/BloodLoader.jsx
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function BloodLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 3.5 Seconds (3500ms) por custom transition layer fade out shuru hobe
    const durationTimer = setTimeout(() => {
      setFadeOut(true);
      
      // Animation end houar por dom element page theke purofuri remove hobe
      const removeTimer = setTimeout(() => {
        setLoading(false);
      }, 500); // 500ms css duration matches duration-500 class

      return () => clearTimeout(removeTimer);
    }, 2500); 

    return () => clearTimeout(durationTimer);
  }, []);

  if (!loading) return null;

  return (
    <div 
      className={`fixed inset-0 bg-[#0d0d0d] z-50 flex flex-col justify-center items-center select-none transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        
        {/* Blood Drop Logo Layout Container */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Background Glow Effect */}
          <div className="absolute w-20 h-20 bg-crimson rounded-full blur-xl opacity-30 animate-pulse"></div>
          
          {/* Blood Logo Drop Image */}
          <Image 
            src="/logo.png" 
            alt="Blood Drop Logo" 
            width={80} 
            height={80} 
            className="animate-bounce duration-1000 relative z-10 filter drop-shadow-[0_5px_15px_rgba(220,38,38,0.5)]"
            priority 
          />
        </div>

        {/* Themed Text Loading Info */}
        <div className="text-center mt-2">
          <p className="text-crimson font-semibold tracking-widest text-sm uppercase animate-pulse">
            Loading...
          </p>
        </div>

        {/* Sleek Themed Progress Bar using Tailwind v4 custom animation class */}
        <div className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden mt-1">
          <div className="h-full bg-crimson rounded-full w-full origin-left animate-loading-bar"></div>
        </div>

      </div>
    </div>
  );
}
