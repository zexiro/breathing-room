// Gentle audio cues for breathing phases so users can follow eyes-closed.
// Uses soft sine tones — rising for inhale, sustained for hold, descending for exhale.

let ctx = null;

function getContext() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function playTone(startFreq, endFreq, duration, volume = 0.12) {
  const ac = getContext();
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(startFreq, ac.currentTime);
  osc.frequency.linearRampToValueAtTime(endFreq, ac.currentTime + duration);

  // Gentle fade in/out to avoid clicks
  gain.gain.setValueAtTime(0, ac.currentTime);
  gain.gain.linearRampToValueAtTime(volume, ac.currentTime + 0.15);
  gain.gain.setValueAtTime(volume, ac.currentTime + duration - 0.2);
  gain.gain.linearRampToValueAtTime(0, ac.currentTime + duration);

  osc.connect(gain).connect(ac.destination);
  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + duration);
}

export function playPhaseCue(phaseType) {
  switch (phaseType) {
    case 'inhale':
      // Rising tone: gentle ascent
      playTone(220, 330, 0.6, 0.1);
      break;
    case 'hold':
      // Soft sustained ping
      playTone(330, 330, 0.3, 0.07);
      break;
    case 'exhale':
      // Descending tone: gentle release
      playTone(330, 196, 0.8, 0.1);
      break;
  }
}
