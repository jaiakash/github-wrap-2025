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
