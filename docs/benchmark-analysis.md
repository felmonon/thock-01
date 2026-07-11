# Official Benchmark Analysis

Reviewed July 10–11, 2026 in a real browser at 1440 × 900 and 390 × 844. The goal was to identify why the official episode builds feel intentional, not to reproduce them.

## Comparison

| Build | Concept in one sentence | Three-second impression | Signature interaction | Likely memory hook | Territory not to copy |
| --- | --- | --- | --- | --- | --- |
| [Lunar Landing](https://lunarland.ing/) | A playable Apollo lander presented as a mission-control experience. | Sparse star field, enormous tracked title, Earth, and a high-stakes Launch control. | A six-mission landing game with thrust, fuel, altitude, speed, and angle. | “The landing page was literally playable.” | Space, mission-control telemetry, star fields, landing-game mechanics. |
| [World Cup 2026](https://osmo-world-cup-26.webflow.io/) | An editorial event guide that turns tournament statistics and stadiums into kinetic sports graphics. | Giant stacked typography, hand-script accent, textured ball, and loud color. | Layered loader, kinetic scroll transitions, stadium sequence, match countdown. | The art-directed ball and oversized typographic poster system. | Sports identity, tournament countdown, oversized stacked event typography. |
| [Sell Your Soul](https://sell-your-soul.webflow.io/) | A demonic data-privacy contract that asks the visitor to surrender their identity. | Severe black-and-white texture, distorted gothic copy, and liquid black 3D forms. | A narrative scroll through a progressively redacted Faustian contract. | The unsettling premise and viscous “flesh” art direction. | Infernal/gothic identity, redacted legal contract, chrome-organic 3D forms. |

## Lunar Landing

- **Hierarchy and layout:** cinematic full viewport; title, planet, and primary action establish the world before gameplay.
- **Typography and color:** wide techno display type, cold gray/white, and a restrained red launch accent.
- **Pacing:** short invitation followed by a major mode change into the game.
- **GSAP role:** transitions, interface motion, and game feedback support the landing premise rather than decorating sections.
- **Best moment:** Launch changes the website from a hero into an instrument.
- **Weakest moment:** the initial star field can briefly obscure the title on slower/throttled rendering.
- **Mobile:** the title and Launch/Explore controls recompose cleanly at 390px with no document overflow.
- **Lesson:** one decisive interaction is more memorable than many disconnected effects.

## World Cup 2026

- **Hierarchy and layout:** dense editorial poster composition with strong information hierarchy and a persistent branded navigation badge.
- **Typography and color:** huge condensed black type, warm paper surface, bright tournament colors, and handwritten red copy.
- **Pacing:** loader spectacle, declarative hero, statistical reveal, stadium catalog, then match countdown.
- **GSAP role:** section pinning, typography reveals, loader choreography, and scroll progress create a broadcast package.
- **Best moment:** the textured ball floating against the stacked `WORLD CUP 2026` title.
- **Weakest moment:** the mobile opening is intentionally crowded and risks hiding supporting copy beneath spectacle.
- **Mobile:** oversized typography crops deliberately while the document remains overflow-free.
- **Lesson:** static composition must already be strong enough to work as a poster.

## Sell Your Soul

- **Hierarchy and layout:** editorial horror narrative with long-form copy, aggressive scale changes, and texture throughout.
- **Typography and color:** custom angular display lettering, gothic text, monochrome surfaces, and small blood-red accents.
- **Pacing:** ominous loader, confrontational hero, existential copy, contract, testimonials, and final ritual-like CTA.
- **GSAP role:** animated type, scroll reveals, and 3D liquid forms maintain psychological tension.
- **Best moment:** the concept, copy, and visual material all tell the same uncomfortable story.
- **Weakest moment:** long loading and heavy 3D increase technical risk; browser inspection surfaced non-fatal Three.js and missing-target warnings.
- **Mobile:** the identity remains unmistakable, though the very large title and 3D forms crop aggressively.
- **Lesson:** a complete narrative voice can outweigh conventional product clarity when every detail is coherent.

## What the benchmarks establish

1. A winner needs an idea that can be retold the next day.
2. The opening must work as a still image before motion begins.
3. GSAP should change the mode of interaction or advance a narrative.
4. Mobile can recompose or crop deliberately, but it cannot feel forgotten.
5. A technically impressive interaction must be understandable quickly.

## Territory selected for THOCK/01

None of the benchmarks turns a familiar physical object into a visitor-specific audiovisual artifact. THOCK/01 occupies that opening: the keyboard is simultaneously the product, input device, animation controller, and sound generator. Input rhythm and available touch pressure determine amplitude; the selected switch determines trace geometry and synthesized sound. The resulting soundprint persists through the story and can be replayed.

The project deliberately avoids the benchmarks’ space, sports, gothic, game, and photography/3D identities.
