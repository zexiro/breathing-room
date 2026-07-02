<script>
  const checkoutUrl = import.meta.env.NEXT_PUBLIC_CHECKOUT_URL || '#waitlist';

  let email = $state('');
  let submitted = $state(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    submitted = true;
  }
</script>

<div class="premium-view">
  <header class="premium-header">
    <a href="#/" class="back-link">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back home
    </a>
    <h1 class="premium-title">Breathing Room Premium</h1>
    <p class="premium-lede">Unlock the full toolkit for calmer days.</p>
  </header>

  <section class="pricing-card">
    <div class="price-row">
      <span class="price-main">$4.99</span>
      <span class="price-period">/month</span>
    </div>
    <p class="price-annual">or $49.99/year <span class="save-badge">save 17%</span></p>
    <p class="trial-note">Start your 7-day free trial. Cancel anytime.</p>

    <a
      href={checkoutUrl}
      target="_blank"
      rel="noopener"
      class="checkout-cta"
    >
      Start your free trial
    </a>
  </section>

  <section class="features-section">
    <h2>What you get with Premium</h2>
    <ul class="features-list">
      <li>
        <strong>Unlimited session customization</strong>
        <span>Create and save any breathing pattern — inhale, hold, and exhale durations tailored to you, beyond the standard presets.</span>
      </li>
      <li>
        <strong>Personal progress tracking</strong>
        <span>Daily streaks, usage history, and mood check-ins stored privately on your device.</span>
      </li>
      <li>
        <strong>Full offline mode</strong>
        <span>Download all audio and session data so Breathing Room works wherever you are — no signal needed.</span>
      </li>
      <li>
        <strong>Ad-free forever</strong>
        <span>A calm, distraction-free experience. Always.</span>
      </li>
    </ul>
  </section>

  <section class="comparison">
    <h2>Free vs Premium</h2>
    <div class="comparison-grid">
      <div class="comp-header"></div>
      <div class="comp-header">Free</div>
      <div class="comp-header comp-premium">Premium</div>

      <div class="comp-row-label">Guided breathing exercises</div>
      <div class="comp-cell">&#10003;</div>
      <div class="comp-cell">&#10003;</div>

      <div class="comp-row-label">Grounding &amp; panic tools</div>
      <div class="comp-cell">&#10003;</div>
      <div class="comp-cell">&#10003;</div>

      <div class="comp-row-label">Ambient soundscape mixer</div>
      <div class="comp-cell">&#10003;</div>
      <div class="comp-cell">&#10003;</div>

      <div class="comp-row-label">Standard breathing presets</div>
      <div class="comp-cell">3</div>
      <div class="comp-cell">Unlimited</div>

      <div class="comp-row-label">Save custom patterns</div>
      <div class="comp-cell">&mdash;</div>
      <div class="comp-cell">&#10003;</div>

      <div class="comp-row-label">Progress tracking &amp; streaks</div>
      <div class="comp-cell">&mdash;</div>
      <div class="comp-cell">&#10003;</div>

      <div class="comp-row-label">Full offline audio</div>
      <div class="comp-cell">&mdash;</div>
      <div class="comp-cell">&#10003;</div>

      <div class="comp-row-label">Ad-free</div>
      <div class="comp-cell">&mdash;</div>
      <div class="comp-cell">&#10003;</div>
    </div>
  </section>

  <section class="waitlist-section" id="waitlist">
    <h2>Not ready yet? Join the waitlist</h2>
    <p class="waitlist-text">
      Get notified about new features and tips. No spam, unsubscribe anytime.
    </p>
    {#if submitted}
      <p class="waitlist-success">Thank you! You're on the list. &#127881;</p>
    {:else}
      <form class="waitlist-form" onsubmit={handleSubmit}>
        <input
          type="email"
          bind:value={email}
          placeholder="you@example.com"
          required
          aria-label="Email address"
          class="waitlist-input"
        />
        <button type="submit" class="waitlist-btn">Join waitlist</button>
      </form>
    {/if}
  </section>

  <div class="bottom-cta">
    <a
      href={checkoutUrl}
      target="_blank"
      rel="noopener"
      class="checkout-cta"
    >
      Start your free trial
    </a>
  </div>
</div>

<style>
  .premium-view {
    max-width: 600px;
    margin: 0 auto;
    padding: var(--space-2xl) var(--space-lg) var(--space-3xl);
    overflow-y: auto;
  }

  /* ── Header ──────────────────────────────────────────── */

  .premium-header {
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

  .premium-title {
    font-family: var(--font-family);
    font-size: var(--font-size-3xl);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--space-sm);
    line-height: 1.2;
  }

  .premium-lede {
    font-size: var(--font-size-lg);
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* ── Pricing Card ────────────────────────────────────── */

  .pricing-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
    text-align: center;
    margin-bottom: var(--space-2xl);
  }

  .price-row {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: var(--space-xs);
    margin-bottom: var(--space-sm);
  }

  .price-main {
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--accent);
    line-height: 1;
  }

  .price-period {
    font-size: var(--font-size-lg);
    color: var(--text-secondary);
  }

  .price-annual {
    font-size: var(--font-size-base);
    color: var(--text-secondary);
    margin-bottom: var(--space-sm);
  }

  .save-badge {
    display: inline-block;
    background: var(--accent-dim);
    color: var(--accent);
    font-size: var(--font-size-sm);
    font-weight: 600;
    padding: 2px var(--space-sm);
    border-radius: var(--radius-full);
    margin-left: var(--space-xs);
  }

  .trial-note {
    font-size: var(--font-size-sm);
    color: var(--text-muted);
    margin-bottom: var(--space-lg);
  }

  /* ── Checkout CTA ────────────────────────────────────── */

  .checkout-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-2xl);
    border-radius: var(--radius-full);
    font-size: var(--font-size-base);
    font-weight: 700;
    font-family: var(--font-family);
    background: var(--accent);
    color: var(--bg-primary);
    text-decoration: none;
    transition: all var(--transition-normal);
    width: 100%;
    max-width: 320px;
  }

  .checkout-cta:hover {
    transform: translateY(-1px);
    opacity: 0.92;
  }

  /* ── Features ────────────────────────────────────────── */

  .features-section {
    margin-bottom: var(--space-2xl);
  }

  .features-section h2 {
    font-family: var(--font-family);
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--space-md);
  }

  .features-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .features-list li {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding: var(--space-md);
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }

  .features-list li strong {
    color: var(--text-primary);
    font-size: var(--font-size-base);
  }

  .features-list li span {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    line-height: 1.6;
  }

  /* ── Comparison ──────────────────────────────────────── */

  .comparison {
    margin-bottom: var(--space-2xl);
  }

  .comparison h2 {
    font-family: var(--font-family);
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--space-md);
  }

  .comparison-grid {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .comp-header {
    padding: var(--space-sm) var(--space-md);
    font-weight: 700;
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    background: var(--bg-secondary);
    text-align: center;
    border-bottom: 1px solid var(--border);
  }

  .comp-header:first-child {
    text-align: left;
  }

  .comp-premium {
    color: var(--accent);
  }

  .comp-row-label {
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    border-bottom: 1px solid var(--border);
  }

  .comp-cell {
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-size-sm);
    color: var(--text-primary);
    text-align: center;
    border-bottom: 1px solid var(--border);
    border-left: 1px solid var(--border);
  }

  .comparison-grid > *:last-child,
  .comparison-grid > *:nth-last-child(2),
  .comparison-grid > *:nth-last-child(3) {
    border-bottom: none;
  }

  /* ── Waitlist ────────────────────────────────────────── */

  .waitlist-section {
    margin-bottom: var(--space-2xl);
    text-align: center;
    padding: var(--space-xl);
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }

  .waitlist-section h2 {
    font-family: var(--font-family);
    font-size: var(--font-size-lg);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--space-sm);
  }

  .waitlist-text {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    margin-bottom: var(--space-md);
  }

  .waitlist-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    max-width: 360px;
    margin: 0 auto;
  }

  .waitlist-input {
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-full);
    border: 1px solid var(--border);
    background: var(--bg-primary);
    color: var(--text-primary);
    font-family: var(--font-family);
    font-size: var(--font-size-sm);
    outline: none;
    transition: border-color var(--transition-fast);
  }

  .waitlist-input:focus {
    border-color: var(--accent);
  }

  .waitlist-btn {
    padding: var(--space-sm) var(--space-lg);
    border-radius: var(--radius-full);
    background: var(--bg-elevated);
    color: var(--text-primary);
    font-family: var(--font-family);
    font-size: var(--font-size-sm);
    font-weight: 600;
    transition: all var(--transition-fast);
  }

  .waitlist-btn:hover {
    background: var(--accent-dim);
    color: var(--accent);
  }

  .waitlist-success {
    color: var(--accent);
    font-weight: 600;
    font-size: var(--font-size-base);
  }

  /* ── Bottom CTA ──────────────────────────────────────── */

  .bottom-cta {
    text-align: center;
    padding-top: var(--space-md);
  }

  /* ── Responsive ──────────────────────────────────────── */

  @media (max-width: 640px) {
    .premium-view {
      padding: var(--space-xl) var(--space-md) var(--space-2xl);
    }

    .premium-title {
      font-size: var(--font-size-2xl);
    }

    .price-main {
      font-size: 2.75rem;
    }

    .comp-header,
    .comp-row-label,
    .comp-cell {
      padding: var(--space-xs) var(--space-sm);
    }
  }
</style>
