# Indore07–09 integration ledger

These milestone repositories were reviewed before consolidation into the active `IndiLingo` runtime:

| Source | Reviewed commit | Distinct contribution retained |
| --- | --- | --- |
| [Indore07](https://github.com/CRAJKUMARSINGH/Indore07) | `5570a002115c5869a563dd72d73666cc170804d0` | Competition application, evaluation API patterns, leaderboard/statistics flows, and judging material |
| [Indore08](https://github.com/CRAJKUMARSINGH/Indore08) | `60f37bfb8b83b80b2d905bfc92eee04297814406` | Mobile learning milestone, onboarding/lesson navigation patterns, and competition evaluation notes |
| [Indore09](https://github.com/CRAJKUMARSINGH/Indore09) | `2ce22d6fb87c3c72e35bb20cb47bac5c4868c368` | Expanded Expo/web bundle, speech and curriculum hooks, contribution guides, screenshots, and deployment material |

## Canonical integration

The active runtime remains intentionally singular:

- `apps/web` owns the canonical user experience.
- `packages/api-server` owns the API.
- `packages/db` owns persistence.
- `packages/curriculum` owns shared learning content and exercise contracts.
- `lib/api-spec`, `lib/api-zod`, and `lib/api-client-react` own the API contract and generated client.

The milestone-specific behavior is represented through the canonical onboarding, lesson, progress, leaderboard, profile, curriculum, and review flows. The repositories also contained duplicate artifact shells and repeated UI libraries; copying those into the runtime would create competing package contracts rather than improve the product.

The original patch archives for Indore07, Indore08, and Indore09 remain under `attached_assets/indore_patches/` in `IndiLingo` as an audit trail. This ledger is the human-readable mapping from those milestones to the active implementation.

## Verification gate

The destination branch must be pushed and checked before the three source repositories are removed. Repository deletion is separate from code consolidation and requires GitHub's `delete_repo` OAuth permission.
