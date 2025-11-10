// components/chapters/Vision.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useGameStore from '../../store/gameStore';
import FocusCard from '../ui/FocusCard';
import DreamCard from '../ui/DreamCard';
import {
    visionIntro,
    currentFocus,
    dreamProjects,
    learningGoals,
    collaborationInterests,
    personalMotto
} from '../../utils/visionData';
import audioManager from '../../utils/audioManager';

import AboutModal from '../ui/AboutModal';


const Vision = ({ gridEnabled = true }) => {
    const [phase, setPhase] = useState(0);
    const { completeChapter, setCurrentChapter } = useGameStore();
    const [showAboutModal, setShowAboutModal] = useState(false);


    useEffect(() => {
        // Phase progression
        const timers = [
            setTimeout(() => {
                setPhase(1);
                audioManager.play('glitch');
            }, 500),
            setTimeout(() => {
                setPhase(2);
                audioManager.play('type');
            }, 2000),
            setTimeout(() => setPhase(3), 3500),
            setTimeout(() => setPhase(4), 5000),
            setTimeout(() => setPhase(5), 6500),
            setTimeout(() => setPhase(6), 8000),
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    const handleContinue = () => {
        audioManager.play('success');
        completeChapter('vision');
        setTimeout(() => {
            audioManager.play('transition');
            setCurrentChapter('connection');
        }, 500);
    };

    return (
        <div className="chapter-container" style={{
            minHeight: '100vh',
            padding: '80px 20px',
            position: 'relative'
        }}>
            {/* Background effects */}
            {gridEnabled && <div className="grid-bg" />}
            <div className="scanlines" />

            {/* Content wrapper */}
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 2
            }}>

                {/* Chapter Title */}
                {phase >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        style={{ textAlign: 'center', marginBottom: '60px' }}
                    >
                        <h1
                            className="glitch neon-text"
                            data-text="CHAPTER III: THE CREATOR"
                            style={{
                                fontSize: '3.5rem',
                                marginBottom: '20px',
                                fontWeight: '900'
                            }}
                        >
                            CHAPTER III: THE CREATOR
                        </h1>
                        <div style={{
                            width: '100px',
                            height: '3px',
                            background: 'linear-gradient(90deg, transparent, var(--neon-blue), transparent)',
                            margin: '0 auto',
                            boxShadow: '0 0 20px var(--neon-blue)'
                        }} />
                    </motion.div>
                )}

                {/* Intro Section */}
                {phase >= 2 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{
                            background: 'rgba(26, 26, 26, 0.6)',
                            border: '2px solid rgba(0, 243, 255, 0.3)',
                            padding: '50px',
                            marginBottom: '60px',
                            backdropFilter: 'blur(10px)',
                            textAlign: 'center'
                        }}
                    >
                        <h2 style={{
                            fontSize: '2.5rem',
                            color: 'var(--neon-blue)',
                            marginBottom: '20px',
                            fontWeight: '700',
                            textShadow: '0 0 20px var(--neon-blue)'
                        }}>
                            {visionIntro.subtitle}
                        </h2>
                        <p style={{
                            fontSize: '1.5rem',
                            color: 'var(--text-primary)',
                            fontStyle: 'italic',
                            marginBottom: '30px',
                            lineHeight: '1.8'
                        }}>
                            "{visionIntro.quote}"
                        </p>
                        <p style={{
                            fontSize: '1.2rem',
                            color: 'var(--text-secondary)',
                            lineHeight: '1.8'
                        }}>
                            {visionIntro.description}
                        </p>
                    </motion.div>
                )}

                {/* Current Focus Section */}
                {phase >= 3 && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            style={{ marginBottom: '40px', textAlign: 'center' }}
                        >
                            <h2 style={{
                                fontSize: '2.5rem',
                                color: 'var(--neon-blue)',
                                marginBottom: '15px',
                                fontWeight: '700',
                                textShadow: '0 0 20px var(--neon-blue)'
                            }}>
                                &gt; CURRENT_FOCUS
                            </h2>
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '1.1rem'
                            }}>
                                What I'm learning right now
                            </p>
                        </motion.div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                            gap: '30px',
                            marginBottom: '80px'
                        }}>
                            {currentFocus.map((focus, index) => (
                                <FocusCard key={focus.id} focus={focus} index={index} />
                            ))}
                        </div>
                    </>
                )}

                {/* Dream Projects Section */}
                {phase >= 4 && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            style={{ marginBottom: '40px', textAlign: 'center' }}
                        >
                            <h2 style={{
                                fontSize: '2.5rem',
                                color: 'var(--neon-purple)',
                                marginBottom: '15px',
                                fontWeight: '700',
                                textShadow: '0 0 20px var(--neon-purple)'
                            }}>
                                ✨ Origin Moments
                            </h2>
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '1.1rem'
                            }}>
                                The Experience that builds me • Click cards to flip
                            </p>
                        </motion.div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '30px',
                            marginBottom: '80px'
                        }}>
                            {dreamProjects.map((dream, index) => (
                                <DreamCard key={dream.id} dream={dream} index={index} />
                            ))}
                        </div>
                    </>
                )}
                <br></br>
                <br></br>
                <br></br>

                {/* Learning Goals Section */}
                {phase >= 5 && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            style={{ marginBottom: '40px', textAlign: 'center' }}
                        >
                            <h2 style={{
                                fontSize: '2.5rem',
                                color: 'var(--neon-blue)',
                                marginBottom: '15px',
                                fontWeight: '700',
                                textShadow: '0 0 20px var(--neon-blue)'
                            }}>
                                Know About Me
                            </h2>
                        </motion.div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '20px',
                            marginBottom: '80px'

                        }}  onClick={() => setShowAboutModal(true)}>
                            {learningGoals.map((goal, index) => (
                                <LearningGoalCard key={index} goal={goal} index={index} />
                            ))}
                        </div>
                {showAboutModal && <AboutModal onClose={() => setShowAboutModal(false)} />}

                    </>
                )}


                {/* Collaboration Section */}
                {phase >= 6 && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            style={{ marginBottom: '40px', textAlign: 'center' }}
                        >
                            <h2 style={{
                                fontSize: '2.5rem',
                                color: 'var(--neon-purple)',
                                marginBottom: '15px',
                                fontWeight: '700',
                                textShadow: '0 0 20px var(--neon-purple)'
                            }}>
                                🤝 OPEN_TO
                            </h2>
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '1.1rem'
                            }}>
                                Let's create something amazing together
                            </p>
                        </motion.div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '25px',
                            marginBottom: '60px'
                        }}>
                            {collaborationInterests.map((collab, index) => (
                                <CollaborationCard key={index} collab={collab} index={index} />
                            ))}
                        </div>
                    </>
                )}

                {/* Personal Motto */}
                {phase >= 6 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{
                            padding: '50px',
                            background: 'linear-gradient(135deg, rgba(0, 243, 255, 0.1), rgba(176, 0, 255, 0.1))',
                            border: '3px solid var(--neon-blue)',
                            borderRadius: '15px',
                            textAlign: 'center',
                            marginBottom: '60px',
                            boxShadow: '0 0 40px rgba(0, 243, 255, 0.3)'
                        }}
                    >
                        <div style={{
                            fontSize: '2rem',
                            marginBottom: '20px'
                        }}>
                            ⭐
                        </div>
                        <p style={{
                            fontSize: '1.8rem',
                            color: 'var(--text-primary)',
                            fontStyle: 'italic',
                            lineHeight: '1.8',
                            marginBottom: '20px',
                            fontWeight: '300'
                        }}>
                            "{personalMotto.text}"
                        </p>
                        <p style={{
                            fontSize: '1.1rem',
                            color: 'var(--neon-blue)',
                            fontWeight: '600'
                        }}>
                            — {personalMotto.author}
                        </p>
                    </motion.div>
                )}

                {/* Continue Button */}
                {phase >= 6 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        style={{ textAlign: 'center', marginTop: '60px' }}
                    >
                        <p style={{
                            color: 'var(--text-secondary)',
                            marginBottom: '20px',
                            fontSize: '1.1rem'
                        }}>
                            Ready to connect?
                        </p>
                        <button
                            className="neon-button"
                            onClick={handleContinue}
                            onMouseEnter={() => audioManager.play('hover')}
                        >
                            &gt; Continue to Connection
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const LearningGoalCard = ({ goal, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.03 }}
        onHoverStart={() => audioManager.play('hover')}
        style={{
            padding: '25px',
            background: 'rgba(10, 14, 39, 0.8)',
            border: `2px solid ${goal.priority === 'HIGH' ? '#ff0066' : goal.priority === 'MEDIUM' ? '#b000ff' : '#00f3ff'}`,
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            transition: 'all 0.3s'
        }}
    >
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '15px'
        }}>
            <div style={{ fontSize: '2.5rem' }}>
                {goal.icon}
            </div>
            <div style={{
                padding: '4px 10px',
                background: goal.priority === 'HIGH' ? 'rgba(255, 0, 102, 0.2)' :
                    goal.priority === 'MEDIUM' ? 'rgba(176, 0, 255, 0.2)' :
                        'rgba(0, 243, 255, 0.2)',
                border: `1px solid ${goal.priority === 'HIGH' ? '#ff0066' : goal.priority === 'MEDIUM' ? '#b000ff' : '#00f3ff'}`,
                borderRadius: '12px',
                fontSize: '0.7rem',
                color: goal.priority === 'HIGH' ? '#ff0066' : goal.priority === 'MEDIUM' ? '#b000ff' : '#00f3ff',
                fontWeight: '700'
            }}>
                {goal.priority}
            </div>
        </div>
        <h4 style={{
            fontSize: '1.2rem',
            color: 'var(--text-primary)',
            marginBottom: '10px',
            fontWeight: '700'
        }}>
            {goal.skill}
        </h4>
        <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.5'
        }}>
            {goal.reason}
        </p>
    </motion.div>
);

const CollaborationCard = ({ collab, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.15 }}
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => audioManager.play('hover')}
        style={{
            padding: '30px',
            background: 'rgba(10, 14, 39, 0.8)',
            border: '2px solid rgba(176, 0, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            transition: 'all 0.3s',
            textAlign: 'center'
        }}
    >
        <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
            {collab.icon}
        </div>
        <h4 style={{
            fontSize: '1.5rem',
            color: 'var(--neon-purple)',
            marginBottom: '15px',
            fontWeight: '700'
        }}>
            {collab.type}
        </h4>
        <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginBottom: '15px',
            lineHeight: '1.6'
        }}>
            {collab.description}
        </p>
        <div style={{
            padding: '12px',
            background: 'rgba(176, 0, 255, 0.1)',
            border: '1px solid rgba(176, 0, 255, 0.3)',
            borderRadius: '8px'
        }}>
            <div style={{
                fontSize: '0.85rem',
                color: 'var(--text-tertiary)',
                marginBottom: '5px'
            }}>
                Looking For
            </div>
            <div style={{
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                fontWeight: '600'
            }}>
                {collab.lookingFor}
            </div>
        </div>
    </motion.div>
);

export default Vision;