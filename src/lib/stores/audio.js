import { writable } from 'svelte/store';

export const audioState = writable({
  initialized: false,
  activeSounds: {},  // { rain: 0.3, ocean: 0, wind: 0, white: 0 }
  masterVolume: 0.3,
});
