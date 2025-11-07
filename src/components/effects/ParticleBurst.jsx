// components/effects/ParticleBurst.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ParticleBurst = ({ color = '#ff0044', count = 20 }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      angle: (360 / count) * i,
      distance: Math.random() * 100 + 50,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 0.5 + 0.5
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {particles.map((particle) => {
        const radians = (particle.angle * Math.PI) / 180;
        const x = Math.cos(radians) * particle.distance;
        const y = Math.sin(radians) * particle.distance;

        return (
          <motion.div
            key={particle.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{
              x,
              y,
              opacity: 0,
              scale: 1
            }}
            transition={{
              duration: particle.duration,
              ease: 'easeOut'
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: particle.size,
              height: particle.size,
              background: color,
              borderRadius: '50%',
              boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`
            }}
          />
        );
      })}
    </div>
  );
};

export default ParticleBurst;