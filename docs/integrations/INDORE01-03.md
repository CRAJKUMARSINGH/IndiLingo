# Indore01–03 integration ledger

This ledger records the consolidation of the three earliest milestone repositories into the active `IndiLingo` implementation. The milestone repositories were reviewed at the commits below before consolidation:

| Source | Reviewed commit | Distinct contribution retained in IndiLingo |
| --- | --- | --- |
| [Indore01](https://github.com/CRAJKUMARSINGH/Indore01) | `1fb43d71246baa10065f4ea9a22dfab1cb35d032` | 200-week strategic product roadmap (ACTION_PLAN_200_WEEKS.md), earliest api-server build scaffold baseline |
| [Indore02](https://github.com/CRAJKUMARSINGH/Indore02) | `d6ed16776c7b46fccd4da813dda55e5bfeee44e2` | Platform-wide stats API (GET /stats/overview + GET /stats/unit-progress), sinusoidal learn map, full Drizzle DB schema, contract-first API architecture, Indori cultural localization copy |
| [Indore03](https://github.com/CRAJKUMARSINGH/Indore03) | `07e2918c4e0a219f2814a3a2af536b6427d2fb7e` | React Native / Expo mobile app, offline-first AppContext with wordBank/hearts/weeklyXp/badges, haptic feedback + auto-advance exercise flow, podium leaderboard, weak-word review screen, curriculum data with Devanagari script + transliteration, useColors dark/light token hook, CONTRIBUTORS.md, netlify.toml + vercel.json deployment configs |

## Canonical destinations

The active runtime has one source of truth for each concern:

- Web client: `apps/web`
- API: `packages/api-server`
- Database schema: `packages/db`
- Curriculum and exercise model: `packages/curriculum`
- Generated API contract/client: `lib/api-spec`, `lib/api-zod`, and `lib/api-client-react`
- Strategic roadmap: `ACTION_PLAN_200_WEEKS.md`

## What was retained and where

### From Indore01
- **`ACTION_PLAN_200_WEEKS.md`** — Added to the repository root as the canonical long-term product roadmap. Defines 200 weeks of feature development across 4 phases: Foundation, Lesson Engine, Multi-Language, and Scale. Targets include audio integration (Week 6), spaced repetition (Week 9), dark mode (Week 11), and 5-language expansion.

### From Indore02
- **Platform stats API** — `packages/api-server/src/routes/stats.ts` — two new endpoints:
  - `GET /stats/overview` — platform-wide aggregate: total users, completions, avg XP, active streaks
  - `GET /stats/unit-progress` — per-unit completion rate breakdown across all users
- **DB schema patterns** — Indore02's Drizzle schema was the foundation for IndiLingo's `packages/db`. All 4 tables (users, lessons, exercises, progress) are present in evolved form with UUID PKs, text-based exercise IDs, and additional columns (hearts, romanization, nativeScript, exerciseMistakes).
- **Sinusoidal learn map concept** — The Math.sin zigzag Duolingo-style lesson path is implemented in `apps/web/src/pages/Learn.tsx`.
- **Contract-first architecture** — The `lib/api-spec` OpenAPI source-of-truth pattern and Orval codegen pipeline originate from Indore02's approach and are the backbone of IndiLingo's API layer.
- **Indori cultural localization** — "Ram Ram", "Bhiya", "ek number!" copy patterns absorbed into the web app voice.

### From Indore03
- **Offline-first state management** — The AppContext pattern (wordBank, hearts, weeklyXp, badges, streak logic) is reflected in `apps/web/src/lib/store.ts` and `apps/web/src/lib/progress.ts`, and backed by `packages/db/src/schema/exerciseMistakes.ts` and the `hearts` column on `usersTable`.
- **Curriculum data model** — The `promptScript`, `promptTranslit`, and `hint` fields from Indore03's `curriculum.ts` appear as `nativeScript` and `romanization` in `packages/db/src/schema/exercises.ts`. IndiLingo's `apps/web/src/data/curriculum.ts` expands this to 15 languages.
- **Exercise interaction model** — Auto-advance, animated feedback, and WORD_ORDER / MATCH_PAIRS exercise types are implemented in `apps/web/src/pages/Lesson.tsx`.
- **Review / weak-word screen** — `apps/web/src/pages/Review.tsx` implements the spaced-repetition review queue backed by `exerciseMistakesTable`.
- **Podium leaderboard** — Top-3 podium UI is in `apps/web/src/pages/Leaderboard.tsx`.
- **Deployment configs** — `netlify.toml` and `vercel.json` at the repo root originate from Indore03.

## Verification notes

- IndiLingo's DB schema is a superset of all three source repos: UUID primary keys (vs integer serial in Indore02), text-based exercise IDs, `hearts` column on users, `exerciseMistakesTable` (the server-side equivalent of Indore03's `wordBank`), `script_practice` exercise type.
- IndiLingo's curriculum covers 15 languages vs Indore03's single-language Hindi curriculum.
- The milestone repositories remain available on GitHub until this consolidation is verified. They are scheduled for deletion after the destination push is confirmed.
