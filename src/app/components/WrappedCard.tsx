'use client';

import styles from './WrappedCard.module.css';
import { GitHubUser } from '@/types/github';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface WrappedCardProps {
  user: GitHubUser;
  yearStats: {
    contributions: number;
    prs: { total: number; year: number };
    issues: { total: number; year: number };
    topLanguages: { name: string; count: number }[];
    recentStars: number;
    funFact: string;
  };
  starredRepos: any[];
  orgs: any[];
  year: number;
}

export default function WrappedCard({ user, yearStats, starredRepos, orgs, year }: WrappedCardProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i); // 2025, 2024, 2023...

  const handleYearChange = (newYear: number) => {
    router.push(`/wrap/${newYear}/${user.login}`);
    setIsMenuOpen(false);
  };

  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Floating Shapes for 'Informal' Vibe */}
        <div className={styles.blob1} />
        <div className={styles.blob2} />

        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.avatarWrapper}>
              <img src={user.avatar_url} alt={user.login} className={styles.avatar} />
              <div className={styles.badge}>{year}</div>
            </div>
            
            <div className={styles.menuWrapper}>
               <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.yearButton}>
                 {year} ▾
               </button>
               {isMenuOpen && (
                 <div className={styles.yearMenu}>
                   {years.map(y => (
                     <button key={y} onClick={() => handleYearChange(y)} className={styles.yearOption}>
                       {y}
                     </button>
                   ))}
                 </div>
               )}
            </div>
          </div>
          
          <div className={styles.identity}>
            <h1 className={styles.name}>{user.name || user.login}</h1>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer" className={styles.handle}>
              @{user.login}
            </a>
            <span className={styles.joined}>Joined {joinDate}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={styles.grid}>
          <div className={`${styles.statBox} ${styles.blue}`}>
            <span className={styles.label}>{year} Contributions</span>
            <span className={styles.value}>{yearStats.contributions}</span>
          </div>
          <div className={`${styles.statBox} ${styles.purple}`}>
            <span className={styles.label}>Pull Requests</span>
            <div className={styles.splitValue}>
              <div className={styles.subStat}>
                <span className={styles.subLabel}>Total</span>
                <span className={styles.subValue}>{yearStats.prs.total}</span>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.subStat}>
                <span className={styles.subLabel}>{year}</span>
                <span className={styles.subValue}>{yearStats.prs.year}</span>
              </div>
            </div>
          </div>
          <div className={`${styles.statBox} ${styles.green}`}>
            <span className={styles.label}>Issues</span>
            <div className={styles.splitValue}>
              <div className={styles.subStat}>
                <span className={styles.subLabel}>Total</span>
                <span className={styles.subValue}>{yearStats.issues.total}</span>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.subStat}>
                <span className={styles.subLabel}>{year}</span>
                <span className={styles.subValue}>{yearStats.issues.year}</span>
              </div>
            </div>
          </div>
          <div className={`${styles.statBox} ${styles.orange}`}>
            <span className={styles.label}>Public Repos</span>
            <span className={styles.value}>{user.public_repos}</span>
          </div>
        </div>

        {/* Languages & Activity */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Top Languages</h3>
          <div className={styles.languages}>
            {yearStats.topLanguages.slice(0, 3).map((lang, idx) => (
              <div key={lang.name} className={styles.langRow}>
                <span className={styles.langName}>{idx + 1}. {lang.name}</span>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ 
                      width: `${(lang.count / yearStats.topLanguages[0].count) * 100}%`,
                      background: idx === 0 ? 'var(--accent-glow)' : 'rgba(255,255,255,0.2)'
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <div className={styles.row}>
          <div className={styles.miniCard}>
            <span className={styles.miniLabel}>Followers</span>
            <span className={styles.miniValue}>{user.followers}</span>
          </div>
          <div className={styles.miniCard}>
            <span className={styles.miniLabel}>Following</span>
            <span className={styles.miniValue}>{user.following}</span>
          </div>
          <div className={styles.miniCard}>
            <span className={styles.miniLabel}>Orgs</span>
            <span className={styles.miniValue}>{orgs.length}</span>
          </div>
        </div>

        {/* Starred Repos Snapshot */}
        {starredRepos.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Recently Starred</h3>
            <div className={styles.repoList}>
              {starredRepos.slice(0, 3).map((repo: any) => (
                <a key={repo.id} href={repo.html_url} target="_blank" className={styles.repoLink}>
                  <span className={styles.repoName}>{repo.name}</span>
                  <span className={styles.repoOwner}>{repo.owner.login}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Fun Fact Footer */}
        <div className={styles.footer}>
          <div className={styles.funFact}>
            <span className={styles.emoji}>💡</span>
            <p>{yearStats.funFact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
