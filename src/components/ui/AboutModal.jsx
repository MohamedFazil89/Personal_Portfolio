// components/ui/AboutModal.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import audioManager from '../../utils/audioManager';
import { aboutMeTerminalQuestions, aboutMeSections } from '../../utils/aboutData';


const diffConfig = { color: "#ff0066", glow: '0 0 30px #ff0066' };

const AboutModal = ({ onClose }) => {
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'system', text: '> Welcome to Fazil\'s Terminal.' },
    ...aboutMeTerminalQuestions.map(q => ({
      type: 'info',
      text: `Try: ${q.command} - ${q.question}`
    }))
  ]);
  const [inputValue, setInputValue] = useState('');
  const [activeSection, setActiveSection] = useState(null);

  const commands = {
    whoami: () => ({
      type: 'impact',
      text: aboutMeTerminalQuestions[0].impact
    }),
    mission: () => ({
      type: 'impact',
      text: aboutMeTerminalQuestions[1].impact
    }),
    beliefs: () => ({
      type: 'impact',
      text: aboutMeTerminalQuestions[2].impact
    }),
    achievements: () => ({
      type: 'section',
      text: aboutMeSections.achievements.join('\n')
    }),
    stats: () => ({
      type: 'section',
      text: `Projects: ${aboutMeSections.stats.projects}
Lines of code: ${aboutMeSections.stats.linesOfCode}
Sleepless nights: ${aboutMeSections.stats.sleeplessNights}`
    }),
    help: () => ({
      type: 'info',
      text: `Available commands: whoami, mission, beliefs, achievements, stats, clear`
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
      setTerminalOutput([{ type: 'system', text: '> Terminal cleared. Type "help" for commands.' }]);
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
          padding: '20px'
        }}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          transition={{ type: 'spring', duration: 0.5 }}
          onClick={e => e.stopPropagation()}
          style={{
            maxWidth: '650px',
            width: '100%',
            background: 'rgba(16, 19, 46, 0.96)',
            border: `3px solid ${diffConfig.color}`,
            borderRadius: '15px',
            padding: '35px',
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
              background: 'rgba(255, 0, 0, 0.15)',
              border: '2px solid #ff0066',
              color: '#ff0066',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s'
            }}
          >✕</button>
          {/* Header */}
          <div style={{ marginBottom: '25px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '18px'
            }}>
              <div style={{ fontSize: '3rem' }}>🤖</div>
              <div>
                <h2 style={{
                  fontSize: '2rem',
                  color: diffConfig.color,
                  margin: 0,
                  fontWeight: '900',
                  textShadow: `0 0 8px ${diffConfig.color}`
                }}>
                  About Fazil
                </h2>
                <div style={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary)'
                }}>The human behind the code, the story beyond the portfolio.</div>
              </div>
            </div>
          </div>
          {/* TERMINAL */}
          <div style={{
            background: '#101428',
            border: `2px solid ${diffConfig.color}60`,
            borderRadius: '10px',
            padding: '20px',
            fontFamily: 'monospace',
            minHeight: '280px',
            boxShadow: `0 0 18px ${diffConfig.color}40`,
            marginBottom: '10px'
          }}>
            {/* Terminal Output */}
            <div style={{
              maxHeight: '190px',
              overflowY: 'auto',
              marginBottom: '10px',
              paddingRight: '5px'
            }}>
              {terminalOutput.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.12 }}
                  style={{
                    marginBottom: '7px',
                    color:
                      line.type === 'user' ? '#fff' :
                      line.type === 'error' ? '#ff006e' :
                      line.type === 'impact' ? '#b000ff' :
                      line.type === 'section' ? '#00ff88' :
                      line.type === 'system' ? '#ff8800' : diffConfig.color,
                    whiteSpace: 'pre-wrap',
                    fontSize: '1.05rem',
                    lineHeight: '1.7'
                  }}
                >
                  {line.text}
                </motion.div>
              ))}
            </div>
            {/* Input Area */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ color: diffConfig.color, fontSize: '1.15rem', fontWeight: '700' }}>$</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Type a command (try "whoami")...'
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
            {/* Quick commands */}
            <div style={{
              marginTop: '12px',
              padding: '8px',
              background: `${diffConfig.color}10`,
              border: `1px solid ${diffConfig.color}25`,
              borderRadius: '4px',
              fontSize: '0.92rem',
              color: 'var(--text-secondary)'
            }}>
              💡 Quick commands: 
              <span style={{ color: diffConfig.color, marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleCommand('whoami')}>whoami</span>
              <span style={{ color: diffConfig.color, marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleCommand('achievements')}>achievements</span>
              <span style={{ color: diffConfig.color, marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleCommand('stats')}>stats</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AboutModal;
