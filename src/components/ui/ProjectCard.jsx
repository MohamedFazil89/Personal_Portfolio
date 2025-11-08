// components/ui/ProjectCard.jsx - FIXED WITH ERROR HANDLING
import { useState } from 'react';
import { motion } from 'framer-motion';
import { difficultyConfig } from '../../utils/ProjectData';
import audioManager from '../../utils/audioManager';

const ProjectCard = ({ project, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // ✅ FIX: Add default fallback for diffConfig
  const diffConfig = difficultyConfig[project.difficulty] || difficultyConfig['COMMON'] || {
    color: '#00f3ff',
    glow: '0 0 30px #00f3ff'
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    audioManager.play('hover');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    audioManager.play('click');
    onSelect(project);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: project.unlockDelay / 1000,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ scale: 1.02 }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        background: 'rgba(10, 14, 39, 0.8)',
        border: `2px solid ${isHovered ? diffConfig.color : 'rgba(0, 243, 255, 0.3)'}`,
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        paddingBottom: 'clamp(4rem, 8vw, 5rem)',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: isHovered ? diffConfig.glow : 'none',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
        minHeight: '100%'
      }}
    >
      {/* Difficulty Badge */}
      <div style={{
        position: 'absolute',
        top: 'clamp(0.75rem, 1.5vw, 1rem)',
        right: 'clamp(0.75rem, 1.5vw, 1rem)',
        padding: 'clamp(4px, 0.5vw, 8px) clamp(8px, 1vw, 12px)',
        background: `${diffConfig.color}20`,
        border: `1px solid ${diffConfig.color}`,
        borderRadius: '20px',
        fontSize: 'clamp(0.65rem, 1vw, 0.75rem)',
        color: diffConfig.color,
        fontWeight: '700',
        letterSpacing: '0.5px',
        textShadow: `0 0 10px ${diffConfig.color}`,
        whiteSpace: 'nowrap'
      }}>
        {project.difficulty}
      </div>

      {/* Thumbnail Icon */}
      <div style={{
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
        transition: 'filter 0.3s'
      }}>
        {project.thumbnail}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
        color: 'var(--text-primary)',
        fontWeight: '700',
        lineHeight: '1.3'
      }}>
        {project.title}
      </h3>

      {/* Category */}
      <div style={{
        display: 'inline-block',
        padding: 'clamp(4px, 0.5vw, 6px) clamp(8px, 1vw, 12px)',
        background: 'rgba(0, 243, 255, 0.1)',
        border: '1px solid rgba(0, 243, 255, 0.3)',
        borderRadius: '15px',
        fontSize: 'clamp(0.7rem, 1vw, 0.8rem)',
        color: 'var(--neon-blue)',
        width: 'fit-content'
      }}>
        {project.category}
      </div>

      {/* Description */}
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
        lineHeight: '1.5',
        flex: 1
      }}>
        {project.description}
      </p>

      {/* Technologies */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(0.5rem, 1vw, 0.75rem)'
      }}>
        {project.technologies?.slice(0, 3).map((tech) => (
          <span
            key={tech}
            style={{
              padding: 'clamp(3px, 0.5vw, 6px) clamp(6px, 1vw, 10px)',
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(0, 243, 255, 0.2)',
              borderRadius: '10px',
              fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)',
              color: 'var(--text-tertiary)',
              whiteSpace: 'nowrap'
            }}
          >
            {tech}
          </span>
        ))}
        {project.technologies?.length > 3 && (
          <span style={{
            padding: 'clamp(3px, 0.5vw, 6px) clamp(6px, 1vw, 10px)',
            fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)',
            color: 'var(--text-tertiary)'
          }}>
            +{project.technologies.length - 3} more
          </span>
        )}
      </div>

      {/* Impact Metric */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(1rem, 1.5vw, 1.25rem)',
        background: 'rgba(0, 243, 255, 0.05)',
        border: '1px solid rgba(0, 243, 255, 0.2)',
        borderRadius: '8px',
        gap: 'clamp(0.75rem, 1.5vw, 1rem)'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
            color: 'var(--neon-blue)',
            fontWeight: '900',
            marginBottom: '0.25rem'
          }}>
            {project.impact?.value || 'N/A'}
          </div>
          <div style={{
            fontSize: 'clamp(0.75rem, 1vw, 0.85rem)',
            color: 'var(--text-secondary)',
            lineHeight: '1.3'
          }}>
            {project.impact?.description || 'No impact data'}
          </div>
        </div>
        <div style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          opacity: 0.3,
          flexShrink: 0
        }}>
          📊
        </div>
      </div>

      {/* XP Reward */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(0.75rem, 1.5vw, 1rem)',
        left: 'clamp(0.75rem, 1.5vw, 1rem)',
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(0.5rem, 1vw, 0.75rem)',
        padding: 'clamp(6px, 1vw, 8px) clamp(10px, 1.5vw, 15px)',
        background: 'rgba(176, 0, 255, 0.2)',
        border: '1px solid var(--neon-purple)',
        borderRadius: '20px'
      }}>
        <span style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}>⚡</span>
        <span style={{
          fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
          color: 'var(--neon-purple)',
          fontWeight: '700'
        }}>
          +{project.xpReward || 0} XP
        </span>
      </div>

      {/* Click Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          position: 'absolute',
          bottom: 'clamp(0.75rem, 1.5vw, 1rem)',
          right: 'clamp(0.75rem, 1.5vw, 1rem)',
          display: 'flex',
          gap: 'clamp(0.5rem, 1vw, 0.75rem)',
          alignItems: 'center'
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            audioManager.play('click');
            onSelect(project, 'demo');
          }}
          style={{
            fontSize: 'clamp(0.75rem, 1vw, 0.85rem)',
            padding: 'clamp(6px, 1vw, 8px) clamp(10px, 1.5vw, 15px)',
            background: diffConfig.color,
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            color: '#000',
            fontWeight: '600',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '1';
          }}
        >
          NetShell Demo
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;