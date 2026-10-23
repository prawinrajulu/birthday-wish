import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
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
        className="fixed inset-0 z-[100] flex flex-col justify-between items-center bg-black/92 backdrop-blur-2xl p-4 sm:p-6 select-none"
      >
        {/* Top Floating Control Bar */}
        <div className="w-full max-w-6xl flex items-center justify-between z-20 pt-1 pb-2">
          {/* Photo Counter */}
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono font-medium text-champagne tracking-widest shadow-sm">
              {String(currentIndex + 1).padStart(2, '0')} / {String(totalPhotos).padStart(2, '0')}
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
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans font-medium tracking-wider transition-all duration-300 border ${
                isPlayingSlideshow
                  ? 'bg-rosepink text-white border-rosepink shadow-[0_0_20px_rgba(244,127,175,0.5)]'
                  : 'bg-white/[0.04] border-white/15 text-dreamwhite/90 hover:text-champagne hover:border-champagne/40'
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
              className="p-2.5 rounded-full bg-white/[0.04] border border-white/15 text-dreamwhite/80 hover:text-white hover:border-champagne hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slideshow Progress Bar */}
        {isPlayingSlideshow && (
          <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-30">
            <div
              className="h-full bg-gradient-to-r from-rosepink to-champagne transition-all duration-75"
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
              className="absolute left-2 sm:left-4 z-20 p-3.5 sm:p-4 rounded-full bg-black/50 border border-white/15 text-dreamwhite hover:text-champagne hover:border-champagne/70 hover:scale-110 active:scale-95 transition-all shadow-2xl backdrop-blur-md"
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
            className="relative max-h-[85vh] sm:max-h-[88vh] w-auto max-w-full flex items-center justify-center rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-white/10 bg-black/70"
          >
            <FallbackImage
              src={photo.url}
              fallbackTitle={photo.title}
              alt={photo.title}
              className="max-h-[85vh] sm:max-h-[88vh] w-auto max-w-full object-contain"
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
              className="absolute right-2 sm:right-4 z-20 p-3.5 sm:p-4 rounded-full bg-black/50 border border-white/15 text-dreamwhite hover:text-champagne hover:border-champagne/70 hover:scale-110 active:scale-95 transition-all shadow-2xl backdrop-blur-md"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
