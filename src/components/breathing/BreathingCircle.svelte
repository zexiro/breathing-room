<script>
  import { breathingState, currentPhase } from '../../lib/stores/breathing.js';
  import { getPatterns } from '../../lib/stores/breathing.js';

  let reducedMotion = $state(false);

  $effect(() => {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  let scale = $derived.by(() => {
    if (!$breathingState.isRunning || !$currentPhase) return 0.5;
    const pattern = getPatterns()[$breathingState.patternId];
    if (!pattern) return 0.5;
    const phase = pattern.phases[$breathingState.phaseIndex];
    const progress = Math.min($breathingState.elapsed / phase.duration, 1);

    if (phase.type === 'inhale') return 0.5 + 0.5 * progress;
    if (phase.type === 'exhale') return 1.0 - 0.5 * progress;
    // hold — stay at current
    const prevIdx = ($breathingState.phaseIndex - 1 + pattern.phases.length) % pattern.phases.length;
    return pattern.phases[prevIdx].type === 'inhale' ? 1.0 : 0.5;
  });

  let progressPercent = $derived.by(() => {
    if (!$breathingState.isRunning || !$currentPhase) return 0;
    return Math.min(($breathingState.elapsed / $currentPhase.duration) * 100, 100);
  });
</script>

<div class="circle-container" role="img" aria-label="Breathing guide circle">
  {#if reducedMotion}
    <!-- Reduced motion: progress bar instead of animated circle -->
    <div class="progress-bar-container">
      <div class="progress-label">{$currentPhase?.label || 'Ready'}</div>
      <div class="progress-track">
        <div class="progress-fill" style="width: {progressPercent}%"></div>
      </div>
      <div class="progress-time">
        {$currentPhase ? `${Math.ceil($currentPhase.duration - $breathingState.elapsed)}s` : ''}
      </div>
    </div>
  {:else}
    <div class="circle-outer">
      <div class="circle-glow" style="transform: scale({scale}); opacity: {scale * 0.4}"></div>
      <div class="circle-main" style="transform: scale({scale})"></div>
      <div class="circle-inner" style="transform: scale({scale * 0.4 + 0.3})"></div>
    </div>
  {/if}
</div>

<style>
  .circle-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1;
    max-width: 320px;
    margin: 0 auto;
  }
  .circle-outer {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .circle-glow {
    position: absolute;
    width: 85%;
    height: 85%;
    border-radius: 50%;
    background: var(--accent-glow);
    transition: transform 0.15s linear, opacity 0.15s linear;
    will-change: transform, opacity;
  }
  .circle-main {
    position: absolute;
    width: 70%;
    height: 70%;
    border-radius: 50%;
    border: 3px solid var(--accent);
    background: var(--accent-dim);
    transition: transform 0.15s linear;
    will-change: transform;
  }
  .circle-inner {
    position: absolute;
    width: 20%;
    height: 20%;
    border-radius: 50%;
    background: var(--accent);
    opacity: 0.6;
    transition: transform 0.15s linear;
    will-change: transform;
  }

  /* Reduced motion alternative */
  .progress-bar-container {
    width: 100%;
    padding: var(--space-xl);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
  }
  .progress-label {
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--accent);
  }
  .progress-track {
    width: 100%;
    height: 12px;
    border-radius: var(--radius-full);
    background: var(--bg-elevated);
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    border-radius: var(--radius-full);
    background: var(--accent);
    transition: width 0.1s linear;
  }
  .progress-time {
    font-size: var(--font-size-lg);
    color: var(--text-secondary);
    font-weight: 600;
  }
</style>
