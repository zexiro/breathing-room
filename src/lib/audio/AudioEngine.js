import { audioState } from '../stores/audio.js';

let ctx = null;
let masterGain = null;
let nodes = {};

function getContext() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.3;
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function createNoiseBuffer(type = 'white') {
  const ac = getContext();
  const size = ac.sampleRate * 2;
  const buffer = ac.createBuffer(1, size, ac.sampleRate);
  const data = buffer.getChannelData(0);

  if (type === 'white') {
    for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
  } else if (type === 'pink') {
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < size; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
  } else if (type === 'brown') {
    let last = 0;
    for (let i = 0; i < size; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (last + 0.02 * white) / 1.02;
      last = data[i];
      data[i] *= 3.5;
    }
  }

  return buffer;
}

function createRain(gain) {
  const ac = getContext();
  // Base: filtered pink noise
  const noise = ac.createBufferSource();
  noise.buffer = createNoiseBuffer('pink');
  noise.loop = true;
  const hp = ac.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 1000;
  const lp = ac.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 8000;
  noise.connect(hp).connect(lp).connect(gain);
  noise.start();
  return { sources: [noise], filters: [hp, lp] };
}

function createOcean(gain) {
  const ac = getContext();
  const noise = ac.createBufferSource();
  noise.buffer = createNoiseBuffer('brown');
  noise.loop = true;
  // LFO for wave-like volume
  const lfoGain = ac.createGain();
  lfoGain.gain.value = 0.5;
  const lfo = ac.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.1; // slow wave
  lfo.connect(lfoGain.gain);
  lfo.start();
  const lp = ac.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 500;
  noise.connect(lp).connect(lfoGain).connect(gain);
  noise.start();
  return { sources: [noise, lfo], filters: [lp] };
}

function createWind(gain) {
  const ac = getContext();
  const noise = ac.createBufferSource();
  noise.buffer = createNoiseBuffer('white');
  noise.loop = true;
  const bp = ac.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 800;
  bp.Q.value = 0.5;
  // Slow modulation on filter freq
  const lfo = ac.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.07;
  const lfoGain = ac.createGain();
  lfoGain.gain.value = 400;
  lfo.connect(lfoGain).connect(bp.frequency);
  lfo.start();
  noise.connect(bp).connect(gain);
  noise.start();
  return { sources: [noise, lfo], filters: [bp] };
}

function createWhiteNoise(gain) {
  const ac = getContext();
  const noise = ac.createBufferSource();
  noise.buffer = createNoiseBuffer('white');
  noise.loop = true;
  const lp = ac.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 4000;
  noise.connect(lp).connect(gain);
  noise.start();
  return { sources: [noise], filters: [lp] };
}

const CREATORS = { rain: createRain, ocean: createOcean, wind: createWind, white: createWhiteNoise };

export function initAudio() {
  getContext();
  audioState.update((s) => ({ ...s, initialized: true }));
}

export function setSound(name, volume) {
  const ac = getContext();
  const fadeTime = 0.3;

  if (volume > 0 && !nodes[name]) {
    const gain = ac.createGain();
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(volume, ac.currentTime + fadeTime);
    gain.connect(masterGain);
    const soundNodes = CREATORS[name](gain);
    nodes[name] = { gain, ...soundNodes };
  } else if (volume > 0 && nodes[name]) {
    nodes[name].gain.gain.linearRampToValueAtTime(volume, ac.currentTime + fadeTime);
  } else if (volume <= 0 && nodes[name]) {
    const node = nodes[name];
    node.gain.gain.linearRampToValueAtTime(0, ac.currentTime + fadeTime);
    setTimeout(() => {
      node.sources.forEach((s) => { try { s.stop(); } catch {} });
      node.gain.disconnect();
    }, fadeTime * 1000 + 50);
    delete nodes[name];
  }

  audioState.update((s) => ({
    ...s,
    activeSounds: { ...s.activeSounds, [name]: volume },
  }));
}

export function setMasterVolume(vol) {
  if (masterGain) masterGain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.1);
  audioState.update((s) => ({ ...s, masterVolume: vol }));
}

export function stopAll() {
  Object.keys(nodes).forEach((name) => setSound(name, 0));
}

// Handle tab visibility
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (ctx && document.visibilityState === 'visible' && ctx.state === 'suspended') {
      ctx.resume();
    }
  });
}
