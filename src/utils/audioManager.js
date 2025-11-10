// utils/audioManager.js
import { Howl, Howler } from 'howler';

class AudioManager {
  constructor() {
    this.music = {};
    this.sfx = {};
    this.currentMusic = null;
    this.musicVolume = 0.3;
    this.sfxVolume = 0.7;
    this.isMusicEnabled = true;
    this.isSFXEnabled = true;
    this.isMusicLoaded = false;
    this.isSFXLoaded = false;
  }

  // Initialize all audio assets
  init() {
    this.loadMusic();
    this.loadSFX();
  }

  // Load background music for each chapter
  loadMusic() {
    // Prologue - Dark, mysterious cyberpunk intro
    this.music.prologue = new Howl({
      src: ['/audio/origin-bgm.mp3'],
      loop: true,
      volume: this.musicVolume,
      onload: () => {
        console.log('✓ Prologue music loaded');
        this.checkMusicLoaded();
      },
      onloaderror: (id, err) => {
        console.warn('⚠ Prologue music failed to load:', err);
        this.checkMusicLoaded();
      }
    });

    // Origin - Emotional, nostalgic theme
    this.music.origin = new Howl({
      src: ['/audio/mystery-194918.mp3'],
      loop: true,
      volume: this.musicVolume,
      onload: () => {
        console.log('✓ Origin music loaded');
        this.checkMusicLoaded();
      },
      onloaderror: (id, err) => {
        console.warn('⚠ Origin music failed to load:', err);
        this.checkMusicLoaded();
      }
    });

    // Trials - Energetic, action-packed
    this.music.trials = new Howl({
      src: ['/audio/trials-bgm.mp3'],
      loop: true,
      volume: this.musicVolume,
      onload: () => {
        console.log('✓ Trials music loaded');
        this.checkMusicLoaded();
      },
      onloaderror: (id, err) => {
        console.warn('⚠ Trials music failed to load:', err);
        this.checkMusicLoaded();
      }
    });

    // Vision - Uplifting, hopeful
    this.music.vision = new Howl({
      src: ['/audio/vision-bgm.mp3'],
      loop: true,
      volume: this.musicVolume,
      onload: () => {
        console.log('✓ Vision music loaded');
        this.checkMusicLoaded();
      },
      onloaderror: (id, err) => {
        console.warn('⚠ Vision music failed to load:', err);
        this.checkMusicLoaded();
      }
    });

    // Connection - Warm, closing theme
    this.music.connection = new Howl({
      src: ['/audio/connection-bgm.mp3'],
      loop: true,
      volume: this.musicVolume,
      onload: () => {
        console.log('✓ Connection music loaded');
        this.checkMusicLoaded();
      },
      onloaderror: (id, err) => {
        console.warn('⚠ Connection music failed to load:', err);
        this.checkMusicLoaded();
      }
    });
  }

  // Load sound effects
  loadSFX() {
    // UI sounds
    this.sfx.uiClick = new Howl({
      src: ['/audio/ui-click.mp3'],
      volume: this.sfxVolume,
      onload: () => {
        console.log('✓ UI Click SFX loaded');
        this.checkSFXLoaded();
      }
    });

    this.sfx.uiHover = new Howl({
      src: ['/audio/ui-click.mp3'],
      volume: this.sfxVolume * 0.5,
      onload: () => {
        console.log('✓ UI Hover SFX loaded');
        this.checkSFXLoaded();
      }
    });

    // Skill unlock
    this.sfx.skillUnlock = new Howl({
      src: ['/audio/skill-unlock.mp3'],
      volume: this.sfxVolume,
      onload: () => {
        console.log('✓ Skill Unlock SFX loaded');
        this.checkSFXLoaded();
      }
    });

    // Chapter transition
    this.sfx.chapterTransition = new Howl({
      src: ['/audio/chapter-transition.mp3'],
      volume: this.sfxVolume,
      onload: () => {
        console.log('✓ Chapter Transition SFX loaded');
        this.checkSFXLoaded();
      }
    });

    // Dialogue appear
    this.sfx.dialogueAppear = new Howl({
      src: ['/audio/dialogue-appear.mp3'],
      volume: this.sfxVolume * 0.6,
      onload: () => {
        console.log('✓ Dialogue Appear SFX loaded');
        this.checkSFXLoaded();
      }
    });

    // Quest complete
    this.sfx.questComplete = new Howl({
      src: ['/audio/quest-complete.mp3'],
      volume: this.sfxVolume,
      onload: () => {
        console.log('✓ Quest Complete SFX loaded');
        this.checkSFXLoaded();
      }
    });

    // XP gain
    this.sfx.xpGain = new Howl({
      src: ['/audio/xp-gain.mp3'],
      volume: this.sfxVolume * 0.7,
      onload: () => {
        console.log('✓ XP Gain SFX loaded');
        this.checkSFXLoaded();
      }
    });

    // Error/warning
    this.sfx.error = new Howl({
      src: ['/audio/error.mp3'],
      volume: this.sfxVolume,
      onload: () => {
        console.log('✓ Error SFX loaded');
        this.checkSFXLoaded();
      }
    });
  }

  checkMusicLoaded() {
    const musicTracks = Object.keys(this.music).length;
    const expectedTracks = 5; // prologue, origin, trials, vision, connection
    if (musicTracks >= expectedTracks) {
      this.isMusicLoaded = true;
      console.log('✅ All music tracks ready');
    }
  }
  

  checkSFXLoaded() {
    const sfxCount = Object.keys(this.sfx).length;
    const expectedSFX = 8; // all the sound effects we loaded
    if (sfxCount >= expectedSFX) {
      this.isSFXLoaded = true;
      console.log('✅ All SFX ready');
    }
  }

  // Alias method that maps common names to actual SFX
play(sfxName) {
  const soundMap = {
    'click': 'uiClick',
    'hover': 'uiHover',
    'success': 'questComplete',
    'powerUp': 'skillUnlock',
    'type': 'dialogueAppear',
    'glitch': 'error',
    'transition': 'chapterTransition'
  };
  
  const actualSound = soundMap[sfxName] || sfxName;
  this.playSFX(actualSound);
}

  // Play background music with smooth transition
  playMusic(chapterName, fadeIn = 2000) {
    if (!this.isMusicEnabled) return;

    const newMusic = this.music[chapterName];
    if (!newMusic) {
      console.warn(`Music for "${chapterName}" not found`);
      return;
    }

    // If same music is playing, don't restart
    if (this.currentMusic === newMusic && newMusic.playing()) {
      return;
    }

    // Fade out current music
    if (this.currentMusic && this.currentMusic.playing()) {
      this.currentMusic.fade(this.musicVolume, 0, 1500);
      setTimeout(() => {
        if (this.currentMusic) {
          this.currentMusic.stop();
        }
      }, 1500);
    }

    // Fade in new music
    newMusic.volume(0);
    newMusic.play();
    newMusic.fade(0, this.musicVolume, fadeIn);
    this.currentMusic = newMusic;

    console.log(`🎵 Playing: ${chapterName} theme`);
  }

  // Stop music with fade out
  stopMusic(fadeOut = 1500) {
    if (this.currentMusic && this.currentMusic.playing()) {
      this.currentMusic.fade(this.musicVolume, 0, fadeOut);
      setTimeout(() => {
        if (this.currentMusic) {
          this.currentMusic.stop();
        }
      }, fadeOut);
    }
  }

  // Play sound effect
  playSFX(sfxName) {
    if (!this.isSFXEnabled) return;

    const sound = this.sfx[sfxName];
    if (sound) {
      sound.play();
    } else {
      console.warn(`SFX "${sfxName}" not found`);
    }
  }

  // Toggle music on/off
  toggleMusic(enabled) {
    this.isMusicEnabled = enabled;
    
    if (!enabled && this.currentMusic) {
      this.currentMusic.fade(this.musicVolume, 0, 500);
      setTimeout(() => {
        if (this.currentMusic) {
          this.currentMusic.pause();
        }
      }, 500);
    } else if (enabled && this.currentMusic) {
      this.currentMusic.play();
      this.currentMusic.fade(0, this.musicVolume, 500);
    }
  }

  // Toggle SFX on/off
  toggleSFX(enabled) {
    this.isSFXEnabled = enabled;
  }

  // Set music volume (0-1)
  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.currentMusic) {
      this.currentMusic.volume(this.musicVolume);
    }
  }

  // Set SFX volume (0-1)
  setSFXVolume(volume) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    Object.values(this.sfx).forEach(sound => {
      sound.volume(this.sfxVolume);
    });
  }

  // Mute all audio
  muteAll() {
    Howler.mute(true);
  }

  // Unmute all audio
  unmuteAll() {
    Howler.mute(false);
  }

  // Clean up
  cleanup() {
    // Stop and unload all music
    Object.values(this.music).forEach(track => {
      track.stop();
      track.unload();
    });

    // Unload all SFX
    Object.values(this.sfx).forEach(sound => {
      sound.unload();
    });

    this.currentMusic = null;
  }
}

// Create singleton instance
const audioManager = new AudioManager();

export default audioManager;