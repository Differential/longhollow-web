# Vercel Queues Indexing Migration PRD

Owner: Web + Platform Engineering  
Status: Draft (Execution Started)  
Last Updated: 2026-03-05

## 1. Executive Summary

Move search indexing orchestration from Bull/Redis in `longhollow-apollos` to Vercel Queues in `longhollow-web`.

Phase 1 target is strict behavior parity with production today:
- Nightly full rebuild at 3:15 AM CT.
- Manual trigger support.
- No delta indexing in V1.

Critical reliability upgrade in V1:
- Eliminate wipe-first behavior (`clearIndex` before rebuild).
- Rebuild into a temporary index and atomically swap only after validation.
- If rebuild fails, live index remains unchanged.

## 2. Problem Statement

Current indexing can leave search empty when a full run fails after clearing the index. This creates an outage window until the next successful run.

Operational pain points:
- Queueing depends on Redis/Bull in the API service.
- Index safety is weak due to wipe-first flow.
- Rollback path is not centralized as a single operation.

## 3. Goals and Non-Goals

## Goals
- Migrate orchestration to Vercel Queues in `longhollow-web`.
- Preserve frontend index compatibility (`prod_ContentItem` and replica indices).
- Ship a safer full rebuild mechanism that prevents empty-index incidents.
- Provide one-click undo if migration degrades production behavior.
- Execute via an incrementally maintained PRD and phase checklist.

## Non-Goals (V1)
- Near-real-time delta indexing.
- Search UI redesign.
- Immediate permanent deletion of legacy Bull implementation before stabilization.

## 4. Current State

Active production path in `longhollow-apollos`:
- Uses custom search module: `src/data/Algolia.js`.
- Schedules only full index queue daily (`15 3 * * *`).
- No active delta queue in this path.

Legacy connector path has delta queue logic but is not the wired active path.

Risk in current path:
- Full index logic clears index first, then repopulates.
- If run fails mid-process, index can remain empty.

## 5. Target State Architecture

Primary orchestrator:
- Vercel Queue consumer(s) in `longhollow-web`.
- Vercel Cron to enqueue nightly full run at 3:15 AM CT.
- Authenticated manual trigger endpoint in web repo.

State and idempotency:
- Vercel KV for run state, shard completion, and dedupe keys.

Indexing execution:
- Transitional shared package (`@longhollow/search-indexer`) used by migration code.
- End-state after stabilization: consolidate indexer logic fully into `longhollow-web`; remove shared package.

## 6. Safety Design (Hard Requirement)

Never clear live index before rebuild.

Full rebuild flow:
1. Create temp index: `prod_ContentItem_tmp_<runId>`.
2. Apply index settings/replicas.
3. Populate temp index across all required channels and staff data.
4. Validate completion and expected integrity checks.
5. Perform atomic swap/move to live index.
6. Cleanup temp artifacts.

Failure handling:
- If any shard fails and finalize checks do not pass, do not swap.
- Live index remains last-known-good.

This requirement directly eliminates the current empty-index failure mode.

## 7. V1 Scope and Contracts

## Queue Message Types
- `full.start`
- `full.channel`
- `full.staff`
- `full.finalize`

## Required Message Metadata
- `runId`
- `messageId`
- `attempt`
- `dedupeKey`

## V1 Deliberate Omission
- `delta.run` is excluded from V1 implementation.
- Delta can be introduced as a later phase only after V1 stabilization.

## 8. Public Interfaces and Config

## New/Updated Endpoints (Web)
- Queue callback route for Vercel Queue processing.
- Authenticated manual full-index trigger route.
- Authenticated rollback route for one-click undo.

## One-Click Undo Endpoint (Required)
- Proposed shape: `POST /api/indexing/rollback`.
- Must support `dry_run=true`.

Rollback operation must atomically:
1. Flip orchestrator to Bull as primary.
2. Disable Vercel write path.
3. Restore previous Algolia target index.
4. Persist rollback event metadata (`timestamp`, `actor`, `reason`, `result`).

## Environment Variables
- `INDEXING_ORCHESTRATOR` (`bull` or `vercel`)
- `INDEXING_WRITE_TARGET` (`shadow`, `live`, `disabled`)
- `ALGOLIA_APPLICATION_ID`
- `ALGOLIA_ADMIN_API_KEY` (server-only)
- `ALGOLIA_SEARCH_INDEX` (default `prod_ContentItem`)
- `INDEX_MANUAL_TRIGGER_TOKEN`
- `INDEX_ROLLBACK_TOKEN`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

## 9. Rollout Plan

## Phase A: Build and Shadow
- Implement queue pipeline and temp-index rebuild flow.
- Run Vercel pipeline writing to shadow target only.
- Keep Bull as production writer.

## Phase B: Dual-Run Compare
- Run both orchestrators in parallel.
- Validate parity:
  - total docs,
  - per-category counts,
  - fixed sample object checks.

## Phase C: Controlled Cutover
- Set orchestrator to Vercel.
- Set write target to live.
- Keep Bull operational during rollback window.

## Phase D: Stabilize and Decommission
- If stable for defined window, disable Bull scheduling.
- Keep rollback docs and endpoint available during transition window.

## 10. Testing Strategy

## Unit
- Message schema validation.
- Dedupe/idempotency behavior.
- Finalize gating and shard accounting.
- Rollback handler including dry-run behavior.

## Integration
- Full run into temp index and atomic swap.
- Mid-run failure does not affect live index.
- Retry/duplicate message handling is safe.
- Manual trigger auth works.
- Rollback flips flags and restores target successfully.

## Acceptance Criteria
- No incident path where failed run empties live index.
- V1 outputs parity with current Bull-driven index.
- One-click undo tested in staging and documented.

## 11. Observability and Operations

Phase 1 observability baseline:
- Vercel logs only.
- Structured logs keyed by `runId` and message type.

Minimum required log events:
- run start, shard enqueue, shard success/failure, finalize pass/fail, swap success/fail, rollback invocation/result.

## 12. Risks and Mitigations

Risk: Queue duplicate delivery.
- Mitigation: KV dedupe keys + idempotent writes.

Risk: Partial run completion.
- Mitigation: finalize gate requires full shard completion.

Risk: Bad cutover.
- Mitigation: one-click undo and Bull hot standby during rollback window.

Risk: Package complexity.
- Mitigation: treat shared package as temporary with explicit removal milestone.

## 13. Phase Checklist

Legend: `Not Started` | `In Progress` | `Done` | `Blocked`

| Phase | Status | Notes |
|---|---|---|
| Step 1: Create PRD file and baseline decisions | Done | This file created. |
| Step 2: Define V1 contracts and endpoint specs | Not Started | Queue payload JSON schemas and auth details. |
| Step 3: Implement transitional shared package | Not Started | Extract core mapping/index workflow. |
| Step 4: Implement web queue handlers and cron | Not Started | Full-only orchestration in web repo. |
| Step 5: Implement temp-index + atomic swap safety | Not Started | Hard migration gate. |
| Step 6: Implement one-click undo endpoint | Not Started | Must include dry-run. |
| Step 7: Dual-run parity validation | Not Started | Counts + spot checks sign-off. |
| Step 8: Controlled cutover and stabilization | Not Started | Flags + rollback window. |
| Step 9: Consolidate indexer into web and remove shared package | Not Started | Post-stability cleanup. |

## 14. Open Items

- Final auth mechanism for internal trigger/rollback endpoints (token, header, and source allowlist specifics).
- Exact parity sample set (which object IDs across categories).
- Stabilization window duration before legacy decommission.
