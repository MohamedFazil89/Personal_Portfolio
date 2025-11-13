// components/chapters/Origin.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useGameStore from '../../store/gameStore';
import SkillCard from '../ui/SkillCard';
import { skillsData, aboutData } from '../../utils/SkillsData.js';

const Origin = () => {
  const [phase, setPhase] = useState(0);
  const [unlockedSkills, setUnlockedSkills] = useState([]);
  const { unlockSkill, completeChapter, setCurrentChapter } = useGameStore();

  useEffect(() => {
    // Phase progression
    const timers = [
      setTimeout(() => setPhase(1), 500), // Title appears
      setTimeout(() => setPhase(2), 2000), // Story text
      setTimeout(() => setPhase(3), 4000), // Stats
      setTimeout(() => setPhase(4), 5500), // Skills grid
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSkillUnlock = (skill) => {
    unlockSkill(skill);
    setUnlockedSkills(prev => [...prev, skill.id]);
  };

  const handleContinue = () => {
    completeChapter('origin');
    setCurrentChapter('trials');
  };

  return (
    <div className="chapter-container" style={{ minHeight: '100vh', padding: '80px 20px', position: 'relative' }}>
      {/* Background effects */}
      <div className="grid-bg" />
      <div className="scanlines" />

      {/* Content wrapper */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Chapter Title */}
        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h1 className="glitch neon-text" data-text="CHAPTER I: ORIGIN" style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: 900 }}>
              CHAPTER I: ORIGIN
            </h1>
            <div style={{ width: '100px', height: '3px', background: 'linear-gradient(90deg, transparent, var(--neon-primary), transparent)', margin: '0 auto', boxShadow: '0 0 20px var(--neon-primary)' }} />
          </motion.div>
        )}

        {/* Story Section */}
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              background: 'rgba(26, 26, 26, 0.6)',
              border: '2px solid rgba(255, 0, 68, 0.3)',
              padding: '50px',
              marginBottom: '60px',
              backdropFilter: 'blur(10px)',
              clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))'
            }}
          >
            <p style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '20px', fontStyle: 'italic', textAlign: 'center' }}>
              {aboutData.intro}
            </p>
            <p style={{ fontSize: '2rem', color: 'var(--neon-primary)', textAlign: 'center', marginBottom: '40px', fontWeight: 700, textShadow: '0 0 20px var(--neon-primary)' }}>
              {aboutData.question}
            </p>
            {aboutData.story.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + (i * 0.3) }}
                style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}
              >
                {paragraph}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              style={{ fontSize: '1.2rem', color: 'var(--neon-primary)', marginTop: '30px', fontWeight: 600 }}
            >
              &gt; {aboutData.currentMission}
            </motion.p>
          </motion.div>
        )}

        {/* Stats Grid - SECRET SCANNER MARKER #1 */}
        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='stat-coffee'
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '80px'
            }}
          >
            {Object.entries(aboutData.stats).map(([key, value], i) => (
              <motion.div
                key={key}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + (i * 0.1), type: 'spring' }}
                style={{
                  background: 'rgba(13, 13, 13, 0.8)',
                  border: '2px solid rgba(255, 0, 68, 0.3)',
                  padding: '30px',
                  textAlign: 'center',
                  clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                }}
              >
                <div style={{ fontSize: '3rem', color: 'var(--neon-primary)', fontWeight: 900, marginBottom: '10px', textShadow: '0 0 20px var(--neon-primary)' }}>
                  {value.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Skills Section */}
        {phase >= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ marginBottom: '40px', textAlign: 'center' }}
          >
            <h2 style={{ fontSize: '2.5rem', color: 'var(--neon-primary)', marginBottom: '15px', fontWeight: 700, textShadow: '0 0 20px var(--neon-primary)' }}>
              &gt; SKILLS_UNLOCKED
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              Scroll to unlock each ability
            </p>
          </motion.div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', marginBottom: '60px' }}>
          {skillsData.map((skill, index) => (
            <SkillCard 
              key={skill.id}
              skill={skill}
              index={index}
              onUnlock={handleSkillUnlock}
            />
          ))}
        </div>

        {/* Continue Button */}
        {unlockedSkills.length === skillsData.length && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginTop: '60px' }}
          >
            <button className="neon-button" onClick={handleContinue}>
              &gt; Continue to Trials
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Origin;
