import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, ChevronLeft, ChevronRight, ArrowRight, Heart, Compass } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { FallbackImage } from '../components/common/FallbackImage';
import { soundEngine } from '../utils/soundEffects';

export const Page4OurStory: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const milestones = birthdayConfig.milestones || [];
  const safeActiveStep = Math.min(Math.max(0, activeStep), Math.max(0, milestones.length - 1));
  const current = milestones[safeActiveStep];

  const handleSelectStep = (idx: number) => {
    soundEngine.playSparkle();
    setActiveStep(idx);
  };

  const handleNextStep = () => {
    if (activeStep < milestones.length - 1) {
      soundEngine.playSparkle();
      setActiveStep(activeStep + 1);
    } else {
      soundEngine.playSparkle();
      navigate('/secret-letter');
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      soundEngine.playSparkle();
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between items-center px-6 sm:px-12 py-8 overflow-x-hidden">
      {/* Top Editorial Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 text-center max-w-2xl mt-2 mb-2"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-champagne/25 text-[11px] text-champagne tracking-[0.2em] uppercase font-sans mb-3 backdrop-blur-md">
          <Compass className="w-3.5 h-3.5 text-champagne animate-spin" style={{ animationDuration: '14s' }} />
          <span>FRIENDSHIP CONSTELLATION • CHAPTER 04</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-dreamwhite tracking-tight leading-tight">
          Our <span className="font-serif italic text-shimmer">Friendship Journey</span>
        </h1>
        <p className="text-xs sm:text-sm text-blush/80 mt-2 font-sans font-light">
          From the first shared laugh to endless adventures. Follow the glowing pathway through our memories.
        </p>
      </motion.header>

      {/* Interactive Glowing Pathway Navigation */}
      <div className="relative z-20 w-full max-w-4xl my-4 px-4 sm:px-8">
        {/* Background Connecting Celestial Wire */}
        <div className="relative flex items-center justify-between">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-white/10 rounded-full" />
          <motion.div
            className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-rosepink via-champagne to-lavender rounded-full shadow-[0_0_15px_rgba(244,212,154,0.5)]"
            initial={false}
            animate={{
              width: `${(safeActiveStep / Math.max(1, milestones.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {milestones.map((m, idx) => {
            const isActive = idx === activeStep;
            const isCompleted = idx < activeStep;

            return (
              <button
                key={m.id}
                onClick={() => handleSelectStep(idx)}
                title={m.title}
                aria-label={`Milestone ${idx + 1}: ${m.title}`}
                className="relative z-10 flex flex-col items-center group focus:outline-none"
              >
                <div
                  className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-mono font-medium text-xs sm:text-sm transition-all duration-300 border ${
                    isActive
                      ? 'bg-gradient-to-r from-champagne to-blush text-midnight border-white scale-110 shadow-[0_0_25px_rgba(244,212,154,0.6)] font-bold'
                      : isCompleted
                      ? 'bg-ocean-deep border-rosepink/60 text-blush shadow-sm'
                      : 'bg-midnight-deep/90 border-white/15 text-dreamwhite/40 hover:border-champagne/50 hover:text-dreamwhite'
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>

                <span
                  className={`text-[10px] sm:text-[11px] mt-2.5 font-sans uppercase tracking-[0.15em] hidden sm:block max-w-[100px] text-center line-clamp-1 transition-colors ${
                    isActive ? 'text-champagne font-semibold' : 'text-dreamwhite/40 group-hover:text-blush'
                  }`}
                >
                  {m.yearOrPhase}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Selected Milestone Editorial Presentation Card */}
      {current && (
        <div className="relative z-20 w-full max-w-5xl my-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.97, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.97, x: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="glass-editorial rounded-3xl p-6 sm:p-10 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col md:flex-row gap-8 items-center backdrop-blur-2xl"
            >
              {/* Visual Photo Presentation */}
              <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden bg-black/50 shadow-2xl relative group border border-white/10">
                <FallbackImage
                  src={current.image}
                  fallbackTitle={current.title}
                  alt={current.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-deep/70 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3.5 left-3.5 px-3.5 py-1 rounded-full text-[11px] font-sans font-medium tracking-wider uppercase bg-ocean-deep/90 backdrop-blur-md text-champagne border border-champagne/30 shadow-md">
                  {current.highlight}
                </div>
              </div>

              {/* Narrative Editorial Content */}
              <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-champagne font-medium">
                      {current.yearOrPhase}
                    </span>
                    <span className="text-white/20">•</span>
                    <div className="flex items-center gap-1.5 text-xs text-blush/80 font-sans">
                      <Calendar className="w-3.5 h-3.5 text-champagne" />
                      <span>{current.date}</span>
                    </div>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-4xl font-light text-dreamwhite leading-snug tracking-tight mb-3">
                    {current.title}
                  </h2>

                  <p className="font-serif italic text-sm sm:text-base text-blush/90 leading-relaxed font-light mb-8 border-l-2 border-rosepink/50 pl-4">
                    "{current.caption}"
                  </p>
                </div>

                {/* Milestone Step Actions */}
                <div className="flex items-center justify-between pt-5 border-t border-white/10">
                  <button
                    onClick={handlePrevStep}
                    disabled={activeStep === 0}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all ${
                      activeStep > 0
                        ? 'bg-white/[0.04] border border-white/15 text-dreamwhite hover:text-champagne hover:border-champagne/40'
                        : 'text-white/20 cursor-not-allowed'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={handleNextStep}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans font-semibold tracking-[0.14em] uppercase bg-gradient-to-r from-rosepink to-champagne text-midnight shadow-[0_0_20px_rgba(244,127,175,0.4)] hover:shadow-[0_0_30px_rgba(244,212,154,0.5)] transition-all active:scale-95"
                  >
                    <span>
                      {activeStep === milestones.length - 1 ? 'Go to Secret Letter' : 'Next Milestone'}
                    </span>
                    <ChevronRight className="w-4 h-4 text-midnight" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Floating Bottom Navigation to Secret Letter */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-20 mt-4 mb-16 flex flex-col items-center"
      >
        <button
          onClick={() => {
            soundEngine.playSparkle();
            navigate('/secret-letter');
          }}
          aria-label="Continue to secret letter"
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-[0.16em] uppercase text-champagne bg-white/[0.04] border border-champagne/35 hover:border-champagne shadow-[0_0_20px_rgba(244,212,154,0.25)] hover:scale-105 active:scale-95 transition-all"
        >
          <span>CONTINUE TO SECRET LETTER</span>
          <ArrowRight className="w-4 h-4 text-champagne group-hover:translate-x-1.5 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
