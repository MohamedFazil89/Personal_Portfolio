// src/components/game/SecretScanner.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../../store/gameStore';

const secrets = [
  {
    id: 'coffee-stat',
    selector: '.stat-coffee',
    title: '☕ The Fuel of Innovation',
    description: '2,847 cups of coffee turned into lines of code',
    xpReward: 25
  },
  {
    id: 'sleepless-nights',
    selector: '.stat-nights',
    title: '🌙 The Grind Never Stops',
    description: '89 sleepless nights crafting the perfect solution',
    xpReward: 25
  },
  {
    id: 'avatar-secret',
    selector: '.avatar-image',
    title: '👤 The Face Behind the Code',
    description: 'Every great journey has a protagonist',
    xpReward: 25
  },
  {
    id: 'innovite-project',
    selector: '.innovite-text',
    title: '🏆 The Legend',
    description: 'Built Innovite Solution in 24 hours to solve a real-world problem',
    xpReward: 25
  }
];

const SecretScanner = () => {
  const [discoveredSecrets, setDiscoveredSecrets] = useState(() => {
    const saved = localStorage.getItem('discoveredSecrets');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [toast, setToast] = useState(null);
  const { unlockSkill } = useGameStore();

  useEffect(() => {
    const handleHover = (secret) => {
      const elements = document.querySelectorAll(secret.selector);
      
      elements.forEach(element => {
        if (!element.dataset.secretListenerAdded) {
          element.dataset.secretListenerAdded = 'true';
          
          // Hover effect
          element.addEventListener('mouseenter', () => {
            if (!discoveredSecrets.includes(secret.id)) {
              element.style.boxShadow = '0 0 30px rgba(0, 243, 255, 0.8), inset 0 0 20px rgba(0, 243, 255, 0.3)';
              element.style.border = '2px solid rgba(0, 243, 255, 0.9)';
              element.style.cursor = 'pointer';
              element.style.transform = 'scale(1.02)';
              element.style.transition = 'all 0.3s ease';
            }
          });

          element.addEventListener('mouseleave', () => {
            if (!discoveredSecrets.includes(secret.id)) {
              element.style.boxShadow = '';
              element.style.border = '';
              element.style.transform = '';
            }
          });

          // Click to reveal
          element.addEventListener('click', () => {
            if (!discoveredSecrets.includes(secret.id)) {
              const newDiscovered = [...discoveredSecrets, secret.id];
              setDiscoveredSecrets(newDiscovered);
              localStorage.setItem('discoveredSecrets', JSON.stringify(newDiscovered));
              
              // Add XP reward
              unlockSkill({ xpReward: secret.xpReward });
              
              // Show toast
              setToast(secret);
              setTimeout(() => setToast(null), 4000);
              
              // Mark as discovered with green glow
              element.style.boxShadow = '0 0 30px rgba(0, 255, 102, 0.8)';
              element.style.border = '2px solid rgba(0, 255, 102, 0.9)';
            }
          });
        }
      });
    };

    secrets.forEach(secret => handleHover(secret));
  }, [discoveredSecrets, unlockSkill]);

  return (
    <>
      {/* Secrets Counter */}
      <div style={{
        position: 'fixed',
        bottom: '100px',
        right: '20px',
        background: 'rgba(10, 14, 39, 0.95)',
        border: '2px solid var(--neon-blue)',
        padding: '15px 20px',
        borderRadius: '8px',
        zIndex: 1000,
        boxShadow: '0 0 20px rgba(0, 243, 255, 0.3)'
      }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--neon-blue)', fontWeight: 700 }}>
          🔍 SECRETS
        </div>
        <div style={{ fontSize: '1.5rem', color: 'var(--text-primary)', textAlign: 'center', fontWeight: 900 }}>
          {discoveredSecrets.length}/4
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            style={{
              position: 'fixed',
              top: '100px',
              right: '20px',
              background: 'rgba(10, 14, 39, 0.98)',
              border: '2px solid var(--neon-blue)',
              padding: '20px',
              borderRadius: '8px',
              maxWidth: '350px',
              zIndex: 2000,
              boxShadow: '0 0 30px rgba(0, 243, 255, 0.5)'
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>🎉 Secret Discovered!</div>
            <div style={{ fontSize: '1.2rem', color: 'var(--neon-blue)', marginBottom: '8px', fontWeight: 700 }}>
              {toast.title}
            </div>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              {toast.description}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--neon-primary)', fontWeight: 600 }}>
              +{toast.xpReward} XP
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SecretScanner;
