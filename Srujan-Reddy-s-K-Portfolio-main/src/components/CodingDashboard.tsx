/**
 * CodingDashboard – live data replacement for the static Coding Metrics section.
 *
 * Three cards, identical UI to the original portfolio:
 *   GitHubCard         – GitHub REST API
 *   LeetCodeCard       – LeetCode GraphQL
 *   CodolioMetricsCard – Codolio (unofficial endpoint) + TUF embed
 *
 * Design rules:
 *  - Same rounded-3xl cards, white/50 backdrop, indigo accent palette
 *  - Skeleton loaders while loading
 *  - "Unable to fetch latest stats" banner on error (last cached values remain)
 *  - Auto-refresh every 30 min via React Query refetchInterval
 *  - Platform logos open the profile on click
 */

import React, { memo, useState } from 'react';
import { useGitHubStats } from '../hooks/useGitHubStats';
import { useLeetCodeStats } from '../hooks/useLeetCodeStats';
import { useCodolioStats } from '../hooks/useCodolioStats';
import { PLATFORM_CONFIG } from '../config/platforms';

// ── Tiny shared primitives ────────────────────────────────────────────────────

const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-gray-100 animate-pulse rounded-xl ${className}`} />
);

const LiveDot: React.FC<{ color?: string }> = ({ color = 'bg-indigo-500' }) => (
  <span className="relative flex h-2 w-2">
    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`} />
    <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`} />
  </span>
);

const ErrorBanner: React.FC<{ message?: string }> = ({ message }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-[10px] font-bold text-amber-700 uppercase tracking-wider">
    <span>⚠</span>
    <span>{message ?? 'Unable to fetch latest stats'}</span>
  </div>
);

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

// ── Stat tile shared between cards ───────────────────────────────────────────

const StatTile: React.FC<{
  icon: React.ReactNode;
  value: string | number;
  label: string;
  loading?: boolean;
  accentClass?: string;
}> = memo(({ icon, value, label, loading, accentClass = 'border-indigo-200' }) => (
  <div className={`bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center hover:${accentClass} transition-all hover:shadow-md group/metric`}>
    <div className="mb-2 group-hover/metric:scale-110 transition-transform">{icon}</div>
    {loading ? (
      <Skeleton className="h-6 w-14 mb-1" />
    ) : (
      <p className="text-xl font-bold text-gray-900 tabular-nums">{value}</p>
    )}
    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{label}</p>
  </div>
));

// ── Language bar ─────────────────────────────────────────────────────────────

const LanguageBar: React.FC<{ name: string; percent: number; color: string }> = memo(
  ({ name, percent, color }) => (
    <div className="flex items-center gap-2 text-xs">
      <span
        className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0"
        style={{ background: color }}
      />
      <span className="text-gray-700 font-medium w-20 truncate">{name}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${percent}%`, background: color }}
        />
      </div>
      <span className="text-gray-400 w-8 text-right">{percent}%</span>
    </div>
  )
);

// ════════════════════════════════════════════════════════════════════════════
// 1. GitHubCard
// ════════════════════════════════════════════════════════════════════════════

export const GitHubCard: React.FC = memo(() => {
  const { data, isLoading, isError, error, dataUpdatedAt } = useGitHubStats();
  const profile = PLATFORM_CONFIG.github;
  const lastSync = dataUpdatedAt ? timeAgo(new Date(dataUpdatedAt)) : '';

  return (
    <div className="bg-white/50 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-lg group hover:shadow-xl transition-all duration-300 h-full flex flex-col relative overflow-hidden">
      {/* Scanning shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none" />
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-gray-900/5 rounded-full blur-3xl group-hover:bg-gray-900/10 transition-colors duration-500" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer"
          className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 flex-shrink-0">
          {data?.avatarUrl
            ? <img src={data.avatarUrl} alt="GitHub avatar" className="w-full h-full rounded-2xl object-cover" />
            : <GithubSvg className="w-6 h-6" />}
        </a>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold text-gray-900">GitHub Activity</h3>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500 truncate">@{data?.username ?? profile.username}</p>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">
              {isLoading ? 'Loading…' : isError ? 'Cached' : lastSync}
            </span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-3 flex-shrink-0">
          <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer"
            className="text-indigo-500 hover:text-indigo-600 transition-colors">
            <ExternalLinkSvg className="w-5 h-5" />
          </a>
          <div className="flex items-center gap-1">
            <LiveDot color={isError ? 'bg-amber-500' : 'bg-indigo-500'} />
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-tighter">
              {isError ? 'Cache' : 'Live'}
            </span>
          </div>
        </div>
      </div>

      {isError && <div className="mb-4 relative z-10"><ErrorBanner message={error?.message} /></div>}

      {/* Stat tiles */}
      <div className="grid grid-cols-3 gap-3 mb-5 relative z-10">
        <StatTile icon={<ChartSvg className="w-4 h-4 text-indigo-500" />}
          value={data?.publicRepos ?? '—'} label="Repos" loading={isLoading} />
        <StatTile icon={<StarSvg className="w-4 h-4 text-amber-500" />}
          value={data?.totalStars ?? '—'} label="Stars" loading={isLoading} />
        <StatTile icon={<UsersSvg className="w-4 h-4 text-emerald-500" />}
          value={data?.followers ?? '—'} label="Followers" loading={isLoading} />
      </div>

      {/* GitHub Readme Stats images — lazy-loaded, consistent with original */}
      <div className="space-y-3 flex-grow relative z-10">
        {/* Stats card */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 group/card">
          <div className="absolute inset-0 bg-indigo-500/0 group-hover/card:bg-indigo-500/5 transition-colors duration-500 pointer-events-none" />
          {isLoading ? (
            <Skeleton className="w-full h-28" />
          ) : (
            <img loading="lazy"
              src={`https://github-readme-stats.vercel.app/api?username=${profile.username}&show_icons=true&theme=transparent&hide_border=true&title_color=6366f1&icon_color=6366f1&text_color=4b5563&bg_color=ffffff00`}
              alt="GitHub Stats"
              className="w-full h-auto relative z-10 transition-transform duration-500 group-hover/card:scale-[1.02]"
              referrerPolicy="no-referrer" />
          )}
        </div>

        {/* Top languages by repo (live) */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 relative z-10">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Top Languages</p>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-4 w-full" />)}
            </div>
          ) : data?.topLanguages?.length ? (
            <div className="space-y-2">
              {data.topLanguages.map(l => (
                <LanguageBar key={l.name} {...l} />
              ))}
            </div>
          ) : (
            <img loading="lazy"
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.username}&layout=compact&theme=transparent&hide_border=true&title_color=6366f1&text_color=4b5563&bg_color=ffffff00`}
              alt="Top Languages"
              className="w-full h-auto transition-transform duration-500 group-hover/card:scale-[1.02]"
              referrerPolicy="no-referrer" />
          )}
        </div>

        {/* Recent activity */}
        {data?.recentActivity?.length ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Recent Activity</p>
            <ul className="space-y-1.5">
              {data.recentActivity.slice(0, 4).map((ev, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full flex-shrink-0" />
                  <span className="truncate">
                    {ev.type.replace('Event', '')} on <span className="font-semibold">{ev.repo.name.split('/')[1]}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {lastSync && !isLoading && (
        <p className="text-[9px] text-gray-300 text-right mt-3 relative z-10">Updated {lastSync}</p>
      )}
    </div>
  );
});

// ════════════════════════════════════════════════════════════════════════════
// 2. LeetCodeCard
// ════════════════════════════════════════════════════════════════════════════

export const LeetCodeCard: React.FC = memo(() => {
  const { data, isLoading, isError, error, dataUpdatedAt } = useLeetCodeStats();
  const profile = PLATFORM_CONFIG.leetcode;
  const lastSync = dataUpdatedAt ? timeAgo(new Date(dataUpdatedAt)) : '';

  const difficulties = [
    { label: 'Easy', value: data?.easySolved, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Medium', value: data?.mediumSolved, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Hard', value: data?.hardSolved, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  return (
    <div className="bg-white/50 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-lg group hover:shadow-xl transition-all duration-300 h-full flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none" />
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors duration-500" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer"
          className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 flex-shrink-0">
          <LeetCodeSvg className="w-6 h-6" />
        </a>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold text-gray-900">LeetCode</h3>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500 truncate">@{data?.username ?? profile.username}</p>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
              {isLoading ? 'Loading…' : isError ? 'Cached' : lastSync}
            </span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-3 flex-shrink-0">
          <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer"
            className="text-indigo-500 hover:text-indigo-600 transition-colors">
            <ExternalLinkSvg className="w-5 h-5" />
          </a>
          <div className="flex items-center gap-1">
            <LiveDot color={isError ? 'bg-amber-500' : 'bg-amber-500'} />
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-tighter">
              {isError ? 'Cache' : 'Live'}
            </span>
          </div>
        </div>
      </div>

      {isError && <div className="mb-4 relative z-10"><ErrorBanner message={error?.message} /></div>}

      {/* Total + Ranking */}
      <div className="grid grid-cols-2 gap-4 mb-5 relative z-10">
        <StatTile
          icon={<TrophySvg className="w-6 h-6 text-amber-500" />}
          value={isLoading ? '—' : `${data?.totalSolved ?? '—'}`}
          label="Solved" loading={isLoading} />
        <StatTile
          icon={<ActivitySvg className="w-6 h-6 text-emerald-500" />}
          value={isLoading ? '—' : (data?.ranking ? `#${data.ranking.toLocaleString()}` : '—')}
          label="Global Rank" loading={isLoading} />
      </div>

      {/* Difficulty breakdown */}
      <div className="mb-5 relative z-10">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Difficulty Breakdown</p>
        {isLoading ? (
          <div className="flex gap-2">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-14 flex-1" />)}
          </div>
        ) : (
          <div className="flex gap-2">
            {difficulties.map(d => (
              <div key={d.label} className={`flex-1 ${d.bg} rounded-2xl p-3 text-center`}>
                <p className={`text-lg font-bold ${d.color} tabular-nums`}>{d.value ?? '—'}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{d.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Acceptance rate + streak */}
      <div className="grid grid-cols-2 gap-3 mb-5 relative z-10">
        <div className="bg-white rounded-2xl border border-gray-100 p-3 text-center">
          {isLoading ? <Skeleton className="h-5 w-12 mx-auto mb-1" /> :
            <p className="text-lg font-bold text-gray-900">{data?.acceptanceRate ?? '—'}%</p>}
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Acceptance</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-3 text-center">
          {isLoading ? <Skeleton className="h-5 w-10 mx-auto mb-1" /> :
            <p className="text-lg font-bold text-gray-900">{data?.streak ?? '—'}d</p>}
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Streak</p>
        </div>
      </div>

      {/* LeetCard image (visual overview) */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 flex items-center justify-center flex-grow group/card relative z-10">
        <div className="absolute inset-0 bg-amber-500/0 group-hover/card:bg-amber-500/5 transition-colors duration-500 pointer-events-none" />
        {isLoading ? (
          <Skeleton className="w-full h-40" />
        ) : (
          <img loading="lazy"
            src={`https://leetcard.jacoblin.cool/${profile.username}?theme=light&font=Inter&ext=activity`}
            alt="LeetCode Stats Card"
            className="w-full h-auto relative z-10 transition-transform duration-500 group-hover/card:scale-[1.02]"
            referrerPolicy="no-referrer" />
        )}
      </div>

      {/* Recent submissions */}
      {data?.recentSubmissions?.length ? (
        <div className="mt-4 relative z-10">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Recent Submissions</p>
          <ul className="space-y-1.5">
            {data.recentSubmissions.slice(0, 3).map((s, i) => (
              <li key={i} className="flex items-center justify-between text-xs">
                <span className="truncate text-gray-700 max-w-[65%]">{s.title}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.statusDisplay === 'Accepted' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                  {s.statusDisplay}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {lastSync && !isLoading && (
        <p className="text-[9px] text-gray-300 text-right mt-3 relative z-10">Updated {lastSync}</p>
      )}
    </div>
  );
});

// ════════════════════════════════════════════════════════════════════════════
// 3. CodolioMetricsCard  (Codolio live + TUF embed)
// ════════════════════════════════════════════════════════════════════════════

const CODOLIO_LOGS_POOL = [
  '> codolio: fetch success',
  '> profile score updated',
  '> streak synced',
  '> platform breakdown refreshed',
  '> global rank recalculated',
  '> git push origin main',
  '> npm run build:success',
  '> deploying to production',
  '> refactoring component',
  '> merging pull request',
];

export const CodolioMetricsCard: React.FC = memo(() => {
  const { data, isLoading, isError, error, dataUpdatedAt } = useCodolioStats();
  const [logs, setLogs] = React.useState<string[]>([
    '> system initialized',
    '> connecting to codolio.com',
    `> fetching profile: ${PLATFORM_CONFIG.codolio.username}`,
  ]);

  React.useEffect(() => {
    const id = setInterval(() => {
      setLogs(prev => {
        const next = [...prev, CODOLIO_LOGS_POOL[Math.floor(Math.random() * CODOLIO_LOGS_POOL.length)]];
        return next.slice(-4);
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const lastSync = dataUpdatedAt ? timeAgo(new Date(dataUpdatedAt)) : '';
  const codolioProfile = PLATFORM_CONFIG.codolio;
  const tufProfile = PLATFORM_CONFIG.tuf;

  return (
    <div className="bg-white/50 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-lg group hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none" />
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors duration-500" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <a href={codolioProfile.profileUrl} target="_blank" rel="noopener noreferrer"
          className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 flex-shrink-0">
          <ActivitySvg className="w-6 h-6" />
        </a>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold text-gray-900">Live Metrics</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Codolio · TUF</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">
              {isLoading ? 'Syncing…' : isError ? 'Cached' : lastSync}
            </span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1 flex-shrink-0">
          <LiveDot color={isError ? 'bg-amber-500' : 'bg-red-500'} />
          <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">Live</span>
        </div>
      </div>

      {isError && <div className="mb-4 relative z-10"><ErrorBanner message={error?.message} /></div>}

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-4 flex-grow relative z-10">
        <StatTile
          icon={<CheckCircleSvg className="w-5 h-5 text-indigo-500" />}
          value={data?.totalSolved ?? '—'}
          label="Total Solved" loading={isLoading} />
        <StatTile
          icon={<TrophySvg className="w-5 h-5 text-amber-500" />}
          value={data?.globalRank ?? '—'}
          label="Global Rank" loading={isLoading} />
        <StatTile
          icon={<ClockSvg className="w-5 h-5 text-emerald-500" />}
          value={data?.streak ? `${data.streak}d` : '—'}
          label="Streak" loading={isLoading} />
        <StatTile
          icon={<ZapSvg className="w-5 h-5 text-yellow-500" />}
          value={data?.score ?? '—'}
          label="Profile Score" loading={isLoading} />
      </div>

      {/* Codolio profile link */}
      <div className="mt-6 relative z-10">
        <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-center justify-between group/codolio hover:bg-indigo-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover/codolio:scale-110 transition-transform">
              <ActivitySvg className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Codolio</p>
              <p className="text-sm font-bold text-gray-900">{codolioProfile.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isLoading && data?.score ? (
              <div className="text-right mr-2">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Score</p>
                <p className="text-xs font-bold text-indigo-600">{data.score.toLocaleString()}</p>
              </div>
            ) : null}
            <a href={codolioProfile.profileUrl} target="_blank" rel="noopener noreferrer"
              className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-indigo-500 hover:scale-110">
              <ExternalLinkSvg className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Platform breakdown */}
      {!isLoading && data?.platformBreakdown?.length ? (
        <div className="mt-4 relative z-10">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Platform Breakdown</p>
          <div className="space-y-1.5">
            {data.platformBreakdown.slice(0, 4).map(p => (
              <div key={p.platform} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-sm" style={{ background: p.color }} />
                <span className="text-gray-600 font-medium w-24 truncate">{p.platform}</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${Math.min(100, p.solved)}%`, background: p.color }} />
                </div>
                <span className="text-gray-400 w-8 text-right font-semibold">{p.solved}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* TUF profile link */}
      <div className="mt-4 relative z-10">
        <a href={tufProfile.profileUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-between p-3 bg-indigo-50/30 rounded-2xl border border-indigo-100/50 hover:bg-indigo-50 transition-colors group/tuf">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover/tuf:scale-110 transition-transform">
              <BrainSvg className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">takeUforward</p>
              <p className="text-xs font-bold text-gray-700">@{tufProfile.username}</p>
            </div>
          </div>
          <ExternalLinkSvg className="w-4 h-4 text-indigo-400" />
        </a>
      </div>

      {/* Live terminal log */}
      <div className="mt-4 relative z-10">
        <div className="bg-gray-900 rounded-xl p-3 font-mono text-[10px] text-emerald-400/80 shadow-inner overflow-hidden border border-gray-800">
          <div className="flex items-center gap-2 mb-2 border-b border-gray-800 pb-1">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
            </div>
            <span className="text-[8px] text-gray-500 uppercase font-bold tracking-tighter">Live Feed</span>
          </div>
          <div className="space-y-1">
            {logs.map((log, i) => (
              <div key={i} className="truncate">{log}</div>
            ))}
            <span className="w-2 h-3 bg-emerald-400/40 animate-pulse inline-block ml-1 align-middle" />
          </div>
        </div>
      </div>

      {lastSync && !isLoading && (
        <p className="text-[9px] text-gray-300 text-right mt-3 relative z-10">Updated {lastSync}</p>
      )}
    </div>
  );
});

// ── Inline SVG icons (self-contained — no new App.tsx imports needed) ─────────

type SvgProps = { className?: string };

const GithubSvg: React.FC<SvgProps> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const ExternalLinkSvg: React.FC<SvgProps> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const ChartSvg: React.FC<SvgProps> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const StarSvg: React.FC<SvgProps> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const UsersSvg: React.FC<SvgProps> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const TrophySvg: React.FC<SvgProps> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M10 14.66V17c0 .55.47.98.97 1.21C11.47 18.44 12 19 12 19s.53-.56 1.03-.79c.5-.23.97-.66.97-1.21v-2.34M7 2h10v12c0 1.31-1.02 2.44-2.32 2.66L12 17l-2.68-.34C8.02 16.44 7 15.31 7 14V2z" />
  </svg>
);

const ActivitySvg: React.FC<SvgProps> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const CheckCircleSvg: React.FC<SvgProps> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockSvg: React.FC<SvgProps> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ZapSvg: React.FC<SvgProps> = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const BrainSvg: React.FC<SvgProps> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const LeetCodeSvg: React.FC<SvgProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.414L9.786 3.149a1.374 1.374 0 1 0 1.94 1.94l2.734-2.734.012-.012c.027-.027.156-.136.41-.136.255 0 .383.109.411.136l.234.234c.027.027.136.156.136.41 0 .255-.109.383-.136.411L10.742 8.18a1.374 1.374 0 0 0-1.94 1.94l4.782 4.783c.027.027.136.156.136.41 0 .255-.109.383-.136.411l-.462.462c-.027.027-.156.136-.411.136-.255 0-.384-.109-.411-.136a1.374 1.374 0 1 0-1.94 1.94l.462.462c.705.705 1.65 1.058 2.595 1.058.945 0 1.89-.353 2.596-1.058l4.782-4.783c.705-.705 1.058-1.65 1.058-2.595 0-.945-.353-1.89-1.058-2.596L13.483 0z"/>
  </svg>
);
