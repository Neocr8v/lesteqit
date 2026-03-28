import Link from 'next/link';
import styles from './HomeCTA.module.css';

export default function HomeCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.glow} />
          <div className={styles.content}>
            <h2 className={styles.title}>Ready to Transform Your <span className="gradient-text">Digital Future?</span></h2>
            <p className={styles.subtitle}>
              Partner with Lesteq IT Solutions to build secure, scalable, and innovative software that moves your business forward.
            </p>
            <div className={styles.actions}>
              <Link href="/contact" className={styles.primary}>
                Start a Project
              </Link>
              <Link href="/services" className={styles.secondary}>
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
