# SK Heritage redesign QA

**Comparison target**

- Source visual truth: `/Users/lptable/Desktop/1클래식_메인홈.png`
- Source pixels: 1920 × 7052
- Implementation: `http://localhost:5174/`
- Viewport: 1920 × 1080 CSS px
- Browser evidence: `qa-places.png`, `qa-history.png`, `qa-object.png`, `qa-lower.png`, and `qa-footer.png`
- State: desktop, Korean, initial History and Beautiful Places positions, language menu closed

**Findings**

- No actionable P0, P1, or P2 mismatch remains.
- The implementation height is 7058px, six pixels from the 7052px source. Section order and the large vertical beats match the supplied artwork.
- Beautiful Places uses the requested warm-beige editorial layout with two narrow side previews, one featured place, working side controls, and the supplied architectural imagery.
- History uses the supplied replacement images in grayscale and preserves the asymmetric 1950/1953/1966 composition. Its next control exposes the continuation card without horizontal page overflow.
- Object uses all supplied object pairs. The monochrome layer is the default and CSS crossfades to the color layer on card hover. Image boxes are fixed and do not create an independent scroll container.
- The memorial banner uses the supplied wide archival image with grayscale and the dark overlay from the source.
- The story rail and new gray footer follow the source composition. The footer uses the supplied `SK Heritage` logo asset.
- Typography roles remain consistent: Pretendard for navigation and UI, Nanum Myeongjo for Korean editorial copy, Prociono for Latin display headings and years, and Noto Serif KR for the hero glyphs.
- Text rises over 1.45 seconds with 170ms line staggering. The approved hero ray and S/K blur sequence remains intact.

**Primary interactions tested**

- Beautiful Places left/right preview buttons update the selected place.
- History arrows move between the initial and continuation compositions.
- Story arrows scroll the clipped story rail.
- Language menu, anchor links, and CTAs remain keyboard-focusable.
- Object default/hover layers are paired for all three cards.
- Responsive inspection at 1440 × 900 found no horizontal document overflow; the hero remains one viewport tall beneath the GNB.
- Browser DOM inspection found all headings, images, descriptions, controls, and footer content present.
- Production build and Sites worker tests pass.

**Implementation checklist**

- [x] New full-page section architecture
- [x] Supplied place, History, Object, banner, and footer assets
- [x] Grayscale History imagery
- [x] Object monochrome-to-color hover behavior
- [x] New footer with supplied logo
- [x] 1920px desktop and 1440px responsive verification
- [x] Production build and local browser verification

final result: passed
