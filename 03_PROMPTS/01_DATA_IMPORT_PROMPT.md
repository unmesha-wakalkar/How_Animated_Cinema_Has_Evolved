# DATA IMPORT PROMPT

Import the supplied JSON files. Treat `films_master.json` as source-of-truth records. Use `story_metrics.json` for precomputed aggregates. Do not modify the source data in memory except for UI-specific formatting.

Create TypeScript types for every field actually used. Add defensive null handling. Never substitute 0 for missing numeric values.
