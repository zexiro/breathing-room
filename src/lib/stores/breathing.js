import { writable, derived } from 'svelte/store';

export const breathingState = writable({
  isRunning: false,
  patternId: 'box',
  phaseIndex: 0,
  cycleCount: 0,
  totalCycles: 0,  // 0 = infinite
  elapsed: 0,
});

export const currentPhase = derived(breathingState, ($state) => {
  const patterns = getPatterns();
  const pattern = patterns[$state.patternId];
  if (!pattern) return null;
  return pattern.phases[$state.phaseIndex] || null;
});

export function getPatterns() {
  return {
    box: {
      id: 'box',
      name: 'Box Breathing',
      description: '4-4-4-4 — Equal counts, calming and centering',
      phases: [
        { label: 'Breathe in', duration: 4, type: 'inhale' },
        { label: 'Hold', duration: 4, type: 'hold' },
        { label: 'Breathe out', duration: 4, type: 'exhale' },
        { label: 'Hold', duration: 4, type: 'hold' },
      ],
    },
    '4-7-8': {
      id: '4-7-8',
      name: '4-7-8 Relaxing',
      description: '4-7-8 — Deep relaxation, great for sleep',
      phases: [
        { label: 'Breathe in', duration: 4, type: 'inhale' },
        { label: 'Hold', duration: 7, type: 'hold' },
        { label: 'Breathe out', duration: 8, type: 'exhale' },
      ],
    },
    coherent: {
      id: 'coherent',
      name: 'Coherent Breathing',
      description: '5-5 — Balanced rhythm for heart rate variability',
      phases: [
        { label: 'Breathe in', duration: 5, type: 'inhale' },
        { label: 'Breathe out', duration: 5, type: 'exhale' },
      ],
    },
  };
}
