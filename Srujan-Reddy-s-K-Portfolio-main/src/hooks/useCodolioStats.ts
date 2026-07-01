/**
 * Codolio stats adapter.
 *
 * Codolio does not offer a public API. This hook uses the unofficial
 * JSON endpoint that Codolio's own frontend calls, which returns a
 * public profile object.  If that endpoint ever changes or blocks
 * CORS, the hook falls back to the last cached value and shows an
 * error badge — the UI never breaks.
 *
 * NOTE: For a production setup, proxy this through a lightweight
 * backend (e.g., Django, Express, or a Vercel edge function) and
 * cache it with Redis for 6 hours to stay within rate limits.
 */

import { useQuery } from '@tanstack/react-query';
import { PLATFORM_CONFIG, REFETCH_INTERVAL } from '../config/platforms';

const { username } = PLATFORM_CONFIG.codolio;

export interface CodolioStats {
  username: string;
  name: string;
  avatarUrl: string;
  totalSolved: number;
  globalRank: string;
  streak: number;
  score: number;
  platformBreakdown: { platform: string; solved: number; color: string }[];
  lastFetchedAt: Date;
}

// Codolio exposes a public API used by their own profile pages.
const CODOLIO_API = `https://codolio.com/api/profile/${username}`;

async function fetchCodolioStats(): Promise<CodolioStats> {
  const res = await fetch(CODOLIO_API);
  if (!res.ok) throw new Error(`Codolio API: ${res.status}`);
  const json = await res.json();

  // Normalise regardless of API shape changes
  const data = json.data ?? json;

  const breakdown = (data.platformStats ?? data.platformBreakdown ?? []).map(
    (p: { platform: string; totalSolved?: number; solved?: number }) => ({
      platform: p.platform,
      solved: p.totalSolved ?? p.solved ?? 0,
      color: platformColor(p.platform),
    })
  );

  return {
    username: data.username ?? username,
    name: data.name ?? data.fullName ?? username,
    avatarUrl: data.profilePicture ?? data.avatarUrl ?? '',
    totalSolved: data.totalSolved ?? data.totalProblems ?? 0,
    globalRank: data.globalRank ?? data.rank ?? '—',
    streak: data.streak ?? data.codingStreak ?? 0,
    score: data.profileScore ?? data.score ?? 0,
    platformBreakdown: breakdown,
    lastFetchedAt: new Date(),
  };
}

function platformColor(name: string): string {
  const map: Record<string, string> = {
    LeetCode: '#f89f1b',
    Codeforces: '#1890ff',
    CodeChef: '#5b4638',
    HackerRank: '#00ea64',
    GeeksforGeeks: '#2f8d46',
    InterviewBit: '#2563eb',
  };
  return map[name] ?? '#6366f1';
}

export function useCodolioStats() {
  return useQuery<CodolioStats, Error>({
    queryKey: ['codolio', username],
    queryFn: fetchCodolioStats,
    staleTime: 30 * 60 * 1000,
    gcTime: 6 * 60 * 60 * 1000,   // keep 6 h in GC cache
    refetchInterval: REFETCH_INTERVAL,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
