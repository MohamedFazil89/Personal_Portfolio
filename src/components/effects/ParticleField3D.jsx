// components/effects/ParticleField3D.jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleField3D = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particle geometry
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Cyan/blue color palette
    const color1 = new THREE.Color(0x00f3ff); // Bright cyan
    const color2 = new THREE.Color(0x0088cc); // Deep blue
    const color3 = new THREE.Color(0xb000ff); // Purple accent

    for (let i = 0; i < particleCount; i++) {
      // Position particles in a cube
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      // Random color from palette
      const colorChoice = Math.random();
      const selectedColor = colorChoice < 0.6 ? color1 : colorChoice < 0.9 ? color2 : color3;
      
      colors[i * 3] = selectedColor.r;
      colors[i * 3 + 1] = selectedColor.g;
      colors[i * 3 + 2] = selectedColor.b;

      // Random sizes
      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Particle material with glow
    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Add connecting lines (grid effect)
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending
    });

    const gridSize = 20;
    const linePositions = [];
    
    // Horizontal lines
    for (let i = -gridSize; i <= gridSize; i += 4) {
      linePositions.push(-gridSize, i, -20);
      linePositions.push(gridSize, i, -20);
    }
    
    // Vertical lines
    for (let i = -gridSize; i <= gridSize; i += 4) {
      linePositions.push(i, -gridSize, -20);
      linePositions.push(i, gridSize, -20);
    }

    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    
    const grid = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(grid);

    // Mouse move handler
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Scroll handler
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = Date.now() * 0.0005;

      // Rotate particles based on mouse
      particles.rotation.y = mouseRef.current.x * 0.5 + time * 0.1;
      particles.rotation.x = mouseRef.current.y * 0.3 + Math.sin(time) * 0.1;

      // Move particles based on scroll
      particles.position.y = scrollRef.current * 0.01;

      // Pulse effect
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];

        // Wave motion
        positions[i + 1] = y + Math.sin(time + x * 0.01) * 0.1;
        positions[i + 2] = z + Math.cos(time + y * 0.01) * 0.1;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Rotate grid
      grid.rotation.x = time * 0.05;
      grid.rotation.y = time * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.4
      }}
    />
  );
};

export default ParticleField3D;