// components/chapters/Prologue.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useGameStore from '../../store/gameStore';
import audioManager from '../../utils/audioManager';


const Prologue = () => {
  const [phase, setPhase] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  const { setCurrentChapter, completeChapter } = useGameStore();
  const [showDialogue, setShowDialogue] = useState(false);

  // 

  // 
  useEffect(() => {
    // Initialize audio on component mount
    audioManager.init();

    // Start prologue music with fade in
    setTimeout(() => {
      audioManager.playMusic('prologue', 3000);
    }, 500);

    // Sequential loading text with SFX
    const loadingTimers = [
      setTimeout(() => {
        setLoadingStep(1);
        audioManager.playSFX('uiClick');
      }, 1000),
      setTimeout(() => {
        setLoadingStep(2);
        audioManager.playSFX('uiClick');
      }, 2500),
      setTimeout(() => {
        setLoadingStep(3);
        audioManager.playSFX('dialogueAppear');
      }, 4000),
    ];

    // Phase timing
    const phaseTimers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => {
        setPhase(2);
        audioManager.playSFX('chapterTransition');
      }, 5500),
      setTimeout(() => {
        setPhase(3);
        audioManager.playSFX('dialogueAppear');
      }, 8500),
    ];

    return () => {
      loadingTimers.forEach(clearTimeout);
      phaseTimers.forEach(clearTimeout);
    };
  }, []);

  const handleStartJourney = () => {
    // Play transition sound
    audioManager.playSFX('questComplete');

    // Complete chapter and move to next
    completeChapter('prologue');

    // Transition to Origin chapter with music crossfade
    setTimeout(() => {
      audioManager.playMusic('origin', 2000);
      setCurrentChapter('origin');
    }, 800);
  };

  const handleButtonHover = () => {
    audioManager.playSFX('uiHover');
  };

  return (
    <div className="chapter-container" style={{ position: 'relative' }}>
      {/* Background Grid */}
      <div className="grid-bg" />

      {/* Scanlines Effect */}
      <div className="scanlines" />

      {/* Phase 1: Opening Text */}
      {phase >= 1 && phase < 2 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center', zIndex: 2 }}
        >
          <h1
            className="glitch neon-text"
            data-text="INITIALIZING..."
            style={{ fontSize: '4rem', marginBottom: '2rem' }}
          >
            INITIALIZING...
          </h1>
          <div style={{ fontSize: '1rem', minHeight: '0px' }}>
            {loadingStep === 1 && (
              <motion.p
                initial={{ opacity: 0, x: -20, y: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                style={{ color: 'var(--text-secondary)', marginBottom: '1px' }}
              >
                &gt; Loading user profile...
              </motion.p>
            )}
            {loadingStep === 2 && (
              <motion.p
                initial={{ opacity: 0, x: -20, y: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                style={{ color: 'var(--text-secondary)', marginBottom: '1px' }}
              >
                &gt; Establishing connection...
              </motion.p>
            )}
            {loadingStep === 3 && (
              <motion.p
                initial={{ opacity: 0, x: -20, y: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                style={{ color: 'var(--neon-primary)' }}
              >
                &gt; Welcome to the Grid.
              </motion.p>
            )}
          </div>
        </motion.div>
      )}

      {/* Phase 2: Avatar Entrance */}
      {phase >= 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{
            position: 'absolute',
            width: '350px',
            height: '350px',
            overflow: 'hidden',
            // border: '3px solid var(--neon-blue)',
            // boxShadow: '0 0 50px var(--neon-blue), inset 0 0 30px rgba(0, 243, 255, 0.2)',
            zIndex: 3,
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)'
          }}
        >
          {/* Avatar Image */}
          <img
            src="/assets/avatar.png"
            alt="Fazil Avatar"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              animation: 'float 3s ease-in-out infinite'
            }}
          />
        </motion.div>
      )}

      {/* Phase 3: Dialogue Box */}
      {phase >= 3 && (
        <motion.div
          initial={{ width: "0%", opacity: 0 }}
          animate={{ width: "80%", opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          onAnimationComplete={() => setShowDialogue(true)} // <--- important
          style={{
            position: "absolute",
            bottom: "100px",
            width: "80%",
            height: "40%",
            maxHeight: "400px",
            maxWidth: "800px",
            background: "rgba(10, 14, 39, 0.95)",
            border: "2px solid var(--neon-blue)",
            padding: "30px",
            boxShadow: "0 0 30px rgba(0, 243, 255, 0.3)",
            zIndex: 4,
            overflow: "hidden",
          }}
        >
          {showDialogue && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="message" style={{
                fontSize: "1.3rem",
                marginBottom: "20px",
                color: "var(--text-primary)",
              }}>
                <span style={{ color: "var(--neon-blue)" }}>[Fazil]:</span>{" "}
                Welcome, traveler. You've entered my domain — a world built from code,
                creativity, and countless late nights.
              </p>

              <p
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "30px",
                  color: "var(--text-secondary)",
                }}
              >
                Ready to explore what I've built? Each chapter reveals a piece of the
                journey.
              </p>

              <motion.button
                className="neon-button"
                onClick={handleStartJourney}
                onMouseEnter={handleButtonHover}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Start Journey
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Ambient particle glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 243, 255, 0.1), transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Prologue;