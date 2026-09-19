# IndiLingo integration record

This commit consolidates the usable implementation from Indore01 through Indore06 into the IndiLingo runtime. The Indore04–06 review and mapping is recorded in docs/integrations/INDORE04-06.md.

## Kept as the source of truth

- apps/web: onboarding, language selection, learning path, lesson player, review, leaderboard, and profile flows.
- packages/api-server: Express API routes for health, languages, lessons, units, users, leaderboard, and review.
- packages/db: Drizzle/PostgreSQL schema used by the API and curriculum seed.
- packages/curriculum: shared exercise model and curriculum seed.
- lib/api-spec, lib/api-zod, and lib/api-client-react: API contract and generated clients.

## Removed from the runtime workspace

- vERTICAL candidate-bundle copies.
- Duplicate agent snapshots under artifacts/.
- The old lib/db package and nested duplicate scripts package.
- The committed .env file and stale migration/integration scratch documents.

## Runtime fixes

- Root dev and serve commands now target the canonical packages.
- API dev builds before starting, so a clean checkout can run it without a pre-existing dist directory.
- Typecheck covers apps, shared libraries, packages, scripts, and tests.
- Database references and seed scripts now use @indilingo/db consistently.

The source repositories are preserved as historical references until the destination is verified; this repository is the active integration target.
