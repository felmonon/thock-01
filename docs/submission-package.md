# THOCK/01 Submission Package

The external Google Form has **not** been submitted. Explicit user approval is required before sending it.

## Form answers

**Full name:** Felmon Fekadu

**Email address:** `[USER MUST PROVIDE BEFORE SUBMISSION]`

**Link to live URL:** `[PENDING WEBFLOW CLOUD DEPLOYMENT]`

**Link to public GitHub repository:** https://github.com/felmonon/thock-01

**Tech Stack Used:**

- Webflow
- GSAP
- Astro
- Webflow Cloud

**Additional comments / features to highlight:**

> THOCK/01 turns the visitor’s own keyboard or touch input into a live mechanical-keyboard soundprint. Input cadence—and touch pressure when the device exposes it—controls amplitude, while the selected Tactile, Linear, or Clicky profile changes both SVG geometry and procedural Web Audio synthesis. GSAP powers the keycap landing, impact physics, responsive exploded-view sequence, force-curve drawing, signal rendering, and replay scan. The experience includes a complete reduced-motion mode, touch parity, keyboard accessibility, self-hosted fonts, and no audio samples or tracking.

## Submission-ready identity

**Title:** THOCK/01 — The Sound of Your Hands

**One-sentence hook:** Every visitor creates and replays a unique mechanical-keyboard soundprint.

**Concise description:**

THOCK/01 is an interactive launch page for a fictional 75% mechanical keyboard. Type a key or tap a hero cap and your rhythm becomes a live SVG force trace with a synthesized switch sound. Choose Tactile, Linear, or Clicky, disassemble the board on scroll, then replay the signal you made.

## How GSAP is used

| Plugin | Purpose |
| --- | --- |
| GSAP core | Timelines, cap presses, replay scan, responsive entrances, and signal state transitions. |
| ScrollTrigger | Scroll progress and the pinned exploded-keyboard narrative. |
| DrawSVG | Switch force-curve reveals and live/replayed soundprint drawing. |
| Physics2D | Small acoustic-energy particles emitted from physical/touch key impacts. |
| CustomEase + CustomBounce | Weighted keycap landing with a reusable physical bounce profile. |
| ScrambleText | Resolves the product proposition after the keycaps land. |

## Media package

- Hero: `docs/screenshots/01-hero.png`
- Exploded anatomy: `docs/screenshots/02-anatomy.png`
- Populated soundprint: `docs/screenshots/03-soundprint.png`
- 11-second interaction recording: `docs/screenshots/thock-01-demo.mp4`
- Social card: `public/og-thock.png`

## Reproduce locally

```sh
npm ci
npm run check
npm run build
npm run preview
```

## Known behavior

- Pressure data is used only when a pointer device/browser supplies it; cadence and switch profile always influence the trace.
- The soundprint retains the latest 14 strokes in the current page session.
- Replay audibly plays the latest eight strokes to keep the sequence concise; the visible trace retains all fourteen.
- Sound is intentionally silent until the visitor interacts.
