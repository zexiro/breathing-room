import { breathingState } from '../stores/breathing.js';
import { getPatterns } from '../stores/breathing.js';
import { get } from 'svelte/store';

let intervalId = null;
let phaseStart = 0;
let onPhaseChange = null;

export function setPhaseChangeCallback(cb) {
  onPhaseChange = cb;
}

function tick() {
  const state = get(breathingState);
  if (!state.isRunning) return;

  const patterns = getPatterns();
  const pattern = patterns[state.patternId];
  if (!pattern) return;

  const phase = pattern.phases[state.phaseIndex];
  const now = performance.now();
  const elapsed = (now - phaseStart) / 1000;

  if (elapsed >= phase.duration) {
    // Advance to next phase
    let nextPhaseIndex = (state.phaseIndex + 1) % pattern.phases.length;
    let nextCycleCount = state.cycleCount;

    if (nextPhaseIndex === 0) {
      nextCycleCount++;
      if (state.totalCycles > 0 && nextCycleCount >= state.totalCycles) {
        stop();
        return;
      }
    }

    phaseStart = now;
    breathingState.update((s) => ({
      ...s,
      phaseIndex: nextPhaseIndex,
      cycleCount: nextCycleCount,
      elapsed: 0,
    }));

    const nextPhase = pattern.phases[nextPhaseIndex];
    if (onPhaseChange) onPhaseChange(nextPhase);
  } else {
    breathingState.update((s) => ({ ...s, elapsed }));
  }
}

export function start(patternId, totalCycles = 0) {
  const patterns = getPatterns();
  const pattern = patterns[patternId];
  if (!pattern) return;

  phaseStart = performance.now();
  breathingState.set({
    isRunning: true,
    patternId,
    phaseIndex: 0,
    cycleCount: 0,
    totalCycles,
    elapsed: 0,
  });

  if (onPhaseChange) onPhaseChange(pattern.phases[0]);
  intervalId = setInterval(tick, 50);
}

export function stop() {
  if (intervalId) clearInterval(intervalId);
  intervalId = null;
  breathingState.update((s) => ({ ...s, isRunning: false, elapsed: 0 }));
}

export function pause() {
  if (intervalId) clearInterval(intervalId);
  intervalId = null;
  breathingState.update((s) => ({ ...s, isRunning: false }));
}

export function resume() {
  const state = get(breathingState);
  if (state.isRunning) return;
  phaseStart = performance.now() - state.elapsed * 1000;
  breathingState.update((s) => ({ ...s, isRunning: true }));
  intervalId = setInterval(tick, 50);
}
