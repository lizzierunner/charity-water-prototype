// ===============================
// Sound System for H2O Hero Quiz
// ===============================
// Author: GitHub Copilot
// Date: 2025-10-17
// Dependencies: None (uses <audio> elements)
// Usage: import { playSound, setMuted, setVolume, preloadSounds, isMuted } from './sound-system.js';

/**
 * Sound effect files (MP3, <50KB, royalty-free)
 * Replace with actual file paths in assets/sounds/
 */
const SOUND_FILES = {
  button: 'assets/sounds/button.mp3',
  correct: 'assets/sounds/correct.mp3',
  wrong: 'assets/sounds/wrong.mp3',
  levelup: 'assets/sounds/levelup.mp3',
  confetti: 'assets/sounds/confetti.mp3',
  transition: 'assets/sounds/transition.mp3'
};

const audioElements = {};
let muted = false;
let volume = 1.0;
let soundPrefs = {
  button: true,
  correct: true,
  wrong: true,
  levelup: true,
  confetti: true,
  transition: true
};

const LOCAL_STORAGE_KEY = 'h2o-hero-sound-prefs';

/**
 * Preload all sound files
 */
export function preloadSounds() {
  Object.keys(SOUND_FILES).forEach(key => {
    const audio = new Audio(SOUND_FILES[key]);
    audio.preload = 'auto';
    audio.volume = volume;
    audioElements[key] = audio;
  });
}

/**
 * Play a sound effect by key
 * @param {string} key - Sound effect key
 */
export function playSound(key) {
  if (muted || !soundPrefs[key]) return;
  const audio = audioElements[key];
  if (audio) {
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
  }
}

/**
 * Set mute state
 * @param {boolean} value
 */
export function setMuted(value) {
  muted = !!value;
  savePrefs();
}

/**
 * Set global volume
 * @param {number} value - 0.0 to 1.0
 */
export function setVolume(value) {
  volume = Math.max(0, Math.min(1, value));
  Object.values(audioElements).forEach(audio => { audio.volume = volume; });
  savePrefs();
}

/**
 * Enable/disable individual sound effect
 * @param {string} key
 * @param {boolean} enabled
 */
export function setSoundEnabled(key, enabled) {
  if (key in soundPrefs) {
    soundPrefs[key] = !!enabled;
    savePrefs();
  }
}

/**
 * Get mute state
 */
export function isMuted() {
  return muted;
}

/**
 * Save preferences to localStorage
 */
function savePrefs() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ muted, volume, soundPrefs }));
}

/**
 * Load preferences from localStorage
 */
export function loadPrefs() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return;
    const prefs = JSON.parse(raw);
    muted = !!prefs.muted;
    volume = typeof prefs.volume === 'number' ? prefs.volume : 1.0;
    soundPrefs = Object.assign(soundPrefs, prefs.soundPrefs || {});
    setVolume(volume);
  } catch {}
}

/**
 * Respect prefers-reduced-motion: auto-mute
 */
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setMuted(true);
}

// Preload sounds on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', preloadSounds);
} else {
  preloadSounds();
}

// TODO: Add UI mute button and volume slider
// TODO: Add per-effect enable/disable controls
// TODO: Add visual alternatives for all sounds
