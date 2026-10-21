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
    <div className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 py-8 overflow-x-hidden">
      {/* Moonlit Garden Sky Backdrop & Pink Moon */}
      <div className="absolute top-10 right-10 sm:right-20 pointer-events-none z-10 flex flex-col items-center">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-rosepink/40 via-blush/60 to-softgold/80 blur-xl opacity-70 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Moon className="w-16 h-16 sm:w-20 sm:h-20 text-softgold/85 drop-shadow-[0_0_20px_rgba(255,217,142,0.8)]" />
        </div>
      </div>

      {/* Top Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 text-center max-w-lg mt-4 mb-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs text-blush mb-2 border border-blush/30 shadow-glow-pink">
          <Sparkles className="w-3.5 h-3.5 text-softgold animate-pulse" />
          <span>CONFIDENTIAL & DEAR</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-dreamwhite">
          There's something I've always wanted you to know...
        </h1>
      </motion.div>

      {/* Center 3D Interactive Sealed Envelope or Open Parchment Letter */}
      <div className="relative z-20 w-full max-w-2xl my-4 flex justify-center items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Sealed Envelope */
            <motion.div
              key="sealed-envelope"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -30 }}
              whileHover={{ scale: 1.03 }}
              onClick={handleOpenLetter}
              className="cursor-pointer relative w-full max-w-md aspect-[16/10] glass-panel rounded-3xl p-8 border-2 border-blush/40 shadow-glow-pink flex flex-col items-center justify-center text-center group"
            >
              {/* Envelope flap aesthetic */}
              <div className="absolute top-0 left-0 right-0 h-1/2 border-b-2 border-blush/30 bg-gradient-to-b from-royal/50 to-transparent pointer-events-none rounded-t-3xl" />

              {/* Golden Wax Seal */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-softgold via-softgold-dark to-rosepink border-2 border-white/50 flex items-center justify-center shadow-glow-gold group-hover:scale-110 transition-transform duration-300 relative z-10 mb-4">
                <Sparkles className="w-9 h-9 text-midnight" />
              </div>

              <div className="relative z-10">
                <p className="font-serif text-xl sm:text-2xl font-bold text-dreamwhite mb-1">
                  For My Best Friend
                </p>
                <p className="text-xs text-blush/80 font-sans tracking-widest uppercase">
                  Sealed with memories & inside jokes 📸
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenLetter();
                }}
                aria-label="Open your letter"
                className="mt-6 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-rosepink to-softgold text-midnight flex items-center gap-2 shadow-glow-pink group-hover:shadow-glow-gold transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>OPEN YOUR LETTER 💌</span>
              </button>
            </motion.div>
          ) : (
            /* Unfolded Handwritten Letter */
            <motion.div
              key="unfolded-letter"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full glass-panel rounded-3xl p-6 sm:p-10 border border-softgold/30 shadow-glow-gold relative overflow-hidden backdrop-blur-2xl"
              style={{
                backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(255, 217, 142, 0.08), transparent 70%)',
              }}
            >
              {/* Top Salutation */}
              <div className="border-b border-softgold/20 pb-4 mb-6 flex justify-between items-center">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-softgold">
                    {letter.title}
                  </h2>
                  <p className="text-xs text-blush/80 italic font-sans">
                    Written for the bestest friend ever ✨
                  </p>
                </div>
                <Sparkles className="w-6 h-6 text-softgold animate-pulse" />
              </div>

              {/* Paragraphs with typewriter reveal */}
              <div className="space-y-4 font-serif text-base sm:text-lg leading-relaxed text-dreamwhite/95">
                {letter.paragraphs.map((para, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{
                      opacity: idx < displayedParagraphs ? 1 : 0.2,
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
                className="mt-8 pt-6 border-t border-softgold/20 flex flex-col items-end text-right"
              >
                <p className="text-sm font-sans text-blush italic">
                  {letter.signOff}
                </p>
                <p className="font-serif text-xl sm:text-2xl font-bold text-softgold mt-1">
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
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base text-dreamwhite bg-gradient-to-r from-rosepink via-rosepink-hover to-softgold shadow-glow-pink hover:shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
        >
          <span>THERE'S ONE LAST THING...</span>
          <ArrowRight className="w-4 h-4 text-softgold group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
