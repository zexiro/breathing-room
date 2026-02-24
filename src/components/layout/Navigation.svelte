<script>
  let { currentRoute = '/' } = $props();

  const navItems = [
    { href: '#/', label: 'Breathe', icon: 'breathe' },
    { href: '#/ground', label: 'Ground', icon: 'ground' },
    { href: '#/sounds', label: 'Sounds', icon: 'sounds' },
    { href: '#/panic', label: 'Panic', icon: 'panic' },
  ];
</script>

<nav class="nav" aria-label="Main navigation">
  {#each navItems as item}
    {@const active = (item.href === '#/' && (currentRoute === '/' || currentRoute === ''))
      || (item.href !== '#/' && currentRoute === item.href.slice(1))}
    <a
      href={item.href}
      class="nav-item"
      class:active
      aria-current={active ? 'page' : undefined}
    >
      <span class="nav-icon" aria-hidden="true">
        {#if item.icon === 'breathe'}
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="8"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        {:else if item.icon === 'ground'}
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2v10M5 12l7 10 7-10"/>
          </svg>
        {:else if item.icon === 'sounds'}
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
          </svg>
        {:else if item.icon === 'panic'}
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 9v4M12 17h.01"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        {/if}
      </span>
      <span class="nav-label">{item.label}</span>
    </a>
  {/each}
</nav>

<style>
  .nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--nav-height);
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: var(--bg-secondary);
    border-top: 1px solid var(--border);
    padding-bottom: env(safe-area-inset-bottom, 0);
    z-index: 10;
  }
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: var(--space-xs) var(--space-md);
    border-radius: var(--radius-md);
    color: var(--text-muted);
    text-decoration: none;
    font-size: var(--font-size-sm);
    transition: color var(--transition-fast);
    min-width: 64px;
    min-height: 48px;
    justify-content: center;
  }
  .nav-item.active {
    color: var(--accent);
  }
  .nav-item:hover {
    color: var(--text-primary);
  }
  .nav-label {
    font-weight: 600;
    font-size: 0.75rem;
  }
</style>
