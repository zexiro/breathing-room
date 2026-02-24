<script>
  import { groundingSteps } from '../../lib/grounding/steps.js';
  import ScreenReaderAnnounce from '../shared/ScreenReaderAnnounce.svelte';

  let currentStep = $state(0);
  let complete = $state(false);
  let announcement = $state('');

  $effect(() => {
    if (!complete) {
      const step = groundingSteps[currentStep];
      announcement = `Step ${currentStep + 1} of 5. ${step.prompt}`;
    }
  });

  function next() {
    if (currentStep < groundingSteps.length - 1) {
      currentStep++;
    } else {
      complete = true;
      announcement = 'Exercise complete. Well done.';
    }
  }

  function prev() {
    if (currentStep > 0) currentStep--;
  }

  function restart() {
    currentStep = 0;
    complete = false;
  }

  const step = $derived(groundingSteps[currentStep]);
</script>

<ScreenReaderAnnounce message={announcement} />

{#if !complete}
  <div class="wizard">
    <div class="step-indicator">
      {#each groundingSteps as s, i}
        <div
          class="step-dot"
          class:active={i === currentStep}
          class:done={i < currentStep}
          aria-hidden="true"
        ></div>
      {/each}
    </div>

    <div class="step-content">
      <span class="step-icon">{step.icon}</span>
      <p class="step-count">{step.count} thing{step.count > 1 ? 's' : ''} you can {step.sense}</p>
      <h2 class="step-prompt">{step.prompt}</h2>
      <p class="step-detail">{step.detail}</p>
    </div>

    <div class="step-actions">
      {#if currentStep > 0}
        <button class="btn-secondary" onclick={prev}>Back</button>
      {/if}
      <button class="btn-primary" onclick={next}>
        {currentStep < groundingSteps.length - 1 ? 'Next' : 'Finish'}
      </button>
    </div>
  </div>
{:else}
  <div class="complete">
    <span class="complete-icon">🌟</span>
    <h2 class="complete-title">Well done</h2>
    <p class="complete-text">
      You just grounded yourself in the present moment.
      Take a few slow breaths and notice how you feel.
    </p>
    <div class="complete-actions">
      <button class="btn-primary" onclick={restart}>Do it again</button>
      <a href="#/" class="btn-secondary">Back to breathing</a>
    </div>
  </div>
{/if}

<style>
  .wizard, .complete {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xl);
    text-align: center;
    padding: var(--space-xl) 0;
  }
  .step-indicator {
    display: flex;
    gap: var(--space-sm);
  }
  .step-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--bg-elevated);
    transition: all var(--transition-fast);
  }
  .step-dot.active {
    background: var(--accent);
    transform: scale(1.3);
  }
  .step-dot.done {
    background: var(--accent);
    opacity: 0.5;
  }
  .step-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
  }
  .step-icon {
    font-size: 3rem;
  }
  .step-count {
    font-size: var(--font-size-sm);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
  }
  .step-prompt {
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.3;
  }
  .step-detail {
    color: var(--text-secondary);
    font-size: var(--font-size-base);
    max-width: 300px;
  }
  .step-actions, .complete-actions {
    display: flex;
    gap: var(--space-md);
  }
  .btn-primary {
    padding: var(--space-md) var(--space-xl);
    border-radius: var(--radius-full);
    background: var(--accent);
    color: var(--bg-primary);
    font-weight: 700;
    font-size: var(--font-size-base);
    min-height: 48px;
    min-width: 120px;
    transition: opacity var(--transition-fast);
  }
  .btn-primary:hover { opacity: 0.85; }
  .btn-secondary {
    padding: var(--space-md) var(--space-xl);
    border-radius: var(--radius-full);
    background: var(--bg-secondary);
    color: var(--text-primary);
    font-weight: 600;
    font-size: var(--font-size-base);
    min-height: 48px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background var(--transition-fast);
  }
  .btn-secondary:hover { background: var(--bg-elevated); }
  .complete-icon { font-size: 4rem; }
  .complete-title {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--accent);
  }
  .complete-text {
    color: var(--text-secondary);
    max-width: 300px;
    line-height: 1.6;
  }
</style>
