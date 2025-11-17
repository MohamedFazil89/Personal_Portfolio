// components/chapters/Trials.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useGameStore from '../../store/gameStore';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';
import { projectsData, trialsIntro } from '../../utils/ProjectData';
import audioManager from '../../utils/audioManager';

const Trials = ({ gridEnabled = true }) => {
    const [phase, setPhase] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null);
    const [completedProjects, setCompletedProjects] = useState([]);
    const { completeChapter, setCurrentChapter } = useGameStore();
    const [selectedTab, setSelectedTab] = useState('overview'); // ADD THIS LINE


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
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    const handleProjectSelect = (project, tab = 'overview') => {  // Accept tab parameter
        setSelectedProject(project);
        setSelectedTab(tab);  // Store it
        if (!completedProjects.includes(project.id)) {
            setCompletedProjects([...completedProjects, project.id]);
            useGameStore.getState().unlockSkill({ xp: project.xpReward });
        }
    };


    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    const handleContinue = () => {
        audioManager.play('success');
        completeChapter('trials');
        setTimeout(() => {
            audioManager.play('transition');
            setCurrentChapter('vision');
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
                            data-text="CHAPTER II: THE TRIALS"
                            style={{
                                fontSize: '3.5rem',
                                marginBottom: '20px',
                                fontWeight: '900'
                            }}
                        >
                            CHAPTER II: THE TRIALS
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
                            padding: '40px',
                            marginBottom: '60px',
                            backdropFilter: 'blur(10px)',
                            textAlign: 'center'
                        }}
                    >
                        <h2 style={{
                            fontSize: '2rem',
                            color: 'var(--neon-blue)',
                            marginBottom: '15px',
                            fontWeight: '700',
                            textShadow: '0 0 20px var(--neon-blue)'
                        }}>
                            {trialsIntro.subtitle}
                        </h2>
                        <p style={{
                            fontSize: '1.2rem',
                            color: 'var(--text-secondary)',
                            lineHeight: '1.8',
                            marginBottom: '20px'
                        }}>
                            {trialsIntro.description}
                        </p>
                        <p style={{
                            fontSize: '1rem',
                            color: 'var(--text-tertiary)',
                            fontStyle: 'italic'
                        }}>
                            {trialsIntro.missionStatement}
                        </p>
                    </motion.div>
                )}

                {/* Stats Summary */}
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
                        <StatCard
                            icon="🎮"
                            value={projectsData.length}
                            label="Quests Completed"
                        />
                        <StatCard
                            icon="⚡"
                            value={projectsData.reduce((acc, p) => acc + p.xpReward, 0)}
                            label="Total XP Available"
                        />
                        <StatCard
                            icon="🏆"
                            value={completedProjects.length}
                            label="Explored Projects"
                        />
                    </motion.div>
                )}

                {/* Projects Grid */}
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
                                &gt; QUEST_LOG
                            </h2>
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '1.1rem'
                            }}>
                                Select a quest to view details
                            </p>
                        </motion.div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                            gap: '30px',
                            marginBottom: '60px'
                        }}>
                            {projectsData.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onSelect={handleProjectSelect}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* Continue Button */}
                {completedProjects.length >= 3 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: 'center', marginTop: '60px' }}
                    >
                        <p style={{
                            color: 'var(--text-secondary)',
                            marginBottom: '20px',
                            fontSize: '1.1rem'
                        }}>
                            You've explored enough quests to continue your journey
                        </p>
                        <button
                            className="neon-button"
                            onClick={handleContinue}
                            onMouseEnter={() => audioManager.play('hover')}
                        >
                            &gt; Continue to Vision
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: 'center', marginTop: '60px' }}
                    >
                        <p style={{
                            color: 'var(--text-secondary)',
                            marginBottom: '20px',
                            fontSize: '1.1rem'
                        }}>
                            You have to explore atleast 3 projects to unlock Vision
                        </p>
                        <button
                            className="neon-button"
                            onClick={handleContinue}
                            style={{ color:"white", borderColor:"red", backgroundColor:"red"}}
                            onMouseEnter={() => audioManager.play('hover')}
                        >
                            &gt; <strike>Continue to Vision</strike>
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={handleCloseModal}
                    initialTab={selectedTab}  // ADD THIS
                />
            )}

        </div>
    );
};

const StatCard = ({ icon, value, label }) => (
    <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        style={{
            background: 'rgba(13, 13, 13, 0.8)',
            border: '2px solid rgba(0, 243, 255, 0.3)',
            padding: '25px',
            textAlign: 'center',
            backdropFilter: 'blur(5px)'
        }}
    >
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
            {icon}
        </div>
        <div style={{
            fontSize: '2.5rem',
            color: 'var(--neon-blue)',
            fontWeight: '900',
            marginBottom: '5px',
            textShadow: '0 0 20px var(--neon-blue)'
        }}>
            {value}
        </div>
        <div style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        }}>
            {label}
        </div>
    </motion.div>
);

export default Trials;