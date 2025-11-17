// App.jsx - FULLY RESPONSIVE VERSION
import { useEffect, useState } from 'react';
import useGameStore from './store/gameStore';
import Prologue from './components/chapters/Prologue';
import Origin from './components/chapters/Origin';
import './styles/cyber.css';
import ParticleField3D from './components/effects/ParticleField3D';
import DataStreams from './components/effects/DataStreams';
import FloatingHexagons from './components/effects/FloatingHexagons';
import Trials from "./components/chapters/Trials"
import Vision from "./components/chapters/Vision"
import Connection from './components/chapters/Connection';
import ChapterNav from './components/ui/ChapterNav';
import PixelPet from './components/game/PixelPet';
import { useResponsive } from './utils/responsiveUtils';

function App() {
  const currentChapter = useGameStore((state) => state.currentChapter);
  const { isMobile, isTablet, isSmallMobile } = useResponsive();
  
  const [effectsEnabled, setEffectsEnabled] = useState({
    particles: !isMobile, // Disable on mobile by default
    hexagons: !isMobile,
    dataStreams: true,
    grid: true
  });

  

  useEffect(() => {
    // Import Google Fonts for cyber aesthetic
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;700;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Update effects when screen size changes
  useEffect(() => {
    setEffectsEnabled(prev => ({
      ...prev,
      particles: !isMobile && prev.particles,
      hexagons: !isMobile && prev.hexagons
    }));
  }, [isMobile]);

  // Chapter router
  const renderChapter = () => {
    switch (currentChapter) {
      case 'prologue':
        return <Prologue />;
      case 'origin':
        return <Origin />;
      case 'trials':
        return <Trials />;
      case 'vision':
        return <Vision />
      case 'connection':
        return <Connection />
      default:
        return <Prologue />;
    }
  };

  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* 3D Background Effects - Only on desktop for performance */}
      {effectsEnabled.particles && !isMobile && <ParticleField3D />}
      {effectsEnabled.hexagons && !isMobile && <FloatingHexagons />}
      
      {/* Data streams work on all devices */}
      {effectsEnabled.dataStreams && <DataStreams />}
      
      {/* Progress bar (top of screen) */}
      <ProgressBar />

      {/* Audio controls - Desktop only, mobile uses ChapterNav */}
      {!isMobile && <AudioControls />}

      {/* Chapter Navigation */}
      <ChapterNav />

      {/* Pet - Scales based on device */}
      {/* <PixelPet /> */}

      {/* Current chapter */}
      {renderChapter()}
    </div>
  );
}

// Responsive Progress Bar Component
const ProgressBar = () => {
  const { completedChapters, xp } = useGameStore();
  const { isMobile, isSmallMobile } = useResponsive();
  const uniqueChapters = Array.from(new Set(completedChapters));

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: isMobile ? '3px' : '5px',
      background: 'rgba(0, 243, 255, 0.1)',
      zIndex: 9999
    }}>
      <div style={{
        height: '100%',
        width: `${(uniqueChapters.length / 5) * 100}%`,
        background: 'linear-gradient(90deg, var(--neon-dark-red), var(--neon-primary), var(--neon-secondary))',
        boxShadow: 'var(--glow-primary)',
        transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }} />

      <div style={{
        position: 'absolute',
        top: isMobile ? '6px' : '10px',
        right: isMobile ? '10px' : '20px',
        color: 'var(--neon-primary)',
        fontSize: isMobile ? '0.85rem' : '1rem',
        fontFamily: 'Orbitron',
        fontWeight: '600',
        textShadow: 'var(--glow-subtle)',
        letterSpacing: '1px',
        pointerEvents: 'none'
      }}>
        {!isSmallMobile && 'XP: '}{xp}
      </div>
    </div>
  );
};

// Desktop-only Audio Controls
const AudioControls = () => {
  const { musicEnabled, sfxEnabled, toggleMusic, toggleSFX } = useGameStore();

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      display: 'flex',
      gap: '10px',
      zIndex: 9999
    }}>
      <button
        onClick={toggleMusic}
        style={{
          padding: '12px 18px',
          background: musicEnabled ? 'var(--neon-primary)' : 'rgba(255, 0, 68, 0.1)',
          border: `2px solid ${musicEnabled ? 'var(--neon-secondary)' : 'var(--neon-dark-red)'}`,
          color: musicEnabled ? 'var(--darker-bg)' : 'var(--neon-primary)',
          cursor: 'pointer',
          transition: 'all 0.3s',
          fontSize: '1.2rem',
          boxShadow: musicEnabled ? 'var(--glow-subtle)' : 'none',
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
        }}
      >
        🎵
      </button>
      <button
        onClick={toggleSFX}
        style={{
          padding: '12px 18px',
          background: sfxEnabled ? 'var(--neon-primary)' : 'rgba(255, 0, 68, 0.1)',
          border: `2px solid ${sfxEnabled ? 'var(--neon-secondary)' : 'var(--neon-dark-red)'}`,
          color: sfxEnabled ? 'var(--darker-bg)' : 'var(--neon-primary)',
          cursor: 'pointer',
          transition: 'all 0.3s',
          fontSize: '1.2rem',
          boxShadow: sfxEnabled ? 'var(--glow-subtle)' : 'none',
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
        }}
      >
        🔊
      </button>
    </div>
  );
};

export default App;