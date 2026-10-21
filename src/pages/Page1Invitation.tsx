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
    <div className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 py-8 overflow-hidden">
      {/* 3D Scene Viewport */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto">
        <CanvasContainer cameraPosition={[0, 0.4, 4.2]} fov={42}>
          <GiftBox3D isOpen={isBoxOpen} onOpen={handleEnterUniverse} />
        </CanvasContainer>
      </div>

      {/* Top Banner Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-20 flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-blush/30 shadow-glow-pink mt-6"
      >
        <Sparkles className="w-4 h-4 text-softgold animate-pulse" />
        <span className="text-xs uppercase tracking-widest text-dreamwhite/90 font-medium">
          A Celestial Surprise
        </span>
        <Sparkles className="w-3.5 h-3.5 text-softgold animate-pulse" />
      </motion.div>

      {/* Center Portal Glow (Activated on Enter) */}
      {isEntering && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 4, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeIn' }}
          className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center"
        >
          <div className="w-96 h-96 rounded-full bg-gradient-to-r from-rosepink/50 via-softgold/40 to-lavender/50 blur-3xl" />
        </motion.div>
      )}

      {/* Bottom Floating Interactive Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-20 w-full max-w-lg mb-16 text-center"
      >
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blush/30 shadow-glow-blue relative overflow-hidden backdrop-blur-xl">
          {/* Subtle decorative shimmer badge */}
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-softgold tracking-wider uppercase mb-3">
            Invitation For You
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-dreamwhite leading-tight mb-3">
            Someone Special Has a <span className="text-shimmer">Surprise</span> Waiting For You...
          </h1>

          <p className="text-sm sm:text-base text-blush/80 font-sans font-light max-w-md mx-auto mb-6">
            A little world made of memories, laughter, and love.
          </p>

          <button
            onClick={handleEnterUniverse}
            disabled={isEntering}
            aria-label="Enter your little universe"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base text-dreamwhite bg-gradient-to-r from-rosepink via-rosepink-hover to-royal-light shadow-glow-pink hover:shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <span>ENTER YOUR LITTLE UNIVERSE ✨</span>
            <ArrowRight className="w-4 h-4 text-softgold group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
