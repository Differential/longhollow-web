const MESSAGE_TYPES = Object.freeze({
  FULL_START: 'full.start',
  FULL_CHANNEL: 'full.channel',
  FULL_STAFF: 'full.staff',
  FULL_FINALIZE: 'full.finalize',
});

const RUN_STATUSES = Object.freeze({
  QUEUED: 'queued',
  RUNNING: 'running',
  FINALIZE_PENDING: 'finalize_pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  ROLLED_BACK: 'rolled_back',
});

function isSupportedMessageType(type) {
  return Object.values(MESSAGE_TYPES).includes(type);
}

function buildDedupeKey({ type, runId, shardKey = null }) {
  if (!type || !runId) {
    throw new Error('buildDedupeKey requires type and runId');
  }

  return shardKey ? `${type}:${runId}:${shardKey}` : `${type}:${runId}`;
}

/**
 * @typedef {Object} AlgoliaAdapter
 * @property {(args: { runId: string, tmpIndexName: string }) => Promise<void>} prepareTmpIndex
 * @property {(args: { runId: string }) => string} buildTmpIndexName
 * @property {(args: { runId: string, tmpIndexName: string }) => Promise<{ok: boolean, reasons?: string[]}>} validateTmpIndex
 * @property {(args: { runId: string, tmpIndexName: string }) => Promise<void>} swapTmpToLive
 * @property {(args: { runId: string, keepTmpIndexName?: string }) => Promise<void>} [cleanupTmpArtifacts]
 */

/**
 * @typedef {Object} ContentAdapter
 * @property {(args: { runId: string }) => Promise<number[]>} getChannelIds
 * @property {(args: { runId: string, channelId: number, tmpIndexName: string }) => Promise<{indexedCount: number}>} indexChannel
 */

/**
 * @typedef {Object} StaffAdapter
 * @property {(args: { runId: string, tmpIndexName: string }) => Promise<{indexedCount: number}>} indexStaff
 */

/**
 * @typedef {Object} RunStateAdapter
 * @property {(args: { runId: string, status: string, meta?: Record<string, unknown> }) => Promise<void>} setRunStatus
 * @property {(args: { runId: string, shardKey: string, status: string, meta?: Record<string, unknown> }) => Promise<void>} setShardStatus
 */

export {
  MESSAGE_TYPES,
  RUN_STATUSES,
  isSupportedMessageType,
  buildDedupeKey,
};
