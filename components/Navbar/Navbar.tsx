'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`${styles.navbar} glass`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={() => setIsOpen(false)}>
          <img src="/logo-lesteq.png" alt="LESTEQ Logo" className={styles.logoImage} />
        </Link>

        {/* Hamburger Toggle */}
        <button 
          className={`${styles.toggle} ${isOpen ? styles.toggleActive : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        <div className={`${styles.links} ${isOpen ? styles.linksOpen : ''}`}>
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/services" onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link href="/contact" className={styles.mobileCta} onClick={() => setIsOpen(false)}>
            Get Started
          </Link>
        </div>

        <Link href="/contact" className={styles.cta}>Get Started</Link>
      </div>
    </nav>
  );
}
