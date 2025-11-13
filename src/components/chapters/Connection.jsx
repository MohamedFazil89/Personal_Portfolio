// components/chapters/Connection.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useGameStore from '../../store/gameStore';
import ContactForm from '../ui/ContactForm';
import SocialCard from '../ui/SocialCard';
import {
    connectionIntro,
    socialLinks,
    contactReasons,
    quickStats,
    thankYouMessage,
    downloadResume
} from '../../utils/connectionData.js';


import audioManager from '../../utils/audioManager';

const Connection = ({ gridEnabled = true }) => {
    const [phase, setPhase] = useState(0);
    const { completeChapter, xp, completedChapters } = useGameStore();

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
            setTimeout(() => {
                setPhase(6);
                completeChapter('connection');
                audioManager.play('success');
            }, 8000),
        ];

        return () => timers.forEach(clearTimeout);
    }, [completeChapter]);

    const handleDownloadResume = () => {
        audioManager.play('powerUp');
        // Trigger download
        window.open(downloadResume.url, '_blank');
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
                            data-text="CHAPTER IV: CONNECTION"
                            style={{
                                fontSize: '3.5rem',
                                marginBottom: '20px',
                                fontWeight: '900'
                            }}
                        >
                            CHAPTER IV: CONNECTION
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
                            {connectionIntro.subtitle}
                        </h2>
                        <p style={{
                            fontSize: '1.2rem',
                            color: 'var(--text-secondary)',
                            lineHeight: '1.8',
                            maxWidth: '800px',
                            margin: '0 auto'
                        }}>
                            {connectionIntro.description}
                        </p>
                    </motion.div>
                )}

                {/* Quick Stats */}
                {phase >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '20px',
                            marginBottom: '60px'
                        }}
                    >
                        <QuickStatCard icon="⚡" label="Response Time" value={quickStats.responseTime} />
                        <QuickStatCard icon="🟢" label="Status" value={quickStats.availability} />
                        <QuickStatCard icon="🌍" label="Timezone" value={quickStats.timezone} />
                        <QuickStatCard icon="💬" label="Languages" value={quickStats.languages.join(', ')} />
                    </motion.div>
                )}

                {/* Contact Reasons */}
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
                                &gt; REACH_OUT_FOR
                            </h2>
                        </motion.div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '20px',
                            marginBottom: '80px'
                        }}>
                            {contactReasons.map((reason, index) => (
                                <ReasonCard key={index} reason={reason} index={index} />
                            ))}
                        </div>
                    </>
                )}

                {/* Contact Form & Social Links Grid */}
                {phase >= 4 && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '40px',
                        marginBottom: '80px'
                    }}>
                        {/* Contact Form */}
                        <div>
                            <ContactForm />
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 style={{
                                fontSize: '2rem',
                                color: 'var(--neon-purple)',
                                marginBottom: '30px',
                                textAlign: 'center',
                                fontWeight: '700',
                                textShadow: '0 0 20px var(--neon-purple)'
                            }}>
                                🌐 FIND_ME_ON
                            </h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '20px'
                            }}>
                                {socialLinks.map((social, index) => (
                                    <SocialCard key={social.id} social={social} index={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Download Resume */}
                {phase >= 5 && downloadResume.available && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            padding: '40px',
                            background: 'rgba(176, 0, 255, 0.1)',
                            border: '2px solid var(--neon-purple)',
                            borderRadius: '15px',
                            textAlign: 'center',
                            marginBottom: '80px'
                        }}
                    >
                        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📄</div>
                        <h3 style={{
                            fontSize: '2rem',
                            color: 'var(--neon-purple)',
                            marginBottom: '15px',
                            fontWeight: '700'
                        }}>
                            Want the Full Story?
                        </h3>
                        <p style={{
                            fontSize: '1.1rem',
                            color: 'var(--text-secondary)',
                            marginBottom: '25px'
                        }}>
                            Download my resume for a complete overview of my experience and skills
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleDownloadResume}
                            onMouseEnter={() => audioManager.play('hover')}
                            className="neon-button"
                            style={{
                                padding: '15px 40px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                fontSize: '1.2rem'
                            }}
                        >
                            <span>⬇️</span>
                            Download Resume
                            <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                                ({downloadResume.size})
                            </span>
                        </motion.button>
                        <div style={{
                            marginTop: '15px',
                            fontSize: '0.85rem',
                            color: 'var(--text-tertiary)'
                        }}>
                            Last updated: {downloadResume.lastUpdated}
                        </div>
                    </motion.div>
                )}

                {/* Thank You Section */}
                {phase >= 6 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{
                            padding: '60px',
                            background: 'linear-gradient(135deg, rgba(0, 243, 255, 0.1), rgba(176, 0, 255, 0.1))',
                            border: '3px solid var(--neon-blue)',
                            borderRadius: '20px',
                            textAlign: 'center',
                            boxShadow: '0 0 50px rgba(0, 243, 255, 0.3)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Animated stars background */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'radial-gradient(circle at 20% 50%, rgba(0, 243, 255, 0.1), transparent 50%), radial-gradient(circle at 80% 50%, rgba(176, 0, 255, 0.1), transparent 50%)',
                            animation: 'pulse 4s ease-in-out infinite',
                            pointerEvents: 'none'
                        }} />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                style={{ fontSize: '6rem', marginBottom: '30px' }}
                            >
                                🌟
                            </motion.div>

                            <h2 style={{
                                fontSize: '3rem',
                                color: 'var(--neon-blue)',
                                marginBottom: '20px',
                                fontWeight: '900',
                                textShadow: '0 0 30px var(--neon-blue)'
                            }}>
                                {thankYouMessage.title}
                            </h2>

                            <p style={{
                                fontSize: '1.5rem',
                                color: 'var(--text-primary)',
                                marginBottom: '30px',
                                lineHeight: '1.8'
                            }}>
                                {thankYouMessage.message}
                            </p>

                            <p style={{
                                fontSize: '1.8rem',
                                color: 'var(--neon-purple)',
                                fontStyle: 'italic',
                                marginBottom: '30px',
                                fontWeight: '600'
                            }}>
                                "{thankYouMessage.quote}"
                            </p>

                            <p style={{
                                fontSize: '1.3rem',
                                color: 'var(--text-secondary)',
                                marginBottom: '40px'
                            }}>
                                {thankYouMessage.callToAction}
                            </p>

                            {/* Journey Stats */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '30px',
                                padding: '30px',
                                background: 'rgba(0, 0, 0, 0.3)',
                                borderRadius: '15px',
                                marginBottom: '30px'
                            }}>
                                <div>
                                    <div style={{ fontSize: '2.5rem', color: 'var(--neon-blue)', fontWeight: '900' }}>
                                        {completedChapters.length}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>
                                        Chapters Completed
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '2.5rem', color: 'var(--neon-purple)', fontWeight: '900' }}>
                                        {xp}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>
                                        Total XP Earned
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '2.5rem', color: 'var(--neon-blue)', fontWeight: '900' }}>
                                        100%
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>
                                        Journey Complete
                                    </div>
                                </div>
                            </div>

                            <p style={{
                                fontSize: '1.2rem',
                                color: 'var(--text-primary)',
                                fontWeight: '600'
                            }}>
                                {thankYouMessage.finalWords}
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const QuickStatCard = ({ icon, label, value }) => (
    <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        style={{
            background: 'rgba(13, 13, 13, 0.8)',
            border: '2px solid rgba(0, 243, 255, 0.3)',
            padding: '20px',
            textAlign: 'center',
            backdropFilter: 'blur(5px)'
        }}
    >
        <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{icon}</div>
        <div style={{
            fontSize: '0.8rem',
            color: 'var(--text-tertiary)',
            marginBottom: '5px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        }}>
            {label}
        </div>
        <div style={{
            fontSize: '1rem',
            color: 'var(--neon-blue)',
            fontWeight: '700'
        }}>
            {value}
        </div>
    </motion.div>
);

const ReasonCard = ({ reason, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.03 }}
        onHoverStart={() => audioManager.play('hover')}
        style={{
            padding: '25px',
            background: 'rgba(10, 14, 39, 0.8)',
            border: '2px solid rgba(0, 243, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            transition: 'all 0.3s',
            textAlign: 'center'
        }}
    >
        <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
            {reason.icon}
        </div>
        <h4 style={{
            fontSize: '1.2rem',
            color: 'var(--text-primary)',
            marginBottom: '10px',
            fontWeight: '700'
        }}>
            {reason.title}
        </h4>
        <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-secondary)'
        }}>
            {reason.description}
        </p>
    </motion.div>
);

export default Connection;