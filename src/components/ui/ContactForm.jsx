// components/ui/ContactForm.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import audioManager from '../../utils/audioManager';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
    audioManager.play('powerUp');
    
    // Simulate API call (replace with your actual endpoint)
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      audioManager.play('success');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 2000);
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
          Transmission Received!
        </h3>
        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-secondary)'
        }}>
          Your message has been sent successfully. I'll get back to you soon!
        </p>
      </motion.div>
    );
  }

  return (
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
        borderRadius: '10px'
      }}
    >
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
              ⚡
            </motion.span>
            Transmitting...
          </>
        ) : (
          <>
            <span>🚀</span>
            Send Message
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
    </motion.form>
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