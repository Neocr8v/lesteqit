'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './AdminBlog.module.css';

interface Post {
  id: string;
  title: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
}

export default function AdminBlogPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inlineInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('manage');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const initialForm = {
    id: '',
    title: '',
    category: 'Cloud Computing',
    author: '',
    excerpt: '',
    content: '',
    image: ''
  };
  
  const [formData, setFormData] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  const insertFormat = (tag: string, endTag?: string) => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const text = textareaRef.current.value;
    const selected = text.substring(start, end);
    
    const newText = endTag 
      ? text.substring(0, start) + tag + selected + endTag + text.substring(end)
      : text.substring(0, start) + tag + selected + text.substring(end);
    
    setFormData({ ...formData, content: newText });
    
    // Reset focus
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const cursorOffset = tag.length;
        textareaRef.current.setSelectionRange(start + cursorOffset, end + cursorOffset);
      }
    }, 0);
  };

  const handleUpload = async (file: File, isCover: boolean) => {
    const uploadData = new FormData();
    uploadData.append('file', file);
    
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: uploadData });
      const data = await res.json();
      
      if (data.success) {
        if (isCover) {
          setFormData(prev => ({ ...prev, image: data.url }));
          const reader = new FileReader();
          reader.onload = (e) => setImagePreview(e.target?.result as string);
          reader.readAsDataURL(file);
        } else {
          // Auto-insert image tag at cursor position
          insertFormat(`\n[IMG:${data.url}]\n`);
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const method = isEditing ? 'PUT' : 'POST';
    
    try {
      const res = await fetch('/api/posts', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormData(initialForm);
        setImagePreview(null);
        setIsEditing(false);
        setActiveTab('manage');
        fetchPosts();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: Post) => {
    setFormData(post);
    setImagePreview(post.image);
    setIsEditing(true);
    setActiveTab('create');
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const res = await fetch('/api/posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) fetchPosts();
    }
  };

  return (
    <main style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <section className={styles.section}>
        <div className={styles.container}>
          <div style={{ marginBottom: '3rem' }}>
            <Link href="/blog" style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ← Back to Blog Feed
            </Link>
          </div>

          <header className={styles.header}>
            <h1 className={styles.title}>Admin <span className={styles.gradient}>Dashboard</span></h1>
            <p className={styles.subtitle}>Lesteq Content Management System</p>
          </header>

          <div className={styles.tabs}>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'manage' ? styles.activeTab : ''}`}
              onClick={() => { setActiveTab('manage'); setIsEditing(false); setFormData(initialForm); setImagePreview(null); }}
            >
              Manage Posts
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'create' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('create')}
            >
              {isEditing ? 'Editing Post' : 'Publish New'}
            </button>
          </div>

          {activeTab === 'manage' ? (
            <div className={`${styles.manageGrid} animate-fade-in`}>
              {posts.map(post => (
                <div key={post.id} className={styles.manageCard}>
                  <img src={post.image} alt="" className={styles.manageThumb} />
                  <div className={styles.manageInfo}>
                    <h3 className={styles.manageTitle}>{post.title}</h3>
                    <div className={styles.manageMeta}>{post.category} • {post.date}</div>
                  </div>
                  <div className={styles.manageActions}>
                    <button className={styles.editBtn} onClick={() => handleEdit(post)}>Edit</button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(post.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={`${styles.form} glass animate-fade-in`}>
              <div className={styles.formGroup}>
                <label>Article Cover</label>
                <div 
                  className={`${styles.dropzone} ${dragging ? styles.dragging : ''}`}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setDragging(false); handleUpload(e.dataTransfer.files[0], true); }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? <img src={imagePreview} alt="Preview" className={styles.preview} /> : <span>Drop Cover Image Here</span>}
                  <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={(e) => e.target.files && handleUpload(e.target.files[0], true)} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Article Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label>Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option>Cloud Computing</option>
                    <option>Security</option>
                    <option>Design</option>
                    <option>Development</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Author</label>
                  <input type="text" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} required />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Excerpt</label>
                <textarea rows={3} value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} required />
              </div>

              <div className={styles.formGroup}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Full Content</label>
                  <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>Rich text supported</span>
                </div>
                
                {/* Formatting Toolbar */}
                <div className={styles.toolbar}>
                  <button type="button" className={styles.toolBtn} onClick={() => insertFormat('**', '**')}>B</button>
                  <button type="button" className={styles.toolBtn} onClick={() => insertFormat('_', '_')}>I</button>
                  <button type="button" className={styles.toolBtn} onClick={() => insertFormat('### ')}>H3</button>
                  <button type="button" className={styles.toolBtn} onClick={() => insertFormat('[JUSTIFY]', '[/JUSTIFY]')}>Justify</button>
                  <button type="button" className={styles.toolBtn} onClick={() => insertFormat('[CENTER]', '[/CENTER]')}>Center</button>
                  <button type="button" className={styles.toolBtn} onClick={() => inlineInputRef.current?.click()}>IMG</button>
                  <input type="file" ref={inlineInputRef} hidden accept="image/*" onChange={(e) => e.target.files && handleUpload(e.target.files[0], false)} />
                </div>

                <textarea 
                  ref={textareaRef}
                  rows={12} 
                  className={styles.editorArea}
                  value={formData.content} 
                  onChange={(e) => setFormData({...formData, content: e.target.value})} 
                  required 
                />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Processing...' : (isEditing ? 'Update Insight' : 'Publish Insight')}
              </button>
              
              {isEditing && (
                <button type="button" className={styles.cancelBtn} onClick={() => { setIsEditing(false); setActiveTab('manage'); setFormData(initialForm); setImagePreview(null); }}>
                  Cancel Editing
                </button>
              )}
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
