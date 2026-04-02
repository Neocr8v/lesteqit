'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './StatsSection.module.css';

const stats = [
  { label: 'Successful Projects', value: 25, suffix: '+' },
  { label: 'Happy Clients', value: 18, suffix: '+' },
  { label: 'Years Experience', value: 5, suffix: '+' },
  { label: 'Team Experts', value: 9, suffix: '+' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, value]);

  return (
    <span ref={countRef} className={`${styles.number} ${styles.gradient}`}>
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <div key={index} className={`${styles.card} glass`}>
              <Counter value={stat.value} suffix={stat.suffix} />
              <span className={styles.label}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
