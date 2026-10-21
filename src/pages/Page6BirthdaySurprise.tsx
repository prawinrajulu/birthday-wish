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
    // Multi-shot fireworks confetti celebration
    const count = 200;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#F45B9A', '#FFB6D5', '#FFD98E', '#C9B6FF', '#FFF8FC', '#163B70'],
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
    <div className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 py-8 overflow-hidden">
      {/* 3D Birthday Cake Viewport (Revealed once wish is made) */}
      <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
        hasMadeWish ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <CanvasContainer cameraPosition={[0, 1.2, 5.2]} fov={40}>
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
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-midnight-deep/95 p-6 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-full glass-panel border border-softgold/40 flex items-center justify-center mb-6 shadow-glow-gold"
            >
              <Sparkles className="w-10 h-10 text-softgold" />
            </motion.div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-dreamwhite mb-4">
              {birthdayConfig.celebration.wishPrompt}
            </h1>

            <p className="text-sm sm:text-base text-blush/80 max-w-md font-sans mb-8">
              Close your eyes for three seconds, think of your happiest dream, and press below...
            </p>

            <button
              onClick={handleMakeWish}
              aria-label="Make a wish and reveal birthday surprise"
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-base sm:text-lg text-midnight bg-gradient-to-r from-softgold via-blush to-rosepink shadow-glow-gold hover:shadow-glow-pink hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Wand2 className="w-5 h-5 text-midnight group-hover:rotate-45 transition-transform" />
              <span>MAKE A WISH ✨</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AFTER WISH: Celebration Headline & Interactive Controls */}
      {hasMadeWish && (
        <>
          {/* Top Headline Banner */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative z-20 text-center max-w-2xl mt-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs text-softgold mb-2 border border-softgold/30 shadow-glow-gold">
              <Sparkles className="w-3.5 h-3.5 text-softgold animate-pulse" />
              <span>THE GRAND CELEBRATION</span>
              <Heart className="w-3.5 h-3.5 text-rosepink fill-rosepink animate-bounce" />
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-dreamwhite tracking-tight leading-tight drop-shadow-[0_0_25px_rgba(244,91,154,0.6)]">
              {birthdayConfig.celebration.mainHeadline}
            </h1>

            <p className="font-serif italic text-base sm:text-lg text-softgold/90 mt-2 max-w-lg mx-auto">
              "{birthdayConfig.celebration.subheadline}"
            </p>
          </motion.div>

          {/* Bottom Interactive Toolbar (Blow Candles / Replay / Next) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative z-20 w-full max-w-xl mb-16 flex flex-col items-center gap-3"
          >
            {/* Interactive Candle Banner */}
            <div className="glass-panel px-5 py-3 rounded-full border border-blush/30 shadow-glow-pink flex items-center justify-between gap-4 w-full backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <Flame className={`w-5 h-5 ${candlesLit ? 'text-softgold animate-pulse' : 'text-dreamwhite/40'}`} />
                <span className="text-xs sm:text-sm font-medium text-dreamwhite">
                  {candlesLit ? "Candles are burning bright!" : "Candles blown out! Wish sent to the stars 🌟"}
                </span>
              </div>

              {candlesLit ? (
                <button
                  onClick={handleBlowCandles}
                  aria-label="Blow out candles"
                  className="px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-rosepink to-softgold text-midnight shadow-glow-pink hover:scale-105 active:scale-95 transition-all"
                >
                  BLOW CANDLES 💨
                </button>
              ) : (
                <button
                  onClick={handleReplay}
                  aria-label="Replay candle wish celebration"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold glass-pill border border-softgold/40 text-softgold hover:border-softgold transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Relight 🕯️</span>
                </button>
              )}
            </div>

            {/* Closing Toast & Next Finale Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
              <button
                onClick={() => {
                  soundEngine.playSparkle();
                  navigate('/forever-memories');
                }}
                aria-label="Proceed to memory finale"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full font-bold text-sm sm:text-base text-dreamwhite bg-gradient-to-r from-rosepink via-rosepink-hover to-royal shadow-glow-pink hover:shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                <span>THE MEMORY FINALE ✨</span>
                <ArrowRight className="w-4 h-4 text-softgold" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};
