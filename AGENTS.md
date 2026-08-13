# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

The user requires an exact 1920px-faithful recreation of `public/assets/reference.png`, not an approximate interpretation. Use the supplied original image assets without stylistic substitution.

Motion direction: use a subtle first-entry hero background zoom and Kononenko-style line masks (`translateY(101%)` to rest) for site text. Keep the main hero horizontal line free of this motion because it will receive a separate interaction later.

Site-wide text reveal pacing: use a calm 1.45-second rise with a 170ms line stagger so section copy never appears abruptly.

Exhibition rail behavior: keep the exhibition cards as a fixed clipped horizontal composition with no horizontal scrolling or arrow controls. The page must still scroll vertically, while individual image boxes remain fixed and never scroll or drift independently.

Hero identity transition: after the initial `鮮` and `京` glyph rise animations have fully completed, hold them for 2 seconds, then use a slow, spacious overlapping cross-blur to transform them into `S` and `K` in place. Keep the Korean labels and English captions visible beneath them.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
