import styles from './ServicesHero.module.css';

export default function ServicesHero() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Scalable <span className={styles.gradient}>Solutions</span> for a Digital World
        </h1>
        <p className={styles.subtitle}>
          From custom software development to advanced cyber security, we provide the technical foundation your business needs to excel in the modern landscape.
        </p>
      </div>
    </section>
  );
}
