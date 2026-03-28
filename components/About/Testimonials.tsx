'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
  { 
    quote: "Lesteq transformed our business with their cloud solutions. Technical excellence at its finest.",
    author: "Samuel Appiah",
    company: "FinTech Solutions"
  },
  { 
    quote: "The best UI/UX design team we've ever worked with. They truly understand user needs.",
    author: "Emelda Owusu",
    company: "Retail Global"
  },
  { 
    quote: "Cybersecurity is no longer a worry for us since Lesteq took over. Highly recommended.",
    author: "Kwame Boateng",
    company: "Secure Logistics"
  },
  { 
    quote: "Their custom software development team delivered exactly what we needed, on time and within budget.",
    author: "Doris Mensah",
    company: "HealthTrack Ghana"
  },
  { 
    quote: "Exceptional support and maintenance. They are always responsive and proactive.",
    author: "John Tetteh",
    company: "EduTech Systems"
  },
  { 
    quote: "The digital transformation strategy provided by Lesteq has given us a significant competitive edge.",
    author: "Abena Serwaa",
    company: "Modern Agric"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  // Update items to show based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsToShow(1);
      } else if (window.innerWidth <= 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / itemsToShow);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>What Our <span className={styles.gradient}>Clients Say</span></h2>
        
        <div className={styles.viewport}>
          <div 
            className={styles.slider}
            style={{ 
              transform: `translateX(-${activeIndex * 100}%)`,
            }}
          >
            {testimonials.map((t, index) => (
              <div key={index} className={styles.slide}>
                <div className={`${styles.card} glass`}>
                  <p className={styles.quote}>"{t.quote}"</p>
                  <div className={styles.author}>
                    <strong>{t.author}</strong>
                    <span>{t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          <button onClick={prevSlide} className={styles.navBtn} aria-label="Previous slide">
            ←
          </button>
          
          <div className={styles.dots}>
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${activeIndex === i ? styles.dotActive : ''}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button onClick={nextSlide} className={styles.navBtn} aria-label="Next slide">
            →
          </button>
        </div>
      </div>
    </section>
  );
}
