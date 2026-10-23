import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, RefreshCw, ArrowRight, Heart, Flame } from 'lucide-react';
import { CanvasContainer } from '../components/3d/CanvasContainer';
import { BirthdayCake3D } from '../components/3d/BirthdayCake3D';
import { birthdayConfig } from '../config/birthdayConfig';
import { soundEngine } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export const Page6BirthdaySurprise: React.FC = () => {
  const navigate = useNavigate();
  const [hasMadeWish, setHasMadeWish] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);
  const [candlesBlownOut, setCandlesBlownOut] = useState(false);

  const triggerCelebrationConfetti = () => {
    // Multi-shot luxury fireworks confetti celebration
    const count = 220;
    const defaults = {
      origin: { y: 0.62 },
      colors: ['#F47FAF', '#FFB9D5', '#F4D49A', '#C9B8FF', '#FFF7F8', '#122847'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleMakeWish = () => {
    setHasMadeWish(true);
    setCandlesLit(true);
    setCandlesBlownOut(false);

    soundEngine.playBirthdayFanfare();
    triggerCelebrationConfetti();
  };

  const handleBlowCandles = () => {
    if (!candlesLit || candlesBlownOut) return;

    soundEngine.playBlowCandles();
    setCandlesLit(false);
    setCandlesBlownOut(true);

    // Extra sparkle burst when candles are blown
    setTimeout(() => {
      triggerCelebrationConfetti();
    }, 400);
  };

  const handleReplay = () => {
    soundEngine.playSparkle();
    setCandlesLit(true);
    setCandlesBlownOut(false);
    triggerCelebrationConfetti();
    soundEngine.playBirthdayFanfare();
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between items-center px-6 sm:px-12 py-8 overflow-hidden">
      {/* 3D Birthday Cake Viewport (Revealed once wish is made) */}
      <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
        hasMadeWish ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <CanvasContainer cameraPosition={[0, 1.15, 5.0]} fov={38}>
          <BirthdayCake3D
            candlesLit={candlesLit}
            onBlowCandles={handleBlowCandles}
          />
        </CanvasContainer>
      </div>

      {/* BEFORE WISH: Darkened Anticipation Screen */}
      <AnimatePresence>
        {!hasMadeWish && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-midnight-deep/95 p-6 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-full bg-white/[0.04] border border-champagne/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(244,212,154,0.3)] backdrop-blur-xl"
            >
              <Sparkles className="w-9 h-9 text-champagne" />
            </motion.div>

            <span className="text-[11px] font-sans font-medium uppercase tracking-[0.25em] text-champagne/80 mb-3 block">
              FINAL CELESTIAL CLIMAX
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-dreamwhite mb-4 tracking-tight max-w-2xl">
              {birthdayConfig.celebration.wishPrompt}
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-blush/80 max-w-md font-sans font-light leading-relaxed mb-8">
              Close your eyes for three seconds, think of your happiest dream, and press below...
            </p>

            <button
              onClick={handleMakeWish}
              aria-label="Make a wish and reveal birthday surprise"
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-sans font-semibold text-xs sm:text-sm tracking-[0.18em] uppercase text-midnight bg-gradient-to-r from-champagne via-blush to-rosepink shadow-[0_0_30px_rgba(244,212,154,0.5)] hover:shadow-[0_0_45px_rgba(244,127,175,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Wand2 className="w-4 h-4 text-midnight group-hover:rotate-45 transition-transform duration-300" />
              <span>MAKE A WISH ✨</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AFTER WISH: Celebration Headline & Interactive Controls */}
      {hasMadeWish && (
        <>
          {/* Top Headline Banner */}
          <motion.header
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 text-center max-w-3xl mt-2"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-champagne/25 text-[11px] text-champagne tracking-[0.2em] uppercase font-sans mb-3 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
              <span>THE GRAND CELEBRATION</span>
              <Heart className="w-3 h-3 text-rosepink fill-rosepink" />
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-dreamwhite tracking-tight leading-tight">
              {birthdayConfig.celebration.mainHeadline}
            </h1>

            <p className="font-serif italic text-base sm:text-lg text-champagne/90 mt-2.5 max-w-xl mx-auto leading-relaxed">
              "{birthdayConfig.celebration.subheadline}"
            </p>
          </motion.header>

          {/* Bottom Interactive Toolbar (Blow Candles / Replay / Next) */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-full max-w-lg mb-12 sm:mb-16 flex flex-col items-center gap-3 px-2"
          >
            {/* Interactive Candle Banner */}
            <div className="w-full glass-editorial px-6 py-3.5 rounded-full border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex items-center justify-between gap-4 backdrop-blur-2xl">
              <div className="flex items-center gap-2.5">
                <Flame className={`w-4 h-4 sm:w-5 sm:h-5 ${candlesLit ? 'text-champagne animate-pulse' : 'text-dreamwhite/30'}`} />
                <span className="text-xs sm:text-sm font-sans font-light text-dreamwhite">
                  {candlesLit ? "Candles are burning bright!" : "Candles blown out! Wish sent to the stars 🌟"}
                </span>
              </div>

              {candlesLit ? (
                <button
                  onClick={handleBlowCandles}
                  aria-label="Blow out candles"
                  className="px-4 py-1.5 rounded-full text-[11px] font-sans font-semibold tracking-wider uppercase bg-gradient-to-r from-rosepink to-champagne text-midnight shadow-[0_0_20px_rgba(244,127,175,0.4)] hover:scale-105 active:scale-95 transition-all"
                >
                  BLOW CANDLES 💨
                </button>
              ) : (
                <button
                  onClick={handleReplay}
                  aria-label="Replay candle wish celebration"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-sans font-medium tracking-wider uppercase bg-white/[0.05] border border-champagne/40 text-champagne hover:border-champagne transition-all"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Relight 🕯️</span>
                </button>
              )}
            </div>

            {/* Closing Toast & Next Finale Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center mt-1">
              <button
                onClick={() => {
                  soundEngine.playSparkle();
                  navigate('/forever-memories');
                }}
                aria-label="Proceed to memory finale"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full font-sans font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase text-dreamwhite bg-gradient-to-r from-rosepink via-rosepink-hover to-ocean-light border border-blush/30 shadow-[0_0_25px_rgba(244,127,175,0.4)] hover:shadow-[0_0_35px_rgba(244,212,154,0.5)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                <span>THE MEMORY FINALE</span>
                <ArrowRight className="w-4 h-4 text-champagne" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};
