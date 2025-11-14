import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import audioManager from '../../utils/audioManager';

// MOVE STEPS OUTSIDE to prevent recreation on every render
const VISUALIZATION_STEPS = [
    {
        id: 0,
        title: 'Packaging Data',
        description: 'Preparing your information for secure transmission',
        icon: '📦',
        color: '#00f3ff',
        duration: 3000 // ⬆️ INCREASED from 1000ms to 3000ms
    },
    {
        id: 1,
        title: 'Client-Side Encryption',
        description: 'Encrypting data with AES-256 before sending',
        icon: '🔐',
        color: '#b000ff',
        duration: 4000 // ⬆️ INCREASED from 1500ms to 4000ms (longest, most important)
    },
    {
        id: 2,
        title: 'Secure Transmission',
        description: 'Sending through HTTPS encrypted tunnel',
        icon: '🚀',
        color: '#00ff88',
        duration: 3500 // ⬆️ INCREASED
    },
    {
        id: 3,
        title: 'Server Reception',
        description: 'Backend securely receives encrypted payload',
        icon: '🖥️',
        color: '#ff0066',
        duration: 3000 // ⬆️ INCREASED
    },
    {
        id: 4,
        title: 'Server Decryption',
        description: 'Decrypting with private key on secure server',
        icon: '🔓',
        color: '#b000ff',
        duration: 4000 // ⬆️ INCREASED
    },
    {
        id: 5,
        title: 'Data Processing',
        description: 'Storing securely in encrypted database',
        icon: '💾',
        color: '#00f3ff',
        duration: 3000 // ⬆️ INCREASED
    },
    {
        id: 6,
        title: 'Confirmation',
        description: 'Secure acknowledgment sent back',
        icon: '✅',
        color: '#00ff88',
        duration: 2500 // ⬆️ INCREASED
    }
];



const SecurityVisualization = ({ isActive, formData, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [encryptedData, setEncryptedData] = useState('');
    const [isComplete, setIsComplete] = useState(false); // ✅ NEW: Track completion

    useEffect(() => {
        if (!isActive || isComplete) return; // ✅ STOP if already complete

        // Simulate encryption
        const simulateEncryption = () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            let encrypted = '';
            for (let i = 0; i < 64; i++) {
                encrypted += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            setEncryptedData(encrypted);
        };

        simulateEncryption();

        // Progress through steps with LONGER durations
        const progressSteps = () => {
            if (currentStep < VISUALIZATION_STEPS.length - 1) {
                setTimeout(() => {
                    audioManager.play('type');
                    setCurrentStep(prev => prev + 1);
                }, VISUALIZATION_STEPS[currentStep]?.duration || 3000); // ✅ FALLBACK
            } else {
                // All steps complete
                setTimeout(() => {
                    audioManager.play('success');
                    setIsComplete(true); // ✅ Mark as complete
                    onComplete();
                }, VISUALIZATION_STEPS[currentStep]?.duration || 3000); // ✅ FALLBACK
            }
        };

        progressSteps();
    }, [currentStep, isActive, isComplete, onComplete]); // ✅ Added isComplete

    if (!isActive) return null;

    const currentStepData = VISUALIZATION_STEPS[currentStep] || VISUALIZATION_STEPS[0];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(10px)',
                zIndex: 10001,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}
        >
            <div style={{
                maxWidth: '900px',
                width: '100%',
                background: 'rgba(10, 14, 39, 0.95)',
                border: '3px solid var(--neon-blue)',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 0 50px rgba(0, 243, 255, 0.5)'
            }}>
                {/* Title */}
                <h2 style={{
                    fontSize: '2.5rem',
                    color: 'var(--neon-blue)',
                    textAlign: 'center',
                    marginBottom: '10px',
                    fontWeight: '900',
                    textShadow: '0 0 20px var(--neon-blue)'
                }}>
                    🔒 Secure Transmission
                </h2>
                <p style={{
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    marginBottom: '40px',
                    fontSize: '1.1rem'
                }}>
                    Your data is being encrypted and transmitted securely
                </p>

                {/* Progress Bar */}
                <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '10px',
                    marginBottom: '40px',
                    overflow: 'hidden',
                    border: '1px solid rgba(0, 243, 255, 0.3)'
                }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / VISUALIZATION_STEPS.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, var(--neon-blue), var(--neon-purple), #00ff88)',
                            boxShadow: '0 0 20px var(--neon-blue)'
                        }}
                    />
                </div>

                {/* Steps Flow */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: '10px',
                    marginBottom: '40px'
                }}>
                    {VISUALIZATION_STEPS.map((step, index) => (
                        <StepIndicator
                            key={step.id}
                            step={step}
                            isActive={currentStep === index}
                            isCompleted={currentStep > index}
                            index={index}
                        />
                    ))}
                </div>

                {/* Current Step Details */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            padding: '30px',
                            background: `${currentStepData.color}10`,
                            border: `2px solid ${currentStepData.color}`,
                            borderRadius: '15px',
                            marginBottom: '30px'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            marginBottom: '20px'
                        }}>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                style={{
                                    fontSize: '4rem',
                                    filter: `drop-shadow(0 0 20px ${currentStepData.color})`
                                }}
                            >
                                {currentStepData.icon}
                            </motion.div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{
                                    fontSize: '1.8rem',
                                    color: currentStepData.color,
                                    marginBottom: '8px',
                                    fontWeight: '700',
                                    textShadow: `0 0 15px ${currentStepData.color}`
                                }}>
                                    {currentStepData.title}
                                </h3>
                                <p style={{
                                    fontSize: '1.1rem',
                                    color: 'var(--text-secondary)'
                                }}>
                                    {currentStepData.description}
                                </p>
                            </div>
                        </div>

                        {/* Visual Representation based on step */}
                        {currentStep === 0 && <PackagingAnimation formData={formData} />}
                        {currentStep === 1 && <EncryptionAnimation data={formData} encrypted={encryptedData} />}
                        {currentStep === 2 && <TransmissionAnimation />}
                        {currentStep === 3 && <ServerReceptionAnimation />}
                        {currentStep === 4 && <DecryptionAnimation encrypted={encryptedData} />}
                        {currentStep === 5 && <ProcessingAnimation />}
                        {currentStep === 6 && <ConfirmationAnimation />}
                    </motion.div>
                </AnimatePresence>

                {/* Security Info */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '15px',
                    padding: '20px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '10px'
                }}>
                    <SecurityBadge icon="🔐" label="AES-256" sublabel="Encryption" />
                    <SecurityBadge icon="🔒" label="TLS 1.3" sublabel="HTTPS" />
                    <SecurityBadge icon="🛡️" label="Zero-Log" sublabel="Privacy" />
                </div>
            </div>
        </motion.div>
    );
};

const StepIndicator = ({ step, isActive, isCompleted, index }) => (
    <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 }}
        style={{
            textAlign: 'center'
        }}
    >
        <motion.div
            animate={{
                scale: isActive ? [1, 1.2, 1] : 1,
                boxShadow: isActive ? `0 0 20px ${step.color}` : 'none'
            }}
            transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
            style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                background: isCompleted || isActive ? `${step.color}20` : 'rgba(0, 0, 0, 0.5)',
                border: `2px solid ${isCompleted || isActive ? step.color : 'rgba(255, 255, 255, 0.2)'}`,
                margin: '0 auto 10px',
                transition: 'all 0.3s'
            }}
        >
            {isCompleted ? '✓' : step.icon}
        </motion.div>
        <div style={{
            fontSize: '0.7rem',
            color: isActive ? step.color : 'var(--text-tertiary)',
            fontWeight: isActive ? '700' : '400'
        }}>
            Step {index + 1}
        </div>
    </motion.div>
);

const PackagingAnimation = ({ formData }) => (
    <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '15px',
        padding: '20px',
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '10px'
    }}>
        {Object.entries(formData).map(([key, value], i) => (
            <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                style={{
                    padding: '15px',
                    background: 'rgba(0, 243, 255, 0.1)',
                    border: '1px solid rgba(0, 243, 255, 0.3)',
                    borderRadius: '8px'
                }}
            >
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '5px' }}>
                    {key.toUpperCase()}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {value || '—'}
                </div>
            </motion.div>
        ))}
    </div>
);

const EncryptionAnimation = ({ data, encrypted }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px' }}>
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 2 }} // ⬆️ INCREASED from 1s to 2s
            style={{
                flex: 1,
                padding: '15px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                maxHeight: '100px',
                overflow: 'hidden'
            }}
        >
            Plaintext: {data.name}, {data.email}...
        </motion.div>

        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{ fontSize: '3rem' }}
        >
            🔐
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 2 }} // ⬆️ INCREASED visibility time
            style={{
                flex: 1,
                padding: '15px',
                background: 'rgba(176, 0, 255, 0.1)',
                border: '1px solid var(--neon-purple)',
                borderRadius: '8px',
                fontSize: '0.75rem',
                color: 'var(--neon-purple)',
                fontFamily: 'monospace',
                wordBreak: 'break-all'
            }}
        >
            {encrypted}
        </motion.div>
    </div>
);

const TransmissionAnimation = () => (
    <div style={{ position: 'relative', height: '100px', padding: '20px' }}>
        <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--neon-blue), transparent)',
            transform: 'translateY(-50%)'
        }} />
        <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} // ⬆️ SLOWER
            style={{
                position: 'absolute',
                top: '50%',
                fontSize: '2rem',
                transform: 'translateY(-50%)',
                filter: 'drop-shadow(0 0 20px var(--neon-blue))'
            }}
        >
            📦
        </motion.div>
        <div style={{
            position: 'absolute',
            left: '10%',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '2rem'
        }}>
            💻
        </div>
        <div style={{
            position: 'absolute',
            right: '10%',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '2rem'
        }}>
            🖥️
        </div>
    </div>
);

const ServerReceptionAnimation = () => (
    <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
            textAlign: 'center',
            padding: '30px'
        }}
    >
        <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ fontSize: '5rem', marginBottom: '15px' }}
        >
            🖥️
        </motion.div>
        <div style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
            Server authenticated and ready
        </div>
    </motion.div>
);

const DecryptionAnimation = ({ encrypted }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px' }}>
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2 }} // ⬆️ INCREASED
            style={{
                flex: 1,
                padding: '15px',
                background: 'rgba(176, 0, 255, 0.1)',
                border: '1px solid var(--neon-purple)',
                borderRadius: '8px',
                fontSize: '0.75rem',
                color: 'var(--neon-purple)',
                fontFamily: 'monospace',
                wordBreak: 'break-all'
            }}
        >
            {encrypted}
        </motion.div>

        <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{ fontSize: '3rem' }}
        >
            🔓
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 2 }} // ⬆️ INCREASED
            style={{
                flex: 1,
                padding: '15px',
                background: 'rgba(0, 255, 136, 0.1)',
                border: '1px solid #00ff88',
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: '#00ff88'
            }}
        >
            ✓ Data decrypted successfully
        </motion.div>
    </div>
);

const ProcessingAnimation = () => (
    <div style={{ textAlign: 'center', padding: '30px' }}>
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{ fontSize: '5rem', marginBottom: '15px' }}
        >
            💾
        </motion.div>
        <div style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '10px' }}>
            Storing in encrypted database
        </div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Using military-grade encryption standards
        </div>
    </div>
);

const ConfirmationAnimation = () => (
    <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        style={{ textAlign: 'center', padding: '30px' }}
    >
        <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: '6rem', marginBottom: '15px' }}
        >
            ✅
        </motion.div>
        <div style={{ fontSize: '1.5rem', color: '#00ff88', fontWeight: '700', marginBottom: '10px' }}>
            Transmission Complete!
        </div>
        <div style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            Your message has been received securely
        </div>
    </motion.div>
);

const SecurityBadge = ({ icon, label, sublabel }) => (
    <div style={{
        textAlign: 'center',
        padding: '15px'
    }}>
        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{icon}</div>
        <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '700', marginBottom: '3px' }}>
            {label}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
            {sublabel}
        </div>
    </div>
);

export default SecurityVisualization;
