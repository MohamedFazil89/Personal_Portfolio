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
    ], impact: {
      metric: 'User Engagement',
      value: 'Designed for High Engagement',
      description: 'crafted to keep visitors exploring longer'
    },

    githubUrl: '#',
    liveUrl: '#',
    unlockDelay: 0
  },
  
  {
    id: 'project-4',
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
      value: 'Fully Functional',
      description: 'supports custom PC configurations end to end'
    },
    githubUrl: '#',
    liveUrl: '#',
    unlockDelay: 3200
  },
  {
    id: 'project-2',
    title: 'LocalLens – Emotional Travel Discovery',
    category: 'Mobile App',
    difficulty: 'EPIC',
    status: 'completed',
    xpReward: 120,
    thumbnail: '📍',
    description: 'An emotion-driven travel journaling app that lets users share local stories through videos, audio pins, and multilingual captions.',
    challenge: 'Building seamless real-time journey updates and emotion-based content suggestions across different regions and languages.',
    solution: 'Integrated Supabase for data sync, AssemblyAI + Translate API for real-time transcription & translation, and emotion tagging using sentiment analysis.',
    technologies: ['Flutter', 'Supabase', 'Node.js', , 'AssemblyAI', 'Google Translate API'],
    features: [
      'Emotion-based journey discovery',
      'Audio & video pins with multilingual captions',
      'Interactive map journeys',
      'Gamified experience with XP & leaderboards',
      'Offline caching & instant sync'
    ],
    impact: {
      metric: 'Journeys',
      value: 'Prototype Ready',
      description: 'designed to support thousands of shared journeys'
    }
    ,
    githubUrl: '#',
    liveUrl: '#',
    unlockDelay: 3200
  },
  {
    id: 'project-6',
    title: 'AI Fitness Tracker',
    category: 'Web and App Development',
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
    ],
    impact: {
      metric: 'IMPACT',
      value: 'Improved Engagement',
      description: 'aimed at making workouts more interactive'
    }
    ,
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