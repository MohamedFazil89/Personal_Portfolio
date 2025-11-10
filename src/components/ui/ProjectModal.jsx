// components/ui/ProjectModal.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { difficultyConfig } from '../../utils/ProjectData';
import audioManager from '../../utils/audioManager';
import useGameStore from '../../store/gameStore';


const DEFAULT_DIFF = { color: '#ccc', glow: 'none' }; // fallback


const ProjectModal = ({ project, onClose, initialTab = 'overview' }) => {  // Add initialTab

  const { unlockSkill } = useGameStore();
  const diffConfig = difficultyConfig[project.difficulty] || DEFAULT_DIFF;
  const [activeTab, setActiveTab] = useState(initialTab);


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
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          overflowY: 'auto'
        }}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          transition={{ type: 'spring', duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '900px',
            width: '100%',
            background: 'rgba(10, 14, 39, 0.95)',
            border: `3px solid ${diffConfig.color}`,
            borderRadius: '15px',
            padding: '40px',
            boxShadow: diffConfig.glow,
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            onMouseEnter={() => audioManager.play('hover')}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 0, 0, 0.2)',
              border: '2px solid #ff0066',
              color: '#ff0066',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s'
            }}
          >
            ✕
          </button>

          {/* Header */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '5rem' }}>
                {project.thumbnail}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'inline-block',
                  padding: '5px 15px',
                  background: `${diffConfig.color}20`,
                  border: `1px solid ${diffConfig.color}`,
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  color: diffConfig.color,
                  fontWeight: '700',
                  marginBottom: '10px',
                  textShadow: `0 0 10px ${diffConfig.color}`
                }}>
                  {project.difficulty} QUEST
                </div>
                <h2 style={{
                  fontSize: '2.5rem',
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  fontWeight: '900'
                }}>
                  {project.title}
                </h2>
                <div style={{
                  display: 'inline-block',
                  padding: '5px 12px',
                  background: 'rgba(0, 243, 255, 0.1)',
                  border: '1px solid rgba(0, 243, 255, 0.3)',
                  borderRadius: '15px',
                  fontSize: '0.9rem',
                  color: 'var(--neon-blue)'
                }}>
                  {project.category}
                </div>
              </div>
            </div>

            <p style={{
              fontSize: '1.2rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              {project.description}
            </p>
          </div>

          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '30px',
            borderBottom: '2px solid rgba(0, 243, 255, 0.2)',
            paddingBottom: '10px'
          }}>
            <TabButton
              label="Overview"
              active={activeTab === 'overview'}
              onClick={() => {
                setActiveTab('overview');
                audioManager.play('click');
              }}
            />
            <TabButton
              label="NetShell Demo"
              active={activeTab === 'demo'}
              onClick={() => {
                setActiveTab('demo');
                audioManager.play('click');
              }}
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
              />

              {/* Solution Section */}
              <Section
                icon="💡"
                title="The Solution"
                content={project.solution}
              />

              {/* Features */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '1.5rem',
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
                        padding: '12px 15px',
                        background: 'rgba(0, 243, 255, 0.05)',
                        border: '1px solid rgba(0, 243, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'var(--text-secondary)',
                        fontSize: '1rem'
                      }}
                    >
                      <span style={{ color: 'var(--neon-blue)', marginRight: '10px' }}>▸</span>
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '1.5rem',
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
                  gap: '10px'
                }}>
                  {project.technologies.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * i }}
                      style={{
                        padding: '8px 16px',
                        background: 'rgba(176, 0, 255, 0.1)',
                        border: '1px solid var(--neon-purple)',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
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
                padding: '25px',
                background: `linear-gradient(135deg, ${diffConfig.color}10, rgba(0, 243, 255, 0.05))`,
                border: `2px solid ${diffConfig.color}40`,
                borderRadius: '12px',
                marginBottom: '30px'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: diffConfig.color,
                  marginBottom: '15px',
                  textShadow: `0 0 15px ${diffConfig.color}`
                }}>
                  📈 Impact
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px'
                }}>
                  <div style={{
                    fontSize: '3.5rem',
                    fontWeight: '900',
                    color: diffConfig.color,
                    textShadow: `0 0 20px ${diffConfig.color}`
                  }}>
                    {project.impact.value}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '1.2rem',
                      color: 'var(--text-primary)',
                      fontWeight: '600',
                      marginBottom: '5px'
                    }}>
                      {project.impact.metric}
                    </div>
                    <div style={{
                      fontSize: '1rem',
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
                gap: '15px',
                justifyContent: 'center'
              }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLinkClick('github')}
                  onMouseEnter={() => audioManager.play('hover')}
                  className="neon-button"
                  style={{
                    padding: '15px 30px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span>🔗</span> View Code
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLinkClick('live')}
                  onMouseEnter={() => audioManager.play('hover')}
                  className="neon-button"
                  style={{
                    padding: '15px 30px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span>🚀</span> Live Demo
                </motion.button>
              </div>
            </div>
          ) : (
            <NetshellDemo project={project} diffConfig={diffConfig} />
          )}

          {/* XP Earned */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            style={{
              marginTop: '30px',
              padding: '20px',
              background: 'rgba(176, 0, 255, 0.2)',
              border: '2px solid var(--neon-purple)',
              borderRadius: '12px',
              textAlign: 'center'
            }}
          >
            <div style={{
              fontSize: '2rem',
              marginBottom: '10px'
            }}>
              ⚡
            </div>
            <div style={{
              fontSize: '1.5rem',
              color: 'var(--neon-purple)',
              fontWeight: '900'
            }}>
              +{project.xpReward} XP EARNED
            </div>
            <div style={{
              fontSize: '0.9rem',
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

const Section = ({ icon, title, content }) => (
  <div style={{ marginBottom: '30px' }}>
    <h3 style={{
      fontSize: '1.5rem',
      color: 'var(--neon-blue)',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      <span>{icon}</span> {title}
    </h3>
    <p style={{
      fontSize: '1.1rem',
      color: 'var(--text-secondary)',
      lineHeight: '1.8',
      padding: '15px',
      background: 'rgba(0, 243, 255, 0.05)',
      border: '1px solid rgba(0, 243, 255, 0.2)',
      borderRadius: '8px'
    }}>
      {content}
    </p>
  </div>
);

const TabButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    onMouseEnter={() => audioManager.play('hover')}
    style={{
      padding: '10px 20px',
      background: active ? 'var(--neon-blue)' : 'transparent',
      border: `2px solid ${active ? 'var(--neon-blue)' : 'rgba(0, 243, 255, 0.3)'}`,
      color: active ? 'var(--darker-bg)' : 'var(--neon-blue)',
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontSize: '1rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      borderRadius: '5px'
    }}
  >
    {label}
  </button>
);

const NetshellDemo = ({ project, diffConfig }) => {
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
${project.features.slice(0, 3).map((f, i) => `  ${i + 1}. ${f}`).join('\n')}

💡 Key Innovation: ${project.solution}

⚡ Real-world Impact: ${project.impact.description}

🚀 Status: Demo completed successfully!`
    }),
    features: () => ({
      type: 'info',
      text: `📋 Complete Feature Set:\n${project.features.map((f, i) => `  ${i + 1}. ${f}`).join('\n')}`
    }),
    tech: () => ({
      type: 'info',
      text: `🛠️ Technology Stack:\n${project.technologies.map((t, i) => `  ${i + 1}. ${t}`).join('\n')}`
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
      padding: '20px',
      fontFamily: 'monospace',
      minHeight: '400px',
      boxShadow: `0 0 30px ${diffConfig.color}40`
    }}>
      {/* Terminal Header */}
      <div style={{
        marginBottom: '15px',
        paddingBottom: '10px',
        borderBottom: `1px solid ${diffConfig.color}40`,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: '#ff006e'
        }} />
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: '#ffbe0b'
        }} />
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: '#00f3ff'
        }} />
        <span style={{
          marginLeft: '15px',
          color: diffConfig.color,
          fontSize: '0.9rem',
          fontWeight: '700'
        }}>
          NetShell v2.0 - {project.title}
        </span>
      </div>

      {/* Terminal Output */}
      <div style={{
        maxHeight: '300px',
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
              fontSize: '0.95rem',
              lineHeight: '1.6'
            }}
          >
            {line.text}
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span style={{ color: diffConfig.color, fontSize: '1.1rem', fontWeight: '700' }}>$</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#fff',
            fontFamily: 'monospace',
            fontSize: '1rem',
            padding: '5px'
          }}
          autoFocus
        />
      </div>

      {/* Command Hints */}
      <div style={{
        marginTop: '15px',
        padding: '10px',
        background: `${diffConfig.color}10`,
        border: `1px solid ${diffConfig.color}30`,
        borderRadius: '4px',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)'
      }}>
        💡 Quick commands:
        <span style={{ color: diffConfig.color, marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleCommand('demo')}>demo</span>
        <span style={{ color: diffConfig.color, marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleCommand('features')}>features</span>
        <span style={{ color: diffConfig.color, marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleCommand('tech')}>tech</span>
        <span style={{ color: diffConfig.color, marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleCommand('impact')}>impact</span>
      </div>
    </div>
  );
};

export default ProjectModal;