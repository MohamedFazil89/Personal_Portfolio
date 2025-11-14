// components/ui/ContactForm.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import audioManager from '../../utils/audioManager';
import SecurityVisualization from './SecurityVisualization';

// Initialize EmailJS once
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
    // Email 1: Admin notification to your inbox
    await emailjs.send(
      'service_h02jq08',
      'template_iu5rbaa',
      {
        to_email: 'nmohammedfazil790@gmail.com', // Where to send
        from_name: formData.name,      // {{from_name}}
        from_email: formData.email,    // {{from_email}}
        subject: formData.subject,     // {{subject}}
        message: formData.message      // {{message}}
      },
      'LoWakzIuDmCxZLO1Z'
    );
    console.log('✅ Email sent to your inbox!');

    // Email 2: Auto-reply thank you to VISITOR
    await emailjs.send(
      'service_h02jq08',
      'template_dbout13', // Your thank you template
      {
        to_email: formData.email,      // SEND TO THEM ✅
        name: formData.name,           // {{name}} - THIS WAS MISSING!
        email: formData.email,         // {{email}}
        subject: formData.subject,     // {{subject}}
        message: formData.message      // {{message}}
      },
      'LoWakzIuDmCxZLO1Z'
    );
    console.log('✅ Thank you email sent to visitor!');

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
    
    // Start security visualization
    setIsSubmitting(true);
    setShowSecurityViz(true);
    audioManager.play('powerUp');
  };

  const handleSecurityComplete = async () => {
    try {
      // Send BOTH emails after animation
      const success = await sendEmails();
      
      setShowSecurityViz(false);
      setIsSubmitting(false);
      
      if (success) {
        setIsSubmitted(true);
        audioManager.play('success');
        
        // Reset form after 3 seconds
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
          padding: '60px 40px',
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
          style={{ fontSize: '5rem', marginBottom: '20px' }}
        >
          ✓
        </motion.div>
        <h3 style={{
          fontSize: '2rem',
          color: 'var(--neon-blue)',
          marginBottom: '15px',
          fontWeight: '700',
          textShadow: '0 0 20px var(--neon-blue)'
        }}>
          Secure Transmission Complete!
        </h3>
        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-secondary)',
          marginBottom: '15px'
        }}>
          ✅ Your encrypted message has been sent successfully.
        </p>
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-tertiary)',
          marginBottom: '10px'
        }}>
          I'll get back to you soon at {formData.email}!
        </p>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-tertiary)'
        }}>
          📧 A thank you message has also been sent to your email.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      {/* Security Visualization Overlay - SHOWS ENCRYPTION ANIMATION */}
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
          padding: '40px',
          backdropFilter: 'blur(10px)',
          borderRadius: '10px',
          position: 'relative'
        }}
      >
        {/* Security Badge */}
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 15px',
          background: 'rgba(0, 255, 136, 0.1)',
          border: '1px solid #00ff88',
          borderRadius: '20px',
          fontSize: '0.8rem',
          color: '#00ff88'
        }}>
          <span>🔒</span>
          <span style={{ fontWeight: '600' }}>End-to-End Encrypted</span>
        </div>

        <h3 style={{
          fontSize: '2rem',
          color: 'var(--neon-blue)',
          marginBottom: '30px',
          textAlign: 'center',
          fontWeight: '700',
          textShadow: '0 0 20px var(--neon-blue)'
        }}>
          &gt; SEND_TRANSMISSION
        </h3>

        {/* Email Error Alert */}
        {emailError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '15px',
              background: 'rgba(255, 0, 102, 0.1)',
              border: '2px solid #ff0066',
              borderRadius: '8px',
              color: '#ff0066',
              marginBottom: '20px',
              fontSize: '0.95rem',
              fontWeight: '600'
            }}
          >
            ❌ {emailError}
          </motion.div>
        )}

        {/* Name Field */}
        <FormField
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Your name"
          icon="👤"
        />

        {/* Email Field */}
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="your.email@example.com"
          icon="📧"
        />

        {/* Subject Field */}
        <FormField
          label="Subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          error={errors.subject}
          placeholder="What's this about?"
          icon="📋"
        />

        {/* Message Field */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            marginBottom: '10px',
            fontWeight: '600'
          }}>
            <span style={{ fontSize: '1.2rem' }}>💬</span>
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => audioManager.play('hover')}
            placeholder="Tell me about your project, idea, or just say hi..."
            rows="6"
            style={{
              width: '100%',
              padding: '15px',
              background: 'rgba(0, 0, 0, 0.5)',
              border: `2px solid ${errors.message ? '#ff0066' : 'rgba(0, 243, 255, 0.3)'}`,
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontSize: '1rem',
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
                fontSize: '0.85rem',
                marginTop: '8px'
              }}
            >
              {errors.message}
            </motion.span>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
          onMouseEnter={() => !isSubmitting && audioManager.play('hover')}
          className="neon-button"
          style={{
            width: '100%',
            padding: '18px',
            fontSize: '1.3rem',
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
              Encrypting & Sending...
            </>
          ) : (
            <>
              <span>🔒</span>
              Send Secure Message
            </>
          )}
        </motion.button>

        {/* Character Count */}
        <div style={{
          marginTop: '15px',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'var(--text-tertiary)'
        }}>
          {formData.message.length} / 1000 characters
        </div>

        {/* Security Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '20px',
            padding: '15px',
            background: 'rgba(0, 243, 255, 0.05)',
            border: '1px solid rgba(0, 243, 255, 0.2)',
            borderRadius: '8px',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ fontSize: '1.2rem' }}>🛡️</span>
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>Your Privacy Matters:</strong> 
              {' '}All data is encrypted using AES-256 encryption before transmission and sent through a secure HTTPS tunnel. 
              We never store sensitive information in plaintext and follow industry-standard security practices.
            </div>
          </div>
        </motion.div>
      </motion.form>
    </>
  );
};

const FormField = ({ label, name, type, value, onChange, error, placeholder, icon }) => (
  <div style={{ marginBottom: '25px' }}>
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: 'var(--text-primary)',
      fontSize: '1rem',
      marginBottom: '10px',
      fontWeight: '600'
    }}>
      <span style={{ fontSize: '1.2rem' }}>{icon}</span>
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onFocus={() => audioManager.play('hover')}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '15px',
        background: 'rgba(0, 0, 0, 0.5)',
        border: `2px solid ${error ? '#ff0066' : 'rgba(0, 243, 255, 0.3)'}`,
        borderRadius: '8px',
        color: 'var(--text-primary)',
        fontSize: '1rem',
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
          fontSize: '0.85rem',
          marginTop: '8px'
        }}
      >
        {error}
      </motion.span>
    )}
  </div>
);

export default ContactForm;
