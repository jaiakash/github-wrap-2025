import { fetchUser, fetchRepos, fetchEvents, fetchOrgs } from '@/lib/github';
import { notFound } from 'next/navigation';
import StoryView from '@/app/components/StoryView';
import { GitHubRepo } from '@/types/github';

interface PageProps {
  params: Promise<{ username: string }>;
}

function processData(user: any, repos: GitHubRepo[], events: any[], orgs: any[]) {
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  
  // Calculate top language
  const languages: Record<string, number> = {};
  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });
  const topLanguage = Object.entries(languages).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Code';

  // Process Events
  const pushEvents = events.filter((e: any) => e.type === 'PushEvent');
  const prEvents = events.filter((e: any) => e.type === 'PullRequestEvent');
  
  // Estimate total commits in recent activity (each push can have multiple commits)
  const recentCommits = pushEvents.reduce((acc: number, e: any) => acc + (e.payload?.size || 0), 0);

  const slides = [
    {
      title: "Welcome",
      value: user.name || user.login,
      subtitle: "Let's unwrap your GitHub presence.",
      bgGradient: "linear-gradient(45deg, #4f46e5, #9333ea)"
    },
    {
      title: "The Creator",
      value: user.public_repos,
      subtitle: "Public repositories shared with the world.",
      bgGradient: "linear-gradient(45deg, #06b6d4, #3b82f6)"
    },
    {
      title: "Top Language",
      value: topLanguage,
      subtitle: "The language you spoke the most.",
      bgGradient: "linear-gradient(45deg, #10b981, #059669)"
    },
    {
      title: "Recent Hustle",
      value: `${recentCommits}+`,
      subtitle: "Commits pushed in your recent activity.",
      bgGradient: "linear-gradient(45deg, #f97316, #ea580c)"
    },
    {
      title: "Collaborator", 
      value: prEvents.length,
      subtitle: "Pull Requests created recently.",
      bgGradient: "linear-gradient(45deg, #8b5cf6, #d946ef)"
    }
  ];

  if (orgs.length > 0) {
    slides.push({
      title: "Team Player",
      value: orgs.length,
      subtitle: `Member of ${orgs.length} organization${orgs.length === 1 ? '' : 's'}.`,
      bgGradient: "linear-gradient(45deg, #be185d, #db2777)"
    });
  }

  slides.push({
      title: "Stargazer",
      value: totalStars,
      subtitle: "Total stars earned. Shiny!",
      bgGradient: "linear-gradient(45deg, #f59e0b, #ef4444)"
  });

  return slides;
}

export default async function WrappedPage({ params }: PageProps) {
  const { username } = await params;
  const [user, repos, events, orgs] = await Promise.all([
    fetchUser(username),
    fetchRepos(username),
    fetchEvents(username),
    fetchOrgs(username)
  ]);

  if (!user) {
    return notFound();
  }

  const slides = processData(user, repos, events, orgs);

  return <StoryView slides={slides} username={user.login} />;
}
