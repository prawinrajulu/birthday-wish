import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Camera
} from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { FallbackImage } from '../components/common/FallbackImage';
import { MemoryModal } from '../components/gallery/MemoryModal';
import { soundEngine } from '../utils/soundEffects';

export const Page3MemoryVault: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedModalIndex, setSelectedModalIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(1);
  
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const memories = birthdayConfig.memories;

  // Ensure currentIndex is always valid
  const safeCurrentIndex = Math.min(Math.max(0, currentIndex), Math.max(0, memories.length - 1));
  const activeMemory = memories[safeCurrentIndex];

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    const activeThumb = thumbnailRefs.current[safeCurrentIndex];
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [safeCurrentIndex]);

  const handlePrev = useCallback(() => {
    if (safeCurrentIndex > 0) {
      soundEngine.playSparkle();
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [safeCurrentIndex]);

  const handleNext = useCallback(() => {
    if (safeCurrentIndex < memories.length - 1) {
      soundEngine.playSparkle();
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [safeCurrentIndex, memories.length]);

  const handleSelectIndex = (idx: number) => {
    if (idx !== safeCurrentIndex) {
      soundEngine.playSparkle();
      setDirection(idx > safeCurrentIndex ? 1 : -1);
      setCurrentIndex(idx);
    }
  };

  const handleOpenModal = (index: number) => {
    soundEngine.playSparkle();
    setSelectedModalIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedModalIndex(null);
  };

  // Keyboard arrow navigation when modal is not active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedModalIndex !== null) return; // Modal handles its own keys
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();
        handleNext();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleOpenModal(safeCurrentIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [selectedModalIndex, safeCurrentIndex, handlePrev, handleNext]);

  return (
    <div className="relative w-full h-[100dvh] min-h-[600px] flex flex-col justify-between items-center px-3 sm:px-6 pt-3 sm:pt-4 pb-24 overflow-hidden select-none">
      
      {/* 1. Subtle Minimal Top Bar */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 w-full max-w-6xl flex items-center justify-between px-2 sm:px-4 shrink-0"
      >
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-rosepink" />
          <span className="font-serif italic text-base sm:text-xl text-dreamwhite/90 tracking-tight">
            Memory Vault
          </span>
        </div>

        {/* Minimal Photo Counter & Fullscreen Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-ocean-deep/80 border border-white/10 shadow-sm backdrop-blur-md">
            <span className="text-xs font-mono font-medium text-champagne tracking-widest">
              {String(safeCurrentIndex + 1).padStart(2, '0')} / {String(memories.length).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={() => handleOpenModal(safeCurrentIndex)}
            title="View in High-Resolution Viewer"
            aria-label="View in High-Resolution Viewer"
            className="p-1.5 sm:p-2 rounded-full bg-white/[0.04] border border-white/15 text-dreamwhite/80 hover:text-champagne hover:border-champagne/40 hover:scale-105 active:scale-95 transition-all shadow-sm"
          >
            <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-champagne" />
          </button>
        </div>
      </motion.header>

      {/* 2. PURE IMAGE-ONLY PHOTOGRAPH PRESENTATION STAGE */}
      <div className="relative z-20 w-full max-w-6xl flex-1 flex items-center justify-center min-h-0 my-auto px-2 sm:px-12">
        {/* Previous Photograph Button */}
        <button
          onClick={handlePrev}
          disabled={safeCurrentIndex === 0}
          aria-label="Previous photograph"
          className={`absolute left-1 sm:left-3 lg:left-5 z-40 p-3 sm:p-4 rounded-full glass-panel border border-white/20 text-dreamwhite shadow-glow-blue transition-all duration-300 ${
            safeCurrentIndex === 0 
              ? 'opacity-20 cursor-not-allowed' 
              : 'hover:scale-110 hover:border-softgold hover:text-softgold active:scale-95 cursor-pointer'
          }`}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Center Photograph with Cinematic Fade / Subtle Zoom Animation */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={safeCurrentIndex}
              custom={direction}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -40) handleNext();
                else if (info.offset.x > 40) handlePrev();
              }}
              onClick={() => handleOpenModal(safeCurrentIndex)}
              className="relative max-h-full max-w-full flex items-center justify-center cursor-pointer group"
            >
              <FallbackImage
                src={activeMemory.url}
                fallbackTitle={activeMemory.title}
                alt=""
                className="max-h-[60vh] sm:max-h-[68vh] md:max-h-[72vh] w-auto max-w-full object-contain rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] border border-white/10 pointer-events-none"
              />

              {/* Ambient bottom floor glow */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-rosepink/20 blur-xl rounded-full pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Photograph Button */}
        <button
          onClick={handleNext}
          disabled={safeCurrentIndex === memories.length - 1}
          aria-label="Next photograph"
          className={`absolute right-1 sm:right-3 lg:right-5 z-40 p-3 sm:p-4 rounded-full glass-panel border border-white/20 text-dreamwhite shadow-glow-blue transition-all duration-300 ${
            safeCurrentIndex === memories.length - 1 
              ? 'opacity-20 cursor-not-allowed' 
              : 'hover:scale-110 hover:border-softgold hover:text-softgold active:scale-95 cursor-pointer'
          }`}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* 3. Compact Bottom Filmstrip Thumbnail Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative z-20 w-full max-w-4xl px-2 shrink-0 mb-1"
      >
        <div className="flex items-center gap-2.5 overflow-x-auto py-2 px-3 rounded-2xl bg-ocean-deep/60 border border-white/10 backdrop-blur-2xl shadow-inner scrollbar-thin">
          {memories.map((photo, idx) => {
            const isSelected = idx === safeCurrentIndex;
            return (
              <button
                key={photo.id}
                ref={(el) => (thumbnailRefs.current[idx] = el)}
                onClick={() => handleSelectIndex(idx)}
                aria-label={`Select photo ${idx + 1}`}
                className={`relative flex-shrink-0 w-14 sm:w-16 h-10 sm:h-12 rounded-xl overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? 'ring-2 ring-champagne shadow-[0_0_16px_rgba(244,212,154,0.45)] scale-105 opacity-100 z-10'
                    : 'opacity-40 hover:opacity-85 hover:scale-100 ring-1 ring-white/10'
                }`}
              >
                <FallbackImage
                  src={photo.url}
                  fallbackTitle={photo.title}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-ocean-deep/90 text-[9px] font-mono font-bold text-center py-0.5 text-dreamwhite/90">
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* 4. Full-Screen High-Resolution Image-Only Viewer */}
      <MemoryModal
        photo={selectedModalIndex !== null ? memories[selectedModalIndex] : null}
        currentIndex={selectedModalIndex ?? 0}
        totalPhotos={memories.length}
        onClose={handleCloseModal}
        onPrev={() => {
          if (selectedModalIndex !== null && selectedModalIndex > 0) {
            setSelectedModalIndex(selectedModalIndex - 1);
          }
        }}
        onNext={() => {
          if (selectedModalIndex !== null && selectedModalIndex < memories.length - 1) {
            setSelectedModalIndex(selectedModalIndex + 1);
          }
        }}
        hasPrev={selectedModalIndex !== null && selectedModalIndex > 0}
        hasNext={selectedModalIndex !== null && selectedModalIndex < memories.length - 1}
      />
    </div>
  );
};
