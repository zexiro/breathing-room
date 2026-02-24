import { writable } from 'svelte/store';

const STORAGE_KEY = 'breathing-room-prefs';

const defaults = {
  theme: 'auto',
  breathingPattern: 'box',
  soundVolume: 0.3,
  reducedMotion: false,
};

function loadPrefs() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaults, ...JSON.parse(stored) } : { ...defaults };
  } catch {
    return { ...defaults };
  }
}

function createPreferences() {
  const { subscribe, set, update } = writable(loadPrefs());

  subscribe((value) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // localStorage unavailable
    }
  });

  return {
    subscribe,
    set,
    update,
    reset: () => set({ ...defaults }),
  };
}

export const preferences = createPreferences();
