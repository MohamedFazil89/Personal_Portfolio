// components/ui/AudioControlsEnhanced.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../../store/gameStore';
import audioManager from '../../utils/audioManager';

const AudioControlsEnhanced = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { 
    musicEnabled, 
    sfxEnabled, 
    musicVolume,
    sfxVolume,
    toggleMusic, 
    toggleSFX,
    setMusicVolume,
    setSFXVolume
  } = useGameStore();

  useEffect(() => {
    // Initialize audio on mount
    audioManager.init();
    
    // Start ambient hum if SFX enabled (with safety check)
    if (sfxEnabled && audioManager.sounds && audioManager.sounds.ambientHum) {
      audioManager.sounds.ambientHum.play();
    }

    return () => {
      // Cleanup: stop all sounds if destroy method exists
      if (audioManager.destroy && typeof audioManager.destroy === 'function') {
        audioManager.destroy();
      }
    };
  }, []);

  useEffect(() => {
    audioManager.toggleMusic(musicEnabled);
  }, [musicEnabled]);

  useEffect(() => {
    audioManager.toggleSFX(sfxEnabled);
  }, [sfxEnabled]);

  const handleMusicToggle = () => {
    audioManager.play('click');
    toggleMusic();
  };

  const handleSFXToggle = () => {
    audioManager.play('click');
    toggleSFX();
  };

  const handleMusicVolumeChange = (e) => {
    const volume = parseFloat(e.target.value);
    setMusicVolume(volume);
    audioManager.setMusicVolume(volume);
  };

  const handleSFXVolumeChange = (e) => {
    const volume = parseFloat(e.target.value);
    setSFXVolume(volume);
    audioManager.setSFXVolume(volume);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999
    }}>
      {/* Compact Controls */}
      <div style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}>
        <button 
          onClick={handleMusicToggle}
          onMouseEnter={() => audioManager.play('hover')}
          style={{
            padding: '10px 15px',
            background: musicEnabled ? 'var(--neon-blue)' : 'transparent',
            border: '1px solid var(--neon-blue)',
            color: musicEnabled ? 'var(--darker-bg)' : 'var(--neon-blue)',
            cursor: 'pointer',
            transition: 'all 0.3s',
            fontSize: '1.2rem'
          }}
          title="Toggle Music"
        >
          {musicEnabled ? '🎵' : '🔇'}
        </button>
        
        <button 
          onClick={handleSFXToggle}
          onMouseEnter={() => audioManager.play('hover')}
          style={{
            padding: '10px 15px',
            background: sfxEnabled ? 'var(--neon-blue)' : 'transparent',
            border: '1px solid var(--neon-blue)',
            color: sfxEnabled ? 'var(--darker-bg)' : 'var(--neon-blue)',
            cursor: 'pointer',
            transition: 'all 0.3s',
            fontSize: '1.2rem'
          }}
          title="Toggle Sound Effects"
        >
          {sfxEnabled ? '🔊' : '🔈'}
        </button>

        <button 
          onClick={() => {
            audioManager.play('click');
            setIsExpanded(!isExpanded);
          }}
          onMouseEnter={() => audioManager.play('hover')}
          style={{
            padding: '10px 15px',
            background: isExpanded ? 'var(--neon-blue)' : 'transparent',
            border: '1px solid var(--neon-blue)',
            color: isExpanded ? 'var(--darker-bg)' : 'var(--neon-blue)',
            cursor: 'pointer',
            transition: 'all 0.3s',
            fontSize: '1rem'
          }}
          title="Audio Settings"
        >
          🎚️
        </button>
      </div>

      {/* Expanded Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '60px',
              right: 0,
              background: 'rgba(10, 14, 39, 0.95)',
              border: '2px solid var(--neon-blue)',
              borderRadius: '10px',
              padding: '20px',
              minWidth: '280px',
              boxShadow: '0 0 30px rgba(0, 243, 255, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h3 style={{
              color: 'var(--neon-blue)',
              fontSize: '1rem',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textAlign: 'center'
            }}>
              Audio Settings
            </h3>

            {/* Music Volume */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <label style={{
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}>
                  Music Volume
                </label>
                <span style={{
                  color: 'var(--neon-blue)',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  {Math.round(musicVolume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={musicVolume}
                onChange={handleMusicVolumeChange}
                disabled={!musicEnabled}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  background: `linear-gradient(to right, var(--neon-blue) 0%, var(--neon-blue) ${musicVolume * 100}%, rgba(255, 255, 255, 0.1) ${musicVolume * 100}%, rgba(255, 255, 255, 0.1) 100%)`,
                  outline: 'none',
                  cursor: 'pointer',
                  opacity: musicEnabled ? 1 : 0.3
                }}
              />
            </div>

            {/* SFX Volume */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <label style={{
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}>
                  SFX Volume
                </label>
                <span style={{
                  color: 'var(--neon-blue)',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  {Math.round(sfxVolume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={sfxVolume}
                onChange={handleSFXVolumeChange}
                disabled={!sfxEnabled}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  background: `linear-gradient(to right, var(--neon-blue) 0%, var(--neon-blue) ${sfxVolume * 100}%, rgba(255, 255, 255, 0.1) ${sfxVolume * 100}%, rgba(255, 255, 255, 0.1) 100%)`,
                  outline: 'none',
                  cursor: 'pointer',
                  opacity: sfxEnabled ? 1 : 0.3
                }}
              />
            </div>

            {/* Test Sounds */}
            <div style={{
              paddingTop: '15px',
              borderTop: '1px solid rgba(0, 243, 255, 0.2)'
            }}>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                marginBottom: '10px',
                textAlign: 'center'
              }}>
                Test Sounds
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px'
              }}>
                <TestSoundButton 
                  label="Hover" 
                  sound="hover"
                  disabled={!sfxEnabled}
                />
                <TestSoundButton 
                  label="Click" 
                  sound="click"
                  disabled={!sfxEnabled}
                />
                <TestSoundButton 
                  label="Unlock" 
                  sound="skillUnlock"
                  disabled={!sfxEnabled}
                />
                <TestSoundButton 
                  label="Power" 
                  sound="powerUp"
                  disabled={!sfxEnabled}
                />
                <TestSoundButton 
                  label="Glitch" 
                  sound="glitch"
                  disabled={!sfxEnabled}
                />
                <TestSoundButton 
                  label="Success" 
                  sound="success"
                  disabled={!sfxEnabled}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TestSoundButton = ({ label, sound, disabled }) => {
  return (
    <button
      onClick={() => audioManager.play(sound)}
      onMouseEnter={() => audioManager.play('hover')}
      disabled={disabled}
      style={{
        padding: '8px',
        background: 'rgba(0, 243, 255, 0.1)',
        border: '1px solid rgba(0, 243, 255, 0.3)',
        color: disabled ? 'var(--text-disabled)' : 'var(--text-secondary)',
        fontSize: '0.75rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        borderRadius: '4px',
        transition: 'all 0.3s',
        opacity: disabled ? 0.3 : 1
      }}
    >
      {label}
    </button>
  );
};

export default AudioControlsEnhanced;