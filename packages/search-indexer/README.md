# @longhollow/search-indexer

Transitional indexing core package for the Vercel Queues migration.

## Purpose
- Provide shared, testable indexing orchestration primitives.
- Keep queue/provider wiring outside the package.
- Enforce no-wipe full rebuild behavior (temp index + validate + atomic swap).

## Exports
- `runFullRebuild(...)`
- `MESSAGE_TYPES`
- `RUN_STATUSES`
- `isSupportedMessageType(...)`
- `buildDedupeKey(...)`

## Adapter Boundaries
The package depends on injected adapters instead of concrete services:
- `algolia`
- `content`
- `staff`
- `runState` (optional)

This allows the same core behavior to be reused while migration is in progress.
