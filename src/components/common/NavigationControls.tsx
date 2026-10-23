import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, Home } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';

export const ROUTES = [
  { path: '/', label: 'The Invitation', short: 'Invitation' },
  { path: '/secret-lock', label: 'The Secret Lock', short: 'Lock' },
  { path: '/memory-vault', label: 'Memory Vault', short: 'Vault' },
  { path: '/our-story', label: 'Friendship Story', short: 'Timeline' },
  { path: '/secret-letter', label: 'The Secret Letter', short: 'Letter' },
  { path: '/birthday-surprise', label: 'Birthday Surprise', short: 'Surprise' },
  { path: '/forever-memories', label: 'Forever Memories', short: 'Finale' },
];

export const NavigationControls: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = ROUTES.findIndex((r) => r.path === location.pathname);
  const activeIndex = currentIndex !== -1 ? currentIndex : 0;

  const prevRoute = activeIndex > 0 ? ROUTES[activeIndex - 1] : null;
  const nextRoute = activeIndex < ROUTES.length - 1 ? ROUTES[activeIndex + 1] : null;

  const goTo = (path: string) => {
    soundEngine.playSparkle();
    navigate(path);
  };

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      // On memory vault page, arrow keys are reserved for photo slideshow navigation
      if (location.pathname === '/memory-vault') {
        return;
      }
      if (e.key === 'ArrowRight' && nextRoute) {
        goTo(nextRoute.path);
      } else if (e.key === 'ArrowLeft' && prevRoute) {
        goTo(prevRoute.path);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, prevRoute, nextRoute, location.pathname]);

  return (
    <nav 
      aria-label="Story Progress and Navigation"
      className="fixed bottom-6 left-0 right-0 z-40 flex justify-center items-center px-4 pointer-events-none"
    >
      <div className="flex items-center gap-2 sm:gap-4 px-4 py-2 rounded-full glass-editorial border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] pointer-events-auto transition-all duration-300 backdrop-blur-2xl">
        {/* Home / Restart */}
        <button
          onClick={() => goTo('/')}
          title="Back to Beginning"
          aria-label="Back to Beginning"
          className="p-1.5 rounded-full text-dreamwhite/50 hover:text-champagne hover:bg-white/[0.06] transition-colors"
        >
          <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        <div className="h-3.5 w-px bg-white/10" />

        {/* Previous Button */}
        <button
          onClick={() => prevRoute && goTo(prevRoute.path)}
          disabled={!prevRoute}
          aria-label="Previous scene"
          className={`flex items-center gap-1 text-[11px] font-sans tracking-wider uppercase px-2 py-1 rounded-full transition-all ${
            prevRoute
              ? 'text-dreamwhite/70 hover:text-champagne active:scale-95'
              : 'text-dreamwhite/20 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Progress Tracker (e.g. "SCENE 3 OF 7") */}
        <div className="flex flex-col items-center px-2">
          <div className="flex items-center gap-1.5 mb-1">
            {ROUTES.map((route, idx) => (
              <button
                key={route.path}
                onClick={() => goTo(route.path)}
                title={`${route.label} (${idx + 1}/${ROUTES.length})`}
                aria-label={`Go to ${route.label}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeIndex
                    ? 'w-5 h-1.5 bg-gradient-to-r from-rosepink to-champagne shadow-[0_0_10px_rgba(244,212,154,0.5)]'
                    : idx < activeIndex
                    ? 'w-1.5 h-1.5 bg-blush/60 hover:bg-blush'
                    : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          <span className="text-[9px] uppercase font-mono tracking-[0.2em] text-champagne/75">
            SCENE {activeIndex + 1} / {ROUTES.length}
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={() => nextRoute && goTo(nextRoute.path)}
          disabled={!nextRoute}
          aria-label="Next scene"
          className={`flex items-center gap-1 text-[11px] font-sans font-medium tracking-wider uppercase px-2 py-1 rounded-full transition-all ${
            nextRoute
              ? 'text-champagne hover:text-white active:scale-95'
              : 'text-dreamwhite/20 cursor-not-allowed'
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </nav>
  );
};
