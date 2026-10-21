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
      if (e.key === 'ArrowRight' && nextRoute) {
        goTo(nextRoute.path);
      } else if (e.key === 'ArrowLeft' && prevRoute) {
        goTo(prevRoute.path);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, prevRoute, nextRoute]);

  return (
    <nav 
      aria-label="Story Progress and Navigation"
      className="fixed bottom-6 left-0 right-0 z-40 flex justify-center items-center px-4 pointer-events-none"
    >
      <div className="flex items-center gap-2 sm:gap-4 px-4 py-2.5 rounded-full glass-panel border border-blush/20 shadow-glow-blue pointer-events-auto transition-all duration-300">
        {/* Home / Restart */}
        <button
          onClick={() => goTo('/')}
          title="Back to Beginning"
          aria-label="Back to Beginning"
          className="p-1.5 rounded-full text-dreamwhite/60 hover:text-softgold hover:bg-white/10 transition-colors"
        >
          <Home className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-white/15" />

        {/* Previous Button */}
        <button
          onClick={() => prevRoute && goTo(prevRoute.path)}
          disabled={!prevRoute}
          aria-label="Previous scene"
          className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-all ${
            prevRoute
              ? 'text-dreamwhite/80 hover:text-blush hover:bg-white/5 active:scale-95'
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
                    ? 'w-5 h-2 bg-gradient-to-r from-rosepink to-softgold shadow-glow-pink'
                    : idx < activeIndex
                    ? 'w-2 h-2 bg-blush/60 hover:bg-blush'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] uppercase font-sans tracking-widest text-dreamwhite/70">
            SCENE {activeIndex + 1} OF {ROUTES.length}
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={() => nextRoute && goTo(nextRoute.path)}
          disabled={!nextRoute}
          aria-label="Next scene"
          className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-all ${
            nextRoute
              ? 'text-softgold hover:text-white hover:bg-rosepink/20 active:scale-95'
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
