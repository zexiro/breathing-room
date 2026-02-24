<script>
  import { audioState } from '../../lib/stores/audio.js';
  import { initAudio, setSound, setMasterVolume } from '../../lib/audio/AudioEngine.js';
  import SoundCard from './SoundCard.svelte';

  const soundscapes = [
    { id: 'rain', name: 'Rain', description: 'Gentle rain shower', icon: '🌧' },
    { id: 'ocean', name: 'Ocean', description: 'Rhythmic ocean waves', icon: '🌊' },
    { id: 'wind', name: 'Wind', description: 'Soft breeze', icon: '🍃' },
    { id: 'white', name: 'White Noise', description: 'Steady hum', icon: '📻' },
  ];

  function ensureAudio() {
    if (!$audioState.initialized) initAudio();
  }

  function handleVolumeChange(id, vol) {
    ensureAudio();
    setSound(id, vol);
  }

  function handleMasterChange(e) {
    ensureAudio();
    setMasterVolume(parseFloat(e.target.value));
  }
</script>

<div class="mixer">
  <div class="master-volume">
    <label for="master-vol" class="master-label">Master Volume</label>
    <input
      id="master-vol"
      type="range"
      min="0"
      max="1"
      step="0.05"
      value={$audioState.masterVolume}
      oninput={handleMasterChange}
      class="slider"
    />
    <span class="vol-value">{Math.round($audioState.masterVolume * 100)}%</span>
  </div>

  <div class="sound-grid">
    {#each soundscapes as sound}
      <SoundCard
        {sound}
        volume={$audioState.activeSounds[sound.id] || 0}
        onchange={(vol) => handleVolumeChange(sound.id, vol)}
      />
    {/each}
  </div>
</div>

<style>
  .mixer {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }
  .master-volume {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md);
    background: var(--bg-secondary);
    border-radius: var(--radius-md);
  }
  .master-label {
    font-weight: 700;
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    white-space: nowrap;
  }
  .slider {
    flex: 1;
    height: 6px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--bg-elevated);
    border-radius: 3px;
    outline: none;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--accent);
    cursor: pointer;
  }
  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--accent);
    cursor: pointer;
    border: none;
  }
  .vol-value {
    font-size: var(--font-size-sm);
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
    min-width: 3ch;
    text-align: right;
  }
  .sound-grid {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
</style>
