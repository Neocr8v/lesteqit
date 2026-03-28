'use client';

import { useState, useEffect } from 'react';
import styles from './Hero.module.css';

const slides = [
  {
    image: '/team.jpeg',
    title: 'Leading the Future of IT Solutions',
    subtitle: 'Lesteq IT Solutions combines technical innovation with a deep focus on user experience to shape a smarter digital future.'
  },
  {
    image: '/cyber2.jpeg',
    title: 'Advanced Cloud & Cyber Security',
    subtitle: 'Protecting your digital assets with military-grade encryption and scalable infrastructure designed for growth.'
  },
  {
    image: '/ui1.jpg',
    title: 'Excellence in UI/UX & Design',
    subtitle: 'Creating seamless digital experiences through a deep understanding of user needs and aesthetic perfection.'
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 50;
    const moveY = (clientY - window.innerHeight / 2) / 50;
    setMousePos({ x: moveX, y: moveY });
  };

  return (
    <section className={styles.hero} onMouseMove={handleMouseMove}>
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
      
      <div 
        className={styles.glow} 
        style={{ 
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)` 
        }}
      />
      
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {slides.map((slide, idx) => (
            <div 
              key={idx} 
              className={`${styles.contentSlide} ${idx === currentSlide ? styles.contentActive : ''}`}
            >
              <h1 className={styles.title}>
                {slide.title.split(' ').map((word, i) => 
                  ['Future', 'Security', 'Design'].includes(word) ? 
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

      <div className="scroll-indicator" />
    </section>
  );
}
