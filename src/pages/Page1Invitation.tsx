import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { CanvasContainer } from '../components/3d/CanvasContainer';
import { GiftBox3D } from '../components/3d/GiftBox3D';
import { soundEngine } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export const Page1Invitation: React.FC = () => {
  const navigate = useNavigate();
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  const handleEnterUniverse = () => {
    if (isEntering) return;
    setIsEntering(true);
    setIsBoxOpen(true);

    soundEngine.playUnlockSuccess();

    // Trigger subtle pink & gold particle burst from center
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFB6D5', '#F45B9A', '#C9B6FF', '#FFD98E', '#FFF8FC'],
      shapes: ['circle'],
      scalar: 1.1,
    });

    // Start ambient music automatically on user entry if preferred
    if (!soundEngine.getAmbientPlaying()) {
      soundEngine.startAmbientMusic();
    }

    // Delay navigation for portal zoom effect
    setTimeout(() => {
      navigate('/secret-lock');
    }, 1200);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between items-center px-6 sm:px-12 py-8 overflow-hidden">
      {/* 3D Scene Viewport */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto">
        <CanvasContainer cameraPosition={[0, 0.35, 4.2]} fov={40}>
          <GiftBox3D isOpen={isBoxOpen} onOpen={handleEnterUniverse} />
        </CanvasContainer>
      </div>

      {/* Top Editorial Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-6xl flex justify-between items-center pt-2 sm:pt-4"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-rosepink animate-ping" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-blush/90 font-medium font-sans">
            DREAMSCAPE • CHAPTER 01
          </span>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-[11px] uppercase tracking-[0.2em] text-champagne/80 font-mono">
            A DIGITAL GIFT FOR BESTIE
          </span>
        </div>
      </motion.header>

      {/* Center Portal Glow & Light Wave (Activated on Enter) */}
      {isEntering && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 4.5, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center"
        >
          <div className="w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-rosepink/60 via-champagne/50 to-lavender/60 blur-[100px]" />
        </motion.div>
      )}

      {/* Bottom Editorial Composition (Open Layout, High Whitespace, No Clunky Card) */}
      <motion.main
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-4xl mb-12 sm:mb-16 flex flex-col items-center text-center px-4"
      >
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-champagne tracking-[0.2em] uppercase font-sans mb-4 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-champagne" />
          <span>CELESTIAL BIRTHDAY EXPERIENCE</span>
        </div>

        {/* Editorial Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-[-0.02em] text-dreamwhite leading-[1.15] max-w-3xl mb-4">
          A Little World, <span className="font-serif italic text-shimmer">Made Just for You.</span>
        </h1>

        {/* Supporting Editorial Text */}
        <p className="text-xs sm:text-sm md:text-base text-blush/85 font-sans font-light max-w-lg mx-auto leading-relaxed mb-7">
          Memories, laughter, surprises, and a birthday you won't forget.
        </p>

        {/* Primary Cinematic Action Button */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleEnterUniverse}
            disabled={isEntering}
            aria-label="Enter your world"
            className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full font-sans font-semibold text-xs sm:text-sm tracking-[0.18em] uppercase text-dreamwhite bg-gradient-to-r from-rosepink via-rosepink-hover to-ocean-light border border-blush/30 shadow-[0_0_30px_-5px_rgba(244,127,175,0.45)] hover:shadow-[0_0_40px_rgba(244,212,154,0.5)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <span>ENTER YOUR WORLD</span>
            <ArrowRight className="w-4 h-4 text-champagne group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>

          <span className="text-[10px] uppercase tracking-widest text-dreamwhite/40 font-mono mt-1">
            CLICK GIFT OR BUTTON TO UNWRAP
          </span>
        </div>
      </motion.main>
    </div>
  );
};
