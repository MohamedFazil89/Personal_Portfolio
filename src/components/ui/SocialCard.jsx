// components/ui/SocialCard.jsx - FULLY RESPONSIVE VERSION
import { motion } from 'framer-motion';
import audioManager from '../../utils/audioManager';
import { useResponsive } from '../../utils/responsiveUtils';

const SocialCard = ({ social, index }) => {
  const { isMobile, isSmallMobile } = useResponsive();
  
  const handleClick = () => {
    audioManager.play('powerUp');
    window.open(social.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ 
        scale: isMobile ? 1 : 1.05,
        boxShadow: `0 0 40px ${social.color}80`
      }}
      onClick={handleClick}
      onHoverStart={() => !isMobile && audioManager.play('hover')}
      style={{
        background: 'rgba(10, 14, 39, 0.8)',
        border: `2px solid ${social.color}40`,
        padding: isMobile ? '20px' : '30px',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '200%',
        height: '200%',
        background: `radial-gradient(circle, ${social.color}10 0%, transparent 70%)`,
        pointerEvents: 'none'
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Icon */}
        <div style={{
          fontSize: isMobile ? '3rem' : '4rem',
          marginBottom: isMobile ? '15px' : '20px',
          textAlign: 'center',
          filter: 'brightness(1.2)'
        }}>
          {social.icon}
        </div>

        {/* Platform Name */}
        <h4 style={{
          fontSize: isMobile ? '1.4rem' : '1.8rem',
          color: social.color,
          textAlign: 'center',
          marginBottom: '10px',
          fontWeight: '900',
          textShadow: `0 0 20px ${social.color}`
        }}>
          {social.name}
        </h4>

        {/* Username */}
        <div style={{
          textAlign: 'center',
          marginBottom: '15px'
        }}>
          <span style={{
            padding: '5px 15px',
            background: `${social.color}20`,
            border: `1px solid ${social.color}60`,
            borderRadius: '20px',
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            color: social.color,
            fontWeight: '600',
            display: 'inline-block',
            wordBreak: 'break-all'
          }}>
            {isSmallMobile && social.username.length > 20 
              ? social.username.substring(0, 20) + '...' 
              : social.username
            }
          </span>
        </div>

        {/* Description */}
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: isMobile ? '0.85rem' : '0.95rem',
          textAlign: 'center',
          marginBottom: '15px',
          lineHeight: '1.5'
        }}>
          {social.description}
        </p>

        {/* Stats */}
        <div style={{
          textAlign: 'center',
          padding: isMobile ? '10px' : '12px',
          background: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px'
        }}>
          <div style={{
            fontSize: isMobile ? '0.7rem' : '0.8rem',
            color: 'var(--text-tertiary)',
            marginBottom: '5px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Activity
          </div>
          <div style={{
            fontSize: isMobile ? '0.95rem' : '1.1rem',
            color: social.color,
            fontWeight: '700'
          }}>
            {social.stats}
          </div>
        </div>

        {/* Hover Arrow */}
        {!isMobile && (
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
            style={{
              position: 'absolute',
              bottom: '15px',
              right: '15px',
              fontSize: '1.5rem',
              color: social.color
            }}
          >
            →
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SocialCard;