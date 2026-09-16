# MASTER GOOGLE AI STUDIO BUILD PROMPT

You are building a production-quality single-page interactive data story called **From Storytelling to Industry — How Animated Cinema Evolved**.

## 1. Product goal
Create an immersive, cinematic, Apple-like interactive website that feels inspired by the visual language of animated cinema. It must teach visitors how animation changed over time while letting them independently explore the film archive. The page is a narrative first and archive second; it must not look like a generic analytics dashboard.

## 2. Audience
Visual communication designers, animation/storytelling students, film/animation enthusiasts and curious general audiences.

## 3. Non-negotiable research discipline
Do NOT assume or state that animation simply changed from “art” to “commercial entertainment.” This is a hypothesis, not a fact. Present evidence, show uncertainty, and let the data support the final interpretation.

## 4. Stack
Use Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, D3/Recharts where justified, and Lucide icons. Keep the page responsive and performant.

## 5. Data files
Use these files from the supplied package:
- `02_DATA/JSON/films_master.json`
- `02_DATA/JSON/story_metrics.json`
- `02_DATA/JSON/facets.json`
- `02_DATA/JSON/historical_timeline.json`
- `02_DATA/JSON/editorial_film_selection.json`
- `02_DATA/JSON/source_manifest.json`
- `02_DATA/JSON/video_sources.json`
- `02_DATA/JSON/visual_system.json`
- `02_DATA/JSON/interaction_spec.json`

## 6. Page experience
### Hero
Open with a cinematic composition: near-black background, large editorial title, one animated particle/line that becomes the timeline. Include a concise thesis setup and a “Begin the story” control.

### Timeline
Create an interactive timeline spanning the dataset’s historical range. Use decade markers and selected films. Add external historical milestones from `historical_timeline.json`. Let users drag/scroll/zoom. Clicking a milestone opens a modal.

### Evolution of technique
Show how animation style categories vary by decade. Use an animated stacked area/stream or another semantically suitable time-series visualization. The visual transition itself can morph between eras.

### Story patterns
Let users choose genre/theme/audience lenses. Use normalized list fields instead of parsing composite strings in the UI. Provide explanatory captions and show counts.

### Industry
Show studio and country patterns. Avoid misleading studio rankings when strings are non-canonical. Clearly label counts as records, not necessarily unique productions.

### Business
Show budget vs box office only for complete-case records. Include the exact sample size and a “data coverage” note. Never render missing values as zero.

### Archive
Build a fast searchable/filterable film explorer. Do not render 25K cards at once. Use virtualization or paginated results. Each result opens a Film Dossier modal.

### Film Dossier
Include poster/backdrop, title, year, studio, style, genres, theme, runtime, rating, votes, popularity, budget, box office when available, and buttons to TMDB/IMDb. Provide a compact source line.

### Comparison
Allow up to three films to be selected and compare them in a modal using small multiples.

### Research media
Where a credible video exists in `video_sources.json`, embed it in a modal. Do not autoplay audio.

### Sources
Provide a small persistent footer link to a Sources & Methodology modal. List source name, URL, and what it was used for.

## 7. Visual system
Use the palette/type/motion principles in `visual_system.json`. The visual goal is cinematic minimalism. Use very large typography, high contrast, full-bleed media, subtle grain if performant, and highly polished spacing.

## 8. Motion rules
Use Framer Motion for scroll reveals, timeline continuity, modal transitions, chart morphing and filter transitions. Motion must correspond to actual interface state. Respect `prefers-reduced-motion`.

## 9. UX rules
- Keep all core interaction on the same page.
- Use modals/drawers for deep dives.
- Preserve filter state when closing a modal.
- Provide visible reset controls.
- Support keyboard navigation.
- Make the archive usable on mobile.

## 10. Performance rules
- lazy-load media
- virtualize/paginate film archive
- precompute aggregates rather than calculating 25K records on every render
- do not mount thousands of nodes at once
- avoid huge background video files unless lightweight and justified

## 11. Crediting
Keep source/backlink text minimal but discoverable. Never remove attribution.

## 12. Deliverable
Return a polished, deployable Next.js project with clean components, a clear data layer, responsive behavior, accessible modals and a visually cohesive cinematic identity. Avoid generic dashboards, stock-looking UI cards and excessive decoration.
