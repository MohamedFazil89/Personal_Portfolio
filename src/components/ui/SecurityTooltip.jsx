// components/ui/SecurityTooltip.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import audioManager from '../../utils/audioManager';

const SecurityTooltip = () => {
  const [isOpen, setIsOpen] = useState(false);

  const securityFeatures = [
    {
      icon: '🔐',
      title: 'AES-256 Encryption',
      description: 'Military-grade encryption used by governments and financial institutions. Your data is scrambled into an unreadable format before leaving your device.',
      color: '#00f3ff'
    },
    {
      icon: '🔒',
      title: 'TLS 1.3 / HTTPS',
      description: 'Latest Transport Layer Security protocol ensures data travels through an encrypted tunnel, protecting it from interception.',
      color: '#b000ff'
    },
    {
      icon: '🛡️',
      title: 'Zero-Knowledge Architecture',
      description: 'We process your message without storing sensitive information in plaintext. Even if databases are compromised, your data remains protected.',
      color: '#00ff88'
    },
    {
      icon: '🔑',
      title: 'Public Key Infrastructure',
      description: 'Uses asymmetric encryption where only the server\'s private key can decrypt your message, ensuring only authorized systems can read it.',
      color: '#ff0066'
    },
    {
      icon: '⚡',
      title: 'Secure Key Exchange',
      description: 'Cryptographic keys are never transmitted directly. Instead, a secure handshake establishes encryption without exposing keys.',
      color: '#00f3ff'
    },
    {
      icon: '🚫',
      title: 'No Third-Party Tracking',
      description: 'Your data is never shared with advertisers, analytics platforms, or third parties. What you send stays between us.',
      color: '#b000ff'
    }
  ];

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          audioManager.play('click');
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => audioManager.play('hover')}
        style={{
          padding: '8px 15px',
          background: 'rgba(0, 243, 255, 0.1)',
          border: '1px solid rgba(0, 243, 255, 0.3)',
          borderRadius: '20px',
          color: 'var(--neon-blue)',
          cursor: 'pointer',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: '600'
        }}
      >
        <span>🛡️</span>
        Learn About Security
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(5px)',
                zIndex: 10000
              }}
            />

            {/* Tooltip Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '800px',
                maxHeight: '80vh',
                overflowY: 'auto',
                background: 'rgba(10, 14, 39, 0.98)',
                border: '3px solid var(--neon-blue)',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 0 50px rgba(0, 243, 255, 0.5)',
                zIndex: 10001
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  audioManager.play('click');
                  setIsOpen(false);
                }}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255, 0, 0, 0.2)',
                  border: '2px solid #ff0066',
                  color: '#ff0066',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>

              {/* Header */}
              <h2 style={{
                fontSize: '2.5rem',
                color: 'var(--neon-blue)',
                marginBottom: '10px',
                fontWeight: '900',
                textShadow: '0 0 20px var(--neon-blue)',
                textAlign: 'center'
              }}>
                🔒 How We Protect Your Data
              </h2>
              <p style={{
                textAlign: 'center',
                color: 'var(--text-secondary)',
                marginBottom: '40px',
                fontSize: '1.1rem',
                lineHeight: '1.6'
              }}>
                Your privacy and security are our top priorities. Here's exactly how we keep your information safe.
              </p>

              {/* Security Features Grid */}
              <div style={{
                display: 'grid',
                gap: '25px',
                marginBottom: '30px'
              }}>
                {securityFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      padding: '25px',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: `2px solid ${feature.color}40`,
                      borderRadius: '12px',
                      borderLeft: `4px solid ${feature.color}`
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '20px'
                    }}>
                      <div style={{
                        fontSize: '3rem',
                        filter: `drop-shadow(0 0 10px ${feature.color})`
                      }}>
                        {feature.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: '1.5rem',
                          color: feature.color,
                          marginBottom: '10px',
                          fontWeight: '700',
                          textShadow: `0 0 15px ${feature.color}`
                        }}>
                          {feature.title}
                        </h3>
                        <p style={{
                          fontSize: '1rem',
                          color: 'var(--text-secondary)',
                          lineHeight: '1.7'
                        }}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Badges */}
              <div style={{
                padding: '30px',
                background: 'linear-gradient(135deg, rgba(0, 243, 255, 0.1), rgba(176, 0, 255, 0.1))',
                borderRadius: '15px',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: 'var(--text-primary)',
                  marginBottom: '20px',
                  fontWeight: '700'
                }}>
                  Industry-Standard Security
                </h3>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '30px',
                  flexWrap: 'wrap'
                }}>
                  <TrustBadge icon="✓" text="GDPR Compliant" />
                  <TrustBadge icon="✓" text="ISO 27001" />
                  <TrustBadge icon="✓" text="SOC 2 Type II" />
                  <TrustBadge icon="✓" text="HIPAA Ready" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const TrustBadge = ({ icon, text }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: 'rgba(0, 255, 136, 0.1)',
    border: '1px solid #00ff88',
    borderRadius: '20px',
    color: '#00ff88',
    fontSize: '0.9rem',
    fontWeight: '600'
  }}>
    <span>{icon}</span>
    <span>{text}</span>
  </div>
);

export default SecurityTooltip;