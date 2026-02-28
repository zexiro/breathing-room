import { mount } from 'svelte';
import { inject } from '@vercel/analytics';
import App from './App.svelte';

// Initialize Vercel Analytics
inject();

const app = mount(App, { target: document.getElementById('app') });

// Register PWA service worker
if ('serviceWorker' in navigator) {
  import('virtual:pwa-register').then(({ registerSW }) => {
    registerSW({ immediate: true });
  }).catch(() => {
    // PWA registration not available in dev mode
  });
}

export default app;
