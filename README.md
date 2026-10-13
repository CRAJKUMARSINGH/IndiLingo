# IndiLingo

IndiLingo is a gamified learning platform for Indian languages. It combines short lessons, native-script practice, translation exercises, daily streaks, adaptive review, progress tracking, and leaderboards in one product.

This repository is the consolidated implementation of the strongest work from the Indore01–Indore12 build series. The milestone repositories remain historical references; active development happens here.

## Architecture

- apps/web — the canonical Vite + React web client with onboarding, language selection, learning paths, lesson player, review queue, leaderboard, and profile flows.
- packages/api-server — the canonical Express API and route composition.
- packages/db — the canonical Drizzle/PostgreSQL schema and database client.
- packages/curriculum — shared curriculum types and seed data.
- lib/api-spec — OpenAPI source of truth.
- lib/api-zod — generated runtime validation types.
- lib/api-client-react — generated React Query client.

The repository deliberately has one frontend, one API server, and one database package. Generated or experimental agent snapshots are not part of the runtime workspace.

## Development

Requirements: Node.js 24 or newer and pnpm.

1. Copy .env.example to .env and set DATABASE_URL for database-backed features.
2. Run pnpm install.
3. Run pnpm dev to start the web app and API server.
4. Run pnpm run typecheck before committing.
5. Run pnpm run build for a production build.

Useful focused commands:

- pnpm run dev:web — web client only.
- pnpm run dev:api — API server only.
- pnpm run seed — seed the canonical curriculum.
- pnpm run serve — preview the built web client.

Never commit .env or other credentials. Keep secrets in the local environment or the deployment secret store.

## Source builds (retired)

All milestone repositories from the Indore build series have been fully integrated into IndiLingo and retired. Integration ledgers are in `docs/integrations/`.

- Indore01 *(retired)*: 200-week strategic roadmap, earliest api-server scaffold
- Indore02 *(retired)*: platform-wide stats API, full DB schema, contract-first architecture, Indori localization
- Indore03 *(retired)*: React Native/Expo app, offline-first state, curriculum data with Devanagari script
- Indore04 *(retired)*: mobile lesson flow, onboarding, review, leaderboard, profile
- Indore05 *(retired)*: web platform architecture, admin/quiz apps, API route coverage
- Indore06 *(retired)*: evaluation report, leaderboard/stats patterns, curriculum seeding
- Indore07–Indore09: advanced feature iterations, absorbed into packages

See `MERGE_SUMMARY.md` and `docs/integrations/` for the full integration record.


## Indore10–12 consolidation

The Indore10, Indore11, and Indore12 source builds have been reviewed and integrated into the canonical runtime. See docs/integrations/INDORE10-12.md for the source-to-destination ledger and the deliberate duplicate-workspace exclusions.
