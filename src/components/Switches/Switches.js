import { gsap } from "../../lib/gsap.js";
import { playKey, setSoundProfile } from "../../lib/sound.js";
import { recordSoundprint } from "../../lib/soundprint.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const cards = gsap.utils.toArray(".switch-card");
const auditionButtons = gsap.utils.toArray(".switch-audition");

function selectProfile(profile) {
  setSoundProfile(profile);
  cards.forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.profile === profile);
  });
  auditionButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.audition === profile));
  });
}

auditionButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const profile = button.dataset.audition || "tactile";
    selectProfile(profile);
    playKey(profile);
    recordSoundprint(profile[0].toUpperCase(), profile, {
      source: "profile-control",
      time: event.timeStamp,
    });
    if (!reduceMotion) {
      gsap.fromTo(
        button,
        { scale: 0.97 },
        { scale: 1, duration: 0.35, ease: "back.out(2.5)" },
      );
    }
  });
});

if (!reduceMotion) {
  gsap.from(cards, {
    y: 40,
    opacity: 0,
    stagger: 0.12,
    duration: 0.7,
    ease: "power2.out",
    scrollTrigger: { trigger: ".switch-grid", start: "top 78%" },
  });

  gsap.utils.toArray(".curve-path").forEach((path, index) => {
    gsap.from(path, {
      drawSVG: 0,
      duration: 1.1,
      delay: 0.25 + index * 0.12,
      ease: "power2.inOut",
      scrollTrigger: { trigger: ".switch-grid", start: "top 78%" },
    });
  });
}
