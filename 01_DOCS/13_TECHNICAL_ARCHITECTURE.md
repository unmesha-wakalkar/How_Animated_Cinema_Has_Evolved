# Technical Architecture

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- D3.js or Recharts where chart semantics are appropriate
- Lucide icons

## Data
Load `films_master.json` client-side only if performance permits; otherwise precompute compact derived JSON and use a search/index strategy.

## Performance
- lazy-load noncritical images
- virtualize long film lists
- do not render 25K DOM nodes
- paginate or virtualize archive results
- precompute aggregates in JSON

## URL behavior
Use query params or hash state for selected film/filter so a dossier can be bookmarked without leaving the page.
