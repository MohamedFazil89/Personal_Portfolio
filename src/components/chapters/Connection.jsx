// components/chapters/Connection.jsx - FULLY RESPONSIVE VERSION
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useGameStore from '../../store/gameStore';
import ContactForm from '../ui/ContactForm';
import SocialCard from '../ui/SocialCard';
import SecurityTooltip from '../ui/SecurityTooltip';
import {
  connectionIntro,
  socialLinks,
  contactReasons,
  quickStats,
  thankYouMessage,
  downloadResume
} from '../../utils/connectionData';
import audioManager from '../../utils/audioManager';
import { useResponsive } from '../../utils/responsiveUtils';

const Connection = ({ gridEnabled = true }) => {
  const [phase, setPhase] = useState(0);
  const { completeChapter, xp, completedChapters } = useGameStore();
  const { isMobile, isTablet, isSmallMobile } = useResponsive();

  useEffect(() => {
    // Phase progression with adjusted timing for mobile
    const baseDelay = isMobile ? 300 : 500;
    const timers = [
      setTimeout(() => {
        setPhase(1);
        audioManager.play('glitch');
      }, baseDelay),
      setTimeout(() => {
        setPhase(2);
        audioManager.play('type');
      }, baseDelay + 1500),
      setTimeout(() => setPhase(3), baseDelay + 3000),
      setTimeout(() => setPhase(4), baseDelay + 4500),
      setTimeout(() => setPhase(5), baseDelay + 6000),
      setTimeout(() => {
        setPhase(6);
        completeChapter('connection');
        audioManager.play('success');
      }, baseDelay + 7500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [completeChapter, isMobile]);

  const handleDownloadResume = () => {
    audioManager.play('powerUp');
    window.open(downloadResume.url, '_blank');
  };

  return (
    <div className="chapter-container" style={{ 
      minHeight: '100vh',
      padding: isMobile ? '60px 15px 20px' : isTablet ? '70px 20px 30px' : '80px 20px',
      position: 'relative'
    }}>
      {/* Background effects */}
      {gridEnabled && <div className="grid-bg" />}
      <div className="scanlines" />

      {/* Content wrapper */}
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        
        {/* Chapter Title */}
        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px' }}
          >
            <h1 
              className="glitch neon-text" 
              data-text="CHAPTER IV: CONNECTION"
              style={{ 
                fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3.5rem',
                marginBottom: isMobile ? '15px' : '20px',
                fontWeight: '900',
                wordBreak: 'break-word'
              }}
            >
              CHAPTER IV: CONNECTION
            </h1>
            <div style={{
              width: isMobile ? '60px' : '100px',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, var(--neon-blue), transparent)',
              margin: '0 auto',
              boxShadow: '0 0 20px var(--neon-blue)'
            }} />
          </motion.div>
        )}

        {/* Intro Section */}
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              background: 'rgba(26, 26, 26, 0.6)',
              border: '2px solid rgba(0, 243, 255, 0.3)',
              padding: isMobile ? '25px' : isTablet ? '35px' : '50px',
              marginBottom: isMobile ? '40px' : '60px',
              backdropFilter: 'blur(10px)',
              textAlign: 'center'
            }}
          >
            <h2 style={{
              fontSize: isMobile ? '1.5rem' : isTablet ? '2rem' : '2.5rem',
              color: 'var(--neon-blue)',
              marginBottom: isMobile ? '15px' : '20px',
              fontWeight: '700',
              textShadow: '0 0 20px var(--neon-blue)'
            }}>
              {connectionIntro.subtitle}
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {connectionIntro.description}
            </p>
          </motion.div>
        )}

        {/* Quick Stats */}
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: isMobile ? '15px' : '20px',
              marginBottom: isMobile ? '40px' : '60px'
            }}
          >
            <QuickStatCard icon="⚡" label="Response Time" value={quickStats.responseTime} isMobile={isMobile} />
            <QuickStatCard icon="🟢" label="Status" value={quickStats.availability} isMobile={isMobile} />
            <QuickStatCard icon="🌍" label="Timezone" value={quickStats.timezone} isMobile={isMobile} />
            <QuickStatCard icon="💬" label="Languages" value={quickStats.languages.join(', ')} isMobile={isMobile} />
          </motion.div>
        )}

        {/* Contact Reasons */}
        {phase >= 3 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ marginBottom: isMobile ? '30px' : '40px', textAlign: 'center' }}
            >
              <h2 style={{
                fontSize: isMobile ? '1.8rem' : isTablet ? '2.2rem' : '2.5rem',
                color: 'var(--neon-blue)',
                marginBottom: '15px',
                fontWeight: '700',
                textShadow: '0 0 20px var(--neon-blue)'
              }}>
                &gt; REACH_OUT_FOR
              </h2>
            </motion.div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: isMobile ? '15px' : '20px',
              marginBottom: isMobile ? '50px' : '80px'
            }}>
              {contactReasons.map((reason, index) => (
                <ReasonCard key={index} reason={reason} index={index} isMobile={isMobile} />
              ))}
            </div>
          </>
        )}

        {/* Contact Form & Social Links Grid */}
        {phase >= 4 && (
          <>
            {/* Security Education Button - ABOVE THE FORM */}
            <div style={{
              textAlign: 'center',
              marginBottom: isMobile ? '20px' : '30px'
            }}>
              <p style={{
                color: 'var(--text-secondary)',
                marginBottom: '15px',
                fontSize: isMobile ? '0.9rem' : '1rem'
              }}>
                Curious about how we protect your data?
              </p>
              <SecurityTooltip />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '30px' : isTablet ? '35px' : '40px',
              marginBottom: isMobile ? '50px' : '80px'
            }}>
              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>

              {/* Social Links */}
              <div>
                <h3 style={{
                  fontSize: isMobile ? '1.5rem' : isTablet ? '1.8rem' : '2rem',
                  color: 'var(--neon-purple)',
                  marginBottom: isMobile ? '20px' : '30px',
                  textAlign: 'center',
                  fontWeight: '700',
                  textShadow: '0 0 20px var(--neon-purple)'
                }}>
                  🌐 FIND_ME_ON
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                  gap: isMobile ? '15px' : '20px'
                }}>
                  {socialLinks.map((social, index) => (
                    <SocialCard key={social.id} social={social} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Download Resume */}
        {phase >= 5 && downloadResume.available && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              padding: isMobile ? '30px 20px' : isTablet ? '35px' : '40px',
              background: 'rgba(176, 0, 255, 0.1)',
              border: '2px solid var(--neon-purple)',
              borderRadius: '15px',
              textAlign: 'center',
              marginBottom: isMobile ? '50px' : '80px'
            }}
          >
            <div style={{ fontSize: isMobile ? '3rem' : '4rem', marginBottom: isMobile ? '15px' : '20px' }}>📄</div>
            <h3 style={{
              fontSize: isMobile ? '1.5rem' : isTablet ? '1.8rem' : '2rem',
              color: 'var(--neon-purple)',
              marginBottom: '15px',
              fontWeight: '700'
            }}>
              Want the Full Story?
            </h3>
            <p style={{
              fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem',
              color: 'var(--text-secondary)',
              marginBottom: isMobile ? '20px' : '25px',
              padding: isMobile ? '0 10px' : '0'
            }}>
              Download my resume for a complete overview of my experience and skills
            </p>
            <motion.button
              whileHover={{ scale: isMobile ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
              onMouseEnter={() => !isMobile && audioManager.play('hover')}
              className="neon-button"
              style={{
                padding: isMobile ? '12px 25px' : '15px 40px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                fontSize: isMobile ? '1rem' : '1.2rem',
                width: isMobile ? '100%' : 'auto',
                maxWidth: isMobile ? '300px' : 'none'
              }}
            >
              <span>⬇️</span>
              Download Resume
              {!isSmallMobile && (
                <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                  ({downloadResume.size})
                </span>
              )}
            </motion.button>
            <div style={{
              marginTop: '15px',
              fontSize: isMobile ? '0.75rem' : '0.85rem',
              color: 'var(--text-tertiary)'
            }}>
              Last updated: {downloadResume.lastUpdated}
            </div>
          </motion.div>
        )}

        {/* Thank You Section */}
        {phase >= 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              padding: isMobile ? '40px 25px' : isTablet ? '50px' : '60px',
              background: 'linear-gradient(135deg, rgba(0, 243, 255, 0.1), rgba(176, 0, 255, 0.1))',
              border: '3px solid var(--neon-blue)',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 0 50px rgba(0, 243, 255, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Animated stars background */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 20% 50%, rgba(0, 243, 255, 0.1), transparent 50%), radial-gradient(circle at 80% 50%, rgba(176, 0, 255, 0.1), transparent 50%)',
              animation: 'pulse 4s ease-in-out infinite',
              pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                style={{ fontSize: isMobile ? '4rem' : isTablet ? '5rem' : '6rem', marginBottom: isMobile ? '20px' : '30px' }}
              >
                🌟
              </motion.div>

              <h2 style={{
                fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
                color: 'var(--neon-blue)',
                marginBottom: isMobile ? '15px' : '20px',
                fontWeight: '900',
                textShadow: '0 0 30px var(--neon-blue)'
              }}>
                {thankYouMessage.title}
              </h2>

              <p style={{
                fontSize: isMobile ? '1.1rem' : isTablet ? '1.3rem' : '1.5rem',
                color: 'var(--text-primary)',
                marginBottom: isMobile ? '20px' : '30px',
                lineHeight: '1.8',
                padding: isMobile ? '0 10px' : '0'
              }}>
                {thankYouMessage.message}
              </p>

              <p style={{
                fontSize: isMobile ? '1.3rem' : isTablet ? '1.6rem' : '1.8rem',
                color: 'var(--neon-purple)',
                fontStyle: 'italic',
                marginBottom: isMobile ? '20px' : '30px',
                fontWeight: '600',
                padding: isMobile ? '0 10px' : '0'
              }}>
                "{thankYouMessage.quote}"
              </p>

              <p style={{
                fontSize: isMobile ? '1rem' : isTablet ? '1.2rem' : '1.3rem',
                color: 'var(--text-secondary)',
                marginBottom: isMobile ? '30px' : '40px',
                padding: isMobile ? '0 10px' : '0'
              }}>
                {thankYouMessage.callToAction}
              </p>

              {/* Journey Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: isMobile ? '20px' : '30px',
                padding: isMobile ? '20px' : '30px',
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '15px',
                marginBottom: isMobile ? '25px' : '30px'
              }}>
                <div>
                  <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', color: 'var(--neon-blue)', fontWeight: '900' }}>
                    {completedChapters.length}
                  </div>
                  <div style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', color: 'var(--text-tertiary)' }}>
                    Chapters Completed
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', color: 'var(--neon-purple)', fontWeight: '900' }}>
                    {xp}
                  </div>
                  <div style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', color: 'var(--text-tertiary)' }}>
                    Total XP Earned
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', color: 'var(--neon-blue)', fontWeight: '900' }}>
                    100%
                  </div>
                  <div style={{ fontSize: isMobile ? '0.8rem' : '0.9rem', color: 'var(--text-tertiary)' }}>
                    Journey Complete
                  </div>
                </div>
              </div>

              <p style={{
                fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
                color: 'var(--text-primary)',
                fontWeight: '600',
                padding: isMobile ? '0 10px' : '0'
              }}>
                {thankYouMessage.finalWords}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const QuickStatCard = ({ icon, label, value, isMobile }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 200 }}
    style={{
      background: 'rgba(13, 13, 13, 0.8)',
      border: '2px solid rgba(0, 243, 255, 0.3)',
      padding: isMobile ? '15px' : '20px',
      textAlign: 'center',
      backdropFilter: 'blur(5px)'
    }}
  >
    <div style={{ fontSize: isMobile ? '1.5rem' : '2rem', marginBottom: '10px' }}>{icon}</div>
    <div style={{
      fontSize: isMobile ? '0.7rem' : '0.8rem',
      color: 'var(--text-tertiary)',
      marginBottom: '5px',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    }}>
      {label}
    </div>
    <div style={{
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: 'var(--neon-blue)',
      fontWeight: '700',
      wordBreak: 'break-word'
    }}>
      {value}
    </div>
  </motion.div>
);

const ReasonCard = ({ reason, index, isMobile }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: isMobile ? 1 : 1.03 }}
    onHoverStart={() => !isMobile && audioManager.play('hover')}
    style={{
      padding: isMobile ? '20px' : '25px',
      background: 'rgba(10, 14, 39, 0.8)',
      border: '2px solid rgba(0, 243, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      cursor: 'pointer',
      transition: 'all 0.3s',
      textAlign: 'center'
    }}
  >
    <div style={{ fontSize: isMobile ? '2.5rem' : '3rem', marginBottom: '15px' }}>
      {reason.icon}
    </div>
    <h4 style={{
      fontSize: isMobile ? '1.1rem' : '1.2rem',
      color: 'var(--text-primary)',
      marginBottom: '10px',
      fontWeight: '700'
    }}>
      {reason.title}
    </h4>
    <p style={{
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      color: 'var(--text-secondary)'
    }}>
      {reason.description}
    </p>
  </motion.div>
);

export default Connection;