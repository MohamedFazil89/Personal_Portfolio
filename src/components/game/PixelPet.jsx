// src/components/game/PixelPet.jsx
import { useState, useEffect } from 'react';
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

// Chapter-specific messages
const CHAPTER_MESSAGES = {
    prologue: '🚀 Let\'s begin the journey!',
    origin: '✨ Your origin story awaits!',
    trials: '🎯 Ooh! Trials! Check out at least 3 projects to unlock Vision! 💪',
    vision: '🌟 The Creator chapter! Let\'s see your vision!',
    connection: '🤝 Final chapter! Time to connect!'
};

const PixelPet = () => {
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [mood, setMood] = useState(MOODS.HAPPY);
    const [isDragging, setIsDragging] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [speechBubble, setSpeechBubble] = useState(null);
    const [level, setLevel] = useState(1);
    const [xp, setXp] = useState(0);
    const [petName] = useState('Codie');
    const [hasShownChapterMessage, setHasShownChapterMessage] = useState({});

    const { currentChapter } = useGameStore();

    // Load saved state
    useEffect(() => {
        const saved = localStorage.getItem('pixelPetData');
        if (saved) {
            const data = JSON.parse(saved);
            setLevel(data.level || 1);
            setXp(data.xp || 0);
            setPosition(data.position || { x: 100, y: 100 });
        }
    }, []);

    // Save state
    useEffect(() => {
        localStorage.setItem('pixelPetData', JSON.stringify({ level, xp, position }));
    }, [level, xp, position]);

    // Random mood changes
    useEffect(() => {
        const moodTimer = setInterval(() => {
            if (!isDragging && !showMenu) {
                const moods = [MOODS.HAPPY, MOODS.CURIOUS];
                setMood(moods[Math.floor(Math.random() * moods.length)]);
            }
        }, 8000);

        return () => clearInterval(moodTimer);
    }, [isDragging, showMenu]);

    // React to chapter changes with custom messages
    useEffect(() => {
        if (currentChapter && !hasShownChapterMessage[currentChapter]) {
            setMood(MOODS.EXCITED);

            // Get custom message for chapter
            const message = CHAPTER_MESSAGES[currentChapter] || `Ooh! ${currentChapter}! 🚀`;

            setSpeechBubble(message);
            setHasShownChapterMessage(prev => ({ ...prev, [currentChapter]: true }));

            setTimeout(() => {
                setSpeechBubble(null);
                setMood(MOODS.HAPPY);
            }, 5000);
        }
    }, [currentChapter, hasShownChapterMessage]);

    // Random movement (idle animation)
    useEffect(() => {
        if (!isDragging && !showMenu) {
            const moveTimer = setInterval(() => {
                setPosition(prev => ({
                    x: Math.max(50, Math.min(window.innerWidth - 50, prev.x + (Math.random() - 0.5) * 100)),
                    y: Math.max(50, Math.min(window.innerHeight - 50, prev.y + (Math.random() - 0.5) * 100))
                }));
            }, 5000);

            return () => clearInterval(moveTimer);
        }
    }, [isDragging, showMenu]);
    const handleInteraction = (interaction) => {
        const newXp = xp + 10;
        setXp(newXp);

        if (newXp >= level * 100) {
            setLevel(level + 1);
            setMood(MOODS.CELEBRATING);
            setSpeechBubble(`Level ${level + 1}! 🎉`);

            setTimeout(() => {
                setSpeechBubble(null);
                setMood(MOODS.HAPPY);
            }, 3000);
        } else {
            setMood(MOODS.EXCITED);
            setSpeechBubble(interaction.response);
            setTimeout(() => {
                setSpeechBubble(null);
                setMood(MOODS.HAPPY);
            }, 2000);
        }

        setShowMenu(false);
    };

    const handleSleep = () => {
        setMood(MOODS.SLEEPING);
        setShowMenu(false);
        setSpeechBubble('Zzz...');

        setTimeout(() => {
            setSpeechBubble(null);
            setMood(MOODS.HAPPY);
        }, 5000);
    };

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
                onDragStart={() => setIsDragging(true)}
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

                {/* Speech Bubble */}
                {/* Speech Bubble */}
<AnimatePresence>
    {speechBubble && (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            style={{
                position: 'absolute',
                bottom: '70px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(10, 14, 39, 0.95)',
                border: `2px solid ${mood.color}`,
                borderRadius: '12px',
                padding: '10px 14px',           // ← Increased padding
                fontSize: '0.85rem',
                color: 'white',
                boxShadow: `0 0 15px ${mood.color}`,
                zIndex: 10000,
                minWidth: '180px',              // ← Added minWidth
                maxWidth: '260px',              // ← Increased to 260px
                whiteSpace: 'normal',
                textAlign: 'center',
                lineHeight: '1.4'               // ← Added line height for readability
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
                            left: position.x,
                            top: position.y,
                            transform: 'translate(-50%, -50%)',
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
                                width: `${(xp % (level * 100)) / (level * 100) * 100}%`,
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
