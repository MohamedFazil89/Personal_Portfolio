
// RESPONSIVE FIXES - Copy these updates to your project

// ============================================
// 1. UPDATE ProjectModal.jsx
// ============================================

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { difficultyConfig } from '../../utils/ProjectData';
import audioManager from '../../utils/audioManager';
import { useResponsive } from '../../utils/responsiveUtils';
import useGameStore from '../../store/gameStore';

const DEFAULT_DIFF = { color: '#ccc', glow: 'none' };

const ProjectModal = ({ project, onClose, initialTab = 'overview' }) => {
  const { unlockSkill } = useGameStore();
  const diffConfig = difficultyConfig[project.difficulty] || DEFAULT_DIFF;
  const [activeTab, setActiveTab] = useState(initialTab);
  const { isMobile, isSmallMobile } = useResponsive();

  useEffect(() => {
    audioManager.play('success');
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    audioManager.play('click');
    onClose();
  };

  const handleLinkClick = (type) => {
    audioManager.play('powerUp');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(10px)',
          zIndex: 10000,
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'center',
          padding: isMobile ? '10px' : '20px',
          overflowY: 'auto',
          paddingTop: isMobile ? '60px' : '20px',
          paddingBottom: isMobile ? '60px' : '20px'
        }}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          transition={{ type: 'spring', duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: isMobile ? '100%' : '900px',
            width: '100%',
            background: 'rgba(10, 14, 39, 0.95)',
            border: `3px solid ${diffConfig.color}`,
            borderRadius: isMobile ? '10px' : '15px',
            padding: isMobile ? '20px' : '40px',
            boxShadow: diffConfig.glow,
            position: 'relative',
            maxHeight: isMobile ? 'none' : '90vh',
            overflowY: 'auto',
            margin: isMobile ? '0 auto' : 'auto'
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            onMouseEnter={() => !isMobile && audioManager.play('hover')}
            style={{
              position: 'absolute',
              top: isMobile ? '10px' : '20px',
              right: isMobile ? '10px' : '20px',
              width: isMobile ? '35px' : '40px',
              height: isMobile ? '35px' : '40px',
              borderRadius: '50%',
              background: 'rgba(255, 0, 0, 0.2)',
              border: '2px solid #ff0066',
              color: '#ff0066',
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              zIndex: 10
            }}
          >
            ✕
          </button>

          {/* Header */}
          <div style={{ marginBottom: isMobile ? '20px' : '30px', paddingRight: isMobile ? '30px' : '0' }}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
              gap: isMobile ? '15px' : '20px',
              marginBottom: isMobile ? '15px' : '20px'
            }}>
              <div style={{ fontSize: isMobile ? '3rem' : '5rem' }}>
                {project.thumbnail}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'inline-block',
                  padding: isMobile ? '4px 12px' : '5px 15px',
                  background: `${diffConfig.color}20`,
                  border: `1px solid ${diffConfig.color}`,
                  borderRadius: '20px',
                  fontSize: isMobile ? '0.65rem' : '0.75rem',
                  color: diffConfig.color,
                  fontWeight: '700',
                  marginBottom: '10px',
                  textShadow: `0 0 10px ${diffConfig.color}`
                }}>
                  {project.difficulty} QUEST
                </div>
                <h2 style={{
                  fontSize: isMobile ? '1.5rem' : '2.5rem',
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  fontWeight: '900',
                  lineHeight: '1.2'
                }}>
                  {project.title}
                </h2>
                <div style={{
                  display: 'inline-block',
                  padding: isMobile ? '4px 10px' : '5px 12px',
                  background: 'rgba(0, 243, 255, 0.1)',
                  border: '1px solid rgba(0, 243, 255, 0.3)',
                  borderRadius: '15px',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  color: 'var(--neon-blue)'
                }}>
                  {project.category}
                </div>
              </div>
            </div>

            <p style={{
              fontSize: isMobile ? '1rem' : '1.2rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              {project.description}
            </p>
          </div>

          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: isMobile ? '8px' : '10px',
            marginBottom: isMobile ? '20px' : '30px',
            borderBottom: '2px solid rgba(0, 243, 255, 0.2)',
            paddingBottom: '10px',
            flexWrap: 'wrap'
          }}>
            <TabButton
              label="Overview"
              active={activeTab === 'overview'}
              onClick={() => {
                setActiveTab('overview');
                audioManager.play('click');
              }}
              isMobile={isMobile}
            />
            <TabButton
              label={isMobile ? "Demo" : "NetShell Demo"}
              active={activeTab === 'demo'}
              onClick={() => {
                setActiveTab('demo');
                audioManager.play('click');
              }}
              isMobile={isMobile}
            />
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' ? (
            <div>
              {/* Challenge Section */}
              <Section
                icon="⚔️"
                title="The Challenge"
                content={project.challenge}
                isMobile={isMobile}
              />

              {/* Solution Section */}
              <Section
                icon="💡"
                title="The Solution"
                content={project.solution}
                isMobile={isMobile}
              />

              {/* Features */}
              <div style={{ marginBottom: isMobile ? '20px' : '30px' }}>
                <h3 style={{
                  fontSize: isMobile ? '1.2rem' : '1.5rem',
                  color: 'var(--neon-blue)',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span>✨</span> Key Features
                </h3>
                <div style={{
                  display: 'grid',
                  gap: '10px'
                }}>
                  {project.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      style={{
                        padding: isMobile ? '10px 12px' : '12px 15px',
                        background: 'rgba(0, 243, 255, 0.05)',
                        border: '1px solid rgba(0, 243, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'var(--text-secondary)',
                        fontSize: isMobile ? '0.9rem' : '1rem'
                      }}
                    >
                      <span style={{ color: 'var(--neon-blue)', marginRight: '10px' }}>▸</span>
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div style={{ marginBottom: isMobile ? '20px' : '30px' }}>
                <h3 style={{
                  fontSize: isMobile ? '1.2rem' : '1.5rem',
                  color: 'var(--neon-blue)',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span>🛠️</span> Tech Stack
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: isMobile ? '8px' : '10px'
                }}>
                  {project.technologies.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * i }}
                      style={{
                        padding: isMobile ? '6px 12px' : '8px 16px',
                        background: 'rgba(176, 0, 255, 0.1)',
                        border: '1px solid var(--neon-purple)',
                        borderRadius: '20px',
                        fontSize: isMobile ? '0.8rem' : '0.9rem',
                        color: 'var(--neon-purple)',
                        fontWeight: '600'
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div style={{
                padding: isMobile ? '20px' : '25px',
                background: `linear-gradient(135deg, ${diffConfig.color}10, rgba(0, 243, 255, 0.05))`,
                border: `2px solid ${diffConfig.color}40`,
                borderRadius: '12px',
                marginBottom: isMobile ? '20px' : '30px'
              }}>
                <h3 style={{
                  fontSize: isMobile ? '1.2rem' : '1.5rem',
                  color: diffConfig.color,
                  marginBottom: '15px',
                  textShadow: `0 0 15px ${diffConfig.color}`
                }}>
                  📈 Impact
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  gap: isMobile ? '15px' : '20px'
                }}>
                  <div style={{
                    fontSize: isMobile ? '2.5rem' : '3.5rem',
                    fontWeight: '900',
                    color: diffConfig.color,
                    textShadow: `0 0 20px ${diffConfig.color}`
                  }}>
                    {project.impact.value}
                  </div>
                  <div>
                    <div style={{
                      fontSize: isMobile ? '1rem' : '1.2rem',
                      color: 'var(--text-primary)',
                      fontWeight: '600',
                      marginBottom: '5px'
                    }}>
                      {project.impact.metric}
                    </div>
                    <div style={{
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      color: 'var(--text-secondary)'
                    }}>
                      {project.impact.description}
                    </div>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '15px',
                justifyContent: 'center'
              }}>
                <motion.button
                  whileHover={{ scale: isMobile ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLinkClick('github')}
                  onMouseEnter={() => !isMobile && audioManager.play('hover')}
                  className="neon-button"
                  style={{
                    padding: isMobile ? '12px 24px' : '15px 30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    width: isMobile ? '100%' : 'auto'
                  }}
                >
                  <span>🔗</span> View Code
                </motion.button>
                <motion.button
                  whileHover={{ scale: isMobile ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLinkClick('live')}
                  onMouseEnter={() => !isMobile && audioManager.play('hover')}
                  className="neon-button"
                  style={{
                    padding: isMobile ? '12px 24px' : '15px 30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    width: isMobile ? '100%' : 'auto'
                  }}
                >
                  <span>🚀</span> Live Demo
                </motion.button>
              </div>
            </div>
          ) : (
            <NetshellDemo project={project} diffConfig={diffConfig} isMobile={isMobile} />
          )}

          {/* XP Earned */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            style={{
              marginTop: isMobile ? '20px' : '30px',
              padding: isMobile ? '15px' : '20px',
              background: 'rgba(176, 0, 255, 0.2)',
              border: '2px solid var(--neon-purple)',
              borderRadius: '12px',
              textAlign: 'center'
            }}
          >
            <div style={{
              fontSize: isMobile ? '1.5rem' : '2rem',
              marginBottom: '10px'
            }}>
              ⚡
            </div>
            <div style={{
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              color: 'var(--neon-purple)',
              fontWeight: '900'
            }}>
              +{project.xpReward} XP EARNED
            </div>
            <div style={{
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              color: 'var(--text-secondary)',
              marginTop: '5px'
            }}>
              Quest Completed
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Section = ({ icon, title, content, isMobile }) => (
  <div style={{ marginBottom: isMobile ? '20px' : '30px' }}>
    <h3 style={{
      fontSize: isMobile ? '1.2rem' : '1.5rem',
      color: 'var(--neon-blue)',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      <span>{icon}</span> {title}
    </h3>
    <p style={{
      fontSize: isMobile ? '0.95rem' : '1.1rem',
      color: 'var(--text-secondary)',
      lineHeight: '1.8',
      padding: isMobile ? '12px' : '15px',
      background: 'rgba(0, 243, 255, 0.05)',
      border: '1px solid rgba(0, 243, 255, 0.2)',
      borderRadius: '8px'
    }}>
      {content}
    </p>
  </div>
);

const TabButton = ({ label, active, onClick, isMobile }) => (
  <button
    onClick={onClick}
    onMouseEnter={() => !isMobile && audioManager.play('hover')}
    style={{
      padding: isMobile ? '8px 16px' : '10px 20px',
      background: active ? 'var(--neon-blue)' : 'transparent',
      border: `2px solid ${active ? 'var(--neon-blue)' : 'rgba(0, 243, 255, 0.3)'}`,
      color: active ? 'var(--darker-bg)' : 'var(--neon-blue)',
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontSize: isMobile ? '0.85rem' : '1rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      borderRadius: '5px',
      flex: isMobile ? '1' : 'auto',
      minWidth: isMobile ? '0' : 'auto'
    }}
  >
    {label}
  </button>
);

const NetshellDemo = ({ project, diffConfig, isMobile }) => {
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'system', text: `> Initializing ${project.title} demo environment...` },
    { type: 'success', text: '> System ready. Type "help" for available commands.' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const commands = {
    help: () => ({
      type: 'info',
      text: `Available commands:
• help - Show this message
• demo - Run main feature demonstration
• features - List all features
• tech - Show technology stack
• impact - View project impact
• challenge - See the problem this solves
• solution - View the solution approach
• clear - Clear terminal`
    }),
    demo: () => ({
      type: 'success',
      text: `🎮 Launching ${project.title} demonstration...

✨ Main Features Demo:
${project.features.slice(0, 3).map((f, i) => `${i + 1}. ${f}`).join('\n')}

💡 Key Innovation: ${project.solution}

⚡ Real-world Impact: ${project.impact.description}

🚀 Status: Demo completed successfully!`
    }),
    features: () => ({
      type: 'info',
      text: `📋 Complete Feature Set:\n${project.features.map((f, i) => `${i + 1}. ${f}`).join('\n')}`
    }),
    tech: () => ({
      type: 'info',
      text: `🛠️ Technology Stack:\n${project.technologies.map((t, i) => `${i + 1}. ${t}`).join('\n')}`
    }),
    impact: () => ({
      type: 'success',
      text: `📊 Project Impact:

Metric: ${project.impact.metric}
Value: ${project.impact.value}

${project.impact.description}`
    }),
    challenge: () => ({
      type: 'warning',
      text: `⚔️ The Challenge:

${project.challenge}`
    }),
    solution: () => ({
      type: 'success',
      text: `💡 The Solution:

${project.solution}`
    }),
    info: () => ({
      type: 'info',
      text: `📝 Project Information:

Name: ${project.title}
Category: ${project.category}
Difficulty: ${project.difficulty}
XP Reward: ${project.xpReward}
Status: Completed ✓`
    }),
    clear: () => null
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    setTerminalOutput(prev => [
      ...prev,
      { type: 'user', text: `$ ${cmd}` }
    ]);

    if (trimmedCmd === 'clear') {
      setTerminalOutput([
        { type: 'system', text: '> Terminal cleared. Type "help" for commands.' }
      ]);
      audioManager.play('glitch');
      return;
    }

    if (commands[trimmedCmd]) {
      const result = commands[trimmedCmd]();
      if (result) {
        setTerminalOutput(prev => [...prev, result]);
        audioManager.play('type');
      }
    } else if (trimmedCmd === '') {
      return;
    } else {
      setTerminalOutput(prev => [
        ...prev,
        { type: 'error', text: `❌ Command not found: "${cmd}". Type "help" for available commands.` }
      ]);
      audioManager.play('glitch');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleCommand(inputValue);
      setInputValue('');
    }
  };

  return (
    <div style={{
      background: '#000',
      border: `2px solid ${diffConfig.color}`,
      borderRadius: '8px',
      padding: isMobile ? '15px' : '20px',
      fontFamily: 'monospace',
      minHeight: isMobile ? '300px' : '400px',
      boxShadow: `0 0 30px ${diffConfig.color}40`
    }}>
      {/* Terminal Header */}
      <div style={{
        marginBottom: '15px',
        paddingBottom: '10px',
        borderBottom: `1px solid ${diffConfig.color}40`,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          width: isMobile ? '10px' : '12px',
          height: isMobile ? '10px' : '12px',
          borderRadius: '50%',
          background: '#ff006e'
        }} />
        <div style={{
          width: isMobile ? '10px' : '12px',
          height: isMobile ? '10px' : '12px',
          borderRadius: '50%',
          background: '#ffbe0b'
        }} />
        <div style={{
          width: isMobile ? '10px' : '12px',
          height: isMobile ? '10px' : '12px',
          borderRadius: '50%',
          background: '#00f3ff'
        }} />
        <span style={{
          marginLeft: isMobile ? '10px' : '15px',
          color: diffConfig.color,
          fontSize: isMobile ? '0.75rem' : '0.9rem',
          fontWeight: '700'
        }}>
          NetShell v2.0 - {project.title}
        </span>
      </div>

      {/* Terminal Output */}
      <div style={{
        maxHeight: isMobile ? '200px' : '300px',
        overflowY: 'auto',
        marginBottom: '15px',
        paddingRight: '10px'
      }}>
        {terminalOutput.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              marginBottom: '8px',
              color:
                line.type === 'user' ? '#fff' :
                  line.type === 'error' ? '#ff006e' :
                    line.type === 'success' ? '#00ff88' :
                      line.type === 'warning' ? '#ffbe0b' :
                        line.type === 'system' ? '#ff8800' :
                          diffConfig.color,
              whiteSpace: 'pre-wrap',
              fontSize: isMobile ? '0.8rem' : '0.95rem',
              lineHeight: '1.6'
            }}
          >
            {line.text}
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span style={{ 
          color: diffConfig.color, 
          fontSize: isMobile ? '1rem' : '1.1rem', 
          fontWeight: '700',
          flexShrink: 0
        }}>$</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isMobile ? "Type cmd..." : "Type a command..."}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#fff',
            fontFamily: 'monospace',
            fontSize: isMobile ? '0.85rem' : '1rem',
            padding: '5px',
            minWidth: 0
          }}
          autoFocus
        />
      </div>

      {/* Command Hints */}
      <div style={{
        marginTop: '15px',
        padding: isMobile ? '8px' : '10px',
        background: `${diffConfig.color}10`,
        border: `1px solid ${diffConfig.color}30`,
        borderRadius: '4px',
        fontSize: isMobile ? '0.7rem' : '0.85rem',
        color: 'var(--text-secondary)'
      }}>
        💡 Quick commands:
        {!isMobile && (
          <>
            <span style={{ color: diffConfig.color, marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleCommand('demo')}>demo</span>
            <span style={{ color: diffConfig.color, marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleCommand('features')}>features</span>
          </>
        )}
        <span style={{ color: diffConfig.color, marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleCommand('help')}>help</span>
      </div>
    </div>
  );
};

export default ProjectModal;