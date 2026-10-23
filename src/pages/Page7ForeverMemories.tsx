import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RotateCcw, X, Star } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { MemoryPhoto } from '../types';
import { FallbackImage } from '../components/common/FallbackImage';
import { soundEngine } from '../utils/soundEffects';

export const Page7ForeverMemories: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);

  const memories = birthdayConfig.memories;
  const finale = birthdayConfig.finale;

  const handleSelectStarPhoto = (photo: MemoryPhoto) => {
    soundEngine.playSparkle();
    setSelectedPhoto(photo);
  };

  const handleRestart = () => {
    soundEngine.playSparkle();
    navigate('/');
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
          <Star className="w-3.5 h-3.5 text-champagne" />
          <span>MEMORY CONSTELLATION • FINALE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-dreamwhite tracking-tight leading-tight">
          Forever <span className="font-serif italic text-shimmer">Memories</span>
        </h1>
        <p className="font-serif italic text-base sm:text-lg text-blush/90 mt-2.5 max-w-lg mx-auto leading-relaxed">
          "{finale.quote1}"
        </p>
      </motion.header>

      {/* Floating Constellation Starfield of Memories (Layered Depth) */}
      <div className="relative z-20 w-full max-w-6xl my-4 py-2">
        {/* Constellation Grid (Modern Clean Editorial Framing) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
          {memories.map((photo, idx) => {
            const isChosen = selectedPhoto?.id === photo.id;
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => handleSelectStarPhoto(photo)}
                className={`group cursor-pointer rounded-2xl glass-editorial p-3 border transition-all duration-300 relative flex flex-col items-center text-center ${
                  isChosen
                    ? 'border-champagne shadow-[0_0_30px_rgba(244,212,154,0.45)] scale-105'
                    : 'border-white/10 hover:border-champagne/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                }`}
              >
                {/* Star glowing badge */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-ocean-deep border border-champagne/60 flex items-center justify-center shadow-md z-10">
                  <Sparkles className="w-3 h-3 text-champagne" />
                </div>

                {/* Thumbnail */}
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-black/50 mb-2.5 border border-white/10">
                  <FallbackImage
                    src={photo.url}
                    fallbackTitle={photo.title}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                </div>

                <p className="font-serif text-xs font-light text-dreamwhite line-clamp-1 group-hover:text-champagne transition-colors">
                  {photo.title}
                </p>
                <span className="text-[10px] text-blush/70 font-sans tracking-wider uppercase mt-0.5">
                  {photo.date || 'Moment'}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Selected Star Photo Floating Focus Stage */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 w-full max-w-2xl glass-editorial rounded-3xl p-6 sm:p-8 border border-champagne/40 shadow-[0_25px_60px_rgba(0,0,0,0.85)] my-4 backdrop-blur-2xl"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo preview"
              className="absolute top-4 right-4 p-2 rounded-full bg-white/[0.05] border border-white/15 text-dreamwhite/70 hover:text-white hover:border-champagne transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-2xl overflow-hidden flex-shrink-0 shadow-2xl border border-white/15">
                <FallbackImage
                  src={selectedPhoto.url}
                  fallbackTitle={selectedPhoto.title}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] font-sans font-medium uppercase tracking-[0.18em] text-champagne mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-champagne" />
                  <span>{selectedPhoto.tag || 'Squad Memory'}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-dreamwhite tracking-tight mb-1.5">
                  {selectedPhoto.title}
                </h3>
                <p className="font-serif italic text-sm sm:text-base text-blush/90 mb-2 leading-relaxed">
                  "{selectedPhoto.caption}"
                </p>
                {selectedPhoto.longDescription && (
                  <p className="text-xs text-dreamwhite/75 font-sans font-light leading-relaxed">
                    {selectedPhoto.longDescription}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emotional Closing Banner & Replay Action */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-xl mb-16 text-center flex flex-col items-center"
      >
        <div className="p-7 sm:p-9 rounded-3xl glass-editorial border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] w-full backdrop-blur-2xl mb-5">
          <p className="text-sm sm:text-base text-dreamwhite/90 leading-relaxed font-sans font-light mb-5">
            {finale.quote2}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-champagne/30 text-xs sm:text-sm font-sans font-medium tracking-[0.16em] uppercase text-champagne shadow-sm">
            <Sparkles className="w-4 h-4 text-champagne" />
            <span>{finale.closingText}</span>
          </div>
        </div>

        {/* Start The Surprise Again Button */}
        <button
          onClick={handleRestart}
          aria-label="Start the surprise adventure again from the beginning"
          className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-sans font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase text-dreamwhite bg-gradient-to-r from-ocean-light via-rosepink to-champagne shadow-[0_0_25px_rgba(244,127,175,0.4)] hover:shadow-[0_0_35px_rgba(244,212,154,0.5)] hover:scale-105 active:scale-95 transition-all"
        >
          <RotateCcw className="w-4 h-4 text-champagne group-hover:-rotate-90 transition-transform duration-300" />
          <span>START THE SURPRISE AGAIN</span>
        </button>
      </motion.footer>
    </div>
  );
};
