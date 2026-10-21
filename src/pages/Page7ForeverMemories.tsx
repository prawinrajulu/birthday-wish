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
    <div className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 py-8 overflow-x-hidden">
      {/* Top Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 text-center max-w-2xl mt-4 mb-2"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs text-softgold mb-2 border border-softgold/30 shadow-glow-gold">
          <Star className="w-3.5 h-3.5 text-softgold animate-pulse" />
          <span>CELESTIAL CONSTELLATION</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dreamwhite leading-tight">
          Forever <span className="text-shimmer">Memories</span>
        </h1>
        <p className="font-serif italic text-base sm:text-lg text-blush/90 mt-2 max-w-lg mx-auto">
          "{finale.quote1}"
        </p>
      </motion.div>

      {/* Floating Constellation Starfield of Memories */}
      <div className="relative z-20 w-full max-w-5xl my-4 py-4">
        {/* Constellation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {memories.map((photo, idx) => {
            const isChosen = selectedPhoto?.id === photo.id;
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.08, y: -6 }}
                onClick={() => handleSelectStarPhoto(photo)}
                className={`group cursor-pointer rounded-2xl glass-panel p-2.5 border transition-all duration-300 relative flex flex-col items-center text-center ${
                  isChosen
                    ? 'border-softgold shadow-glow-gold scale-105'
                    : 'border-blush/30 hover:border-softgold/50 shadow-glow-blue'
                }`}
              >
                {/* Star glowing halo */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-softgold/20 border border-softgold/60 flex items-center justify-center shadow-glow-gold z-10">
                  <Sparkles className="w-3 h-3 text-softgold" />
                </div>

                {/* Thumbnail */}
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-midnight-deep mb-2">
                  <FallbackImage
                    src={photo.url}
                    fallbackTitle={photo.title}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <p className="font-serif text-xs font-semibold text-dreamwhite line-clamp-1 group-hover:text-softgold transition-colors">
                  {photo.title}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Selected Star Photo Floating Focus Panel */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-30 w-full max-w-xl glass-panel rounded-3xl p-6 border border-softgold/40 shadow-glow-pink my-3 backdrop-blur-2xl"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo preview"
              className="absolute top-4 right-4 p-1.5 rounded-full bg-midnight/80 border border-white/20 text-dreamwhite/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row gap-5 items-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border border-blush/30">
                <FallbackImage
                  src={selectedPhoto.url}
                  fallbackTitle={selectedPhoto.title}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-softgold font-semibold mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-softgold animate-pulse" />
                  <span>{selectedPhoto.tag || 'Squad Memory'}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-dreamwhite mb-1">
                  {selectedPhoto.title}
                </h3>
                <p className="font-serif italic text-sm text-blush/90 mb-2">
                  "{selectedPhoto.caption}"
                </p>
                {selectedPhoto.longDescription && (
                  <p className="text-xs text-dreamwhite/75 font-light">
                    {selectedPhoto.longDescription}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emotional Closing Banner & Restart Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-20 w-full max-w-xl mb-16 text-center flex flex-col items-center"
      >
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blush/30 shadow-glow-blue w-full backdrop-blur-xl mb-4">
          <p className="text-sm sm:text-base text-dreamwhite/90 leading-relaxed font-light mb-4">
            {finale.quote2}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rosepink/15 border border-rosepink/30 text-xs sm:text-sm font-bold text-blush tracking-wider shadow-glow-pink">
            <Sparkles className="w-4 h-4 text-softgold animate-pulse" />
            <span>{finale.closingText}</span>
          </div>
        </div>

        {/* Start The Surprise Again Button */}
        <button
          onClick={handleRestart}
          aria-label="Start the surprise adventure again from the beginning"
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-dreamwhite bg-gradient-to-r from-royal-light via-rosepink to-softgold shadow-glow-pink hover:shadow-glow-gold hover:scale-105 active:scale-95 transition-all"
        >
          <RotateCcw className="w-4 h-4 text-softgold group-hover:-rotate-90 transition-transform duration-300" />
          <span>START THE SURPRISE AGAIN</span>
        </button>
      </motion.div>
    </div>
  );
};
