import { Metadata } from 'next';
import Link from 'next/image'; // Wait, I meant import Image from 'next/image' and import Link from 'next/link'
import Image from 'next/image';
import NextLink from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import styles from './PostDetail.module.css';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

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

function getPosts(): Post[] {
  const postsFilePath = path.join(process.cwd(), 'data/posts.json');
  try {
    const fileContent = fs.readFileSync(postsFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const posts = getPosts();
  const post = posts.find(p => p.id === id);

  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Lesteq Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const allPosts = getPosts();
  const post = allPosts.find(p => p.id === id);

  if (!post) notFound();

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

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.image,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lesteq IT Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lesteqitsolutions.com/logo-lesteq.png',
      },
    },
    description: post.excerpt,
  };

  const renderContent = (content: string) => {
    const parts = content.split(/(\[IMG:.*?\])/g);
    
    return parts.map((part, i) => {
      if (part.startsWith('[IMG:') && part.endsWith(']')) {
        const src = part.slice(5, -1);
        return (
          <div key={i} className={styles.inlineImageWrapper}>
            <Image 
              src={src} 
              alt="Article Content" 
              width={800} 
              height={450} 
              className={styles.inlineImage}
              layout="responsive"
            />
          </div>
        );
      }

      const formattedHtml = part
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/_(.*?)_/g, '<em>$1</em>')
        .replace(/### (.*?)\n/g, '<h3>$1</h3>')
        .replace(/\[CENTER\]([\s\S]*?)\[\/CENTER\]/g, '<div style="text-align: center">$1</div>')
        .replace(/\[JUSTIFY\]([\s\S]*?)\[\/JUSTIFY\]/g, '<div style="text-align: justify">$1</div>');

      return <div key={i} dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
    });
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <div className={styles.mainContent}>
              <NextLink href="/blog" className={styles.backBtn}>
                ← Back to insights
              </NextLink>
              
              <header className={`${styles.header} animate-fade-in`}>
                <span className={styles.category}>{post.category}</span>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.meta}>
                  <span className={styles.author}>By {post.author}</span>
                  <span className={styles.date}>{post.date}</span>
                </div>
              </header>

              <div className={`${styles.heroImage} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className={styles.image}
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>

              <article className={`${styles.articleContent} animate-fade-in`} style={{ animationDelay: '0.4s' }}>
                {renderContent(post.content)}
              </article>

              <div className={styles.postNav}>
                {prevPost ? (
                  <NextLink href={`/blog/${prevPost.id}`} className={styles.navLink}>
                    <span className={styles.navLabel}>Previous Post</span>
                    <span className={styles.navTitle}>{prevPost.title}</span>
                  </NextLink>
                ) : <div />}
                
                {nextPost ? (
                  <NextLink href={`/blog/${nextPost.id}`} className={styles.navLink} style={{ textAlign: 'right' }}>
                    <span className={styles.navLabel}>Next Post</span>
                    <span className={styles.navTitle}>{nextPost.title}</span>
                  </NextLink>
                ) : <div />}
              </div>

              {relatedPosts.length > 0 && (
                <div className={styles.related}>
                  <h2 className={styles.relatedHeading}>Related <span className={styles.gradient}>Insights</span></h2>
                  <div className={styles.relatedGrid}>
                    {relatedPosts.map(p => (
                      <NextLink href={`/blog/${p.id}`} key={p.id} className={`${styles.relatedCard} glass`}>
                        <div className={styles.relatedThumb}>
                          <Image 
                            src={p.image} 
                            alt={p.title} 
                            fill 
                            className={styles.image}
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                        </div>
                        <div className={styles.relatedInfo}>
                          <h3 className={styles.relatedTitle}>{p.title}</h3>
                          <span className={styles.category} style={{ fontSize: '0.7rem' }}>{p.category}</span>
                        </div>
                      </NextLink>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className={styles.sidebar}>
              <div className={`${styles.widget} glass`}>
                <h3 className={styles.widgetTitle}>Categories</h3>
                <div className={styles.categoryList}>
                  {categories.map(cat => (
                    <NextLink href={`/blog?category=${cat.name}`} key={cat.name} className={styles.categoryItem}>
                      <span>{cat.name}</span>
                      <span className={styles.count}>({cat.count})</span>
                    </NextLink>
                  ))}
                </div>
              </div>

              <div className={`${styles.widget} glass`}>
                <h3 className={styles.widgetTitle}>Lesteq IT</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.6, lineHeight: '1.6' }}>
                  Leading the digital transformation with technical excellence and innovative design.
                </p>
                <NextLink href="/services" className={styles.gradient} style={{ display: 'block', marginTop: '1.5rem', fontWeight: 700, fontSize: '0.9rem' }}>
                  Our Services →
                </NextLink>
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
