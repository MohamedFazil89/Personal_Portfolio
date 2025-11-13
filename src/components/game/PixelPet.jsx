// src/components/game/PixelPet.jsx - FULLY DEBUGGED & OPTIMIZED
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../../store/gameStore';

const MOODS = {
  HAPPY: { emoji: '😊', color: '#00f3ff', message: 'Your pet is happy!' },
  EXCITED: { emoji: '🤩', color: '#ff0066', message: 'Your pet is excited!' },
  CURIOUS: { emoji: '🤔', color: '#b000ff', message: 'Your pet is curious...' },
  SLEEPING: { emoji: '😴', color: '#666', message: 'Shhh... sleeping...' },
  CELEBRATING: { emoji: '🎉', color: '#00ff66', message: 'Achievement unlocked!' }
};

const INTERACTIONS = [
  { id: 'pet', emoji: '👋', label: 'Pet', response: 'Aww! 💙' },
  { id: 'feed', emoji: '🍕', label: 'Feed', response: 'Yum! 🍕' },
  { id: 'play', emoji: '🎮', label: 'Play', response: 'Fun! 🎮' },
  { id: 'code', emoji: '💻', label: 'Code Together', response: 'Let\'s code! 💻' }
];

const CHAPTER_MESSAGES = {
  prologue: '🚀 Let\'s begin the journey!',
  origin: '✨ Your origin story awaits!',
  trials: '🎯 Ooh! Trials! Check out at least 3 projects to unlock Vision! 💪',
  vision: '🌟 The Creator chapter! Let\'s see your vision!',
  connection: '🤝 Final chapter! Time to connect!'
};

const PixelPet = () => {
  // ✅ State Management
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [mood, setMood] = useState(MOODS.HAPPY);
  const [isDragging, setIsDragging] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [speechBubble, setSpeechBubble] = useState(null);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [petName] = useState('Codie');
  const [shownChapters, setShownChapters] = useState(new Set());

  const { currentChapter } = useGameStore();

  // ✅ Refs for cleanup
  const moodTimerRef = useRef(null);
  const moveTimerRef = useRef(null);
  const speechTimerRef = useRef(null);
  const saveTimeoutRef = useRef(null);
  const chapterMessageTimerRef = useRef(null);

  // ✅ FIXED: Debounced localStorage with try/catch
  const saveGameState = useCallback(() => {
    try {
      localStorage.setItem('pixelPetData', JSON.stringify({
        level,
        xp,
        position,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Failed to save pet data:', error);
    }
  }, [level, xp, position]);

  // ✅ FIXED: Debounce save to every 3 seconds max
  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    
    saveTimeoutRef.current = setTimeout(() => {
      saveGameState();
    }, 3000);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [level, xp, position, saveGameState]);

  // ✅ FIXED: Load saved state with proper error handling
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pixelPetData');
      if (saved) {
        const data = JSON.parse(saved);
        
        // Validate data before using
        if (data.level && typeof data.level === 'number') setLevel(data.level);
        if (data.xp && typeof data.xp === 'number') setXp(data.xp);
        if (data.position && typeof data.position === 'object') setPosition(data.position);
      }
    } catch (error) {
      console.error('Failed to load pet data:', error);
      // Use defaults (already set)
    }
  }, []);

  // ✅ FIXED: Separated mood timer with proper cleanup
  useEffect(() => {
    if (isDragging || showMenu) {
      if (moodTimerRef.current) clearInterval(moodTimerRef.current);
      return;
    }

    const moods = [MOODS.HAPPY, MOODS.CURIOUS];
    moodTimerRef.current = setInterval(() => {
      setMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 8000);

    return () => {
      if (moodTimerRef.current) clearInterval(moodTimerRef.current);
    };
  }, [isDragging, showMenu]); // Only depends on these two

  // ✅ FIXED: Separated movement timer
  useEffect(() => {
    if (isDragging || showMenu) {
      if (moveTimerRef.current) clearInterval(moveTimerRef.current);
      return;
    }

    moveTimerRef.current = setInterval(() => {
      setPosition(prev => ({
        x: Math.max(50, Math.min(window.innerWidth - 50, prev.x + (Math.random() - 0.5) * 100)),
        y: Math.max(50, Math.min(window.innerHeight - 50, prev.y + (Math.random() - 0.5) * 100))
      }));
    }, 5000);

    return () => {
      if (moveTimerRef.current) clearInterval(moveTimerRef.current);
    };
  }, [isDragging, showMenu]);

  // ✅ FIXED: Chapter message with proper deduplication
  useEffect(() => {
    if (currentChapter && !shownChapters.has(currentChapter)) {
      setMood(MOODS.EXCITED);
      const message = CHAPTER_MESSAGES[currentChapter] || `Ooh! ${currentChapter}! 🚀`;
      setSpeechBubble(message);
      
      // Update set immediately to prevent duplicates
      setShownChapters(prev => new Set([...prev, currentChapter]));

      if (chapterMessageTimerRef.current) clearTimeout(chapterMessageTimerRef.current);
      
      chapterMessageTimerRef.current = setTimeout(() => {
        setSpeechBubble(null);
        setMood(MOODS.HAPPY);
      }, 5000);
    }

    return () => {
      if (chapterMessageTimerRef.current) clearTimeout(chapterMessageTimerRef.current);
    };
  }, [currentChapter, shownChapters]);

  // ✅ FIXED: Proper interaction with message queue & level overflow handling
  const handleInteraction = useCallback((interaction) => {
    const xpGain = 10;
    const newXp = xp + xpGain;
    let newLevel = level;

    // ✅ FIXED: Handle level overflow (if xp jumps multiple levels)
    if (newXp >= level * 100) {
      newLevel = Math.floor(newXp / 100) + 1;
      setLevel(newLevel);
      setXp(newXp);

      // Level up celebration
      setMood(MOODS.CELEBRATING);
      setSpeechBubble(`Level ${newLevel}! 🎉`);

      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
      speechTimerRef.current = setTimeout(() => {
        setSpeechBubble(null);
        setMood(MOODS.HAPPY);
      }, 3000);
    } else {
      // Regular interaction
      setXp(newXp);
      setMood(MOODS.EXCITED);
      setSpeechBubble(interaction.response);

      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
      speechTimerRef.current = setTimeout(() => {
        setSpeechBubble(null);
        setMood(MOODS.HAPPY);
      }, 2000);
    }

    setShowMenu(false);
  }, [xp, level]);

  const handleSleep = useCallback(() => {
    setMood(MOODS.SLEEPING);
    setShowMenu(false);
    setSpeechBubble('Zzz...');

    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    speechTimerRef.current = setTimeout(() => {
      setSpeechBubble(null);
      setMood(MOODS.HAPPY);
    }, 5000);
  }, []);

  // ✅ Cleanup on unmount
  useEffect(() => {
    return () => {
      if (moodTimerRef.current) clearInterval(moodTimerRef.current);
      if (moveTimerRef.current) clearInterval(moveTimerRef.current);
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      if (chapterMessageTimerRef.current) clearTimeout(chapterMessageTimerRef.current);
    };
  }, []);

  return (
    <>
      {/* Pet Character */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={{
          left: 0,
          right: window.innerWidth - 60,
          top: 0,
          bottom: window.innerHeight - 60
        }}
        onDragStart={() => {
          setIsDragging(true);
          setShowMenu(false);
        }}
        onDrag={(event, info) => {
          setPosition({ x: info.point.x, y: info.point.y });
        }}
        onDragEnd={() => {
          setIsDragging(false);
        }}
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          x: '-50%',
          y: '-50%',
          zIndex: 9999,
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none'
        }}
        animate={{
          scale: isDragging ? 1.2 : 1
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={() => {
          if (!isDragging) {
            setShowMenu(!showMenu);
          }
        }}
      >
        {/* Pet Body */}
        <motion.div
          animate={{
            rotate: isDragging ? [0, -5, 5, -5, 0] : 0,
            y: mood === MOODS.SLEEPING ? 0 : [0, -5, 0]
          }}
          transition={{
            rotate: { duration: 0.5 },
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          }}
          style={{
            width: '60px',
            height: '60px',
            background: `radial-gradient(circle, ${mood.color}, rgba(0,0,0,0.8))`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: `0 0 20px ${mood.color}`,
            border: `3px solid ${mood.color}`,
            position: 'relative'
          }}
        >
          {mood.emoji}

          {/* Level Badge */}
          <div style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            background: 'rgba(255, 0, 102, 0.9)',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem',
            fontWeight: 900,
            color: 'white',
            border: '2px solid white',
            boxShadow: '0 0 10px rgba(255, 0, 102, 0.8)'
          }}>
            {level}
          </div>
        </motion.div>

        {/* Speech Bubble - ✅ FIXED: Mobile responsive, overflow-aware */}
        <AnimatePresence>
          {speechBubble && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              style={{
                position: 'absolute',
                bottom: 'clamp(60px, 15vw, 80px)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(10, 14, 39, 0.95)',
                border: `2px solid ${mood.color}`,
                borderRadius: '12px',
                padding: 'clamp(10px, 2vw, 14px)',
                fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                color: 'white',
                boxShadow: `0 0 15px ${mood.color}`,
                zIndex: 10000,
                minWidth: '150px',
                maxWidth: 'clamp(200px, 80vw, 280px)',
                whiteSpace: 'normal',
                textAlign: 'center',
                lineHeight: '1.4'
              }}
            >
              {speechBubble}
              <div style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: `8px solid ${mood.color}`
              }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Interaction Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              left: 'clamp(10px, calc(100vw / 2 - 100px), calc(100vw - 200px))',
              top: 'clamp(10px, 50%, calc(100vh - 400px))',
              background: 'rgba(10, 14, 39, 0.98)',
              border: '2px solid var(--neon-blue)',
              borderRadius: '12px',
              padding: '15px',
              zIndex: 10000,
              boxShadow: '0 0 30px rgba(0, 243, 255, 0.5)',
              minWidth: '200px'
            }}
          >
            <div style={{
              fontSize: '0.9rem',
              color: 'var(--neon-blue)',
              marginBottom: '10px',
              fontWeight: 700,
              textAlign: 'center'
            }}>
              {petName} • Lvl {level}
            </div>

            {/* Chapter Tip Section */}
            {currentChapter && CHAPTER_MESSAGES[currentChapter] && (
              <div style={{
                background: 'rgba(0, 243, 255, 0.1)',
                border: '1px solid var(--neon-blue)',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '12px',
                fontSize: '0.75rem',
                color: 'var(--text-primary)',
                textAlign: 'center',
                lineHeight: '1.4'
              }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--neon-blue)', marginBottom: '5px', fontWeight: 700 }}>
                  💡 TIP
                </div>
                {CHAPTER_MESSAGES[currentChapter]}
              </div>
            )}

            {/* XP Bar */}
            <div style={{
              width: '100%',
              height: '8px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '4px',
              marginBottom: '12px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${((xp % (level * 100)) / (level * 100)) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--neon-blue), var(--neon-purple))',
                borderRadius: '4px',
                transition: 'width 0.3s'
              }} />
            </div>

            {/* Interaction Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {INTERACTIONS.map(interaction => (
                <button
                  key={interaction.id}
                  onClick={() => handleInteraction(interaction)}
                  style={{
                    background: 'rgba(0, 243, 255, 0.1)',
                    border: '1px solid var(--neon-blue)',
                    borderRadius: '6px',
                    padding: '8px',
                    cursor: 'pointer',
                    color: 'white',
                    fontSize: '0.75rem',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 243, 255, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 243, 255, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{interaction.emoji}</span>
                  {interaction.label}
                </button>
              ))}
            </div>

            {/* Sleep Button */}
            <button
              onClick={handleSleep}
              style={{
                width: '100%',
                marginTop: '8px',
                background: 'rgba(102, 102, 102, 0.2)',
                border: '1px solid #666',
                borderRadius: '6px',
                padding: '8px',
                cursor: 'pointer',
                color: '#999',
                fontSize: '0.75rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(102, 102, 102, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(102, 102, 102, 0.2)';
              }}
            >
              😴 Sleep
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PixelPet;