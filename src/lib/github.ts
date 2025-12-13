import { GitHubUser, GitHubRepo } from '@/types/github';

const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchUser(username: string): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching repos:', error);
    return [];
  }
}

export async function fetchEvents(username: string): Promise<any[]> {
  try {
    const res = await fetch(`${GITHUB_API_BASE}/users/${username}/events/public?per_page=100`, {
       next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function fetchOrgs(username: string): Promise<any[]> {
  try {
    const res = await fetch(`${GITHUB_API_BASE}/users/${username}/orgs`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching orgs:', error);
    return [];
  }
}

export async function fetchStarred(username: string): Promise<any[]> {
  try {
    const res = await fetch(`${GITHUB_API_BASE}/users/${username}/starred?per_page=10`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Error fetching starred:', error);
    return [];
  }
}


export async function fetchYearlyStats(username: string, year: number) {
  const dateQuery = `${year}-01-01..${year}-12-31`;

  try {
    const [totalPrs, yearPrs, totalIssues, yearIssues] = await Promise.all([
      fetch(`${GITHUB_API_BASE}/search/issues?q=author:${username}+type:pr`, { next: { revalidate: 3600 } }).then(r => r.json()),
      fetch(`${GITHUB_API_BASE}/search/issues?q=author:${username}+type:pr+created:${dateQuery}`, { next: { revalidate: 3600 } }).then(r => r.json()),
      fetch(`${GITHUB_API_BASE}/search/issues?q=author:${username}+type:issue`, { next: { revalidate: 3600 } }).then(r => r.json()),
      fetch(`${GITHUB_API_BASE}/search/issues?q=author:${username}+type:issue+created:${dateQuery}`, { next: { revalidate: 3600 } }).then(r => r.json())
    ]);
    
    return {
      prs: { total: totalPrs.total_count || 0, year: yearPrs.total_count || 0 },
      issues: { total: totalIssues.total_count || 0, year: yearIssues.total_count || 0 }
    };
  } catch (error) {
    console.error('Error fetching yearly stats:', error);
    return { 
      prs: { total: 0, year: 0 }, 
      issues: { total: 0, year: 0 } 
    };
  }
}
