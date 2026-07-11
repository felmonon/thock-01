# Concept Decision Record

## Process note

THOCK/01 already had a working implementation when the expanded mission brief arrived. This document records an honest retrospective continuation decision, not a claim that twenty browser prototypes were completed before development. The existing concept was allowed to continue only after benchmark comparison, browser evidence, and adversarial judging exposed and corrected its keyboard-only signature interaction.

## Heuristic rubric

- Originality: 20
- Immediate impact: 15
- Art-direction potential: 15
- Meaningful GSAP: 15
- Emotional/narrative coherence: 10
- Signature interaction: 10
- Technical feasibility: 5
- Mobile viability: 5
- Performance/accessibility viability: 5

## Concept-family registry

| # | Family | Core idea / emotional effect | Signature interaction / mechanism | Main risks | Status and reason |
| --- | --- | --- | --- | --- | --- |
| 1 | Interactive product | THOCK/01 turns keyboard acoustics into a personal signal; tactile curiosity. | Type/tap builds a rhythm/pressure soundprint; Web Audio + DrawSVG + GSAP. | Familiar product aesthetic; must work on touch. | **Selected.** Cross-device soundprint made the mechanism distinctive and feasible. |
| 2 | Narrative archive | Reconstruct extinct everyday sounds as animated specimens; wonder and loss. | Drag fragments to rebuild a sound; SVG morph + audio. | High audio/illustration production burden. | Finalist, rejected for asset/time risk. |
| 3 | Transformation | A digital loom weaves visitor gestures into a living textile; calm ownership. | Drag velocity changes thread geometry; Draggable/Inertia/SVG. | Complex touch geometry and repeat stability. | Finalist, rejected for implementation risk. |
| 4 | Kinetic type | A gravity typesetter where words acquire mass and reshape the page; playful surprise. | Typed words collide and settle; Physics2D. | Can read as an effects demo without story. | Finalist, rejected for weaker narrative arc. |
| 5 | Time-based place | A one-minute museum changes material every second; anticipation. | Time scrubbing transforms exhibits; Flip/MorphSVG. | Difficult art production and return visits. | Finalist, rejected for asset scope. |
| 6 | Data-made-emotional | Breathing data becomes a landscape; introspection. | Microphone-free paced input grows terrain. | Medical/wellness cliché and canvas complexity. | Rejected for originality risk. |
| 7 | Playable page | A tiny paper city survives the visitor’s weather gestures; protectiveness. | Swipe direction creates wind/rain physics. | Illustration and simulation workload. | Rejected for production risk. |
| 8 | Editorial artifact | An instruction manual for impossible household repairs; dry humor. | Diagrams assemble as the reader follows steps. | Copy-heavy and weaker immediate emotion. | Rejected after benchmark comparison. |
| 9 | Digital place | A midnight laundromat stores anonymous memories in spinning drums; intimacy. | Drag a washer dial to reveal stories. | Photography/3D asset quality. | Rejected for asset dependence. |
| 10 | Generative system | A fictional weather station translates scrolling into forecast symbols; control. | Scroll velocity generates a unique forecast. | Data-dashboard familiarity. | Rejected for originality risk. |
| 11 | Ordinary-object reinterpretation | A receipt prints the true cost of attention; discomfort. | Scroll prints and tears an endless receipt. | Similarity to surveillance/editorial work. | Rejected for benchmark proximity. |
| 12 | SVG-first | Botanical blueprints grow into impossible machines; awe. | DrawSVG growth branches into mechanisms. | Can become a single visual trick. | Rejected for page-arc risk. |
| 13 | Cursor/touch | A magnetic field reveals an invisible product through filings; discovery. | Pointer velocity aligns thousands of marks. | Desktop bias and performance. | Blocked by mobile/performance risk. |
| 14 | Sound-first | A room-tuning service makes architecture audible; spatial calm. | Tap surfaces to hear and draw resonance. | Similar to THOCK with a less legible subject. | Merged into soundprint mechanism. |
| 15 | Spatial interface | An elevator visits impossible emotional floors; curiosity. | Scroll changes floors with parallax doors. | Familiar award-site metaphor. | Rejected for trend risk. |
| 16 | Cinematic narrative | A seed travels through a city’s hidden infrastructure; optimism. | Pinned camera follows an SVG route. | Illustration volume and passive interaction. | Rejected for production risk. |
| 17 | Physics interface | A packaging lab tests fragile ideas as parcels; playful tension. | Drop/throw boxes and inspect damage. | Desktop precision and unclear product. | Blocked by interaction risk. |
| 18 | Cultural artifact | A fictional radio schedule preserves disappearing local dialects; warmth. | Tune frequency to morph type and stories. | Voice/audio licensing and recording. | Rejected for asset/legal risk. |
| 19 | No-photo system | A matchbook catalog ignites one memory per match; nostalgia. | Drag to strike; flame reveals layered type. | Fire metaphor is common and touch gesture risky. | Rejected for similarity/gesture risk. |
| 20 | Motion-as-navigation | A folding transit map routes the visitor by intent; orientation. | Choose a destination; Flip rearranges the page. | Feels like navigation UI rather than landing story. | Rejected for emotional weakness. |

## Finalist scoring

| Concept | Score | Deciding evidence |
| --- | ---: | --- |
| THOCK/01 Soundprint | 88 | Working cross-device input loop, high challenge relevance, strong still composition, low asset risk. |
| Extinct Sounds Archive | 86 | More emotional potential, but required a large legal, audio, and illustration pipeline. |
| Kinetic Loom | 84 | Beautiful gesture premise, but touch stability and SVG complexity remained unproven. |
| Gravity Typesetter | 82 | Immediate and feasible, but too easily reduced to a GSAP physics demonstration. |
| One-Minute Museum | 80 | Strong time premise, but weak replay value and expensive art production. |

## Selection

**Selected concept:** THOCK/01 — a fictional mechanical keyboard that turns each visitor’s input rhythm, available touch pressure, and chosen switch profile into a unique audiovisual soundprint.

It was selected because motion is inherent to the subject, the browser already is the input device, audio can be synthesized without assets, every core interaction has a touch equivalent, and the result creates both a memorable still and replayable behavior. The soundprint revision links the hero, switch cards, audio engine, and ending into one arc instead of a stack of effects.

## Red-team decision history

- Initial independent score: 77/100. Blocker: signature was keyboard-only and the passive typewriter section/fake signup weakened the arc.
- Revision: tappable keycaps, live soundprint, horizontal mobile switch selector, real replay CTA, custom favicon/social image, and honest no-tracking copy.
- Second independent score: 87.5/100. Blocker: signal strength was synthetic rather than derived from visitor behavior.
- Revision: amplitude now incorporates real input cadence and PointerEvent pressure when the device provides it; the hero performs one silent factory cap-to-trace demonstration.

The concept remains open to rejection if the deployed experience proves unreliable. Sunk implementation cost is not a reason to keep it.
