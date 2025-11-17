// components/ui/SecurityTooltip.jsx - FULLY RESPONSIVE VERSION
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import audioManager from '../../utils/audioManager';
import { useResponsive } from '../../utils/responsiveUtils';

const SecurityTooltip = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile, isTablet, isSmallMobile } = useResponsive();

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
        whileHover={{ scale: isMobile ? 1 : 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          audioManager.play('click');
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => !isMobile && audioManager.play('hover')}
        style={{
          padding: isMobile ? '6px 12px' : '8px 15px',
          background: 'rgba(0, 243, 255, 0.1)',
          border: '1px solid rgba(0, 243, 255, 0.3)',
          borderRadius: '20px',
          color: 'var(--neon-blue)',
          cursor: 'pointer',
          fontSize: isMobile ? '0.8rem' : '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '6px' : '8px',
          fontWeight: '600'
        }}
      >
        <span>🛡️</span>
        {!isSmallMobile && 'Learn About Security'}
        {isSmallMobile && 'Security'}
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
                top: isMobile ? '10px' : '50%',
                left: isMobile ? '10px' : '50%',
                right: isMobile ? '10px' : 'auto',
                transform: isMobile ? 'none' : 'translate(-50%, -50%)',
                width: isMobile ? 'auto' : '90%',
                maxWidth: isMobile ? 'none' : '800px',
                maxHeight: isMobile ? 'calc(100vh - 20px)' : '80vh',
                overflowY: 'auto',
                background: 'rgba(10, 14, 39, 0.98)',
                border: '3px solid var(--neon-blue)',
                borderRadius: isMobile ? '15px' : '20px',
                padding: isMobile ? '25px 20px' : isTablet ? '35px' : '40px',
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
                  top: isMobile ? '15px' : '20px',
                  right: isMobile ? '15px' : '20px',
                  width: isMobile ? '35px' : '40px',
                  height: isMobile ? '35px' : '40px',
                  borderRadius: '50%',
                  background: 'rgba(255, 0, 0, 0.2)',
                  border: '2px solid #ff0066',
                  color: '#ff0066',
                  fontSize: isMobile ? '1.2rem' : '1.5rem',
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
                fontSize: isMobile ? '1.8rem' : isTablet ? '2.2rem' : '2.5rem',
                color: 'var(--neon-blue)',
                marginBottom: '10px',
                fontWeight: '900',
                textShadow: '0 0 20px var(--neon-blue)',
                textAlign: 'center',
                paddingRight: isMobile ? '30px' : '0'
              }}>
                🔒 How We Protect Your Data
              </h2>
              <p style={{
                textAlign: 'center',
                color: 'var(--text-secondary)',
                marginBottom: isMobile ? '30px' : '40px',
                fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem',
                lineHeight: '1.6',
                padding: isMobile ? '0 10px' : '0'
              }}>
                Your privacy and security are our top priorities. Here's exactly how we keep your information safe.
              </p>

              {/* Security Features Grid */}
              <div style={{
                display: 'grid',
                gap: isMobile ? '20px' : '25px',
                marginBottom: isMobile ? '25px' : '30px'
              }}>
                {securityFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      padding: isMobile ? '20px' : '25px',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: `2px solid ${feature.color}40`,
                      borderRadius: '12px',
                      borderLeft: `4px solid ${feature.color}`
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      alignItems: isMobile ? 'center' : 'flex-start',
                      gap: isMobile ? '15px' : '20px',
                      textAlign: isMobile ? 'center' : 'left'
                    }}>
                      <div style={{
                        fontSize: isMobile ? '2.5rem' : '3rem',
                        filter: `drop-shadow(0 0 10px ${feature.color})`,
                        flexShrink: 0
                      }}>
                        {feature.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: isMobile ? '1.2rem' : isTablet ? '1.3rem' : '1.5rem',
                          color: feature.color,
                          marginBottom: '10px',
                          fontWeight: '700',
                          textShadow: `0 0 15px ${feature.color}`
                        }}>
                          {feature.title}
                        </h3>
                        <p style={{
                          fontSize: isMobile ? '0.85rem' : isTablet ? '0.95rem' : '1rem',
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
                padding: isMobile ? '20px' : '30px',
                background: 'linear-gradient(135deg, rgba(0, 243, 255, 0.1), rgba(176, 0, 255, 0.1))',
                borderRadius: '15px',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: isMobile ? '1.2rem' : isTablet ? '1.3rem' : '1.5rem',
                  color: 'var(--text-primary)',
                  marginBottom: isMobile ? '15px' : '20px',
                  fontWeight: '700'
                }}>
                  Industry-Standard Security
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
                  gap: isMobile ? '15px' : '30px',
                  justifyContent: 'center'
                }}>
                  <TrustBadge icon="✓" text="GDPR Compliant" isMobile={isMobile} />
                  <TrustBadge icon="✓" text="ISO 27001" isMobile={isMobile} />
                  <TrustBadge icon="✓" text="SOC 2 Type II" isMobile={isMobile} />
                  <TrustBadge icon="✓" text="HIPAA Ready" isMobile={isMobile} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const TrustBadge = ({ icon, text, isMobile }) => (
  <div style={{
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    gap: isMobile ? '5px' : '8px',
    padding: isMobile ? '8px 10px' : '10px 20px',
    background: 'rgba(0, 255, 136, 0.1)',
    border: '1px solid #00ff88',
    borderRadius: '20px',
    color: '#00ff88',
    fontSize: isMobile ? '0.75rem' : '0.9rem',
    fontWeight: '600',
    justifyContent: 'center'
  }}>
    <span>{icon}</span>
    <span style={{ textAlign: 'center' }}>{text}</span>
  </div>
);

export default SecurityTooltip;