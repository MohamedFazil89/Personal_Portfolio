// components/ui/DreamCard.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import audioManager from '../../utils/audioManager';

const DreamCard = ({ dream, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    audioManager.play(isFlipped ? 'click' : 'skillUnlock');
    setIsFlipped(!isFlipped);
  };

  const statusColors = {
    'Conceptualizing': '#ff0066',
    'Prototyping': '#b000ff',
    'Planning': '#00f3ff',
    'Researching': '#00ff88'
  };

  const statusColor = statusColors[dream.status] || '#00f3ff';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{
        perspective: '1000px',
        height: '400px'
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onClick={handleFlip}
        onHoverStart={() => audioManager.play('hover')}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          cursor: 'pointer'
        }}
      >
        {/* Front Side */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          background: 'rgba(10, 14, 39, 0.9)',
          border: `3px solid ${statusColor}`,
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: `0 0 30px ${statusColor}40`,
          backdropFilter: 'blur(10px)'
        }}>
          {/* Status Badge */}
          <div style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            padding: '5px 12px',
            background: `${statusColor}20`,
            border: `1px solid ${statusColor}`,
            borderRadius: '15px',
            fontSize: '0.7rem',
            color: statusColor,
            fontWeight: '700',
            textShadow: `0 0 10px ${statusColor}`
          }}>
            {dream.status}
          </div>

          {/* Icon */}
          <div style={{
            fontSize: '5rem',
            textAlign: 'center',
            marginBottom: '20px',
            marginTop: '20px'
          }}>
            {dream.icon}
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: '1.8rem',
            color: 'var(--text-primary)',
            textAlign: 'center',
            marginBottom: '10px',
            fontWeight: '900'
          }}>
            {dream.title}
          </h3>

          {/* Category */}
          <div style={{
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <span style={{
              padding: '5px 15px',
              background: 'rgba(0, 243, 255, 0.1)',
              border: '1px solid rgba(0, 243, 255, 0.3)',
              borderRadius: '20px',
              fontSize: '0.85rem',
              color: 'var(--neon-blue)'
            }}>
              {dream.category}
            </span>
          </div>

          {/* Description */}
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            lineHeight: '1.6',
            textAlign: 'center',
            flex: 1
          }}>
            {dream.description}
          </p>

          {/* Timeline */}
          <div style={{
            textAlign: 'center',
            padding: '15px',
            background: 'rgba(0, 243, 255, 0.05)',
            border: '1px solid rgba(0, 243, 255, 0.2)',
            borderRadius: '8px',
            marginTop: 'auto'
          }}>
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--text-tertiary)',
              marginBottom: '5px'
            }}>
              LESSON LEARNED
            </div>
            <div style={{
              fontSize: '1.2rem',
              color: 'var(--text-primary)',
              fontWeight: '700',
              filter:"drop-shadow(0,0,10px black)"
            }}>
              {dream.timeline}
            </div>
          </div>

          {/* Flip Hint */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              textAlign: 'center',
              marginTop: '15px',
              fontSize: '0.8rem',
              color: statusColor
            }}
          >
            Click to flip →
          </motion.div>
        </div>

        {/* Back Side */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'rgba(10, 14, 39, 0.95)',
          border: `3px solid ${statusColor}`,
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: `0 0 30px ${statusColor}40`,
          backdropFilter: 'blur(10px)',
          overflowY: 'auto'
        }}>
          {/* Back Header */}
          <h4 style={{
            fontSize: '1.5rem',
            color: statusColor,
            textAlign: 'center',
            marginBottom: '10px',
            fontWeight: '700',
            textShadow: `0 0 15px ${statusColor}`
          }}>
            The Vision
          </h4>

          {/* Impact */}
          <div>
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--text-tertiary)',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              💫 Intended Impact
            </div>
            <p style={{
              color: 'var(--text-primary)',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              padding: '12px',
              background: 'rgba(0, 243, 255, 0.05)',
              border: '1px solid rgba(0, 243, 255, 0.2)',
              borderRadius: '8px'
            }}>
              {dream.impact}
            </p>
          </div>

          {/* Tech Vision
          <div>
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--text-tertiary)',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              🛠️ Tech Stack Vision
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              {dream.techVision.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  style={{
                    padding: '8px 14px',
                    background: 'rgba(176, 0, 255, 0.1)',
                    border: '1px solid var(--neon-purple)',
                    borderRadius: '15px',
                    fontSize: '0.85rem',
                    color: 'var(--neon-purple)',
                    fontWeight: '600'
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div> */}

          {/* Call to Action */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              marginTop: 'auto',
              padding: '15px',
              background: `${statusColor}20`,
              border: `2px solid ${statusColor}`,
              borderRadius: '10px',
              textAlign: 'center'
            }}
          >
            <div style={{
              fontSize: '1.1rem',
              color: statusColor,
              fontWeight: '700'
            }}>
              Want to collaborate?
            </div>
            <div style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              marginTop: '5px'
            }}>
              Let's build this together
            </div>
          </motion.div>

          {/* Flip Back Hint */}
          <div style={{
            textAlign: 'center',
            fontSize: '0.8rem',
            color: statusColor,
            opacity: 0.7
          }}>
            ← Click to flip back
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DreamCard;