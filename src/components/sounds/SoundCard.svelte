<script>
  let { sound, volume = 0, onchange } = $props();

  let active = $derived(volume > 0);

  function toggle() {
    onchange(active ? 0 : 0.5);
  }

  function handleSlider(e) {
    onchange(parseFloat(e.target.value));
  }
</script>

<div class="card" class:active>
  <button class="card-toggle" onclick={toggle} aria-label="{sound.name}: {active ? 'on' : 'off'}">
    <span class="card-icon">{sound.icon}</span>
    <div class="card-info">
      <span class="card-name">{sound.name}</span>
      <span class="card-desc">{sound.description}</span>
    </div>
    <span class="card-status" aria-hidden="true">{active ? '●' : '○'}</span>
  </button>

  {#if active}
    <div class="card-slider">
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        oninput={handleSlider}
        aria-label="{sound.name} volume"
        class="slider"
      />
      <span class="vol-label">{Math.round(volume * 100)}%</span>
    </div>
  {/if}
</div>

<style>
  .card {
    border-radius: var(--radius-md);
    background: var(--bg-secondary);
    border: 2px solid transparent;
    transition: all var(--transition-fast);
    overflow: hidden;
  }
  .card.active {
    border-color: var(--accent);
    background: var(--accent-dim);
  }
  .card-toggle {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    width: 100%;
    padding: var(--space-md);
    text-align: left;
    min-height: 56px;
  }
  .card-icon {
    font-size: 1.5rem;
  }
  .card-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .card-name {
    font-weight: 700;
    color: var(--text-primary);
  }
  .card-desc {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
  }
  .card-status {
    color: var(--accent);
    font-size: 0.75rem;
  }
  .card-slider {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: 0 var(--space-md) var(--space-md);
  }
  .slider {
    flex: 1;
    height: 6px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--bg-elevated);
    border-radius: 3px;
    outline: none;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--accent);
    cursor: pointer;
  }
  .slider::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--accent);
    cursor: pointer;
    border: none;
  }
  .vol-label {
    font-size: var(--font-size-sm);
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
    min-width: 3ch;
  }
</style>
