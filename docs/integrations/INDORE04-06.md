# Indore04–06 integration ledger

This ledger records the consolidation of the three milestone repositories into the active `IndiLingo` implementation. The milestone repositories were reviewed at the commits below before consolidation:

| Source | Reviewed commit | Distinct contribution retained in IndiLingo |
| --- | --- | --- |
| [Indore04](https://github.com/CRAJKUMARSINGH/Indore04) | `aeef47d0c1113d25101f4cdf0994573bc9b5f463` | Mobile lesson flow, onboarding, review, leaderboard, profile, script practice, and curriculum patterns |
| [Indore05](https://github.com/CRAJKUMARSINGH/Indore05) | `85d33531860ae18fed7f65c85ffc0bc6058fc1c0` | Web learning/progress experience, API route coverage, and code-junction learning material |
| [Indore06](https://github.com/CRAJKUMARSINGH/Indore06) | `25967a8b59441e042d5c8aa5fc797db6bd2bfe12` | Evaluation findings, leaderboard/stats/progress patterns, and curriculum seeding material |

## Canonical destinations

The active runtime has one source of truth for each concern:

- Web client: `apps/web`
- API: `packages/api-server`
- Database schema: `packages/db`
- Curriculum and exercise model: `packages/curriculum`
- Generated API contract/client: `lib/api-spec`, `lib/api-zod`, and `lib/api-client-react`

The retained product behavior is exposed through the canonical onboarding, language selection, learning path, lesson, review, leaderboard, and profile flows. Duplicate milestone app shells are not added to the runtime workspace because they would create competing frontends and conflicting package contracts.

## Verification notes

- The destination lockfile was regenerated because the previous committed file contained duplicate YAML keys and could not be installed by pnpm.
- The duplicate historical frontend under `apps/web/src/src` was removed from the runtime compilation set; the canonical pages under `apps/web/src/pages` remain active.
- The milestone repositories remain available in Git history until this consolidation is verified. They are scheduled for deletion only after the destination push and post-push repository checks succeed.
