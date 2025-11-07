// components/ui/SkillCard.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import ParticleBurst from '../effects/ParticleBurst';

const SkillCard = ({ skill, index, onUnlock }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleUnlock = () => {
    if (!isUnlocked) {
      setIsUnlocked(true);
      setShowParticles(true);
      onUnlock(skill);
      
      // Remove particles after animation
      setTimeout(() => setShowParticles(false), 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: skill.unlockDelay / 1000,
        ease: [0.4, 0, 0.2, 1]
      }}
      onViewportEnter={handleUnlock}
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        position: 'relative',
        background: isUnlocked 
          ? 'rgba(26, 26, 26, 0.8)' 
          : 'rgba(13, 13, 13, 0.6)',
        border: `2px solid ${isUnlocked ? skill.color : 'rgba(0, 225, 255, 0.2)'}`,
        padding: '30px',
        cursor: 'pointer',
        overflow: 'hidden',
        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
        transition: 'all 0.3s ease',
        boxShadow: isUnlocked 
          ? `0 0 30px ${skill.color}40, inset 0 0 20px ${skill.color}10`
          : 'none',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)'
      }}
    >
      {/* Particle burst on unlock */}
      {showParticles && <ParticleBurst color={skill.color} count={25} />}

      {/* Lock overlay */}
      {!isUnlocked && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          backdropFilter: 'blur(5px)',
          zIndex: 2
        }}>
          🔒
        </div>
      )}

      {/* Skill content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
          <span style={{ fontSize: '2.5rem' }}>{skill.icon}</span>
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontSize: '1.5rem',
              color: isUnlocked ? skill.color : 'var(--text-tertiary)',
              marginBottom: '5px',
              fontWeight: '700',
              textShadow: isUnlocked ? `0 0 10px ${skill.color}` : 'none',
              transition: 'all 0.3s'
            }}>
              {skill.name}
            </h3>
            <span style={{
              fontSize: '0.85rem',
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {skill.category}
            </span>
          </div>
          
          {/* XP Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isUnlocked ? 1 : 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            style={{
              padding: '8px 15px',
              background: `${skill.color}20`,
              border: `1px solid ${skill.color}`,
              borderRadius: '20px',
              fontSize: '0.9rem',
              color: skill.color,
              fontWeight: '600'
            }}
          >
            +{skill.xp} XP
          </motion.div>
        </div>

        {/* Description */}
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          lineHeight: '1.6',
          marginBottom: '15px',
          opacity: isUnlocked ? 1 : 0.3,
          transition: 'opacity 0.3s'
        }}>
          {skill.description}
        </p>

        {/* Level bar */}
        <div style={{ marginBottom: '15px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontSize: '0.85rem'
          }}>
            <span style={{ color: 'var(--text-tertiary)' }}>LEVEL</span>
            <span style={{ color: skill.color, fontWeight: '600' }}>
              {isUnlocked ? skill.level : 0}%
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isUnlocked ? `${skill.level}%` : 0 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`,
                boxShadow: `0 0 10px ${skill.color}`,
                borderRadius: '10px'
              }}
            />
          </div>
        </div>

        {/* Tools */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {skill.tools.map((tool, i) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isUnlocked ? 1 : 0.3, scale: 1 }}
              transition={{ delay: 0.6 + (i * 0.1) }}
              style={{
                padding: '5px 12px',
                background: isUnlocked ? 'rgba(0, 204, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${isUnlocked ? 'rgba(0, 238, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: '15px',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                transition: 'all 0.3s'
              }}
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Glow effect on hover */}
      {isUnlocked && isHovered && (
        <div style={{
          position: 'absolute',
          inset: -2,
          background: `radial-gradient(circle at 50% 50%, ${skill.color}40, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0
        }} />
      )}
    </motion.div>
  );
};

export default SkillCard;