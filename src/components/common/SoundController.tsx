import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';

export const SoundController: React.FC = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    // Check initial state
    setIsMuted(soundEngine.getMuted());
    setIsMusicPlaying(soundEngine.getAmbientPlaying());
  }, []);

  const handleToggleMusic = () => {
    soundEngine.playSparkle();
    const playing = soundEngine.toggleAmbientMusic();
    setIsMusicPlaying(playing);
  };

  const handleToggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundEngine.playSparkle();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
  };

  return (
    <aside 
      aria-label="Sound Controls"
      className="fixed top-5 right-5 z-50 flex items-center gap-2"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      {/* Volume slider (collapsible) */}
      <div
        className={`transition-all duration-300 overflow-hidden flex items-center glass-pill px-3 py-1.5 rounded-full ${
          showSlider ? 'max-w-[120px] opacity-100 mr-1' : 'max-w-0 opacity-0 px-0'
        }`}
      >
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          aria-label="Master audio volume"
          className="w-20 h-1.5 bg-royal-light rounded-lg appearance-none cursor-pointer accent-rosepink"
        />
      </div>

      {/* Ambient Music Button */}
      <button
        onClick={handleToggleMusic}
        title={isMusicPlaying ? "Pause Dreamy Ambient Music" : "Play Dreamy Ambient Music"}
        className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel transition-all duration-300 text-xs font-medium border ${
          isMusicPlaying
            ? 'border-rosepink text-softgold shadow-glow-pink'
            : 'border-white/15 text-dreamwhite/70 hover:text-dreamwhite hover:border-blush/40'
        }`}
      >
        <Disc className={`w-4 h-4 ${isMusicPlaying ? 'animate-spin text-rosepink' : ''}`} />
        <span className="hidden sm:inline">
          {isMusicPlaying ? 'Dream Melody' : 'Ambient Music'}
        </span>
        {isMusicPlaying && (
          <span className="flex gap-0.5 items-end h-3 ml-1">
            <span className="w-0.5 h-full bg-rosepink animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 h-2/3 bg-softgold animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 h-full bg-lavender animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        )}
      </button>

      {/* Mute/Unmute Master Toggle */}
      <button
        onClick={handleToggleMute}
        title={isMuted ? "Unmute All Sounds" : "Mute Sounds"}
        aria-label={isMuted ? "Unmute All Sounds" : "Mute Sounds"}
        className="p-2.5 rounded-full glass-panel border border-white/15 text-dreamwhite/80 hover:text-softgold hover:border-softgold/40 transition-all duration-300 shadow-sm"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-rosepink" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
};
