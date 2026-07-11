import { gsap } from "../../lib/gsap.js";
import {
  buildSoundprintPath,
  getDisplaySoundprintEvents,
} from "../../lib/soundprint.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const path = document.querySelector("[data-soundprint-path]");
const scan = document.querySelector("[data-soundprint-scan]");
const count = document.querySelector("[data-soundprint-count]");
const profile = document.querySelector("[data-soundprint-profile]");
const source = document.querySelector("[data-soundprint-source]");
const keys = document.querySelector("[data-soundprint-keys]");
const status = document.querySelector("[data-soundprint-status]");

function profileLabel(value) {
  return `${value[0].toUpperCase()}${value.slice(1)} profile`;
}

function renderKeys(events) {
  if (!keys) return;
  const fragment = document.createDocumentFragment();
  events.slice(-10).forEach((event) => {
    const key = document.createElement("span");
    key.textContent = event.label;
    fragment.appendChild(key);
  });
  keys.replaceChildren(fragment);
}

function renderSoundprint(events, { animate = false, factory = false } = {}) {
  const displayEvents = events.length ? events : getDisplaySoundprintEvents();
  const lastEvent = displayEvents.at(-1);

  path?.setAttribute("d", buildSoundprintPath(displayEvents));
  if (count) count.textContent = String(factory ? 0 : events.length).padStart(2, "0");
  if (profile && lastEvent) profile.textContent = profileLabel(lastEvent.profile);
  if (source) source.textContent = factory ? "Factory calibration" : "Live input";
  renderKeys(displayEvents);

  if (animate && !reduceMotion && path) {
    gsap.killTweensOf(path);
    gsap.fromTo(
      path,
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 0.7, ease: "power2.out" },
    );
  }
}

renderSoundprint([], { factory: true });

window.addEventListener("thock:soundprint", (event) => {
  const events = event.detail?.events || [];
  renderSoundprint(events, { animate: true, factory: !events.length });
  if (status) {
    const last = event.detail?.last;
    const pressure = last?.pressure
      ? ` · pressure ${Math.round(last.pressure * 100)}%`
      : "";
    const interval = last?.interval ? `${last.interval}ms interval` : "first input";
    status.textContent = events.length
      ? `${last?.label || "Input"} captured · ${interval}${pressure} · ${events.length} ${events.length === 1 ? "stroke" : "strokes"}.`
      : "Factory trace restored. Make it yours.";
  }
});

window.addEventListener("thock:replay", () => {
  if (!path || reduceMotion) return;
  gsap.killTweensOf([path, scan]);
  gsap.fromTo(
    path,
    { drawSVG: "0%" },
    { drawSVG: "100%", duration: 1.2, ease: "power2.inOut" },
  );
  if (scan) {
    gsap.fromTo(
      scan,
      { attr: { x: 0 }, opacity: 0 },
      {
        attr: { x: 1200 },
        opacity: 0.85,
        duration: 1.2,
        ease: "none",
        onComplete: () => gsap.set(scan, { opacity: 0 }),
      },
    );
  }
});

if (!reduceMotion) {
  gsap.from(".soundprint-console", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: { trigger: ".soundprint-console", start: "top 82%" },
  });
}
