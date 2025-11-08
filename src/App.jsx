// App.jsx
import { useEffect, useState } from 'react';
import useGameStore from './store/gameStore';
import Prologue from './components/chapters/Prologue';
import Origin from './components/chapters/Origin';
import './styles/cyber.css';
import ParticleField3D from './components/effects/ParticleField3D';
import DataStreams from './components/effects/DataStreams';
import FloatingHexagons from './components/effects/FloatingHexagons';
import EffectsSettings from './components/ui/EffectsSettings';
import Trails from "./components/chapters/Trials"

function App() {
  const currentChapter = useGameStore((state) => state.currentChapter);
  const [effectsEnabled, setEffectsEnabled] = useState({
    particles: true,
    hexagons: true,
    dataStreams: true,
    grid: true
  })

  useEffect(() => {
    // Import Google Fonts for cyber aesthetic
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;700;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Chapter router
  const renderChapter = () => {
    switch (currentChapter) {
      case 'prologue':
        return <Prologue />;
      case 'origin':
        return <Origin />;
      case 'trials':
        return <Trails />;;
      default:
        return <Prologue />;
    }
  };

  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* 3D Background Effects - Layered */}
      {/* <ParticleField3D /> */}
      {/* <FloatingHexagons /> */}
      <DataStreams />
      {/* Progress bar (top of screen) */}
      <ProgressBar />

      {/* Audio controls */}
      <AudioControls />

      {/* Current chapter */}
      {renderChapter()}
    </div>
  );
}

// Simple Progress Bar Component
const ProgressBar = () => {
  const { completedChapters, xp } = useGameStore();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '5px',
      background: 'rgba(0, 243, 255, 0.1)',
      zIndex: 9999
    }}>
      <div style={{
        height: '100%',
        width: `${(completedChapters.length / 5) * 100}%`,
        background: 'linear-gradient(90deg, var(--neon-dark-red), var(--neon-primary), var(--neon-secondary))',
        boxShadow: 'var(--glow-primary)',
        transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }} />

      <div style={{
        position: 'absolute',
        top: '10px',
        right: '20px',
        color: 'var(--neon-primary)',
        fontSize: '1rem',
        fontFamily: 'Orbitron',
        fontWeight: '600',
        textShadow: 'var(--glow-subtle)',
        letterSpacing: '1px'
      }}>
        XP: {xp}
      </div>
    </div>
  );
};

// Simple Audio Controls
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