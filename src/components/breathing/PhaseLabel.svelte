<script>
  import { currentPhase, breathingState } from '../../lib/stores/breathing.js';

  let displayLabel = $state('');
  let timeLeft = $derived.by(() => {
    if (!$currentPhase) return '';
    return Math.ceil($currentPhase.duration - $breathingState.elapsed);
  });

  $effect(() => {
    if ($currentPhase) {
      displayLabel = $currentPhase.label;
    } else if (!$breathingState.isRunning) {
      displayLabel = '';
    }
  });
</script>

<div class="phase-label-container">
  {#if $breathingState.isRunning && $currentPhase}
    <p class="phase-text" aria-hidden="true">{displayLabel}</p>
    <p class="phase-timer" aria-hidden="true">{timeLeft}</p>
  {:else}
    <p class="phase-text idle">Press start to begin</p>
  {/if}
</div>

<style>
  .phase-label-container {
    text-align: center;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
  }
  .phase-text {
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.02em;
  }
  .phase-text.idle {
    color: var(--text-muted);
    font-size: var(--font-size-lg);
    font-weight: 400;
  }
  .phase-timer {
    font-size: var(--font-size-3xl);
    font-weight: 700;
    color: var(--text-primary);
    font-variant-numeric: tabular-nums;
  }
</style>
