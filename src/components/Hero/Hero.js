import {
  CustomBounce,
  gsap,
} from "../../lib/gsap.js";
import {
  getSoundProfile,
  isSoundEnabled,
  playKey,
  setSoundEnabled,
} from "../../lib/sound.js";
import {
  buildSoundprintPath,
  getDisplaySoundprintEvents,
  recordSoundprint,
} from "../../lib/soundprint.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const caps = gsap.utils.toArray(".hero-title .keycap");
const hint = document.querySelector(".hero-hint");
const soundToggle = document.querySelector(".sound-toggle");
const soundState = document.querySelector("[data-sound-state]");
const profileDisplay = document.querySelector("[data-profile-display]");
const impactLayer = document.querySelector(".hero-impact");
const heroSoundprintPath = document.querySelector("[data-hero-soundprint-path]");
const heroSoundprintCount = document.querySelector("[data-hero-soundprint-count]");
const heroSoundprintSource = document.querySelector("[data-hero-soundprint-source]");
let factoryDemo;
let hasLiveInput = false;

function finishHeroIntro() {
  gsap.set(caps, { clearProps: "transform,opacity" });
  gsap.set(["#hero-subtitle", hint], { clearProps: "opacity,transform" });
}

function runFactoryDemo() {
  if (reduceMotion || hasLiveInput || !heroSoundprintPath) return;
  factoryDemo?.kill();
  factoryDemo = gsap.timeline();
  factoryDemo.fromTo(
    heroSoundprintPath,
    { drawSVG: "0%" },
    { drawSVG: "100%", duration: 1.05, ease: "power2.inOut" },
  );
  factoryDemo.fromTo(
    caps,
    { y: 0 },
    {
      y: "0.04em",
      duration: 0.09,
      repeat: 1,
      yoyo: true,
      stagger: 0.16,
      ease: "power2.inOut",
      clearProps: "transform",
    },
    0,
  );
}

if (!reduceMotion) {
  CustomBounce.create("capBounce", { strength: 0.5, squash: 2 });

  const timeline = gsap.timeline({
    onComplete: () => {
      finishHeroIntro();
      window.setTimeout(runFactoryDemo, 350);
    },
  });
  timeline.fromTo(
    caps,
    { y: -120, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      ease: "capBounce",
      duration: 0.9,
      stagger: 0.09,
    },
  );

  caps.forEach((cap, index) => {
    timeline.call(() => cap.classList.add("is-lit"), null, 0.35 + index * 0.09);
    timeline.call(() => cap.classList.remove("is-lit"), null, 0.75 + index * 0.09);
  });

  timeline.to(
    "#hero-subtitle",
    {
      duration: 1.25,
      scrambleText: {
        text: "The sound your desk has been waiting for.",
        chars: "lowerCase",
        speed: 0.6,
      },
    },
    "-=0.4",
  );
  timeline.from(hint, { opacity: 0, y: 8, duration: 0.45 }, "<+0.5");

  // A throttled preview should never leave the product half assembled.
  window.setTimeout(() => {
    if (timeline.isActive()) timeline.progress(1);
  }, 2800);
}

function isInteractiveTarget(target) {
  return (
    target instanceof Element &&
    Boolean(
      target.closest("button, a, input, textarea, select, [contenteditable='true']"),
    )
  );
}

function pressTitleCap(label) {
  const hit = caps.find((cap) => cap.dataset.key === label);
  if (!hit) return null;

  if (!reduceMotion) {
    gsap.fromTo(
      hit,
      { y: 0, scale: 1 },
      {
        y: "0.06em",
        scale: 0.985,
        yoyo: true,
        repeat: 1,
        duration: 0.09,
        ease: "power2.in",
      },
    );
  }

  hit.classList.add("is-lit");
  window.setTimeout(() => hit.classList.remove("is-lit"), 300);
  return hit;
}

function burstParticles(origin) {
  if (reduceMotion || !impactLayer) return;
  const layerBounds = impactLayer.getBoundingClientRect();
  const originBounds = origin?.getBoundingClientRect();
  const x = originBounds
    ? originBounds.left + originBounds.width / 2 - layerBounds.left
    : layerBounds.width / 2;
  const y = originBounds
    ? originBounds.top + originBounds.height * 0.62 - layerBounds.top
    : layerBounds.height / 2;

  for (let index = 0; index < 7; index += 1) {
    const particle = document.createElement("span");
    particle.className = "impact-particle";
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    impactLayer.appendChild(particle);

    gsap.to(particle, {
      duration: gsap.utils.random(0.55, 0.9),
      opacity: 0,
      scale: gsap.utils.random(0.25, 0.75),
      rotation: gsap.utils.random(-180, 180),
      physics2D: {
        velocity: gsap.utils.random(80, 210),
        angle: gsap.utils.random(205, 335),
        gravity: 280,
      },
      ease: "none",
      onComplete: () => particle.remove(),
    });
  }
}

function renderHeroSoundprint(events, animate = false) {
  const displayEvents = events.length ? events : getDisplaySoundprintEvents();
  heroSoundprintPath?.setAttribute(
    "d",
    buildSoundprintPath(displayEvents, 600, 100),
  );
  if (heroSoundprintCount) {
    heroSoundprintCount.textContent = String(events.length).padStart(2, "0");
  }
  if (heroSoundprintSource) {
    heroSoundprintSource.textContent = events.length ? "Live signal" : "Factory trace";
  }
  if (animate && !reduceMotion && heroSoundprintPath) {
    gsap.killTweensOf(heroSoundprintPath);
    gsap.fromTo(
      heroSoundprintPath,
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 0.42, ease: "power2.out" },
    );
  }
}

function registerInput(label, origin, signal = {}) {
  hasLiveInput = true;
  factoryDemo?.kill();
  gsap.set(caps, { clearProps: "transform" });
  const profile = getSoundProfile();
  playKey(profile);
  recordSoundprint(label, profile, signal);
  const matchingCap = pressTitleCap(label);
  burstParticles(origin || matchingCap);
}

window.addEventListener("keydown", (event) => {
  if (isInteractiveTarget(event.target)) return;
  if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;

  const printable = event.key.length === 1;
  const label = printable
    ? event.key.toUpperCase()
    : event.key === "Enter"
      ? "↵"
      : null;
  if (!label) return;

  registerInput(label, null, {
    source: "keyboard",
    time: event.timeStamp,
  });
});

caps.forEach((cap) => {
  cap.addEventListener("pointerdown", (event) => {
    cap.thockPointerSignal = {
      pressure: event.pressure,
      source: event.pointerType || "pointer",
      time: event.timeStamp,
    };
  });
  cap.addEventListener("click", (event) => {
    const signal = cap.thockPointerSignal || {
      source: "keyboard-control",
      time: event.timeStamp,
    };
    cap.thockPointerSignal = null;
    registerInput(cap.dataset.key || "•", cap, signal);
  });
});

function renderSoundState() {
  const enabled = isSoundEnabled();
  soundToggle?.setAttribute("aria-pressed", String(enabled));
  if (soundState) soundState.textContent = enabled ? "armed" : "muted";
}

soundToggle?.addEventListener("click", () => {
  const nextEnabled = setSoundEnabled(!isSoundEnabled());
  renderSoundState();
  if (nextEnabled) playKey();
});

window.addEventListener("thock:profile", (event) => {
  const profile = event.detail?.profile || getSoundProfile();
  if (profileDisplay) {
    profileDisplay.textContent = profile[0].toUpperCase() + profile.slice(1);
  }
});

window.addEventListener("thock:soundprint", (event) => {
  const events = event.detail?.events || [];
  if (events.length) {
    hasLiveInput = true;
    factoryDemo?.kill();
  }
  renderHeroSoundprint(events, true);
});

renderSoundState();
renderHeroSoundprint([]);
