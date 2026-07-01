// ============================================================
// Platform Configuration
// Change usernames here — they propagate everywhere automatically.
// ============================================================

export const PLATFORM_CONFIG = {
  github: {
    username: 'srujanredy01',
    profileUrl: 'https://github.com/srujanredy01',
  },
  leetcode: {
    username: 'srujan01',
    profileUrl: 'https://leetcode.com/u/srujan01/',
  },
  tuf: {
    username: 'srujanreddy_k',
    profileUrl: 'https://takeuforward.org/profile/srujanreddy_k',
  },
  codolio: {
    username: 'KSReddy11',
    profileUrl: 'https://codolio.com/profile/KSReddy11',
  },
  // ── Future platforms ─────────────────────────────────────
  // codechef: { username: '', profileUrl: '' },
  // gfg:      { username: '', profileUrl: '' },
  // hackerrank: { username: '', profileUrl: '' },
} as const;

/** Cache duration in milliseconds */
export const CACHE_TTL = {
  github: 10 * 60 * 1000,   // 10 minutes
  leetcode: 10 * 60 * 1000, // 10 minutes
  tuf: 30 * 60 * 1000,      // 30 minutes (no official API)
  codolio: 30 * 60 * 1000,  // 30 minutes (no official API)
};

/** Auto-refresh interval (React Query refetchInterval) */
export const REFETCH_INTERVAL = 30 * 60 * 1000; // 30 minutes
