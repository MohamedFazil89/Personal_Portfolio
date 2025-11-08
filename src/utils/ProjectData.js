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
  id: 'project-2',
  title: 'Custom PC Builder Store',
  category: 'E-Commerce',
  difficulty: 'HARD',
  status: 'completed',
  xpReward: 100,
  thumbnail: '🖥️',
  description: 'An e-commerce platform that lets users customize their own PC by selecting compatible components and placing orders instantly.',
  challenge: 'Managing component compatibility, dynamic pricing, and real-time stock updates across thousands of products.',
  solution: 'Developed a compatibility engine with live validation, integrated Stripe for payments, and automated inventory sync using webhooks.',
  technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Redis'],
  features: [
    'PC component compatibility checker',
    'Real-time price and stock updates',
    'Custom build preview',
    'Secure payment gateway',
    'Order tracking dashboard'
  ],
  impact: {
    metric: 'Builds',
    value: '10K+',
    description: 'custom PCs configured by users'
  },
  githubUrl: '#',
  liveUrl: '#',
  unlockDelay: 3200
},
  {
  id: 'project-1',
  title: 'LocalLens – Emotional Travel Discovery',
  category: 'Mobile & Web App',
  difficulty: 'EPIC',
  status: 'completed',
  xpReward: 120,
  thumbnail: '📍',
  description: 'An emotion-driven travel journaling app that lets users share local stories through videos, audio pins, and multilingual captions.',
  challenge: 'Building seamless real-time journey updates and emotion-based content suggestions across different regions and languages.',
  solution: 'Integrated Supabase for data sync, AssemblyAI + Translate API for real-time transcription & translation, and emotion tagging using sentiment analysis.',
  technologies: ['React Native', 'Supabase', 'Node.js', 'Firebase (legacy)', 'AssemblyAI', 'Google Translate API'],
  features: [
    'Emotion-based journey discovery',
    'Audio & video pins with multilingual captions',
    'Interactive map journeys',
    'Gamified experience with XP & leaderboards',
    'Offline caching & instant sync'
  ],
  impact: {
    metric: 'Journeys',
    value: '50K+',
    description: 'shared by explorers worldwide'
  },
  githubUrl: '#',
  liveUrl: '#',
  unlockDelay: 3200
}
  {
    id: 'project-6',
    title: 'AI Fitness Tracker',
    category: 'Web Development',
    difficulty: 'RARE',
    status: 'completed',
    xpReward: 85,
    thumbnail: '💪',
    description: 'A Dynimic web app for tracking workouts, nutrition, and health metrics using AI posture dediction',
    challenge: 'Syncing data across devices while working offline and integrating with health APIs.',
    solution: 'Built with ReactJS, implemented offline-first architecture with local database sync.',
    technologies: ['ReactJS', 'FireBase', 'NODEJS', 'GoogleAPIs'],
    features: [
      'Workout logging',
      'Nutrition tracking',
      'Progress charts',
      'Social challenges',
      'Wearable integration'
    ],
    impact: {
      metric: 'IMPACT',
      value: 'INCRESE IN ENGAGGIG WORKOUT',
      description: 'across WEB & APP'
    },
    githubUrl: '#',
    liveUrl: '#',
    unlockDelay: 5000
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