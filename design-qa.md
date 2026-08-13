# SK Heritage design QA

**Comparison target**

- Source visual truth: `/Users/lptable/Documents/Codex/2026-08-13/w/sk-heritage/public/assets/reference.png`
- Source pixels: 1920 × 5458
- Implementation: `http://localhost:5173/`
- Implementation evidence: `/Users/lptable/Documents/Codex/2026-08-13/w/sk-heritage/qa-impl-0.png` through `qa-impl-5.png`
- Combined comparison evidence: `/Users/lptable/Documents/Codex/2026-08-13/w/sk-heritage/qa-comparison.png` (1920 × 2202)
- Motion reference: `https://kononenkogroup.com/`
- Motion comparison evidence: `/Users/lptable/Documents/Codex/2026-08-13/w/sk-heritage/motion-comparison.png`
- Viewport: 1920 × 734 CSS px; rendered content width 1905 px because of the vertical scrollbar
- Device pixel ratio: 1
- State: desktop, Korean, initial carousel positions, language menu closed
- Density normalization: source crops were rendered at 50%; implementation captures (1905 × 728) were normalized to 960 × 367 beside matching 960 × 367 source crops.

**Findings**

- No actionable P0, P1, or P2 mismatch remains.
- Fonts and typography: GNB uses Pretendard; body text uses Nanum Myeongjo; `History` and year numerals use Prociono; hero hanja uses Noto Serif KR/CJK. Display scale, line height, and wrapping match the source at 1920px.
- Spacing and layout rhythm: section boundaries, 80px left alignment, 505px exhibit rail start, 625px history imagery, horizontal overflow, and 5450px page rhythm align with the source.
- Colors and visual tokens: black GNB, warm white canvases, brown heritage accent, green-black CTA, and dark blue-green legacy overlay match the visual reference.
- Image quality and asset fidelity: every prominent image uses the supplied source asset. The footer identity and accessibility mark use exact raster crops from the supplied source rather than code-drawn approximations.
- Copy and content: all visible section headings, years, hero labels, primary CTAs, and card copy are present in the intended Korean hierarchy.
- Motion: the hero background eases from scale `1` to `1.06` over 3.2 seconds. Text lines move from `translateY(108%)` while their own `clip-path` opens continuously, avoiding the delayed font-edge pop caused by releasing a parent overflow mask. Lines retain 90ms staggering and a `.9s` ease. All non-hero images remain static by final direction. The main horizontal hero line remains static for its future dedicated interaction.

**Focused region evidence**

- Hero/GNB: `qa-impl-0.png`
- History typography and three-image composition: `qa-impl-1.png`
- Exhibit intro, 505px rail origin, object scaling: `qa-impl-2.png`
- Legacy image crop and overlay density: `qa-impl-3.png`
- Story order, card scale, partial edge cards: `qa-impl-4.png`
- Footer brand and WA mark: `qa-impl-5.png`

**Comparison history**

1. Initial pass found two P2 differences: the exhibit rail began too far right and the story rail exposed the ship card first instead of the loom-room card. The grid origin was corrected to 505px and a preceding partial card was added. Post-fix evidence: `qa-impl-2.png`, `qa-impl-4.png`.
2. Second pass found two P2 differences: the exhibit introduction wrapped to four lines and the legacy overlay was too light. The intro width/font metrics and overlay opacity were corrected. Post-fix evidence: `qa-impl-2.png`, `qa-impl-3.png`.
3. Footer QA found a P2 asset-fidelity issue because the initial footer marks were text/CSS approximations. They were replaced by exact raster assets from the provided reference. Post-fix evidence: `qa-impl-5.png`.
4. Motion pass compared the Kononenko background/text entrance with the SK implementation at 100ms, 600ms, and 1800ms. The SK hero reaches the same masked line-rise behavior without changing the approved resting layout. Post-fix evidence: `motion-comparison.png`, `motion-history-start.png`, and `motion-history-end.png`.
5. Follow-up motion QA replaced post-animation `overflow` release with a per-line animated `clip-path`, removing the visible end-frame snap and preserving complete ascenders/descenders. Image reveal observers were moved to their visible cards while crop animation remains on their inner media, ensuring all non-hero images trigger consistently. Browser inspection confirmed final text `overflow: visible`, fully open text clip paths, and History image delays of `0s`, `0.14s`, and `0.28s`.
6. Image entrance animation was removed from all non-hero imagery by final direction. History, exhibit, legacy, and story images now render immediately; the hero zoom and text reveals remain unchanged.
7. Hero focal-point QA used the supplied 1920×1080 `Draft.png` as the head-space target. The hero image now uses `object-position: 50% 0` and `transform-origin: 50% 0`, so its 1.06 entrance zoom grows downward from the top edge instead of center-cropping the subject's head. Browser inspection at the settled frame confirmed the top anchor and full zoom transform with no layout shift in the GNB.
8. Hero sequence direction was rebuilt around the supplied four-frame references. The background settles from 1.025 to 1 while the GNB stabilizes first; one 420px axis duplicates into 24 closely spaced rays, returns to the exact same 420px axis, and then the primary axis expands to 1100px. There is no independent stationary line layer. The hanja begins only after the long-line phase, followed by Korean copy, English copy, and CTA. Browser checks at 1.0s, 1.9s, 3.0s, 3.9s, 4.7s, and 6.1s confirmed the single-line continuity, 23 secondary rays, full convergence, shorter final length, and absence of console errors.
9. Rotation direction was unified by final direction: all 24 secondary rays rotate clockwise from the initial axis, continue in that same direction, and converge at the equivalent 180-degree horizontal axis. No ray reverses direction during convergence. Secondary ray thickness is 1.5px for clearer motion continuity while the primary axis remains 2px.
10. Intro pacing was relaxed: the initial 420px axis reaches its resting length at about 1.65s and remains alone through 1.95s before the 24 rays become visible. The rotation duration is 2.2s, followed by a clean merged-axis pause before final expansion. Hanja, copy, English line, and CTA were shifted later to preserve the new breathing room. Browser checks confirmed 0 secondary rays at 1.65s and 1.95s, 24 during rotation at 2.5s, and 0 after convergence at 4.45s.
11. Each left and right hero word group now reveals as three independent lines—hanja, Korean reading, and English label—with 170ms staggering. Each line uses its own translate-and-clip reveal so the group no longer rises as a single block. Browser inspection at 5.55s and 5.85s confirmed distinct progressive opacity and transform values across all three rows with no console errors.

**Primary interactions tested**

- Korean language menu opens and closes; English option becomes visible.
- Exhibit carousel next control changes the rail from `scrollLeft: 0` to `scrollLeft: 294`.
- Anchor navigation and CTA links are present and keyboard-focusable.
- Hero entry zoom progresses from scale `1.002` to `1.059` and settles at `1.06`.
- Rotating rays fully converge before the primary line begins its final expansion, with an approximately 0.6-second visual pause.
- History and subsequent section copy stays masked before intersection, then reveals line-by-line once per section.
- Reduced-motion preference disables both zoom and line transforms.
- Browser console errors checked: none.

**Implementation Checklist**

- [x] 1920px desktop composition
- [x] Supplied imagery placed without placeholders
- [x] Required font families assigned by UI role
- [x] Navigation, dropdown, anchors, and carousels functional
- [x] Production build and local browser verification

**Follow-up Polish**

- No blocking polish remains for the supplied 1920px target.

final result: passed
