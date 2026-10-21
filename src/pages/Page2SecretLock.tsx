import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, KeyRound, HelpCircle, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { CanvasContainer } from '../components/3d/CanvasContainer';
import { CombinationLock3D } from '../components/3d/CombinationLock3D';
import { birthdayConfig } from '../config/birthdayConfig';
import { soundEngine } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export const Page2SecretLock: React.FC = () => {
  const navigate = useNavigate();
  const [digits, setDigits] = useState<number[]>([0, 0, 0, 0]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showClue, setShowClue] = useState(false);

  const incrementDigit = (index: number) => {
    soundEngine.playDialClick();
    setErrorMessage(null);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = (next[index] + 1) % 10;
      return next;
    });
  };

  const decrementDigit = (index: number) => {
    soundEngine.playDialClick();
    setErrorMessage(null);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = (next[index] - 1 + 10) % 10;
      return next;
    });
  };

  const handleUnlockAttempt = () => {
    if (isUnlocked) return;

    const currentCode = digits.join('');
    const correctCode = birthdayConfig.security.lockCombination;

    if (currentCode === correctCode) {
      // Success!
      setIsUnlocked(true);
      setErrorMessage(null);
      soundEngine.playUnlockSuccess();

      // Magical burst of particles
      confetti({
        particleCount: 90,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FFD98E', '#FFB6D5', '#F45B9A', '#C9B6FF'],
      });

      // Auto-navigate to memory vault
      setTimeout(() => {
        navigate('/memory-vault');
      }, 1500);
    } else {
      // Incorrect attempt
      soundEngine.playErrorWobble();
      setIsShaking(true);
      setErrorMessage(birthdayConfig.security.incorrectAttemptMessage);

      setTimeout(() => {
        setIsShaking(false);
      }, 600);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 py-8 overflow-hidden">
      {/* 3D Scene of Vault / Safe */}
      <div className="absolute inset-0 w-full h-full">
        <CanvasContainer cameraPosition={[0, 0, 5]} fov={38}>
          <CombinationLock3D
            digits={digits}
            isUnlocked={isUnlocked}
            isShaking={isShaking}
            onDigitClick={incrementDigit}
          />
        </CanvasContainer>
      </div>

      {/* Top Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 text-center max-w-md mt-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs text-softgold mb-2 border border-softgold/30 shadow-glow-gold">
          <KeyRound className="w-3.5 h-3.5" />
          <span>VAULT SECURITY</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dreamwhite">
          Some memories are too precious to leave unlocked.
        </h2>
      </motion.div>

      {/* Bottom Interactive Lock Controls & Clue Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-20 w-full max-w-md mb-16 flex flex-col items-center"
      >
        {/* Interactive Number Dial Wheels */}
        <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-blush/30 shadow-glow-blue w-full backdrop-blur-xl mb-3">
          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-4">
            {digits.map((digit, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <button
                  onClick={() => incrementDigit(idx)}
                  disabled={isUnlocked}
                  aria-label={`Increase digit ${idx + 1}`}
                  className="p-1 rounded-md text-dreamwhite/50 hover:text-softgold hover:bg-white/5 active:scale-90 transition-all"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>

                {/* Dial Display Box */}
                <div
                  onClick={() => incrementDigit(idx)}
                  className={`w-12 h-16 sm:w-14 sm:h-18 flex items-center justify-center rounded-2xl border text-2xl sm:text-3xl font-serif font-bold cursor-pointer select-none transition-all shadow-inner ${
                    isUnlocked
                      ? 'bg-rosepink/30 border-softgold text-softgold shadow-glow-gold'
                      : 'bg-midnight-deep/80 border-blush/30 text-dreamwhite hover:border-softgold/60'
                  }`}
                >
                  <span>{digit}</span>
                </div>

                <button
                  onClick={() => decrementDigit(idx)}
                  disabled={isUnlocked}
                  aria-label={`Decrease digit ${idx + 1}`}
                  className="p-1 rounded-md text-dreamwhite/50 hover:text-softgold hover:bg-white/5 active:scale-90 transition-all"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Unlock Button */}
          <button
            onClick={handleUnlockAttempt}
            disabled={isUnlocked}
            aria-label="Unlock our memories"
            className={`w-full py-3.5 px-6 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
              isUnlocked
                ? 'bg-gradient-to-r from-softgold to-blush text-midnight font-bold'
                : 'bg-gradient-to-r from-rosepink via-rosepink-hover to-royal text-dreamwhite shadow-glow-pink hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isUnlocked ? (
              <>
                <Unlock className="w-4 h-4 text-midnight animate-bounce" />
                <span>MEMORIES UNLOCKED! ✨</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-softgold" />
                <span>UNLOCK OUR MEMORIES</span>
              </>
            )}
          </button>

          {/* Error Message */}
          <AnimatePresence>
            {errorMessage && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs sm:text-sm text-blush font-medium text-center mt-3"
              >
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Clue Button & Clue Card */}
        <div className="w-full flex flex-col items-center">
          <button
            onClick={() => {
              soundEngine.playSparkle();
              setShowClue(!showClue);
            }}
            className="inline-flex items-center gap-1.5 text-xs text-softgold/90 hover:text-softgold bg-midnight-light/60 px-3.5 py-1.5 rounded-full border border-softgold/20 transition-all hover:border-softgold/50"
          >
            <HelpCircle className="w-3.5 h-3.5 text-softgold" />
            <span>{showClue ? "Hide Secret Clue" : "Need a Clue?"}</span>
          </button>

          <AnimatePresence>
            {showClue && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="mt-2 p-3.5 rounded-2xl glass-panel-light border border-softgold/40 text-center max-w-sm"
              >
                <div className="flex items-center justify-center gap-1 text-softgold text-xs font-semibold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Whispered Clue</span>
                </div>
                <p className="font-serif italic text-sm text-dreamwhite/95">
                  "{birthdayConfig.security.clue}"
                </p>
                <p className="text-[11px] text-blush/80 mt-1">
                  {birthdayConfig.security.hint}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
