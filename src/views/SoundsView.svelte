<script>
  import SoundscapeMixer from '../components/sounds/SoundscapeMixer.svelte';
</script>

<div class="view">
  <h1 class="view-title">Soundscapes</h1>
  <p class="view-subtitle">Generated ambient sounds to help you relax. No downloads needed.</p>
  <SoundscapeMixer />
</div>

<style>
  .view {
    padding: var(--space-xl) var(--space-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    width: 100%;
  }
  .view-title {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--text-primary);
  }
  .view-subtitle {
    color: var(--text-secondary);
    margin-top: calc(var(--space-sm) * -1);
  }
</style>
