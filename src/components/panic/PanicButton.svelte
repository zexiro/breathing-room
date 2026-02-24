<script>
  let { onclick } = $props();
</script>

<button class="panic-btn" onclick={onclick}>
  <span class="panic-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 8v4M12 16h.01"/>
    </svg>
  </span>
  <span class="panic-text">I'm panicking</span>
  <span class="panic-sub">Tap for instant help</span>
</button>

<style>
  .panic-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    width: 100%;
    padding: var(--space-xl) var(--space-lg);
    border-radius: var(--radius-lg);
    background: var(--danger-dim);
    border: 2px solid var(--danger);
    color: var(--danger);
    transition: all var(--transition-normal);
    min-height: 120px;
  }
  .panic-btn:hover {
    background: var(--danger);
    color: white;
    transform: scale(1.02);
  }
  .panic-text {
    font-size: var(--font-size-xl);
    font-weight: 700;
  }
  .panic-sub {
    font-size: var(--font-size-sm);
    opacity: 0.8;
  }
</style>
