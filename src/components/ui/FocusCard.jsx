// components/ui/FocusCard.jsx
import { motion } from 'framer-motion';
import audioManager from '../../utils/audioManager';

const FocusCard = ({ focus, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => audioManager.play('hover')}
      style={{
        background: 'rgba(10, 14, 39, 0.8)',
        border: '2px solid rgba(0, 243, 255, 0.3)',
        padding: '30px',
        backdropFilter: 'blur(10px)',
        cursor: 'pointer',
        transition: 'all 0.3s'
      }}
    >
      {/* Icon & Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '20px'
      }}>
        <div style={{
          fontSize: '3rem',
          width: '70px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 243, 255, 0.1)',
          border: '2px solid rgba(0, 243, 255, 0.3)',
          borderRadius: '50%'
        }}>
          {focus.icon}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: '1.5rem',
            color: 'var(--text-primary)',
            marginBottom: '5px',
            fontWeight: '700'
          }}>
            {focus.title}
          </h3>
          <div style={{
            display: 'inline-block',
            padding: '3px 10px',
            background: 'rgba(176, 0, 255, 0.2)',
            border: '1px solid var(--neon-purple)',
            borderRadius: '12px',
            fontSize: '0.75rem',
            color: 'var(--neon-purple)',
            fontWeight: '600'
          }}>
            {focus.timeframe}
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '20px'
      }}>
        {focus.description}
      </p>

      {/* Progress Bar */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontSize: '0.85rem'
        }}>
          <span style={{ color: 'var(--text-tertiary)' }}>PROGRESS</span>
          <span style={{ 
            color: 'var(--neon-blue)', 
            fontWeight: '700' 
          }}>
            {focus.progress}%
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '10px',
          background: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '5px',
          overflow: 'hidden',
          border: '1px solid rgba(0, 243, 255, 0.2)'
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${focus.progress}%` }}
            transition={{ duration: 1.5, delay: index * 0.2 + 0.5 }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--neon-blue), var(--neon-purple))',
              boxShadow: '0 0 15px var(--neon-blue)',
              borderRadius: '5px'
            }}
          />
        </div>
      </div>

      {/* Resources */}
      <div>
        <div style={{
          fontSize: '0.8rem',
          color: 'var(--text-tertiary)',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Learning From
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          {focus.resources.map((resource, i) => (
            <span
              key={i}
              style={{
                padding: '5px 12px',
                background: 'rgba(0, 243, 255, 0.1)',
                border: '1px solid rgba(0, 243, 255, 0.2)',
                borderRadius: '15px',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)'
              }}
            >
              {resource}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FocusCard;