import { Metadata } from 'next';
import Image from 'next/image';
import NextLink from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import styles from './PostDetail.module.css';
import { sql } from '@vercel/postgres';
import { notFound } from 'next/navigation';

export const revalidate = 0;

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

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const { rows } = await sql`SELECT * FROM posts WHERE id = ${id};`;
    const post = rows[0] as Post;

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
        images: [{ url: post.image }],
      },
    };
  } catch (error) {
    return { title: 'Lesteq Blog' };
  }
}

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let post: Post | null = null;
  let allPosts: Post[] = [];

  try {
    const postsResult = await sql`SELECT * FROM posts ORDER BY date DESC;`;
    allPosts = postsResult.rows as Post[];
    post = allPosts.find(p => p.id === id) || null;
  } catch (error) {
    console.error('Failed to fetch from DB:', error);
  }

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

  const renderContent = (content: string) => {
    const parts = content.split(/(\[IMG:.*?\])/g);
    return parts.map((part, i) => {
      if (part.startsWith('[IMG:') && part.endsWith(']')) {
        const src = part.slice(5, -1);
        return (
          <div key={i} className={styles.inlineImageWrapper}>
            <Image src={src} alt="Article Content" width={800} height={450} className={styles.inlineImage} layout="responsive" />
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
      <Navbar />
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <div className={styles.mainContent}>
              <NextLink href="/blog" className={styles.backBtn}>← Back to insights</NextLink>
              <header className={styles.header}>
                <span className={styles.category}>{post.category}</span>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.meta}>
                  <span>By {post.author}</span>
                  <span>{post.date}</span>
                </div>
              </header>
              <div className={styles.heroImage}>
                {post.image && (
                  <Image 
                    src={post.image.startsWith('http') ? post.image : `/${post.image.replace(/^\//, '')}`}
                    alt={post.title} 
                    fill 
                    className={styles.image} 
                    priority 
                    unoptimized={!post.image.includes('blob.vercel-storage.com')}
                  />
                )}
              </div>
              <article className={styles.articleContent}>{renderContent(post.content)}</article>
              
              <div className={styles.postNav}>
                {prevPost && (
                  <NextLink href={`/blog/${prevPost.id}`} className={styles.navLink}>
                    <span className={styles.navLabel}>Previous</span>
                    <span className={styles.navTitle}>{prevPost.title}</span>
                  </NextLink>
                )}
                {nextPost && (
                  <NextLink href={`/blog/${nextPost.id}`} className={styles.navLink} style={{ textAlign: 'right' }}>
                    <span className={styles.navLabel}>Next</span>
                    <span className={styles.navTitle}>{nextPost.title}</span>
                  </NextLink>
                )}
              </div>
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
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
