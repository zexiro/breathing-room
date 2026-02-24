<script>
  import Wizard from '../components/grounding/Wizard.svelte';
</script>

<div class="view">
  <h1 class="view-title">Grounding</h1>
  <p class="view-subtitle">The 5-4-3-2-1 technique brings you back to the present moment.</p>
  <Wizard />
</div>

<style>
  .view {
    padding: var(--space-xl) var(--space-md);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .view-title {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--space-sm);
  }
  .view-subtitle {
    color: var(--text-secondary);
    text-align: center;
    max-width: 320px;
    margin-bottom: var(--space-lg);
  }
</style>
