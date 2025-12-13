"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchUser, fetchRepos, fetchEvents, fetchOrgs, fetchStarred, fetchYearlyStats } from '@/lib/github';
import WrappedCard from '@/app/components/WrappedCard';
import { GitHubRepo } from '@/types/github';

// Helper function to process data (copied from original server component)
function generateFunFact(user: any, repos: GitHubRepo[], totalStars: number, languages: Record<string, number>) {
  const topLang = Object.keys(languages)[0];
  
  if (totalStars > 100) return "You're basically a celebrity in the open source world! 🌟";
  if (user.followers > user.following * 2) return "You're a trendsetter, not a follower. 💅";
  if (repos.length > 50) return "You have more repos than some startups have products! 🚀";
  if (topLang === 'JavaScript' || topLang === 'TypeScript') return "You dream in curly brackets and semicolons. ⚡";
  if (topLang === 'Python') return "Indentation is your religion. 🐍";
  if (topLang === 'Go') return "You like your code simple and fast. 🐹";
  if (topLang === 'Rust') return "Memory safety is your love language. 🦀";
  
  return "You wrote a lot of code this year. Your keyboard needs a break! ⌨️";
}

// Scrape function adapted for client logic
// Warning: This might face CORS issues when called from the browser
async function scrapeContributions(username: string, year: number): Promise<number> {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions?from=${year}-01-01&to=${year}-12-31`);
    if (!res.ok) return 0;
    const text = await res.text();
    // Look for "1,234 contributions in 2024" or similar
    const match = text.match(/class="f4 text-normal mb-2">\s*([\d,]+)\s+contributions/);
    if (match && match[1]) {
      return parseInt(match[1].replace(/,/g, ''), 10);
    }
  } catch (e) {
    console.error('Error scraping contributions:', e);
  }
  return 0;
}

function processData(user: any, repos: GitHubRepo[], yearlyStats: { prs: { total: number, year: number }, issues: { total: number, year: number } }, totalContributions: number) {
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  
  // Calculate top languages
  const languages: Record<string, number> = {};
  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  const topLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  const contributions = totalContributions;

  const funFact = generateFunFact(user, repos, totalStars, languages);

  return {
    contributions,
    prs: yearlyStats.prs,
    issues: yearlyStats.issues,
    topLanguages,
    recentStars: totalStars,
    funFact
  };
}

function WrapContent() {
  const searchParams = useSearchParams();
  const username = searchParams.get('user');
  const yearParam = searchParams.get('year');
  const year = yearParam ? parseInt(yearParam) : new Date().getFullYear();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    user: any;
    orgs: any[];
    starred: any[];
    yearStats: any;
  } | null>(null);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [user, repos, orgs, starred, yearlyStats, totalContributions] = await Promise.all([
          fetchUser(username),
          fetchRepos(username),
          fetchOrgs(username),
          fetchStarred(username),
          fetchYearlyStats(username, year),
          scrapeContributions(username, year)
        ]);

        if (!user) {
          setError('User not found');
        } else {
          const yearStats = processData(user, repos, yearlyStats, totalContributions);
          setData({ user, orgs, starred, yearStats });
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [username, year]);

  if (!username) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
        <h1 className="text-2xl font-bold mb-4">No user specified</h1>
        <p>Please provide a user query parameter, e.g., <code className="bg-gray-800 px-2 py-1 rounded">/wrap?user=yourname</code></p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-xl animate-pulse">Generating your {year} Wrap...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Error</h1>
        <p>{error || 'Something went wrong'}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <WrappedCard 
      user={data.user} 
      yearStats={data.yearStats} 
      starredRepos={data.starred} 
      orgs={data.orgs}
      year={year} 
    />
  );
}

export default function WrappedPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-black text-white">Loading...</div>}>
      <WrapContent />
    </Suspense>
  );
}
