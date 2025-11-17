// components/ui/ContactForm.jsx - FULLY RESPONSIVE VERSION
import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import audioManager from '../../utils/audioManager';
import SecurityVisualization from './SecurityVisualization';
import { useResponsive } from '../../utils/responsiveUtils';

emailjs.init('LoWakzIuDmCxZLO1Z');

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSecurityViz, setShowSecurityViz] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const { isMobile, isTablet, isSmallMobile } = useResponsive();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (emailError) {
      setEmailError('');
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    return newErrors;
  };
  
  const sendEmails = async () => {
    try {
      await emailjs.send(
        'service_h02jq08',
        'template_iu5rbaa',
        {
          to_email: 'nmohammedfazil790@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        'LoWakzIuDmCxZLO1Z'
      );

      await emailjs.send(
        'service_h02jq08',
        'template_dbout13',
        {
          to_email: formData.email,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        'LoWakzIuDmCxZLO1Z'
      );

      return true;
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      setEmailError('Failed to send message. Please try again later.');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    audioManager.play('click');
    
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      audioManager.play('glitch');
      return;
    }
    
    setIsSubmitting(true);
    setShowSecurityViz(true);
    audioManager.play('powerUp');
  };

  const handleSecurityComplete = async () => {
    try {
      const success = await sendEmails();
      
      setShowSecurityViz(false);
      setIsSubmitting(false);
      
      if (success) {
        setIsSubmitted(true);
        audioManager.play('success');
        
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
          setEmailError('');
        }, 3000);
      } else {
        audioManager.play('glitch');
      }
    } catch (error) {
      console.error('Error in handleSecurityComplete:', error);
      setShowSecurityViz(false);
      setIsSubmitting(false);
      setEmailError('An unexpected error occurred. Please try again.');
      audioManager.play('glitch');
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          padding: isMobile ? '40px 25px' : isTablet ? '50px 35px' : '60px 40px',
          background: 'rgba(0, 243, 255, 0.1)',
          border: '3px solid var(--neon-blue)',
          borderRadius: '15px',
          textAlign: 'center',
          boxShadow: '0 0 40px rgba(0, 243, 255, 0.3)'
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{ fontSize: isMobile ? '4rem' : '5rem', marginBottom: isMobile ? '15px' : '20px' }}
        >
          ✓
        </motion.div>
        <h3 style={{
          fontSize: isMobile ? '1.5rem' : isTablet ? '1.8rem' : '2rem',
          color: 'var(--neon-blue)',
          marginBottom: '15px',
          fontWeight: '700',
          textShadow: '0 0 20px var(--neon-blue)'
        }}>
          Secure Transmission Complete!
        </h3>
        <p style={{
          fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
          color: 'var(--text-secondary)',
          marginBottom: '15px'
        }}>
          ✅ Your encrypted message has been sent successfully.
        </p>
        <p style={{
          fontSize: isMobile ? '0.9rem' : '1rem',
          color: 'var(--text-tertiary)',
          marginBottom: '10px',
          wordBreak: 'break-word',
          padding: isMobile ? '0 10px' : '0'
        }}>
          I'll get back to you soon at {formData.email}!
        </p>
        <p style={{
          fontSize: isMobile ? '0.85rem' : '0.95rem',
          color: 'var(--text-tertiary)'
        }}>
          📧 A thank you message has also been sent to your email.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      {showSecurityViz && (
        <SecurityVisualization
          isActive={showSecurityViz}
          formData={formData}
          onComplete={handleSecurityComplete}
        />
      )}

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(10, 14, 39, 0.8)',
          border: '2px solid rgba(0, 243, 255, 0.3)',
          padding: isMobile ? '25px 20px' : isTablet ? '35px' : '40px',
          backdropFilter: 'blur(10px)',
          borderRadius: '10px',
          position: 'relative'
        }}
      >
        {/* Security Badge */}
        <div style={{
          position: 'absolute',
          top: isMobile ? '10px' : '15px',
          right: isMobile ? '10px' : '15px',
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '5px' : '8px',
          padding: isMobile ? '6px 10px' : '8px 15px',
          background: 'rgba(0, 255, 136, 0.1)',
          border: '1px solid #00ff88',
          borderRadius: '20px',
          fontSize: isMobile ? '0.65rem' : '0.8rem',
          color: '#00ff88'
        }}>
          <span>🔒</span>
          {!isSmallMobile && <span style={{ fontWeight: '600' }}>End-to-End Encrypted</span>}
        </div>

        <h3 style={{
          fontSize: isMobile ? '1.5rem' : isTablet ? '1.8rem' : '2rem',
          color: 'var(--neon-blue)',
          marginBottom: isMobile ? '25px' : '30px',
          marginTop: isMobile ? '20px' : '0',
          textAlign: 'center',
          fontWeight: '700',
          textShadow: '0 0 20px var(--neon-blue)'
        }}>
          &gt; SEND_TRANSMISSION
        </h3>

        {emailError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: isMobile ? '12px' : '15px',
              background: 'rgba(255, 0, 102, 0.1)',
              border: '2px solid #ff0066',
              borderRadius: '8px',
              color: '#ff0066',
              marginBottom: '20px',
              fontSize: isMobile ? '0.85rem' : '0.95rem',
              fontWeight: '600'
            }}
          >
            ❌ {emailError}
          </motion.div>
        )}

        <FormField
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Your name"
          icon="👤"
          isMobile={isMobile}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="your.email@example.com"
          icon="📧"
          isMobile={isMobile}
        />

        <FormField
          label="Subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          error={errors.subject}
          placeholder="What's this about?"
          icon="📋"
          isMobile={isMobile}
        />

        <div style={{ marginBottom: isMobile ? '20px' : '25px' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'var(--text-primary)',
            fontSize: isMobile ? '0.9rem' : '1rem',
            marginBottom: '10px',
            fontWeight: '600'
          }}>
            <span style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>💬</span>
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => !isMobile && audioManager.play('hover')}
            placeholder="Tell me about your project, idea, or just say hi..."
            rows={isMobile ? "4" : "6"}
            style={{
              width: '100%',
              padding: isMobile ? '12px' : '15px',
              background: 'rgba(0, 0, 0, 0.5)',
              border: `2px solid ${errors.message ? '#ff0066' : 'rgba(0, 243, 255, 0.3)'}`,
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontSize: isMobile ? '0.9rem' : '1rem',
              fontFamily: 'inherit',
              resize: 'vertical',
              outline: 'none',
              transition: 'all 0.3s'
            }}
          />
          {errors.message && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'block',
                color: '#ff0066',
                fontSize: isMobile ? '0.75rem' : '0.85rem',
                marginTop: '8px'
              }}
            >
              {errors.message}
            </motion.span>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting || isMobile ? 1 : 1.05 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
          onMouseEnter={() => !isSubmitting && !isMobile && audioManager.play('hover')}
          className="neon-button"
          style={{
            width: '100%',
            padding: isMobile ? '15px' : '18px',
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            opacity: isSubmitting ? 0.6 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                🔐
              </motion.span>
              {isMobile ? 'Sending...' : 'Encrypting & Sending...'}
            </>
          ) : (
            <>
              <span>🔒</span>
              {isMobile ? 'Send Message' : 'Send Secure Message'}
            </>
          )}
        </motion.button>

        <div style={{
          marginTop: '15px',
          textAlign: 'center',
          fontSize: isMobile ? '0.75rem' : '0.85rem',
          color: 'var(--text-tertiary)'
        }}>
          {formData.message.length} / 1000 characters
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '20px',
            padding: isMobile ? '12px' : '15px',
            background: 'rgba(0, 243, 255, 0.05)',
            border: '1px solid rgba(0, 243, 255, 0.2)',
            borderRadius: '8px',
            fontSize: isMobile ? '0.75rem' : '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ fontSize: isMobile ? '1rem' : '1.2rem', flexShrink: 0 }}>🛡️</span>
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>Your Privacy Matters:</strong> 
              {' '}All data is encrypted using AES-256 encryption before transmission.
            </div>
          </div>
        </motion.div>
      </motion.form>
    </>
  );
};

const FormField = ({ label, name, type, value, onChange, error, placeholder, icon, isMobile }) => (
  <div style={{ marginBottom: isMobile ? '20px' : '25px' }}>
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: 'var(--text-primary)',
      fontSize: isMobile ? '0.9rem' : '1rem',
      marginBottom: '10px',
      fontWeight: '600'
    }}>
      <span style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>{icon}</span>
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onFocus={() => !isMobile && audioManager.play('hover')}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: isMobile ? '12px' : '15px',
        background: 'rgba(0, 0, 0, 0.5)',
        border: `2px solid ${error ? '#ff0066' : 'rgba(0, 243, 255, 0.3)'}`,
        borderRadius: '8px',
        color: 'var(--text-primary)',
        fontSize: isMobile ? '0.9rem' : '1rem',
        outline: 'none',
        transition: 'all 0.3s'
      }}
    />
    {error && (
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'block',
          color: '#ff0066',
          fontSize: isMobile ? '0.75rem' : '0.85rem',
          marginTop: '8px'
        }}
      >
        {error}
      </motion.span>
    )}
  </div>
);

export default ContactForm;