# Data Audit

## Primary dataset
`animation_movies_enriched_1878_2029.csv`

- Records: **25,390**
- Fields: **44**
- Year range: **1878–2029**
- Released: **24,913**
- Future releases flagged: **253**
- TV compilations flagged: **72**
- Adult-content records flagged: **241**

## Coverage that matters
- Animation style: 24,999 populated records.
- Budget: 1,458.
- Box office: 1,642.
- Both budget and box office: 777.
- TMDB rating: 16,118.
- Poster/backdrop media available: 22,140.

## Major data-quality cautions
- Business fields are sparse; do not infer industry economics from the full catalog.
- Genre and audience fields use inconsistent multi-value separators; normalized list fields are provided.
- Runtime contains extreme values; use the verification flag and plausibility checks.
- 2020s includes planned/future releases; exclude these from historical analysis unless explicitly presenting future plans.
- Studio/company strings are not a clean canonical taxonomy and may contain multiple producers.
