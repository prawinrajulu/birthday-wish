import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause, Calendar, MapPin, Maximize2 } from 'lucide-react';
import { MemoryPhoto } from '../../types';
import { FallbackImage } from '../common/FallbackImage';
import { soundEngine } from '../../utils/soundEffects';

interface MemoryModalProps {
  photo: MemoryPhoto | null;
  currentIndex: number;
  totalPhotos: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const MemoryModal: React.FC<MemoryModalProps> = ({
  photo,
  currentIndex,
  totalPhotos,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState(false);
  const [slideshowProgress, setSlideshowProgress] = useState(0);
  const slideshowTimerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (photo) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [photo]);

  // Slideshow timer logic
  useEffect(() => {
    if (!isPlayingSlideshow || !photo) {
      if (slideshowTimerRef.current) clearInterval(slideshowTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setSlideshowProgress(0);
      return;
    }

    const DURATION = 4500; // 4.5 seconds per slide
    const STEP = 50;
    let elapsed = 0;

    progressIntervalRef.current = window.setInterval(() => {
      elapsed += STEP;
      setSlideshowProgress((elapsed / DURATION) * 100);
    }, STEP);

    slideshowTimerRef.current = window.setInterval(() => {
      elapsed = 0;
      setSlideshowProgress(0);
      soundEngine.playSparkle();
      onNext();
    }, DURATION);

    return () => {
      if (slideshowTimerRef.current) clearInterval(slideshowTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlayingSlideshow, photo, onNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        soundEngine.playSparkle();
        onPrev();
      } else if (e.key === 'ArrowRight' && hasNext) {
        soundEngine.playSparkle();
        onNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlayingSlideshow((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, hasPrev, hasNext, onClose, onPrev, onNext]);

  if (!photo) return null;

  return createPortal(
    <AnimatePresence>
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="cinematic-photo-title"
        className="fixed inset-0 z-[100] flex flex-col justify-between items-center bg-black/90 backdrop-blur-2xl p-4 sm:p-8 select-none"
      >
        {/* Top Floating Control Bar */}
        <div className="w-full max-w-6xl flex items-center justify-between z-20 pt-2 pb-4">
          {/* Photo Counter */}
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full glass-pill border border-white/15 text-xs font-mono font-semibold text-softgold tracking-widest shadow-sm">
              {String(currentIndex + 1).padStart(2, '0')} / {String(totalPhotos).padStart(2, '0')}
            </span>

            <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-semibold text-blush/80 bg-white/5 border border-white/10 tracking-wider uppercase">
              {photo.category}
            </span>
          </div>

          {/* Action Buttons: Slideshow & Close */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundEngine.playSparkle();
                setIsPlayingSlideshow(!isPlayingSlideshow);
              }}
              title="Toggle automatic slideshow (Spacebar)"
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border ${
                isPlayingSlideshow
                  ? 'bg-rosepink text-white border-rosepink shadow-glow-pink'
                  : 'glass-pill border-white/20 text-dreamwhite/90 hover:text-softgold hover:border-softgold/50'
              }`}
            >
              {isPlayingSlideshow ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Slideshow</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Auto Slideshow</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                soundEngine.playSparkle();
                onClose();
              }}
              aria-label="Close photo viewer"
              className="p-2.5 rounded-full glass-pill border border-white/20 text-dreamwhite/80 hover:text-white hover:border-softgold hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slideshow Progress Bar */}
        {isPlayingSlideshow && (
          <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-30">
            <div
              className="h-full bg-gradient-to-r from-rosepink to-softgold transition-all duration-75"
              style={{ width: `${slideshowProgress}%` }}
            />
          </div>
        )}

        {/* Main Central Stage: Large, Majestic Photograph */}
        <div className="relative w-full flex-1 flex items-center justify-center max-w-6xl my-auto px-2 sm:px-12 overflow-hidden">
          {/* Previous Arrow Button */}
          {hasPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundEngine.playSparkle();
                onPrev();
              }}
              aria-label="Previous photograph"
              className="absolute left-2 sm:left-4 z-20 p-3 sm:p-4 rounded-full glass-panel border border-white/20 text-dreamwhite hover:text-softgold hover:border-softgold/80 hover:scale-110 active:scale-95 transition-all shadow-2xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Large Photo Frame */}
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative max-h-[68vh] w-auto max-w-full flex items-center justify-center rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)] border border-white/15 bg-black/60"
          >
            <FallbackImage
              src={photo.url}
              fallbackTitle={photo.title}
              alt={photo.title}
              className="max-h-[68vh] w-auto max-w-full object-contain"
            />
          </motion.div>

          {/* Next Arrow Button */}
          {hasNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundEngine.playSparkle();
                onNext();
              }}
              aria-label="Next photograph"
              className="absolute right-2 sm:right-4 z-20 p-3 sm:p-4 rounded-full glass-panel border border-white/20 text-dreamwhite hover:text-softgold hover:border-softgold/80 hover:scale-110 active:scale-95 transition-all shadow-2xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Bottom Clean Caption & Metadata Panel */}
        <motion.div
          key={`caption-${photo.id}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="w-full max-w-4xl text-center z-20 pt-3 pb-2"
        >
          <div className="glass-panel px-6 py-4 sm:px-8 sm:py-5 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
            <h2 id="cinematic-photo-title" className="font-serif text-2xl sm:text-3xl font-bold text-dreamwhite tracking-wide mb-1.5">
              {photo.title}
            </h2>

            <p className="text-sm sm:text-base font-sans italic text-softgold font-light leading-relaxed max-w-2xl mx-auto mb-2.5">
              "{photo.caption}"
            </p>

            {photo.longDescription && (
              <p className="text-xs sm:text-sm text-dreamwhite/75 font-sans font-light max-w-2xl mx-auto leading-relaxed mb-3">
                {photo.longDescription}
              </p>
            )}

            <div className="flex items-center justify-center gap-4 text-xs text-dreamwhite/50 pt-2 border-t border-white/10">
              {photo.date && (
                <span className="flex items-center gap-1.5 text-softgold/80">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{photo.date}</span>
                </span>
              )}
              {photo.location && (
                <span className="flex items-center gap-1.5 text-lavender/80">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{photo.location}</span>
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
