# IndiLingo

IndiLingo is a gamified Indian-language learning platform with short lessons, script practice, adaptive review, streaks, and leaderboards.

## Run and operate

- pnpm dev — start the web client and API server.
- pnpm run dev:web — start only the Vite web client.
- pnpm run dev:api — build and start only the API server.
- pnpm run typecheck — typecheck shared libraries and all active workspace packages.
- pnpm run build — typecheck and build the active workspace.
- pnpm run seed — seed the canonical curriculum.
- pnpm --filter @indilingo/db run push — push schema changes to a development database.

Required environment: DATABASE_URL for database-backed features. Keep secrets in .env locally or in the deployment secret store; never commit them.

## Where things live

- apps/web: canonical React/Vite client.
- packages/api-server: Express routes and API entrypoint.
- packages/db: Drizzle schema and database client.
- packages/curriculum: curriculum types and seed data.
- lib/api-spec: OpenAPI contract.
- lib/api-zod and lib/api-client-react: generated validation and client libraries.

## Architecture decisions

- The active runtime has one frontend, one API server, and one database package.
- OpenAPI is the contract source; generated Zod and React Query clients are shared by the app.
- The database schema lives in packages/db; the old duplicate lib/db package is not part of the workspace.
- Learning progress and mistakes are persisted through the API, while the web client provides a responsive lesson experience.
