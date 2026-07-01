/**
 * GitHub stats adapter.
 * Uses the public GitHub REST API — no auth required for public profiles
 * (60 requests/hour unauthenticated, 5 000 with a token).
 *
 * Endpoints used:
 *  GET /users/{username}
 *  GET /users/{username}/repos?per_page=100
 *  GET /users/{username}/events/public?per_page=30
 */

import { useQuery } from '@tanstack/react-query';
import { PLATFORM_CONFIG, REFETCH_INTERVAL } from '../config/platforms';

const BASE = 'https://api.github.com';
const { username } = PLATFORM_CONFIG.github;

// ── Types ────────────────────────────────────────────────────────────────────

export interface GitHubLang {
  name: string;
  percent: number;
  color: string;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

export interface GitHubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: Record<string, unknown>;
}

export interface GitHubStats {
  avatarUrl: string;
  name: string;
  username: string;
  followers: number;
  following: number;
  publicRepos: number;
  totalStars: number;
  topLanguages: GitHubLang[];
  pinnedRepos: GitHubRepo[];
  recentActivity: GitHubEvent[];
  lastFetchedAt: Date;
}

// ── Language colour map (top 15 most-used) ───────────────────────────────────

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  C: '#555555',
  'C++': '#f34b7d',
  Go: '#00ADD8',
  Rust: '#dea584',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Ruby: '#701516',
  Swift: '#F05138',
};

// ── Fetchers ─────────────────────────────────────────────────────────────────

async function fetchUser() {
  const res = await fetch(`${BASE}/users/${username}`, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!res.ok) throw new Error(`GitHub /users: ${res.status}`);
  return res.json();
}

async function fetchRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${BASE}/users/${username}/repos?per_page=100&sort=updated`,
    { headers: { Accept: 'application/vnd.github+json' } }
  );
  if (!res.ok) throw new Error(`GitHub /repos: ${res.status}`);
  return res.json();
}

async function fetchEvents(): Promise<GitHubEvent[]> {
  const res = await fetch(
    `${BASE}/users/${username}/events/public?per_page=30`,
    { headers: { Accept: 'application/vnd.github+json' } }
  );
  if (!res.ok) throw new Error(`GitHub /events: ${res.status}`);
  return res.json();
}

// ── Aggregator ───────────────────────────────────────────────────────────────

async function fetchAllGitHubStats(): Promise<GitHubStats> {
  const [user, repos, events] = await Promise.all([
    fetchUser(),
    fetchRepos(),
    fetchEvents(),
  ]);

  // Total stars across owned (non-forked) repos
  const ownedRepos: GitHubRepo[] = repos.filter((r: GitHubRepo) => !r.fork);
  const totalStars = ownedRepos.reduce(
    (sum: number, r: GitHubRepo) => sum + r.stargazers_count,
    0
  );

  // Top languages by repo count
  const langCount: Record<string, number> = {};
  for (const r of ownedRepos) {
    if (r.language) langCount[r.language] = (langCount[r.language] ?? 0) + 1;
  }
  const total = Object.values(langCount).reduce((a, b) => a + b, 0) || 1;
  const topLanguages: GitHubLang[] = Object.entries(langCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([name, count]) => ({
      name,
      percent: Math.round((count / total) * 100),
      color: LANG_COLORS[name] ?? '#6366f1',
    }));

  // Top 3 pinned-style repos (most stars, non-forked)
  const pinnedRepos: GitHubRepo[] = [...ownedRepos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 3);

  return {
    avatarUrl: user.avatar_url,
    name: user.name ?? username,
    username: user.login,
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
    totalStars,
    topLanguages,
    pinnedRepos,
    recentActivity: events.slice(0, 5),
    lastFetchedAt: new Date(),
  };
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useGitHubStats() {
  return useQuery<GitHubStats, Error>({
    queryKey: ['github', username],
    queryFn: fetchAllGitHubStats,
    staleTime: 10 * 60 * 1000,        // 10 min — treat as fresh
    gcTime: 30 * 60 * 1000,           // 30 min — keep in cache
    refetchInterval: REFETCH_INTERVAL,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
