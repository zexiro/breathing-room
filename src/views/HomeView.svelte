<script>
  import BreathingCircle from '../components/breathing/BreathingCircle.svelte';
  import PhaseLabel from '../components/breathing/PhaseLabel.svelte';
  import Controls from '../components/breathing/Controls.svelte';
  import ScreenReaderAnnounce from '../components/shared/ScreenReaderAnnounce.svelte';
  import { breathingState, currentPhase } from '../lib/stores/breathing.js';
  import { preferences } from '../lib/stores/preferences.js';
  import { setPhaseChangeCallback } from '../lib/breathing/timer.js';
  import { playPhaseCue } from '../lib/audio/breathingCues.js';

  let announcement = $state('');

  $effect(() => {
    setPhaseChangeCallback((phase) => {
      announcement = phase.label;
      if ($preferences.breathingCues) {
        playPhaseCue(phase.type);
      }
    });
    return () => setPhaseChangeCallback(null);
  });
</script>

<div class="view">
  <ScreenReaderAnnounce message={announcement} />

  <div class="breathing-area">
    <BreathingCircle />
    <PhaseLabel />
  </div>

  <Controls />

  <a href="#/premium" class="premium-banner">
    <span class="banner-icon" aria-hidden="true">&#10024;</span>
    <span class="banner-text">
      <strong>Premium</strong> — Unlimited patterns, progress tracking &amp; offline audio
    </span>
    <span class="banner-arrow" aria-hidden="true">&rsaquo;</span>
  </a>
</div>

<style>
  .view {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-lg);
    padding: var(--space-xl) var(--space-md);
    flex: 1;
  }
  .breathing-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
    flex: 1;
    justify-content: center;
    width: 100%;
  }

  .premium-banner {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    background: var(--accent-dim);
    border: 1px solid var(--border);
    border-radius: var(--radius-full);
    color: var(--text-secondary);
    text-decoration: none;
    font-size: var(--font-size-sm);
    transition: all var(--transition-fast);
  }

  .premium-banner:hover {
    border-color: var(--accent);
    opacity: 0.95;
  }

  .banner-icon {
    font-size: 1rem;
  }

  .banner-text {
    flex: 1;
    line-height: 1.4;
  }

  .banner-text strong {
    color: var(--accent);
  }

  .banner-arrow {
    font-size: var(--font-size-lg);
    color: var(--text-muted);
  }
</style>
