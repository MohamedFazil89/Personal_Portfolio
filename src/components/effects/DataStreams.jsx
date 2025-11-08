// components/effects/DataStreams.jsx
import { useEffect, useRef } from 'react';

const DataStreams = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters for the streams (binary + symbols)
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    // Animation loop
    let animationFrameId;
    const draw = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(5, 8, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Gradient color (cyan to blue)
        const gradient = ctx.createLinearGradient(
          0, 
          drops[i] * fontSize, 
          0, 
          (drops[i] + 10) * fontSize
        );
        gradient.addColorStop(0, '#00f3ff');
        gradient.addColorStop(0.5, '#0088cc');
        gradient.addColorStop(1, 'rgba(0, 136, 204, 0.1)');
        
        ctx.fillStyle = gradient;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset drop randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.15
      }}
    />
  );
};

export default DataStreams;