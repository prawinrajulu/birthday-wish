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
    <div className="relative w-full min-h-screen flex flex-col justify-between items-center px-6 sm:px-12 py-8 overflow-hidden">
      {/* 3D Scene of Vault / Safe */}
      <div className="absolute inset-0 w-full h-full">
        <CanvasContainer cameraPosition={[0, 0, 5]} fov={36}>
          <CombinationLock3D
            digits={digits}
            isUnlocked={isUnlocked}
            isShaking={isShaking}
            onDigitClick={incrementDigit}
          />
        </CanvasContainer>
      </div>

      {/* Top Editorial Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-4xl text-center mt-2"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-champagne/25 text-[11px] text-champagne tracking-[0.2em] uppercase font-sans mb-3 backdrop-blur-md">
          <KeyRound className="w-3.5 h-3.5 text-champagne" />
          <span>VAULT ARCHIVE • CHAPTER 02</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-dreamwhite tracking-tight leading-tight">
          Some memories are too precious <span className="italic text-shimmer">to leave unlocked.</span>
        </h2>
        <p className="text-xs sm:text-sm text-blush/80 mt-2 font-sans font-light">
          Enter the secret 4-digit code to reveal our memory vault.
        </p>
      </motion.header>

      {/* Bottom Interactive Lock Controls & Tactile Wheels */}
      <motion.main
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-md mb-12 sm:mb-16 flex flex-col items-center px-2"
      >
        {/* Sleek Minimal Glass Control Bar */}
        <div className="w-full p-6 sm:p-7 rounded-3xl glass-editorial border border-white/10 shadow-[0_20px_50px_-10px_rgba(4,11,22,0.7)] backdrop-blur-2xl mb-4">
          {/* Dial Wheels */}
          <div className="flex justify-center items-center gap-3 sm:gap-4 mb-6">
            {digits.map((digit, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <button
                  onClick={() => incrementDigit(idx)}
                  disabled={isUnlocked}
                  aria-label={`Increase digit ${idx + 1}`}
                  className="p-1.5 text-dreamwhite/40 hover:text-champagne active:scale-90 transition-all disabled:opacity-20"
                >
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Tactile Dial Display Box */}
                <div
                  onClick={() => incrementDigit(idx)}
                  className={`w-12 h-16 sm:w-16 sm:h-20 flex items-center justify-center rounded-2xl border text-2xl sm:text-3xl font-serif font-semibold cursor-pointer select-none transition-all duration-300 shadow-inner ${
                    isUnlocked
                      ? 'bg-rosepink/20 border-champagne text-champagne shadow-[0_0_25px_rgba(244,212,154,0.4)]'
                      : 'bg-ocean-deep/90 border-blush/20 text-dreamwhite hover:border-champagne/60 hover:scale-[1.02]'
                  }`}
                >
                  <span>{digit}</span>
                </div>

                <button
                  onClick={() => decrementDigit(idx)}
                  disabled={isUnlocked}
                  aria-label={`Decrease digit ${idx + 1}`}
                  className="p-1.5 text-dreamwhite/40 hover:text-champagne active:scale-90 transition-all disabled:opacity-20"
                >
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Unlock Button */}
          <button
            onClick={handleUnlockAttempt}
            disabled={isUnlocked}
            aria-label="Unlock memories"
            className={`w-full py-4 px-6 rounded-full font-sans font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase flex items-center justify-center gap-2.5 transition-all duration-300 shadow-md ${
              isUnlocked
                ? 'bg-gradient-to-r from-champagne to-blush text-midnight font-bold shadow-[0_0_30px_rgba(244,212,154,0.5)]'
                : 'bg-gradient-to-r from-rosepink via-rosepink-hover to-ocean-light text-dreamwhite border border-blush/30 shadow-[0_0_25px_rgba(244,127,175,0.4)] hover:shadow-[0_0_35px_rgba(244,212,154,0.45)] hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isUnlocked ? (
              <>
                <Unlock className="w-4 h-4 text-midnight animate-bounce" />
                <span>VAULT UNLOCKED • OPENING</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-champagne" />
                <span>UNLOCK MEMORIES</span>
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
                className="text-xs text-rosepink font-sans font-medium text-center mt-3"
              >
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Refined Secret Clue Button & Card */}
        <div className="w-full flex flex-col items-center">
          <button
            onClick={() => {
              soundEngine.playSparkle();
              setShowClue(!showClue);
            }}
            className="inline-flex items-center gap-2 text-xs text-champagne/80 hover:text-champagne font-sans font-light tracking-wider px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 transition-all hover:border-champagne/40"
          >
            <HelpCircle className="w-3.5 h-3.5 text-champagne" />
            <span>{showClue ? "Hide Secret Clue" : "Need a Clue?"}</span>
          </button>

          <AnimatePresence>
            {showClue && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                className="mt-3 p-4 rounded-2xl glass-editorial border border-champagne/30 text-center max-w-sm backdrop-blur-xl"
              >
                <div className="flex items-center justify-center gap-1.5 text-champagne text-[11px] font-sans font-medium uppercase tracking-[0.15em] mb-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Whispered Clue</span>
                </div>
                <p className="font-serif italic text-sm sm:text-base text-dreamwhite/95 leading-relaxed">
                  "{birthdayConfig.security.clue}"
                </p>
                <p className="text-[11px] text-blush/80 mt-1.5 font-sans font-light">
                  {birthdayConfig.security.hint}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  );
};
