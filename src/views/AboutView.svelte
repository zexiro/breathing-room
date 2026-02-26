<div class="about-view">
  <header class="about-header">
    <a href="#/" class="back-link">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back home
    </a>
    <h1 class="about-title">About Breathing Room</h1>
    <p class="about-lede">Free, instant breathing and grounding exercises for anxiety relief</p>
  </header>

  <section class="about-section">
    <h2>What is Breathing Room?</h2>
    <p>
      Breathing Room is a free, instant-access toolkit for managing anxiety in the moment.
      It offers guided breathing exercises, grounding techniques, ambient sounds, and a
      panic button — all designed to help you calm down quickly when stress or anxiety hits.
    </p>
    <p>
      No signup, no download required. Open it in your browser and start feeling better
      right away. It works offline too, so it's always there when you need it.
    </p>
  </section>

  <section class="about-section">
    <h2>How it works</h2>
    <p>Breathing Room gives you four main tools, each designed for a different need:</p>
    <ul class="tools-list">
      <li>
        <strong>Breathe</strong> — Follow a guided breathing animation with customizable
        inhale, hold, and exhale durations. Choose from preset patterns like 4-7-8 or
        box breathing, or create your own.
      </li>
      <li>
        <strong>Ground</strong> — A guided 5-4-3-2-1 grounding exercise that walks you
        through engaging each of your five senses to anchor yourself in the present moment.
      </li>
      <li>
        <strong>Sounds</strong> — An ambient sound generator with layerable soundscapes.
        Mix rain, ocean waves, wind, and other calming sounds to create your perfect
        background atmosphere.
      </li>
      <li>
        <strong>Panic Button</strong> — When anxiety spikes, hit the panic button for
        immediate, simple guidance to help you through the worst of it. No thinking
        required — just follow along.
      </li>
    </ul>
  </section>

  <section class="about-section">
    <h2>Features</h2>
    <ul class="features-list">
      <li>Customizable breathing patterns with adjustable timing</li>
      <li>5-4-3-2-1 sensory grounding technique</li>
      <li>Ambient sound generator with multiple layerable sounds</li>
      <li>One-tap panic button for acute anxiety moments</li>
      <li>Offline PWA support — works without an internet connection</li>
      <li>Dark and light theme support</li>
      <li>No account, no tracking, completely private</li>
    </ul>
  </section>

  <section class="about-section">
    <h2>Built at Claude's Corner</h2>
    <p>
      Breathing Room is part of
      <a href="https://claudescorner.dev" target="_blank" rel="noopener noreferrer">Claude's Corner</a>,
      a collection of small, useful web projects. It was designed and built with the help of
      <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">Claude</a>,
      Anthropic's AI assistant.
    </p>
    <p>
      The source code is available on
      <a href="https://github.com/zexiro/breathing-room" target="_blank" rel="noopener noreferrer">GitHub</a>.
    </p>
  </section>

  <div class="about-cta">
    <a href="#/" class="cta-button">Start breathing</a>
  </div>
</div>

<style>
  .about-view {
    max-width: 600px;
    margin: 0 auto;
    padding: var(--space-2xl) var(--space-lg) var(--space-3xl);
    overflow-y: auto;
  }

  /* ── Header ──────────────────────────────────────────── */

  .about-header {
    margin-bottom: var(--space-2xl);
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    font-size: var(--font-size-sm);
    color: var(--text-muted);
    text-decoration: none;
    margin-bottom: var(--space-xl);
    transition: color var(--transition-fast);
  }

  .back-link:hover {
    color: var(--text-primary);
  }

  .about-title {
    font-family: var(--font-family);
    font-size: var(--font-size-3xl);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--space-sm);
    line-height: 1.2;
  }

  .about-lede {
    font-size: var(--font-size-lg);
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* ── Sections ────────────────────────────────────────── */

  .about-section {
    margin-bottom: var(--space-2xl);
  }

  .about-section h2 {
    font-family: var(--font-family);
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--space-sm);
  }

  .about-section p {
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: var(--space-sm);
  }

  .about-section p:last-child {
    margin-bottom: 0;
  }

  .about-section a {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .about-section a:hover {
    opacity: 0.8;
  }

  /* ── Lists ───────────────────────────────────────────── */

  .tools-list,
  .features-list {
    list-style: none;
    padding: 0;
    margin-top: var(--space-md);
  }

  .tools-list li {
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: var(--space-md);
    padding-left: var(--space-lg);
    position: relative;
  }

  .tools-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.6em;
    width: 8px;
    height: 8px;
    border-radius: var(--radius-full);
    background: var(--accent);
  }

  .tools-list li strong {
    color: var(--text-primary);
  }

  .features-list li {
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: var(--space-sm);
    padding-left: var(--space-lg);
    position: relative;
  }

  .features-list li::before {
    content: '';
    position: absolute;
    left: 2px;
    top: 0.65em;
    width: 6px;
    height: 6px;
    border-radius: var(--radius-full);
    background: var(--accent);
    opacity: 0.6;
  }

  /* ── CTA ─────────────────────────────────────────────── */

  .about-cta {
    text-align: center;
    padding-top: var(--space-md);
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-xl);
    border-radius: var(--radius-full);
    font-size: var(--font-size-base);
    font-weight: 600;
    font-family: var(--font-family);
    background: var(--accent);
    color: var(--bg-primary);
    text-decoration: none;
    transition: all var(--transition-normal);
  }

  .cta-button:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }

  /* ── Responsive ──────────────────────────────────────── */

  @media (max-width: 640px) {
    .about-view {
      padding: var(--space-xl) var(--space-md) var(--space-2xl);
    }

    .about-title {
      font-size: var(--font-size-2xl);
    }
  }
</style>
