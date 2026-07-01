/**
 * Codeforces stats adapter.
 *
 * Uses the official public Codeforces REST API.
 * No authentication required for public profile data.
 * Rate limit: 1 request/second per IP (very generous).
 *
 * Endpoints:
 *  GET https://codeforces.com/api/user.info?handles={handle}
 *  GET https://codeforces.com/api/user.rating?handle={handle}
 *  GET https://codeforces.com/api/user.status?handle={handle}&count=10
 */

import { useQuery } from '@tanstack/react-query';
import { REFETCH_INTERVAL } from '../config/platforms';

const CF_BASE = 'https://codeforces.com/api';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CodeforcesContest {
  contestId: number;
  contestName: string;
  rank: number;
  newRating: number;
  ratingChange: number;
  ratingUpdateTimeSeconds: number;
}

export interface CodeforcesSubmission {
  id: number;
  problem: { name: string; rating?: number; tags: string[] };
  verdict: string;
  creationTimeSeconds: number;
}

export interface CodeforcesStats {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  avatar: string;
  country: string;
  organization: string;
  contribution: number;
  friendOfCount: number;
  recentContests: CodeforcesContest[];
  recentSubmissions: CodeforcesSubmission[];
  lastFetchedAt: Date;
}

// ── Fetchers ──────────────────────────────────────────────────────────────────

async function cfGet(endpoint: string) {
  const res = await fetch(`${CF_BASE}/${endpoint}`);
  if (!res.ok) throw new Error(`CF ${endpoint}: ${res.status}`);
  const json = await res.json();
  if (json.status !== 'OK') throw new Error(`CF ${endpoint}: ${json.comment}`);
  return json.result;
}

async function fetchCodeforcesStats(handle: string): Promise<CodeforcesStats> {
  const [users, ratingHistory, submissions] = await Promise.all([
    cfGet(`user.info?handles=${handle}`),
    cfGet(`user.rating?handle=${handle}`).catch(() => []),
    cfGet(`user.status?handle=${handle}&count=10`).catch(() => []),
  ]);

  const user = users[0];
  const recentContests: CodeforcesContest[] = [...ratingHistory]
    .reverse()
    .slice(0, 5);

  return {
    handle: user.handle,
    rating: user.rating ?? 0,
    maxRating: user.maxRating ?? 0,
    rank: user.rank ?? 'Unrated',
    maxRank: user.maxRank ?? 'Unrated',
    avatar: user.avatar ?? user.titlePhoto ?? '',
    country: user.country ?? '',
    organization: user.organization ?? '',
    contribution: user.contribution ?? 0,
    friendOfCount: user.friendOfCount ?? 0,
    recentContests,
    recentSubmissions: submissions.slice(0, 5),
    lastFetchedAt: new Date(),
  };
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useCodeforcesStats(handle: string) {
  return useQuery<CodeforcesStats, Error>({
    queryKey: ['codeforces', handle],
    queryFn: () => fetchCodeforcesStats(handle),
    enabled: !!handle,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchInterval: REFETCH_INTERVAL,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
