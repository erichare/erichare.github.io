# Design QA

## Visual truth

- Selected reference: generated Direction 1 editorial concept (external design artifact).
- Final reference/build comparison: completed at 765 x 1024.
- Final build capture: completed at 1280 x 720.
- Full-page desktop comparison: completed at 1440 x 1024.

## Viewports and states checked

- Desktop: 1440 x 1024 and 1280 x 720, light and dark themes.
- Reference-width comparison: 765 x 1024, light theme.
- Mobile: 390 px and 320 px widths, including the expanded navigation state.
- Primary routes: home, Work, project detail, Research, Writing, About, CV, Now, and 404.

## Comparison findings

- The implementation matches the selected direction's warm paper palette, forest-green accents, serif/sans/mono hierarchy, editorial rules, split hero, proof strip, image-led project sequence, writing list, and contact band.
- Real project screenshots replace fabricated interface artwork. The generated evidence-map asset is restrained and sized for the hero slot.
- Responsive reflow differs intentionally from the downsampled reference: proof points become a 2 x 2 grid and the hero gains vertical space at narrower widths.
- No remaining P0, P1, or P2 visual issues were found.
- P3 follow-up: the About portrait uses the best existing source image and could be upgraded when a higher-quality photograph is available.

## Interaction and accessibility checks

- Desktop and mobile navigation links work; Escape closes the mobile menu and restores focus.
- The mobile menu closes when the viewport returns to desktop size.
- Theme control switches light/dark state and exposes the correct action label.
- Current-page semantics are exact; Research remains visually grouped without incorrectly marking Publications as the current PhD page.
- No horizontal overflow at 320 px, including the CV page.
- Light-theme subtle text contrast is at least 4.5:1.
- Browser console errors: 0.

## Verification

- `npm run check`: passed, 27 files, 0 errors, 0 warnings, 0 hints.
- `npm run build`: passed, 20 pages generated.
- `git diff --check`: passed.
- Lighthouse: Performance 98, Accessibility 100, Best Practices 100, SEO 100; LCP 2.2 s, CLS 0, TBT 0 ms.

final result: passed
