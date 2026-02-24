<script>
  import { preferences } from '../../lib/stores/preferences.js';

  function cycle() {
    preferences.update((p) => {
      const order = ['auto', 'dark', 'light'];
      const idx = order.indexOf(p.theme);
      return { ...p, theme: order[(idx + 1) % order.length] };
    });
  }

  const labels = { auto: 'Auto', dark: 'Dark', light: 'Light' };
  const icons = { auto: '◐', dark: '🌙', light: '☀️' };
</script>

<button
  onclick={cycle}
  class="theme-toggle"
  aria-label="Theme: {labels[$preferences.theme]}. Click to change."
  title="Theme: {labels[$preferences.theme]}"
>
  <span class="theme-icon">{icons[$preferences.theme]}</span>
  <span class="theme-label">{labels[$preferences.theme]}</span>
</button>

<style>
  .theme-toggle {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-full);
    background: var(--bg-secondary);
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    transition: background var(--transition-fast);
  }
  .theme-toggle:hover {
    background: var(--bg-elevated);
  }
  .theme-icon {
    font-size: 1rem;
  }
  .theme-label {
    font-weight: 600;
  }
</style>
