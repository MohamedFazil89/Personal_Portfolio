// utils/projectsData.js

export const projectsData = [
  {
    id: 'project-1',
    title: 'Anime Portfolio Website',
    category: 'Web Development',
    difficulty: 'LEGENDARY',
    status: 'completed',
    xpReward: 150,
    thumbnail: '🌐',
    description: 'A gamified, anime-styled portfolio website with 3D effects, sound design, and chapter-based navigation.',
    challenge: 'Creating an immersive experience that blends storytelling with technical showcase.',
    solution: 'Built with React, Three.js, Framer Motion, and Howler.js. Implemented scroll-triggered animations, particle systems, and dynamic audio.',
    technologies: ['React', 'Three.js', 'Framer Motion', 'Howler.js', 'GSAP', 'Zustand'],
    features: [
      '3D particle field with mouse tracking',
      'Chapter-based story progression',
      'Skill unlock animations',
      'Dynamic background music system',
      'Real-time sound effects'
    ],
    impact: {
      metric: 'User Engagement',
      value: '400%',
      description: 'increase in average session time'
    },
    githubUrl: '#',
    liveUrl: '#',
    unlockDelay: 0
  },
  {
    id: 'project-2',
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    difficulty: 'EPIC',
    status: 'completed',
    xpReward: 120,
    thumbnail: '🛒',
    description: 'A modern e-commerce platform with real-time inventory, payment integration, and admin dashboard.',
    challenge: 'Handling concurrent transactions and maintaining data consistency across multiple user sessions.',
    solution: 'Implemented Redis caching, PostgreSQL with row-level locking, and Stripe payment webhooks.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'AWS S3'],
    features: [
      'Real-time inventory management',
      'Secure payment processing',
      'Order tracking system',
      'Admin analytics dashboard',
      'Email notification system'
    ],
    impact: {
      metric: 'Revenue',
      value: '$50K+',
      description: 'processed in first month'
    },
    githubUrl: '#',
    liveUrl: '#',
    unlockDelay: 800
  },
  {
    id: 'project-3',
    title: 'AI Content Generator',
    category: 'Machine Learning',
    difficulty: 'EPIC',
    status: 'completed',
    xpReward: 130,
    thumbnail: '🤖',
    description: 'An AI-powered tool that generates marketing content, blog posts, and social media captions.',
    challenge: 'Fine-tuning language models for brand-specific tone while maintaining coherence.',
    solution: 'Fine-tuned GPT models with custom training data and implemented context-aware prompt engineering.',
    technologies: ['Python', 'OpenAI API', 'FastAPI', 'React', 'TensorFlow'],
    features: [
      'Multi-format content generation',
      'Brand voice customization',
      'SEO optimization suggestions',
      'Content scheduling',
      'Performance analytics'
    ],
    impact: {
      metric: 'Content Creation',
      value: '10x',
      description: 'faster than manual writing'
    },
    githubUrl: '#',
    liveUrl: '#',
    unlockDelay: 1600
  },
  {
    id: 'project-4',
    title: 'Video Editing Platform',
    category: 'Multimedia',
    difficulty: 'RARE',
    status: 'completed',
    xpReward: 100,
    thumbnail: '🎥',
    description: 'A web-based video editor with timeline editing, effects library, and cloud rendering.',
    challenge: 'Processing high-resolution video in browser without performance degradation.',
    solution: 'Utilized WebAssembly for video processing, WebGL for previews, and cloud workers for rendering.',
    technologies: ['WebAssembly', 'WebGL', 'FFmpeg.wasm', 'React', 'AWS Lambda'],
    features: [
      'Drag-and-drop timeline editor',
      'Real-time preview',
      'Effects and transitions library',
      'Cloud rendering',
      'Export in multiple formats'
    ],
    impact: {
      metric: 'Users',
      value: '5K+',
      description: 'monthly active editors'
    },
    githubUrl: '#',
    liveUrl: '#',
    unlockDelay: 2400
  },
  {
    id: 'project-5',
    title: 'Real-Time Chat Application',
    category: 'Web Development',
    difficulty: 'RARE',
    status: 'completed',
    xpReward: 90,
    thumbnail: '💬',
    description: 'A real-time messaging platform with video calls, file sharing, and end-to-end encryption.',
    challenge: 'Ensuring message delivery and maintaining connection stability across network changes.',
    solution: 'Implemented WebSocket with automatic reconnection, message queuing, and WebRTC for video.',
    technologies: ['Socket.io', 'WebRTC', 'Node.js', 'MongoDB', 'Redis'],
    features: [
      'Instant messaging',
      'Video/audio calls',
      'File sharing',
      'End-to-end encryption',
      'Typing indicators'
    ],
    impact: {
      metric: 'Messages',
      value: '1M+',
      description: 'exchanged daily'
    },
    githubUrl: '#',
    liveUrl: '#',
    unlockDelay: 3200
  },
  {
    id: 'project-6',
    title: 'Mobile Fitness Tracker',
    category: 'Mobile Development',
    difficulty: 'RARE',
    status: 'completed',
    xpReward: 85,
    thumbnail: '💪',
    description: 'A cross-platform mobile app for tracking workouts, nutrition, and health metrics.',
    challenge: 'Syncing data across devices while working offline and integrating with health APIs.',
    solution: 'Built with React Native, implemented offline-first architecture with local database sync.',
    technologies: ['React Native', 'SQLite', 'HealthKit', 'Google Fit', 'Firebase'],
    features: [
      'Workout logging',
      'Nutrition tracking',
      'Progress charts',
      'Social challenges',
      'Wearable integration'
    ],
    impact: {
      metric: 'Downloads',
      value: '10K+',
      description: 'across iOS and Android'
    },
    githubUrl: '#',
    liveUrl: '#',
    unlockDelay: 4000
  }
];

export const trialsIntro = {
  title: "The Trials",
  subtitle: "Where Ideas Become Reality",
  description: "Each project is a quest. Each challenge conquered adds to the legend. These are the battles I've fought and won in the digital realm.",
  missionStatement: "Click any quest to explore the journey, challenges faced, and solutions crafted."
};

// Difficulty colors
export const difficultyConfig = {
  'LEGENDARY': { color: '#ff0066', glow: '0 0 30px #ff0066' },
  'EPIC': { color: '#b000ff', glow: '0 0 30px #b000ff' },
  'RARE': { color: '#00f3ff', glow: '0 0 30px #00f3ff' },
  'COMMON': { color: '#00ff88', glow: '0 0 30px #00ff88' }
};