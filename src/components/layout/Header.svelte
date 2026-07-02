<script>
  import ThemeToggle from './ThemeToggle.svelte';
</script>

<header class="header">
  <div class="header-inner">
    <a href="#/" class="logo" aria-label="Breathing Room home">
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <circle cx="16" cy="16" r="13" fill="none" stroke="var(--accent)" stroke-width="2"/>
        <circle cx="16" cy="16" r="5" fill="var(--accent)" opacity="0.7"/>
      </svg>
      <span>Breathing Room</span>
    </a>
    <div class="header-actions">
      <a href="#/premium" class="premium-link">Premium</a>
      <ThemeToggle />
    </div>
  </div>
</header>

<style>
  .header {
    height: var(--header-height);
    display: flex;
    align-items: center;
    padding: 0 var(--space-md);
    border-bottom: 1px solid var(--border);
    background: var(--bg-primary);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .header-inner {
    width: 100%;
    max-width: var(--content-max-width);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-weight: 700;
    font-size: var(--font-size-base);
    color: var(--text-primary);
    text-decoration: none;
  }
  .header-actions {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }
  .premium-link {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--accent);
    text-decoration: none;
    padding: var(--space-xs) var(--space-md);
    border-radius: var(--radius-full);
    border: 1px solid var(--accent);
    transition: all var(--transition-fast);
  }
  .premium-link:hover {
    background: var(--accent-dim);
  }
</style>
