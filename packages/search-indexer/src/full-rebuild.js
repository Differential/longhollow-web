import { RUN_STATUSES } from './contracts.js';

function assertString(value, name) {
  if (!value || typeof value !== 'string') {
    throw new Error(`${name} must be a non-empty string`);
  }
}

function assertObject(value, name) {
  if (!value || typeof value !== 'object') {
    throw new Error(`${name} must be an object`);
  }
}

/**
 * Run a full indexing rebuild using temp-index then atomic swap.
 * This flow is intentionally "no-wipe" for live index safety.
 */
async function runFullRebuild({ runId, adapters, logger = console }) {
  assertString(runId, 'runId');
  assertObject(adapters, 'adapters');
  assertObject(adapters.algolia, 'adapters.algolia');
  assertObject(adapters.content, 'adapters.content');
  assertObject(adapters.staff, 'adapters.staff');

  const runState = adapters.runState || {
    setRunStatus: async () => {},
    setShardStatus: async () => {},
  };

  await runState.setRunStatus({ runId, status: RUN_STATUSES.QUEUED });

  const tmpIndexName = adapters.algolia.buildTmpIndexName({ runId });

  try {
    await runState.setRunStatus({
      runId,
      status: RUN_STATUSES.RUNNING,
      meta: { tmpIndexName },
    });

    await adapters.algolia.prepareTmpIndex({ runId, tmpIndexName });

    const channelIds = await adapters.content.getChannelIds({ runId });
    const shardResults = [];

    for (const channelId of channelIds) {
      const shardKey = `channel:${channelId}`;
      await runState.setShardStatus({
        runId,
        shardKey,
        status: 'pending',
      });

      const result = await adapters.content.indexChannel({
        runId,
        channelId,
        tmpIndexName,
      });

      shardResults.push({
        shardKey,
        indexedCount: result?.indexedCount || 0,
      });

      await runState.setShardStatus({
        runId,
        shardKey,
        status: 'completed',
        meta: { indexedCount: result?.indexedCount || 0 },
      });
    }

    const staffResult = await adapters.staff.indexStaff({ runId, tmpIndexName });
    shardResults.push({
      shardKey: 'staff',
      indexedCount: staffResult?.indexedCount || 0,
    });

    const validation = await adapters.algolia.validateTmpIndex({
      runId,
      tmpIndexName,
    });

    if (!validation?.ok) {
      throw new Error(
        `Temporary index validation failed: ${
          validation?.reasons?.join('; ') || 'unknown reason'
        }`
      );
    }

    await runState.setRunStatus({
      runId,
      status: RUN_STATUSES.FINALIZE_PENDING,
      meta: { tmpIndexName },
    });

    await adapters.algolia.swapTmpToLive({ runId, tmpIndexName });

    if (typeof adapters.algolia.cleanupTmpArtifacts === 'function') {
      await adapters.algolia.cleanupTmpArtifacts({
        runId,
        keepTmpIndexName: tmpIndexName,
      });
    }

    await runState.setRunStatus({
      runId,
      status: RUN_STATUSES.COMPLETED,
      meta: {
        tmpIndexName,
        indexedCount: shardResults.reduce((sum, x) => sum + x.indexedCount, 0),
        shardCount: shardResults.length,
      },
    });

    return {
      runId,
      tmpIndexName,
      shardResults,
      indexedCount: shardResults.reduce((sum, x) => sum + x.indexedCount, 0),
    };
  } catch (error) {
    await runState.setRunStatus({
      runId,
      status: RUN_STATUSES.FAILED,
      meta: {
        tmpIndexName,
        error: error?.message || String(error),
      },
    });

    logger.error('[search-indexer] full rebuild failed', {
      runId,
      tmpIndexName,
      error: error?.message || String(error),
    });

    throw error;
  }
}

export { runFullRebuild };
