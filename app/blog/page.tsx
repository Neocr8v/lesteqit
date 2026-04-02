import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar/Navbar';
import styles from './Blog.module.css';
import { sql } from '@vercel/postgres';

export const revalidate = 0; // Force dynamic fetching

export const metadata: Metadata = {
  title: 'Insights & Innovations | Lesteq Blog',
  description: 'Exploring the frontiers of technology, design, and digital transformation with Lesteq IT Solutions.',
  openGraph: {
    title: 'Insights & Innovations | Lesteq Blog',
    description: 'Exploring the frontiers of technology, design, and digital transformation.',
    type: 'website',
  },
};

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
}

export default async function BlogPage() {
  let posts: Post[] = [];
  
  try {
    const { rows } = await sql`SELECT * FROM posts ORDER BY date DESC;`;
    posts = rows as Post[];
  } catch (error) {
    console.error('Failed to fetch posts from DB:', error);
  }

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

          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', opacity: 0.5 }}>No insights available at the moment.</div>
          ) : (
            <div className={styles.grid}>
              {posts.map((post, index) => (
                <Link href={`/blog/${post.id}`} key={post.id} className={styles.linkCard}>
                  <article 
                    className={`${styles.postCard} glass animate-fade-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={styles.imageWrapper}>
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3}
                      />
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
