<script>
  import BreathingCircle from '../components/breathing/BreathingCircle.svelte';
  import PhaseLabel from '../components/breathing/PhaseLabel.svelte';
  import Controls from '../components/breathing/Controls.svelte';
  import ScreenReaderAnnounce from '../components/shared/ScreenReaderAnnounce.svelte';
  import { breathingState, currentPhase } from '../lib/stores/breathing.js';
  import { setPhaseChangeCallback } from '../lib/breathing/timer.js';

  let announcement = $state('');

  $effect(() => {
    setPhaseChangeCallback((phase) => {
      announcement = phase.label;
    });
    return () => setPhaseChangeCallback(null);
  });
</script>

<div class="view">
  <ScreenReaderAnnounce message={announcement} />

  <div class="breathing-area">
    <BreathingCircle />
    <PhaseLabel />
  </div>

  <Controls />
</div>

<style>
  .view {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-lg);
    padding: var(--space-xl) var(--space-md);
    flex: 1;
  }
  .breathing-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
    flex: 1;
    justify-content: center;
    width: 100%;
  }
</style>
