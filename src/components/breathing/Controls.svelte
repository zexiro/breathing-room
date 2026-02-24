<script>
  import { breathingState, getPatterns } from '../../lib/stores/breathing.js';
  import { preferences } from '../../lib/stores/preferences.js';
  import * as timer from '../../lib/breathing/timer.js';

  const patterns = Object.values(getPatterns());

  function toggleBreathing() {
    if ($breathingState.isRunning) {
      timer.stop();
    } else {
      timer.start($preferences.breathingPattern);
    }
  }

  function selectPattern(id) {
    preferences.update((p) => ({ ...p, breathingPattern: id }));
    if ($breathingState.isRunning) {
      timer.start(id);
    }
  }
</script>

<div class="controls">
  <button class="start-btn" class:running={$breathingState.isRunning} onclick={toggleBreathing}>
    {$breathingState.isRunning ? 'Stop' : 'Start'}
  </button>

  {#if !$breathingState.isRunning}
    <div class="pattern-selector" role="radiogroup" aria-label="Breathing pattern">
      {#each patterns as pattern}
        {@const selected = $preferences.breathingPattern === pattern.id}
        <button
          class="pattern-btn"
          class:selected
          role="radio"
          aria-checked={selected}
          onclick={() => selectPattern(pattern.id)}
        >
          <span class="pattern-name">{pattern.name}</span>
          <span class="pattern-desc">{pattern.description}</span>
        </button>
      {/each}
    </div>
  {:else}
    <div class="cycle-counter">
      Cycle {$breathingState.cycleCount + 1}
    </div>
  {/if}
</div>

<style>
  .controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-lg);
    width: 100%;
  }
  .start-btn {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    font-size: var(--font-size-xl);
    font-weight: 700;
    background: var(--accent-dim);
    color: var(--accent);
    border: 2px solid var(--accent);
    transition: all var(--transition-normal);
  }
  .start-btn:hover {
    background: var(--accent);
    color: var(--bg-primary);
  }
  .start-btn.running {
    background: transparent;
    border-color: var(--text-muted);
    color: var(--text-muted);
    width: 80px;
    height: 80px;
    font-size: var(--font-size-base);
  }
  .start-btn.running:hover {
    border-color: var(--danger);
    color: var(--danger);
    background: var(--danger-dim);
  }
  .pattern-selector {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    width: 100%;
  }
  .pattern-btn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    padding: var(--space-md);
    border-radius: var(--radius-md);
    background: var(--bg-secondary);
    border: 2px solid transparent;
    text-align: left;
    transition: all var(--transition-fast);
    min-height: 48px;
  }
  .pattern-btn.selected {
    border-color: var(--accent);
    background: var(--accent-dim);
  }
  .pattern-btn:hover {
    background: var(--bg-elevated);
  }
  .pattern-name {
    font-weight: 700;
    color: var(--text-primary);
  }
  .pattern-desc {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
  }
  .cycle-counter {
    color: var(--text-muted);
    font-size: var(--font-size-sm);
    font-weight: 600;
  }
</style>
