'use client';

import { useState, useEffect } from 'react';
import styles from './StoryView.module.css';

interface SlideData {
  title: string;
  value: string | number;
  subtitle: string;
  bgGradient: string;
}

interface StoryViewProps {
  slides: SlideData[];
  username: string;
}

export default function StoryView({ slides, username }: StoryViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(c => c + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(c => c - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, slides.length]);

  const currentSlide = slides[currentIndex];

  return (
    <div className={styles.container} onClick={nextSlide} style={{ background: currentSlide.bgGradient }}>
      <div className={styles.progressBar}>
        {slides.map((_, idx) => (
          <div key={idx} className={`${styles.progressSegment} ${idx <= currentIndex ? styles.active : ''}`} />
        ))}
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <img 
            src={`https://github.com/${username}.png`} 
            alt={username} 
            className={styles.avatar} 
          />
          <span>@{username}</span>
        </div>

        <div key={currentIndex} className={styles.slideBody}>
          <h2 className={styles.slideTitle}>{currentSlide.title}</h2>
          <div className={styles.slideValue}>{currentSlide.value}</div>
          <p className={styles.slideSubtitle}>{currentSlide.subtitle}</p>
        </div>
        
        <div className={styles.hint}>
          {currentIndex === slides.length - 1 ? '🎉 You made it!' : 'Tap or Press Space'}
        </div>
      </div>
    </div>
  );
}
