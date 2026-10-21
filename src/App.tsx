import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SceneBackground } from './components/common/SceneBackground';
import { SoundController } from './components/common/SoundController';
import { PageTransition } from './components/common/PageTransition';
import { ErrorBoundary } from './components/common/ErrorBoundary';

import { Page1Invitation } from './pages/Page1Invitation';
import { Page2SecretLock } from './pages/Page2SecretLock';
import { Page3MemoryVault } from './pages/Page3MemoryVault';
import { Page4OurStory } from './pages/Page4OurStory';
import { Page5SecretLetter } from './pages/Page5SecretLetter';
import { Page6BirthdaySurprise } from './pages/Page6BirthdaySurprise';
import { Page7ForeverMemories } from './pages/Page7ForeverMemories';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <PageTransition>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <ErrorBoundary fallbackTitle="The Magical Invitation">
              <Page1Invitation />
            </ErrorBoundary>
          }
        />
        <Route
          path="/secret-lock"
          element={
            <ErrorBoundary fallbackTitle="The Secret Lock">
              <Page2SecretLock />
            </ErrorBoundary>
          }
        />
        <Route
          path="/memory-vault"
          element={
            <ErrorBoundary fallbackTitle="The Memory Vault">
              <Page3MemoryVault />
            </ErrorBoundary>
          }
        />
        <Route
          path="/our-story"
          element={
            <ErrorBoundary fallbackTitle="Our Friendship Story">
              <Page4OurStory />
            </ErrorBoundary>
          }
        />
        <Route
          path="/secret-letter"
          element={
            <ErrorBoundary fallbackTitle="The Secret Letter">
              <Page5SecretLetter />
            </ErrorBoundary>
          }
        />
        <Route
          path="/birthday-surprise"
          element={
            <ErrorBoundary fallbackTitle="The Birthday Surprise">
              <Page6BirthdaySurprise />
            </ErrorBoundary>
          }
        />
        <Route
          path="/forever-memories"
          element={
            <ErrorBoundary fallbackTitle="Forever Memories">
              <Page7ForeverMemories />
            </ErrorBoundary>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageTransition>
  );
};

export const App: React.FC = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="relative min-h-screen bg-midnight text-dreamwhite selection:bg-rosepink selection:text-white flex flex-col justify-between overflow-x-hidden">
        {/* Dynamic Canvas Starfield & Floating Petals */}
        <SceneBackground />

        {/* Global Sound & Music Controls (Top Right) */}
        <SoundController />

        {/* Multi-Page Routes with Error Boundaries and Transitions */}
        <AnimatedRoutes />
      </div>
    </Router>
  );
};

export default App;
