'use client';

import { useState, useEffect } from 'react';
import styles from './Hero.module.css';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072',
    title: 'Leading the Future of IT Solutions',
    subtitle: 'Lesteq IT Solutions combines technical innovation with a deep focus on user experience to shape a smarter digital future.'
  },
  {
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070',
    title: 'Advanced Cloud & Cyber Security',
    subtitle: 'Protecting your digital assets with military-grade encryption and scalable infrastructure designed for growth.'
  },
  {
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070',
    title: 'Excellence in UI/UX & Design',
    subtitle: 'Creating seamless digital experiences through a deep understanding of user needs and aesthetic perfection.'
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.carousel}>
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`${styles.slide} ${idx === currentSlide ? styles.active : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        <div className={styles.overlay} />
      </div>
      
      <div className={styles.glow} />
      
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {slides.map((slide, idx) => (
            <div 
              key={idx} 
              className={`${styles.contentSlide} ${idx === currentSlide ? styles.contentActive : ''}`}
            >
              <h1 className={styles.title}>
                {slide.title.split(' ').map((word, i) => 
                  word === 'Future' || word === 'Security' || word === 'Design' ? 
                  <span key={i} className={styles.gradient}>{word} </span> : word + ' '
                )}
              </h1>
              <p className={styles.subtitle}>
                {slide.subtitle}
              </p>
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <button className={styles.primary}>Get Started</button>
          <button className={styles.secondary}>Learn More</button>
        </div>
      </div>
    </section>
  );
}
