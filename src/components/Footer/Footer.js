import { gsap } from "../../lib/gsap.js";
import { playKey, unlockSound } from "../../lib/sound.js";
import {
  getDisplaySoundprintEvents,
  getSoundprintEvents,
} from "../../lib/soundprint.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const replayButton = document.querySelector("[data-replay-soundprint]");
const replayLabel = document.querySelector("[data-replay-label]");
const footerCount = document.querySelector("[data-footer-count]");
const status = document.querySelector(".footer-status");
let replayCall;

function renderCount(events) {
  if (footerCount) footerCount.textContent = String(events.length).padStart(2, "0");
  if (replayLabel) {
    replayLabel.textContent = events.length
      ? "Replay my soundprint"
      : "Play factory trace";
  }
}

window.addEventListener("thock:soundprint", (event) => {
  renderCount(event.detail?.events || []);
});

replayButton?.addEventListener("click", () => {
  const userEvents = getSoundprintEvents();
  const replayEvents = userEvents.length ? userEvents : getDisplaySoundprintEvents();
  unlockSound();

  const soundprint = document.querySelector("#soundprint");
  soundprint?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });

  if (status) {
    status.textContent = "Moving to your soundprint…";
  }

  replayCall?.kill();
  replayCall = gsap.delayedCall(reduceMotion ? 0 : 0.7, () => {
    window.dispatchEvent(new CustomEvent("thock:replay"));
    const audibleEvents = replayEvents.slice(-8);
    if (audibleEvents[0]) playKey(audibleEvents[0].profile);
    audibleEvents.slice(1).forEach((event, index) => {
      gsap.delayedCall((index + 1) * 0.11, () => playKey(event.profile));
    });
    if (status) {
      status.textContent = userEvents.length > audibleEvents.length
        ? `Replaying the latest ${audibleEvents.length} of ${userEvents.length} live strokes.`
        : userEvents.length
          ? `Replaying ${audibleEvents.length} live ${audibleEvents.length === 1 ? "stroke" : "strokes"}.`
        : "Replaying the THOCK factory calibration.";
    }
  });

  if (!reduceMotion) {
    gsap.fromTo(
      replayButton,
      { scale: 0.98 },
      { scale: 1, duration: 0.4, ease: "back.out(2.4)" },
    );
  }
});

renderCount(getSoundprintEvents());

if (!reduceMotion) {
  gsap.from(".footer > *", {
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.7,
    ease: "power2.out",
    scrollTrigger: { trigger: ".footer", start: "top 80%" },
  });
}
