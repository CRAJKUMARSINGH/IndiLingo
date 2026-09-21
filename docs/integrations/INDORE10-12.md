# Indore10–12 integration ledger

Reviewed source heads:

- Indore10: 0038d8f6ec61089d7b33d54809896736bc705963
- Indore11: b000e918dfc4ed9673159844217aca2886ad76cc
- Indore12: 4276fa2bb2f9deca08f6492af30dac0ff75ff157

## Integration decision

The three repositories are parallel Replit artifact snapshots of the IndiLingo work, while this repository is the canonical monorepo. The merge keeps one production frontend, one API server, and one database package. Copying the snapshots wholesale would add duplicate workspaces and incompatible generated/database contracts.

## Contribution mapping

| Source | Reviewed contribution | Canonical destination | Result |
| --- | --- | --- | --- |
| Indore10 | 15-language curriculum, script/alphabet-first lesson flow, lesson exercise UI, generated API contracts, CI/docs | apps/web, packages/curriculum, lib/api-spec, lib/api-client-react, lib/api-zod | Verified against the existing canonical curriculum, lesson player, and generated clients; no duplicate artifact workspace copied |
| Indore11 | review/mistake-tracking pass, lesson/player variants, generated contract refinements, visual asset | packages/api-server/src/routes/review.ts, packages/db/src/schema/exerciseMistakes.ts, apps/web/src/pages/Review.tsx | The canonical review API and persistence schema already contain the behavior; the older parallel page variants were not introduced as dead routes |
| Indore12 | final UI/API snapshot, exercise mistake endpoints, lesson progress schema, deployment/support assets | packages/api-server/src/routes/review.ts, packages/db/src/schema/lessonProgress.ts, apps/web, lib/api-spec | Verified against the canonical UUID/text schema and route composition; the snapshot's duplicate serial/integer schema was intentionally not used |

## Deliberately excluded

- artifacts/indilingo, artifacts/api-server, and artifacts/mockup-sandbox as runtime workspaces: they duplicate the canonical apps/web and packages/api-server workspaces.
- Generated files that would overwrite the canonical API contract without a source-contract change.
- The source drafts' database tables where their integer IDs conflict with the canonical UUID/text identifiers.

The source repositories are ready for retirement after this verified canonical commit.
