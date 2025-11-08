// components/ui/EffectsSettings.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EffectsSettings = ({ effectsEnabled, onToggleEffects }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      zIndex: 9999
    }}>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: isOpen ? 'var(--neon-blue)' : 'rgba(0, 243, 255, 0.1)',
          border: '2px solid var(--neon-blue)',
          color: isOpen ? 'var(--darker-bg)' : 'var(--neon-blue)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          transition: 'all 0.3s',
          boxShadow: isOpen ? '0 0 20px var(--neon-blue)' : 'none'
        }}
      >
        ⚙️
      </button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '60px',
              right: 0,
              background: 'rgba(10, 14, 39, 0.95)',
              border: '2px solid var(--neon-blue)',
              borderRadius: '10px',
              padding: '20px',
              minWidth: '250px',
              boxShadow: '0 0 30px rgba(0, 243, 255, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h3 style={{
              color: 'var(--neon-blue)',
              fontSize: '1rem',
              marginBottom: '15px',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              Visual Effects
            </h3>

            {/* Effect Toggles */}
            <EffectToggle
              label="3D Particles"
              enabled={effectsEnabled.particles}
              onToggle={() => onToggleEffects('particles')}
            />
            <EffectToggle
              label="Floating Hexagons"
              enabled={effectsEnabled.hexagons}
              onToggle={() => onToggleEffects('hexagons')}
            />
            <EffectToggle
              label="Data Streams"
              enabled={effectsEnabled.dataStreams}
              onToggle={() => onToggleEffects('dataStreams')}
            />
            <EffectToggle
              label="Grid Background"
              enabled={effectsEnabled.grid}
              onToggle={() => onToggleEffects('grid')}
            />

            <div style={{
              marginTop: '15px',
              paddingTop: '15px',
              borderTop: '1px solid rgba(0, 243, 255, 0.2)',
              fontSize: '0.75rem',
              color: 'var(--text-tertiary)',
              textAlign: 'center'
            }}>
              Toggle effects for performance
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EffectToggle = ({ label, enabled, onToggle }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
      padding: '10px',
      background: enabled ? 'rgba(0, 243, 255, 0.05)' : 'transparent',
      borderRadius: '5px',
      transition: 'all 0.3s'
    }}>
      <span style={{
        color: enabled ? 'var(--text-primary)' : 'var(--text-secondary)',
        fontSize: '0.9rem'
      }}>
        {label}
      </span>
      
      <button
        onClick={onToggle}
        style={{
          width: '45px',
          height: '24px',
          borderRadius: '12px',
          background: enabled ? 'var(--neon-blue)' : 'rgba(255, 255, 255, 0.1)',
          border: 'none',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.3s',
          boxShadow: enabled ? '0 0 10px var(--neon-blue)' : 'none'
        }}
      >
        <div style={{
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: 'white',
          position: 'absolute',
          top: '3px',
          left: enabled ? '24px' : '3px',
          transition: 'left 0.3s',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }} />
      </button>
    </div>
  );
};

export default EffectsSettings;