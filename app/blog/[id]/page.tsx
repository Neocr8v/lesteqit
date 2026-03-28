'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import styles from './PostDetail.module.css';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
}

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setAllPosts(data);
        const found = data.find((p: Post) => p.id === id);
        setPost(found || null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch post:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ background: '#0a0a0a', minHeight: '100vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading post...</div>;
  if (!post) return <div style={{ background: '#0a0a0a', minHeight: '100vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Post not found</div>;

  // Navigation Logic
  const currentIndex = allPosts.findIndex(p => p.id === id);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  // Related Posts Logic
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  // Category Counts
  const categories = Array.from(new Set(allPosts.map(p => p.category))).map(cat => ({
    name: cat,
    count: allPosts.filter(p => p.category === cat).length
  }));

  // Rich Text Parser
  const renderContent = (content: string) => {
    // Split by images first
    const parts = content.split(/(\[IMG:.*?\])/g);
    
    return parts.map((part, i) => {
      if (part.startsWith('[IMG:') && part.endsWith(']')) {
        const src = part.slice(5, -1);
        return <img key={i} src={src} alt="Article Content" className={styles.inlineImage} />;
      }

      // Handle custom alignment tags
      let processedPart = part;
      
      // We'll use a simple dangerouslySetInnerHTML for the remaining markdown-like features 
      // to keep the logic clean while allowing bold, italics, etc.
      const formattedHtml = processedPart
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/_(.*?)_/g, '<em>$1</em>') // Italic
        .replace(/### (.*?)\n/g, '<h3>$1</h3>') // H3
        .replace(/\[CENTER\](.*?)\[\/CENTER\]/gs, '<div style="text-align: center">$1</div>') // Center
        .replace(/\[JUSTIFY\](.*?)\[\/JUSTIFY\]/gs, '<div style="text-align: justify">$1</div>'); // Justify

      return <div key={i} dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
    });
  };

  return (
    <main>
      <Navbar />
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <div className={styles.mainContent}>
              <Link href="/blog" className={styles.backBtn}>
                ← Back to insights
              </Link>
              
              <header className={`${styles.header} animate-fade-in`}>
                <span className={styles.category}>{post.category}</span>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.meta}>
                  <span className={styles.author}>By {post.author}</span>
                  <span className={styles.date}>{post.date}</span>
                </div>
              </header>

              <div className={`${styles.heroImage} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
                <img src={post.image} alt={post.title} className={styles.image} />
              </div>

              <article className={`${styles.articleContent} animate-fade-in`} style={{ animationDelay: '0.4s' }}>
                {renderContent(post.content)}
              </article>

              {/* Post Navigation */}
              <div className={styles.postNav}>
                {prevPost ? (
                  <Link href={`/blog/${prevPost.id}`} className={styles.navLink}>
                    <span className={styles.navLabel}>Previous Post</span>
                    <span className={styles.navTitle}>{prevPost.title}</span>
                  </Link>
                ) : <div />}
                
                {nextPost ? (
                  <Link href={`/blog/${nextPost.id}`} className={styles.navLink} style={{ textAlign: 'right' }}>
                    <span className={styles.navLabel}>Next Post</span>
                    <span className={styles.navTitle}>{nextPost.title}</span>
                  </Link>
                ) : <div />}
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className={styles.related}>
                  <h2 className={styles.relatedHeading}>Related <span className={styles.gradient}>Insights</span></h2>
                  <div className={styles.relatedGrid}>
                    {relatedPosts.map(p => (
                      <Link href={`/blog/${p.id}`} key={p.id} className={`${styles.relatedCard} glass`}>
                        <div className={styles.relatedThumb}>
                          <img src={p.image} alt={p.title} className={styles.image} />
                        </div>
                        <div className={styles.relatedInfo}>
                          <h3 className={styles.relatedTitle}>{p.title}</h3>
                          <span className={styles.category} style={{ fontSize: '0.7rem' }}>{p.category}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={`${styles.widget} glass`}>
                <h3 className={styles.widgetTitle}>Categories</h3>
                <div className={styles.categoryList}>
                  {categories.map(cat => (
                    <Link href={`/blog?category=${cat.name}`} key={cat.name} className={styles.categoryItem}>
                      <span>{cat.name}</span>
                      <span className={styles.count}>({cat.count})</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className={`${styles.widget} glass`}>
                <h3 className={styles.widgetTitle}>Lesteq IT</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.6, lineHeight: '1.6' }}>
                  Leading the digital transformation with technical excellence and innovative design.
                </p>
                <Link href="/services" className={styles.gradient} style={{ display: 'block', marginTop: '1.5rem', fontWeight: 700, fontSize: '0.9rem' }}>
                  Our Services →
                </Link>
              </div>
            </aside>
          </div>
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
