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
    <div className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 py-8 overflow-x-hidden">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 text-center max-w-xl mt-4 mb-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs text-softgold mb-2 border border-softgold/30 shadow-glow-gold">
          <Compass className="w-3.5 h-3.5 text-softgold animate-spin" style={{ animationDuration: '10s' }} />
          <span>FRIENDSHIP CONSTELLATION PATH</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dreamwhite leading-tight">
          Our <span className="text-shimmer">Friendship Timeline</span>
        </h1>
        <p className="text-xs sm:text-sm text-blush/80 mt-1 font-light">
          From the first shared laugh to endless memories. Follow our journey.
        </p>
      </motion.div>

      {/* Interactive Glowing Timeline Pathway Navigation */}
      <div className="relative z-20 w-full max-w-3xl my-3 px-4">
        {/* Glowing Background Connecting Wire */}
        <div className="relative flex items-center justify-between">
          <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-gradient-to-r from-rosepink/30 via-softgold/40 to-lavender/30 rounded-full" />
          <motion.div
            className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-gradient-to-r from-rosepink to-softgold rounded-full shadow-glow-pink"
            initial={false}
            animate={{
              width: `${(safeActiveStep / Math.max(1, milestones.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
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
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 border-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-rosepink to-softgold text-midnight border-white scale-110 shadow-glow-pink'
                      : isCompleted
                      ? 'bg-midnight-light border-rosepink text-blush shadow-sm'
                      : 'bg-midnight-deep border-white/20 text-dreamwhite/50 hover:border-blush/60 hover:text-dreamwhite'
                  }`}
                >
                  {idx + 1}
                </div>

                <span
                  className={`text-[10px] sm:text-xs mt-2 font-medium tracking-wider hidden sm:block max-w-[80px] text-center line-clamp-1 transition-colors ${
                    isActive ? 'text-softgold font-semibold' : 'text-dreamwhite/50 group-hover:text-blush'
                  }`}
                >
                  {m.yearOrPhase}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Selected Milestone 3D Island Card */}
      {current && (
        <div className="relative z-20 w-full max-w-4xl my-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
            initial={{ opacity: 0, scale: 0.96, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.96, x: -20 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="glass-panel rounded-3xl p-6 sm:p-8 border border-blush/30 shadow-glow-blue flex flex-col md:flex-row gap-6 sm:gap-8 items-center backdrop-blur-xl"
          >
            {/* Visual Photo Card */}
            <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden bg-midnight-deep shadow-2xl relative group">
              <FallbackImage
                src={current.image}
                fallbackTitle={current.title}
                alt={current.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-deep/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-rosepink/80 backdrop-blur-md text-white shadow-glow-pink">
                {current.highlight}
              </div>
            </div>

            {/* Narrative Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs uppercase tracking-widest text-softgold font-bold">
                    {current.yearOrPhase}
                  </span>
                  <span className="text-white/30">•</span>
                  <div className="flex items-center gap-1 text-xs text-blush/80">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{current.date}</span>
                  </div>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-dreamwhite leading-snug mb-3">
                  {current.title}
                </h2>

                <p className="text-sm sm:text-base text-blush/90 leading-relaxed font-light mb-6 border-l-2 border-rosepink/50 pl-3.5">
                  "{current.caption}"
                </p>
              </div>

              {/* Milestone Step Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={handlePrevStep}
                  disabled={activeStep === 0}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeStep > 0
                      ? 'glass-pill border border-white/20 text-dreamwhite hover:text-softgold'
                      : 'text-white/20 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Moment</span>
                </button>

                <button
                  onClick={handleNextStep}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-rosepink to-softgold text-midnight hover:shadow-glow-pink transition-all active:scale-95"
                >
                  <span>
                    {activeStep === milestones.length - 1 ? 'Go to Secret Letter' : 'Next Moment'}
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
          className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-softgold glass-pill border border-softgold/40 hover:border-softgold shadow-glow-gold hover:scale-105 active:scale-95 transition-all"
        >
          <span>CONTINUE TO SECRET LETTER</span>
          <ArrowRight className="w-4 h-4 text-softgold group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
