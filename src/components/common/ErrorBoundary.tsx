import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Sparkles, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Dreamscape ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 text-center z-30 relative">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-blush/30 shadow-glow-pink max-w-lg w-full backdrop-blur-xl">
            <div className="w-16 h-16 rounded-full bg-midnight-light border border-softgold/40 flex items-center justify-center mx-auto mb-4 shadow-glow-gold">
              <Sparkles className="w-8 h-8 text-softgold animate-pulse" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dreamwhite mb-2">
              {this.props.fallbackTitle || "Moment Briefly Paused ✨"}
            </h2>

            <p className="text-xs sm:text-sm text-blush/90 mb-6 font-sans font-light">
              Don't worry! This memory encountered a small hiccup while loading. Tap below to resume the experience.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-rosepink to-softgold text-midnight shadow-glow-pink hover:scale-105 active:scale-95 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload This Scene</span>
              </button>

              <button
                onClick={() => {
                  window.location.hash = '#/';
                  this.handleReset();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold glass-pill border border-white/20 text-dreamwhite hover:text-softgold transition-all"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Start</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
