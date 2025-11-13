import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import useGameStore from "../../store/gameStore";
import audioManager from '../../utils/audioManager';

export default function ChapterNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('chapters'); // 'chapters', 'shortcuts', 'effects'
    const { currentChapter, setCurrentChapter, musicEnabled, sfxEnabled, toggleMusic, toggleSFX } = useGameStore();
    
    // Effect states
    const [effectsState, setEffectsState] = useState({
        dataStreams: true,
        grid: true,
        scanlines: true,
        particles: true
    });

    const chapterLabels = [
        { "I-": "prologue" },
        { "I": "origin" },
        { "II": "trials" },
        { "III": "vision" },
        { "IV": "connection" }
    ];
    const chapterLabelKeys = ["I", "II", "III", "IV"];

        // Navigate to chapter
    const handleSetChapter = (romanKey) => {
        const value = chapterLabels.find(obj => obj[romanKey])?.[romanKey];
        setIsOpen(false);
        audioManager.playSFX('click');
        setTimeout(() => {
            audioManager.playMusic('origin', 2000);
            setCurrentChapter(value);
        }, 800);
    };

    // Toggle visual effects
    const toggleEffect = (effectName) => {
        setEffectsState(prev => ({ ...prev, [effectName]: !prev[effectName] }));
        
        // Apply effect to DOM
        const effectElements = {
            dataStreams: document.querySelector('.data-streams'),
            grid: document.querySelector('.grid-bg'),
            scanlines: document.querySelector('.scanlines'),
            particles: document.querySelector('.particle-field')
        };

        const element = effectElements[effectName];
        if (element) {
            element.style.opacity = effectsState[effectName] ? '0' : '1';
            element.style.pointerEvents = effectsState[effectName] ? 'none' : 'auto';
        }
        
        audioManager.playSFX('click');
    };

    // Handle shortcut clicks
    const handleShortcutClick = (handler) => {
        handler();
        audioManager.playSFX('click');
        setIsOpen(false);
    };

    // Scroll functions
    const scrollDown = () => window.scrollBy({ top: 500, behavior: 'smooth' });
    const scrollUp = () => window.scrollBy({ top: -500, behavior: 'smooth' });
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });


        // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e) => {
            // Don't trigger if typing in input/textarea
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            const key = e.key.toUpperCase();
            
            // Toggle Menu (M key)
            if (key === 'M' && !e.ctrlKey) {
                setIsOpen(prev => !prev);
                audioManager.playSFX('click');
                return;
            }

            // Close menu (Escape)
            if (e.key === 'Escape') {
                setIsOpen(false);
                return;
            }

            // Effect toggles
            if (key === 'W') toggleEffect('dataStreams');
            if (key === 'G') toggleEffect('grid');
            if (key === 'S') toggleEffect('scanlines');
            if (key === 'X') toggleEffect('particles');
            
            // Quick navigation
            if (key === 'P') {
                setCurrentChapter('trials');
                audioManager.playSFX('click');
            }
            if (key === 'C') {
                setCurrentChapter('connection');
                audioManager.playSFX('click');
            }
            if (key === 'H') {
                setCurrentChapter('prologue');
                audioManager.playSFX('click');
            }

            // Number keys for chapters
            if (key === '1') setCurrentChapter('origin');
            if (key === '2') setCurrentChapter('trials');
            if (key === '3') setCurrentChapter('vision');
            if (key === '4') setCurrentChapter('connection');
            
            // Scroll shortcuts (with Ctrl/Cmd)
            if (e.key === 'ArrowDown' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                scrollDown();
            }
            if (e.key === 'ArrowUp' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                scrollUp();
            }

            // Audio toggles
            if (key === 'N') {
                toggleMusic();
                audioManager.playSFX('click');
            }
            if (key === 'B') {
                toggleSFX();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [effectsState, currentChapter]);

        // Shortcuts data
    const shortcuts = [
        { key: "↓", desc: "Scroll Down", action: scrollDown, hint: "Ctrl+↓" },
        { key: "↑", desc: "Scroll Up", action: scrollUp, hint: "Ctrl+↑" },
        { key: "Home", desc: "Top of Page", action: scrollToTop, hint: "Home" },
        { key: "End", desc: "Bottom", action: scrollToBottom, hint: "End" },
        { key: "P", desc: "Skip to Projects", action: () => setCurrentChapter('trials'), hint: "P" },
        { key: "C", desc: "Skip to Contact", action: () => setCurrentChapter('connection'), hint: "C" },
        { key: "H", desc: "Return Home", action: () => setCurrentChapter('prologue'), hint: "H" },
        { key: "M", desc: "Toggle Menu", action: () => setIsOpen(!isOpen), hint: "M" },
    ];

    // Effect toggles data
    const effectToggles = [
        { key: "W", name: "Data Streams", state: effectsState.dataStreams, toggle: () => toggleEffect('dataStreams'), icon: "💧" },
        { key: "G", name: "Grid Background", state: effectsState.grid, toggle: () => toggleEffect('grid'), icon: "⚡" },
        { key: "S", name: "Scanlines", state: effectsState.scanlines, toggle: () => toggleEffect('scanlines'), icon: "📺" },
        { key: "X", name: "Particles", state: effectsState.particles, toggle: () => toggleEffect('particles'), icon: "✨" },
    ];

    // Audio controls data
    const audioControls = [
        { key: "N", name: "Background Music", state: musicEnabled, toggle: toggleMusic, icon: "🎵" },
        { key: "B", name: "Sound Effects", state: sfxEnabled, toggle: toggleSFX, icon: "🔊" },
    ];
    // Animation variants
    const menuVariants = {
        hidden: { height: "0px", opacity: 0, y: -20 },
        visible: { height: "auto", opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
    };

    const contentVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.2 } }
    };

    // Tab button style
    const tabButtonStyle = (isActive) => ({
        padding: "10px 18px",
        background: isActive ? "var(--neon-primary)" : "transparent",
        color: isActive ? "var(--darker-bg)" : "var(--neon-blue)",
        border: `1px solid ${isActive ? 'var(--neon-primary)' : 'rgba(0, 243, 255, 0.3)'}`,
        cursor: "pointer",
        fontFamily: "Orbitron, sans-serif",
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.5px",
        transition: "all 0.2s",
        flex: 1,
        textTransform: "uppercase",
        boxShadow: isActive ? "0 0 10px var(--neon-primary)" : "none"
    });
    return (
        <>
            {/* Menu Button */}
            <motion.button
                onClick={() => {
                    setIsOpen(!isOpen);
                    audioManager.playSFX('click');
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px var(--neon-primary)" }}
                whileTap={{ scale: 0.95 }}
                style={{
                    position: "fixed",
                    top: "24px",
                    left: "26px",
                    zIndex: 100,
                    padding: "10px 20px",
                    background: isOpen ? "var(--neon-secondary)" : "var(--neon-primary)",
                    color: "var(--darker-bg)",
                    border: "none",
                    fontFamily: "Orbitron, sans-serif",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    fontSize: "0.9rem",
                    boxShadow: `0 0 ${isOpen ? '20px' : '12px'} var(--neon-primary)`,
                    transition: "all 0.3s",
                    cursor: "pointer",
                    clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))"
                }}
            >
                {isOpen ? '✕ CLOSE' : '⚡ COMMAND'} 
                <span style={{ 
                    fontSize: "0.65rem", 
                    opacity: 0.8, 
                    marginLeft: "6px",
                    fontWeight: 400
                }}>
                    (M)
                </span>
            </motion.button>
            {/* Enhanced Command Center Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={menuVariants}
                        style={{
                            position: "fixed",
                            top: "80px",
                            left: "24px",
                            background: "rgba(6, 17, 28, 0.98)",
                            border: "2px solid var(--neon-blue)",
                            padding: "18px",
                            margin: 0,
                            width: "340px",
                            maxHeight: "calc(100vh - 110px)",
                            overflowY: "auto",
                            boxShadow: "0 0 40px rgba(0, 243, 255, 0.5), inset 0 0 20px rgba(0, 243, 255, 0.1)",
                            zIndex: 99,
                            borderRadius: "4px",
                            backdropFilter: "blur(10px)"
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            marginBottom: "16px",
                            paddingBottom: "12px",
                            borderBottom: "1px solid rgba(0, 243, 255, 0.3)"
                        }}>
                            <h2 style={{
                                color: "var(--neon-primary)",
                                fontSize: "1.1rem",
                                fontFamily: "Orbitron",
                                fontWeight: 700,
                                margin: 0,
                                textTransform: "uppercase",
                                letterSpacing: "2px",
                                textShadow: "0 0 10px var(--neon-primary)"
                            }}>
                                ⚡ Command Center
                            </h2>
                            <p style={{
                                color: "var(--text-secondary)",
                                fontSize: "0.75rem",
                                margin: "4px 0 0 0",
                                fontFamily: "Rajdhani"
                            }}>
                                Navigate & Control Your Journey
                            </p>
                        </div>

                        {/* Tab Navigation */}
                        <div style={{ 
                            display: "flex", 
                            gap: "8px", 
                            marginBottom: "18px" 
                        }}>
                            <button 
                                onClick={() => setActiveTab('chapters')}
                                style={tabButtonStyle(activeTab === 'chapters')}
                            >
                                📖 Chapters
                            </button>
                            <button 
                                onClick={() => setActiveTab('shortcuts')}
                                style={tabButtonStyle(activeTab === 'shortcuts')}
                            >
                                ⌨️ Shortcuts
                            </button>
                            <button 
                                onClick={() => setActiveTab('effects')}
                                style={tabButtonStyle(activeTab === 'effects')}
                            >
                                🎨 Effects
                            </button>
                        </div>
                        {/* Chapters Tab */}
                        {activeTab === 'chapters' && (
                            <motion.div variants={contentVariants} initial="hidden" animate="visible">
                                <h3 style={{
                                    color: "var(--neon-primary)",
                                    fontSize: "0.85rem",
                                    marginBottom: "14px",
                                    fontFamily: "Orbitron",
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                    fontWeight: 600
                                }}>
                                    &gt; Navigate Chapters
                                </h3>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                    {chapterLabelKeys.map(label => {
                                        const chapterValue = chapterLabels.find(obj => obj[label])[label];
                                        const isActive = currentChapter === chapterValue;
                                        
                                        return (
                                            <motion.li
                                                key={label}
                                                onClick={() => handleSetChapter(label)}
                                                whileHover={{ x: 6, scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                style={{
                                                    cursor: "pointer",
                                                    padding: "14px 16px",
                                                    marginBottom: "8px",
                                                    background: isActive 
                                                        ? "linear-gradient(90deg, rgba(0, 243, 255, 0.2) 0%, rgba(0, 243, 255, 0.05) 100%)" 
                                                        : "rgba(0, 243, 255, 0.05)",
                                                    border: `1px solid ${isActive 
                                                        ? 'var(--neon-primary)' 
                                                        : 'rgba(0, 243, 255, 0.2)'}`,
                                                    color: isActive ? "var(--neon-primary)" : "var(--neon-blue)",
                                                    fontFamily: "Rajdhani, sans-serif",
                                                    fontSize: "0.95rem",
                                                    fontWeight: 600,
                                                    transition: "all 0.2s",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    borderRadius: "4px",
                                                    boxShadow: isActive ? "0 0 15px rgba(0, 243, 255, 0.3)" : "none"
                                                }}
                                            >
                                                <span>
                                                    <span style={{ 
                                                        fontFamily: "Orbitron", 
                                                        marginRight: "12px",
                                                        color: "var(--neon-primary)",
                                                        fontWeight: 700,
                                                        fontSize: "1rem"
                                                    }}>
                                                        {label}
                                                    </span>
                                                    {chapterValue.toUpperCase()}
                                                </span>
                                                {isActive && (
                                                    <motion.span 
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        style={{ 
                                                            color: "var(--neon-primary)", 
                                                            fontSize: "1rem",
                                                            textShadow: "0 0 8px var(--neon-primary)"
                                                        }}
                                                    >
                                                        ●
                                                    </motion.span>
                                                )}
                                            </motion.li>
                                        );
                                    })}
                                </ul>
                            </motion.div>
                        )}
                        {/* Shortcuts Tab */}
                        {activeTab === 'shortcuts' && (
                            <motion.div variants={contentVariants} initial="hidden" animate="visible">
                                <h3 style={{
                                    color: "var(--neon-primary)",
                                    fontSize: "0.85rem",
                                    marginBottom: "14px",
                                    fontFamily: "Orbitron",
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                    fontWeight: 600
                                }}>
                                    &gt; Keyboard Shortcuts
                                </h3>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                    {shortcuts.map((shortcut, idx) => (
                                        <motion.li
                                            key={idx}
                                            onClick={() => handleShortcutClick(shortcut.action)}
                                            whileHover={{ 
                                                x: 6, 
                                                backgroundColor: "rgba(0, 243, 255, 0.15)",
                                                borderColor: "var(--neon-blue)"
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                            style={{
                                                cursor: "pointer",
                                                padding: "12px 16px",
                                                marginBottom: "8px",
                                                background: "rgba(0, 243, 255, 0.05)",
                                                border: "1px solid rgba(0, 243, 255, 0.2)",
                                                color: "var(--text-primary)",
                                                fontFamily: "Rajdhani, sans-serif",
                                                fontSize: "0.9rem",
                                                transition: "all 0.2s",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                borderRadius: "4px"
                                            }}
                                        >
                                            <span style={{ fontWeight: 500 }}>
                                                {shortcut.desc}
                                            </span>
                                            <span style={{
                                                background: "rgba(0, 243, 255, 0.2)",
                                                padding: "4px 12px",
                                                borderRadius: "4px",
                                                fontFamily: "Orbitron",
                                                fontSize: "0.75rem",
                                                color: "var(--neon-primary)",
                                                fontWeight: 700,
                                                border: "1px solid rgba(0, 243, 255, 0.4)",
                                                textShadow: "0 0 5px var(--neon-primary)"
                                            }}>
                                                {shortcut.hint}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                                
                                {/* Quick Navigation Section */}
                                <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid rgba(0, 243, 255, 0.2)" }}>
                                    <h4 style={{
                                        color: "var(--neon-secondary)",
                                        fontSize: "0.8rem",
                                        marginBottom: "10px",
                                        fontFamily: "Orbitron",
                                        textTransform: "uppercase",
                                        letterSpacing: "1px",
                                        fontWeight: 600
                                    }}>
                                        Quick Numbers
                                    </h4>
                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: "8px",
                                        fontSize: "0.85rem",
                                        color: "var(--text-secondary)",
                                        fontFamily: "Rajdhani"
                                    }}>
                                        <div><kbd style={kbdStyle}>1</kbd> Origin</div>
                                        <div><kbd style={kbdStyle}>2</kbd> Trials</div>
                                        <div><kbd style={kbdStyle}>3</kbd> Vision</div>
                                        <div><kbd style={kbdStyle}>4</kbd> Connection</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {/* Effects Tab */}
                        {activeTab === 'effects' && (
                            <motion.div variants={contentVariants} initial="hidden" animate="visible">
                                <h3 style={{
                                    color: "var(--neon-primary)",
                                    fontSize: "0.85rem",
                                    marginBottom: "14px",
                                    fontFamily: "Orbitron",
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                    fontWeight: 600
                                }}>
                                    &gt; Visual Effects
                                </h3>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                    {effectToggles.map((effect, idx) => (
                                        <motion.li
                                            key={idx}
                                            onClick={effect.toggle}
                                            whileHover={{ x: 6, scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            style={{
                                                cursor: "pointer",
                                                padding: "14px 16px",
                                                marginBottom: "10px",
                                                background: effect.state 
                                                    ? "linear-gradient(90deg, rgba(0, 243, 255, 0.15) 0%, rgba(0, 243, 255, 0.05) 100%)"
                                                    : "rgba(255, 0, 68, 0.08)",
                                                border: `1px solid ${effect.state 
                                                    ? 'rgba(0, 243, 255, 0.4)' 
                                                    : 'rgba(255, 0, 68, 0.3)'}`,
                                                color: effect.state ? "var(--neon-blue)" : "var(--text-secondary)",
                                                fontFamily: "Rajdhani, sans-serif",
                                                fontSize: "0.9rem",
                                                fontWeight: 600,
                                                transition: "all 0.2s",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                borderRadius: "4px",
                                                boxShadow: effect.state ? "0 0 10px rgba(0, 243, 255, 0.2)" : "none"
                                            }}
                                        >
                                            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                <span style={{ fontSize: "1.2rem" }}>{effect.icon}</span>
                                                <span>{effect.name}</span>
                                            </span>
                                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                                <span style={{
                                                    background: "rgba(0, 243, 255, 0.2)",
                                                    padding: "4px 10px",
                                                    borderRadius: "4px",
                                                    fontFamily: "Orbitron",
                                                    fontSize: "0.7rem",
                                                    color: "var(--neon-primary)",
                                                    fontWeight: 700,
                                                    border: "1px solid rgba(0, 243, 255, 0.3)"
                                                }}>
                                                    {effect.key}
                                                </span>
                                                {/* Toggle Switch */}
                                                <div style={{
                                                    width: "44px",
                                                    height: "24px",
                                                    background: effect.state 
                                                        ? "var(--neon-primary)" 
                                                        : "rgba(255, 255, 255, 0.2)",
                                                    borderRadius: "12px",
                                                    position: "relative",
                                                    transition: "all 0.3s",
                                                    border: "2px solid " + (effect.state 
                                                        ? "var(--neon-blue)" 
                                                        : "rgba(255, 255, 255, 0.3)")
                                                }}>
                                                    <motion.div
                                                        animate={{ x: effect.state ? 20 : 0 }}
                                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                        style={{
                                                            width: "18px",
                                                            height: "18px",
                                                            background: effect.state 
                                                                ? "var(--darker-bg)" 
                                                                : "rgba(255, 255, 255, 0.8)",
                                                            borderRadius: "50%",
                                                            position: "absolute",
                                                            top: "1px",
                                                            left: "1px",
                                                            boxShadow: effect.state 
                                                                ? "0 0 8px var(--neon-primary)" 
                                                                : "none"
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Audio Controls Section */}
                                <div style={{ 
                                    marginTop: "20px", 
                                    paddingTop: "16px", 
                                    borderTop: "1px solid rgba(0, 243, 255, 0.2)" 
                                }}>
                                    <h4 style={{
                                        color: "var(--neon-secondary)",
                                        fontSize: "0.8rem",
                                        marginBottom: "12px",
                                        fontFamily: "Orbitron",
                                        textTransform: "uppercase",
                                        letterSpacing: "1px",
                                        fontWeight: 600
                                    }}>
                                        Audio Controls
                                    </h4>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        {audioControls.map((audio, idx) => (
                                            <motion.li
                                                key={idx}
                                                onClick={() => {
                                                    audio.toggle();
                                                    audioManager.playSFX('click');
                                                }}
                                                whileHover={{ x: 6 }}
                                                whileTap={{ scale: 0.98 }}
                                                style={{
                                                    cursor: "pointer",
                                                    padding: "12px 16px",
                                                    marginBottom: "8px",
                                                    background: audio.state 
                                                        ? "rgba(0, 243, 255, 0.1)" 
                                                        : "rgba(255, 0, 68, 0.08)",
                                                    border: `1px solid ${audio.state 
                                                        ? 'rgba(0, 243, 255, 0.3)' 
                                                        : 'rgba(255, 0, 68, 0.3)'}`,
                                                    color: audio.state ? "var(--neon-blue)" : "var(--text-secondary)",
                                                    fontFamily: "Rajdhani, sans-serif",
                                                    fontSize: "0.9rem",
                                                    fontWeight: 600,
                                                    transition: "all 0.2s",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    borderRadius: "4px"
                                                }}
                                            >
                                                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <span style={{ fontSize: "1.2rem" }}>{audio.icon}</span>
                                                    <span>{audio.name}</span>
                                                </span>
                                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                                    <span style={{
                                                        background: "rgba(0, 243, 255, 0.2)",
                                                        padding: "4px 10px",
                                                        borderRadius: "4px",
                                                        fontFamily: "Orbitron",
                                                        fontSize: "0.7rem",
                                                        color: "var(--neon-primary)",
                                                        fontWeight: 700
                                                    }}>
                                                        {audio.key}
                                                    </span>
                                                    {/* Toggle Indicator */}
                                                    <div style={{
                                                        width: "12px",
                                                        height: "12px",
                                                        borderRadius: "50%",
                                                        background: audio.state 
                                                            ? "var(--neon-primary)" 
                                                            : "rgba(255, 0, 68, 0.6)",
                                                        boxShadow: audio.state 
                                                            ? "0 0 10px var(--neon-primary)" 
                                                            : "0 0 8px rgba(255, 0, 68, 0.6)",
                                                        transition: "all 0.3s"
                                                    }} />
                                                </div>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Pro Tip */}
                                <div style={{
                                    marginTop: "20px",
                                    padding: "12px",
                                    background: "rgba(0, 243, 255, 0.05)",
                                    border: "1px solid rgba(0, 243, 255, 0.2)",
                                    borderRadius: "4px",
                                    borderLeft: "3px solid var(--neon-primary)"
                                }}>
                                    <p style={{
                                        margin: 0,
                                        fontSize: "0.8rem",
                                        color: "var(--text-secondary)",
                                        fontFamily: "Rajdhani",
                                        lineHeight: "1.5"
                                    }}>
                                        <span style={{ color: "var(--neon-primary)", fontWeight: 700 }}>💡 Pro Tip:</span> Use keyboard shortcuts for faster control. Press keys even when menu is closed!
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// Helper style for keyboard key display
const kbdStyle = {
    display: "inline-block",
    padding: "2px 8px",
    background: "rgba(0, 243, 255, 0.15)",
    border: "1px solid rgba(0, 243, 255, 0.3)",
    borderRadius: "3px",
    fontFamily: "Orbitron",
    fontSize: "0.75rem",
    color: "var(--neon-primary)",
    fontWeight: 700,
    marginRight: "8px"
};
