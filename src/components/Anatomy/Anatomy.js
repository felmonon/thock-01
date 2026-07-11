import { gsap } from "../../lib/gsap.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const layers = gsap.utils.toArray(".board-layer");
const legendItems = gsap.utils.toArray(".anatomy .legend-item");

function positionLayers(gap) {
  layers.forEach((layer, index) => {
    gsap.set(layer, { z: (layers.length - 1 - index) * gap });
  });
}

if (reduceMotion) {
  positionLayers(window.innerWidth <= 900 ? 28 : 52);
  gsap.set(".board", { y: window.innerWidth <= 900 ? 18 : 38 });
  legendItems.forEach((item) => item.classList.add("is-active"));
} else {
  const media = gsap.matchMedia();

  media.add(
    {
      desktop: "(min-width: 901px)",
      compact: "(max-width: 900px)",
    },
    (context) => {
      const compact = context.conditions.compact;
      const layerGap = compact ? 34 : 64;
      positionLayers(8);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".anatomy",
          start: "top top",
          end: compact ? "+=130%" : "+=180%",
          pin: ".anatomy-pin",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const active = Math.min(
              legendItems.length - 1,
              Math.floor(self.progress * (legendItems.length + 0.5)),
            );
            legendItems.forEach((item, index) => {
              item.classList.toggle("is-active", index <= active);
            });
          },
        },
      });

      layers.forEach((layer, index) => {
        const offset = (layers.length - 1 - index) * layerGap;
        timeline.to(layer, { z: offset, ease: "power1.inOut", duration: 1 }, index * 0.08);
      });

      timeline.from(
        ".board",
        { rotateZ: compact ? -22 : -12, ease: "power1.inOut", duration: 1.2 },
        0,
      );
      timeline.to(
        ".board",
        { y: compact ? 28 : 60, ease: "power1.inOut", duration: 1.2 },
        0,
      );

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
  );
}
