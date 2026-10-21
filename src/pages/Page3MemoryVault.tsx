import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Sparkles, 
  Calendar, 
  MapPin, 
  ArrowRight,
  Camera,
  Layers
} from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { FallbackImage } from '../components/common/FallbackImage';
import { MemoryModal } from '../components/gallery/MemoryModal';
import { soundEngine } from '../utils/soundEffects';

export const Page3MemoryVault: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedModalIndex, setSelectedModalIndex] = useState<number | null>(null);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  
  const stageRef = useRef<HTMLDivElement>(null);
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
      setCurrentIndex(safeCurrentIndex - 1);
    }
  }, [safeCurrentIndex]);

  const handleNext = useCallback(() => {
    if (safeCurrentIndex < memories.length - 1) {
      soundEngine.playSparkle();
      setCurrentIndex(safeCurrentIndex + 1);
    }
  }, [safeCurrentIndex, memories.length]);

  const handleSelectIndex = (idx: number) => {
    if (idx !== safeCurrentIndex) {
      soundEngine.playSparkle();
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

  // Keyboard navigation when modal is not active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedModalIndex !== null) return; // Modal handles its own keys
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleOpenModal(safeCurrentIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedModalIndex, safeCurrentIndex, handlePrev, handleNext]);

  // Interactive 3D mouse tilt tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    setMouseTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between items-center px-3 sm:px-6 py-6 overflow-x-hidden select-none">
      
      {/* 1. Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 text-center max-w-3xl mt-2 mb-3"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs text-softgold mb-2.5 border border-softgold/30 shadow-glow-gold">
          <Camera className="w-3.5 h-3.5 text-rosepink animate-pulse" />
          <span className="font-semibold tracking-wider">CINEMATIC FRIENDSHIP VAULT</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dreamwhite tracking-tight leading-tight">
          Our Memories, <span className="text-shimmer">Our Madness 📸</span>
        </h1>

        <p className="text-xs sm:text-sm text-blush/90 mt-2 font-sans font-light max-w-lg mx-auto">
          Swipe, tilt, and explore the real unposed moments, chaotic adventures, and stories that make our friendship one of a kind.
        </p>

        {/* Counter Display */}
        <div className="mt-3 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-midnight-deep/80 border border-white/10 shadow-sm backdrop-blur-md">
          <span className="text-xs font-mono font-bold text-softgold tracking-widest">
            {String(safeCurrentIndex + 1).padStart(2, '0')} / {String(memories.length).padStart(2, '0')}
          </span>
          <span className="w-1 h-1 rounded-full bg-rosepink" />
          <span className="text-xs text-dreamwhite/70">
            All Memories
          </span>
        </div>
      </motion.div>

      {/* 3. CINEMATIC 3D FLOATING PHOTO STAGE */}
      <div 
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-20 w-full max-w-6xl my-4 py-2 flex flex-col items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        {/* Navigation Glass Chevrons (Floating left & right) */}
        <button
          onClick={handlePrev}
          disabled={safeCurrentIndex === 0}
          aria-label="Previous photograph"
          className={`absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-full glass-panel border border-white/20 text-dreamwhite shadow-glow-blue transition-all duration-300 ${
            safeCurrentIndex === 0 
              ? 'opacity-20 cursor-not-allowed' 
              : 'hover:scale-110 hover:border-softgold hover:text-softgold active:scale-95'
          }`}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handleNext}
          disabled={safeCurrentIndex === memories.length - 1}
          aria-label="Next photograph"
          className={`absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 rounded-full glass-panel border border-white/20 text-dreamwhite shadow-glow-blue transition-all duration-300 ${
            safeCurrentIndex === memories.length - 1 
              ? 'opacity-20 cursor-not-allowed' 
              : 'hover:scale-110 hover:border-softgold hover:text-softgold active:scale-95'
          }`}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* 3D Floating Carousel Area */}
        <div 
          className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px] flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {memories.map((photo, index) => {
            const diff = index - safeCurrentIndex;
            // Display up to 5 photos: center, 2 left, 2 right
            if (Math.abs(diff) > 2) return null;

            const isCenter = diff === 0;
            const isLeft = diff < 0;
            const isRight = diff > 0;

            // Compute 3D transforms based on depth
            let translateX = 0;
            let translateZ = 0;
            let rotateY = 0;
            let rotateX = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (isCenter) {
              translateX = 0;
              translateZ = 40;
              rotateY = mouseTilt.x * 9;
              rotateX = -mouseTilt.y * 7;
              scale = 1;
              opacity = 1;
              zIndex = 30;
            } else if (Math.abs(diff) === 1) {
              translateX = isLeft ? -58 : 58;
              translateZ = -140;
              rotateY = isLeft ? 26 : -26;
              scale = 0.82;
              opacity = 0.6;
              zIndex = 20;
            } else if (Math.abs(diff) === 2) {
              translateX = isLeft ? -105 : 105;
              translateZ = -280;
              rotateY = isLeft ? 38 : -38;
              scale = 0.68;
              opacity = 0.25;
              zIndex = 10;
            }

            return (
              <motion.div
                key={photo.id}
                animate={{
                  x: `${translateX}%`,
                  z: translateZ,
                  rotateY: rotateY,
                  rotateX: rotateX,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 28,
                }}
                drag={isCenter ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -40) handleNext();
                  else if (info.offset.x > 40) handlePrev();
                }}
                onClick={() => {
                  if (isCenter) {
                    handleOpenModal(index);
                  } else {
                    handleSelectIndex(index);
                  }
                }}
                style={{
                  zIndex,
                  transformStyle: 'preserve-3d',
                }}
                className={`absolute w-[280px] sm:w-[420px] md:w-[540px] lg:w-[640px] h-[240px] sm:h-[340px] md:h-[400px] lg:h-[440px] rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300 ${
                  isCenter
                    ? 'shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(244,91,154,0.35)] ring-1 ring-white/30 hover:ring-rosepink/80'
                    : 'shadow-[0_15px_30px_rgba(0,0,0,0.7)] ring-1 ring-white/10 hover:opacity-80'
                }`}
              >
                {/* Image Container with natural aspect framing & dark backdrop */}
                <div className="relative w-full h-full bg-[#030914] flex items-center justify-center overflow-hidden">
                  <FallbackImage
                    src={photo.url}
                    fallbackTitle={photo.title}
                    alt={photo.title}
                    className="w-full h-full object-contain pointer-events-none"
                  />

                  {/* Gentle gradient vignette to blend edges cleanly */}
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-deep/70 via-transparent to-midnight-deep/20 pointer-events-none" />

                  {/* Clean category badge on active photo */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-midnight-deep/80 backdrop-blur-md text-blush border border-blush/30 flex items-center gap-1.5 shadow-sm">
                    <Camera className="w-3 h-3 text-softgold" />
                    <span>{photo.category}</span>
                  </div>

                  {/* Zoom hint button overlay on center photo hover */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-midnight-deep/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="px-5 py-2.5 rounded-full glass-panel border border-softgold/60 text-softgold font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-glow-gold transform scale-95 hover:scale-105 transition-transform">
                        <Maximize2 className="w-4 h-4 text-softgold" />
                        <span>OPEN FULLSCREEN VIEWER 🔍</span>
                      </div>
                    </div>
                  )}

                  {/* Center photo floor reflection glow */}
                  {isCenter && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-rosepink/25 blur-xl rounded-full pointer-events-none" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 4. Active Memory Details Card */}
        {activeMemory && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMemory.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-2xl mt-4 px-4 py-4 rounded-2xl glass-panel border border-white/10 backdrop-blur-xl text-center shadow-glow-blue flex flex-col items-center"
            >
              <div className="flex items-center gap-2 text-[11px] font-medium text-softgold mb-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-softgold" />
                  {activeMemory.date || 'Memory'}
                </span>
                {activeMemory.location && (
                  <>
                    <span className="text-white/30">•</span>
                    <span className="flex items-center gap-1 text-lavender">
                      <MapPin className="w-3 h-3 text-lavender" />
                      {activeMemory.location}
                    </span>
                  </>
                )}
              </div>

              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-dreamwhite tracking-tight">
                {activeMemory.title}
              </h2>

              <p className="text-xs sm:text-sm text-blush/90 mt-1.5 max-w-lg mx-auto font-sans font-light leading-relaxed">
                "{activeMemory.caption}"
              </p>

              <button
                onClick={() => handleOpenModal(safeCurrentIndex)}
                className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-softgold/90 hover:text-softgold hover:underline transition-colors"
              >
                <Maximize2 className="w-3 h-3 text-rosepink" />
                <span>Click photo or tap here to expand in high-res slideshow</span>
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* 5. Elegant Filmstrip Thumbnail Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-20 w-full max-w-4xl my-3 px-2"
      >
        <div className="flex items-center gap-2 mb-2 text-xs text-dreamwhite/60 px-1">
          <Layers className="w-3.5 h-3.5 text-softgold" />
          <span className="font-medium tracking-wide">PHOTO REEL ({memories.length})</span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto py-2 px-3 rounded-2xl bg-midnight-deep/70 border border-white/10 backdrop-blur-xl shadow-inner scrollbar-thin">
          {memories.map((photo, idx) => {
            const isSelected = idx === safeCurrentIndex;
            return (
              <button
                key={photo.id}
                ref={(el) => (thumbnailRefs.current[idx] = el)}
                onClick={() => handleSelectIndex(idx)}
                aria-label={`Select memory ${idx + 1}: ${photo.title}`}
                className={`relative flex-shrink-0 w-16 sm:w-20 h-11 sm:h-14 rounded-lg overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? 'ring-2 ring-rosepink shadow-glow-pink scale-105 opacity-100 z-10'
                    : 'opacity-40 hover:opacity-85 hover:scale-100 ring-1 ring-white/10'
                }`}
              >
                <FallbackImage
                  src={photo.url}
                  fallbackTitle={photo.title}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-midnight-deep/80 text-[9px] font-mono font-bold text-center py-0.5 text-dreamwhite/80">
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* 6. Chapter Progress & Next Step CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-20 w-full max-w-xl my-6 text-center"
      >
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-softgold/30 shadow-glow-gold relative overflow-hidden backdrop-blur-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rosepink/20 border border-rosepink/30 text-xs text-softgold font-bold tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CHAPTER 03 COMPLETE</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dreamwhite mb-2">
            Ready for the Next Chapter?
          </h2>

          <p className="text-xs sm:text-sm text-blush/90 leading-relaxed font-sans mb-5 max-w-md mx-auto">
            "More inside jokes, zero normal selfies, and a lifetime supply of friendship adventures still waiting to unfold."
          </p>

          <button
            onClick={() => {
              soundEngine.playSparkle();
              navigate('/our-story');
            }}
            aria-label="Continue to our friendship story timeline"
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-bold text-sm sm:text-base text-dreamwhite bg-gradient-to-r from-rosepink via-rosepink-hover to-royal-light shadow-glow-pink hover:shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <span>CONTINUE OUR STORY →</span>
            <ArrowRight className="w-4 h-4 text-softgold group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* 7. CINEMATIC FULL-SCREEN PHOTO VIEWER MODAL */}
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
