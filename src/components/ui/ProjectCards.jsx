// components/ui/ProjectCard.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { difficultyConfig } from '../../utils/ProjectData';
import audioManager from '../../utils/audioManager';

const ProjectCard = ({ project, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const diffConfig = difficultyConfig[project.difficulty];

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
        padding: '30px',
        paddingBottom: '70px',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: isHovered ? diffConfig.glow : 'none',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Difficulty Badge */}
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        padding: '5px 15px',
        background: `${diffConfig.color}20`,
        border: `1px solid ${diffConfig.color}`,
        borderRadius: '20px',
        fontSize: '0.75rem',
        color: diffConfig.color,
        fontWeight: '700',
        letterSpacing: '1px',
        textShadow: `0 0 10px ${diffConfig.color}`
      }}>
        {project.difficulty}
      </div>

      {/* Thumbnail Icon */}
      <div style={{
        fontSize: '4rem',
        marginBottom: '20px',
        filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
        transition: 'filter 0.3s'
      }}>
        {project.thumbnail}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '1.8rem',
        color: 'var(--text-primary)',
        marginBottom: '10px',
        fontWeight: '700'
      }}>
        {project.title}
      </h3>

      {/* Category */}
      <div style={{
        display: 'inline-block',
        padding: '5px 12px',
        background: 'rgba(0, 243, 255, 0.1)',
        border: '1px solid rgba(0, 243, 255, 0.3)',
        borderRadius: '15px',
        fontSize: '0.8rem',
        color: 'var(--neon-blue)',
        marginBottom: '15px'
      }}>
        {project.category}
      </div>

      {/* Description */}
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '20px'
      }}>
        {project.description}
      </p>

      {/* Technologies */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '20px'
      }}>
        {project.technologies.slice(0, 4).map((tech, i) => (
          <span
            key={tech}
            style={{
              padding: '5px 10px',
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(0, 243, 255, 0.2)',
              borderRadius: '12px',
              fontSize: '0.75rem',
              color: 'var(--text-tertiary)'
            }}
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span style={{
            padding: '5px 10px',
            fontSize: '0.75rem',
            color: 'var(--text-tertiary)'
          }}>
            +{project.technologies.length - 4} more
          </span>
        )}
      </div>

      {/* Impact Metric */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
        background: 'rgba(0, 243, 255, 0.05)',
        border: '1px solid rgba(0, 243, 255, 0.2)',
        borderRadius: '8px'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '1.5rem',
            color: 'var(--neon-blue)',
            fontWeight: '900',
            marginBottom: '5px'
          }}>
            {project.impact.value}
          </div>
          <div style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)'
          }}>
            {project.impact.description}
          </div>
        </div>
        <div style={{
          fontSize: '2rem',
          opacity: 0.3
        }}>
          📊
        </div>
      </div>

      {/* XP Reward */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        left: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 15px',
        background: 'rgba(176, 0, 255, 0.2)',
        border: '1px solid var(--neon-purple)',
        borderRadius: '20px'
      }}>
        <span style={{ fontSize: '1.2rem' }}>⚡</span>
        <span style={{
          fontSize: '0.9rem',
          color: 'var(--neon-purple)',
          fontWeight: '700'
        }}>
          +{project.xpReward} XP
        </span>
      </div>

      {/* Hover Glow Effect */}
      {/* {isHovered && (
        <div style={{
          position: 'absolute',
          inset: -2,
          background: `radial-gradient(circle at 50% 50%, ${diffConfig.color}20, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0
        }} />
      )} */}

      {/* Click Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          position: 'absolute',
          bottom: '15px',
          right: '15px',
          display: 'flex',
          gap: '8px'
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            audioManager.play('click');
            onSelect(project, 'demo'); // Pass 'demo' as second param
          }}
          style={{
            fontSize: '0.8rem',
            padding: '5px 10px',
            background: diffConfig.color,
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            color: '#000',
            fontWeight: '600'
          }}
        >
          NetShell Demo
        </button>
      </motion.div>

    </motion.div>
  );
};

export default ProjectCard;