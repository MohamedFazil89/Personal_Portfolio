// App.jsx
import { useEffect } from 'react';
import useGameStore from './store/gameStore';
import audioManager from './utils/audioManager';
import Prologue from './components/chapters/Prologue';
import './styles/cyber.css';

function App() {
  const currentChapter = useGameStore((state) => state.currentChapter);
  const { musicEnabled, sfxEnabled } = useGameStore();
  
  useEffect(() => {
    // Import Google Fonts for cyber aesthetic
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;700;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Cleanup audio on unmount
    return () => {
      audioManager.cleanup();
    };
  }, []);

  // Sync audio manager with store state
  useEffect(() => {
    audioManager.toggleMusic(musicEnabled);
  }, [musicEnabled]);

  useEffect(() => {
    audioManager.toggleSFX(sfxEnabled);
  }, [sfxEnabled]);

  // Chapter router
  const renderChapter = () => {
    switch (currentChapter) {
      case 'prologue':
        return <Prologue />;
      case 'origin':
        return <div className="chapter-container">
          <h1 className="neon-text">CHAPTER I: ORIGIN</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Coming soon...</p>
        </div>;
      case 'trials':
        return <div className="chapter-container">
          <h1 className="neon-text">CHAPTER II: TRIALS</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Coming soon...</p>
        </div>;
      default:
        return <Prologue />;
    }
  };

  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Progress bar */}
      <ProgressBar />
      
      {/* Audio controls */}
      <AudioControls />
      
      {/* Current chapter */}
      {renderChapter()}
    </div>
  );
}

// Progress Bar Component
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
        background: 'linear-gradient(90deg, var(--neon-blue), var(--neon-purple))',
        boxShadow: '0 0 20px var(--neon-blue)',
        transition: 'width 0.5s ease'
      }} />
      
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '20px',
        color: 'var(--neon-blue)',
        fontSize: '0.9rem',
        fontFamily: 'Orbitron',
        textShadow: '0 0 10px var(--neon-blue)'
      }}>
        XP: {xp}
      </div>
    </div>
  );
};

// Enhanced Audio Controls
const AudioControls = () => {
  const { musicEnabled, sfxEnabled, toggleMusic, toggleSFX } = useGameStore();
  
  const handleMusicToggle = () => {
    audioManager.playSFX('uiClick');
    toggleMusic();
  };

  const handleSFXToggle = () => {
    // Play sound before toggle so user hears it
    if (sfxEnabled) {
      audioManager.playSFX('uiClick');
    }
    toggleSFX();
  };

  const handleHover = () => {
    audioManager.playSFX('uiHover');
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
      zIndex: 9999
    }}>
      <button 
        onClick={handleMusicToggle}
        onMouseEnter={handleHover}
        style={{
          padding: '1px 5px',
          background: musicEnabled ? 'var(--neon-blue)' : 'rgba(0, 243, 255, 0.1)',
          border: '2px solid var(--neon-blue)',
          color: musicEnabled ? 'var(--darker-bg)' : 'var(--neon-blue)',
          cursor: 'pointer',
          transition: 'all 0.3s',
          fontSize: '.8rem',
          boxShadow: musicEnabled ? '0 0 20px var(--neon-blue)' : 'none',
          fontFamily: 'Orbitron',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',

        }}
        title={musicEnabled ? 'Music: ON' : 'Music: OFF'}
      >
        <span style={{ fontSize: '0.7rem'}}>🎵</span>
        <span style={{ fontSize: '0.7rem' }}>
          {musicEnabled ? 'ON' : 'OFF'}
        </span>
      </button>
      
      <button 
        onClick={handleSFXToggle}
        onMouseEnter={handleHover}
        style={{
          padding: '1px 5px',
          background: sfxEnabled ? 'var(--neon-blue)' : 'rgba(0, 243, 255, 0.1)',
          border: '2px solid var(--neon-blue)',
          color: sfxEnabled ? 'var(--darker-bg)' : 'var(--neon-blue)',
          cursor: 'pointer',
          transition: 'all 0.3s',
          fontSize: '1rem',
          boxShadow: sfxEnabled ? '0 0 20px var(--neon-blue)' : 'none',
          fontFamily: 'Orbitron',
          display: 'flex',
          flexDirection:"row",
          alignItems: 'center',
          gap: '4px',
          borderRadius: '5px'
        }}
        title={sfxEnabled ? 'SFX: ON' : 'SFX: OFF'}
      >
        <span style={{ fontSize: '0.7rem'}}>🔊</span>
        <span style={{ fontSize: '0.7rem' }}>
          {sfxEnabled ? 'ON' : 'OFF'}
        </span>
      </button>
    </div>
  );
};

export default App;