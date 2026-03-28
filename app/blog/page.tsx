'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import styles from './Blog.module.css';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch posts:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <Navbar />
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.header} animate-fade-in`}>
            <h1 className={styles.title}>
              Insights & <span className={styles.gradient}>Innovations</span>
            </h1>
            <p className={styles.subtitle}>
              Exploring the frontiers of technology, design, and digital transformation.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', opacity: 0.5 }}>Loading insights...</div>
          ) : (
            <div className={styles.grid}>
              {posts.map((post, index) => (
                <Link href={`/blog/${post.id}`} key={post.id}>
                  <article 
                    className={`${styles.postCard} glass animate-fade-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={styles.imageWrapper}>
                      <img src={post.image} alt={post.title} className={styles.image} />
                    </div>
                    <div className={styles.content}>
                      <span className={styles.category}>{post.category}</span>
                      <h2 className={styles.postTitle}>{post.title}</h2>
                      <p className={styles.excerpt}>{post.excerpt}</p>
                      <div className={styles.footer}>
                        <span className={styles.author}>By {post.author}</span>
                        <span className={styles.date}>{post.date}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer style={{ 
        padding: '6rem 2rem', 
        textAlign: 'center', 
        opacity: 0.8, 
        fontSize: '0.9rem',
        borderTop: '1px solid var(--glass-border)',
        lineHeight: '1.8'
      }}>
        <p>39 Boundary Road, East Legon</p>
        <p>+233 59 895 4346 | info@lesteqitsolutions.com</p>
        <p style={{ opacity: 0.5, marginTop: '1rem' }}>© {new Date().getFullYear()} Lesteq IT Solutions. All rights reserved.</p>
      </footer>
    </main>
  );
}
