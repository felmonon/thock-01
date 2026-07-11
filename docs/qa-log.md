# THOCK/01 QA Log

Last updated July 11, 2026.

## Test environment

- macOS on Apple silicon
- Node.js 25.6.1 locally; project engine floor is Node 22.12 for Webflow Cloud compatibility
- npm 11.11.0
- Google Chrome 150.0.7871.49
- Astro 6.4.8
- GSAP 3.15.x
- Production mode tested through `astro preview`

## Automated gates

| Gate | Result | Evidence |
| --- | --- | --- |
| Clean install | Pass | Isolated `npm ci` completed successfully. |
| Astro diagnostics | Pass | `npm run check`: 0 errors, 0 warnings, 0 hints across 26 files. |
| Production build | Pass | `npm run build`: one static route generated successfully. |
| Console/network | Pass | No page errors, warnings, failed requests, or missing assets in the final production browser pass. |
| Dependency audit | Accepted | Two low-severity esbuild advisories affect the Windows development server. The available automatic fix requires Astro 7; the static production deployment is not exposed to that dev-server condition. |

## Lighthouse

Run against the local production build, not the development server.

| Profile | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile, latest run | 100 | 100 | 100 | 100 | 1.3s | 1.7s | 0ms | 0.012 | 127 KiB |
| Mobile, independent rerun | 99 | 100 | 100 | 100 | — | 1.92s | 0ms | 0.013 | — |
| Desktop | 100 | 100 | 100 | 100 | 0.3s | 0.5s | 0ms | 0 | 127 KiB |

The two mobile runs are both recorded to avoid cherry-picking normal Lighthouse variance.

## Responsive and interaction matrix

| Scenario | Result |
| --- | --- |
| 320px phone | Pass; no document overflow and all navigation destinations remain available. |
| 375 × 667 short phone | Pass; hero, telemetry, and touch controls remain usable. |
| 390 × 844 phone | Pass; five tappable caps fit, switch cards use a contained scroll-snap carousel, soundprint fits. |
| 768 × 1024 tablet | Pass; anatomy reflows to a compact stacked composition. |
| 1440 × 900 desktop | Pass; hero, pinned anatomy, switch grid, and soundprint composition verified visually. |
| 1920 × 1080 desktop | Pass; no excessive stretching or horizontal overflow. |
| Short landscape viewport | Pass; content remains scrollable and the pinned section releases correctly. |
| Repeated resize | Pass; `gsap.matchMedia` rebuilds the anatomy timeline without stale pin spacing. |
| Refresh at a hash/mid-page | Pass in the production browser; content remains present before animation enhancement. |

## Input and accessibility

- Physical printable keys create soundprint strokes; modifier combinations and key-repeat are ignored.
- Tapping/clicking the five hero caps creates the same core experience on touch devices.
- Input interval always influences amplitude; PointerEvent pressure also contributes when the device/browser supplies it.
- Tactile, Linear, and Clicky controls update trace geometry, synthesized sound, selected state, and hero telemetry.
- Sound begins only after a user gesture and can be muted with an accessible pressed-state button.
- Keyboard focus order, Enter/Space activation, focus rings, skip link, headings, live status text, and control names were verified.
- Reduced motion retains every key, layer, curve, trace, and control; it removes pin/scrub and decorative motion rather than hiding content.
- Footer replay scrolls to the visualization before the scan/audio sequence begins.

## Defect and retest history

| Defect | Fix | Retest |
| --- | --- | --- |
| CustomBounce failed because CustomEase was not registered. | Registered CustomEase before CustomBounce. | Hero finishes with all five caps visible; no exception. |
| Hero signature was keyboard-only. | Converted title caps to buttons and unified touch/keyboard input. | Touch cap, keyboard, focus activation pass at phone and desktop sizes. |
| Passive TypeLine weakened the page arc. | Replaced it with the persistent live Soundprint instrument. | Input, switch selection, signal status, and replay form one loop. |
| Fake group-buy form submitted nowhere. | Replaced it with a functional replay control. | Replay moves to the trace, scans it, and plays the latest strokes. |
| Soundprint strength was arbitrary. | Derived amplitude from real cadence and available pointer pressure. | First input and measured interval/pressure are reported live. |
| Judges could miss the signature interaction. | Added one silent factory cap-to-trace demonstration after the intro. | Factory trace self-demonstrates without changing live count. |
| Inactive anatomy labels failed contrast. | Removed container opacity and used explicit dim text colors. | Accessibility reached 100. |
| Google Fonts delayed mobile rendering. | Self-hosted two Latin WOFF2 subsets and preloaded them. | Mobile Lighthouse improved from 92–99 to 99–100. |
| Starter favicon and missing social image. | Added original keycap favicon and 1200 × 630 OG image. | Assets load from the production build. |

## Independent creative reviews

- Initial build: 77/100, shortlist quality but not podium-safe.
- Soundprint revision: 87.5/100, credible podium contender.
- Cadence/pressure and self-demonstration revision: 91.5/100, top-three capable but not guaranteed.

## Remaining production checks

- Webflow Cloud URL and build log: pending first deployment.
- Deployed Safari/WebKit and Firefox verification: pending live URL.
- Real physical iPhone/Android hardware: cannot be fully emulated; responsive and touch behavior passed browser emulation.
