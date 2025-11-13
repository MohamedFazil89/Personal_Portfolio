// store/gameStore.js
import { create } from 'zustand';
import audioManager from '../utils/audioManager'; // ADD THIS IMPORT

const useGameStore = create((set) => ({
  // Progress tracking
  currentChapter: 'prologue',
  completedChapters: [],
  xp: 0,
  unlockedSkills: [],
  
  // Audio state
  musicEnabled: true,
  sfxEnabled: true,
  musicVolume: 0.3,
  sfxVolume: 0.5,
  
  // Dialogue state
  currentDialogue: null,
  dialogueHistory: [],
  
  // Actions
  completeChapter: (chapter) => set((state) => {
    if (!state.completedChapters.includes(chapter)) {
      return {
        completedChapters: [...state.completedChapters, chapter],
        xp: state.xp + 100
      };
    }
    return {};
  }),
  
  setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
  
  unlockSkill: (skill) => set((state) => ({
    unlockedSkills: [...state.unlockedSkills, skill],
    xp: state.xp + 30
  })),
  
  setDialogue: (dialogue) => set({ currentDialogue: dialogue }),
  
  // ✅ FIXED: Actually toggle audio
  toggleMusic: () => set((state) => {
    const newState = !state.musicEnabled;
    audioManager.toggleMusic(newState);
    return { musicEnabled: newState };
  }),
  
  // ✅ FIXED: Actually toggle SFX
  toggleSFX: () => set((state) => {
    const newState = !state.sfxEnabled;
    audioManager.toggleSFX(newState);
    return { sfxEnabled: newState };
  }),
  
  // Reset for development
  reset: () => set({
    currentChapter: 'prologue',
    completedChapters: [],
    xp: 0,
    unlockedSkills: [],
    currentDialogue: null,
    dialogueHistory: []
  })
}));

export default useGameStore;
