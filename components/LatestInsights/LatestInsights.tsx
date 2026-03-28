'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './LatestInsights.module.css';

interface Post {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
}

export default function LatestInsights() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        // Only show the 3 latest posts
        setPosts(data.slice(0, 3));
      })
      .catch(err => console.error('Failed to fetch latest posts:', err));
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Latest <span className={styles.gradient}>Insights</span>
          </h2>
          <Link href="/blog" className={styles.viewAll}>
            View All Posts →
          </Link>
        </div>

        <div className={styles.grid}>
          {posts.map((post, index) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <article 
                className={`${styles.card} glass animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.imageWrapper}>
                  <img src={post.image} alt={post.title} className={styles.image} />
                </div>
                <div className={styles.content}>
                  <span className={styles.category}>{post.category}</span>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <div className={styles.meta}>{post.date}</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
