import { gsap } from "../../lib/gsap.js";

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.to(".page-progress span", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      start: "top top",
      end: "max",
      scrub: 0.2,
    },
  });
}
