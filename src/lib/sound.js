const PROFILES = {
  tactile: {
    bodyFrequency: 92,
    bodyEndFrequency: 54,
    bodyDuration: 0.13,
    noiseFrequency: 780,
    noiseDuration: 0.045,
    clickFrequency: 0,
  },
  linear: {
    bodyFrequency: 118,
    bodyEndFrequency: 72,
    bodyDuration: 0.095,
    noiseFrequency: 520,
    noiseDuration: 0.03,
    clickFrequency: 0,
  },
  clicky: {
    bodyFrequency: 104,
    bodyEndFrequency: 62,
    bodyDuration: 0.11,
    noiseFrequency: 1100,
    noiseDuration: 0.055,
    clickFrequency: 2150,
  },
};

let audioContext;
let noiseBuffer;
let enabled = true;
let activeProfile = "tactile";

function getContext() {
  if (audioContext) return audioContext;
  const AudioContextClass = window.AudioContext;
  if (!AudioContextClass) return null;
  audioContext = new AudioContextClass();
  return audioContext;
}

function getNoiseBuffer(context) {
  if (noiseBuffer) return noiseBuffer;
  const length = Math.floor(context.sampleRate * 0.08);
  noiseBuffer = context.createBuffer(1, length, context.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    const envelope = 1 - i / length;
    data[i] = (Math.random() * 2 - 1) * envelope;
  }
  return noiseBuffer;
}

function connectBody(context, config, now, output) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(config.bodyFrequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(
    config.bodyEndFrequency,
    now + config.bodyDuration,
  );
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.42, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + config.bodyDuration);
  oscillator.connect(gain).connect(output);
  oscillator.start(now);
  oscillator.stop(now + config.bodyDuration + 0.01);
}

function connectNoise(context, config, now, output) {
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = getNoiseBuffer(context);
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(config.noiseFrequency, now);
  filter.Q.setValueAtTime(0.75, now);
  gain.gain.setValueAtTime(0.22, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + config.noiseDuration);
  source.connect(filter).connect(gain).connect(output);
  source.start(now);
  source.stop(now + config.noiseDuration + 0.01);
}

function connectClick(context, config, now, output) {
  if (!config.clickFrequency) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(config.clickFrequency, now);
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);
  oscillator.connect(gain).connect(output);
  oscillator.start(now);
  oscillator.stop(now + 0.022);
}

function renderKeySound(context, profile) {
  const config = PROFILES[profile] || PROFILES.tactile;
  const now = context.currentTime;
  const output = context.createGain();
  const compressor = context.createDynamicsCompressor();
  output.gain.setValueAtTime(0.48, now);
  compressor.threshold.setValueAtTime(-18, now);
  compressor.ratio.setValueAtTime(5, now);
  output.connect(compressor).connect(context.destination);

  connectBody(context, config, now, output);
  connectNoise(context, config, now, output);
  connectClick(context, config, now, output);
}

export function playKey(profile = activeProfile) {
  if (!enabled) return;
  const context = getContext();
  if (!context || context.state === "closed") return;

  if (context.state === "suspended") {
    if (navigator.userActivation && !navigator.userActivation.isActive) return;
    context
      .resume()
      .then(() => {
        if (context.state === "running") renderKeySound(context, profile);
      })
      .catch(() => {
        // Autoplay policies can reject synthetic or untrusted interactions.
      });
    return;
  }

  renderKeySound(context, profile);
}

export function unlockSound() {
  if (!enabled) return Promise.resolve(null);
  const context = getContext();
  if (!context || context.state === "closed") return Promise.resolve(null);
  if (context.state === "suspended" && navigator.userActivation?.isActive) {
    return context.resume().then(() => context).catch(() => null);
  }
  return Promise.resolve(context);
}

export function setSoundEnabled(nextEnabled) {
  enabled = Boolean(nextEnabled);
  return enabled;
}

export function isSoundEnabled() {
  return enabled;
}

export function setSoundProfile(profile) {
  if (!PROFILES[profile]) return activeProfile;
  activeProfile = profile;
  window.dispatchEvent(
    new CustomEvent("thock:profile", { detail: { profile: activeProfile } }),
  );
  return activeProfile;
}

export function getSoundProfile() {
  return activeProfile;
}
