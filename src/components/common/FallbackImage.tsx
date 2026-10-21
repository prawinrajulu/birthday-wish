import React, { useState, useEffect } from 'react';
import { Camera, ImageOff } from 'lucide-react';

interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  className?: string;
}

export const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  alt = "Friendship memory photograph",
  fallbackTitle = "Special Friendship Memory",
  className = "",
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasTriedSvg, setHasTriedSvg] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasTriedSvg(false);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const handleError = () => {
    // If a .jpg failed, try .svg fallback before showing the placeholder card
    if (currentSrc && currentSrc.endsWith('.jpg') && !hasTriedSvg) {
      setHasTriedSvg(true);
      setCurrentSrc(currentSrc.replace(/\.jpg$/, '.svg'));
    } else {
      setHasError(true);
    }
  };

  if (hasError || !currentSrc) {
    return (
      <div className={`relative flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#071426] via-[#0E223D] to-[#163B70]/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl text-center ${className}`}>
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/15 flex items-center justify-center mb-4 text-softgold">
          <Camera className="w-7 h-7 opacity-80" />
        </div>

        <p className="font-sans text-sm sm:text-base font-semibold text-dreamwhite mb-1.5">
          {fallbackTitle}
        </p>

        <p className="font-sans text-xs text-blush/70 max-w-[85%] mb-2">
          Add your real photo to:
        </p>
        <code className="text-[11px] font-mono text-softgold/90 bg-black/40 px-3 py-1 rounded-md border border-white/10">
          {src || 'public/images/memories/memory-XX.jpg'}
        </code>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-midnight-deep/90 animate-pulse gap-2">
          <Camera className="w-8 h-8 text-softgold/40 animate-pulse" />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
