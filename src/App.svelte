<script>
  import './styles/global.css';
  import { preferences } from './lib/stores/preferences.js';
  import Header from './components/layout/Header.svelte';
  import Navigation from './components/layout/Navigation.svelte';
  import HomeView from './views/HomeView.svelte';
  import GroundView from './views/GroundView.svelte';
  import SoundsView from './views/SoundsView.svelte';
  import PanicView from './views/PanicView.svelte';

  let route = $state(window.location.hash.slice(1) || '/');

  function handleHashChange() {
    route = window.location.hash.slice(1) || '/';
  }

  // Theme application
  $effect(() => {
    const theme = $preferences.theme;
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  });

  // Listen to system theme changes when in auto mode
  $effect(() => {
    if ($preferences.theme !== 'auto') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  });
</script>

<svelte:window onhashchange={handleHashChange} />

<div class="app">
  <Header />
  <main class="main-content">
    <div class="content-wrapper">
      {#if route === '/' || route === ''}
        <HomeView />
      {:else if route === '/ground'}
        <GroundView />
      {:else if route === '/sounds'}
        <SoundsView />
      {:else if route === '/panic'}
        <PanicView />
      {:else}
        <HomeView />
      {/if}
    </div>
  </main>
  <Navigation currentRoute={route} />
  <footer class="codehawks-footer">
    A <a href="https://www.codehawks.co.uk" target="_blank" rel="noopener noreferrer">CodeHawks</a> project
  </footer>
</div>

<style>
  .app {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: var(--nav-height);
  }
  .content-wrapper {
    width: 100%;
    max-width: var(--content-max-width);
    margin: 0 auto;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .codehawks-footer {
    text-align: center;
    padding: 0.75rem;
    font-size: 0.7rem;
    color: var(--text-muted);
    font-family: var(--font-family);
  }
  .codehawks-footer a {
    color: var(--text-secondary);
    text-decoration: none;
  }
  .codehawks-footer a:hover {
    text-decoration: underline;
  }
</style>
