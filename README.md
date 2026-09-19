# IndiLingo

IndiLingo is a gamified learning platform for Indian languages. It combines short lessons, native-script practice, translation exercises, daily streaks, adaptive review, progress tracking, and leaderboards in one product.

This repository is the consolidated implementation of the strongest work from the Indore01–Indore09 build series. The milestone repositories remain historical references; active development happens here.

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

## Source builds

- Indore01: https://github.com/CRAJKUMARSINGH/Indore01
- Indore02: https://github.com/CRAJKUMARSINGH/Indore02
- Indore03: https://github.com/CRAJKUMARSINGH/Indore03
- Indore04: https://github.com/CRAJKUMARSINGH/Indore04
- Indore05: https://github.com/CRAJKUMARSINGH/Indore05
- Indore06: https://github.com/CRAJKUMARSINGH/Indore06
- Indore07: https://github.com/CRAJKUMARSINGH/Indore07
- Indore08: https://github.com/CRAJKUMARSINGH/Indore08
- Indore09: https://github.com/CRAJKUMARSINGH/Indore09
- Integration ledgers: docs/integrations/INDORE04-06.md and docs/integrations/INDORE07-09.md
- IndiLingo: https://github.com/CRAJKUMARSINGH/IndiLingo
