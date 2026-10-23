import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Heart, ArrowRight, Moon } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { soundEngine } from '../utils/soundEffects';

export const Page5SecretLetter: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [displayedParagraphs, setDisplayedParagraphs] = useState<number>(0);

  const letter = birthdayConfig.letter;

  const handleOpenLetter = () => {
    if (isOpen) return;
    setIsOpen(true);
    soundEngine.playEnvelopeOpen();
  };

  // Progressive gentle typewriter reveal for paragraphs
  useEffect(() => {
    if (isOpen && displayedParagraphs < letter.paragraphs.length) {
      const timer = setTimeout(() => {
        setDisplayedParagraphs((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen, displayedParagraphs, letter.paragraphs.length]);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between items-center px-6 sm:px-12 py-8 overflow-x-hidden">
      {/* Soft Moonlit Atmospheric Sky Backdrop */}
      <div className="absolute top-8 right-8 sm:right-24 pointer-events-none z-10 flex flex-col items-center">
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-rosepink/30 via-blush/40 to-champagne/60 blur-2xl opacity-60 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Moon className="w-14 h-14 sm:w-20 sm:h-20 text-champagne/75 drop-shadow-[0_0_25px_rgba(244,212,154,0.6)]" />
        </div>
      </div>

      {/* Top Editorial Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 text-center max-w-xl mt-2 mb-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-champagne/25 text-[11px] text-champagne tracking-[0.2em] uppercase font-sans mb-3 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-champagne animate-pulse" />
          <span>WRITTEN FROM THE HEART • CHAPTER 05</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-dreamwhite tracking-tight leading-tight">
          There's something I've always <span className="font-serif italic text-shimmer">wanted you to know...</span>
        </h1>
      </motion.header>

      {/* Center Interactive Sealed Envelope or Open Editorial Note */}
      <div className="relative z-20 w-full max-w-3xl my-4 flex justify-center items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Sealed Luxury Envelope */
            <motion.div
              key="sealed-envelope"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: -25, filter: 'blur(8px)' }}
              whileHover={{ scale: 1.02 }}
              onClick={handleOpenLetter}
              className="cursor-pointer relative w-full max-w-lg aspect-[16/10] glass-editorial rounded-3xl p-8 sm:p-10 border border-white/15 shadow-[0_25px_60px_-15px_rgba(4,11,22,0.8)] flex flex-col items-center justify-center text-center group backdrop-blur-2xl"
            >
              {/* Envelope flap aesthetic */}
              <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-white/10 bg-gradient-to-b from-ocean-deep/60 to-transparent pointer-events-none rounded-t-3xl" />

              {/* Golden Wax Seal */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-champagne via-champagne-dark to-rosepink border border-white/40 flex items-center justify-center shadow-[0_0_30px_rgba(244,212,154,0.45)] group-hover:scale-110 transition-transform duration-300 relative z-10 mb-4">
                <Sparkles className="w-8 h-8 text-midnight" />
              </div>

              <div className="relative z-10">
                <p className="font-serif text-2xl sm:text-3xl font-light text-dreamwhite mb-1 tracking-wide">
                  For My Best Friend
                </p>
                <p className="text-[11px] text-blush/80 font-sans tracking-[0.2em] uppercase">
                  SEALED WITH MEMORIES & INSIDE JOKES
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenLetter();
                }}
                aria-label="Open your letter"
                className="mt-6 px-7 py-3 rounded-full text-xs font-sans font-semibold tracking-[0.16em] uppercase bg-gradient-to-r from-rosepink to-champagne text-midnight flex items-center gap-2 shadow-[0_0_25px_rgba(244,127,175,0.4)] group-hover:shadow-[0_0_35px_rgba(244,212,154,0.5)] transition-all"
              >
                <Mail className="w-4 h-4 text-midnight" />
                <span>OPEN YOUR LETTER 💌</span>
              </button>
            </motion.div>
          ) : (
            /* Unfolded Editorial Letter (Warm Stationery Paper with Gold Border) */
            <motion.div
              key="unfolded-letter"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full rounded-3xl p-7 sm:p-12 border border-champagne/25 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative overflow-hidden backdrop-blur-2xl bg-gradient-to-b from-[#0D1E38]/95 to-[#081426]/95"
              style={{
                backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(244, 212, 154, 0.08), transparent 70%)',
              }}
            >
              {/* Stationery Letterhead */}
              <div className="border-b border-champagne/20 pb-5 mb-7 flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-champagne/70 block mb-1">
                    PERSONAL & CONFIDENTIAL
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-light text-champagne tracking-tight">
                    {letter.title}
                  </h2>
                  <p className="text-xs text-blush/80 italic font-serif mt-1">
                    Written for the bestest friend ever ✨
                  </p>
                </div>
                <Sparkles className="w-5 h-5 text-champagne/80 animate-pulse hidden sm:block" />
              </div>

              {/* Letter Paragraphs with Progressive Gentle Reveal */}
              <div className="space-y-4 font-serif text-base sm:text-lg leading-[1.75] text-dreamwhite/95">
                {letter.paragraphs.map((para, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{
                      opacity: idx < displayedParagraphs ? 1 : 0.25,
                      y: idx < displayedParagraphs ? 0 : 8,
                    }}
                    transition={{ duration: 0.6 }}
                    className={`${
                      idx < displayedParagraphs ? 'text-dreamwhite' : 'text-dreamwhite/20'
                    } transition-colors`}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Sign Off */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: displayedParagraphs >= letter.paragraphs.length ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className="mt-9 pt-6 border-t border-champagne/20 flex flex-col items-end text-right"
              >
                <p className="text-sm font-sans font-light text-blush/90 italic">
                  {letter.signOff}
                </p>
                <p className="font-serif text-xl sm:text-2xl font-light text-champagne mt-1.5 tracking-wide">
                  {letter.signature}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Action Button: THERE'S ONE LAST THING... */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative z-20 mt-4 mb-16 flex flex-col items-center"
      >
        <button
          onClick={() => {
            soundEngine.playSparkle();
            navigate('/birthday-surprise');
          }}
          aria-label="Proceed to final birthday surprise"
          className="group inline-flex items-center gap-3 px-9 py-4 rounded-full font-sans font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase text-dreamwhite bg-gradient-to-r from-rosepink via-rosepink-hover to-champagne shadow-[0_0_25px_rgba(244,127,175,0.4)] hover:shadow-[0_0_35px_rgba(244,212,154,0.5)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
        >
          <span>THERE'S ONE LAST THING...</span>
          <ArrowRight className="w-4 h-4 text-champagne group-hover:translate-x-1.5 transition-transform duration-300" />
        </button>
      </motion.div>
    </div>
  );
};
