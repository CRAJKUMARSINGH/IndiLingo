# IndiLingo integration record

This repository consolidates the usable implementation from the full Indore01–Indore09 build series into a single production-oriented monorepo.

Integration ledgers:
- docs/integrations/INDORE04-06.md — Indore04, Indore05, Indore06 review and mapping
- docs/integrations/INDORE07-09.md — Indore07, Indore08, Indore09 review and mapping

## Retired source repositories

The following milestone repositories have been fully reviewed, integrated, and retired. All distinct contributions are captured in IndiLingo. The repos have been deleted after the final verified push.

| Repo | Last reviewed commit | Key contribution |
| --- | --- | --- |
| Indore04 | `aeef47d0c1113d25101f4cdf0994573bc9b5f463` | Mobile lesson flow, onboarding, review, leaderboard, profile, script practice, curriculum patterns |
| Indore05 | `85d33531860ae18fed7f65c85ffc0bc6058fc1c0` | Web learning/progress experience, API route coverage, code-junction learning material |
| Indore06 | `25967a8b59441e042d5c8aa5fc797db6bd2bfe12` | Evaluation findings, leaderboard/stats/progress patterns, curriculum seeding material |

## Kept as the source of truth

- apps/web: onboarding, language selection, learning path, lesson player, review, leaderboard, and profile flows.
- packages/api-server: Express API routes for health, languages, lessons, units, users, leaderboard, and review.
- packages/db: Drizzle/PostgreSQL schema used by the API and curriculum seed.
- packages/curriculum: shared exercise model and curriculum seed.
- lib/api-spec, lib/api-zod, and lib/api-client-react: API contract and generated clients.

## Removed from the runtime workspace

- Vertical candidate-bundle copies.
- Duplicate agent snapshots under artifacts/.
- The old lib/db package and nested duplicate scripts package.
- The committed .env file and stale migration/integration scratch documents.
- Accidental nested IndiLingo clone directory.

## Runtime fixes

- Root dev and serve commands now target the canonical packages.
- API dev builds before starting, so a clean checkout can run it without a pre-existing dist directory.
- Typecheck covers apps, shared libraries, packages, scripts, and tests.
- Database references and seed scripts now use @indilingo/db consistently.

Active development continues in this repository. All Indore milestone repos are retired.
