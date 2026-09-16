# Data Cleaning Rules

1. Preserve all RAW CSVs unchanged.
2. Use `films_master_cleaned.csv` and `films_master.json` for application work.
3. Treat `Movie_ID`/`TMDB_ID` as identifiers; never aggregate by title alone.
4. Normalize boolean flags.
5. Normalize multi-value categorical strings into `Genre_List`, `Target_Audience_List`, `Production_Company_List`, and `Spoken_Language_List`.
6. For historical charts, exclude `Is_Future_Release=True`.
7. For “released feature film” views, use `Is_Usable_Released`.
8. For business analysis, use records with both `Budget_Million_USD` and `Box_Office_Million_USD`; display the sample-size caveat.
9. For rating comparisons, show vote counts and avoid interpreting low-vote records as equivalent to high-vote records.
10. Never replace missing business values with zero.
11. Preserve source URLs in every film dossier where available.
