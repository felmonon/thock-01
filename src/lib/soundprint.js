const MAX_EVENTS = 14;
const VALID_PROFILES = new Set(["tactile", "linear", "clicky"]);

let sequence = 0;
let soundprintEvents = [];
let lastInputAt = 0;

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function normalizeLabel(label) {
  const value = String(label || "•").trim().toUpperCase();
  return value.slice(0, 2) || "•";
}

function createEvent(label, profile, index = sequence, signal = {}) {
  const normalizedLabel = normalizeLabel(label);
  const normalizedProfile = VALID_PROFILES.has(profile) ? profile : "tactile";
  const timestamp = Number.isFinite(signal.time) ? signal.time : performance.now();
  const hasPreviousInput = lastInputAt > 0;
  const interval = hasPreviousInput
    ? clamp(timestamp - lastInputAt, 35, 1400)
    : 700;
  const cadence = 1 - (interval - 35) / 1365;
  const rawPressure = Number(signal.pressure);
  const pressure = Number.isFinite(rawPressure) && rawPressure > 0
    ? clamp(rawPressure, 0.05, 1)
    : null;
  const measuredStrength = 0.34 + cadence * 0.38 + (pressure ?? 0.34) * 0.25;

  return {
    id: index,
    label: normalizedLabel,
    profile: normalizedProfile,
    strength: clamp(signal.strength ?? measuredStrength, 0.38, 0.97),
    interval: hasPreviousInput ? Math.round(interval) : null,
    pressure,
    source: signal.source || "keyboard",
    timestamp,
  };
}

const calibrationStrengths = [0.62, 0.84, 0.58, 0.76, 0.67];
const calibrationEvents = ["T", "H", "O", "C", "K"].map((label, index) =>
  createEvent(label, "tactile", index - 10, {
    source: "calibration",
    strength: calibrationStrengths[index],
    time: index * 120,
  }),
);

export function recordSoundprint(label, profile = "tactile", signal = {}) {
  const nextEvent = createEvent(label, profile, sequence, signal);
  lastInputAt = nextEvent.timestamp;
  sequence += 1;
  soundprintEvents.push(nextEvent);
  soundprintEvents = soundprintEvents.slice(-MAX_EVENTS);

  window.dispatchEvent(
    new CustomEvent("thock:soundprint", {
      detail: {
        events: getSoundprintEvents(),
        last: nextEvent,
      },
    }),
  );

  return nextEvent;
}

export function resetSoundprint() {
  soundprintEvents = [];
  lastInputAt = 0;
  window.dispatchEvent(
    new CustomEvent("thock:soundprint", {
      detail: { events: [], last: null, reset: true },
    }),
  );
}

export function getSoundprintEvents() {
  return soundprintEvents.map((event) => ({ ...event }));
}

export function getDisplaySoundprintEvents() {
  const events = getSoundprintEvents();
  return events.length ? events : calibrationEvents.map((event) => ({ ...event }));
}

export function buildSoundprintPath(events, width = 1200, height = 320) {
  const visibleEvents = events.slice(-MAX_EVENTS);
  const baseline = height / 2;
  const slotWidth = width / MAX_EVENTS;
  const path = [`M 0 ${baseline}`];

  visibleEvents.forEach((event, index) => {
    const start = index * slotWidth;
    const end = start + slotWidth;
    const amplitude = Math.min(height * 0.4, height * 0.34 * event.strength);

    path.push(`L ${start.toFixed(2)} ${baseline.toFixed(2)}`);

    if (event.profile === "linear") {
      path.push(
        `L ${(start + slotWidth * 0.58).toFixed(2)} ${(baseline - amplitude).toFixed(2)}`,
        `L ${end.toFixed(2)} ${baseline.toFixed(2)}`,
      );
      return;
    }

    if (event.profile === "clicky") {
      path.push(
        `L ${(start + slotWidth * 0.34).toFixed(2)} ${(baseline - amplitude * 0.5).toFixed(2)}`,
        `L ${(start + slotWidth * 0.42).toFixed(2)} ${(baseline + amplitude * 0.35).toFixed(2)}`,
        `L ${(start + slotWidth * 0.49).toFixed(2)} ${(baseline - amplitude).toFixed(2)}`,
        `L ${end.toFixed(2)} ${baseline.toFixed(2)}`,
      );
      return;
    }

    path.push(
      `C ${(start + slotWidth * 0.16).toFixed(2)} ${baseline.toFixed(2)}, ${(start + slotWidth * 0.22).toFixed(2)} ${(baseline - amplitude).toFixed(2)}, ${(start + slotWidth * 0.38).toFixed(2)} ${(baseline - amplitude).toFixed(2)}`,
      `C ${(start + slotWidth * 0.52).toFixed(2)} ${(baseline - amplitude).toFixed(2)}, ${(start + slotWidth * 0.58).toFixed(2)} ${(baseline + amplitude * 0.48).toFixed(2)}, ${(start + slotWidth * 0.72).toFixed(2)} ${(baseline + amplitude * 0.42).toFixed(2)}`,
      `C ${(start + slotWidth * 0.84).toFixed(2)} ${(baseline + amplitude * 0.34).toFixed(2)}, ${(start + slotWidth * 0.92).toFixed(2)} ${baseline.toFixed(2)}, ${end.toFixed(2)} ${baseline.toFixed(2)}`,
    );
  });

  path.push(`L ${width} ${baseline}`);
  return path.join(" ");
}

export { calibrationEvents, MAX_EVENTS };
