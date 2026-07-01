/**
 * LeetCode stats adapter.
 *
 * LeetCode exposes a public GraphQL endpoint at https://leetcode.com/graphql
 * It allows unauthenticated queries for public profile data.
 *
 * CORS: The browser can POST to https://leetcode.com/graphql directly
 * because LeetCode sends permissive CORS headers for this endpoint.
 * If that ever breaks, the Vite dev proxy at /leetcode-api handles it.
 */

import { useQuery } from '@tanstack/react-query';
import { PLATFORM_CONFIG, REFETCH_INTERVAL } from '../config/platforms';

const { username } = PLATFORM_CONFIG.leetcode;
const LEETCODE_URL = 'https://leetcode.com/graphql';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface LeetCodeDifficulty {
  difficulty: string;
  count: number;
}

export interface LeetCodeBadge {
  id: string;
  displayName: string;
  icon: string;
}

export interface LeetCodeStats {
  username: string;
  realName: string;
  avatarUrl: string;
  ranking: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalQuestions: number;
  acceptanceRate: number;
  contributionPoints: number;
  streak: number;
  badges: LeetCodeBadge[];
  recentSubmissions: { title: string; statusDisplay: string; timestamp: string }[];
  lastFetchedAt: Date;
}

// ── GraphQL query ──────────────────────────────────────────────────────────────

const PROFILE_QUERY = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        realName
        userAvatar
        ranking
        contributionPoints
      }
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
        totalSubmissionNum {
          difficulty
          count
        }
      }
      badges {
        id
        displayName
        icon
      }
      recentSubmissionList(limit: 5) {
        title
        statusDisplay
        timestamp
      }
      userCalendar {
        streak
        totalActiveDays
      }
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;

// ── Fetcher ────────────────────────────────────────────────────────────────────

async function fetchLeetCodeStats(): Promise<LeetCodeStats> {
  const res = await fetch(LEETCODE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Referer: 'https://leetcode.com',
    },
    body: JSON.stringify({ query: PROFILE_QUERY, variables: { username } }),
  });

  if (!res.ok) throw new Error(`LeetCode GraphQL: ${res.status}`);
  const json = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  const u = json.data?.matchedUser;
  if (!u) throw new Error('LeetCode: user not found');

  const acStats: LeetCodeDifficulty[] = u.submitStats?.acSubmissionNum ?? [];
  const totalStats: LeetCodeDifficulty[] = u.submitStats?.totalSubmissionNum ?? [];
  const allQ: { difficulty: string; count: number }[] = json.data?.allQuestionsCount ?? [];

  const ac = (diff: string) => acStats.find(d => d.difficulty === diff)?.count ?? 0;
  const tot = (diff: string) => totalStats.find(d => d.difficulty === diff)?.count ?? 0;
  const totalQ = allQ.find(d => d.difficulty === 'All')?.count ?? 0;

  const totalSolved = ac('All');
  const totalSubmissions = tot('All');
  const acceptanceRate =
    totalSubmissions > 0
      ? Math.round((totalSolved / totalSubmissions) * 1000) / 10
      : 0;

  return {
    username: u.username,
    realName: u.profile?.realName ?? u.username,
    avatarUrl: u.profile?.userAvatar ?? '',
    ranking: u.profile?.ranking ?? 0,
    totalSolved,
    easySolved: ac('Easy'),
    mediumSolved: ac('Medium'),
    hardSolved: ac('Hard'),
    totalQuestions: totalQ,
    acceptanceRate,
    contributionPoints: u.profile?.contributionPoints ?? 0,
    streak: u.userCalendar?.streak ?? 0,
    badges: (u.badges ?? []).slice(0, 4),
    recentSubmissions: u.recentSubmissionList ?? [],
    lastFetchedAt: new Date(),
  };
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useLeetCodeStats() {
  return useQuery<LeetCodeStats, Error>({
    queryKey: ['leetcode', username],
    queryFn: fetchLeetCodeStats,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchInterval: REFETCH_INTERVAL,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
