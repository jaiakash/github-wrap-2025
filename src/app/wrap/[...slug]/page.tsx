import { fetchUser, fetchRepos, fetchEvents, fetchOrgs, fetchStarred, fetchYearlyStats } from '@/lib/github';
import { notFound, redirect } from 'next/navigation';
import WrappedCard from '@/app/components/WrappedCard';
import { GitHubRepo } from '@/types/github';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

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

async function scrapeContributions(username: string, year: number): Promise<number> {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions?from=${year}-01-01&to=${year}-12-31`, { next: { revalidate: 3600 } });
    if (!res.ok) return 0;
    const text = await res.text();
    // Look for "1,234 contributions in 2024" or similar
    const match = text.match(/class="f4 text-normal mb-2">\s*([\d,]+)\s+contributions/);
    if (match && match[1]) {
      return parseInt(match[1].replace(/,/g, ''), 10);
    }
    // Fallback regex for different years layout or if simpler text match fails
    // Sometimes it's just "123 contributions" in a h2
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

export default async function WrappedPage({ params }: PageProps) {
  const { slug } = await params;
  let username = '';
  let year = new Date().getFullYear();

  // Route logic:
  // /wrap/username -> slug=[username] (default year)
  // /wrap/2024/username -> slug=[2024, username]
  
  if (slug.length === 1) {
    // Check if slug is maybe a year? (Too ambiguous, assume username default for now)
    // Actually safe to assume if 4 digits and starts with 20 it matches year... but standard usernames can be "2024".
    // We stick to convention: 1 param = username (current year).
    username = slug[0];
  } else if (slug.length === 2) {
    const potentialYear = parseInt(slug[0]);
    if (!isNaN(potentialYear) && potentialYear > 2000 && potentialYear <= 2030) {
      year = potentialYear;
      username = slug[1];
    } else {
      // Invalid year format, redirect or 404
      return notFound();
    }
  } else {
    return notFound();
  }

  // Fetch data
  const [user, repos, orgs, starred, yearlyStats, totalContributions] = await Promise.all([
    fetchUser(username),
    fetchRepos(username),
    fetchOrgs(username),
    fetchStarred(username),
    fetchYearlyStats(username, year),
    scrapeContributions(username, year)
  ]);

  if (!user) {
    return notFound();
  }

  const yearStats = processData(user, repos, yearlyStats, totalContributions);

  return (
    <WrappedCard 
      user={user} 
      yearStats={yearStats} 
      starredRepos={starred} 
      orgs={orgs}
      year={year} // Pass year to card
    />
  );
}
