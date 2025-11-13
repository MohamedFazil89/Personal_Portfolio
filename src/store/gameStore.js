// store/gameStore.js
import { create } from 'zustand';

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
    // ✅ FIX: Only add chapter if NOT already completed
    if (!state.completedChapters.includes(chapter)) {
      return {
        completedChapters: [...state.completedChapters, chapter],
        xp: state.xp + 100
      };
    }
    // Already completed: do nothing
    return {};
  }),
  
  setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
  
  unlockSkill: (skill) => set((state) => ({
    unlockedSkills: [...state.unlockedSkills, skill],
    xp: state.xp + 30
  })),
  
  setDialogue: (dialogue) => set({ currentDialogue: dialogue }),
  
  toggleMusic: () => set((state) => ({ musicEnabled: !state.musicEnabled })),
  toggleSFX: () => set((state) => ({ sfxEnabled: !state.sfxEnabled })),
  
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
