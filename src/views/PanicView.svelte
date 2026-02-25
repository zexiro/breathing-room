<script>
  import PanicButton from '../components/panic/PanicButton.svelte';
  import PanicFlow from '../components/panic/PanicFlow.svelte';

  let showFlow = $state(false);

  function startPanic() {
    showFlow = true;
  }

  function closePanic() {
    showFlow = false;
  }
</script>

{#if showFlow}
  <PanicFlow onclose={closePanic} />
{:else}
  <div class="view">
    <div class="panic-header">
      <h1 class="view-title">Emergency Help</h1>
      <p class="view-subtitle">If you're having a panic attack or intense anxiety, tap the button below.</p>
    </div>

    <PanicButton onclick={startPanic} />

    <div class="crisis-section">
      <h2 class="crisis-heading">Crisis Resources</h2>
      <div class="crisis-card">
        <p class="crisis-line"><strong>Samaritans</strong></p>
        <p class="crisis-detail">Call free, 24/7: <a href="tel:116123">116 123</a></p>
      </div>
      <div class="crisis-card">
        <p class="crisis-line"><strong>Shout</strong></p>
        <p class="crisis-detail">Text <strong>SHOUT</strong> to <strong>85258</strong> — free, 24/7</p>
      </div>
      <div class="crisis-card">
        <p class="crisis-line"><strong>NHS Urgent Mental Health Help</strong></p>
        <p class="crisis-detail">Call <a href="tel:111">111</a> and select the mental health option</p>
      </div>
      <div class="crisis-card">
        <p class="crisis-line"><strong>CALM</strong></p>
        <p class="crisis-detail">Call <a href="tel:0800585858">0800 58 58 58</a> — 5pm to midnight, every day</p>
      </div>
    </div>
  </div>
{/if}

<style>
  .view {
    padding: var(--space-xl) var(--space-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
    width: 100%;
  }
  .panic-header {
    text-align: center;
  }
  .view-title {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--space-sm);
  }
  .view-subtitle {
    color: var(--text-secondary);
  }
  .crisis-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  .crisis-heading {
    font-size: var(--font-size-lg);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--space-xs);
  }
  .crisis-card {
    padding: var(--space-md);
    background: var(--bg-secondary);
    border-radius: var(--radius-md);
  }
  .crisis-line {
    color: var(--text-primary);
    font-size: var(--font-size-base);
  }
  .crisis-detail {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin-top: 2px;
  }
  .crisis-detail a {
    color: var(--accent);
  }
</style>
