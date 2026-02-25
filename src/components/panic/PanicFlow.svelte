<script>
  import { breathingState, currentPhase, getPatterns } from '../../lib/stores/breathing.js';
  import { preferences } from '../../lib/stores/preferences.js';
  import * as timer from '../../lib/breathing/timer.js';
  import { playPhaseCue } from '../../lib/audio/breathingCues.js';
  import BreathingCircle from '../breathing/BreathingCircle.svelte';
  import ScreenReaderAnnounce from '../shared/ScreenReaderAnnounce.svelte';

  let { onclose } = $props();

  let phase = $state('breathing'); // 'breathing' | 'options'
  let announcement = $state('Starting calming breaths. Follow along.');

  const PANIC_CYCLES = 3;

  $effect(() => {
    timer.start('box', PANIC_CYCLES);
    timer.setPhaseChangeCallback((p) => {
      announcement = p.label;
      if ($preferences.breathingCues) {
        playPhaseCue(p.type);
      }
    });

    return () => {
      timer.setPhaseChangeCallback(null);
    };
  });

  // Watch for breathing to complete
  $effect(() => {
    if (phase === 'breathing' && !$breathingState.isRunning && $breathingState.cycleCount >= PANIC_CYCLES) {
      phase = 'options';
      announcement = 'Breathing complete. How are you feeling?';
    }
  });

  function continueBreathing() {
    phase = 'breathing';
    timer.start('box');
    announcement = 'Continuing breathing exercise.';
  }

  function goToGrounding() {
    onclose?.();
    window.location.hash = '#/ground';
  }
</script>

<div class="panic-overlay" role="dialog" aria-modal="true" aria-label="Calming exercise">
  <ScreenReaderAnnounce message={announcement} />

  {#if phase === 'breathing'}
    <div class="panic-content">
      <p class="panic-reassure">You're safe. Let's breathe together.</p>
      <BreathingCircle />
      <p class="phase-display">
        {$currentPhase?.label || ''}
        {#if $currentPhase}
          <span class="timer">{Math.ceil($currentPhase.duration - $breathingState.elapsed)}</span>
        {/if}
      </p>
      <p class="cycle-info">Breath {Math.min($breathingState.cycleCount + 1, PANIC_CYCLES)} of {PANIC_CYCLES}</p>
      <button class="skip-btn" onclick={() => { timer.stop(); phase = 'options'; }}>
        I'm okay, skip ahead
      </button>
    </div>
  {:else}
    <div class="panic-content options">
      <p class="panic-reassure">You did great. Take a moment.</p>
      <div class="option-list">
        <button class="option-btn" onclick={continueBreathing}>
          <span class="option-icon">🫁</span>
          Continue breathing
        </button>
        <button class="option-btn" onclick={goToGrounding}>
          <span class="option-icon">🌿</span>
          Try grounding exercise
        </button>
        <button class="option-btn" onclick={onclose}>
          <span class="option-icon">✓</span>
          I'm feeling better
        </button>
        <div class="crisis-info">
          <p class="crisis-title">Need more help?</p>
          <p class="crisis-line">988 Suicide & Crisis Lifeline: <a href="tel:988">988</a></p>
          <p class="crisis-line">Crisis Text Line: Text <strong>HELLO</strong> to <strong>741741</strong></p>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .panic-overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: var(--bg-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-lg);
    overflow-y: auto;
  }
  .panic-content {
    width: 100%;
    max-width: var(--content-max-width);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-lg);
    text-align: center;
  }
  .panic-reassure {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.4;
  }
  .phase-display {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--accent);
    display: flex;
    align-items: baseline;
    gap: var(--space-sm);
  }
  .timer {
    font-size: var(--font-size-3xl);
    font-variant-numeric: tabular-nums;
    color: var(--text-primary);
  }
  .cycle-info {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
  }
  .skip-btn {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-full);
    background: var(--bg-secondary);
    margin-top: var(--space-md);
  }
  .skip-btn:hover {
    color: var(--text-primary);
    background: var(--bg-elevated);
  }
  .option-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  .option-btn {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    width: 100%;
    padding: var(--space-md) var(--space-lg);
    border-radius: var(--radius-md);
    background: var(--bg-secondary);
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--text-primary);
    text-align: left;
    transition: background var(--transition-fast);
    min-height: 56px;
  }
  .option-btn:hover {
    background: var(--bg-elevated);
  }
  .option-icon {
    font-size: 1.5rem;
  }
  .crisis-info {
    margin-top: var(--space-xl);
    padding: var(--space-lg);
    border-radius: var(--radius-md);
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    text-align: left;
  }
  .crisis-title {
    font-weight: 700;
    margin-bottom: var(--space-sm);
    color: var(--text-primary);
  }
  .crisis-line {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    line-height: 1.8;
  }
  .crisis-line a {
    color: var(--accent);
    font-weight: 700;
  }
</style>
